/**
 * Advanced QR Code Generator - Main Application Logic
 * 100% Client-side, Modular, and Feature-Complete
 * Powered by qr-code-styling and Lucide Icons
 */

// Application State Store
const state = {
  // Data payload configuration
  dataType: 'url',
  payloads: {
    url: 'https://github.com',
    wifi: {
      ssid: 'MyHome_5G',
      password: 'SecurePassword123',
      encryption: 'WPA',
      hidden: false,
    },
    vcard: {
      firstName: 'محمد',
      lastName: 'أحمد',
      organization: 'شركة التقنية المتقدمة',
      title: 'مهندس برمجيات أول',
      phoneMobile: '+966511111111',
      phoneWork: '+966500000000',
      email: 'mohammed@example.com',
      url: 'https://example.com',
      address: 'الرياض، المملكة العربية السعودية',
      note: 'مطور واجهات أمامية ومصمم تجارب مستخدم',
    },
    text: 'مرحباً بك! هذا رمز استجابة سريعة احترافي ومخصص.',
    email: {
      to: 'contact@example.com',
      subject: 'استفسار عن الخدمات',
      body: 'السلام عليكم ورحمة الله، أود الاستفسار بخصوص...',
    },
    sms: {
      phone: '+966500000000',
      message: 'مرحباً، أرجو التواصل معي بخصوص...',
    },
    phone: '+966500000000',
    location: {
      lat: '24.7136',
      lng: '46.6753',
    },
  },

  // Visual Customization
  dots: {
    type: 'rounded',
    useGradient: false,
    color: '#1e40af',
    gradient: {
      type: 'linear',
      color1: '#1e40af',
      color2: '#3b82f6',
      rotation: 45,
    },
  },

  corners: {
    squareType: 'extra-rounded',
    squareColor: '#1e3a8a',
    dotType: 'dot',
    dotColor: '#2563eb',
  },

  background: {
    color: '#ffffff',
    isTransparent: false,
    margin: 10,
  },

  logo: {
    image: null,
    size: 0.28,
    margin: 5,
    clearBackground: true,
  },

  qr: {
    errorCorrectionLevel: 'Q',
  },

  export: {
    format: 'png',
    resolution: 1024,
  },
};

// Global instance reference for QRCodeStyling
let qrCodeInstance = null;

// Preset Themes Definitions
const PRESET_THEMES = [
  {
    name: 'أزرق كلاسيكي احترافي',
    dotColor: '#1e40af',
    dotType: 'rounded',
    cornerSquareType: 'extra-rounded',
    cornerSquareColor: '#1e3a8a',
    cornerDotType: 'dot',
    cornerDotColor: '#2563eb',
    bgColor: '#ffffff',
    isTransparent: false,
  },
  {
    name: 'تدرج الغروب المتوهج',
    dotColor: '#e11d48',
    dotType: 'extra-rounded',
    gradient: {
      type: 'linear',
      color1: '#e11d48',
      color2: '#ea580c',
      rotation: 45,
    },
    cornerSquareType: 'extra-rounded',
    cornerSquareColor: '#be123c',
    cornerDotType: 'dot',
    cornerDotColor: '#ea580c',
    bgColor: '#ffffff',
    isTransparent: false,
  },
  {
    name: 'أخضر زمردي فاخر',
    dotColor: '#047857',
    dotType: 'dots',
    gradient: {
      type: 'linear',
      color1: '#047857',
      color2: '#0d9488',
      rotation: 90,
    },
    cornerSquareType: 'dot',
    cornerSquareColor: '#065f46',
    cornerDotType: 'dot',
    cornerDotColor: '#047857',
    bgColor: '#ffffff',
    isTransparent: false,
  },
  {
    name: 'الأرجواني الملكي',
    dotColor: '#7c3aed',
    dotType: 'classy-rounded',
    gradient: {
      type: 'linear',
      color1: '#7c3aed',
      color2: '#c026d3',
      rotation: 135,
    },
    cornerSquareType: 'extra-rounded',
    cornerSquareColor: '#6d28d9',
    cornerDotType: 'dot',
    cornerDotColor: '#9333ea',
    bgColor: '#ffffff',
    isTransparent: false,
  },
  {
    name: 'أسود مونو فاخر (Minimalist)',
    dotColor: '#0f172a',
    dotType: 'square',
    cornerSquareType: 'square',
    cornerSquareColor: '#000000',
    cornerDotType: 'square',
    cornerDotColor: '#000000',
    bgColor: '#ffffff',
    isTransparent: false,
  },
  {
    name: 'سيبراني داكن (Cyber Neon)',
    dotColor: '#06b6d4',
    dotType: 'classy',
    gradient: {
      type: 'linear',
      color1: '#06b6d4',
      color2: '#3b82f6',
      rotation: 45,
    },
    cornerSquareType: 'extra-rounded',
    cornerSquareColor: '#0891b2',
    cornerDotType: 'dot',
    cornerDotColor: '#06b6d4',
    bgColor: '#0f172a',
    isTransparent: false,
  },
];

