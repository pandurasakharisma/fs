
    
window.params = new URLSearchParams(window.location.search);
let panelkeluar = () => {
    showSkeleton(document.querySelector('#app'), 5);
    let createDashboardUI = () => {
        let bgPatternDiv = document.createElement('div');
        bgPatternDiv.className = 'bg-pattern';

        let cardAbsen = document.createElement('div');
        cardAbsen.className = 'card card-absen p-3 position-relative';

        let row = document.createElement('div');
        row.className = 'row align-items-center position-relative';

        let leftCol = document.createElement('div');
        leftCol.className = 'col-6 text-center left-box';
        leftCol.innerHTML = `
            <p class="mb-1 text-secondary" id="currentDate"></p>
            <p class="clock-time" id="currentTime"></p>
        `;

        let data = localStorage.getItem('user_absen'),
            data2 = localStorage.getItem('user_data'),
            obj = data ? JSON.parse(data) : null,
            obj2 = data2 ? JSON.parse(data2) : null,
            jam = obj && obj.jam ? String(obj.jam) : '',
            nama = obj2 && obj2.Full_Name ? String(obj2.Full_Name) : '';


        let rightCol = document.createElement('div');
        rightCol.className = 'col-6 text-center';
        rightCol.innerHTML = `
            <p class="mb-2">
                <span class="status-dot"></span>
                <span id="clockInTime">Check In : ${jam} </span>
            </p>
            <button onclick='logout()' class="btn btn-clock mb-2" id="btnClock" style="font-size:13px;background: #c53f3f;color: #fff;border: none;">
                Keluar Akun
            </button>
        `;

        row.appendChild(leftCol);
        row.appendChild(rightCol);
        cardAbsen.appendChild(row);
        
        let welc = document.createElement('div');
        welc.className = 'welc';
        welc.innerHTML = `Welcome Back, <strong class="welc_name">${nama}</strong>`;
        bgPatternDiv.appendChild(welc);
        bgPatternDiv.appendChild(cardAbsen);
        
        
        document.querySelector('#absenkeluar').appendChild(bgPatternDiv);
    };

    let updateClock = () => {
        let now = new Date();

        let options = {
            timeZone: 'Asia/Jakarta',
            hour: '2-digit',
            minute: '2-digit'
        };

        if(document.getElementById('currentTime')){
            document.getElementById('currentTime').innerText = now.toLocaleTimeString('id-ID', options);
            let dateOptions = {
                weekday: 'long',
                day: '2-digit',
                month: 'long'
            };
            document.getElementById('currentDate').innerText = now.toLocaleDateString('id-ID', dateOptions);
        }
    };

    createDashboardUI();
    setInterval(updateClock, 100);
};

