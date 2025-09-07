export let renderKamera = () => {
    
    document.querySelector('#app').innerHTML = `
        <style>
            .categories-place-box {
                display: flex;
                align-items: center;
                gap: 5px;
                padding: 10px 15px;
                background-color: rgba(var(--white), 1);
                border: 1px solid rgba(var(--line-color), 1);
                border-radius: 6px;
            }

            .offer-head .delete-btn {
                background: #f9ebeb;
                stroke: #c53f3f;
                border: none;
                border-radius: 50%;
                width: 36px;
                height: 36px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
            }
            .offer-head .delete-btn:hover {background: #fff;}
            .recent-icon img {
                width: 26px;
                height: 48px;
                margin-right: 5px;
            }
            #header{
                position: fixed;
                width: 100%;
                max-width: 600px;
                margin-top: 0;
                padding-top: 10px;
                z-index: +2;
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

            .tbf2{
                position: fixed;
                bottom: 0;
                margin: 0 auto;
                z-index: +2;
                width: calc(100%);
                background: #fff;
                max-width: calc(600px);
                padding: 20px 10px 9px;
            }

            .bgm{
                background: #c53f3f;
                padding: 100px 20px 60px;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
                position: relative;
                overflow: hidden;
            }
            .shadow-sm{box-shadow:0px 0px 18px #efefef;}
            .bgm:before {
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
            .card-absen {
                background: #fff;
                border-radius: 8px;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
            }
            .card::before {
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
            .seclist {
                background: #fff;
                border-top-left-radius: 18px;
                border-top-right-radius: 18px;
                margin-top: -20px;
                z-index: +1;
                position: absolute;
                border: none;
                width: 100%;
                min-height: calc(100vh - 240px);
            }
            .gantung1 {
                margin: 0 10px;
                margin-top: -50px;
                background: #fff;
                z-index: +3;
                padding: 8px 20px;
                border-radius: 8px;
            }
            .gantung1 p{font-size:11px;}
            #cdk {
                font-size: 1.6rem;
                line-height: 1.1;
                color: #c53f3f;
            }
            .gantung1 button{
                background: #c53f3f;
                color: #fff;
                border: none;
                margin: 0;
                padding: 8px 20px;
                margin-left: auto;
                margin-right: -10px;
            }
            #formContainer {margin-top: 40px;margin-bottom: 120px;}
            .form-wrapper {
                padding: 15px;
                background-color: rgba(var(--white), 1);
                border: 1px solid rgba(var(--line-color), 1);
                border-radius: 10px;
                margin-bottom: 10px;
                box-shadow: 0px 4px 20px 0px rgba(var(--title-color), 0.06);
            }
            .offer-head {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding-bottom: 15px;
                border-bottom: 1px dashed rgba(var(--line-color), 1);
            }
            .offer-head h4 {
                font-weight: 600;
                padding: 8px 16px;
                color: rgba(var(--theme-color), 1);
                background-color: rgba(var(--theme-color), 0.1);
                border-radius: 4px;
            }
            .skeleton-loader {
                background: #f0f0f0;
                border-radius: 6px;
                overflow: hidden;
                position: relative;
                margin-bottom: 10px;
                padding: 10px;
            }

            .skeleton-loader-line {
                height: 14px;
                background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
                background-size: 200% 100%;
                border-radius: 4px;
                animation: shimmer 1.5s infinite;
                margin: 6px 0;
            }

            @keyframes shimmer {
                0% { background-position: -200% 0; }
                100% { background-position: 200% 0; }
            }
        </style>
        <header id="header" class="main-header inner-page-header">
            <div class="custom-container">
                <div class="header-panel">
                <div class="flex-spacing gap-2 w-100" style="align-items: center; display: flex;">
                    <a onclick="hrefs('home')" class="back-btn">
                        <i class="iconsax icon-btn" data-icon="chevron-left" height="40" width="40" style="border: none;margin-left: -10px;"></i>
                    </a>
                    <div class="location-box flex-grow-1" style="background-color: rgba(var(--box-bg), 1);display: flex;align-items: center;border-radius: 6px;padding: 8px;">
                        <img class="icon" src="./assets/images/svg/gps.svg" alt="location" style="width:18px; margin-right:6px;">
                        <input type="text" id="searchInput" class="form-control border-0 p-0" placeholder="Enter destination" style="background: none;flex:1; box-shadow:none;">
                        <img id="clearBtn" class="clear-btn" width="12" style="display:none; cursor:pointer;margin-right:6px;" src="data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23000'%3e%3cpath d='M.293.293a1 1 0 0 1 1.414 0L8 6.586 14.293.293a1 1 0 1 1 1.414 1.414L9.414 8l6.293 6.293a1 1 0 0 1-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 0 1-1.414-1.414L6.586 8 .293 1.707a1 1 0 0 1 0-1.414z'/%3e%3c/svg%3e" alt="clear">
                    </div>
                </div>
                </div>
            </div>
        </header>
        <main>
            <section class="bgm">
                <div class="card card-absen p-3 position-relative">
                    <div class="row align-items-center position-relative">
                        <div>
                            <h2 class="font-weight-bold">Conrad Chicago Restaurant</h2>
                            <p class="font-weight-light m-0">963 Madyson Drive Suite 679</p>
                        </div>
                        <div class="pt-4">
                            <div class="row">
                                <div class="col-6">
                                    <p class="m-0 small">Delivery <span class="badge badge-osahan badge-warning small">Free</span></p>
                                </div>
                                <div class="col-6">
                                    <p class="m-0 small">Open time <span class="badge badge-osahan badge-dark small">8:00 AM</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="seclist">
                <div class="custom-container">
                    <div class="gantung1 d-flex shadow-sm">
                        <div>
                            <p>Durasi Kunjungan</p>
                            <strong id="cdk">18:00:10</strong>
                        </div>
                        <button onclick="logout()" class="btn btn-clock mb-0" id="btnClock">
                            Keluar Akun
                        </button>
                    </div>
                    
                    <div id="formContainer"></div>
                </div>
            </section>
            
            <section style='padding:65px 0 0;'>
                <ul id="placeList" class="recent-place-list">
                    <li class="recent-place-item" style="display: none;">
                        <div class="recent-box">
                            <div class="recent-icon">
                                <img class="icon" src="./assets/images/svg/location-fill.svg" alt="location">
                            </div>
                            <div>
                                <h5 class="card-name"></h5>
                                <p class="address"></p>
                            </div>
                        </div>
                    </li>
                </ul>
                <i class="iconsax addcust" data-icon="add" id="addFormBtn">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 12H18" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path d="M12 18V6" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                </i>
                
                <div class="offcanvas-footer tbf2  hide flex-align-center flex-nowrap gap-3 border-0 pt-3 " style='border-bottom:1px solid rgba(var(--line-color), 1);'>
                    <span class="btn theme-btn w-100 mt-0 addcustx">Simpan</span>
                    <a class="btn white-btn title-color w-100 mt-0" href="./index.html">Cancel</a>
                </div>
            </section>

        </main>


    `
    const formContainer = document.getElementById('formContainer')
    const addFormBtn = document.getElementById('addFormBtn')
    
    const formatRupiah = val => {
        const number = val.replace(/\D/g, '')
        return number.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    }
    
    const createForm = () => {
        const wrapper = document.createElement('div')
        wrapper.className = 'form-wrapper'
        wrapper.innerHTML = `
            <div class="offer-head">
                <h4>30% OFF </h4>
                <div class=" flex-align-center gap-2">
                    <span class="delete-btn">
                        <i class="iconsax icon error-icon" data-icon="trash-square"></i>
                    </span>
                </div>
            </div>
            <form class="jotheme-form">
                <div class="form-group">
                    <input type="text" class="form-controljo brand" placeholder=" " required>
                    <label class="form-labeljo">Brand Competitor</label>
                </div>
                <div class="form-group">
                    <input type="text" class="form-controljo harga" placeholder=" " required>
                    <label class="form-labeljo">Harga</label>
                </div>
                <div class="row" style="display: flex; gap: 20px;">
                    <div class="col-6" style="flex: 1;">
                        <div class="form-group">
                            <input type="text" class="form-controljo pemakaian" placeholder=" " required>
                            <label class="form-labeljo">Pemakaian</label>
                        </div>
                    </div>
                    <div class="col-6" style="flex: 1;">
                        <div class="form-group">
                            <select class="form-selectjo durasi" required>
                            <option value="" disabled selected></option>
                            <option value="tahun">Tahun</option>
                            <option value="bulan">Bulan</option>
                            <option value="hari">Hari</option>
                            </select>
                            <label class="form-labeljo">Durasi</label>
                        </div>
                    </div>
                </div>
            </form>
        `
    
        const hargaInput = wrapper.querySelector('.harga')
        hargaInput.addEventListener('input', e => {
        e.target.value = formatRupiah(e.target.value)
        })
        hargaInput.addEventListener('keydown', e => {
        if (!/[0-9]|Backspace|ArrowLeft|ArrowRight|Delete|Tab/.test(e.key)) e.preventDefault()
        })
    
        const pemakaianInput = wrapper.querySelector('.pemakaian')
        pemakaianInput.addEventListener('keydown', e => {
        if (!/[0-9]|Backspace|ArrowLeft|ArrowRight|Delete|Tab/.test(e.key)) e.preventDefault()
        })
    
        wrapper.querySelector('.delete-btn').addEventListener('click', () => wrapper.remove())
    
        formContainer.appendChild(wrapper)
        
        init_iconsax()
    }
    
    addFormBtn.addEventListener('click', () => createForm())
    createForm();
}


export default renderKamera