/**
 * Formats the current data into standard QR payload string
 */
function getFormattedPayload() {
  switch (state.dataType) {
    case 'url': {
      const raw = state.payloads.url.trim();
      return raw.startsWith('http://') || raw.startsWith('https://') ? raw : `https://${raw}`;
    }
    case 'wifi': {
      const { ssid, password, encryption, hidden } = state.payloads.wifi;
      const enc = encryption === 'None' ? 'nopass' : encryption;
      return `WIFI:T:${enc};S:${ssid};P:${password};H:${hidden ? 'true' : 'false'};;`;
    }
    case 'vcard': {
      const v = state.payloads.vcard;
      return [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `N:${v.lastName};${v.firstName};;;`,
        `FN:${v.firstName} ${v.lastName}`.trim(),
        v.organization ? `ORG:${v.organization}` : '',
        v.title ? `TITLE:${v.title}` : '',
        v.phoneMobile ? `TEL;TYPE=CELL,VOICE:${v.phoneMobile}` : '',
        v.phoneWork ? `TEL;TYPE=WORK,VOICE:${v.phoneWork}` : '',
        v.email ? `EMAIL;TYPE=INTERNET,PREF:${v.email}` : '',
        v.url ? `URL:${v.url}` : '',
        v.address ? `ADR;TYPE=WORK:;;${v.address};;;;` : '',
        v.note ? `NOTE:${v.note}` : '',
        'END:VCARD',
      ]
        .filter(Boolean)
        .join('\n');
    }
    case 'text':
      return state.payloads.text || ' ';
    case 'email': {
      const { to, subject, body } = state.payloads.email;
      return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }
    case 'sms': {
      const { phone, message } = state.payloads.sms;
      return `SMSTO:${phone}:${message}`;
    }
    case 'phone':
      return `tel:${state.payloads.phone.trim()}`;
    case 'location': {
      const { lat, lng } = state.payloads.location;
      return `https://www.google.com/maps?q=${lat},${lng}`;
    }
    default:
      return 'https://github.com';
  }
}

/**
 * Builds the QRCodeStyling options object
 */
function buildQROptions(width = 300, height = 300) {
  const dotsOptions = {
    type: state.dots.type,
  };

  if (state.dots.useGradient) {
    dotsOptions.gradient = {
      type: state.dots.gradient.type,
      rotation: (state.dots.gradient.rotation * Math.PI) / 180,
      colorStops: [
        { offset: 0, color: state.dots.gradient.color1 },
        { offset: 1, color: state.dots.gradient.color2 },
      ],
    };
  } else {
    dotsOptions.color = state.dots.color;
  }

  const effectiveBg = state.background.isTransparent ? 'transparent' : state.background.color;
  const effectiveCorrection = state.logo.image && state.qr.errorCorrectionLevel === 'L' ? 'Q' : state.qr.errorCorrectionLevel;

  return {
    width,
    height,
    type: 'canvas',
    data: getFormattedPayload(),
    margin: state.background.margin,
    qrOptions: {
      typeNumber: 0,
      mode: 'Byte',
      errorCorrectionLevel: effectiveCorrection,
    },
    image: state.logo.image || undefined,
    imageOptions: {
      hideBackgroundDots: state.logo.clearBackground,
      imageSize: state.logo.size,
      margin: state.logo.margin,
      crossOrigin: 'anonymous',
    },
    dotsOptions,
    cornersSquareOptions: {
      type: state.corners.squareType,
      color: state.corners.squareColor,
    },
    cornersDotOptions: {
      type: state.corners.dotType,
      color: state.corners.dotColor,
    },
    backgroundOptions: {
      color: effectiveBg,
    },
  };
}

