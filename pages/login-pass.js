let handleLogin = e => {
    if (e) e.preventDefault();
    let username = document.getElementById('Inputemail').value;
    let password = document.getElementById('Inputpassword').value;

    fetch(urlbe + 'ceklogin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
    .then(res => res.json())
    .then(data => {
        if (data.status === 'success') {
            localStorage.setItem('user_data', JSON.stringify(data.data));
            localStorage.setItem('user_absen', JSON.stringify(data.absensi));
            localStorage.setItem('user_token', data.token);
            showToast('Kamu Berhasil Login', 'success');
            window.location.hash = '/home';
        } else {
            showToast(data.message, 'error');
        }
    })
    .catch((e) => {
        showToast(e.message, 'error');
    });
};

export const renderLogin = () => {
    document.querySelector('#app').innerHTML = `
        <style>
            .auth-bg-image-box, .auth-content-bg {
                position: relative;
                z-index: 10;
            }
            .auth-bg-image-box .auth-bg-image {
                background-size: cover;
                height: calc(100vh - 360px);
            }
            .bg {
                animation:slidebg 3s ease-in-out infinite alternate;
                background-image:linear-gradient(-60deg, #6d2a25 50%, #c53f3f 50%);
                bottom:0;
                left:-50%;
                opacity:.5;
                position:fixed;
                right:-50%;
                top:0;
                z-index:-1;
            }
            .bg2 {animation-direction:alternate-reverse;animation-duration:4s;}
            .bg3 {animation-duration:5s;}
            .auth-bg-image-box, .auth-content-bg{z-index:0;}
            @keyframes slidebg {
                0% {transform:translateX(-25%);}
                100% {transform:translateX(25%);}
            }
        </style>
        <header id="header" class="auth-header" style="background:unset;">
            <div class="custom-container">
                <div class="header-panel pb-0">
                    <img class="img-fluid mx-auto logo user-logo" src="./assets/images/logo/user/logo-white.svg" alt="logo">
                </div>
            </div>
        </header>
        <div class="auth-bg-image-box">
            <div class="auth-bg-image">
                <div class="bg"></div>
                <div class="bg bg2"></div>
                <div class="bg bg3"></div>
            </div>
            <div class="auth-content-bg auth-content-bg-bottom">
                <div class="custom-container white-background pb-2" style="margin:0 10px;">
                    <div class="auth-title mt-0">
                        <div class="loader-line"></div>
                        <h6>Hey, Silahkan masukkan data!</h6>
                    </div>

                    <div class="auth-form mt-0">
                        <div class="form-group">
                            <label class="form-label mb-2" for="Inputemail">Email</label>
                            <div class="position-relative">
                                <input type="text" class="form-control" id="Inputemail" placeholder="Silahkan masukkan Username">
                                <i class="iconsax icon" data-icon="mail"></i>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="form-label mb-2" for="Inputpassword">Password</label>
                            <div class="position-relative">
                                <input type="password" class="form-control" id="Inputpassword" placeholder="Enter password">
                                <i class="iconsax icon" data-icon="lock-2"></i>
                            </div>
                            <div class="show-hide toggler">
                                <i class="iconsax eye-icon icon-eye" data-icon="eye"></i>
                                <i class="iconsax eye-icon icon-eye-splash" data-icon="eye-slash"></i>
                            </div>
                        </div>

                        <button id="cekl" type="submit" class="btn theme-btn w-100 auth-btn mt-4">Login</button>
                    
                        <h6 class="title-color fw-semibold mt-3 text-center"> 
                            <span class="content-color fw-medium">Lupa Password ??</span> 
                            <a onclick="hrefs('login')" class="title-color fw-medium">Dengan PIN</a> 
                        </h6>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Toggle show/hide password
    var passwords = document.querySelectorAll('[type="password"]');
    var togglers = document.querySelectorAll(".toggler");
    let showHidePassword = index => () => {
        var password = passwords[index];
        var toggler = togglers[index];
        if (password.type === "password") {
            password.setAttribute("type", "text");
            toggler.classList.add("show");
        } else {
            toggler.classList.remove("show");
            password.setAttribute("type", "password");
        }
    };
    togglers.forEach((toggler, index) => {
        toggler.addEventListener("click", showHidePassword(index));
    });

    // Handle login
    document.getElementById('cekl').onclick = () => handleLogin();
    document.body.onkeypress = e => e.key === 'Enter' ? handleLogin(e) : null;

    // Jika user sudah login
    let userToken = localStorage.getItem('user_token');
    if (userToken) {
        showToast('Kamu Berhasil Login', 'success');
        window.location.hash = 'home';
    }
};

export default renderLogin;