
let panelkeluar = () => {
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
            obj = data ? JSON.parse(data) : null,
            jam = obj && obj.jam ? String(obj.jam) : '';

        let rightCol = document.createElement('div');
        rightCol.className = 'col-6 text-center';
        rightCol.innerHTML = `
            <p class="mb-2">
                <span class="status-dot"></span>
                <span id="clockInTime">Check In : ${jam} </span>
            </p>
            <button onclick='logout()' class="btn btn-clock mb-2" id="btnClock" style="background: #c53f3f;color: #fff;border: none;">
                Keluar Akun
            </button>
        `;

        row.appendChild(leftCol);
        row.appendChild(rightCol);
        cardAbsen.appendChild(row);
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

export const renderHome = () => {
    document.querySelector('#app').innerHTML = `
        <style>
            .addcust svg {
                position: fixed;
                bottom: 20px;
                right: 20px;
                width: 48px;
                height: 48px;
                cursor: pointer;
                z-index: 9999;
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
                padding: 40px 20px 60px;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
                position: relative;
                overflow: hidden;
            }

            .seclist {
                background: #fff;
                border-top-left-radius: 18px;
                border-top-right-radius: 18px;
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
                border-radius: 15px;
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

            .left-box {
                border-right: 1px solid #dee2e6;
                padding-right: 15px;
            }

            @media (max-width: 576px) {
                .left-box {
                    padding-bottom: 0;
                }
            }
        </style>

        <header id="header" class="main-header"
            style="background:#fff;padding:10px 0;box-shadow: 3px -2px 10px rgb(0 0 0 / 47%);">
            <div class="custom-container">
                <div id="headerx"></div>
            </div>
        </header>

        <div id="absenkeluar"></div>

        <section class="seclist">
            <div class="custom-container">
                <ul class="my-ride-list" style="margin-top: 0;"></ul>
            </div>
        </section>

        <section class="panel-space"></section>

        <a onclick="hrefs('listpelanggan')" class="iconsax addcust" data-icon="add" id="addform"></a>

    `
    renderHeader()
    panelkeluar()
    waitForUserCode()
}


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
                <img id="closeSearch" style="display:none;margin-right: 15px;" class="clear-btn" width="12" src="data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23c53f3f'%3e%3cpath d='M.293.293a1 1 0 0 1 1.414 0L8 6.586 14.293.293a1 1 0 1 1 1.414 1.414L9.414 8l6.293 6.293a1 1 0 0 1-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 0 1-1.414-1.414L6.586 8 .293 1.707a1 1 0 0 1 0-1.414z'/%3e%3c/svg%3e" alt="clear">
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


const waitForUserCode = () => {
    const interval = setInterval(() => {
        const el = document.getElementById("usercode")
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
                        <img class="img-fluid icon" src="./assets/images/svg/alert.svg" style="width: 100px;margin-bottom: 10px;" alt="alert">
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

let loadJadwal = usercode => {
    let { minggu, hari } = getMingguHari();
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
            return `
                <li class="ride-item" data-id="${d.id}">
                    <div class="my-ride-box">
                        <div class="my-ride-head">
                            <div class="my-ride-content flex-column" style="width:100%;margin:0 5px 0;">
                                <div class="flex-spacing">
                                    <a onclick="hrefs('kamera')"><h6 class="title-color fw-medium">${d.cust_name || '-'}</h6></a>
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
                                    <h6 class="fw-normal content-color mt-1">${d.Job_Position || ''}</h6>
                                </div>` : ''}
                                <div class="flex-align-center gap-2">
                                    <a href="edit-offer.html"> 
                                        <i class="iconsax icon" data-icon="edit-2"></i> 
                                    </a> 
                                    <span class="delitjdw" onclick="delitjdw(${d.id}, this)">
                                        <i class="iconsax icon error-icon" data-icon="trash"></i> 
                                    </span> 
                                </div> 
                            </div>
                            <ul class="ride-location-listing mt-3">
                                ${ (d.Address && d.Address.toLowerCase() !== "null" && d.Address.trim() !== "") ? `
                                <li class="location-box">
                                    <img class="icon" src="./assets/images/svg/location-fill.svg" alt="location">
                                    <h5 class="fw-light title-color">${d.Address || ''}</h5>
                                </li>
                                ` : ''}
                                <li class="location-box ${(!tanggal && !jam) ? 'hide' : ''}">
                                    <img class="icon" src="./assets/images/svg/gps.svg" alt="gps">
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

        init_iconsax()
        removeSkeleton(document.querySelector(".my-ride-list"));
        document.querySelectorAll(".ride-item").forEach(item => {
            item.onclick = (e) => {
                if (e.target.closest('.delitjdw') || e.target.closest('a[href="edit-offer.html"]')) {
                    return;
                }
                let id = item.getAttribute('data-id');
                window.location.hash = '/kamera'
            };
        });

    });
};

export default renderHome