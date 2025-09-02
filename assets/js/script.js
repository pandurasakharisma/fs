let urlbe = "https://rightly-composed-marlin.ngrok-free.app/";

// ---------- AUTH & USER CODE ----------
let setUserCode = () => {
    let data = localStorage.getItem('user_data'),
        obj = data ? JSON.parse(data) : null,
        cardId = obj && obj.Card_ID ? String(obj.Card_ID) : '',
        code = cardId.includes(',') ? cardId.split(',')[0].trim() : cardId,
        el = document.getElementById('usercode');

    if (el) {
        el.value = code;
        el.setAttribute('value', code);
    } else {
        el = Object.assign(document.createElement('input'), {id:'usercode', className:'hide'});
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
    localStorage.removeItem("user_data");
    window.location.href = redirectUrl;
};

// ---------- HEAD & STYLING ----------
let renderHeadContent = () => {
    let head = document.head;
    let path = window.location.pathname.split("/").filter(Boolean);
    let pageTitle = path.length ? path[path.length - 1].replace(/-/g, " ").toUpperCase() : "FS CRM";
    document.title = pageTitle;

    let metaLinks = [
        { tag: "meta", attributes: { "http-equiv": "Content-Type", content: "text/html; charset=UTF-8" } },
        { tag: "meta", attributes: { "http-equiv": "X-UA-Compatible", content: "IE=edge" } },
        { tag: "meta", attributes: { name: "viewport", content: "width=device-width, initial-scale=1.0" } },
        { tag: "link", attributes: { rel: "stylesheet", type: "text/css", href: "./assets/css/vendors/iconsax.css" } },
        { tag: "link", attributes: { rel: "stylesheet", type: "text/css", href: "./assets/css/style.css" } },
    ];
    metaLinks.forEach(item => {
        let element = document.createElement(item.tag);
        for (let key in item.attributes) element.setAttribute(key, item.attributes[key]);
        head.appendChild(element);
    });
};

// ---------- LOAD SCRIPT ----------
let loadScript = (src) => new Promise((resolve, reject) => {
    let script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve(src);
    script.onerror = () => reject(new Error(`Gagal memuat script: ${src}`));
    document.body.appendChild(script);
});

// ---------- ICONSAX ----------
let init_iconsax = () => {
    document.querySelectorAll(".iconsax").forEach(iconsax => {
        let TuT = iconsax.getAttribute("data-icon").toLowerCase().trim();
        fetch("https://glenthemes.github.io/iconsax/icons/" + TuT + ".svg")
            .then(res => res.text())
            .then(svg => iconsax.innerHTML = svg)
            .catch(error => console.error(`Gagal memuat ikon: ${TuT}`, error));
    });
};

// ---------- RATIO JS ----------
let initRatioJS = () => {
    document.querySelectorAll(".bg-img").forEach(bgImgEl => {
        if(bgImgEl.classList.contains("blur-up")) bgImgEl.parentNode.classList.add("blur-up", "lazyload");
        if(bgImgEl.classList.contains("bg_size_content")) bgImgEl.parentNode.classList.add("b_size_content");
        bgImgEl.parentNode.classList.add("bg-size");
        let bgSrc = bgImgEl.src;
        bgImgEl.style.display = "none";
        bgImgEl.parentNode.style.cssText += `background-image: url(${bgSrc}); background-size:cover; background-position: center; background-repeat: no-repeat; display:block;`;
    });
};

// ---------- SERVICE WORKER ----------
let handleServiceWorker = () => {
    if ("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js");
};

// ---------- SPINNER ----------
let createSpinner = () => {
    let spinner = document.createElement('div');
    spinner.id = 'spinner-loader';
    spinner.innerHTML = `
        <style>
            #spinner-loader {position:fixed;top:0;left:0;width:100%;height:100%;background:#fff;z-index:9999;display:flex;align-items:center;justify-content:center;}
            .spinner {width:40px;height:40px;border:4px solid rgba(0,0,0,0.1);border-top:4px solid #3498db;border-radius:50%;animation:spin 1s linear infinite;}
            @keyframes spin {0%{transform:rotate(0deg);}100%{transform:rotate(360deg);}}
        </style>
        <div class="spinner"></div>
    `;
    document.body.prepend(spinner);
};

let removeSpinner = () => {
    let spinner = document.getElementById('spinner-loader');
    if(spinner){spinner.style.opacity='0'; setTimeout(()=>spinner.remove(),500);}
};

// ---------- SKELETON LOADER ----------
let showSkeleton = (container, count=6) => {
    container.innerHTML = '';
    for(let i=0;i<count;i++){
        let li = document.createElement('li');
        li.className = 'recent-place-item skeleton';
        li.innerHTML = `<div class="skeleton-card"><div class="skeleton-line title"></div><div class="skeleton-line address"></div></div>`;
        container.appendChild(li);
    }
};

let removeSkeleton = (container) => {
    container.querySelectorAll('.skeleton').forEach(el => el.remove());
};

// ---------- FETCH DATA DENGAN SKELETON ----------
let fetchAndRenderStores = async (container, url, payload, renderFn) => {
    showSkeleton(container, 6);
    try {
        const res = await fetch(url, {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(payload)});
        const data = await res.json();
        removeSkeleton(container);
        if(res.ok && data.status==='success' && data.data?.length>0){
            renderFn(data.data);
        }else{
            container.innerHTML = '<li class="notfound">Data tidak ditemukan</li>';
        }
    }catch(e){
        console.error(e);
        removeSkeleton(container);
        container.innerHTML = '<li class="notfound">Terjadi kesalahan memuat data</li>';
    }
};

// ---------- MAIN ----------
let main = async () => {
    checkAuth();
    createSpinner();
    renderHeadContent();

    let scripts = ['./assets/js/sticky-header.js','./assets/js/bootstrap.bundle.min.js','./assets/js/template-setting.js'];
    try {
        await Promise.all(scripts.map(loadScript));
        init_iconsax();
        initRatioJS();
        handleServiceWorker();
    } catch(err){
        console.error("Gagal load script:",err);
    } finally {
        removeSpinner();
    }
};

window.onload = main;