/**
 * Updates or re-initializes the QR Code canvas
 */
function renderQRCode() {
  const container = document.getElementById('qr-canvas-container');
  if (!container || typeof QRCodeStyling === 'undefined') return;

  const options = buildQROptions(300, 300);

  if (!qrCodeInstance) {
    qrCodeInstance = new QRCodeStyling(options);
    container.innerHTML = '';
    qrCodeInstance.append(container);
  } else {
    qrCodeInstance.update(options);
  }

  // Update preview wrapper checkerboard background
  const previewWrapper = document.getElementById('qr-preview-wrapper');
  if (previewWrapper) {
    if (state.background.isTransparent) {
      previewWrapper.className = 'p-6 rounded-3xl transition-all shadow-inner flex items-center justify-center relative bg-checkerboard-dark';
    } else {
      previewWrapper.className = 'p-6 rounded-3xl transition-all shadow-inner flex items-center justify-center relative bg-slate-900/80 border border-slate-700/60';
    }
  }

  // Update format metadata tag
  const typeBadge = document.getElementById('preview-type-badge');
  if (typeBadge) {
    typeBadge.textContent = state.dataType.toUpperCase();
  }
}

/**
 * Setup Event Listeners for Forms and Controls
 */
function setupEventListeners() {
  // Navigation Tabs (Content, Style, Logo, Presets)
  document.querySelectorAll('[data-main-tab]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const tab = btn.getAttribute('data-main-tab');
      document.querySelectorAll('[data-main-tab]').forEach((b) => {
        b.className = b === btn
          ? 'flex-1 min-w-[100px] flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
          : 'flex-1 min-w-[100px] flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all text-slate-400 hover:text-slate-200 hover:bg-slate-700/50';
      });

      document.querySelectorAll('[data-tab-content]').forEach((content) => {
        content.classList.toggle('hidden', content.getAttribute('data-tab-content') !== tab);
      });
    });
  });

  // Data Types Selector
  document.querySelectorAll('[data-datatype]').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.dataType = btn.getAttribute('data-datatype');

      document.querySelectorAll('[data-datatype]').forEach((b) => {
        const isCurrent = b === btn;
        b.className = isCurrent
          ? 'flex flex-col items-center justify-center gap-2 p-3 rounded-2xl border text-xs font-semibold transition-all bg-indigo-600/20 border-indigo-500 text-white shadow-sm ring-1 ring-indigo-500'
          : 'flex flex-col items-center justify-center gap-2 p-3 rounded-2xl border text-xs font-semibold transition-all bg-slate-900/40 border-slate-700/70 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60';
      });

      document.querySelectorAll('[data-form-panel]').forEach((panel) => {
        panel.classList.toggle('hidden', panel.getAttribute('data-form-panel') !== state.dataType);
      });

      renderQRCode();
    });
  });

  // Form Inputs: URL
  bindInput('url-input-field', (val) => {
    state.payloads.url = val;
  });

  // Form Inputs: Wi-Fi
  bindInput('wifi-ssid', (val) => {
    state.payloads.wifi.ssid = val;
  });
  bindInput('wifi-password', (val) => {
    state.payloads.wifi.password = val;
  });
  const wifiEnc = document.getElementById('wifi-encryption');
  if (wifiEnc) {
    wifiEnc.addEventListener('change', (e) => {
      state.payloads.wifi.encryption = e.target.value;
      const pwInput = document.getElementById('wifi-password');
      if (pwInput) pwInput.disabled = e.target.value === 'None';
      renderQRCode();
    });
  }
  const wifiHidden = document.getElementById('wifi-hidden-checkbox');
  if (wifiHidden) {
    wifiHidden.addEventListener('change', (e) => {
      state.payloads.wifi.hidden = e.target.checked;
      renderQRCode();
    });
  }

  // Form Inputs: vCard
  bindInput('vcard-fname', (val) => { state.payloads.vcard.firstName = val; });
  bindInput('vcard-lname', (val) => { state.payloads.vcard.lastName = val; });
  bindInput('vcard-org', (val) => { state.payloads.vcard.organization = val; });
  bindInput('vcard-title', (val) => { state.payloads.vcard.title = val; });
  bindInput('vcard-mobile', (val) => { state.payloads.vcard.phoneMobile = val; });
  bindInput('vcard-work-phone', (val) => { state.payloads.vcard.phoneWork = val; });
  bindInput('vcard-email', (val) => { state.payloads.vcard.email = val; });
  bindInput('vcard-website', (val) => { state.payloads.vcard.url = val; });
  bindInput('vcard-address', (val) => { state.payloads.vcard.address = val; });

  // Form Inputs: Plain Text
  bindInput('text-content-area', (val) => {
    state.payloads.text = val;
    const charCounter = document.getElementById('text-char-count');
    if (charCounter) charCounter.textContent = `${val.length} حرف`;
  });

  // Form Inputs: Email
  bindInput('email-to', (val) => { state.payloads.email.to = val; });
  bindInput('email-subject', (val) => { state.payloads.email.subject = val; });
  bindInput('email-body', (val) => { state.payloads.email.body = val; });

  // Form Inputs: SMS
  bindInput('sms-phone', (val) => { state.payloads.sms.phone = val; });
  bindInput('sms-msg', (val) => { state.payloads.sms.message = val; });

  // Form Inputs: Phone
  bindInput('phone-input', (val) => { state.payloads.phone = val; });

  // Form Inputs: Location
  bindInput('loc-lat', (val) => { state.payloads.location.lat = val; });
  bindInput('loc-lng', (val) => { state.payloads.location.lng = val; });

  const geoBtn = document.getElementById('get-geo-btn');
  if (geoBtn) {
    geoBtn.addEventListener('click', () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
          state.payloads.location.lat = pos.coords.latitude.toFixed(6);
          state.payloads.location.lng = pos.coords.longitude.toFixed(6);
          const latIn = document.getElementById('loc-lat');
          const lngIn = document.getElementById('loc-lng');
          if (latIn) latIn.value = state.payloads.location.lat;
          if (lngIn) lngIn.value = state.payloads.location.lng;
          renderQRCode();
        });
      }
    });
  }

  // Dots Style Buttons
  document.querySelectorAll('[data-dot-style]').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.dots.type = btn.getAttribute('data-dot-style');
      document.querySelectorAll('[data-dot-style]').forEach((b) => {
        b.className = b === btn
          ? 'p-2.5 rounded-xl border text-xs font-medium bg-indigo-600 border-indigo-500 text-white shadow'
          : 'p-2.5 rounded-xl border text-xs font-medium bg-slate-900/60 border-slate-700 text-slate-400 hover:text-white';
      });
      renderQRCode();
    });
  });

  // Color Mode Toggle (Single vs Gradient)
  const singleModeBtn = document.getElementById('btn-single-color');
  const gradModeBtn = document.getElementById('btn-gradient-color');
  const singleColorPanel = document.getElementById('single-color-panel');
  const gradientColorPanel = document.getElementById('gradient-color-panel');

  if (singleModeBtn && gradModeBtn) {
    singleModeBtn.addEventListener('click', () => {
      state.dots.useGradient = false;
      singleModeBtn.className = 'px-3 py-1 rounded-lg text-xs font-semibold bg-indigo-600 text-white';
      gradModeBtn.className = 'px-3 py-1 rounded-lg text-xs font-semibold bg-slate-800 text-slate-400';
      if (singleColorPanel) singleColorPanel.classList.remove('hidden');
      if (gradientColorPanel) gradientColorPanel.classList.add('hidden');
      renderQRCode();
    });

    gradModeBtn.addEventListener('click', () => {
      state.dots.useGradient = true;
      gradModeBtn.className = 'px-3 py-1 rounded-lg text-xs font-semibold bg-indigo-600 text-white';
      singleModeBtn.className = 'px-3 py-1 rounded-lg text-xs font-semibold bg-slate-800 text-slate-400';
      if (singleColorPanel) singleColorPanel.classList.add('hidden');
      if (gradientColorPanel) gradientColorPanel.classList.remove('hidden');
      renderQRCode();
    });
  }

  // Single Color Pickers
  bindColorInput('single-color-picker', 'single-color-hex', (c) => {
    state.dots.color = c;
  });

  // Swatches
  document.querySelectorAll('[data-swatch]').forEach((sw) => {
    sw.addEventListener('click', () => {
      const color = sw.getAttribute('data-swatch');
      state.dots.color = color;
      syncColorInputs('single-color-picker', 'single-color-hex', color);
      renderQRCode();
    });
  });

  // Gradient Pickers
  bindColorInput('grad-c1-picker', 'grad-c1-hex', (c) => {
    state.dots.gradient.color1 = c;
  });
  bindColorInput('grad-c2-picker', 'grad-c2-hex', (c) => {
    state.dots.gradient.color2 = c;
  });

  const gradTypeSelect = document.getElementById('gradient-type-select');
  if (gradTypeSelect) {
    gradTypeSelect.addEventListener('change', (e) => {
      state.dots.gradient.type = e.target.value;
      renderQRCode();
    });
  }

  const gradRot = document.getElementById('gradient-rotation-slider');
  if (gradRot) {
    gradRot.addEventListener('input', (e) => {
      state.dots.gradient.rotation = Number(e.target.value);
      const rotVal = document.getElementById('gradient-rotation-val');
      if (rotVal) rotVal.textContent = `${e.target.value}°`;
      renderQRCode();
    });
  }

  // Corners Square
  document.querySelectorAll('[data-cornersquare]').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.corners.squareType = btn.getAttribute('data-cornersquare');
      document.querySelectorAll('[data-cornersquare]').forEach((b) => {
        b.className = b === btn ? 'py-1.5 px-2 rounded-lg text-xs font-medium bg-indigo-600 text-white' : 'py-1.5 px-2 rounded-lg text-xs font-medium bg-slate-800 text-slate-400';
      });
      renderQRCode();
    });
  });
  bindColorInput('cornersquare-color-picker', 'cornersquare-color-hex', (c) => {
    state.corners.squareColor = c;
  });

  // Corners Dot
  document.querySelectorAll('[data-cornerdot]').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.corners.dotType = btn.getAttribute('data-cornerdot');
      document.querySelectorAll('[data-cornerdot]').forEach((b) => {
        b.className = b === btn ? 'py-1.5 px-2 rounded-lg text-xs font-medium bg-indigo-600 text-white' : 'py-1.5 px-2 rounded-lg text-xs font-medium bg-slate-800 text-slate-400';
      });
      renderQRCode();
    });
  });
  bindColorInput('cornerdot-color-picker', 'cornerdot-color-hex', (c) => {
    state.corners.dotColor = c;
  });

  // Background Customization
  const transparentToggle = document.getElementById('bg-transparent-toggle');
  const bgColorWrapper = document.getElementById('bg-color-wrapper');
  if (transparentToggle) {
    transparentToggle.addEventListener('change', (e) => {
      state.background.isTransparent = e.target.checked;
      if (bgColorWrapper) bgColorWrapper.classList.toggle('hidden', e.target.checked);
      renderQRCode();
    });
  }
  bindColorInput('bg-color-picker', 'bg-color-hex', (c) => {
    state.background.color = c;
  });

  const marginSlider = document.getElementById('quietzone-slider');
  if (marginSlider) {
    marginSlider.addEventListener('input', (e) => {
      state.background.margin = Number(e.target.value);
      const valText = document.getElementById('quietzone-val');
      if (valText) valText.textContent = `${e.target.value}px`;
      renderQRCode();
    });
  }

  // Error Correction Buttons
  document.querySelectorAll('[data-ecc]').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.qr.errorCorrectionLevel = btn.getAttribute('data-ecc');
      document.querySelectorAll('[data-ecc]').forEach((b) => {
        b.className = b === btn
          ? 'py-1.5 px-2 rounded-xl text-xs font-semibold transition bg-indigo-600 text-white shadow'
          : 'py-1.5 px-2 rounded-xl text-xs font-semibold transition bg-slate-900/60 text-slate-400 hover:text-white border border-slate-700/50';
      });
      const eccLabel = document.getElementById('ecc-current-label');
      if (eccLabel) {
        const percentages = { L: '7%', M: '15%', Q: '25%', H: '30%' };
        eccLabel.textContent = `${state.qr.errorCorrectionLevel} (${percentages[state.qr.errorCorrectionLevel]})`;
      }
      renderQRCode();
    });
  });

  // Logo Upload
  const logoFileInput = document.getElementById('logo-file-input');
  if (logoFileInput) {
    logoFileInput.addEventListener('change', (e) => {
      const file = e.target.files?.[0];
      if (file) {
        if (file.size > 5 * 1024 * 1024) {
          alert('حجم الصورة كبير جداً، يرجى اختيار صورة أقل من 5 ميجابايت.');
          return;
        }
        const reader = new FileReader();
        reader.onload = (ev) => {
          setLogo(ev.target.result);
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Preset Logos
  document.querySelectorAll('[data-preset-logo]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const iconUrl = btn.getAttribute('data-preset-logo');
      setLogo(iconUrl);
    });
  });

  // Remove Logo
  const removeLogoBtn = document.getElementById('remove-logo-btn');
  if (removeLogoBtn) {
    removeLogoBtn.addEventListener('click', () => {
      state.logo.image = null;
      const logoActiveCard = document.getElementById('logo-active-card');
      const logoSliders = document.getElementById('logo-sliders-container');
      if (logoActiveCard) logoActiveCard.classList.add('hidden');
      if (logoSliders) logoSliders.classList.add('hidden');
      renderQRCode();
    });
  }

  // Logo Sliders
  const logoSizeSlider = document.getElementById('logo-size-slider');
  if (logoSizeSlider) {
    logoSizeSlider.addEventListener('input', (e) => {
      state.logo.size = Number(e.target.value);
      const valText = document.getElementById('logo-size-val');
      if (valText) valText.textContent = `${Math.round(e.target.value * 100)}%`;
      renderQRCode();
    });
  }

  const logoMarginSlider = document.getElementById('logo-margin-slider');
  if (logoMarginSlider) {
    logoMarginSlider.addEventListener('input', (e) => {
      state.logo.margin = Number(e.target.value);
      const valText = document.getElementById('logo-margin-val');
      if (valText) valText.textContent = `${e.target.value}px`;
      renderQRCode();
    });
  }

  const logoClearBg = document.getElementById('logo-clear-bg-checkbox');
  if (logoClearBg) {
    logoClearBg.addEventListener('change', (e) => {
      state.logo.clearBackground = e.target.checked;
      renderQRCode();
    });
  }

  // Preset Themes
  const presetContainer = document.getElementById('preset-themes-list');
  if (presetContainer) {
    presetContainer.innerHTML = '';
    PRESET_THEMES.forEach((theme) => {
      const themeBtn = document.createElement('button');
      themeBtn.type = 'button';
      themeBtn.className = 'p-4 rounded-2xl bg-slate-900/60 hover:bg-slate-800/90 border border-slate-700/70 text-right flex items-center justify-between group transition';
      
      const gradStyle = theme.gradient
        ? `linear-gradient(${theme.gradient.rotation}deg, ${theme.gradient.color1}, ${theme.gradient.color2})`
        : theme.dotColor;

      themeBtn.innerHTML = `
        <div class="space-y-1">
          <span class="text-sm font-semibold text-white group-hover:text-indigo-400 transition">${theme.name}</span>
          <div class="flex items-center gap-1.5 text-[11px] text-slate-400">
            <span>النمط: ${theme.dotType}</span>
            <span>•</span>
            <span>${theme.gradient ? 'تدرج لوني' : 'لون موحد'}</span>
          </div>
        </div>
        <div class="w-9 h-9 rounded-xl border border-white/20 flex items-center justify-center p-1 shadow" style="background-color: ${theme.bgColor}">
          <div class="w-full h-full rounded-lg" style="background: ${gradStyle}"></div>
        </div>
      `;

      themeBtn.addEventListener('click', () => {
        applyPresetTheme(theme);
      });

      presetContainer.appendChild(themeBtn);
    });
  }

  // Export Settings
  const exportFmtSelect = document.getElementById('export-format-select');
  if (exportFmtSelect) {
    exportFmtSelect.addEventListener('change', (e) => {
      state.export.format = e.target.value;
      const dlBtnText = document.getElementById('download-btn-text');
      if (dlBtnText) dlBtnText.textContent = `تحميل رمز QR بصيغة ${e.target.value.toUpperCase()}`;
    });
  }

  const exportResSelect = document.getElementById('export-resolution-select');
  if (exportResSelect) {
    exportResSelect.addEventListener('change', (e) => {
      state.export.resolution = Number(e.target.value);
    });
  }

  // Download Trigger
  const mainDownloadBtn = document.getElementById('main-download-btn');
  if (mainDownloadBtn) {
    mainDownloadBtn.addEventListener('click', handleDownload);
  }

  // Copy to Clipboard
  const copyBtn = document.getElementById('copy-to-clipboard-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', handleCopyImage);
  }

  // Print QR
  const printBtn = document.getElementById('print-qr-btn');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // Reset Button
  const resetBtn = document.getElementById('reset-config-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', handleReset);
  }
}

