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
    let tanggal = params.get('tanggal') ? decodeURIComponent(params.get('tanggal')) : new Date().toISOString().split('T')[0]

    init_iconsax();
    document.querySelector('#app').innerHTML = `
        <link rel="stylesheet" href="./assets/css/leaflet.css"/>
        <link rel="stylesheet" href="./assets/css/listitem.css"/>
        <header id="header" class="main-header inner-page-header position-absolute bg-transparent" style="position: fixed!important;z-index: +9;">
            <div class="custom-container">
                <div class="header-panel p-0">
                    <a id="backbtn">
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
                        <div style="width:calc(100% - 100px);white-space: nowrap;">
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
                <i class="iconsax addcust" data-icon="add" id="addFormBtn" onclick="createForm()"></i>
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
                    <div class="form-group hide">
                        <input type="text" class="form-controljo" id="Phone" name="Phone" inputmode="numeric" pattern="[0-9]*" onkeydown="return onlyNumber(event)" placeholder=" " required="">
                        <label class="form-labeljo" for="Phone">No. Telepon</label>
                    </div>
                    <div class="form-group">
                        <textarea class="form-controljo hasilx" id="hasilx" placeholder="Masukkan remarks..." style="width: 100%; height: 140px;" required></textarea>
                        <label class="form-labeljo">Remarks</label>
                    </div>
                </div>
            </div>
            <div class="offcanvas-footer flex-align-center flex-nowrap gap-3 border-0 pt-3 px-0 pb-0">
                <span data-bs-dismiss="offcanvas"class="btn gray-btn title-color w-100 mt-0 bbatal">Batal</span>
                <span id="simpankujungan" onclick="saveKunjungan()" class="btn theme-btn w-100 mt-0">Simpan</span>
            </div>
        </div>
    `
    
    
    let loadLeaflet = () => {
        return new Promise((resolve, reject) => {
            if (window.L) { resolve(window.L); return;}
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
        
    let formCount = 0, formContainer = document.getElementById('formContainer');
    let createFormTemplate = (data = {}, idx = null) => {
        let hargaValue = data.price ? formatRupiah(String(data.price)) : '';
        let qtyValue = data.qty ? formatRupiah(String(data.qty)) : '';
        let produk = data.sku || '';
        return `
            <div class="form-wrapper">
                <div class="offer-head" style="margin-bottom: 15px;padding-bottom: 8px;">
                    <h4 style="font-size: 12px;text-transform: uppercase;">SKU #${idx !== null ? idx : ++formCount}</h4>
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
        formCount++;
        formContainer.insertAdjacentHTML('beforeend', createFormTemplate({}, formCount));
        init_iconsax();
    };

    let addFormsFromData = (items) => {
        formCount = 0;
        items.forEach((item, idx) => {
            formContainer.insertAdjacentHTML('beforeend', createFormTemplate(item, idx + 1));
            formCount++;
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
        } catch (err) {
            showToast("Tidak bisa mengakses mikrofon.", "danger");
        }
    };
    
    let stopAudioRecording = () => mediaRecorder?.state === 'recording' && mediaRecorder.stop();
    let uploadAudioToBackend = async blob => {
        if (!id) return showToast("ID Tidak Ditemukan.", "danger");
    
        const formData = new FormData();
        formData.append('id', id);
        formData.append('audio', blob, `recording_${Date.now()}.webm`); 
    
        try {
            const res = await fetch(urlbe + 'transcribe', { method: 'POST', body: formData });
            const result = await res.json();
    
            if (result.status === 'success') {
                hasilInput.value = result.transcript?.map(t => t.text).join('\n') || '';
                showToast("Audio berhasil diunggah dan ditranskrip.", "success");
            } else {
                showToast("Gagal memproses audio.", "danger");
            }
        } catch (err) {
            showToast("Gagal memproses audio.", "danger");
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
                <img src="${img.src}" alt="${img.alt}"  onerror="this.style.display='none';">
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

    
    let json_jadwalid = [];
    fetch(urlbe + 'listjadwalid', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
    })
    .then(res => res.json())
    .then(async resData => {
        json_jadwalid = resData;
        let lokasi = resData?.data || {};
        let start_date = resData?.start_date || new Date().toISOString().split('T')[0];
        let minggu = resData?.data?.minggu || getMingguHari()[0];
        let hari = resData?.data?.hari || getMingguHari()[1];        
        let lat = lokasi.lat ? parseFloat(lokasi.lat) : null;
        let lon = lokasi.lon ? parseFloat(lokasi.lon) : null;
        cust_name = lokasi.cust_name || '';
        full_name = lokasi.Full_Name || '';
        let Job_Position = lokasi.Job_Position || '';
        let Phone = lokasi.Phone || '';
        address = lokasi.Address || '';
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
    
        let backurl = `#home?tanggal=${start_date}&minggu=${minggu}&hari=${hari}`,
        backbtn = document.querySelector('#backbtn');
        backbtn.onclick = ()=>hrefs(backurl);

        document.querySelector('#Phone').value = Phone;
        if(Phone){
            document.querySelector('#Phone').classList.add('.hide');
        }


        document.querySelector('#cardname').innerHTML = cust_name;
        document.querySelector('#Address').innerHTML = address;
        document.querySelector('#Full_Name').innerHTML = `${full_name} ${Job_Position}`;
        document.querySelector('#hasilx').value = lokasi.result || '';
    
        let startKunjungan = lokasi.start_kunjungan || null;
        let endKunjungan = lokasi.end_kunjungan || null;
        let startTime = lokasi.start_time || null;
        let endTime = lokasi.end_time || null;
        let cixEl = document.querySelector('#cix');
    
        if (startTime) {
            document.querySelector('#cin').innerText = startKunjungan.slice(11, 16);
            let updateElapsedTime = () => {
                let toSeconds = (timeStr) => {
                    let [hh, mm, ss] = timeStr.split(':').map(Number);
                    return hh * 3600 + mm * 60 + ss;
                };
        
                let now = new Date();
                let currentTimeStr = [
                    String(now.getHours()).padStart(2, '0'),
                    String(now.getMinutes()).padStart(2, '0'),
                    String(now.getSeconds()).padStart(2, '0')
                ].join(':');
        
                let end = endTime || currentTimeStr;
                let startSeconds = toSeconds(startTime);
                let endSeconds = toSeconds(end);
        
                let elapsedSeconds = Math.max(0, endSeconds - startSeconds);
                let hh = String(Math.floor(elapsedSeconds / 3600)).padStart(2, '0');
                let mm = String(Math.floor((elapsedSeconds % 3600) / 60)).padStart(2, '0');
                let ss = String(elapsedSeconds % 60).padStart(2, '0');
                cixEl.innerText = `${hh}:${mm}:${ss}`;
                if (endTime) clearInterval(timerInterval); 
            };
        
            let timerInterval = setInterval(updateElapsedTime, 1000);
            updateElapsedTime();
        }
    
        let formContainer = document.getElementById('formContainer');
        formContainer.innerHTML = '';
    
        if (lokasi.details && lokasi.details.length > 0) {
            addFormsFromData(lokasi.details);
        }
    
        if (endKunjungan) {
            document.querySelector('.recr').classList.add('hide');
            document.querySelectorAll('.delete-btn').forEach(el => el.style.display = 'none');
            document.querySelectorAll('#formContainer input').forEach(input => {input.disabled = true});
    
            let addBtn = document.getElementById('addFormBtn');
            if (addBtn) addBtn.style.display = 'none';
    
            let reasonPart = document.createElement('div');
            reasonPart.className = 'reason-part mt-3';
            reasonPart.innerHTML = `<p>Result : ${lokasi.result || 'No reason provided.'}</p>`;
            formContainer.appendChild(reasonPart);
    
            document.querySelectorAll('.tbdone').forEach(btn => btn.classList.add('disabled'));
        } else {
            document.querySelector('.recr').classList.remove('hide');
            createForm();
        }
    
        let searchRes = await fetch(urlbe + 'tanyaalamat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ method: 'search', address, city, CardCode: cust_code })
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
                    let customIcon = L.divIcon({
                        html: iconHtml,
                        className: 'custom-icon',
                        iconSize: [30, 30],
                        iconAnchor: [15, 30],
                        popupAnchor: [0, -30]
                    });
    
                    let marker = L.marker([lat, lon], { icon: customIcon }).addTo(map);
                    marker.bindPopup(`<strong>${full_name} ${Job_Position}</strong><p>${reverseData.data.display_name}</p>`).openPopup();
    
                    if (firstLat && firstLon) {
                        let marker2 = L.marker([firstLat, firstLon], { icon: customIcon }).addTo(map);
                        marker2.bindPopup(`<strong>${cust_name}</strong><p>${address} ${city}</p>`);
                    }
                }
            });
        }
    }).catch(() => {});
    
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
            document.querySelector("#formContainer").scrollIntoView();
            document.querySelector(".form-controljo.brand").focus();
            document.querySelector(".bbatal").click();
            return;
        }

        let hash = window.location.hash.split('?')[1] || '';
        let params = new URLSearchParams(hash);

        const getValue = (paramName, jsonKey) => {
            let urlValue = params.get(paramName);
            if (urlValue !== null && urlValue !== '') {
                return urlValue;
            }
            return json_jadwalid?.data?.[jsonKey] || '';
        };

        let id = getValue('id', 'id');
        let cardname = getValue('cardname', 'cardname');
        let cust_code = getValue('cust_code', 'cust_code');
        let cust_name = getValue('cust_name', 'cust_name');
        let address = getValue('Address', 'Address');
        let city = getValue('City', 'City');
        let province = getValue('Province', 'Province');
        let full_name = getValue('Full_Name', 'Full_Name');
        let job_position = getValue('Job_Position', 'Job_Position');
        let minggu = getValue('minggu', 'minggu');
        let hari = getValue('hari', 'hari');
        let foto = getValue('foto', 'foto');
        let start_kunjungan = getValue('start_kunjungan', 'start_kunjungan');
        let usercode = getValue('usercode', 'usercode');
        let phone = document.querySelector('#Phone').value.trim();
        let durasi = document.querySelector("#cix").innerHTML;
        try {
            let response = await fetch(urlbe + 'simpankunjungan', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    durasi,
                    phone,
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
                window.location.hash = `home?tanggal=${tanggal}&usercode=${usercode}&minggu=${minggu}&hari=${hari}`;
            } else {
                showToast("Gagal menyimpan data", "danger");
            }
        } catch (error) {
            showToast("Terjadi kesalahan saat menyimpan data", "danger");
        }
    };
    
    
    window.deleteForm = function(el){
        el.closest('.form-wrapper').remove();
        let wrappers = document.querySelectorAll('#formContainer .form-wrapper');
        formCount = 0;
        wrappers.forEach((item) => {
            formCount++;
            item.querySelector('.offer-head h4').innerText = `SKU #${formCount}`;
        });
    };

    window.onlyNumber = function(e){
        if (!/[0-9]|Backspace|ArrowLeft|ArrowRight|Delete|Tab/.test(e.key)) {
            e.preventDefault()
            return false
        }
    }
}

export default renderListItem
