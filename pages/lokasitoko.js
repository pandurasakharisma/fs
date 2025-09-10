export let renderlokasitoko = () => {
    removeSpinner();

    let hash = window.location.hash.split('?')[1] || '';
    let params = new URLSearchParams(hash);

    let id = params.get('id');
    if (!id) {
        window.location.hash = 'home';
        return;
    }

    let expectedKeys = ['id', 'cardname', 'cust_code', 'cust_name', 'Address', 'City', 'Province', 'Full_Name', 'Job_Position', 'minggu', 'hari'];
    let isValidStructure = expectedKeys.every(key => params.has(key));

    if (!isValidStructure) {
        fetch(urlbe + 'listjadwalid', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
        })
        .then(r => r.json())
        .then(data => console.log('Response dari listjadwalid:', data))
        .catch(err => console.error('Fetch listjadwalid error:', err));
    }

    let fileName = '';
    if (isValidStructure) {
        let values = expectedKeys.map(key => (params.get(key) || '').replace(/[^a-zA-Z0-9]/g, ''));
        fileName = values.join('_');
    }

    document.querySelector('#app').innerHTML = `
        <link rel="stylesheet" href="./assets/css/leaflet.css" />
        <style>
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
            <div class="ride-content-bg">
                <div class="profile-head mt-0">
                    <img class="img-fluid profile-img" src="../../assets/images/profile/p4.png" alt="profile">
                    <div class="profile-content">
                        <div>
                            <div class="flex-align-center gap-1">
                                <h5>Peter Thornton</h5>
                            </div>

                            <div class="flex-align-center gap-1">
                                <img class="star" src="../../assets/images/svg/star.svg" alt="star">
                                <h5 class="fw-normal title-color">4.8</h5>
                                <span class="content-color fw-normal">(127)</span>
                            </div>
                        </div>

                        <div class="flex-align-center gap-2">
                            <a href="chatting.html" class="comm-icon">
                                <img class="img-fluid icon-btn" src="../../assets/images/svg/messages-fill.svg" alt="messages">
                            </a>
                            <a href="tel:+4733378901" class="comm-icon">
                                <img class="img-fluid icon-btn" src="../../assets/images/svg/call-fill.svg" alt="call">
                            </a>
                        </div>
                    </div>
                </div>

                <ul class="ride-location-listing mt-3">
                    <li class="border-0 shadow-none">
                        <div class="location-box">
                            <img class="icon" src="../../assets/images/svg/location-fill.svg" alt="location">
                            <h5 class="fw-light title-color">17, Yonge St, Toronto, Canada</h5>
                        </div>
                    </li>

                    <li class="border-0 shadow-none">
                        <div class="location-box">
                            <img class="icon" src="../../assets/images/svg/gps.svg" alt="gps">
                            <h5 class="fw-light title-color border-0">20, Thori St, Toronto, Canada
                            </h5>
                        </div>
                    </li>
                </ul>

                <div class="amount-part">
                    <div class="total flex-spacing">
                        <h4 class="fw-medium title-color">Total Fare </h4>
                        <span class="fw-medium theme-color">$256</span>
                    </div>
                    <div class="location-part fare-amount">
                        <div class="flex-align-center gap-2">
                            <i class="iconsax dollar-icon" data-icon="dollar-square"><svg width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M13.4002 17.4181H10.8902C9.25016 17.4181 7.92016 16.0381 7.92016 14.3381C7.92016 13.9281 8.26016 13.5881 8.67016 13.5881C9.08016 13.5881 9.42016 13.9281 9.42016 14.3381C9.42016 15.2081 10.0802 15.9181 10.8902 15.9181H13.4002C14.0502 15.9181 14.5902 15.3381 14.5902 14.6381C14.5902 13.7681 14.2802 13.5981 13.7702 13.4181L9.74016 11.9981C8.96016 11.7281 7.91016 11.1481 7.91016 9.35812C7.91016 7.81812 9.12016 6.57812 10.6002 6.57812H13.1102C14.7502 6.57812 16.0802 7.95812 16.0802 9.65812C16.0802 10.0681 15.7402 10.4081 15.3302 10.4081C14.9202 10.4081 14.5802 10.0681 14.5802 9.65812C14.5802 8.78813 13.9202 8.07812 13.1102 8.07812H10.6002C9.95016 8.07812 9.41016 8.65812 9.41016 9.35812C9.41016 10.2281 9.72016 10.3981 10.2302 10.5781L14.2602 11.9981C15.0402 12.2681 16.0902 12.8481 16.0902 14.6381C16.0802 16.1681 14.8802 17.4181 13.4002 17.4181Z"
                                        fill="#292D32"></path>
                                    <path
                                        d="M12 18.75C11.59 18.75 11.25 18.41 11.25 18V6C11.25 5.59 11.59 5.25 12 5.25C12.41 5.25 12.75 5.59 12.75 6V18C12.75 18.41 12.41 18.75 12 18.75Z"
                                        fill="#292D32"></path>
                                    <path
                                        d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H15C20.43 1.25 22.75 3.57 22.75 9V15C22.75 20.43 20.43 22.75 15 22.75ZM9 2.75C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V9C21.25 4.39 19.61 2.75 15 2.75H9Z"
                                        fill="#292D32"></path>
                                </svg>
                            </i>
                            <div>
                                <h5 class="fw-medium title-color">Cash</h5>
                                <h6 class="fw-normal content-color">Pay when the ride end</h6>
                            </div>
                        </div>
                    </div>
                </div>
                <a href="ride-verification.html" class="btn theme-btn w-100 mt-3">Accept Fare on $256</a>
            </div>
        </main>
            
    `;
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
        let foto = lokasi.foto || null;
    
        let reverseRes = await fetch(urlbe + 'carialamatlatlon', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ method: 'reverse', lat: lat, lon: lon })
        });
        let reverseData = await reverseRes.json();

        loadLeaflet().then(L => {
            if (lat && lon) {
                let map = L.map('map').setView([lat, lon], 15);
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '' }).addTo(map);

                let iconHtml = '<img class="icon" src="./assets/images/svg/location-fill.svg" width="40" height="40" alt="location">';
                let customIcon = L.divIcon({ html: iconHtml, className: 'custom-icon', iconSize: [30, 30], iconAnchor: [15, 30], popupAnchor: [0, -30] });

                let marker = L.marker([lat, lon], { icon: customIcon }).addTo(map);
                marker.bindPopup(`<strong>${full_name+' '+Job_Position}</strong><p>${reverseData.data.display_name}</p>`).openPopup();

            }
        });
        
    }).catch(() => { });
};

export default renderlokasitoko;
