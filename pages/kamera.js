export let renderKamera = () => {
    removeSpinner();
    document.querySelector('#app').innerHTML = `
        <style>
            .kameradiv {
                margin: 0;
                padding: 0;
                width: 100%;
                height: 100%;
                overflow: hidden;
                background-color: #1a1a1a;
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
                background-color: #c53f3f;
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
                background-color: #3f51c5;
            }
            #captureButton:hover,#switchButton:hover {transform: scale(1.1);}
            #permissionMessage {
                position: absolute;
                top: 10%;
                left: 10px;
                padding: 20px;
                background-color: rgba(0, 0, 0, 0.7);
                border-radius: 10px;
                text-align: left;
                z-index: 1001;
            }
            .spinner {
                border: 4px solid rgba(255, 255, 255, 0.2);
                border-left-color: #fff;
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
            svg {
                width: 24px;
                height: 24px;
                fill: none;
                stroke: #fff;
                stroke-width: 2;
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
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                    <circle cx="16" cy="17" r="5" stroke="#fff" fill="none"/>
                    <path stroke="#fff" d="M27 8h-2.8a1 1 0 0 1-.9-.6l-.9-1.7A3 3 0 0 0 19.8 4h-7.6a3 3 0 0 0-2.6 1.7l-1 1.7a1 1 0 0 1-.8.6H5a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h22a3 3 0 0 0 3-3V11a3 3 0 0 0-3-3z"/>
                </svg>
            </div>
            <div id="switchButton">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                    <g stroke="#fff">
                        <path d="M14.7 23.3a1 1 0 0 0-1.4 1.4l.2.2C7.5 24.5 4 22.5 4 21a1.7 1.7 0 0 1 .7-1.2 1 1 0 1 0-1.4-1.4A3.6 3.6 0 0 0 2 21c0 3.5 5.7 5.5 11.7 6l-.4.3a1 1 0 1 0 1.4 1.4l2-2a1 1 0 0 0 0-1.4z"/>
                        <circle cx="16" cy="13" r="2"/>
                        <path d="M9 21h14a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3h-1a1 1 0 0 1-.8-.4l-.8-1.3A3 3 0 0 0 18 3h-3.8a3 3 0 0 0-2.5 1.3l-.8 1.3a1 1 0 0 1-.9.4H9a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3zm7-12a4 4 0 1 1-4 4 4 0 0 1 4-4zm12.7 9.4a1 1 0 0 0-1.4 1.4A1.7 1.7 0 0 1 28 21c0 1-2 2.6-6.2 3.5a1 1 0 0 0 .2 2 1 1 0 0 0 .2 0c4.9-1 7.8-3 7.8-5.5a3.6 3.6 0 0 0-1.3-2.6z"/>
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

    let requestGeolocationPermission = () => new Promise((res, rej) => {
        navigator.geolocation 
            ? navigator.geolocation.getCurrentPosition(() => res(), () => rej('Akses lokasi ditolak.'), { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 })
            : rej('Geolocation tidak didukung browser ini.');
    });

    let requestCameraPermission = () => new Promise((res, rej) => {
        navigator.mediaDevices?.getUserMedia 
            ? navigator.mediaDevices.getUserMedia({ video: true }).then(stream => { 
                stream.getTracks().forEach(t => t.stop()); 
                res(); 
            }).catch(() => rej('Akses kamera ditolak.'))
            : rej('API getUserMedia tidak didukung browser ini.');
    });

    let startCameraStream = async () => {
        try {
            let stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: currentFacingMode } });
            video.srcObject = stream;
            video.style.display = captureButton.style.display = switchButton.style.display = 'flex';
            permissionMessage.style.display = 'none';
        } catch {
            showMessage('Terjadi kesalahan saat memulai kamera.');
        }
    };

    let init = async () => {
        try {
            await requestGeolocationPermission();
            await requestCameraPermission();
            startCameraStream();
        } catch (err) {
            showMessage(err);
        }
    };

    let sendCapture = (lat, lon) => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(blob => {
            canvas.toBlob(finalBlob => {
                let formData = new FormData();
                formData.append('foto', finalBlob, `img_${Date.now()}.webp`);
                formData.append('latitude', lat);
                formData.append('longitude', lon);
                formData.append('id', '123');
                fetch(uplfEndpoint, { method: 'POST', body: formData })
                    .then(r => r.json())
                    .then(r => {
                        showToast('Gambar Berhasil diUpload', 'success');
                        window.location.hash = '/listitem';
                    })
                    .catch(() => console.log('Gagal Mengirim Foto'))
                    .finally(() => {
                        captureButton.innerHTML = `
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                                <circle cx="16" cy="17" r="5" stroke="#fff" fill="none"/>
                                <path stroke="#fff" d="M27 8h-2.8a1 1 0 0 1-.9-.6l-.9-1.7A3 3 0 0 0 19.8 4h-7.6a3 3 0 0 0-2.6 1.7l-1 1.7a1 1 0 0 1-.8.6H5a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h22a3 3 0 0 0 3-3V11a3 3 0 0 0-3-3z"/>
                            </svg>`;
                        captureButton.style.animation = 'pulse 2s infinite';
                        isCapturing = false;
                    });
            }, 'image/webp', 0.6);
        });
    };

    init();

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
}

export default renderKamera;
