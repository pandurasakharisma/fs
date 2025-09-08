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
                background: #c53f3f;
                padding: 100px 20px 190px;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
                overflow: hidden;
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
            .bgm:before {
                content: " ";
                width: calc(100% + 15rem);
                height: 100%;
                position: absolute;
                left: 0;
                top: 0;
                background-image: url(./assets/images/bgbca.svg);
                background-position: -10rem -14rem;
                background-repeat: no-repeat;
                background-size: cover;
            }
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
                min-height: calc(100vh - 240px);
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
            .closefoto svg{
                stroke: #000;
                right: 10px;
                top: 10px;
                position: absolute;
                width: 48px;
                height: 48px;
                fill: #fff;
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
                padding: 10px 20px;
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
                animation: pulse 1s infinite;
                cursor: pointer;
            }
            .recr {
                display: block;
                margin: 20px auto;
                width: 40px;
            }
            .recr:before {
                content: "";
                width: 100%;
                position: absolute;
                top: 50px;
                height: 3px;
                background: #ae3333;
                left: 0;
            }
            .recr svg {
                background: #c53f3f;
                stroke: #fff;
                padding: 8px;
                border-radius: 18px;
                margin: 10px auto;
                display: block;
                animation: pulse 1s infinite;
            }
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
                <div class="pntoko">
                    <div class="d-flex align-items-center mb-3">
                        <div style="width: calc(100% - 70px);">
                            <h2 id="cardname" class="fw-bold mb-1">Jonathan Higgins</h2>
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

                    <div class="position-relative rounded overflow-hidden mb-3" style="height:120px;">
                        <a  data-bs-toggle="modal" href="#full-screen">
                            <img id="foto" src="" class="img-fluid w-100 h-100 object-fit-cover" alt="Photo"/>
                            <h2 class="position-absolute  fw-bold" style="bottom: 35%;left:50%;transform:translateX(-50%);font-size:14px;background: #ae3333;padding: 10px;border-radius: 8px;color: #fff;">
                                Image Preview
                            </h2>
                        </a>
                    </div>

                    <div class="d-flex align-items-center gap-2 mb-3 p-2 border rounded" style="background:rgba(var(--box-bg), 1);">
                        <img src="./assets/images/svg/location-fill.svg" alt="location" width="24">
                        <div style="width:calc(100% - 100px);">
                            <strong id="Full_Name">Novenny (Key Account Executive)</strong>
                            <p id="alamat2" class="mb-0 text-muted" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;width: 100%;">JL. Indokarya</p>
                        </div>
                        <div class="ms-auto text-end">
                            <small class="text-muted d-block">Clock In</small>
                            <strong id="cin">09:05</strong>
                        </div>
                    </div>
                </div>
            </section>
            <section class="seclist" style="padding-top:0;">
                <div id="recr" class="recr">
                    <i class="iconsax icon" data-icon="mic-1"></i>
                </div>
                <div class="custom-container">
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
                    <a class="btn white-btn title-color w-100 mt-0" href="./index.html">Cancel</a>
                </div>
            </section>
        </main>
        <div class="fixed-btn" style="border-top: 4px solid #ae3333;border-radius: 18px 18px 0 0;padding: 20px 0 8px;">
            <div class="custom-container d-flex">
                <div class="cix">
                    <small>Durasi Kunjungan</small>
                    <div id="cix">18.95</div>
                </div>
                <span href="#remarks" data-bs-toggle="offcanvas" class="btn tbdone">Selesai</span>
            </div>
        </div>
        <div class="modal element-modal fade" id="full-screen" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-fullscreen">
                <div class="modal-content" style="z-index: +4;background: #000;" data-bs-dismiss="modal">
                    <i class="iconsax icon closefoto" data-icon="close-circle" data-bs-dismiss="modal"></i>
                </div>
            </div>
        </div>
        <div class="offcanvas ride-offcanvas" tabindex="-1" id="remarks">
            <div class="offcanvas-body p-0">
                <h3>Berikan Kesimpulan Hasil Diskusi</h3>
                <i class="iconsax icon-btn" data-icon="mic-1"> </i>
                <div class="jotheme-form" style="margin-top: 15px;">
                    <div class="form-group">
                        <textarea class="form-controljo brand" placeholder="Masukkan remarks..." style="width: 100%; height: 40px;" required></textarea>
                        <label class="form-labeljo">Remarks</label>
                    </div>
                </div>
            </div>
            <div class="offcanvas-footer flex-align-center flex-nowrap gap-3 border-0 pt-3 px-0 pb-0">
                <a href="selact-ride.html" class="btn gray-btn title-color w-100 mt-0">Skip</a>
                <a href="selact-ride.html" class="btn theme-btn w-100 mt-0">Continue</a>
            </div>
        </div>
    `
    
    
    let loadLeaflet = () => {
        return new Promise((resolve, reject) => {
            if (window.L) {
                resolve(window.L)
                return
            }
            const script = document.createElement('script')
            script.src = "./assets/js/leaflet.js"
            script.async = true
            script.onload = () => resolve(window.L)
            script.onerror = () => reject(new Error("Gagal memuat Leaflet JS"))
            document.body.appendChild(script)
        })
    }

    window.startSpeechToText = () => {
        const formContainer = document.getElementById('formContainer');
        formContainer.style.display = 'none';
    
        let existing = document.getElementById('speechContainer');
        if (existing) existing.remove();
    
        const speechWrapper = document.createElement('div');
        speechWrapper.id = 'speechContainer';
        speechWrapper.style.padding = '15px';
        speechWrapper.style.marginTop = '10px';
        speechWrapper.style.background = 'rgba(255,255,255,0.9)';
        speechWrapper.style.borderRadius = '8px';
        speechWrapper.innerHTML = `
            <h4>Speech to Text</h4>
            <textarea id="speechText" style="width:100%;height:100px;padding:10px;border:1px solid #ccc;border-radius:6px;" placeholder="Mulai bicara..."></textarea>
            <div style="margin-top:10px;">
                <button id="startRecBtn" class="btn theme-btn">Mulai Rekam</button>
                <button id="stopRecBtn" class="btn gray-btn">Stop</button>
            </div>
        `;
    
        formContainer.parentNode.insertBefore(speechWrapper, formContainer.nextSibling);
    
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert('Browser tidak mendukung Speech Recognition');
            return;
        }
    
        const recognition = new SpeechRecognition();
        recognition.lang = 'id-ID';
        recognition.interimResults = true;
        recognition.continuous = true;
    
        const textarea = document.getElementById('speechText');
    
        recognition.onresult = (event) => {
            let transcript = '';
            for (let i = event.resultIndex; i < event.results.length; i++) {
                transcript += event.results[i][0].transcript;
            }
            textarea.value = transcript;
        };
    
        document.getElementById('startRecBtn').onclick = () => recognition.start();
        document.getElementById('stopRecBtn').onclick = () => recognition.stop();
    };
    
    document.getElementById('recr').onclick = () => startSpeechToText();
    
    
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
        let city = lokasi.City || '';
        let foto  = lokasi.foto || null;

        document.querySelector('#cardname').innerHTML = cust_name;
        document.querySelector('#Address').innerHTML = address;
        document.querySelector('#Full_Name').innerHTML = full_name+' '+Job_Position;

        if(foto){
            document.querySelector('#foto').setAttribute('src',urlbe+'upload/gambar/'+foto);
        }

        let startKunjungan = lokasi.start_kunjungan || null;
        if (startKunjungan) {
            document.querySelector('#cin').innerText = startKunjungan.slice(11,16);
        
            const cixEl = document.querySelector('#cix');
        
            const updateElapsedTime = () => {
                let startParts = startKunjungan.slice(11,19).split(':');
                let startDate = new Date();
                startDate.setHours(parseInt(startParts[0]), parseInt(startParts[1]), parseInt(startParts[2]), 0);
        
                let now = new Date();
                let elapsedMs = now - startDate;
                elapsedMs = elapsedMs < 0 ? 0 : elapsedMs;
        
                let totalSeconds = Math.floor(elapsedMs / 1000);
                let hh = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
                let mm = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
                let ss = String(totalSeconds % 60).padStart(2, '0');
        
                cixEl.innerText = `${hh}:${mm}:${ss}`;
            }
        
            updateElapsedTime();
            setInterval(updateElapsedTime, 1000);
        }
        

        

        let searchRes = await fetch(urlbe + 'carialamatlatlon', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ method: 'search', address, city })
        });
        let searchData = await searchRes.json();
    
        if (searchData?.status === 'success') {
            let firstLat = searchData.data.lat;
            let firstLon = searchData.data.lon;
    
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
        } else {
            document.querySelector('#map').innerHTML = '<p style="text-align:center;padding:20px;">Alamat tidak ditemukan</p>';
        }
    })
    .catch(() => {
        document.querySelector('#map').innerHTML = '<p style="text-align:center;padding:20px;">Gagal memuat data</p>';
    });
    

    let formCount = 0
    const formContainer = document.getElementById('formContainer')

    window.formatRupiah = function(val){
        const number = val.replace(/\D/g, '')
        return number.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    }

    window.showFullScreenImage = function(el){
        const imgSrc = el.querySelector('img').getAttribute('src');
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
    
    document.querySelector('a[data-bs-toggle="modal"]').setAttribute('onclick', 'showFullScreenImage(this)');

    

    window.createForm = function(){
        formCount++
        const wrapper = document.createElement('div')
        wrapper.className = 'form-wrapper'
        wrapper.innerHTML = `
            <div class="offer-head" style="margin-bottom: 15px;padding-bottom: 8px;">
                <h4 style="font-size: 12px;text-transform: uppercase;">SKU #${formCount}</h4>
                <div class="flex-align-center gap-2">
                    <span class="delete-btn" onclick="deleteForm(this)">
                        <i class="iconsax icon error-icon" data-icon="trash-square"></i>
                    </span>
                </div>
            </div>
            <div class="jotheme-form" style="margin-top: 15px;">
                <div class="form-group">
                    <input type="text" class="form-controljo brand" placeholder=" " required>
                    <label class="form-labeljo">Produk Competitor</label>
                </div>
                <div class="row" style="display: flex; gap: 20px;">
                    <div class="col-6" style="flex: 1;">
                        <div class="form-group">
                            <input type="text" class="form-controljo harga" placeholder=" " required inputmode="numeric" pattern="[0-9]*" oninput="this.value=formatRupiah(this.value)" onkeydown="return onlyNumber(event)">
                            <label class="form-labeljo">Harga</label>
                        </div>
                    </div>
                    <div class="col-6" style="flex: 1;">
                        <div class="form-group">
                            <input type="text" class="form-controljo pemakaian" placeholder=" " required inputmode="numeric" pattern="[0-9]*" onkeydown="return onlyNumber(event)">
                            <label class="form-labeljo">Pemakaian Bulanan</label>
                        </div>
                    </div>
                </div>
            </div>
        `
        formContainer.appendChild(wrapper)
        init_iconsax()
    }

    window.deleteForm = function(el){
        el.closest('.form-wrapper').remove()
        const wrappers = document.querySelectorAll('#formContainer .form-wrapper')
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
