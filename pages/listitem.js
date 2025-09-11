export let renderListItem = () => {
    let hash = window.location.hash.split('?')[1] || ''
    let params = new URLSearchParams(hash)
    let id = params.get('id')
    if (!id) {
        window.location.hash = 'home'
        return
    }

    let cust_name = params.get('cust_name') ? decodeURIComponent(params.get('cust_name')) : ''
    let address = params.get('Address') ? decodeURIComponent(params.get('Address')) : ''
    let full_name = params.get('Full_Name') ? decodeURIComponent(params.get('Full_Name')) : ''

    init_iconsax();
    document.querySelector('#app').innerHTML = `
        <link rel="stylesheet" href="./assets/css/leaflet.css" />
        <style>
            .categories-place-box {
                display: flex;
                align-items: center;
                gap: 5px;
                padding: 10px 15px;
                background-color: rgba(var(--white), 1);
                border: 1px solid rgba(var(--line-color), 1);
                border-radius: 6px;
            }
            .offer-head .delete-btn {
                background: #f9ebeb;
                stroke: #c53f3f;
                border: none;
                border-radius: 50%;
                width: 36px;
                height: 36px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
            }
            .offer-head .delete-btn:hover {background: #fff;}
            .recent-icon img {
                width: 26px;
                height: 48px;
                margin-right: 5px;
            }
            #header{
                position: fixed;
                width: 100%;
                max-width: 600px;
                margin-top: 0;
                padding-top: 10px;
                z-index: +2;
            }
            #modpop {
                position: fixed;
                inset: 0;
                display: flex;
                justify-content: center;
                align-items: flex-end;
                visibility: hidden;
                opacity: 0;
                transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
                z-index: 9999;
            }
            #olay {
                position: absolute;
                inset: 0;
                background: #000;
                opacity: .6;
            }
            #modpop .theme-content-bg {
                background: #fff;
                width: 100%;
                max-width: 500px;
                border-radius: 16px 16px 0 0;
                overflow-y: auto;
                max-height: 80vh;
                transition: transform 0.4s ease-in-out;
                z-index: 10000;
                padding: 0 20px;
                position: relative;
            }
            #modpop.show {
                visibility: visible;
                opacity: 1;
            }
            .addcust svg {
                position: fixed;
                bottom: 110px;
                right: 20px;
                width: 48px;
                height: 48px;
                cursor: pointer;
                z-index: +3;
                border-radius: 50%;
                background: #c53f3f;
                padding: 10px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                animation: pulse 1.5s infinite;
                transition: transform 0.2s ease-in-out;
            }
            .addcust svg path {stroke: #fff!important;}
            .addcust svg:hover {transform: scale(1.15);}
            #modpop .tbf{
                position: fixed;
                bottom: 0;
                margin-bottom: 10px;
                z-index: +2;
                width: calc(100% - 20px);
                background: #fff;
                max-width: 450px;
            }
            .tbf2{
                position: fixed;
                bottom: 0;
                margin: 0 auto;
                z-index: +2;
                width: calc(100%);
                background: #fff;
                max-width: calc(600px);
                padding: 20px 10px 9px;
            }
            .bgm{
                padding: 100px 20px 190px;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
                position: absolute;
            }
            .pntoko {
                position: absolute;
                top: 18px;
                width: 100%;
                background: #fff;
                left: 0;
                border-radius: 20px 20px 0px 0px;
                padding: 20px 20px 0 20px;
            }
            .profile-content {
                width: 100%;
                display: flex;
                align-items: center;
                gap: 5px;
                justify-content: space-between;
            }
            .shadow-sm{box-shadow:0px 0px 18px #efefef;}
            .card-absen {
                background: #fff;
                border-radius: 8px;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
            }
            .card::before {
                background: linear-gradient(135deg, #f8f9fa 25%, #e8f5e9 100%);
                background-image: url(./assets/images/bg2.svg);
                background-size: cover;
                border: none;
                content: "";
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
            }
            .seclist {
                background: #fff;
                z-index: +1;
                position: absolute;
                border: none;
                width: 100%;
                min-height: 400px;
            }
            #formContainer {margin-bottom: 120px;}
            .form-wrapper {
                padding: 15px;
                background-color: rgba(var(--white), 1);
                border-radius: 10px;
                margin-bottom: 10px;
                box-shadow: 0px 4px 20px 0px rgba(var(--title-color), 0.06);
            }
            .offer-head {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding-bottom: 15px;
                border-bottom: 1px dashed rgba(var(--line-color), 1);
            }
            .offer-head h4 {
                font-weight: 600;
                padding: 8px 16px;
                color: rgba(var(--theme-color), 1);
                background-color: rgba(var(--theme-color), 0.1);
                border-radius: 4px;
            }
            .profile-content {
                width: 100%;
                display: flex;
                align-items: center;
                gap: 5px;
                justify-content: space-between;
            }
            .profile-content h5 {
                font-weight: 500;
                line-height: 1.5;
                color: rgba(var(--title-color), 1);
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .comm-icon {
                width: 35px;
                height: 35px;
                padding: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: rgba(var(--box-bg), 1);
                border-radius: 100%;
            }
            .location-part {
                width: 100%;
                margin-top: 20px;
                padding: 15px;
                border-radius: 6px;
                background-color: rgba(var(--box-bg), 1);
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            .cix {width: 60%;margin-left: 10px;}
            #cix {
                font-size: 20px;
                font-weight: bold;
                color: #ae3333;
            }
            .tbdone{
                background: #ae3333;
                color: #fff;
                font-weight: bold;
                width: 30%;
                margin-left: auto;
                display: block;
                padding: 13px 20px;
                height: max-content;
            }
            #remarks i svg {
                background: #c53f3f;
                stroke: #fff;
                position: absolute;
                top: -15px;
                right: 20px;
                padding: 8px;
                border-radius: 18px;
                cursor: pointer;
            }

            .recr {
                display: block;
                margin: 5px 10px 20px;
                width: calc(100% - 20px);
                text-align: center;
                background: #f9ebeb;
                border-radius: 8px;
                padding: 10px 0;
                color: #ae3333;
            }

            .recr svg{
                background: #c53f3f;
                stroke: #fff;
                padding: 8px;
                border-radius: 18px;
                margin: 10px auto;
                display: block;
            }
            .recr.onrecord, .onrecordr svg {background: #1996751a;color:#199675;}    
            .recr.onrecord svg, #remarks i.onrecordr svg{animation: pulse 1s infinite;background:#199675;}
            .iatas{
                position: absolute;
                top: -12px;
                stroke: #fff;
                background: #ae3333;
                fill: #fff;
                width: 28px;
                height: 28;
                padding: 7px;
                border-radius: 50%;
                left: 48%;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
            }
            .iatas svg{width: 14px;height: 14px;}
            #recordel svg {
                width: 40px;
                height: 40px;
                margin: 30px auto;
                border-radius: 18px;
                padding: 2px;
                stroke: #fff;
                background: #c53f3f;
                animation: pulse 1s infinite;
            }
            .backform {
                margin: 15px 0;
                width: 100%;
                color: #ae3333;
            }
            .igall {
                margin: 10px 0 20px;
                border-radius: 8px;
                overflow: hidden;
            }

            .gallery {
                display: grid;
                gap: 5px;
                border-radius: 8px;
                width: 100%;
                height: 145px;
            }

            .gallery-item {
                position: relative;
                overflow: hidden;
                cursor: pointer;
            }

            .gallery-item img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                display: block;
                transition: transform 0.3s ease;
            }

            .gallery-item:hover img {
                transform: scale(1.05);
            }

            .layout-1 {
                grid-template-columns: 1fr;
            }
            .layout-1 .gallery-item {
                height: 145px;
            }

            .layout-2 {
                grid-template-columns: 1fr 1fr;
                grid-auto-rows: 145px;
            }
            .layout-2 .gallery-item {
                height: 100%;
            }

            .layout-3 {
                grid-template-columns: 2fr 1fr;
                grid-template-rows: 1fr 1fr;
                grid-template-areas: "big small1" "big small2";
            }
            .layout-3 .gallery-item:nth-child(1) {
                grid-area: big;
                height: 100%;
            }
            .layout-3 .gallery-item:nth-child(2) {
                grid-area: small1;
                height: 72px;
            }
            .layout-3 .gallery-item:nth-child(3) {
                grid-area: small2;
                height: 72px;
            }

            .layout-4 {
                grid-template-columns: 1fr 1fr;
                grid-template-rows: 1fr 1fr;
            }
            .layout-4 .gallery-item {
                height: 72px;
            }

            .layout-5 {
                grid-template-columns: 2fr 1fr 1fr;
                grid-template-rows: 1fr 1fr;
                grid-template-areas: "big mid1 right1" "big mid2 right2";
            }
            .layout-5 .gallery-item:nth-child(1) { grid-area: big; height: 100%; }
            .layout-5 .gallery-item:nth-child(2) { grid-area: mid1; height: 72px; }
            .layout-5 .gallery-item:nth-child(3) { grid-area: mid2; height: 72px; }
            .layout-5 .gallery-item:nth-child(4) { grid-area: right1; height: 72px; }
            .layout-5 .gallery-item:nth-child(5) { grid-area: right2; height: 72px; }

            @media(max-width:600px){
                .layout-2, .layout-3, .layout-4, .layout-5 {
                    grid-template-rows: auto;
                }
                .gallery-item { height: 80px; }
            }

            .viewer {
                position: fixed;
                top: 0; left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.9);
                display: none;
                justify-content: center;
                align-items: center;
                z-index: 9999;
            }
            .viewer.active {display: flex;}
            .viewer img {
                transition: transform 0.3s ease;
                height: 100vh;
                top: 0;
                left: 0;
                object-fit: cover;
            }

            .viewer .close-btn,
            .viewer .nav-btn {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                font-size: 40px;
                color: white;
                cursor: pointer;
                user-select: none;
                padding: 10px;
            }
            .viewer .close-btn {
                top: 20px;
                right: 20px;
                font-size: 35px;
                transform: none;
                z-index: +2;
            }
            .viewer .prev-btn { left: 20px; }
            .viewer .next-btn { right: 20px; }
            .viewer svg {
                background: #000;
                width: 34px;
                height: 35px;
                border-radius: 50%;
                stroke: #fff;
                padding: 8px;
                z-index: +2;
            }
            .clay {
                width: 100%;
                height: 100%;
                background:linear-gradient(0deg, #00000096 0%, rgb(0 0 0 / 12%) 20%);
                position: absolute;
                top: 0;z-index:0;
            }
            .clay strong {font-size: 16px;text-transform: uppercase;}
            .clay .strong {
                position: absolute;
                bottom: 15px;
                left: 0;
                color: #fff;
                font-size: 13px;
                background: #0000008a;
                padding: 10px;
                border-radius: 8px;
                margin: 8px;
            }
            #closebtn svg {padding: 0;}
            .hide{display:none!important;}
        </style>
        <header id="header" class="main-header inner-page-header position-absolute bg-transparent" style="position: fixed!important;z-index: +9;">
            <div class="custom-container">
                <div class="header-panel p-0">
                    <a onclick="hrefs('home')" >
                        <i class="iconsax icon-btn" data-icon="chevron-left"> </i>
                    </a>
                </div>
            </div>
        </header>
        <main>
            <div class="location-map position-relative w-100 h-100" id="map" style="z-index: 0;"></div>
            <section class="bgm theme-content-bg">
                <i class="iconsax icon-btn" data-icon="chevron-up"></i>
                <i class="iconsax icon-btn iatas" data-icon="chevron-up"></i>
                <div class="pntoko">
                    <div class="d-flex align-items-center mb-3">
                        <span class="my-ride-img cekdetailtoko" style="margin-right: 10px;width: 38px;height: 38px;">
                            <img class="place-icon" src="./assets/images/svg/home-fill.svg" alt="home" style="width:70%;">
                        </span>
                        <div class="cekdetailtoko" style="width: calc(100% - 70px);">
                            <h2 id="cardname" style="font-size: 12px;line-height: .8;margin-bottom: 3px;" class="fw-bold">Jonathan Higgins</h2>
                            <div id="Address" class="text-muted" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;width: 94%;">JL Raya Semarang</div>
                        </div>
                        <div class="flex-align-center gap-2 hide" style="margin-left: auto;">
                            <a href="chatting.html" class="comm-icon">
                                <img class="img-fluid icon-btn" src="./assets/images/svg/messages-fill.svg" alt="messages">
                            </a>
                            <a href="tel:+4733378901" class="comm-icon">
                                <img class="img-fluid icon-btn" src="./assets/images/svg/call-fill.svg" alt="call">
                            </a>
                        </div>
                    </div>
                    <div class="igall"><div class="gallery" id="gallery"></div></div>
                    <div class="d-flex align-items-center gap-2 mb-3 p-2 rounded" style="background:rgba(var(--box-bg), 1);">
                        <img src="./assets/images/svg/location-fill.svg" alt="location" width="24">
                        <div style="width:calc(100% - 100px);">
                            <strong id="Full_Name">Novenny (Key Account Executive)</strong>
                            <p id="alamat2" class="mb-0 text-muted" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;width: 100%;">JL. Indokarya</p>
                        </div>
                        <div class="ms-auto text-end">
                            <strong id="cin">09:05</strong>
                        </div>
                    </div>
                </div>
            </section>
            <section class="seclist" style="padding-top:0;">
                <div class="custom-container">
                    <div id="recr" class="recr">
                        <i class="iconsax icon" data-icon="mic-1"></i>
                        <div class="statrecr">Klik Untuk Merekam</div>
                        <textarea id="speechText" class="hide"></textarea>
                    </div>
                    <div id="formContainer"></div>
                </div>
            </section>
            <section style='padding:65px 0 0;'>
                <ul id="placeList" class="recent-place-list">
                    <li class="recent-place-item" style="display: none;">
                        <div class="recent-box">
                            <div class="recent-icon">
                                <img class="icon" src="./assets/images/svg/location-fill.svg" alt="location">
                            </div>
                            <div>
                                <h5 class="card-name"></h5>
                                <p class="address"></p>
                            </div>
                        </div>
                    </li>
                </ul>
                <i class="iconsax addcust" data-icon="add" id="addFormBtn" onclick="createForm()">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 12H18" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path d="M12 18V6" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                </i>
                <div class="offcanvas-footer tbf2 hide flex-align-center flex-nowrap gap-3 border-0 pt-3 " style='border-bottom:1px solid rgba(var(--line-color), 1);'>
                    <span class="btn theme-btn w-100 mt-0 addcustx">Simpan</span>
                </div>
            </section>
        </main>
        <div class="fixed-btn" style="padding:20px 0 8px;">
            <div class="custom-container d-flex">
                <div class="cix">
                    <small>Durasi Kunjungan</small>
                    <div id="cix">18.95</div>
                </div>
                <span href="#remarks" data-bs-toggle="offcanvas" class="btn tbdone">Selesai</span>
            </div>
        </div>
        <div class="offcanvas ride-offcanvas" tabindex="-1" id="remarks">
            <div class="offcanvas-body p-0">
                <h3>Berikan Kesimpulan Hasil Diskusi</h3>
                <i class="iconsax icon-btn recremark" data-icon="mic-1"> </i>
                <div class="jotheme-form" style="margin-top: 15px;">
                    <div class="form-group">
                        <textarea class="form-controljo hasilx" id="hasilx" placeholder="Masukkan remarks..." style="width: 100%; height: 140px;" required></textarea>
                        <label class="form-labeljo">Remarks</label>
                    </div>
                </div>
            </div>
            <div class="offcanvas-footer flex-align-center flex-nowrap gap-3 border-0 pt-3 px-0 pb-0">
                <span data-bs-dismiss="offcanvas"class="btn gray-btn title-color w-100 mt-0">Batal</span>
                <span id="simpankujungan" onclick="saveKunjungan()" class="btn theme-btn w-100 mt-0">Simpan</span>
            </div>
        </div>
    `
    
    
    let loadLeaflet = () => {
        return new Promise((resolve, reject) => {
            if (window.L) {
                resolve(window.L)
                return
            }
            let script = document.createElement('script')
            script.src = "./assets/js/leaflet.js"
            script.async = true
            script.onload = () => resolve(window.L)
            script.onerror = () => reject(new Error("Gagal memuat Leaflet JS"))
            document.body.appendChild(script)
        })
    }

    
    let lastText = '', activeTarget = null;
    let recrBtn = document.getElementById('recr'),
        remarkBtn = document.querySelector('.recremark'),
        statrecr = document.querySelector('.statrecr'),
        hasilInput = document.getElementById('hasilx'),
        textarea = document.getElementById('speechText');
        
    let createFormTemplate = (data = {}, idx = null) => {
        let hargaValue = data.harga ? formatRupiah(String(data.harga)) : '';
        let qtyValue = data.qty ? formatRupiah(String(data.qty)) : '';
        let produk = data.namaproduk || '';

        return `
            <div class="form-wrapper">
                <div class="offer-head" style="margin-bottom: 15px;padding-bottom: 8px;">
                    <h4 style="font-size: 12px;text-transform: uppercase;">SKU #${idx || ++formCount}</h4>
                    <div class="flex-align-center gap-2">
                        <span class="delete-btn" onclick="deleteForm(this)">
                            <i class="iconsax icon error-icon" data-icon="trash-square"></i>
                        </span>
                    </div>
                </div>
                <div class="jotheme-form" style="margin-top: 15px;">
                    <div class="form-group">
                        <input type="text" class="form-controljo brand" placeholder=" " required value="${produk}">
                        <label class="form-labeljo">Produk Competitor</label>
                    </div>
                    <div class="row" style="display: flex; gap: 20px;">
                        <div class="col-6" style="flex: 1;">
                            <div class="form-group">
                                <input type="text" class="form-controljo harga"
                                    value="${hargaValue}" placeholder=" "
                                    required inputmode="numeric" pattern="[0-9]*"
                                    oninput="this.value=formatRupiah(this.value)"
                                    onkeydown="return onlyNumber(event)">
                                <label class="form-labeljo">Harga</label>
                            </div>
                        </div>
                        <div class="col-6" style="flex: 1;margin-left: -35px;">
                            <div class="form-group">
                                <input type="text" class="form-controljo pemakaian"
                                    value="${qtyValue}" placeholder=" "
                                    required inputmode="numeric" pattern="[0-9]*"
                                    oninput="this.value=formatRupiah(this.value)"
                                    onkeydown="return onlyNumber(event)">
                                <label class="form-labeljo">Pemakaian Bulanan</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    };

    window.createForm = () => {
        formContainer.insertAdjacentHTML('beforeend', createFormTemplate());
        init_iconsax();
    };

    let addFormsFromData = (items) => {
        items.forEach((item, idx) => {
            formContainer.insertAdjacentHTML('beforeend', createFormTemplate(item, idx + 1));
        });
        init_iconsax();
    };


    let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    
    let recognition = new SpeechRecognition(),
        isRecording = false,
        fetchTimeout = null;
    
    recognition.lang = 'id-ID';
    recognition.interimResults = true;
    recognition.continuous = true;

    recognition.onresult = e => {
        let transcript = Array.from(e.results).slice(e.resultIndex).map(r => r[0].transcript).join('');
        textarea && (textarea.value = transcript);
        fetchTimeout && clearTimeout(fetchTimeout);
        fetchTimeout = setTimeout(() => processSpeech(transcript), 1000);
    };
    
    
    recognition.onend = () => {
        if (isRecording) recognition.start();
        else {
            recrBtn && recrBtn.classList.remove('onrecord');
            remarkBtn && (remarkBtn.style.background = "rgba(var(--theme-color), 1)");
        }
    };
    
    let toggleRecording = (btn, target) => {
        activeTarget = target;
        isRecording = !isRecording;
        btn.classList.toggle('onrecord', isRecording)
        statrecr && (statrecr.textContent = isRecording ? 'Kamu sedang merekam' : 'Ketuk untuk merekam');
        isRecording ? recognition.start() : recognition.stop();
    };
    
    recrBtn && (recrBtn.onclick = () => toggleRecording(recrBtn, 'speechText'));

    let stream, mediaRecorder, audioChunks = [];
    let startAudioRecording = async () => {
        try {
            stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorder = new MediaRecorder(stream);
            audioChunks = [];
    
            mediaRecorder.ondataavailable = e => e.data.size > 0 && audioChunks.push(e.data);
    
            mediaRecorder.onstop = async () => {
                const blob = new Blob(audioChunks, { type: 'audio/webm' });
                await uploadAudioToBackend(blob);
                stream.getTracks().forEach(track => track.stop());
                stream = null;
            };
    
            mediaRecorder.start();
            console.log('Recording started...');
        } catch (err) {
            alert('Tidak bisa mengakses mikrofon.');
        }
    };
    
    let stopAudioRecording = () => mediaRecorder?.state === 'recording' && mediaRecorder.stop();
    let uploadAudioToBackend = async blob => {
        if (!id) return alert('ID tidak ditemukan di URL!');
    
        const formData = new FormData();
        formData.append('id', id);
        formData.append('audio', blob, `recording_${Date.now()}.webm`); 
    
        try {
            const res = await fetch(urlbe + 'transcribe', { method: 'POST', body: formData });
            const result = await res.json();
    
            if (result.status === 'success') {
                hasilInput.value = result.transcript?.map(t => t.text).join('\n') || '';
                alert('Audio berhasil diunggah dan ditranskrip!');
            } else {
                alert('Gagal memproses audio: ' + result.message);
            }
        } catch (err) {
            alert('Terjadi kesalahan saat mengunggah audio.');
            console.error(err);
        }
    };
    
    remarkBtn.onclick = async () => {
        activeTarget = 'hasilx';
        isRecording = !isRecording;
        remarkBtn.classList.toggle('onrecordr', isRecording);
        statrecr.textContent = isRecording ? 'Sedang merekam audio...' : 'Ketuk untuk merekam';
        isRecording ? await startAudioRecording() : stopAudioRecording();
    };
    
    let processSpeech = async text => {
        let cleanText = text.trim();
        if (!cleanText || cleanText === lastText) return;
        lastText = cleanText;
        try {
            let res = await fetch(urlbe + 'spkompet', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: cleanText })
            });
            let result = await res.json();
            if (result.status === "success" && result.data) {
                let items = Array.isArray(result.data) ? result.data : [result.data];
                formContainer.innerHTML = '';
                addFormsFromData(items);
            }
        } catch (err) {
            console.error(err);
        }
    };

    
    let imagedata = [],gallery = document.getElementById('gallery'),
    clay, viewer, viewerimage, closebtn, prevbtn, nextbtn, currentindex = 0,
    touchstartx = 0, touchendx = 0;
    
    let rendergaleryview = () => {
        viewer = document.createElement('div');
        viewer.id = 'viewer';
        viewer.className = 'viewer';
        viewer.innerHTML = `
            <span class="close-btn" id="closebtn">
                <i class="iconsax icon error-icon" data-icon="close-circle"></i>
            </span>
            <span class="nav-btn prev-btn" id="prevbtn">
                <i class="iconsax icon error-icon" data-icon="chevron-left"></i>
            </span>
            <img id="viewerimage" src="" alt="">
            <div class="clay"></div>
            <span class="nav-btn next-btn" id="nextbtn">
                <i class="iconsax icon error-icon" data-icon="chevron-right"></i>
            </span>
        `;
        document.querySelector("#app").appendChild(viewer);
    
        init_iconsax();
        clay = document.querySelector('.clay');
        viewerimage = document.getElementById('viewerimage');
        closebtn = document.getElementById('closebtn');
        prevbtn = document.getElementById('prevbtn');
        nextbtn = document.getElementById('nextbtn');
    };
    
    let setgallerylayout = images => {
        let layout = images.length === 1 ? 'layout-1' :
                     images.length === 2 ? 'layout-2' :
                     images.length === 3 ? 'layout-3' :
                     images.length === 4 ? 'layout-4' :
                     images.length === 5 ? 'layout-5' : 'layout-4';
        gallery.className = `gallery ${layout}`;
        gallery.innerHTML = images.map((img, index) =>
            `<div class="gallery-item" data-index="${index}">
                <img src="${img.src}" alt="${img.alt}" onerror="this.style.display='none'">
            </div>`
        ).join('');
    };
    
    let infofoto = (imageObj) => {
        clay.innerHTML = `
            <div class="strong">
                <strong>${imageObj.namatoko}</strong><br>
                ${imageObj.alamat}<br>
                ${imageObj.nama} (${imageObj.jam_menit})
            </div>
        `;
    };
    
    let openviewer = index => {
        currentindex = index;
        let imageObj = imagedata[currentindex];
        viewerimage.src = imageObj.src;
        viewer.classList.add('active');
        infofoto(imageObj);
    };
    
    let closeviewer = () => viewer.classList.remove('active');
    let showprev = () => {
        currentindex = (currentindex - 1 + imagedata.length) % imagedata.length;
        let imageObj = imagedata[currentindex];
        viewerimage.src = imageObj.src;
        infofoto(imageObj);
    };
    let shownext = () => {
        currentindex = (currentindex + 1) % imagedata.length;
        let imageObj = imagedata[currentindex];
        viewerimage.src = imageObj.src;
        infofoto(imageObj);
    };
    
    let initgalery = () => {
        gallery.onclick = e => {
            let item = e.target.closest('.gallery-item');
            if (!item) return;
            openviewer(parseInt(item.getAttribute('data-index')));
        };
        closebtn.onclick = closeviewer;
        prevbtn.onclick = showprev;
        nextbtn.onclick = shownext;
        viewer.onclick = e => { if (e.target === viewer) closeviewer(); };
        document.onkeydown = e => {
            if (!viewer.classList.contains('active')) return;
            if (e.key === 'ArrowLeft') showprev();
            if (e.key === 'ArrowRight') shownext();
            if (e.key === 'Escape') closeviewer();
        };
        viewer.addEventListener('touchstart', e => {
            touchstartx = e.changedTouches[0].screenX;
        }, { passive: true });
    
        viewer.addEventListener('touchend', e => {
            touchendx = e.changedTouches[0].screenX;
            let diff = touchendx - touchstartx;
            if (Math.abs(diff) > 50) diff > 0 ? showprev() : shownext();
        }, { passive: true });
    };
    
    fetch(urlbe + 'listjadwalid', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
    })
    .then(res => res.json())
    .then(async resData => {
        let lokasi = resData?.data || {};
        let lat = lokasi.lat ? parseFloat(lokasi.lat) : null;
        let lon = lokasi.lon ? parseFloat(lokasi.lon) : null;
        let cust_name = lokasi.cust_name || '';
        let full_name = lokasi.Full_Name || '';
        let Job_Position = lokasi.Job_Position || '';
        let address = lokasi.Address || '';
        let cust_code = lokasi.cust_code || '';
        let city = lokasi.City || '';
    
        imagedata = (lokasi.fotos || []).map((item, i) => ({
            src: urlbe2 + 'upload/gambar/' + item.foto,
            alt: `Foto ${i + 1}`,
            nama: item.nama,
            namatoko: item.namatoko,
            alamat: item.alamat,
            tanggal: item.tanggal,
            jam_menit: item.jam_menit
        }));
    
        rendergaleryview();
        setgallerylayout(imagedata);
        initgalery();
        
        document.querySelector('#cardname').innerHTML = cust_name;
        document.querySelector('#Address').innerHTML = address;
        document.querySelector('#Full_Name').innerHTML = `${full_name} ${Job_Position}`;
    
        let startKunjungan = lokasi.start_kunjungan || null;
        let endKunjungan = lokasi.end_kunjungan || null;
        let counterInterval;
        
        if(endKunjungan){

            if (startKunjungan) {
                document.querySelector('#cin').innerText = startKunjungan.slice(11, 16);
                let cixEl = document.querySelector('#cix');
            
                let updateElapsedTime = () => {
                    let startDate = new Date(startKunjungan);
                    let endDate = endKunjungan ? new Date(endKunjungan) : new Date();
            
                    let elapsedMs = endDate - startDate;
                    elapsedMs = elapsedMs < 0 ? 0 : elapsedMs;
            
                    let totalSeconds = Math.floor(elapsedMs / 1000);
                    let hh = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
                    let mm = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
                    let ss = String(totalSeconds % 60).padStart(2, '0');
            
                    cixEl.innerText = `${hh}:${mm}:${ss}`;
                    if (endKunjungan) clearInterval(counterInterval);
                };
            
                updateElapsedTime();
                counterInterval = setInterval(updateElapsedTime, 1000);
            }
            
        }else{
            if (startKunjungan) {
                document.querySelector('#cin').innerText = startKunjungan.slice(11, 16);
                let cixEl = document.querySelector('#cix');
        
                let updateElapsedTime = () => {
                    let now = new Date();
                    let startParts = startKunjungan.slice(11, 19).split(':');
                    let startDate = new Date();
                    startDate.setHours(parseInt(startParts[0]), parseInt(startParts[1]), parseInt(startParts[2]), 0);
                    if (endKunjungan) {
                        let endParts = endKunjungan.slice(11, 19).split(':');
                        let endDate = new Date();
                        endDate.setHours(parseInt(endParts[0]), parseInt(endParts[1]), parseInt(endParts[2]), 0);
        
                        if (now > endDate) {
                            clearInterval(timerInterval); 
                            return;
                        }
                    }
        
                    let elapsedMs = now - startDate;
                    elapsedMs = elapsedMs < 0 ? 0 : elapsedMs;
        
                    let totalSeconds = Math.floor(elapsedMs / 1000);
                    let hh = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
                    let mm = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
                    let ss = String(totalSeconds % 60).padStart(2, '0');
        
                    cixEl.innerText = `${hh}:${mm}:${ss}`;
                };
        
                updateElapsedTime();
                var timerInterval = setInterval(updateElapsedTime, 1000);
            }
        }
    
        document.querySelector('#hasilx').value = lokasi.result || '';
    
        let formContainer = document.getElementById('formContainer');
        formContainer.innerHTML = '';
    
        (lokasi.details || []).forEach((item, index) => {
            let formHTML = `
                <div class="form-wrapper">
                    <div class="offer-head" style="margin-bottom: 15px;padding-bottom: 8px;">
                        <h4 style="font-size: 12px;text-transform: uppercase;">SKU #${index + 1}</h4>
                        <div class="flex-align-center gap-2">
                            <span class="delete-btn" onclick="deleteForm(this)">
                                <i class="iconsax icon error-icon" data-icon="trash-square"></i>
                            </span>
                        </div>
                    </div>
                    <div class="jotheme-form" style="margin-top: 15px;">
                        <div class="form-group">
                            <input type="text" class="form-controljo brand" placeholder=" " required value="${item.sku || ''}">
                            <label class="form-labeljo">Produk Competitor</label>
                        </div>
                        <div class="row" style="display: flex; gap: 20px;">
                            <div class="col-6" style="flex: 1;">
                                <div class="form-group">
                                    <input type="text" class="form-controljo harga" placeholder=" " required
                                        value="${item.price ? formatRupiah(item.price.toString()) : ''}" 
                                        oninput="this.value=formatRupiah(this.value)" 
                                        onkeydown="return onlyNumber(event)">
                                    <label class="form-labeljo">Harga</label>
                                </div>
                            </div>
                            <div class="col-6" style="flex: 1;margin-left: -35px;">
                                <div class="form-group">
                                    <input type="text" class="form-controljo pemakaian" placeholder=" " required
                                        value="${item.qty ? formatRupiah(item.qty.toString()) : ''}" 
                                        oninput="this.value=formatRupiah(this.value)" 
                                        onkeydown="return onlyNumber(event)">
                                    <label class="form-labeljo">Pemakaian Bulanan</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            formContainer.insertAdjacentHTML('beforeend', formHTML);
        });
    
        if (endKunjungan) {
            document.querySelector('.recr').classList.add('hide');
            document.querySelectorAll('.delete-btn').forEach(el => el.style.display = 'none');
            document.querySelectorAll('#formContainer input').forEach(input => input.disabled = true);
    
            let addBtn = document.getElementById('addFormBtn');
            if (addBtn) addBtn.style.display = 'none';
    
            let reasonPart = document.createElement('div');
            reasonPart.className = 'reason-part mt-3';
            reasonPart.innerHTML = `
                <h4 class="fw-medium error-color">Reason :</h4>
                <p>${lokasi.result || 'No reason provided.'}</p>
            `;
            formContainer.appendChild(reasonPart);
    
            document.querySelectorAll('.tbdone').forEach(btn => btn.classList.add('disabled'));
        }else{
            document.querySelector('.recr').classList.remove('hide');
            createForm();
        }
    
        let searchRes = await fetch(urlbe + 'tanyaalamat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ method: 'search', address, city,CardCode:cust_code })
        });
        let searchData = await searchRes.json();
    
        if (searchData?.status === 'success') {
            let firstLat = searchData.data?.lat;
            let firstLon = searchData.data?.lon;
    
            let reverseRes = await fetch(urlbe + 'carialamatlatlon', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ method: 'reverse', lat: lat, lon: lon })
            });
            let reverseData = await reverseRes.json();
    
            if (reverseData?.status === 'success') {
                document.querySelector('#alamat2').innerText = reverseData.data.display_name;
            }
    
            loadLeaflet().then(L => {
                if (lat && lon) {
                    let map = L.map('map').setView([lat, lon], 15);
                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '' }).addTo(map);
    
                    let iconHtml = '<img class="icon" src="./assets/images/svg/location-fill.svg" width="40" height="40" alt="location">';
                    let customIcon = L.divIcon({ html: iconHtml, className: 'custom-icon', iconSize: [30, 30], iconAnchor: [15, 30], popupAnchor: [0, -30] });
    
                    let marker = L.marker([lat, lon], { icon: customIcon }).addTo(map);
                    marker.bindPopup(`<strong>${full_name+' '+Job_Position}</strong><p>${reverseData.data.display_name}</p>`).openPopup();
    
                    let marker2 = L.marker([firstLat, firstLon], { icon: customIcon }).addTo(map);
                    marker2.bindPopup(`<strong>${cust_name}</strong><p>${address+' '+city}</p>`);
                }
            });
        } 
    }).catch(() => { });
    
    
    let formCount = 0
    let formContainer = document.getElementById('formContainer')

    window.formatRupiah = function(val){
        let number = val.replace(/\D/g, '')
        return number.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    }

    window.showFullScreenImage = function(el){
        let imgSrc = el.querySelector('img').getAttribute('src');
        let modalContent = document.querySelector('#full-screen .modal-content');
    
        let existingImg = modalContent.querySelector('img');
        if(existingImg) existingImg.remove();
    
        let modalImg = document.createElement('img');
        modalImg.setAttribute('src', imgSrc);
        modalImg.className = 'img-fluid object-fit-cover';
        modalImg.style.cssText = 'max-height: 100%; max-width: 100%; margin: auto; display: block; position: absolute; top:0; bottom:0; left:0; right:0;';
        
        modalContent.prepend(modalImg);
        
        let modalEl = document.getElementById('full-screen');
        modalEl.classList.add('show');
        modalEl.style.display = 'block';
        modalEl.setAttribute('aria-modal','true');
        modalEl.setAttribute('role','dialog');
    }
    
    window.saveKunjungan = async () => {
        let remark = document.getElementById('hasilx').value.trim();
        let formWrappers = document.querySelectorAll('#formContainer .form-wrapper');
    
        if (!remark) {
            showToast("Result Kunjungan Tidak Boleh Kosong.", "danger");
            return;
        }
    
        if (formWrappers.length === 0) {
            showToast("Data Tidak Boleh Kosong.", "danger");
            return;
        }
    
        let items = [];
        formWrappers.forEach(wrapper => {
            let brand = wrapper.querySelector('.brand').value.trim();
            let harga = wrapper.querySelector('.harga').value.replace(/\D/g, '');
            let pemakaian = wrapper.querySelector('.pemakaian').value.replace(/\D/g, '');
            if (brand && harga && pemakaian) {
                items.push({ brand, harga, pemakaian });
            }
        });
    
        if (items.length === 0) {
            showToast("Data Tidak Boleh Kosong.", "danger");
            return;
        }
    
        let hash = window.location.hash.split('?')[1] || '';
        let params = new URLSearchParams(hash);
    
        let id = params.get('id') || '';
        let cardname = params.get('cardname') || '';
        let cust_code = params.get('cust_code') || '';
        let cust_name = params.get('cust_name') || '';
        let address = params.get('Address') || '';
        let city = params.get('City') || '';
        let province = params.get('Province') || '';
        let full_name = params.get('Full_Name') || '';
        let job_position = params.get('Job_Position') || '';
        let minggu = params.get('minggu') || '';
        let hari = params.get('hari') || '';
        let foto = params.get('foto') || '';
        let start_kunjungan = params.get('start_kunjungan') || '';
        let usercode = params.get('usercode') || '';
    
        try {
            let response = await fetch(urlbe + 'simpankunjungan', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    remark,
                    data: items,
                    id,
                    cardname,
                    cust_code,
                    cust_name,
                    address,
                    city,
                    province,
                    full_name,
                    job_position,
                    minggu,
                    hari,
                    foto,
                    start_kunjungan,
                    usercode
                })
            });
    
            if (response.ok) {
                showToast("Data Berhasil di Simpan", "success");
                document.getElementById('hasilx').value = '';
                document.getElementById('formContainer').innerHTML = '';
                window.location.hash = 'home'
            } else {
                showToast("Gagal menyimpan data", "danger");
            }
        } catch (error) {
            console.error(error);
            showToast("Terjadi kesalahan saat menyimpan data", "danger");
        }
    };
    
    
    window.deleteForm = function(el){
        el.closest('.form-wrapper').remove()
        let wrappers = document.querySelectorAll('#formContainer .form-wrapper')
        formCount = 0
        wrappers.forEach((item) => {
            formCount++
            item.querySelector('.offer-head h4').innerText = `SKU #${formCount}`
        })
    }

    window.onlyNumber = function(e){
        if (!/[0-9]|Backspace|ArrowLeft|ArrowRight|Delete|Tab/.test(e.key)) {
            e.preventDefault()
            return false
        }
    }

    createForm()

}

export default renderListItem
