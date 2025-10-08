let urlbe = "https://rightly-composed-marlin.ngrok-free.app/",
urlbe2 = "https://app2.pkserve.com/fs/";


window.hrefs = (url = null) =>  {
    removeSpinner();
    window.location.hash = url ?? 'home';
}
window.setUserCode = () => {
    let data = localStorage.getItem('user_data'),
        obj = data ? JSON.parse(data) : null,
        cardId = obj && obj.Card_ID ? String(obj.Card_ID) : '',
        code = cardId.includes(',') ? cardId.split(',')[0].trim() : cardId,
        el = document.getElementById('usercode')

    if (el) {
        el.value = code
        el.setAttribute('value', code)
    } else {
        el = Object.assign(document.createElement('input'), {id:'usercode', className:'hide'})
        el.value = code
        el.setAttribute('value', code)
        document.body.appendChild(el)
    }
}

let init_iconsax = () => {
    document.querySelectorAll(".iconsax").forEach(iconsax => {
        let TuT = iconsax.getAttribute("data-icon").toLowerCase().trim();
        fetch("https://pandurasakharisma.github.io/icon/icons/" + TuT + ".svg")
            .then(res => res.text())
            .then(svg => iconsax.innerHTML = svg)
            .catch(error => console.error(`Gagal memuat ikon: ${TuT}`, error));
    });
};

let getAuthToken = () => localStorage.getItem("user_token")

let checkAuth = () => {
    let userToken = getAuthToken(),
        currentUrl = window.location.href.toLowerCase()
    if (!userToken && !currentUrl.includes("login")) window.location.hash = 'login'
    setUserCode()
}



let loadScript = src => new Promise((resolve, reject) => {
    let script = document.createElement('script')
    script.src = src
    script.onload = () => resolve(src)
    script.onerror = () => reject(new Error(`Gagal memuat script: ${src}`))
    document.body.appendChild(script)
})


let initRatioJS = () => {
    document.querySelectorAll(".bg-img").forEach(bgImgEl => {
        let parentNode = bgImgEl.parentNode
        bgImgEl.classList.contains("bg-top") ? parentNode.classList.add("b-top") :
        bgImgEl.classList.contains("bg-bottom") ? parentNode.classList.add("b-bottom") :
        bgImgEl.classList.contains("bg-center") ? parentNode.classList.add("b-center") :
        bgImgEl.classList.contains("bg-left") ? parentNode.classList.add("b-left") :
        bgImgEl.classList.contains("bg-right") ? parentNode.classList.add("b-right") : null

        if (bgImgEl.classList.contains("blur-up")) parentNode.classList.add("blur-up", "lazyload")
        if (bgImgEl.classList.contains("bg_size_content")) parentNode.classList.add("b_size_content")

        parentNode.classList.add("bg-size")
        let bgSrc = bgImgEl.src
        bgImgEl.style.display = "none"
        parentNode.style.cssText += `background-image: url(${bgSrc}); background-size:cover; background-position: center; background-repeat: no-repeat; display:block;`
    })
}

let handleServiceWorker = () => {
    if ("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js")
}

