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
                margin: 0;
                padding: 0;
                width: 100%;
                height: 100%;
                overflow: hidden;
                background-color: #000;
                display: flex;
                justify-content: center;
                align-items: center;
                position: relative;
                font-family: sans-serif;
                color: white;
                text-align: center;
            }
            #videoElement {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
            #canvasElement {display: none;}
            #captureButton, #switchButton {
                position: fixed;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                z-index: 1000;
                transition: transform 0.2s ease-in-out;
                background-color: #fff;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
                border-radius: 50%;
            }
            #captureButton {
                bottom: 30px;
                width: 70px;
                height: 70px;
                animation: pulse 2s infinite;
            }
            #switchButton {
                bottom: 120px;
                right: 30px;
                width: 50px;
                height: 50px;
            }
            #captureButton:hover,#switchButton:hover {transform: scale(1.1);}
            #permissionMessage {
                position: absolute;
                top: 10%;
                left: 10px;
                padding: 20px;
                background-color:#000;
                text-align: left;
                z-index: 1001;
            }
            .spinner {
                border: 4px solid rgba(255, 255, 255, 0.2);
                border-left-color: #000;
                border-radius: 50%;
                width: 30px;
                height: 30px;
                animation: spin 1s linear infinite;
            }
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            @keyframes pulse {
                0% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7); }
                70% { box-shadow: 0 0 0 20px rgba(255, 255, 255, 0); }
                100% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0); }
            }
        </style>
        <div class="kameradiv">
            <video id="videoElement" autoplay playsinline></video>
            <canvas id="canvasElement"></canvas>
            <div id="permissionMessage">
                <h3>Mohon Izinkan Akses</h3>
                <p id="messageText"></p>
                <p>Anda harus mengizinkan akses lokasi dan kamera untuk menggunakan fitur ini.</p>
            </div>
            <div id="captureButton">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 471.04 471.04">
                    <g>
                        <path d="M414.72 112.64h-49.152l-27.136-40.96c-10.24-15.36-28.16-24.576-46.592-24.576H179.2c-18.432 0-36.352 9.216-46.592 24.576l-27.136 40.96H56.32A56.158 56.158 0 0 0 0 168.96v198.656a56.158 56.158 0 0 0 56.32 56.32h358.4a56.158 56.158 0 0 0 56.32-56.32V168.96a56.158 56.158 0 0 0-56.32-56.32z"/>
                        <path d="M235.52 180.736c-38.912 0-70.656 31.744-70.656 70.656s31.744 70.144 70.656 70.144 70.656-31.744 70.656-70.656-31.744-70.144-70.656-70.144z"/>
                    </g>
                </svg>
            </div>
            <div id="switchButton">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                    <g>
                        <circle cx="16" cy="13" r="2"></circle>
                        <path d="M9 21h14a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3H9a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3z"/>
                    </g>
                </svg>
            </div>
        </div>
    `;

    let video = document.getElementById('videoElement'),
        canvas = document.getElementById('canvasElement'),
        context = canvas.getContext('2d'),
        captureButton = document.getElementById('captureButton'),
        switchButton = document.getElementById('switchButton'),
        permissionMessage = document.getElementById('permissionMessage'),
        messageText = document.getElementById('messageText'),
        uplfEndpoint = urlbe + 'uplf',
        isCapturing = false,
        currentFacingMode = "user";

    let showMessage = msg => {
        video.style.display = captureButton.style.display = switchButton.style.display = 'none';
        permissionMessage.style.display = 'block';
        messageText.textContent = msg;
    };

    let startCameraStream = async () => {
        try {
            let stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: currentFacingMode } });
            video.srcObject = stream;
            video.style.display = captureButton.style.display = switchButton.style.display = 'flex';
            permissionMessage.style.display = 'none';
        } catch {
            showMessage('Kamera belum diizinkan. Mohon aktifkan kamera.');
        }
    };

    let checkPermissions = async () => {
        if (!navigator.permissions) {
            startCameraStream();
            return;
        }
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

        cameraPerm.onchange = updateStatus;
        geoPerm.onchange = updateStatus;

        updateStatus();
    };

    let sendCapture = (lat, lon) => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(finalBlob => {
            let formData = new FormData();
            let finalName = fileName ? fileName : `capture_${Date.now()}`;
            formData.append('foto', finalBlob, `${finalName}.webp`);
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
                    captureButton.innerHTML = `
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 471.04 471.04">
                            <g><path d="M414.72 112.64h-49.152l-27.136-40.96c-10.24-15.36-28.16-24.576-46.592-24.576H179.2c-18.432 0-36.352 9.216-46.592 24.576l-27.136 40.96H56.32A56.158 56.158 0 0 0 0 168.96v198.656a56.158 56.158 0 0 0 56.32 56.32h358.4a56.158 56.158 0 0 0 56.32-56.32V168.96a56.158 56.158 0 0 0-56.32-56.32z"/>
                            <path d="M235.52 180.736c-38.912 0-70.656 31.744-70.656 70.656s31.744 70.144 70.656 70.144 70.656-31.744 70.656-70.656-31.744-70.144-70.656-70.144z"/></g>
                        </svg>`;
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
    checkPermissions();
};

export default renderKamera;