export let renderHome = () => {
    document.querySelector('#app').innerHTML = `
        <style>
            .addcust svg {
                position: fixed;
                bottom: 20px;
                right: 20px;
                width: 48px;
                height: 48px;
                cursor: pointer;
                z-index: +2;
                border-radius: 50%;
                background: #c53f3f;
                padding: 10px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                animation: pulse 1.5s infinite;
                transition: transform 0.2s ease-in-out;
            }

            .addcust svg path {
                stroke: #fff !important;
            }

            .addcust svg:hover {
                transform: scale(1.15);
            }

            @keyframes pulse {
                0% {
                    transform: scale(1);
                    box-shadow: 0 0 0 0 rgba(197, 63, 63, 0.4);
                }

                70% {
                    transform: scale(1.1);
                    box-shadow: 0 0 0 20px rgba(197, 63, 63, 0);
                }

                100% {
                    transform: scale(1);
                    box-shadow: 0 0 0 0 rgba(197, 63, 63, 0);
                }
            }

            #headerx .header,
            #headerx .search-bar {
                padding: 8px 0;
                display: flex;
                justify-content: space-between;
                align-items: center;
                position: relative;
            }

            #headerx svg {
                stroke: #c53f3f;
            }

            .header-title img {
                height: 30px;
            }

            .header-icons {
                display: flex;
                align-items: center;
                gap: 15px;
            }

            #headerx .search-bar {
                display: none;
                align-items: center;
                width: 100%;
                position: relative;
                padding: 3px 0;
            }

            .search-input-wrapper {
                position: relative;
                width: 100%;
                display: flex;
                margin: 0 8px;
                background: #f5f5f5;
                border-radius: 8px;
            }

            .search-input-wrapper input {
                width: 100%;
                padding: 8px 35px 5px 40px;
                border: none;
                outline: none;
                background: none;
                color: #c53f3f;
                text-transform: capitalize;
            }

            .search-input-wrapper input::placeholder {
                color: #c53f3f;
                opacity: 0.7;
            }

            .search-input-wrapper .search-icon {
                position: absolute;
                top: 5px;
                left: 8px;
            }

            .dropdown-menu-custom {
                position: absolute;
                top: 40px;
                right: 0px;
                background: white;
                border-radius: 8px;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
                display: none;
                min-width: 150px;
                z-index: +3;
                overflow: hidden;
            }

            .dropdown-menu-custom a {
                display: block;
                padding: 10px;
                color: black;
                text-decoration: none;
            }

            .dropdown-menu-custom a:hover {
                background-color: #f1f1f1;
            }

            .my-ride-details .icon {
                height: 30px;
                width: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: rgba(var(--box-bg), 1);
                --Iconsax-Color: rgba(var(--title-color), 1);
                --Iconsax-Size: 16px;
                border-radius: 100%;
            }

            .my-ride-details .icon.error-icon {
                background-color: rgba(var(--error-color), 0.1);
                --Iconsax-Color: rgba(var(--error-color), 1);
                --Iconsax-Size: 16px;
            }

            #absenkeluar>div:first-child {
                background: #c53f3f;
                padding: 60px 20px 60px;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
                position: relative;
                overflow: hidden;
            }

            .welc{    
                z-index: +2;
                position: absolute;
                top: 30px;
                padding-left: 18px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                max-width: 300px;
                color: #fff;
            }
            .seclist {
                background: #f5f5f5;
                border-radius: 16px 16px 0 0;
                overflow: hidden;
                margin-top: -20px;
                z-index: +1;
                position: absolute;
                border: none;
                width: 100%;
                min-height: calc(100vh - 240px);
            }

            #absenkeluar>div:first-child:before {
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

            .bg-pattern .card::before {
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

            .card-absen {
                background: #fff;
                border-radius:8px;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
            }

            .clock-time {
                font-size: 2.5rem;
                font-weight: bold;
                color: #212529;
                margin: 0;
                line-height: 1;
            }

            .btn-clock {
                padding: 10px 25px;
                font-size: 1rem;
                border-radius: 10px;
                width: 100%;
            }

            .status-dot {
                height: 10px;
                width: 10px;
                background-color: #28a745;
                border-radius: 50%;
                display: inline-block;
                margin-right: 5px;
            }

            .user-info h5 {
                margin: 0;
                font-weight: 600;
            }

            .location {
                font-size: 0.9rem;
                color: #6c757d;
            }

            .location-box svg {stroke: #c53f3f;}

            .left-box {
                border-right: 1px solid #dee2e6;
                padding-right: 15px;
            }
            .total-ride-list li{min-width:40%;}
            .hidden-date {
                position: absolute;
                top: 0;
                left: 0;
                width: 1px;
                height: 1px;
                visibility: hidden; 
            }
            #listuserx{padding:20px 10px;}
            .contact-list li .contact-box i{ --Iconsax-Color: #c53f3f;}
            .contact-list li .contact-box .igb svg{width: 25px;height: 25px;}
            @media (max-width: 576px) {
                .left-box {
                    padding-bottom: 0;
                }
            }
        </style>

        <header id="header" class="main-header"
            style="background:#fff;padding:10px 0 0;">
            <div class="custom-container">
                <div id="headerx"></div>
            </div>
        </header>
        <section id="piltanggal" class="location-section pt-0" style="padding-bottom: 40px;"></section>
        <div id="absenkeluar" class="hide"></div>
        <section class="seclist">
            <div class="custom-container">
                <h3 class="m-2" id="h3info">Summary</h3>
                <ul class="total-ride-list mt-0 p-0" style="display: inline-flex;white-space: nowrap;margin: 10px 0 20px; gap:10px;overflow-x: scroll;max-width: 100%;">
                    <li>
                        <a href="wallet.html" class="ride-box">
                            <div class="flex-spacing gap-1">
                                <h4>$3100</h4>
                                <div class="ride-icon">
                                    <i class="iconsax icon" data-icon="wallet-open"></i>
                                </div>
                            </div>
                            <div class="flex-spacing gap-1 mt-1">
                                <h6 class="d-flex flex-wrap">Total Earnings</h6>
                                <i class="iconsax arrow-icon" data-icon="arrow-right"></i>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="my-rides.html" class="ride-box">
                            <div class="flex-spacing gap-1">
                                <h4>16</h4>
                                <div class="ride-icon">
                                    <i class="iconsax icon" data-icon="smart-car"></i>
                                </div>
                            </div>
                            <div class="flex-spacing gap-1 mt-1">
                                <h6 class="d-flex flex-wrap">Complete Ride</h6>
                                <i class="iconsax arrow-icon" data-icon="arrow-right"></i>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="my-rides.html" class="ride-box">
                            <div class="flex-spacing gap-1">
                                <h4>02</h4>
                                <div class="ride-icon">
                                    <i class="iconsax icon" data-icon="car"></i>
                                </div>
                            </div>
                            <div class="flex-spacing gap-1 mt-1">
                                <h6 class="d-flex flex-wrap">Pending Ride</h6>
                                <i class="iconsax arrow-icon" data-icon="arrow-right"></i>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="my-rides.html" class="ride-box">
                            <div class="flex-spacing gap-1">
                                <h4>04</h4>
                                <div class="ride-icon">
                                    <i class="iconsax icon" data-icon="driving"></i>
                                </div>
                            </div>
                            <div class="flex-spacing gap-1 mt-1">
                                <h6 class="d-flex flex-wrap">Cancel Ride</h6>
                                <i class="iconsax arrow-icon" data-icon="arrow-right"></i>
                            </div>
                        </a>
                    </li>
                </ul>
                
                <a onclick="hrefs('listpelanggan')" class="iconsax addcust" data-icon="add" id="addform"></a>
                <h3 class="m-2" id="h3schedule">Schedule</h3>
                <ul class="my-ride-list" style="margin-top: 0;padding-bottom: 40px;"></ul>
                <div class="offcanvas element-offcanvas offcanvas-bottom" id="offcanvasBottom" style="max-height: 80vh;height: fit-content;">
                    <div class="offcanvas-header ">
                        <h5 class="offcanvas-title" id="offcanvasBottomLabel">Pilih User</h5>
                        <button type="button" class="btn-close closec" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div class="offcanvas-body"></div>
                </div>
            </div>
        </section>
        <section class="panel-space"></section>
    `

    
    removeSkeleton(document.querySelector("#app"));
    let placeList = document.querySelector('.my-ride-list');
    showSkeleton(placeList, 10);
    renderpiltanggal()
    renderHeader()
    panelkeluar()
}

