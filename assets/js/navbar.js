document.addEventListener("DOMContentLoaded", function() {

    // --- AYARLAR ---
    const logoPath = "assets/img/gallery/saatlogo.png"; 

    // 1. STİL (MEVCUT GÜZEL ÇALIŞAN STİLİN - DOKUNMADIM)
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        /* --- FONTS & RESET --- */
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;800&family=Inter:wght@300;400;500;600&display=swap');

        :root {
            --bg-deep: #030305;
            --bg-glass: rgba(3, 3, 5, 0.90);
            --gold-primary: #D4AF37;
            --gold-light: #F9F1D0;
            --gold-dark: #AA8C2C;
            --text-main: #F0F0F0;
            --text-muted: #B0B0B0;
            --ease-lux: cubic-bezier(0.19, 1, 0.22, 1);
        }

        /* Scrollbar */
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: var(--bg-deep); }
        ::-webkit-scrollbar-thumb { background: var(--gold-dark); border-radius: 3px; }

        /* --- NAVBAR --- */
        .navbar-custom {
            background: linear-gradient(180deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 100%);
            padding: 20px 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0);
            transition: all 0.6s var(--ease-lux);
            animation: slideDownFade 1s var(--ease-lux) forwards;
        }

        @keyframes slideDownFade {
            0% { transform: translateY(-30px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
        }
        
        .navbar-custom.scrolled {
            background: var(--bg-glass);
            backdrop-filter: blur(18px) saturate(120%);
            -webkit-backdrop-filter: blur(18px);
            padding: 12px 0;
            border-bottom: 1px solid rgba(212, 175, 55, 0.15);
            box-shadow: 0 10px 40px rgba(0,0,0,0.9);
        }

        /* --- LOGO --- */
        .navbar-brand { display: flex; align-items: center; gap: 14px; padding: 5px; }
        .brand-logo-img { height: 48px; width: auto; transition: transform 0.6s var(--ease-lux), filter 0.6s ease; filter: drop-shadow(0 0 0 rgba(212,175,55,0)); }
        .navbar-brand:hover .brand-logo-img { transform: scale(1.08) rotate(-2deg); filter: drop-shadow(0 0 15px rgba(212, 175, 55, 0.4)); }
        .brand-font {
            font-family: 'Cinzel', serif; font-weight: 700; font-size: 1.5rem; letter-spacing: 0.2em; text-transform: uppercase;
            background: linear-gradient(135deg, #C5A028 0%, #F9F1D0 50%, #C5A028 100%); background-size: 200% auto;
            -webkit-background-clip: text; -webkit-text-fill-color: transparent; animation: metalShine 6s linear infinite;
        }
        @keyframes metalShine { to { background-position: 200% center; } }

        /* --- NAV LİNKLERİ --- */
        .navbar-custom .nav-link {
            color: var(--text-muted) !important; font-family: 'Inter', sans-serif; font-size: 0.8rem; font-weight: 500;
            letter-spacing: 1.5px; text-transform: uppercase; padding: 10px 18px; transition: all 0.4s var(--ease-lux); position: relative;
        }
        .navbar-custom .nav-link:hover, .navbar-custom .nav-link.active { color: var(--text-main) !important; letter-spacing: 2px; text-shadow: 0 0 15px rgba(255,255,255,0.3); }
        .navbar-custom .nav-link::before {
            content: ''; position: absolute; bottom: -2px; left: 50%; width: 20px; height: 1px; background: var(--gold-primary);
            box-shadow: 0 0 10px 1px var(--gold-primary); transform: translateX(-50%) scaleX(0); transition: transform 0.4s var(--ease-lux);
        }
        .navbar-custom .nav-link:hover::before, .navbar-custom .nav-link.active::before { transform: translateX(-50%) scaleX(1); }

        /* --- DROPDOWN MENÜ --- */
        .navbar-custom .dropdown-menu {
            background: #08080a; border: 1px solid rgba(255, 255, 255, 0.08); border-top: 2px solid var(--gold-primary);
            border-radius: 4px; padding: 10px 0; margin-top: 15px; box-shadow: 0 30px 70px rgba(0,0,0,1);
            display: block; visibility: hidden; opacity: 0; transform: translateY(15px); transition: all 0.3s var(--ease-lux);
        }
        .nav-item.dropdown:hover .dropdown-menu, .dropdown-menu.show { visibility: visible; opacity: 1; transform: translateY(0); }
        .navbar-custom .dropdown-item {
            color: #e2e8f0 !important; background-color: transparent !important; padding: 14px 25px;
            font-family: 'Inter', sans-serif; font-size: 0.82rem; letter-spacing: 0.5px; border-bottom: 1px solid rgba(255,255,255,0.03); transition: all 0.3s ease; position: relative;
        }
        .navbar-custom .dropdown-item:hover, .navbar-custom .dropdown-item:focus { color: var(--gold-primary) !important; background-color: rgba(255,255,255,0.04) !important; padding-left: 32px; }

        /* --- KULLANICI PİLİ --- */
        .user-pill {
            background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(212, 175, 55, 0.3) !important; color: var(--gold-primary) !important;
            padding: 8px 24px !important; border-radius: 50px; font-size: 0.75rem; letter-spacing: 1px; transition: all 0.4s var(--ease-lux); display: inline-flex; align-items: center;
        }
        .user-pill:hover, .user-pill[aria-expanded="true"] { background: var(--gold-primary); color: #000 !important; border-color: var(--gold-primary) !important; box-shadow: 0 0 25px rgba(212, 175, 55, 0.4); }

        /* --- MOBİL BUTON --- */
        .navbar-toggler { border: none; padding: 0; outline: none; }
        .navbar-toggler:focus { box-shadow: none; }
        .custom-burger { width: 28px; height: 20px; position: relative; cursor: pointer; }
        .custom-burger span { display: block; position: absolute; height: 2px; width: 100%; background: var(--gold-primary); border-radius: 9px; left: 0; transition: .25s ease-in-out; }
        .custom-burger span:nth-child(1) { top: 0px; } .custom-burger span:nth-child(2) { top: 9px; } .custom-burger span:nth-child(3) { top: 18px; }
        .navbar-toggler[aria-expanded="true"] .custom-burger span:nth-child(1) { top: 9px; transform: rotate(135deg); }
        .navbar-toggler[aria-expanded="true"] .custom-burger span:nth-child(2) { opacity: 0; left: -20px; }
        .navbar-toggler[aria-expanded="true"] .custom-burger span:nth-child(3) { top: 9px; transform: rotate(-135deg); }

        /* --- MOBİL DÜZEN --- */
        @media (max-width: 991px) {
            .navbar-collapse { background: var(--bg-deep); padding: 20px; border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; margin-top: 15px; }
            .navbar-custom .dropdown-menu { visibility: visible; opacity: 1; transform: none; display: none; background: transparent; border: none; box-shadow: none; padding-left: 15px; margin-top: 0; }
            .navbar-custom .dropdown-menu.show { display: block; }
            .navbar-custom .nav-link { padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.03); }
            .navbar-custom .nav-link::before { display: none; }
        }
    `;
    document.head.appendChild(styleSheet);


    // 2. KULLANICI KONTROLÜ (AYNI)
    const activeUser = JSON.parse(localStorage.getItem("saaturn_user"));
    let userAreaHTML = "";
    if (activeUser) {
        userAreaHTML = `
        <div class="dropdown">
            <a class="nav-link dropdown-toggle user-pill fw-bold" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i data-feather="user" style="width:14px; margin-right:8px; vertical-align: text-bottom;"></i>${activeUser.ad.toUpperCase()}
            </a>
            <ul class="dropdown-menu dropdown-menu-end">
                <li><a class="dropdown-item" href="siparislerim.html">SİPARİŞLERİM</a></li>
                <li><a class="dropdown-item" href="favoriler.html">FAVORİLERİM</a></li>
                <li><hr class="dropdown-divider" style="border-color:rgba(255,255,255,0.1)"></li>
                <li><a class="dropdown-item text-danger" href="#" onclick="clientLogout()">GÜVENLİ ÇIKIŞ</a></li>
            </ul>
        </div>`;
    } else {
        userAreaHTML = `<a class="nav-link login-icon-link" href="login.html" title="Giriş Yap / Kayıt Ol"><i data-feather="user" style="width: 24px; height: 24px;"></i></a>`;
    }


    // 3. HTML (GÜNCELLENEN KISIM: KURUMSAL DROPDOWN EKLENDİ)
    const navbarHTML = `
    <div class="container">
        <a class="navbar-brand" href="index.html">
            <img src="${logoPath}" alt="Saaturn Logo" class="brand-logo-img">
            <span class="brand-font">SAATÜRN</span>
        </a>
        
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navContent">
            <div class="custom-burger">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </button>

        <div class="collapse navbar-collapse" id="navContent">
            <ul class="navbar-nav ms-auto text-center align-items-center">
                <li class="nav-item"><a class="nav-link" href="index.html">ANASAYFA</a></li>
                
                <!-- GÜNCELLENEN KISIM: KURUMSAL DROPDOWN (İSTER GEREĞİ) -->
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">KURUMSAL</a>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="hakkimizda.html">HAKKIMIZDA</a></li>
                        <li><a class="dropdown-item" href="hakkimizda.html#birimler">BİRİMLERİMİZ</a></li>
                        <li><a class="dropdown-item" href="magazalar.html">MAĞAZALARIMIZ</a></li>
                        
                    </ul>
                </li>

                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">KOLEKSİYON</a>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="urunler.html?cat=all">TÜM MODELLER</a></li>
                        <li><a class="dropdown-item" href="urunler.html?cat=prestige">PRESTIGE SERİSİ</a></li>
                        <li><a class="dropdown-item" href="urunler.html?cat=sport">OCEAN SPORT</a></li>
                        <li><a class="dropdown-item" href="urunler.html?cat=classic">TIMELESS CLASSIC</a></li>
                        <li><a class="dropdown-item" href="urunler.html?cat=limited" style="color:var(--gold-primary) !important">LIMITED EDITION</a></li>
                    </ul>
                </li>
                
                <li class="nav-item"><a class="nav-link" href="duyurular.html">DUYURULAR</a></li>
                <li class="nav-item"><a class="nav-link" href="iletisim.html">İLETİŞİM</a></li>
                <li class="nav-item ms-lg-4 mt-3 mt-lg-0">${userAreaHTML}</li>
            </ul>
        </div>
    </div>
    `;

    // 4. BAŞLAT
    const navElement = document.getElementById("mainNav");
    if (navElement) {
        navElement.innerHTML = navbarHTML;
        navElement.className = "navbar navbar-expand-lg fixed-top navbar-custom"; 
        if (typeof feather !== 'undefined') feather.replace();
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) navElement.classList.add('scrolled');
            else navElement.classList.remove('scrolled');
        });
        highlightActiveLink(navElement);
    }
});

function highlightActiveLink(nav) { const path = window.location.pathname; const page = path.split("/").pop().split("?")[0]; const links = nav.querySelectorAll(".nav-link"); links.forEach(link => { const href = link.getAttribute("href"); if (href && href.split("?")[0] === page) { link.classList.add("active"); } }); }
function clientLogout() { if(confirm("Güvenli çıkış yapmak üzeresiniz. Onaylıyor musunuz?")) { localStorage.removeItem("saaturn_user"); window.location.href = "index.html"; } }