/**
 * Helper to set logo and update UI
 */
function setLogo(src) {
  state.logo.image = src;
  const logoActiveCard = document.getElementById('logo-active-card');
  const logoSliders = document.getElementById('logo-sliders-container');
  const logoImgPreview = document.getElementById('logo-preview-thumb');

  if (logoActiveCard) logoActiveCard.classList.remove('hidden');
  if (logoSliders) logoSliders.classList.remove('hidden');
  if (logoImgPreview) logoImgPreview.src = src;

  // Auto boost error correction for reliable scanning
  state.qr.errorCorrectionLevel = 'H';
  document.querySelectorAll('[data-ecc]').forEach((b) => {
    b.className = b.getAttribute('data-ecc') === 'H'
      ? 'py-1.5 px-2 rounded-xl text-xs font-semibold transition bg-indigo-600 text-white shadow'
      : 'py-1.5 px-2 rounded-xl text-xs font-semibold transition bg-slate-900/60 text-slate-400 hover:text-white border border-slate-700/50';
  });

  renderQRCode();
}

/**
 * Helper to apply a preset theme and update UI controls
 */
function applyPresetTheme(preset) {
  state.dots.type = preset.dotType;
  state.corners.squareType = preset.cornerSquareType;
  state.corners.squareColor = preset.cornerSquareColor;
  state.corners.dotType = preset.cornerDotType;
  state.corners.dotColor = preset.cornerDotColor;
  state.background.color = preset.bgColor;
  state.background.isTransparent = preset.isTransparent;

  if (preset.gradient) {
    state.dots.useGradient = true;
    state.dots.gradient.type = preset.gradient.type;
    state.dots.gradient.color1 = preset.gradient.color1;
    state.dots.gradient.color2 = preset.gradient.color2;
    state.dots.gradient.rotation = preset.gradient.rotation;
  } else {
    state.dots.useGradient = false;
    state.dots.color = preset.dotColor;
  }

  // Update UI components
  syncColorInputs('single-color-picker', 'single-color-hex', state.dots.color);
  syncColorInputs('grad-c1-picker', 'grad-c1-hex', state.dots.gradient.color1);
  syncColorInputs('grad-c2-picker', 'grad-c2-hex', state.dots.gradient.color2);
  syncColorInputs('cornersquare-color-picker', 'cornersquare-color-hex', state.corners.squareColor);
  syncColorInputs('cornerdot-color-picker', 'cornerdot-color-hex', state.corners.dotColor);
  syncColorInputs('bg-color-picker', 'bg-color-hex', state.background.color);

  renderQRCode();
}

