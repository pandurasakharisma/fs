export const renderLogin = () => {
    let selectedStores = [];
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
                margin: 0 auto;
                z-index: +2;
                width: calc(100%);
                background: #fff;
                max-width: calc(600px);
                padding: 20px 10px 9px;
                box-shadow: 0px 0px 10px rgb(0 0 0 / 21%);
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
                    <a onclick="hrefs('home')" class="back-btn">
                        <i class="iconsax icon-btn" data-icon="chevron-left" height="40" width="40" style="border: none;margin-left: -10px;"></i>
                    </a>
                    <div class="location-box flex-grow-1" style="background-color: rgba(var(--box-bg), 1);display: flex;align-items: center;border-radius: 6px;padding: 8px;">
                        <img class="icon" src="./assets/images/svg/gps.svg" alt="location" style="width:18px; margin-right:6px;">
                        <input type="text" id="searchInput" class="form-control border-0 p-0" placeholder="Enter destination" style="background: none;flex:1; box-shadow:none;">
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
                        <h5>Yakin menambahkan <span class='totl'></span>Lokasi ? </h5>
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
                    <form class="theme-form" style="margin-bottom:100px;">
                        <div class="form-group">
                            <label class="form-label mb-2" for="CardName">Nama Pelanggan</label>
                            <input type="text" class="form-control" id="CardName" name="CardName" placeholder="Masukkan nama pelanggan" required>
                        </div>

                        <div class="form-group">
                            <label class="form-label mb-2" for="Address">Alamat</label>
                            <input type="text" class="form-control" id="Address" name="Address" placeholder="Masukkan alamat" required>
                        </div>

                        <div class="form-group">
                            <label class="form-label mb-2" for="City">Kota</label>
                            <input type="text" class="form-control" id="City" name="City" placeholder="Masukkan kota" required>
                        </div>

                        <div class="form-group">
                            <label class="form-label mb-2" for="Province">Provinsi</label>
                            <input type="text" class="form-control" id="Province" name="Province" placeholder="Masukkan provinsi" required>
                        </div>

                        <div class="form-group">
                            <label class="form-label mb-2" for="Phone">No. Telepon</label>
                            <input type="text" class="form-control" id="Phone" name="Phone" placeholder="Masukkan nomor telepon" required>
                        </div>

                        <div class="form-group">
                            <label class="form-label mb-2" for="PIC">Penanggung Jawab (PIC)</label>
                            <input type="text" class="form-control" id="PIC" name="PIC" placeholder="Masukkan nama penanggung jawab" required>
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
    const limit = 20;
    let currentSearch = '';
    let searchTimeout = null, usercode = null;

    const addToJadwal = async (store) => {
        const now = new Date();
        const minggu = String(getMingguKe(now));
        const hari = String(getHariMon1(now));
        const userCode = document.getElementById("usercode")?.value || "";
        const payload = {
            cardcode: store.CardCode,
            cardname: store.CardName,
            usercode: userCode,
            foto: null,
            lat: null,
            lon: null,
            start_kunjungan: null,
            end_kunjungan: null,
            created_by: userCode,
            minggu,
            hari,
            result: null,
            created_at: fmtDateTime(now)
        };
        try {
            const response = await fetch(urlbe + "addtojadwal", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
            if (response.ok) {
                showToast(`${store.CardName} ditambahkan ke jadwal.`, "success");
            } else {
                showToast("Tidak bisa menambahkan ke jadwal.", "danger");
            }
        } catch (e) {
            showToast("Tidak dapat terhubung ke server.", "danger");
        }
    };

    let updateTbf2Visibility = () => {
        const readyItems = document.querySelectorAll('#placeList li[data-ready="1"]');
        const tbf2 = document.querySelector('.tbf2');
        if (tbf2) {
            if (readyItems.length > 0) {
                tbf2.classList.remove('hide'); 
                document.querySelector('.totl').innerHTML = parseInt(readyItems.length);
            } 
            else {tbf2.classList.add('hide');}
        }
    };
    const renderStores = (stores, placeList, templateItem) => {
        stores.forEach(store => {
            const li = templateItem.cloneNode(true);
            li.style.display = 'block';
            li.querySelector('.card-name').textContent = store.CardName;
            li.querySelector('.address').textContent = 
            (store.Address && store.Address.toLowerCase() !== "null" && store.Address.trim() !== "")
              ? `${store.Address} - ${store.City}`
              : store.City;
          
            const icon = li.querySelector('.icon');
            li.dataset.ready = "0"; 
            li.dataset.store = JSON.stringify(store);
            li.onclick = () => {
                const storeData = JSON.parse(li.dataset.store);
            
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

                updateTbf2Visibility();
            };
            

            placeList.appendChild(li);
        });
    };
    
    document.querySelector(".addcustx").onclick = async () => {
        if (selectedStores.length === 0) {showToast("Tidak ada pelanggan yang dipilih.", "danger");return;}
    

        for (const store of selectedStores) {
            await addToJadwal(store);
        }

        showToast(`${selectedStores.length} pelanggan berhasil ditambahkan ke jadwal.`, "success");
        selectedStores = [];
        setTimeout(() => {
            window.location.hash = '/home'
        }, 800);
    };

    document.querySelector(".simpancust").onclick = async function () {
        let form = document.querySelector(".theme-form");
        let formData = new FormData(form);
        let data = {};
        let kosong = false;
        formData.forEach((value, key) => {
            data[key] = value.trim();
            if (!value.trim()) kosong = true;
        });
        let userCode = document.getElementById("usercode")?.value || "";
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
                window.location.hash = '/home'
            } else {
                showToast("Terjadi kesalahan saat menyimpan data.", "danger");
            }
        } catch {
            showToast("Tidak dapat terhubung ke server.", "danger");
        }
    };

    const placeList = document.getElementById('placeList');
    const templateItem = document.querySelector('.recent-place-item');

    showSkeleton(placeList, limit);

    const fetchAndRenderStores = async (reset = false) => {
        let { minggu, hari } = getMingguHari();
        if (!usercode) {
            console.log("Usercode belum tersedia.");
            return;
        }

        if (isLoading || !hasMore) return;
        isLoading = true;

        let searchInput = document.getElementById("searchInput");
        if(document.getElementById("searchInput")){

            currentSearch = document.getElementById("searchInput").value.trim();
            usercode = document.getElementById("usercode").value.trim();
    
            if (reset) {
                placeList.innerHTML = '';
                showSkeleton(placeList, limit);
                currentPage = 1;
                hasMore = true;
            } else {
                showSkeleton(placeList, limit);
            }
    
            try {
                const response = await fetch(urlbe + 'caripelanggan', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ usercode: usercode, minggu, hari, search: currentSearch, page: currentPage, limit })
                });
                const result = await response.json();
    
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

    const handleSearch = e => {
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
            usercode = el.value;
            setTimeout(() => {
                hasMore = true;
                fetchAndRenderStores();
            }, 60);
        }
    }, 60);
}


export default renderLogin