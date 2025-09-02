let urlbe = "https://rightly-composed-marlin.ngrok-free.app/";
let setUserCode = () => {
    let data = localStorage.getItem('user_data'),
        obj = data ? JSON.parse(data) : null,
        code = obj ? obj.Card_ID : '',
        el = document.getElementById('usercode');
    if (el) {
        el.value = code;
        el.setAttribute('value', code);
    } else {
        el = Object.assign(document.createElement('input'), {id:'usercode',className:'hide'});
        el.value = code;
        el.setAttribute('value', code);
        document.body.appendChild(el);
    }
};
let getAuthToken = () => localStorage.getItem("user_token");
let checkAuth = () => {
    let userToken = getAuthToken();
    const currentUrl = window.location.href.toLowerCase(); 
    if (!userToken && !currentUrl.includes("login")) {
        window.location.href = './login.html';
    }

    
  setUserCode();
};

let logout = (redirectUrl) => {
    localStorage.removeItem("user_token");
    window.location.href = redirectUrl;
};

let renderHeadContent = () => {
    let head = document.head;
    let path = window.location.pathname.split("/").filter(Boolean);
    let pageTitle = path.length > 0 ? path[path.length - 1].replace(/-/g, " ").toUpperCase() : "FS CRM";
    document.title = pageTitle;

    let metaLinks = [
        { tag: "meta", attributes: { "http-equiv": "Content-Type", content: "text/html; charset=UTF-8" } },
        { tag: "meta", attributes: { "http-equiv": "X-UA-Compatible", content: "IE=edge" } },
        { tag: "meta", attributes: { name: "viewport", content: "width=device-width, initial-scale=1.0" } },
        { tag: "meta", attributes: { name: "description", content: "FS-CRM" } },
        { tag: "meta", attributes: { name: "keywords", content: "FS-CRM" } },
        { tag: "meta", attributes: { name: "author", content: "FS-CRM" } },
        { tag: "link", attributes: { rel: "manifest", href: "manifest.json" } },
        { tag: "link", attributes: { rel: "icon", href: "./assets/images/logopk.png", type: "image/x-icon" } },
        { tag: "link", attributes: { rel: "apple-touch-icon", href: "./assets/images/logo/favicon.png" } },
        { tag: "meta", attributes: { name: "title-color", content: "#c53f3f" } },
        { tag: "meta", attributes: { name: "mobile-web-app-capable", content: "yes" } },
        { tag: "meta", attributes: { name: "apple-mobile-web-app-status-bar-style", content: "red" } },
        { tag: "meta", attributes: { name: "apple-mobile-web-app-title", content: "FS-CRM" } },
        { tag: "meta", attributes: { name: "msapplication-TileImage", content: "./assets/images/logo/favicon.png" } },
        { tag: "meta", attributes: { name: "msapplication-TileColor", content: "#c53f3f" } },
        { tag: "meta", attributes: { "http-equiv": "X-UA-Compatible", content: "IE=edge" } },
        { tag: "link", attributes: { rel: "stylesheet", type: "text/css", href: "./assets/css/GTWalsheimPro.css" } },
        { tag: "link", attributes: { rel: "stylesheet", type: "text/css", href: "./assets/css/vendors/bootstrap.css" } },
        { tag: "link", attributes: { rel: "stylesheet", type: "text/css", href: "./assets/css/style.css" } },
    ];
    metaLinks.forEach(item => {
        let element = document.createElement(item.tag);
        for (let key in item.attributes) {
            element.setAttribute(key, item.attributes[key]);
        }
        head.appendChild(element);
    });
};

let loadScript = (src) => {
    return new Promise((resolve, reject) => {
        let script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve(src);
        script.onerror = () => reject(new Error(`Gagal memuat script: ${src}`));
        document.body.appendChild(script);
    });
};

let init_iconsax = () => {
    document.querySelectorAll(".iconsax").forEach(iconsax => {
        let TuT = iconsax.getAttribute("data-icon").toLowerCase().trim();
        fetch("https://glenthemes.github.io/iconsax/icons/" + TuT + ".svg")
            .then(n_n => n_n.text())
            .then(n_n => {
                iconsax.innerHTML = n_n;
                if (iconsax.querySelectorAll("[http-equiv='Content-Security-Policy']").length) {
                    iconsax.innerHTML = "";
                }
            })
            .catch(error => console.error(`Gagal memuat ikon: ${TuT}`, error));
    });
};

let initRatioJS = () => {
    let bgImg = document.querySelectorAll(".bg-img");
    for (let i = 0; i < bgImg.length; i++) {
        let bgImgEl = bgImg[i];
        if (bgImgEl.classList.contains("bg-top")) {
            bgImgEl.parentNode.classList.add("b-top");
        } else if (bgImgEl.classList.contains("bg-bottom")) {
            bgImgEl.parentNode.classList.add("b-bottom");
        } else if (bgImgEl.classList.contains("bg-center")) {
            bgImgEl.parentNode.classList.add("b-center");
        } else if (bgImgEl.classList.contains("bg-left")) {
            bgImgEl.parentNode.classList.add("b-left");
        } else if (bgImgEl.classList.contains("bg-right")) {
            bgImgEl.parentNode.classList.add("b-right");
        }
        if (bgImgEl.classList.contains("blur-up")) {
            bgImgEl.parentNode.classList.add("blur-up", "lazyload");
        }
        if (bgImgEl.classList.contains("bg_size_content")) {
            bgImgEl.parentNode.classList.add("b_size_content");
        }
        bgImgEl.parentNode.classList.add("bg-size");
        let bgSrc = bgImgEl.src;
        bgImgEl.style.display = "none";
        bgImgEl.parentNode.setAttribute(
            "style",
            `background-image: url(${bgSrc}); background-size:cover; background-position: center; background-repeat: no-repeat; display: block;`
        );
    }
};

let handleServiceWorker = () => {
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("sw.js");
    }
};

let createSpinner = () => {
    let spinner = document.createElement('div');
    spinner.id = 'spinner-loader';
    spinner.innerHTML = `
        <style>
            #spinner-loader { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: #fff; z-index: 9999; display: flex; align-items: center; justify-content: center; }
            .spinner { width: 40px; height: 40px; border: 4px solid rgba(0, 0, 0, 0.1); border-top: 4px solid #3498db; border-radius: 50%; animation: spin 1s linear infinite; }
            @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        </style>
        <div class="spinner"></div>
    `;
    document.body.prepend(spinner);
};

let removeSpinner = () => {
    let spinner = document.getElementById('spinner-loader');
    if (spinner) {
        spinner.style.transition = 'opacity 0.5s ease';
        spinner.style.opacity = '0';
        setTimeout(() => spinner.remove(), 500);
    }
};

let main = async () => {
  
    checkAuth();
    createSpinner();
    renderHeadContent();
    setUserCode();
    let scriptFiles = [
        './assets/js/sticky-header.js',
        './assets/js/bootstrap.bundle.min.js',
        './assets/js/template-setting.js',
    ];

    try {
        await Promise.all(scriptFiles.map(loadScript));
        init_iconsax();
        initRatioJS();
        handleServiceWorker();
        removeSpinner();
    } catch (error) {
        console.error("Kesalahan saat memuat skrip:", error);
        removeSpinner();
        alert("Terjadi kesalahan saat memuat halaman. Silakan coba lagi.");
    }
};

window.onload = main;
