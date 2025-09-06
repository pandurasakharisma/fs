export let renderKamera = () => {
    
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
                background-color: #c53f3f;
                stroke:#fff;
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
                background-color: rgba(0, 0, 0, 0.7);
                border-radius: 10px;
                text-align: left;
                z-index: 1001;
            }
            .spinner {
                border: 4px solid rgba(0, 0, 0, 0.1);
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
                <i class="iconsax icon" data-icon="camera"></i>
            </div>
            <div id="switchButton">
                <i class="iconsax icon" data-icon="rotate-right"></i>
            </div>
        </div>

    `
    
    init_iconsax();
    
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
        ? navigator.mediaDevices.getUserMedia({ video: true }).then(stream => { stream.getTracks().forEach(t => t.stop()); res(); }).catch(() => rej('Akses kamera ditolak.'))
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
            init_iconsax();
        } catch (err) {
            showMessage(err);
        }
    };

    let sendCapture = (lat, lon) => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(blob => {
            let formData = new FormData();
            formData.append('foto', blob, `img_${Date.now()}.jpg`);
            formData.append('latitude', lat);
            formData.append('longitude', lon);
            formData.append('id', '123');
            fetch(uplfEndpoint, { method: 'POST', body: formData })
            .then(r => r.json())
            .then(r => {
                showToast('Gambar Berhasil diUpload', 'success');
                window.location.hash = '/listitem'
            })
            .catch(() => console.log('Gagal Mengirim Foto'))
            .finally(() => {
                captureButton.innerHTML = `<i class="iconsax icon" data-icon="camera"></i>`;
                captureButton.style.animation = 'pulse 2s infinite';
                isCapturing = false;
                init_iconsax();
            });
        }, 'image/jpeg', 0.8);
    };

    init();
    init_iconsax();
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


export default renderKamera