/**
 * Helper to reset everything to initial state
 */
function handleReset() {
  state.dataType = 'url';
  state.payloads.url = 'https://github.com';
  state.dots.type = 'rounded';
  state.dots.useGradient = false;
  state.dots.color = '#1e40af';
  state.corners.squareType = 'extra-rounded';
  state.corners.squareColor = '#1e3a8a';
  state.corners.dotType = 'dot';
  state.corners.dotColor = '#2563eb';
  state.background.color = '#ffffff';
  state.background.isTransparent = false;
  state.background.margin = 10;
  state.logo.image = null;
  state.qr.errorCorrectionLevel = 'Q';

  const urlField = document.getElementById('url-input-field');
  if (urlField) urlField.value = 'https://github.com';

  const logoActiveCard = document.getElementById('logo-active-card');
  const logoSliders = document.getElementById('logo-sliders-container');
  if (logoActiveCard) logoActiveCard.classList.add('hidden');
  if (logoSliders) logoSliders.classList.add('hidden');

  renderQRCode();
}

/**
 * Handle Download with Custom Resolution
 */
async function handleDownload() {
  if (typeof QRCodeStyling === 'undefined') return;

  const btn = document.getElementById('main-download-btn');
  const originalText = btn ? btn.innerHTML : '';
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<span>جارٍ التصدير بأعلى دقة...</span>';
  }

  try {
    const exportOptions = buildQROptions(state.export.resolution, state.export.resolution);
    const exportQR = new QRCodeStyling(exportOptions);
    const fileName = `qrcode_${state.dataType}_${Date.now()}`;

    await exportQR.download({
      name: fileName,
      extension: state.export.format,
    });

    if (typeof confetti !== 'undefined') {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.8 },
      });
    }
  } catch (err) {
    console.error('Download error:', err);
    alert('حدث خطأ أثناء تحميل الرمز.');
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = originalText;
    }
  }
}

