document.addEventListener("DOMContentLoaded", function() {
    
    // 1. CSS STİLLERİ (MEVCUT TASARIM + İLETİŞİM İÇİN UFAK EKLEMELER)
    const style = document.createElement('style');
    style.innerHTML = `
        /* --- FONTS & VARS --- */
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=Manrope:wght@200;300;400;500&display=swap');

        :root {
            --footer-bg: #010101;
            --footer-glass: rgba(255, 255, 255, 0.03);
            --gold-primary: #D4AF37;
            --gold-gradient: linear-gradient(45deg, #bf953f, #fcf6ba, #b38728, #fbf5b7);
            --ease-smooth: cubic-bezier(0.23, 1, 0.32, 1);
        }

        /* --- ANA GÖVDE --- */
        #mainFooter {
            background-color: var(--footer-bg);
            border-top: 1px solid rgba(212, 175, 55, 0.15);
            padding: 90px 0 40px 0;
            font-family: 'Manrope', sans-serif;
            position: relative;
            overflow: hidden;
        }

        /* Ambient Glow */
        #mainFooter::before {
            content: '';
            position: absolute;
            top: 0; left: 50%; transform: translateX(-50%); width: 60%; height: 1px;
            background: radial-gradient(circle, rgba(212, 175, 55, 0.6) 0%, transparent 100%);
            box-shadow: 0 0 30px rgba(212, 175, 55, 0.2);
        }

        /* --- TİPOGRAFİ --- */
        .footer-logo {
            font-family: 'Cinzel', serif; font-size: 2.4rem; font-weight: 700; letter-spacing: 0.15em;
            color: transparent; background: var(--gold-gradient); background-size: 200% auto;
            -webkit-background-clip: text; display: inline-block; margin-bottom: 20px;
            animation: shineFooter 6s linear infinite;
        }
        @keyframes shineFooter { to { background-position: 200% center; } }

        .footer-desc { color: #999; font-size: 0.85rem; line-height: 1.8; font-weight: 300; max-width: 300px; }

        .footer-title {
            color: #fff; font-family: 'Cinzel', serif; font-size: 1.1rem; margin-bottom: 30px;
            letter-spacing: 1px; position: relative; display: inline-block;
        }
        .footer-title::after {
            content: ''; position: absolute; bottom: -8px; left: 0; width: 30px; height: 1px; background: var(--gold-primary);
        }

        /* --- LİNKLER --- */
        .footer-nav { padding: 0; list-style: none; margin: 0; }
        .footer-nav li { margin-bottom: 12px; }
        
        .footer-link {
            color: #888; text-decoration: none; font-size: 0.9rem; font-weight: 300;
            transition: all 0.4s var(--ease-smooth); position: relative; display: inline-flex; align-items: center;
        }
        .footer-link::before {
            content: '→'; position: absolute; left: -15px; opacity: 0; color: var(--gold-primary);
            transition: all 0.3s var(--ease-smooth); transform: translateX(-5px);
        }
        .footer-link:hover { color: #fff; transform: translateX(15px); text-shadow: 0 0 10px rgba(255,255,255,0.3); }
        .footer-link:hover::before { opacity: 1; transform: translateX(0); }

        /* --- BÜLTEN & SOSYAL --- */
        .newsletter-wrapper {
            position: relative; margin-top: 15px; background: var(--footer-glass);
            border: 1px solid rgba(255,255,255,0.08); border-radius: 4px; padding: 5px;
            display: flex; align-items: center; transition: 0.3s;
        }
        .newsletter-wrapper:focus-within { border-color: var(--gold-primary); box-shadow: 0 0 15px rgba(212, 175, 55, 0.15); }

        .newsletter-input {
            width: 100%; background: transparent; border: none; color: #fff;
            padding: 12px 15px; font-size: 0.85rem; outline: none; font-family: 'Manrope', sans-serif;
        }
        .newsletter-btn {
            background: var(--gold-primary); border: none; color: #000; width: 40px; height: 40px;
            border-radius: 2px; cursor: pointer; transition: 0.3s; display: flex; align-items: center; justify-content: center;
        }
        .newsletter-btn:hover { background: #fff; transform: scale(1.05); }

        .social-bar { display: flex; gap: 15px; margin-top: 35px; }
        .social-item {
            width: 40px; height: 40px; border: 1px solid rgba(255,255,255,0.1); border-radius: 50%;
            display: flex; align-items: center; justify-content: center; color: #888;
            transition: all 0.4s var(--ease-smooth); cursor: pointer;
        }
        .social-item:hover {
            border-color: var(--gold-primary); background: var(--gold-primary); color: #000;
            transform: translateY(-5px); box-shadow: 0 5px 15px rgba(212, 175, 55, 0.3);
        }

        /* --- İLETİŞİM BİLGİLERİ (YENİ EKLENDİ) --- */
        .contact-info-item {
            display: flex; align-items: flex-start; gap: 15px; margin-top: 20px;
        }
        .contact-icon { color: var(--gold-primary); min-width: 20px; margin-top: 2px; }
        .contact-text { color: #888; font-size: 0.85rem; line-height: 1.5; font-weight: 300; transition: 0.3s; }
        a.contact-text:hover { color: #fff; }

        /* --- COPYRIGHT --- */
        .copyright-bar {
            margin-top: 80px; padding-top: 30px; border-top: 1px solid rgba(255,255,255,0.04);
            display: flex; justify-content: space-between; align-items: center;
            font-size: 0.75rem; color: #555; font-weight: 300;
        }

        /* --- TOAST --- */
        .saaturn-toast {
            position: fixed; top: 100px; right: 30px;
            background: rgba(10, 10, 12, 0.95); border: 1px solid rgba(255,255,255,0.05);
            border-left: 3px solid var(--gold-primary); padding: 20px 25px;
            border-radius: 4px; box-shadow: 0 20px 50px rgba(0,0,0,0.8); z-index: 10000;
            display: flex; align-items: center; gap: 15px; min-width: 320px;
            backdrop-filter: blur(10px); transform: translateX(150%) skewX(-10deg);
            opacity: 0; transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .saaturn-toast.show { transform: translateX(0) skewX(0); opacity: 1; }
        .toast-content { display: flex; flex-direction: column; }
        .toast-title { font-size: 0.75rem; color: #666; text-transform: uppercase; margin-bottom: 2px; }
        .toast-msg { font-size: 0.9rem; color: #fff; font-family: 'Manrope', sans-serif; }

        @media (max-width: 768px) {
            #mainFooter { padding: 60px 0 30px 0; text-align: center; }
            .footer-title::after { left: 50%; transform: translateX(-50%); }
            .social-bar { justify-content: center; }
            .contact-info-item { justify-content: center; }
            .copyright-bar { flex-direction: column; gap: 15px; }
            .saaturn-toast { top: auto; bottom: 20px; right: 5%; width: 90%; }
        }
    `;
    document.head.appendChild(style);

    const year = new Date().getFullYear();

    // 2. HTML YAPISI
    const footerHTML = `
    <div class="container">
        <div class="row gy-5">
            
            <!-- 1. SÜTUN: MARKA & SOSYAL -->
            <div class="col-lg-4 col-md-12">
                <div class="brand-area">
                    <a href="index.html" class="footer-logo">SAATÜRN</a>
                    <p class="footer-desc">
                        Zamanı sadece ölçmeyin, onu yaşayın. Nesiller boyu sürecek bir mirasın, kusursuz İsviçre işçiliği ile buluştuğu nokta.
                    </p>
                </div>
                <div class="social-bar">
                    <a href="https://instagram.com/sadkgunay" target="_blank" class="social-item" title="Instagram">
                        <i data-feather="instagram" style="width:18px;"></i>
                    </a>
                    <a onclick="socialAlert('Twitter')" class="social-item" title="Twitter">
                        <i data-feather="twitter" style="width:18px;"></i>
                    </a>
                    <a onclick="socialAlert('LinkedIn')" class="social-item" title="LinkedIn">
                        <i data-feather="linkedin" style="width:18px;"></i>
                    </a>
                    <a onclick="socialAlert('Youtube')" class="social-item" title="Youtube">
                        <i data-feather="youtube" style="width:18px;"></i>
                    </a>
                </div>
            </div>

            <!-- 2. SÜTUN: KOLEKSİYON -->
            <div class="col-lg-2 col-md-6 col-6">
                <h5 class="footer-title">Koleksiyon</h5>
                <ul class="footer-nav">
                    <li><a href="urunler.html?cat=prestige" class="footer-link">Prestige Series</a></li>
                    <li><a href="urunler.html?cat=sport" class="footer-link">Ocean Master</a></li>
                    <li><a href="urunler.html?cat=classic" class="footer-link">Timeless Classic</a></li>
                    <li><a href="urunler.html?cat=limited" class="footer-link" style="color:#d4af37">Limited Edition</a></li>
                </ul>
            </div>

            <!-- 3. SÜTUN: KURUMSAL -->
            <div class="col-lg-2 col-md-6 col-6">
                <h5 class="footer-title">Kurumsal</h5>
                <ul class="footer-nav">
                    <li><a href="hakkimizda.html" class="footer-link">Hakkımızda</a></li>
                    <li><a href="magazalar.html" class="footer-link">Mağazalarımız</a></li>
                    <li><a href="gizlilik-politikasi.html" class="footer-link">Gizlilik Politikası</a></li>
                </ul>
            </div>

            <!-- 4. SÜTUN: BÜLTEN & İLETİŞİM (GÜNCELLENDİ) -->
            <div class="col-lg-4 col-md-12">
                <h5 class="footer-title">Kampanyalarımızdan haberdar olun</h5>
                
                <!-- Bülten Formu -->
                <form id="newsletterForm" class="mb-4">
                    <div class="newsletter-wrapper">
                        <input type="email" id="newsletterEmail" class="newsletter-input" placeholder="E-Posta Adresiniz" required>
                        <button type="submit" class="newsletter-btn">
                            <i data-feather="arrow-right" style="width:18px;"></i>
                        </button>
                    </div>
                </form>

                <!-- Açık Adres -->
                <div class="contact-info-item">
                    <i data-feather="map-pin" class="contact-icon"></i>
                    <span class="contact-text">
                        Kocaeli Üniversitesi Teknoloji Fakültesi<br>Ofis 1036, İzmit/Kocaeli
                    </span>
                </div>

                <!-- Telefon -->
                <div class="contact-info-item">
                    <i data-feather="phone" class="contact-icon"></i>
                    <a href="tel:02623031000" class="contact-text text-decoration-none">
                        0 (262) 303 10 00
                    </a>
                </div>
            </div>

        </div>

        <!-- COPYRIGHT & TASARIMCI -->
        <div class="copyright-bar">
            <div>&copy; ${year} SAATÜRN Timepieces. Tüm hakları saklıdır.</div>
            <div class="d-md-block">
                Tasarım: <span style="color:var(--gold-primary); font-weight:500;">Sadık Günay</span>
            </div>
        </div>
    </div>
    
    <!-- BİLDİRİM KUTUSU -->
    <div id="customToast" class="saaturn-toast">
        <div style="color:#D4AF37;">
            <i data-feather="check-circle" style="width: 28px; height: 28px;"></i>
        </div>
        <div class="toast-content">
            <span class="toast-title" id="toastTitle">Bildirim</span>
            <span class="toast-msg" id="toastMessage">İşlem Başarılı</span>
        </div>
    </div>
    `;

    const footerElement = document.getElementById("mainFooter");
    if (footerElement) {
        footerElement.innerHTML = footerHTML;
        if (typeof feather !== 'undefined') feather.replace();

        // Bülten İşlevselliği
        document.getElementById('newsletterForm').addEventListener('submit', function(e) {
            e.preventDefault(); 
            const emailInput = document.getElementById('newsletterEmail');
            const email = emailInput.value;
            const aboneler = JSON.parse(localStorage.getItem('saaturnAboneler')) || [];
            
            if(aboneler.find(a => a.email === email)) {
                showToast("Bu e-posta zaten listemizde!", "warning");
            } else {
                aboneler.push({ email: email, tarih: new Date().toLocaleDateString('tr-TR') });
                localStorage.setItem('saaturnAboneler', JSON.stringify(aboneler));
                showToast("Aramıza hoş geldiniz! Kayıt başarılı.", "success");
                emailInput.value = ""; 
            }
        });
    }
});

// Toast Fonksiyonu
function showToast(message, type = "success") {
    const toast = document.getElementById('customToast');
    const msgSpan = document.getElementById('toastMessage');
    const titleSpan = document.getElementById('toastTitle');
    const iconContainer = toast.querySelector('div:first-child');
    
    msgSpan.innerText = message;
    
    if(type === "warning") {
        toast.style.borderLeftColor = "#ff4444";
        iconContainer.style.color = "#ff4444";
        titleSpan.innerText = "UYARI";
        iconContainer.innerHTML = feather.icons['alert-circle'].toSvg();
    } else {
        toast.style.borderLeftColor = "#D4AF37";
        iconContainer.style.color = "#D4AF37";
        titleSpan.innerText = "BAŞARILI";
        iconContainer.innerHTML = feather.icons['check-circle'].toSvg();
    }

    toast.classList.add('show');
    setTimeout(() => { toast.classList.remove('show'); }, 4000);
}

function socialAlert(platform) {
    showToast(platform + " sayfamız hazırlanıyor.", "warning");
}