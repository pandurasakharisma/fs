let usercode =  document.getElementById("usercode").value;
let resetpinbox = ()=>{
    document.querySelectorAll('.pinx input').forEach(el=>{
        el.value= '';
        el.setAttribute('value','');
    });

    document.querySelector('#five1').focus();
}

let pin = "", pin1, pin2, handleotp = (e,pin,trial = null) => {
    if (e) e.preventDefault();

    if(pin1){
        pin2 = pin;
        if(pin1 != pin2){
            showToast("Pin Tidak Match", "error");
            resetpinbox(); 
            pin =null; pin1 = null, pin2 = null;
        }
    }else{
        pin1 = pin;resetpinbox(); 
        document.querySelector('.auth-title h2').innerHTML = 'Konfirmasi Pin';
    }

    if(pin2 && pin1 == pin2){
        
        if(usercode){
            fetch(urlbe + "ubahpin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ pin2,usercode }),
            }).then((res) => res.json()).then((data) => {
                if (data.status === "success") {
                    showToast("Pin Berhasil Dirubah", "success");
                    window.location.hash = "home";
                } else {
                    resetpinbox();
                    showToast(data.message, "error");
                }
            }).catch((e) => {
                resetpinbox();
                showToast(e.message, "error");
            });
        }
    }
  };

export let renderresetpin = () => {
  document.querySelector("#app").innerHTML = `
        <style>
            .auth-bg-image-box .auth-bg-image {
                background-size: cover;
                height: 240px;
                animation:unset;
                background:unset;
            }
            .auth-bg-image-box, .auth-content-bg {
                position: relative;
                background: #f5f5f5;
                z-index: 10;
            }
            .auth-bg-image-box .auth-bg-image {
                background-size: cover;
                height: calc(100vh - 360px);
            }
            .auth-bg-image-box, .auth-content-bg{z-index:0;}
            .auth-content-bg.auth-content-bg-bottom {
                width: 100%;
                max-width: 600px;
                min-height: 160px;
                margin-top: -13px;
                padding-top: 25px;
                background-color: rgba(var(--white), 1);
                border-radius: 20px 20px 0 0;
                position: fixed;
                bottom: 0;
                height: 100%;
                max-height: 260px;
                box-shadow: 0px 4px 22px 0px rgba(23, 28, 38, 0.12);
            }

            @keyframes slidebg {
                0% {transform:translateX(-25%);}
                100% {transform:translateX(25%);}
            }
            @media (max-width: 600px) {
                .auth-bg-image-box .auth-bg-image {padding:10vh 0 0;}
            }
            .hide{display:none!important;}
        </style>
        <header id="header" class="main-header inner-page-header position-absolute bg-transparent" style="position: fixed!important;z-index: +9;width:100%;">
            <div class="custom-container">
                <div class="header-panel p-0">
                    <a id="backbtn"><i class="iconsax icon-btn" data-icon="chevron-left"></i></a>
                    <h3 class="p-0">Reset PIN</h3>
                </div>
            </div>
        </header>
        <div class="auth-bg-image-box">
            <div class="auth-bg-image">
                <img src="./assets/images/bg-otp.svg"/>
            </div>
            <div class="auth-content-bg auth-content-bg-bottom">
                <div class="custom-container white-background pb-2" style="margin:0 10px;">
                    <div class="auth-title pt-3">
                        <div class="loader-line"></div>
                        <h2>Ganti Pin</h2>
                        <h6>Masukkan kode PIN baru</h6>
                    </div>
                    <div class="auth-form mt-0">
                        <div class="otp-form mt-3 pinx">
                            <div class="form-input dark-border-gradient">
                                <input type="number" class="form-control active" placeholder="0" id="five1" onkeyup="onKeyUpEvent(1, event)" onfocus="onFocusEvent(1)">
                            </div>
                            <div class="form-input dark-border-gradient">
                                <input type="number" class="form-control" placeholder="0" id="five2" onkeyup="onKeyUpEvent(2, event)" onfocus="onFocusEvent(2)">
                            </div>
                            <div class="form-input dark-border-gradient">
                                <input type="number" class="form-control" placeholder="0" id="five3" onkeyup="onKeyUpEvent(3, event)" onfocus="onFocusEvent(3)">
                            </div>
                            <div class="form-input dark-border-gradient">
                                <input type="number" class="form-control" placeholder="0" id="five4" onkeyup="onKeyUpEvent(4, event)" onfocus="onFocusEvent(4)">
                            </div>
                            <div class="form-input dark-border-gradient">
                                <input type="number" class="form-control" placeholder="0" id="five5" onkeyup="onKeyUpEvent(5, event)" onfocus="onFocusEvent(5)">
                            </div>
                            <div class="form-input dark-border-gradient">
                                <input type="number" class="form-control" placeholder="0" id="five6" onkeyup="onKeyUpEvent(6, event)" onfocus="onFocusEvent(6)">
                            </div>
                        </div>
                        <div class="form-group hide">
                            <label class="form-label mb-2" for="Inputemail">Email</label>
                            <div class="position-relative">
                                <input type="text" class="form-control" id="Inputemail" placeholder="Silahkan masukkan Username">
                                <i class="iconsax icon" data-icon="mail"></i>
                            </div>
                        </div>

                        <div class="form-group hide">
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

                        <button id="cekl" type="submit" class="btn theme-btn w-100 auth-btn mt-4">Reset PIN</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    
    window.onFocusEvent = (index) => {
        const currentElement = getCodeBoxElement(index);
        currentElement.value = "";
        for (let i = 1; i < index; i++) {
            if (!getCodeBoxElement(i).value) {
                getCodeBoxElement(i).focus();
                break;
            }
        }
    };

    
    let getCodeBoxElement = (index) => document.getElementById("five" + index);
    window.onKeyUpEvent = (index, event) => {
        const eventCode = event.which || event.keyCode;
        const currentElement = getCodeBoxElement(index);
        if (currentElement.value.length === 1) {
            if (index == 1) { pin = ''; }
            pin += currentElement.value;
            if (index !== 6) {
                getCodeBoxElement(index + 1).focus();
            } else {
                currentElement.blur();
                handleotp(event,pin);
            }
        } else if (eventCode === 8 && index !== 1) {
            getCodeBoxElement(index - 1).focus();
        }
    };

    let five1 = document.getElementById("five1");
    if(five1){ five1.focus(); }
    
    let backbtn = document.getElementById("backbtn");
    if (backbtn) { backbtn.onclick=() => window.history.back();}

    document.getElementById("cekl").onclick = (event) => handleotp(event,pin);;
    document.body.onkeypress = (e) => (e.key === "Enter" ? handleotp(e,pin) : null);

};

export default renderresetpin;
