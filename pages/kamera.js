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
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path d="M126.368 130.753v-19.245c0-8.284-6.716-15-15-15H47.123c-8.284 0-15 6.716-15 15v20.721a77.167 77.167 0 0 1 15-1.476zM333.581 104.8a14.998 14.998 0 0 0-13.416-8.292h-128.49a14.999 14.999 0 0 0-13.416 8.292l-12.977 25.954h181.276zM464.717 160.753H47.123C21.643 160.753 0 181.307 0 207.875v256.981c0 26.626 21.687 47.123 47.123 47.123h417.594c25.435 0 47.122-20.495 47.122-47.123V207.875c0-26.57-21.643-47.122-47.122-47.122zM255.92 447.734c-61.408 0-111.368-49.959-111.368-111.368 5.599-147.541 217.159-147.502 222.736.001-.001 61.407-49.96 111.367-111.368 111.367zm176.674-192.736h-32.122c-19.881-.738-19.866-29.269 0-30h32.122c19.881.738 19.866 29.269 0 30z" fill="#000000" opacity="1" data-original="#000000" class=""></path><path d="M255.92 254.998c-44.866 0-81.368 36.501-81.368 81.368 4.091 107.797 158.661 107.769 162.735-.001 0-44.866-36.501-81.367-81.367-81.367zM395.713 46.249c8.304 2.778 16.515-2.085 18.983-9.466l5.701-17.041c5.609-19.088-21.454-28.126-28.449-9.519l-5.701 17.041c-2.629 7.857 1.609 16.357 9.466 18.985zM450.827 82.38l22.728-22.718c5.859-5.857 5.861-15.354.004-21.213-5.855-5.86-15.354-5.86-21.213-.004l-22.728 22.718c-5.859 5.857-5.861 15.354-.004 21.213 5.855 5.859 15.354 5.861 21.213.004zM465.741 116.261c2.536 7.605 10.863 12.188 18.975 9.484l17.025-5.678c7.859-2.621 12.105-11.116 9.484-18.975-2.621-7.858-11.117-12.104-18.975-9.484l-17.025 5.678c-7.859 2.621-12.105 11.116-9.484 18.975z" fill="#000000" opacity="1" data-original="#000000" class=""></path></g></svg>
            </div>
            <div id="switchButton">
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 32 32" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><g data-name="Layer 2"><path d="M14.707 23.293a1 1 0 0 0-1.414 1.414l.192.192C7.554 24.454 4 22.468 4 21a1.711 1.711 0 0 1 .68-1.17 1 1 0 1 0-1.36-1.47A3.563 3.563 0 0 0 2 21c0 3.456 5.66 5.5 11.673 5.913l-.38.38a1 1 0 1 0 1.414 1.414l2-2a1 1 0 0 0 0-1.414z" fill="#000000" opacity="1" data-original="#000000" class=""></path><circle cx="16" cy="13" r="2" fill="#000000" opacity="1" data-original="#000000" class=""></circle><path d="M9 21h14a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3h-.93a1 1 0 0 1-.832-.445l-.812-1.219A2.993 2.993 0 0 0 17.93 3h-3.86a2.993 2.993 0 0 0-2.5 1.336l-.812 1.219A1 1 0 0 1 9.93 6H9a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3zm7-12a4 4 0 1 1-4 4 4 4 0 0 1 4-4zM28.678 18.356a1 1 0 0 0-1.356 1.471A1.714 1.714 0 0 1 28 21c0 1.063-1.939 2.6-6.2 3.452a1 1 0 0 0 .2 1.981.964.964 0 0 0 .2-.02c4.886-.98 7.8-3 7.8-5.413a3.59 3.59 0 0 0-1.322-2.644z" fill="#000000" opacity="1" data-original="#000000" class=""></path></g></g></svg>
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
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path d="M126.368 130.753v-19.245c0-8.284-6.716-15-15-15H47.123c-8.284 0-15 6.716-15 15v20.721a77.167 77.167 0 0 1 15-1.476zM333.581 104.8a14.998 14.998 0 0 0-13.416-8.292h-128.49a14.999 14.999 0 0 0-13.416 8.292l-12.977 25.954h181.276zM464.717 160.753H47.123C21.643 160.753 0 181.307 0 207.875v256.981c0 26.626 21.687 47.123 47.123 47.123h417.594c25.435 0 47.122-20.495 47.122-47.123V207.875c0-26.57-21.643-47.122-47.122-47.122zM255.92 447.734c-61.408 0-111.368-49.959-111.368-111.368 5.599-147.541 217.159-147.502 222.736.001-.001 61.407-49.96 111.367-111.368 111.367zm176.674-192.736h-32.122c-19.881-.738-19.866-29.269 0-30h32.122c19.881.738 19.866 29.269 0 30z" fill="#000000" opacity="1" data-original="#000000" class=""></path><path d="M255.92 254.998c-44.866 0-81.368 36.501-81.368 81.368 4.091 107.797 158.661 107.769 162.735-.001 0-44.866-36.501-81.367-81.367-81.367zM395.713 46.249c8.304 2.778 16.515-2.085 18.983-9.466l5.701-17.041c5.609-19.088-21.454-28.126-28.449-9.519l-5.701 17.041c-2.629 7.857 1.609 16.357 9.466 18.985zM450.827 82.38l22.728-22.718c5.859-5.857 5.861-15.354.004-21.213-5.855-5.86-15.354-5.86-21.213-.004l-22.728 22.718c-5.859 5.857-5.861 15.354-.004 21.213 5.855 5.859 15.354 5.861 21.213.004zM465.741 116.261c2.536 7.605 10.863 12.188 18.975 9.484l17.025-5.678c7.859-2.621 12.105-11.116 9.484-18.975-2.621-7.858-11.117-12.104-18.975-9.484l-17.025 5.678c-7.859 2.621-12.105 11.116-9.484 18.975z" fill="#000000" opacity="1" data-original="#000000" class=""></path></g></svg>
                        `;
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