window.gantiuserh =(el)=>{
    let elcard_id = el.getAttribute('data-card_id'),
    elfull_name = el.getAttribute('data-full_name');
    document.querySelector('.closec').click();
    document.querySelector('#usercode').value = elcard_id;
    document.querySelector('#usercode').setAttribute('value',elcard_id);
    document.querySelector('#pilihuser').innerHTML = elfull_name.toUpperCase();

    params.set('usercode', elcard_id);
    window.history.replaceState({}, '', `#home?${params.toString()}`);
};

window.piluser = () => {
    document.querySelector('#offcanvasBottom .offcanvas-body').innerHTML = `
        <div class="location-box flex-grow-1" style="background-color: rgba(var(--box-bg), 1);display: flex;align-items: center;border-radius: 6px;padding: 8px;">
            <img class="icon" src="./assets/images/user-0.svg" style="width: 24px;margin-right: 10px;">
            <input type="text" id="searchInputc" class="form-control border-0 p-0" placeholder="Cari Team" style="background: none;flex:1; box-shadow:none;">
            <i id="clearBtnc" class="iconsax clear-btn hide" data-icon="close-circle"></i>
        </div>
        <div id="listuserx">
            <ul class="contact-list pt-0" style="max-height: calc(80vh - 200px);overflow-x: scroll;"></ul>
        </div>
    `;

    let searchInputc = document.querySelector('#searchInputc'),
    clearBtnc= document.querySelector('#clearBtnc');
    searchInputc.focus();
    
    showSkeleton(document.querySelector('#listuserx ul'), 10);
    fetch(urlbe + "listuser", {
        method: "POST",
        headers: { "Content-Type": "application/json" }
    })
    .then(r => r.json())
    .then(res => {
        let listContainer = document.querySelector('#listuserx ul');
        if (res.status === 'success' && Array.isArray(res.data)) {
            let html = '';
            res.data.forEach(user => {
                removeSkeleton(document.querySelector("#listuserx ul"));
                html += `
                    <li onclick="gantiuserh(this);" 
                        data-Full_Name="${user.Full_Name}"
                        data-usercode="${user.Card_ID}"
                        data-Card_ID="${user.Card_ID}"
                    >
                        <span class="contact-box">
                            <div class="contact-details">
                                <i class="iconsax igb" data-icon="user-2-circle"></i>
                                <div>
                                    <h5 style="text-transform:uppercase;white-space: nowrap;max-width:95%;overflow: hidden;text-overflow: ellipsis;line-height: 1.5;">${user.Full_Name}</h5>
                                    <small style="color: #c53f3f;font-size: 9px;">${user.Job_Position} #${user.Card_ID}</small>
                                </div>
                            </div>
                            <i class="iconsax" data-icon="chevron-right"></i>
                        </span>
                    </li>
                `;
            });
            listContainer.innerHTML = html;


            searchInputc.addEventListener('input', () => {
                let filter = searchInputc.value.toUpperCase();
                if(filter != ''){ clearBtnc.classList.remove('hide');}
                let items = document.querySelectorAll('#listuserx ul li');
                items.forEach(item => {
                    let name = item.querySelector('h5').innerText.toUpperCase();
                    item.style.display = name.includes(filter) ? '' : 'none';
                });
            });
        
            clearBtnc.onclick =()=> {
                searchInputc.value = '';
                clearBtnc.classList.add('hide');
                searchInputc.dispatchEvent(new Event('input'));
            };
            
            init_iconsax();
        } else {
            listContainer.innerHTML = `<li><div class="contact-box">Data tidak tersedia</div></li>`;
        }
    })
    .catch(() => {
        document.querySelector('#listuserx ul').innerHTML = `<li><div class="contact-box">Terjadi kesalahan saat mengambil data</div></li>`;
    });

    document.querySelector('#offcanvasBottomLabel').innerHTML = 'Pilih User';
};


