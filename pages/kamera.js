export let renderKamera = () => {
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
        <style>
            .kameradiv {
                margin: 0; padding: 0;
                width: 100%; height: 100%;
                overflow: hidden; background-color: #000;
                display: flex; justify-content: center; align-items: center;
                position: relative; font-family: sans-serif; color: white;
                text-align: center;
            }
            #videoElement { width: 100%; height: 100%; object-fit: cover; }
            #canvasElement { display: none; }

            #captureButton, #switchButton, #permissionButton {
                position: fixed; display: flex;
                justify-content: center; align-items: center;
                cursor: pointer; z-index: 1000;
                transition: transform 0.2s ease-in-out;
                background-color: #fff;
                box-shadow: 0 4px 10px rgba(0,0,0,0.3);
                border-radius: 50%;
            }

            #captureButton { bottom: 30px; width: 70px; height: 70px; animation: pulse 2s infinite; }
            #switchButton { bottom: 120px; right: 30px; width: 50px; height: 50px; }
            #permissionButton { bottom: 30px; width: 200px; height: 50px; font-size: 16px; border-radius: 10px; }

            #captureButton:hover, #switchButton:hover, #permissionButton:hover { transform: scale(1.1); }

            #permissionMessage {
                position: absolute; top: 10%; left: 10px; padding: 20px;
                background-color:#000; text-align: left; z-index: 1001;
            }

            .spinner {
                border: 4px solid rgba(255,255,255,0.2);
                border-left-color: #000;
                border-radius: 50%;
                width: 30px; height: 30px;
                animation: spin 1s linear infinite;
            }

            @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
            @keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(255,255,255,0.7); } 70% { box-shadow: 0 0 0 20px rgba(255,255,255,0); } 100% { box-shadow: 0 0 0 0 rgba(255,255,255,0); } }

            svg { width: 36px; height: 36px; }
        </style>

        <div class="kameradiv">
            <video id="videoElement" autoplay playsinline></video>
            <canvas id="canvasElement"></canvas>

            <div id="permissionMessage">
                <h3>Kamera atau Lokasi diblokir</h3>
                <p>Untuk menggunakan fitur ini, aktifkan izin kamera dan lokasi di browser Anda:</p>
                <ul>
                    <li>Chrome: Klik ikon gembok di kiri URL → “Site settings” → Izinkan kamera dan lokasi</li>
                    <li>Firefox: Klik ikon kamera di URL bar → Izinkan</li>
                    <li>Edge: Klik ikon gembok di kiri URL → Permissions → Camera & Location → Allow</li>
                </ul>
            </div>
            <button id="permissionButton">Coba Izinkan Lagi</button>

            <div id="captureButton">
                <!-- tetap pertahankan SVG asli -->
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 471.04 471.04"><g><path d="M414.72 112.64h-49.152l-27.136-40.96c-10.24-15.36-28.16-24.576-46.592-24.576H179.2c-18.432 0-36.352 9.216-46.592 24.576l-27.136 40.96H56.32A56.158 56.158 0 0 0 0 168.96v198.656a56.158 56.158 0 0 0 56.32 56.32h358.4a56.158 56.158 0 0 0 56.32-56.32V168.96a56.158 56.158 0 0 0-56.32-56.32zm-179.2 265.216c-70.144 0-126.976-56.832-126.976-126.976s56.832-126.464 126.976-126.464 126.976 56.832 126.976 126.976c0 69.632-56.832 126.464-126.976 126.464zM407.552 192h-22.528c-9.216-.512-16.384-8.192-15.872-17.408.512-8.704 7.168-15.36 15.872-15.872h20.48c9.216-.512 16.896 6.656 17.408 15.872.512 9.216-6.144 16.896-15.36 17.408z"/></g></svg>
            </div>

            <div id="switchButton">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><g><path d="M14.707 23.293a1 1 0 0 0-1.414 1.414l.192.192C7.554 24.454 4 22.468 4 21a1.711 1.711 0 0 1 .68-1.17 1 1 0 1 0-1.36-1.47A3.563 3.563 0 0 0 2 21c0 3.456 5.66 5.5 11.673 5.913l-.38.38a1 1 0 1 0 1.414 1.414l2-2a1 1 0 0 0 0-1.414z"/><circle cx="16" cy="13" r="2"/><path d="M9 21h14a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3h-.93a1 1 0 0 1-.832-.445l-.812-1.219A2.993 2.993 0 0 0 17.93 3h-3.86a2.993 2.993 0 0 0-2.5 1.336l-.812 1.219A1 1 0 0 1 9.93 6H9a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3zm7-12a4 4 0 1 1-4 4 4 4 0 0 1 4-4zM28.678 18.356a1 1 0 0 0-1.356 1.471A1.714 1.714 0 0 1 28 21c0 1.063-1.939 2.6-6.2 3.452a1 1 0 0 0 .2 1.981.964.964 0 0 0 .2-.02c4.886-.98 7.8-3 7.8-5.413a3.59 3.59 0 0 0-1.322-2.644z"/></g></svg>
            </div>
        </div>
    `;

    let video = document.getElementById('videoElement'),
        canvas = document.getElementById('canvasElement'),
        context = canvas.getContext('2d'),
        captureButton = document.getElementById('captureButton'),
        switchButton = document.getElementById('switchButton'),
        permissionMessage = document.getElementById('permissionMessage'),
        permissionButton = document.getElementById('permissionButton'),
        uplfEndpoint = urlbe + 'uplf',
        isCapturing = false,
        currentFacingMode = "user";

    const showMessage = msg => {
        video.style.display = captureButton.style.display = switchButton.style.display = 'none';
        permissionMessage.style.display = 'block';
        permissionMessage.querySelector('p')?.textContent = msg;
    };

    const startCameraStream = async () => {
        try {
            let stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: currentFacingMode } });
            video.srcObject = stream;
            video.style.display = captureButton.style.display = switchButton.style.display = 'flex';
            permissionMessage.style.display = 'none';
        } catch {
            showMessage('Kamera belum diizinkan. Mohon aktifkan kamera.');
        }
    };

    const checkPermissions = async () => {
        if (!navigator.permissions) { startCameraStream(); return; }

        let cameraPerm = await navigator.permissions.query({ name: 'camera' });
        let geoPerm = await navigator.permissions.query({ name: 'geolocation' });

        const updateStatus = () => {
            if (cameraPerm.state === 'granted' && geoPerm.state === 'granted') {
                startCameraStream();
            } else if (cameraPerm.state !== 'granted') {
                showMessage('Mohon izinkan akses kamera.');
            } else if (geoPerm.state !== 'granted') {
                showMessage('Mohon izinkan akses lokasi.');
            }
        };

        cameraPerm.onchange = geoPerm.onchange = updateStatus;
        updateStatus();
    };

    const sendCapture = (lat, lon) => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(blob => {
            let formData = new FormData();
            let finalName = fileName || `capture_${Date.now()}`;
            formData.append('foto', blob, `${finalName}.webp`);
            formData.append('latitude', lat);
            formData.append('longitude', lon);
            formData.append('id', id);

            fetch(uplfEndpoint, { method: 'POST', body: formData })
                .then(r => r.json())
                .then(() => {
                    showToast('Gambar Berhasil diUpload', 'success');
                    let redirectParams = new URLSearchParams();
                    expectedKeys.forEach(key => params.has(key) && redirectParams.set(key, params.get(key)));
                    window.location.hash = 'listitem?' + redirectParams.toString();
                })
                .catch(() => console.log('Gagal Mengirim Foto'))
                .finally(() => {
                    captureButton.innerHTML = captureButton.innerHTML; // tetap SVG asli
                    captureButton.style.animation = 'pulse 2s infinite';
                    isCapturing = false;
                });
        }, 'image/webp', 0.8);
    };

    captureButton.onclick = () => {
        if (isCapturing) return;
        isCapturing = true;
        captureButton.innerHTML = '<div class="spinner"></div>';
        captureButton.style.animation = 'none';

        navigator.geolocation.getCurrentPosition(
            pos => sendCapture(pos.coords.latitude, pos.coords.longitude),
            () => sendCapture(null, null)
        );
    };

    switchButton.onclick = async () => {
        currentFacingMode = currentFacingMode === "user" ? "environment" : "user";
        if (video.srcObject) video.srcObject.getTracks().forEach(track => track.stop());
        await startCameraStream();
    };

    permissionButton.onclick = async () => {
        try {
            await navigator.mediaDevices.getUserMedia({ video: true });
            navigator.geolocation.getCurrentPosition(() => {}, () => {});
            startCameraStream();
        } catch {
            alert('Anda harus mengizinkan akses kamera dan lokasi di browser.');
        }
    };

    checkPermissions();
};

export default renderKamera;