let showToast = (message, type = 'success') => {
    let container = document.getElementById('toast-container')
    if (!container) {
        container = document.createElement('div')
        container.id = 'toast-container'
        document.body.appendChild(container)
    }

    type = (type == 'error') ? 'danger' : type;
    let toast = document.createElement('div')
    toast.className = `toast align-items-center text-white bg-${type} border-0`
    toast.role = "alert"
    toast.style.transition = 'opacity 0.5s ease'
    toast.style.opacity = '0'
    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body" style="padding: 5px;font-size: 11px;text-transform: uppercase;">${message}</div>
        </div>
    `
    container.appendChild(toast)
    setTimeout(() => { toast.classList.add('show'); toast.style.opacity = '1' }, 100)
    setTimeout(() => {
        toast.style.opacity = '0'
        toast.classList.remove('show')
        setTimeout(() => { toast.parentNode && container.removeChild(toast) }, 500)
    }, 3000)
}

let showSkeleton = (container, count = 6) => {
    for (let i = 0; i < count; i++) {
        let li = document.createElement('li');
        li.className = 'recent-place-item skeleton d-flex';
        li.innerHTML = `
            <div class="skellr"></div>
            <div class="skeleton-card">
                <div class="skeleton-line" width="85%"></div>
                <div class="skeleton-line" width="100%"></div>
            </div>
        `;
        container.appendChild(li);
    }
};

let removeSkeleton = (container) => {
    container.querySelectorAll('.skeleton').forEach(el => el.remove());
};


let formatDateIndo = dateStr => {
    if (!dateStr) return ''
    let bulan = [
        'Januari','Februari','Maret','April','Mei','Juni',
        'Juli','Agustus','September','Oktober','November','Desember'
    ]
    let [y, m, d] = dateStr.split('-')
    return `${parseInt(d)} ${bulan[parseInt(m)-1]} ${y}`
}

let formatTime = timeStr => {
    if (!timeStr) return ''
    let parts = timeStr.split(':')
    return parts.length >= 2 ? `${parts[0]}:${parts[1]}${parts[2] ? ':'+parts[2] : ''}` : timeStr
}


const getHariMon1 = (d) => ((d.getDay() + 6) % 7) + 1;
const getMingguKe = (d) => {
    const first = new Date(d.getFullYear(), d.getMonth(), 1);
    const firstDowMon1 = getHariMon1(first);
    const offset = firstDowMon1 - 1;
    return Math.floor((offset + d.getDate() - 1) / 7) + 1;
};

let getMingguHari = (date = new Date()) => {
    let tanggal = date.getDate();
    let hari = date.getDay();
    hari = hari === 0 ? 7 : hari;
    let minggu = Math.ceil(tanggal / 7);
    tanggal = String(date.getDate()).padStart(2, '0');
    let tanggalBulan = date.getDate();
    let tahun = date.getFullYear();
    let bulan = String(date.getMonth() + 1).padStart(2, '0'),
    tanggalx = String(tanggalBulan).padStart(2, '0');
    tanggal = `${tahun}-${bulan}-${tanggalx}`;
    return { minggu, hari, tanggal};
};


const fmtDateTime = (d) => {
    const pad = (n) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
};



let createSpinner = () => {
    let spinner = document.createElement('div')
    spinner.id = 'spinner-loader'
    spinner.innerHTML = `
        <style>
            #spinner-loader {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: #fff;
                z-index: 9999;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .spinner {
                width: 40px;
                height: 40px;
                border: 4px solid rgba(197, 63, 63, 0.2);
                border-top: 4px solid #c53f3f;
                border-radius: 50%;
                animation: spin 1s linear infinite;
            }
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        </style>
        <div class="spinner"></div>
    `
    document.body.prepend(spinner)
}

let removeSpinner = () => {
    let spinner = document.getElementById('spinner-loader')
    if (spinner) { spinner.style.opacity = '0'; setTimeout(() => spinner.remove(), 500) }
}

let renderHeadContent = () => {
    let head = document.head,
        metaLinks = [
            { tag: "meta", attributes: { "http-equiv": "Content-Type", content: "text/html; charset=UTF-8" } },
            { tag: "meta", attributes: { "http-equiv": "X-UA-Compatible", content: "IE=edge" } },
            { tag: "meta", attributes: { name: "viewport", content: "width=device-width, initial-scale=1.0" } },
            { tag: "meta", attributes: { name: "description", content: "FS-CRM" } },
            { tag: "meta", attributes: { name: "keywords", content: "FS-CRM" } },
            { tag: "meta", attributes: { name: "author", content: "FS-CRM" } },
            { tag: "link", attributes: { rel: "manifest", href: "manifest.json" } },
            { tag: "link", attributes: { rel: "icon", href: "./assets/images/logopk.png", type: "image/x-icon" } },
            { tag: "link", attributes: { rel: "apple-touch-icon", href: "./assets/images/logo/favicon.png" } },
            { tag: "link", attributes: { rel: "stylesheet", type: "text/css", href: "./assets/css/vendors/iconsax.css" } },
            { tag: "link", attributes: { rel: "stylesheet", type: "text/css", href: "./assets/css/GTWalsheimPro.css" } },
            { tag: "link", attributes: { rel: "stylesheet", type: "text/css", href: "./assets/css/vendors/bootstrap.css" } },
            { tag: "link", attributes: { rel: "stylesheet", type: "text/css", href: "./assets/css/style.css" } },
        ]
    metaLinks.forEach(item => {
        let element = document.createElement(item.tag)
        for (let key in item.attributes) element.setAttribute(key, item.attributes[key])
        head.appendChild(element)
    })
}

let router = async () => {
    checkAuth();
    let hash = window.location.hash.slice(1).trim();
    if (!hash) hash = 'home';
    let [pageName, queryString] = hash.split('?');
    pageName = pageName || 'home';
    let cleanPage = pageName.replace(/^\//, '').toLowerCase();
    if (cleanPage === '' || cleanPage === '#' || cleanPage === 'fs') {
        cleanPage = 'home';
    }
    let pageJs = `./pages/${cleanPage}.js`;
    try {
        let module = await import(pageJs);
        removeSpinner();
        if (module.default && typeof module.default === 'function') {
            await module.default(queryString || '');
        } else {
            document.getElementById('app').innerHTML = `<h2>Halaman ${cleanPage} tidak memiliki default export</h2>`;
        }
        init_iconsax();
    } catch (err) {
        removeSpinner();
        console.error('Routing error:', err);
        document.getElementById('app').innerHTML = `
            <img class="e4042" src="./assets/images/e404.svg" alt="Not Found">
            <div class="sesatf">
                <a class="btn btnb pulse" onclick="hrefs()">Kembali Ke Halaman Utama</a>
            </div>
        `;
    } finally {
        removeSpinner();
    }
};


window.keluar = () => {
    let modalEl = document.getElementById('logout');

    if (!modalEl) {
        const modalHtml = `
            <div class="modal delete-modal fade" id="logout" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-body">
                            <img class="img-fluid icon mx-auto" src="./assets/images/svg/logout.svg" alt="alert">
                            <h4>Come Back Soon</h4>
                            <p>Are you sure You want to Logout?</p>
                        </div>
                        <div class="modal-footer">
                            <a class="btn gray-btn w-50 m-0" id="close-logoutbtn" data-bs-dismiss="modal">Stay, logged in</a>
                            <a onclick="logout()" class="btn theme-btn w-50 m-0">Yes, Logout </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHtml);
        modalEl = document.getElementById('logout');
    }

    let modalInstance = new bootstrap.Modal(modalEl);
    modalInstance.show();
};


let logout = (url = null) => {
    let logoutdiv = document.querySelector("#close-logoutbtn");
    if(logoutdiv){ logoutdiv.click();}
    localStorage.removeItem("user_token")
    localStorage.removeItem("user_data")
    localStorage.removeItem("user_absen")
    showToast('Kamu Berhasil Logout', 'success');
    window.location.hash = 'login'
}

let backbtn = document.getElementById("backbtn");
if (backbtn) { backbtn.onclick=() => window.history.back();}


window.onload = async () => {
    renderHeadContent()
    await main()
    router()
}

window.onhashchange = router
let main = async () => {
    checkAuth()
    createSpinner()
    let scripts = [
        './assets/js/bootstrap.bundle.min.js',
        './assets/js/template-setting.js'
    ]

    try {
        await Promise.all(scripts.map(loadScript))
        initRatioJS()
        handleServiceWorker()
    } catch(err){
        console.error("Gagal load script:",err)
    } finally {
        removeSpinner()
    }
}