let renderpiltanggal = () => {

    document.getElementById('piltanggal').innerHTML = `
    <div class="custom-container">
        <ul class="pickup-location-listing">
            <li>
                <div class="location-box" style="position:relative;">
                    <i class="iconsax icon" data-icon="user-2-circle" style="--Iconsax-Color: #c53f3f;"></i>
                    <span 
                        id="pilihuser" data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasBottom" 
                        class="form-control border-0" 
                        onclick="piluser();"
                        style="padding-left:0px; cursor:pointer;">Pilih User</span>
                    >
                </div>
            </li>
            <li>
                <div class="location-box" style="position:relative;">
                    <i class="iconsax icon" data-icon="calendar-1" style="--Iconsax-Color: #c53f3f;"></i>
                    <input 
                        type="text" 
                        id="dateDisplay" 
                        class="form-control border-0" 
                        placeholder="Pilih tanggal" 
                        readonly
                        style="padding-left:0px; cursor:pointer;"
                    >
                    <input 
                        type="date" 
                        id="hiddenDate" 
                        class="form-control border-0" 
                        style="position:absolute; opacity:0; pointer-events:none;"
                    >
                    <i class="iconsax add-stop" data-icon="add"></i>
                </div>
            </li>
        </ul>
    </div>
    `;

    let display = document.getElementById('dateDisplay');
    let hiddenDate = document.getElementById('hiddenDate');

    display.onclick = () => {
        hiddenDate.showPicker?.();
        hiddenDate.click();
    };

    let hash = window.location.hash.substring(1);
    let [route, queryString] = hash.split('?');
    
    waitForUserCode();
    if (queryString) {
        let urlParams = new URLSearchParams(queryString);
        let urlTanggal = urlParams.get('tanggal');
        let urlMinggu = urlParams.get('minggu');
        let urlHari = urlParams.get('hari');
        let usercodex = urlParams.get('usercode');
        
        if (urlMinggu && urlHari) {
            let selectedDate = new Date(urlTanggal);
            let formattedDate = selectedDate.toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });

            display.value = formattedDate;
            hiddenDate.value = urlTanggal; 
            let usercode = usercodex ?? document.getElementById("usercode").value;
            loadJadwal(usercode, urlMinggu, urlHari);
            document.querySelector('#addform').setAttribute('onclick',`hrefs('listpelanggan?${urlParams}')`)
        }
    }

    hiddenDate.onchange = () => {
        if (hiddenDate.value) {

            let selectedDate = new Date(hiddenDate.value);
            let formattedDate = selectedDate.toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });

            display.value = formattedDate;
            let result = getMingguHari(selectedDate);
            params.set('tanggal', hiddenDate.value); 
            params.set('minggu', result.minggu);
            params.set('hari', result.hari);
            
            window.history.replaceState({}, '', `#home?${params.toString()}`);
            document.querySelector('#addform').setAttribute('onclick',`hrefs('listpelanggan?${params.toString()}')`)
    
            let usercode = document.getElementById("usercode");
            loadJadwal(usercode.value, result.minggu, result.hari);
        }
    };
};

