let usercode =  document.getElementById("usercode").value;
export let renderprofile = () => {
    document.querySelector("#app").innerHTML = `
        <style>
            .bgm {
                padding: 100px 20px 190px;
                box-shadow: 0 -10px 1rem 9px rgb(0 0 0 / 26%);
                position: absolute;
            }
            .status {
                list-style: none;
                padding: 10px;
                border-radius: 12px;
                position: absolute;
                font-size: 12px;
                right: 0;
                text-transform: capitalize;
                background: #c53f3f;
                color: #fff;
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
            .profile-image #file{
                position: absolute;
                bottom: 0;
                right: 0;
                width: 26px;
                height: 26px;
                z-index: 2;
                opacity: 0;
                cursor: pointer;
            }
            .profile-imagex{
                width: 140px;
                height: 140px;
                position: absolute;
                top: -200px;
                left: 32vw;
            }
            .profile-image{
                position:relative;
                width: 140px;
                height: 140px;
            }
            .profile-image img{
                width: 140px;
                height: 140px;
                overflow: hidden;
                border-radius: 50%;
                border: 3px solid #c53f3f;
            }
            .profile-image svg{
                overflow: hidden;
                border-radius: 50%;
            }
            .profile-imagex .upload-icon {
                position: absolute;
                bottom: 10px;
                right: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 5px;
                --Iconsax-Color: rgba(var(--title-color), 1);
                --Iconsax-Size: 16px;
                background-color: rgba(var(--white), 1);
                border-radius: 100%;
                z-index: 1;
            }
            .location-map{
                z-index: 0;
                object-fit: cover;
                background-repeat: no-repeat;
                background-size: cover;
                width: 100%;
                height: 40%;
                background-position: bottom left;
            }
            .hide{display:none!important;}
        </style>
        <header id="header" class="main-header inner-page-header position-absolute bg-transparent" style="position: fixed!important;z-index: +9;width:100%;">
            <div class="custom-container">
                <div class="header-panel p-0">
                    <a id="backbtn"><i class="iconsax icon-btn" data-icon="chevron-left"></i></a>
                    <h3 class="p-0">Profile</h3>
                </div>
            </div>
        </header>
        <main>
            <div class="location-map position-relative w-100 h-100" id="map" style="z-index: 0;background:url('./assets/images/bgbuah.webp');background-size: 270px;"></div>
            <section class="bgm theme-content-bg setting-section" style="background: #f9f9f9;padding: 20px 0 220px;">
                <div class="profile-imagex m-0">
                    <div class="profile-image">
                        <img id="output" class="img-fluid profile-pic" src="./assets/images/profile/p8.png" alt="p8">
                        <input id="file" type="file">
                        <i class="iconsax upload-icon" data-icon="edit-2"></i>
                    </div>
                </div>
                <div class="custom-container" style="margin-top: -55px;">
                    <div class="profile-section white-background p-3" style="border-radius: 12px;">
                        <div class="flex-align-center gap-2" style="position:relative;">
                            <div class="profile-content">
                                <h3 class="profile-name Full_Name">Jonathan Joestar</h3>
                                <h6 class="fw-normal content-color mt-1 Phone">0857 8155 0337</h6>
                            </div>
                            <span class="status fw-normal bg-gagalx nik Card_ID">20013</span>
                        </div>
                    </div>
                </div>
                <div class="custom-container">
                    <div class="profile-list mt-3">
                        <ul class="setting-listing">
                            <li class="w-100">
                                <a id="openPopup" class="setting-box">
                                    <div class="setting-icon">
                                        <i class="iconsax icon" data-icon="user-1"></i>
                                    </div>
                                    <div class="setting-content">
                                        <h5>Edit Profile</h5>
                                        <i class="iconsax icon" data-icon="chevron-right"></i>
                                    </div>
                                </a>
                            </li>

                            <li class="w-100">
                                <a onclick="hrefs('resetpin')" class="setting-box">
                                    <div class="setting-icon">
                                        <i class="iconsax icon" data-icon="lock-2"></i>
                                    </div>
                                    <div class="setting-content">
                                        <h5>Reset Pin </h5>
                                        <i class="iconsax icon" data-icon="chevron-right"></i>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="profile-list alert-list mt-3">
                        <ul class="setting-listing">
                            <li class="w-100">
                                <a onclick="keluar()" class="setting-box">
                                    <div class="setting-icon">
                                        <i class="iconsax icon" data-icon="logout-2"></i>
                                    </div>
                                    <div class="setting-content">
                                        <h5 class="error-color">Logout</h5>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
            <div id="modpop">
                <div id="olay"></div>
                <div class="theme-content-bg">
                    <div class="title mt-4"><h3>Edit Profile</h3></div>
                    <form class="jotheme-form" style="margin-bottom:100px;">
                        <div class="form-group">
                            <input type="text" class="form-controljo Full_Name" id="Full_Name" name="Full_Name" placeholder=" " required>
                            <label class="form-labeljo" for="Full_Name">Nama Lengkap</label>
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-controljo Phone" id="Phone" name="Phone" placeholder=" " required>
                            <label class="form-labeljo" for="Phone">No. Whatsapp</label>
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-controljo Email" id="Email" name="Email" placeholder=" " required>
                            <label class="form-labeljo" for="Email">E-Mail</label>
                        </div>
                        <div class="order-type"></div>
                    </form>
                    <div class="offcanvas-footer tbf flex-align-center flex-nowrap gap-3 border-0 pt-3 px-0 pb-0" style='border-bottom:1px solid rgba(var(--line-color), 1);'>
                        <span class="btn theme-btn w-100 mt-0 pulse simpandata">Simpan</span>
                        <span class="btn white-btn title-color w-100 mt-0 closepopup" onclick="closePopup()">Cancel</a>
                    </div>
                </div>
            </div>
        </main>
    `;

    let loadFile = async (event) => {
        let userData = localStorage.getItem('user_data');
        let userObj = userData ? JSON.parse(userData) : null;
        let usercode = userObj ? userObj.Card_ID || userObj.usercode : null; 
        
        if (!usercode) {
            showToast("Gagal mengidentifikasi pengguna.", "danger");
            return;
        }
    
        let file = event.target.files[0];
        if (!file) return;
        
        let formData = new FormData();
        formData.append('profile_picture', file); 
        formData.append('usercode', usercode); 
        
        try {
            let response = await fetch(urlbe + 'gantipp', {
                method: 'POST',
                body: formData 
            });
            let result = await response.json();
            if (response.ok && result.success) {
                let currentData = JSON.parse(localStorage.getItem('user_data'));
                currentData.display_picture = result.display_picture; 
                localStorage.setItem('user_data', JSON.stringify(currentData));
                showToast("Foto profil berhasil diunggah!", "success");
                document.querySelector("#output").setAttribute('src', urlbe2 + result.display_picture); 
    
            } else {
                showToast(result.message || "Gagal mengunggah foto profil.", "danger");
            }
        } catch (error) {}
    };
    
    document.querySelector('#file').onchange = (event) => {
        loadFile(event);
    };

    let infouser = () => {
        let data = localStorage.getItem('user_data'),
        obj = data ? JSON.parse(data) : null;
        if (!obj) return; 
        let fields = {
            'Full_Name': obj.Full_Name,
            'Phone': obj.Phone,
            'Card_ID': obj.Card_ID,
            'Email': obj.Email
        };
    
        document.querySelector("#output").setAttribute('src', urlbe2 + result.display_picture); 
    
        
        let updateElement = (selector, value) => {
            document.querySelectorAll(selector).forEach((el) => {
                let tagName = el.tagName.toLowerCase();
                (tagName === 'input' || tagName === 'textarea' || tagName === 'select') ? el.value = value : el.innerText = value;
            });
        };
        
        for (let key in fields) {
            if (fields.hasOwnProperty(key)) {updateElement(`.${key}`, fields[key]);}
        }
    };
    
    infouser();
    
    
    document.querySelector(".simpandata").onclick = async ()=> {
        let form = document.querySelector(".jotheme-form");
        let formData = new FormData(form);
        let data = {};
        let kosong = false;
        formData.forEach((value, key) => {
            data[key] = value.trim();
            if (!value.trim()) kosong = true;
        });
    
        data["usercode"] = usercode;
        closePopup();
        if (kosong) {
            showToast("Semua field harus diisi.", "danger");
            openPopup();
            return;
        }
        try {
            let response = await fetch(urlbe + "simpanprofile", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });
    
            if (response.ok) {
                let result = await response.json(); 
                
                if (result.status === "success" && result.profile) {
                    let updatedData = {
                        ...result.profile,
                        usercode: result.usercode
                    };
                    
                    localStorage.setItem('user_data', JSON.stringify(updatedData));
                    
                    showToast(result.message, "success");
                    
                    infouser();
                } else {
                    showToast(result.message || "Terjadi kesalahan saat menyimpan data.", "danger");
                }
            } else {
                showToast("Terjadi kesalahan saat menyimpan data.", "danger");
            }
        } catch {
            showToast("Tidak dapat terhubung ke server.", "danger");
        }
    };

    let backbtn = document.getElementById("backbtn");
    if (backbtn) { backbtn.onclick=() => window.history.back();}
    
    let openPopup = () => { infouser(); document.getElementById('modpop').classList.add('show');}
    let closePopup = () => document.getElementById('modpop').classList.remove('show');

    document.querySelectorAll('.closepopup').forEach((el)=>{
        if(el){
            el.onclick = ()=>document.getElementById('modpop').classList.remove('show')
        }
    });

    
    document.getElementById('openPopup').onclick = () => openPopup();
    document.getElementById('olay').onclick = () => closePopup();


};
export default renderprofile;