/**
 * Handle Copying Image to Clipboard
 */
async function handleCopyImage() {
  const canvas = document.querySelector('#qr-canvas-container canvas');
  const copyBtn = document.getElementById('copy-to-clipboard-btn');

  if (!canvas) {
    alert('تعذر الوصول إلى لوحة الرمز.');
    return;
  }

  try {
    canvas.toBlob(async (blob) => {
      if (!blob) return;
      try {
        const item = new ClipboardItem({ 'image/png': blob });
        await navigator.clipboard.write([item]);
        showCopySuccess(copyBtn);
      } catch (err) {
        const dataUrl = canvas.toDataURL('image/png');
        await navigator.clipboard.writeText(dataUrl);
        showCopySuccess(copyBtn);
      }
    });
  } catch (err) {
    console.error('Copy to clipboard failed:', err);
  }
}

function showCopySuccess(btn) {
  if (!btn) return;
  const originalHtml = btn.innerHTML;
  btn.innerHTML = '<span>تم النسخ بنجاح!</span>';
  setTimeout(() => {
    btn.innerHTML = originalHtml;
  }, 2500);
}

// Utility input bindings
function bindInput(id, callback) {
  const el = document.getElementById(id);
  if (el) {
    el.addEventListener('input', (e) => {
      callback(e.target.value);
      renderQRCode();
    });
  }
}

function bindColorInput(pickerId, hexId, callback) {
  const picker = document.getElementById(pickerId);
  const hex = document.getElementById(hexId);

  if (picker && hex) {
    picker.addEventListener('input', (e) => {
      hex.value = e.target.value;
      callback(e.target.value);
      renderQRCode();
    });
    hex.addEventListener('input', (e) => {
      picker.value = e.target.value;
      callback(e.target.value);
      renderQRCode();
    });
  }
}

function syncColorInputs(pickerId, hexId, value) {
  const picker = document.getElementById(pickerId);
  const hex = document.getElementById(hexId);
  if (picker) picker.value = value;
  if (hex) hex.value = value;
}

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
  renderQRCode();
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
});