let renderHeader = () => {
    

    document.getElementById('headerx').innerHTML = `
        <div class="header" id="mainHeader">
            <div class="header-title">
                <img src="./assets/images/logo/user/logo-utama.svg" alt="logo">
            </div>
            <div class="header-icons">
                <i id="searchIcon" class="iconsax search-icon hide" data-icon="search-normal-2"></i>
                <i id="menuIcon" style="transform: rotate(90deg);" class="iconsax icon-btn" data-icon="menu-meatballs"></i>
            </div>
            <div class="dropdown-menu-custom" id="dropdownMenu">
                <a href="#">History Input</a>
                <a href="#">Schedule</a>
                <a onclick="logout()">Logout</a>
            </div>
        </div>

        <div class="search-bar" id="searchBar">
            <i id="backIcon" class="iconsax icon-btn" data-icon="chevron-left"></i>
            <div class="search-input-wrapper">
                <i class="iconsax search-icon" data-icon="search-normal-2"></i>
                <input type="text" placeholder="Search..." id="searchInput">
                <i class="iconsax icon class="clear-btn" width="12" data-icon="close-circle" style="display:none;margin-right: 15px;" id="closeSearch" ></i> 
            </div>
        </div>
    `;

    
    let searchIcon = document.getElementById('searchIcon');
    let menuIcon = document.getElementById('menuIcon');
    let searchBar = document.getElementById('searchBar');
    let mainHeader = document.getElementById('mainHeader');
    let backIcon = document.getElementById('backIcon');
    let closeSearch = document.getElementById('closeSearch');
    let searchInput = document.getElementById('searchInput');
    let dropdownMenu = document.getElementById('dropdownMenu');

    searchIcon.onclick = () => {
        mainHeader.style.display = 'none';
        searchBar.style.display = 'flex';
        searchInput.focus();
    };

    backIcon.onclick = () => {
        searchBar.style.display = 'none';
        mainHeader.style.display = 'flex';
        searchInput.value = '';
        closeSearch.style.display = 'none';
    };

    searchInput.oninput = () => {
        closeSearch.style.display = searchInput.value ? 'block' : 'none';
    };

    closeSearch.onclick = () => {
        searchInput.value = '';
        closeSearch.style.display = 'none';
        searchInput.focus();
    };

    menuIcon.onclick = () => {
        dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
    };

    document.onclick = e => {
        if (!menuIcon.contains(e.target) && !dropdownMenu.contains(e.target)) {
            dropdownMenu.style.display = 'none';
        }
    };

};


