let urlbe = "https://rightly-composed-marlin.ngrok-free.app/"

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
        fetch("https://glenthemes.github.io/iconsax/icons/" + TuT + ".svg")
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


let logout = (url = null) => {
    localStorage.removeItem("user_token")
    localStorage.removeItem("user_data")
    localStorage.removeItem("user_absen")
    showToast('Kamu Berhasil Logout', 'success');
    window.location.hash = 'login'
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

let getMingguHari = () => {
    let now = new Date()
    let tanggal = now.getDate()
    let hari = now.getDay() 
    hari = hari === 0 ? 7 : hari 
    let minggu = Math.ceil(tanggal / 7) 
    return { minggu, hari }
}


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


/* ==========================================
   DYNAMIC ROUTER DENGAN DYNAMIC IMPORT
========================================== */
let router = async () => {
    checkAuth()
    let path = window.location.hash.replace('#', '') || 'home'
    let pageJs = `./pages/${path}.js`  

    try {
        let module = await import(pageJs)
        removeSpinner()
        if (module.default && typeof module.default === 'function') {
            await module.default() 
        } else {
            document.getElementById('app').innerHTML = `<h2>Halaman ${path} tidak memiliki default export</h2>`
        }
        
        init_iconsax()
    } catch (err) {
        removeSpinner()
        console.error('Routing error:', err)
        document.getElementById('app').innerHTML = `<img class="e4042" src="./assets/images/e404.svg" alt="Not Found"><div class="sesatf"><a class="btn btnb pulse" onclick="hrefs()">Kembali Ke Halaman Utama</a></div>`
    } finally {
        removeSpinner()
    }
}

/* ==========================================
   INIT
========================================== */
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
        './assets/js/sticky-header.js',
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
