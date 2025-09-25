let usercode =  document.getElementById("usercode").value;
export let renderprofile = () => {
  document.querySelector("#app").innerHTML = `
        <style>
            .bgm {
                padding: 100px 20px 190px;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
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
            .profile-image {
                width: 140px;
                height: 140px;
                border-radius: 50%;
                position: absolute;
                top: -200px;
                left: 28vw;
                border: 5px solid #c53f3f;
                background: #e6d4d4;
                overflow: hidden;
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
            <div class="location-map position-relative w-100 h-100" id="map" style="z-index: 0;">
                <img class="coverpro" src="./assets/images/bg-air.webp"/>
            </div>
            <section class="bgm theme-content-bg setting-section" style="background: #e3e3e3;padding: 20px 0 220px;">
                <div class="profile-image m-0">
                    <img class="img-fluid profile-pic" src="./assets/images/profile/p8.png" alt="p8">
                </div>
                <div class="custom-container" style="margin-top: -55px;">
                    <div class="profile-section white-background p-3" style="border-radius: 12px;">
                        <div class="flex-align-center gap-2" style="position:relative;">
                            <div class="profile-content">
                                <h3 class="profile-name">Jonathan Joestar</h3>
                                <h6 class="fw-normal content-color mt-1">0857 8155 0337</h6>
                            </div>
                            <span class="status fw-normal bg-gagalx nik">20013</span>
                        </div>
                    </div>
                </div>
                <div class="custom-container">
                    <div class="profile-list mt-3">
                        <ul class="setting-listing">
                            <li class="w-100">
                                <a href="profile-setting.html" class="setting-box">
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
                                <a onclick="keluar()" class="setting-box" data-bs-toggle="modal">
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
        </main>
    `;

    let backbtn = document.getElementById("backbtn");
    if (backbtn) { backbtn.onclick=() => window.history.back();}
};
export default renderprofile;