let waitForUserCode = () => {
    let interval = setInterval(() => {
        let el = document.getElementById("usercode")
        if (el) {
            clearInterval(interval)
            setTimeout(() => loadJadwal(el.value), 60)
        }
    }, 60)
}

    
window.delitjdw = (id, el) => {
    let existingModal = document.getElementById('dynamicDeleteModal');
    if (!existingModal) {
        let modalDiv = document.createElement('div');
        modalDiv.className = 'modal fade';
        modalDiv.id = 'dynamicDeleteModal';
        modalDiv.tabIndex = -1;
        modalDiv.innerHTML = `
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-body text-center">
                        <img class="img-fluid icon" src="./assets/images/svg/alert.svg" style="stroke: #c53f3f;width: 100px!important;margin-bottom: 10px;" alt="alert">
                        <h4>Hapus Jadwal</h4>
                        <p>Yakin ingin menghapus jadwal ini?</p>
                    </div>
                    <div class="modal-footer" style="gap: 10px;display: flex;flex-wrap: nowrap;white-space: nowrap;">
                        <button type="button" class="btn gray-btn w-50 m-0" data-bs-dismiss="modal">Batal</button>
                        <button type="button" class="btn theme-btn w-50 m-0" id="confirmDelete">Hapus</button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modalDiv);
    }
    init_iconsax();
    let modalElement = document.getElementById('dynamicDeleteModal');
    let modal = new bootstrap.Modal(modalElement);
    modal.show();

    document.getElementById('confirmDelete').onclick = (e) => {
        e.target.blur();

        setTimeout(() => {
            fetch(urlbe + "hapusjadwal", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id })
            })
            .then(r => r.json())
            .then(res => {
                if (res.success) {
                    let targetItem = document.querySelector(`[data-id="${id}"]`);
                    if (targetItem) targetItem.remove();
                    let li = el.closest('li.ride-item');
                    if (li) li.remove();
                    showToast('Jadwal berhasil dihapus', 'success');
                } else {
                    showToast('Gagal menghapus jadwal', 'error');
                }
                modal.hide();
            })
            .catch(() => {
                showToast('Terjadi kesalahan saat menghapus jadwal', 'error');
                modal.hide();
            });
        }, 10); 
    };
};
let loadJadwal = (usercode, minggu = null, hari = null) => {

    if (!minggu || !hari) {
        let today = getMingguHari();
        minggu = today.minggu;
        hari = today.hari;
    }
    
    fetch(urlbe + "listjadwal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usercode, minggu, hari })
    })
    .then(r => r.json())
    .then(res => {
        let list = document.querySelector(".my-ride-list");
        let data = res.data || [];
        let mapCust = {};
        
        let userData = localStorage.getItem('user_data');
        let isAdmin = userData ? JSON.parse(userData).is_admin : false;

        data.forEach(d => {
            let key = d.cust_name || '-';
            if (!mapCust[key] || new Date(d.created_at) > new Date(mapCust[key].created_at)) {
                mapCust[key] = d;
            }
        });

        let distinctData = Object.values(mapCust);
        list.innerHTML = distinctData.map(d => {
            let status = d.end_kunjungan ? "done" : "waiting";
            let tanggal = d.created_at ? formatDateIndo(d.created_at.split('T')[0]) : '';
            let start = formatTime(d.start_kunjungan);
            let end = formatTime(d.end_kunjungan);
            let jam = (start && end) ? `${start} - ${end}` : '';
            let jamClass = jam ? '' : 'hide';
            
            let hrefTarget = '';
            let hrefParams = `id=${d.id}&cardname=${encodeURIComponent(d.cardname || '')}&cust_code=${encodeURIComponent(d.cust_code || '')}&cust_name=${encodeURIComponent(d.cust_name || '')}&Address=${encodeURIComponent(d.Address || '')}&City=${encodeURIComponent(d.City || '')}&Province=${encodeURIComponent(d.Province || '')}&Full_Name=${encodeURIComponent(d.Full_Name || '')}&Job_Position=${encodeURIComponent(d.Job_Position || '')}&minggu=${d.minggu}&hari=${d.hari}`;
            
            if (!d.start_kunjungan) {
                hrefTarget = `hrefs('kamera?${hrefParams}')`;
            } else if (d.start_kunjungan && d.foto) {
                hrefParams += `&foto=${encodeURIComponent(d.foto || '')}&start_kunjungan=${encodeURIComponent(d.start_kunjungan || '')}&usercode=${encodeURIComponent(d.usercode || '')}`;
                hrefTarget = `hrefs('listitem?${hrefParams}')`;
            }
            
            let addressDisplay = '';
            if (d.Address && d.Address.toLowerCase() !== "null" && d.Address.trim() !== "") {
                addressDisplay = `
                    <li class="location-box">
                        <i class="iconsax icon" data-icon="location"></i> 
                        <h5 class="fw-light title-color">${d.Address}${d.City ? ', ' + d.City : ''}${d.Province ? ', ' + d.Province : ''}</h5>
                    </li>
                `;
            } else if (d.City && d.City.toLowerCase() !== "null" && d.City.trim() !== "") {
                addressDisplay = `
                    <li class="location-box">
                        <i class="iconsax icon" data-icon="location"></i> 
                        <h5 class="fw-light title-color">${d.City}${d.Province ? ', ' + d.Province : ''}</h5>
                    </li>
                `;
            }
            
            let showEditButton = isAdmin ? '' : 'hide';
            let showDeleteButton = (isAdmin || d.created_by === usercode) ? '' : 'hide';

            return `
                <li class="ride-item" data-id="${d.id}">
                    <div class="my-ride-box">
                        <div class="my-ride-head">
                            <div class="my-ride-content flex-column" style="width:100%;margin:0 5px 0;">
                                <div class="flex-spacing">
                                    <a onclick="${hrefTarget}"><h6 style="max-width:93%;" class="title-color fw-medium">${d.cust_name || '-'}</h6></a>
                                    <span class="status accent-color fw-normal">${status}</span>
                                </div>
                            </div>
                        </div>
                        <div class="my-ride-details">
                            <div class="ride-info" style="flex-direction:unset;width:100%;margin:5px 5px 0;">
                                ${d.Full_Name ? `
                                <div class="ride-info-content">
                                    <div class="d-flex align-content-center gap-2 lh-base">
                                        <h5 class="fw-normal title-color">${d.Full_Name}</h5>
                                    </div>
                                    <div style='font-size: 10px;margin: 6px;' class="fw-normal content-color mt-1">${d.Job_Position || ''}</div>
                                </div>` : ''}
                                <div class="flex-align-center gap-2">
                                    <a class="${showEditButton}" href="edit-offer.html"> 
                                        <i class="iconsax icon" data-icon="edit-2"></i> 
                                    </a> 
                                    <span class="delitjdw ${showDeleteButton}" onclick="delitjdw(${d.id}, this)">
                                        <i class="iconsax icon error-icon" data-icon="trash"></i> 
                                    </span> 
                                </div> 
                            </div>
                            <ul class="ride-location-listing mt-1">
                                ${addressDisplay}
                                <li class="location-box ${(!tanggal && !jam) ? 'hide' : ''}">
                                    <i class="iconsax icon" data-icon="gps"></i> 
                                    <div class="flex-spacing" style="width:100%;">
                                        <span class="fw-light title-color border-0">${tanggal}</span>
                                        <span class="fw-light title-color border-0 ml-auto ${jamClass}">${jam}</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </li>
            `;
        }).join('');

        init_iconsax();
        removeSkeleton(document.querySelector(".my-ride-list"));
        document.querySelectorAll(".ride-item").forEach(item => {
            item.onclick = (e) => {
                if (e.target.closest('.delitjdw') || e.target.closest('a[href="edit-offer.html"]')) {
                    return;
                }
                let id = item.getAttribute('data-id');
                let itemData = data.find(x => x.id == id);
                if (itemData) {
                    let hrefTarget = '';
                    let hrefParams = `id=${itemData.id}&cardname=${encodeURIComponent(itemData.cardname || '')}&cust_code=${encodeURIComponent(itemData.cust_code || '')}&cust_name=${encodeURIComponent(itemData.cust_name || '')}&Address=${encodeURIComponent(itemData.Address || '')}&City=${encodeURIComponent(itemData.City || '')}&Province=${encodeURIComponent(itemData.Province || '')}&Full_Name=${encodeURIComponent(itemData.Full_Name || '')}&Job_Position=${encodeURIComponent(itemData.Job_Position || '')}&minggu=${itemData.minggu}&hari=${itemData.hari}`;
                    
                    if (!itemData.start_kunjungan) {
                        hrefTarget = `kamera?${hrefParams}`;
                    } else if (itemData.start_kunjungan && itemData.foto) {
                        hrefParams += `&foto=${encodeURIComponent(itemData.foto || '')}&start_kunjungan=${encodeURIComponent(itemData.start_kunjungan || '')}&usercode=${encodeURIComponent(itemData.usercode || '')}`;
                        hrefTarget = `listitem?${hrefParams}`;
                    }
                    
                    window.location.hash = hrefTarget;
                }
            };
        });
    });
};


export default renderHome