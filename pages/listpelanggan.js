export let renderlistpelanggan = () => {
    let selectedStores = [];
    let hash = window.location.hash.substring(1);
    let [route, queryString] = hash.split('?');
    
    let urlParams = new URLSearchParams(queryString);    


    let usercode = urlParams.get('usercode') || document.querySelector('#usercode').value;  
    let mingguUrl = urlParams.get('minggu') || null;
    let hariUrl = urlParams.get('hari') || null;
    let tanggalurl = urlParams.get('tanggal') || null;
    let tanggal = urlParams.get('tanggal') || null;
    let reff_id = urlParams.get('reff_id') || null;

    document.querySelector('#app').innerHTML = `
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
                align-items: flex-end; /* muncul dari bawah */
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
                bottom: 80px;
                right: 20px;
                width: 48px;
                height: 48px;
                cursor: pointer;
                z-index: 9999;
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
                z-index: +2;
                max-width: calc(600px);
                box-shadow: 0px 0px 10px rgb(0 0 0 / 21%);
            }

            .totl{
                background: #c53f3f;
                color: #fff;
                padding: 5px 10px;
                width: 28px;
                height: 30px;
                line-height: .8;
                margin: 8px;
                border-radius: 4px;
            }

            .rider-options {
                width: 90px;
                padding: 8px;
                font-size: 13px;
                align-items: center;
                gap: 10px;
                color: rgba(var(--title-color), 1);
                background-color: rgba(var(--box-bg), 1);
                border-radius: 6px;
                border-color: transparent;
                box-shadow: none;
                --bs-form-select-bg-img: none;
            }

            .skeleton-loader {
                background: #f0f0f0;
                border-radius: 6px;
                overflow: hidden;
                position: relative;
                margin-bottom: 10px;
                padding: 10px;
            }

            .skeleton-loader-line {
                height: 14px;
                background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
                background-size: 200% 100%;
                border-radius: 4px;
                animation: shimmer 1.5s infinite;
                margin: 6px 0;
            }

            @keyframes shimmer {
                0% { background-position: -200% 0; }
                100% { background-position: 200% 0; }
            }
            
        </style>
        <header id="header" class="main-header inner-page-header">
            <div class="custom-container">
                <div class="header-panel">
                <div class="flex-spacing gap-2 w-100" style="align-items: center; display: flex;">
                    <a class="back-btn backcp">
                        <i class="iconsax icon-btn" data-icon="chevron-left" height="40" width="40" style="border: none;margin-left: -10px;"></i>
                    </a>
                    <div class="location-box flex-grow-1" style="background-color: rgba(var(--box-bg), 1);display: flex;align-items: center;border-radius: 6px;padding: 8px;">
                        <img class="icon" src="./assets/images/svg/gps.svg" alt="location" style="width:18px; margin-right:6px;">
                        <input type="text" id="searchInput" class="form-control border-0 p-0" placeholder="Cari Lokasi" style="background: none;flex:1; box-shadow:none;">
                        <img id="clearBtn" class="clear-btn" width="12" style="display:none; cursor:pointer;margin-right:6px;" src="data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23000'%3e%3cpath d='M.293.293a1 1 0 0 1 1.414 0L8 6.586 14.293.293a1 1 0 1 1 1.414 1.414L9.414 8l6.293 6.293a1 1 0 0 1-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 0 1-1.414-1.414L6.586 8 .293 1.707a1 1 0 0 1 0-1.414z'/%3e%3c/svg%3e" alt="clear">
                    </div>
                </div>
                </div>
            </div>
        </header>
        <main>
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
                <i class="iconsax addcust" data-icon="add" id="addform"></i>
                <div class="offcanvas-footer tbf2 ride-offcanvas hide">
                    <div class="offcanvas-body p-0 d-flex flex-spacing gap-2">
                        <h5 style="line-height:2;font-size:11px;"><span class='totl'></span>Lokasi Ditambahkan ? </h5>
                        <select class="form-select rider-options hide">
                            <option selected="">Switch Rider</option>
                            <option value="1">My Self</option>
                        </select>
                    </div>
                    <div class="flex-align-center flex-nowrap gap-3 border-0 pt-3 " style='border-bottom:1px solid rgba(var(--line-color), 1);'>
                        <span class="btn theme-btn w-100 mt-0 addcustx">Simpan</span>
                        <span class="btn white-btn title-color w-100 mt-0" onclick="hrefs('home')">Cancel</span>
                    </div>
                </div>
            </section>
            <div id="modpop">
                <div id="olay"></div>
                <div class="theme-content-bg">
                    <div class="title mt-4"><h3>Registrasi Customer</h3></div>
                    <form class="jotheme-form" style="margin-bottom:100px;">
                        <div class="form-group">
                            <input type="text" class="form-controljo" id="CardName" name="CardName" placeholder=" " required>
                            <label class="form-labeljo" for="CardName">Nama Pelanggan</label>
                        </div>

                        <div class="form-group">
                            <input type="text" class="form-controljo" id="Address" name="Address" placeholder=" " required>
                            <label class="form-labeljo" for="Address">Alamat</label>
                        </div>

                        <div class="form-group">
                            <input type="text" class="form-controljo" id="City" name="City" placeholder=" " required>
                            <label class="form-labeljo" for="City">Kota</label>
                        </div>

                        <div class="form-group">
                            <input type="text" class="form-controljo" id="Province" name="Province" placeholder=" " required>
                            <label class="form-labeljo" for="Province">Provinsi</label>
                        </div>

                        <div class="form-group">
                            <input type="text" class="form-controljo" id="Phone" name="Phone" placeholder=" " required>
                            <label class="form-labeljo" for="Phone">No. Telepon</label>
                        </div>

                        <div class="form-group">
                            <input type="text" class="form-controljo" id="PIC" name="PIC" placeholder=" " required>
                            <label class="form-labeljo" for="PIC">Penanggung Jawab (PIC)</label>
                        </div>

                        <div class="order-type"></div>
                    </form>
                    <div class="offcanvas-footer tbf flex-align-center flex-nowrap gap-3 border-0 pt-3 px-0 pb-0" style='border-bottom:1px solid rgba(var(--line-color), 1);'>
                        <span class="btn theme-btn w-100 mt-0 pulse simpancust">Simpan</span>
                        <span class="btn white-btn title-color w-100 mt-0 closepopup" onclick="closePopup()">Cancel</a>
                    </div>
                </div>
            </div>
        </main>
        <section class="panel-space"></section>
    `
    document.querySelector('body').removeAttribute('style');
    let backcp = document.querySelector('.backcp');
    if(backcp){        
        let now = new Date();
        let minggu = mingguUrl || String(getMingguKe(now));
        let hari = hariUrl || String(getHariMon1(now));
        let nurl = `home?tanggal=${tanggal}&minggu=${minggu}&hari=${hari}&usercode=${usercode}`;
        backcp.setAttribute('onclick',`hrefs('${nurl}')`);
    }
    
    let openPopup = () => document.getElementById('modpop').classList.add('show');
    let closePopup = () => document.getElementById('modpop').classList.remove('show');

    document.querySelectorAll('.closepopup').forEach((el)=>{
        if(el){
            el.onclick = ()=>document.getElementById('modpop').classList.remove('show')
        }
    })

    let currentPage = 1;
    let isLoading = false;
    let hasMore = true;
    let limit = 20;
    let currentSearch = '';
    let searchTimeout = null;

    let addToJadwal = async (store) => {
        let now = new Date();
        let minggu = mingguUrl || String(getMingguKe(now));
        let hari = hariUrl || String(getHariMon1(now));
        let tanggal = tanggalurl || String(now.getDate()).padStart(2, '0');
        
        let data = localStorage.getItem('user_data'),
        obj = data ? JSON.parse(data) : null,
        cardId = obj && obj.Card_ID ? String(obj.Card_ID) : '',
        code = cardId.includes(',') ? cardId.split(',')[0].trim() : cardId;

        let payload = {
            cardcode: store.CardCode,
            cardname: store.CardName,
            usercode,
            foto: null,
            lat: null,
            lon: null,
            start_kunjungan: null,
            end_kunjungan: null,
            created_by: code,
            minggu,
            hari,
            tanggal,
            result: null,
            created_at: fmtDateTime(now)
        };

        try {
            let response = await fetch(urlbe + "addtojadwal", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                // showToast(`${store.CardName} ditambahkan ke jadwal.`, "success");
            } else {
                showToast("Tidak bisa menambahkan ke jadwal.", "danger");
            }
        } catch (e) {
            showToast("Tidak dapat terhubung ke server.", "danger");
        }
    };

    let updateTbf2Visibility = () => {
        let readyItems = document.querySelectorAll('#placeList li[data-ready="1"]');
        let tbf2 = document.querySelector('.tbf2');
        if (tbf2) {
            if (readyItems.length > 0) {
                tbf2.classList.remove('hide'); 
                document.querySelector('.totl').innerHTML = parseInt(readyItems.length);
            } 
            else {tbf2.classList.add('hide');}
        }
    };
    let renderStores = (stores, placeList, templateItem) => {
        stores.forEach(store => {
            let li = templateItem.cloneNode(true);
            li.style.display = 'block';
            li.querySelector('.card-name').textContent = store.CardName;
            li.querySelector('.address').textContent = 
            (store.Address && store.Address.toLowerCase() !== "null" && store.Address.trim() !== "")
              ? `${store.Address} - ${store.City}`
              : store.City;
          
            let icon = li.querySelector('.icon');
            li.dataset.ready = "0"; 
            li.dataset.store = JSON.stringify(store);
            li.onclick = async () => {
                let storeData = JSON.parse(li.dataset.store);
                if (li.dataset.ready === "0") {
                    li.dataset.ready = "1";
                    li.classList.add('ready');
                    li.querySelector('.icon').src = "./assets/images/svg/oke.svg";
                    if (!selectedStores.some(s => s.CardCode === storeData.CardCode)) {
                        selectedStores.push(storeData);
                    }
                } else {
                    li.dataset.ready = "0";
                    li.classList.remove('ready');
                    li.querySelector('.icon').src = "./assets/images/svg/location-fill.svg";
                    selectedStores = selectedStores.filter(s => s.CardCode !== storeData.CardCode);
                }


                if(reff_id){
                    let now = new Date();
                    let minggu = mingguUrl || String(getMingguKe(now)),
                    hari = hariUrl || String(getHariMon1(now));
                    let store = selectedStores[0];
                    await addToJadwal(store);
                    
                    showToast(`1 pelanggan berhasil ditambahkan ke jadwal.`, "success");
                    selectedStores = [];
                    setTimeout(() => {
                        window.location.hash = `home?tanggal=${tanggal}&minggu=${minggu}&hari=${hari}&usercode=${usercode}`;
                    }, 100);
                }else{
                    updateTbf2Visibility();   
                }
            };
            

            placeList.appendChild(li);
        });
    };
    
    document.querySelector(".addcustx").onclick = async () => {
        let now = new Date();
        let minggu = mingguUrl || String(getMingguKe(now));
        let hari = hariUrl || String(getHariMon1(now));
        
        if (selectedStores.length === 0) {showToast("Tidak ada pelanggan yang dipilih.", "danger");return;}
    

        for (let store of selectedStores) {
            await addToJadwal(store);
        }

        showToast(`${selectedStores.length} pelanggan berhasil ditambahkan ke jadwal.`, "success");
        selectedStores = [];
        setTimeout(() => {
            window.location.hash = `home?tanggal=${tanggal}&minggu=${minggu}&hari=${hari}&usercode=${usercode}`;
        }, 100);
    };

    document.querySelector(".simpancust").onclick = async ()=> {
        let now = new Date();
        let minggu = mingguUrl || String(getMingguKe(now));
        let hari = hariUrl || String(getHariMon1(now));
        let form = document.querySelector(".jotheme-form");
        let formData = new FormData(form);
        let data = {};
        let kosong = false;
        formData.forEach((value, key) => {
            data[key] = value.trim();
            if (!value.trim()) kosong = true;
        });
        data["usercode"] = userCode;
        closePopup();
        if (kosong) {
            showToast("Semua field harus diisi.", "danger");
            openPopup();
            return;
        }
        try {
            let response = await fetch(urlbe + "addpelanggan", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                showToast("Data pelanggan berhasil disimpan.", "success");
                form.reset();
                window.location.hash = `home?tanggal=${tanggal}&minggu=${minggu}&hari=${hari}&usercode=${usercode}`;
            } else {
                showToast("Terjadi kesalahan saat menyimpan data.", "danger");
            }
        } catch {showToast("Tidak dapat terhubung ke server.", "danger");}
    };

    let placeList = document.getElementById('placeList');
    let templateItem = document.querySelector('.recent-place-item');

    showSkeleton(placeList, limit);

    let fetchAndRenderStores = async (reset = false) => {
        
        let now = new Date();
        let minggu = mingguUrl || String(getMingguKe(now));
        let hari = hariUrl || String(getHariMon1(now));
        if (!usercode) {
            console.log("Usercode belum tersedia.");
            return;
        }

        if (isLoading || !hasMore) return;
        isLoading = true;

        let searchInput = document.getElementById("searchInput");
        if(document.getElementById("searchInput")){

            currentSearch = document.getElementById("searchInput").value.trim();
    
            if (reset) {
                placeList.innerHTML = '';
                showSkeleton(placeList, limit);
                currentPage = 1;
                hasMore = true;
            } else {
                showSkeleton(placeList, limit);
            }
    
            try {
                let response = await fetch(urlbe + 'caripelanggan', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ usercode, minggu, hari, search: currentSearch, page: currentPage, limit })
                });
                let result = await response.json();
    
                removeSkeleton(placeList);
    
                if (response.ok && result.status === 'success' && result.data?.length > 0) {
                    renderStores(result.data, placeList, templateItem);
                    currentPage++;
                    hasMore = result.pagination?.hasMore ?? false;
                } else {
                    hasMore = false;
                    if (currentPage === 1) {
                        placeList.innerHTML = '<li><img class="e404" src="./assets/images/kosong.svg" alt="Not Found"/><p>Tidak ada data ditemukan.</p></li>';
                    }
                }
            } catch (e) {
                console.error('Error fetching store data:', e);
                removeSkeleton(placeList);
                if (currentPage === 1) {
                    placeList.innerHTML = '<li><img class="e404" src="./assets/images/kosong.svg" alt="Not Found"/><p>Terjadi kesalahan saat memuat data.</p></li>';
                }
                showToast("Terjadi kesalahan saat memuat data.", "danger");
            }
    
        }
        isLoading = false;
    };

    let handleSearch = e => {
        currentSearch = e.target.value.trim();
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            hasMore = true;
            fetchAndRenderStores(true);
        }, 800);
    };

    let searchInput = document.getElementById("searchInput"),
        clearBtn = document.getElementById("clearBtn");

    searchInput.onkeyup = (el) => {
        if (el.key == 'Backspace' && el.target.value == '') {
            clearBtn.click();
        }
        clearBtn.style.display = el.target.value !== '' ? "block" : "none";
    };

    clearBtn.onclick = () => {
        searchInput.value = "";
        clearBtn.style.display = "none";
        currentSearch = "";
        currentPage = 1;
        hasMore = true;
        fetchAndRenderStores(true);
    };

    document.getElementById('addform').onclick = () => openPopup();
    document.getElementById('olay').onclick = () => closePopup();

    searchInput.oninput = handleSearch;
    let xscr = 0;
    window.onscroll = () => {
        let totalHeightOfContent = document.body.scrollHeight;
        if (window.innerHeight + window.scrollY >= (totalHeightOfContent -400)) {
            fetchAndRenderStores();
            xscr++;
        }
    };

    let waitUsercode = setInterval(() => {
        let el = document.getElementById("usercode");
        if (el && el.value) {
            clearInterval(waitUsercode);
            usercode = usercode ?? el.value;
            setTimeout(() => {
                hasMore = true;
                fetchAndRenderStores();
            }, 60);
        }
    }, 60);
}


export default renderlistpelanggan 