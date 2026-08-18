'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  QrCode,
  Link,
  Wifi,
  Contact,
  FileText,
  Mail,
  MessageSquare,
  Phone,
  MapPin,
  Download,
  Copy,
  Check,
  RotateCcw,
  Palette,
  Sparkles,
  Sliders,
  Image as ImageIcon,
  Upload,
  Trash2,
  Share2,
  Printer,
  ShieldCheck,
  Eye,
  Layers,
  History,
  Clock,
  Search,
  ExternalLink,
  X,
  Info,
  Maximize2,
  CheckCircle2,
  Zap,
  Shield,
  ArrowRight,
  FileCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';

// Types
export type DataType = 'url' | 'wifi' | 'vcard' | 'text' | 'email' | 'sms' | 'phone' | 'location';
export type DotType = 'square' | 'dots' | 'rounded' | 'extra-rounded' | 'classy' | 'classy-rounded';
export type CornerSquareType = 'dot' | 'square' | 'extra-rounded';
export type CornerDotType = 'dot' | 'square';
export type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';
export type ExportFormat = 'png' | 'svg' | 'jpeg' | 'webp';

export interface HistoryItem {
  id: string;
  timestamp: number;
  dataType: DataType;
  summary: string;
  dataPayload: string;
  previewImage: string;
  exportFormat: ExportFormat;
  exportResolution: number;
  config: {
    dataType: DataType;
    urlInput: string;
    wifiData: {
      ssid: string;
      password: string;
      encryption: string;
      hidden: boolean;
    };
    vCardData: {
      firstName: string;
      lastName: string;
      organization: string;
      title: string;
      phoneWork: string;
      phoneMobile: string;
      email: string;
      url: string;
      address: string;
      note: string;
    };
    textInput: string;
    emailData: {
      to: string;
      subject: string;
      body: string;
    };
    smsData: {
      phone: string;
      message: string;
    };
    phoneInput: string;
    locationData: {
      lat: string;
      lng: string;
      title: string;
    };
    dotStyle: DotType;
    useGradient: boolean;
    singleColor: string;
    gradientType: 'linear' | 'radial';
    gradientColor1: string;
    gradientColor2: string;
    gradientRotation: number;
    cornerSquareStyle: CornerSquareType;
    cornerSquareColor: string;
    cornerDotStyle: CornerDotType;
    cornerDotColor: string;
    bgColor: string;
    isTransparentBg: boolean;
    logoImage: string | null;
    logoSize: number;
    logoMargin: number;
    clearLogoBackground: boolean;
    errorCorrection: ErrorCorrectionLevel;
    quietZone: number;
  };
}

interface PresetTheme {
  name: string;
  dotColor: string;
  dotType: DotType;
  gradient?: {
    type: 'linear' | 'radial';
    color1: string;
    color2: string;
    rotation: number;
  };
  cornerSquareType: CornerSquareType;
  cornerSquareColor: string;
  cornerDotType: CornerDotType;
  cornerDotColor: string;
  bgColor: string;
  isTransparent: boolean;
}

const PRESET_THEMES: PresetTheme[] = [
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

const PRESET_LOGOS = [
  { name: 'WhatsApp', icon: 'https://cdn-icons-png.flaticon.com/512/3670/3670051.png' },
  { name: 'Wi-Fi', icon: 'https://cdn-icons-png.flaticon.com/512/93/93158.png' },
  { name: 'Instagram', icon: 'https://cdn-icons-png.flaticon.com/512/3955/3955024.png' },
  { name: 'LinkedIn', icon: 'https://cdn-icons-png.flaticon.com/512/3536/3536505.png' },
  { name: 'YouTube', icon: 'https://cdn-icons-png.flaticon.com/512/1384/1384060.png' },
  { name: 'Website', icon: 'https://cdn-icons-png.flaticon.com/512/1006/1006771.png' },
  { name: 'Email', icon: 'https://cdn-icons-png.flaticon.com/512/732/732200.png' },
  { name: 'Location', icon: 'https://cdn-icons-png.flaticon.com/512/684/684908.png' },
];

export default function QRGenerator() {
  const qrContainerRef = useRef<HTMLDivElement>(null);
  const qrCodeInstanceRef = useRef<any>(null);

  // State: Data Type & Inputs
  const [dataType, setDataType] = useState<DataType>('url');
  const [urlInput, setUrlInput] = useState('https://github.com');
  const [wifiData, setWifiData] = useState<{
    ssid: string;
    password: string;
    encryption: string;
    hidden: boolean;
  }>({
    ssid: 'MyHome_5G',
    password: 'SecurePassword123',
    encryption: 'WPA',
    hidden: false,
  });
  const [vCardData, setVCardData] = useState({
    firstName: 'محمد',
    lastName: 'أحمد',
    organization: 'شركة التقنية المتقدمة',
    title: 'مهندس برمجيات أول',
    phoneWork: '+966500000000',
    phoneMobile: '+966511111111',
    email: 'mohammed@example.com',
    url: 'https://example.com',
    address: 'الرياض، المملكة العربية السعودية',
    note: 'مطور واجهات أمامية ومصمم تجارب مستخدم',
  });
  const [textInput, setTextInput] = useState('مرحباً بك! هذا رمز استجابة سريعة احترافي ومخصص.');
  const [emailData, setEmailData] = useState({
    to: 'contact@example.com',
    subject: 'استفسار عن الخدمات',
    body: 'السلام عليكم ورحمة الله، أود الاستفسار بخصوص...',
  });
  const [smsData, setSmsData] = useState({
    phone: '+966500000000',
    message: 'مرحباً، أرجو التواصل معي بخصوص...',
  });
  const [phoneInput, setPhoneInput] = useState('+966500000000');
  const [locationData, setLocationData] = useState({
    lat: '24.7136',
    lng: '46.6753',
    title: 'الرياض',
  });

  // State: Visual Customization
  const [dotStyle, setDotStyle] = useState<DotType>('rounded');
  const [useGradient, setUseGradient] = useState(false);
  const [singleColor, setSingleColor] = useState('#1e40af');
  const [gradientType, setGradientType] = useState<'linear' | 'radial'>('linear');
  const [gradientColor1, setGradientColor1] = useState('#1e40af');
  const [gradientColor2, setGradientColor2] = useState('#3b82f6');
  const [gradientRotation, setGradientRotation] = useState(45);

  const [cornerSquareStyle, setCornerSquareStyle] = useState<CornerSquareType>('extra-rounded');
  const [cornerSquareColor, setCornerSquareColor] = useState('#1e3a8a');
  const [cornerDotStyle, setCornerDotStyle] = useState<CornerDotType>('dot');
  const [cornerDotColor, setCornerDotColor] = useState('#2563eb');

  const [bgColor, setBgColor] = useState('#ffffff');
  const [isTransparentBg, setIsTransparentBg] = useState(false);
  const [quietZone, setQuietZone] = useState(10);
  const [errorCorrection, setErrorCorrection] = useState<ErrorCorrectionLevel>('Q');

  // State: Logo Customization
  const [logoImage, setLogoImage] = useState<string | null>(null);
  const [logoSize, setLogoSize] = useState(0.28);
  const [logoMargin, setLogoMargin] = useState(5);
  const [clearLogoBackground, setClearLogoBackground] = useState(true);

  // State: Export & UI
  const [exportFormat, setExportFormat] = useState<ExportFormat>('png');
  const [exportResolution, setExportResolution] = useState(1024);
  const [isCopied, setIsCopied] = useState(false);
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [activeTab, setActiveTab] = useState<'content' | 'style' | 'logo' | 'presets'>('content');
  const [toastNotification, setToastNotification] = useState<string | null>(null);

  // History state
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [historySearchQuery, setHistorySearchQuery] = useState('');
  const [historyFilterType, setHistoryFilterType] = useState<string>('all');
  const [copiedHistoryId, setCopiedHistoryId] = useState<string | null>(null);

  // Safely hydrate stored history from localStorage on client mount
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const savedHistory = localStorage.getItem('qr_download_history');
        if (savedHistory) {
          setHistory(JSON.parse(savedHistory));
        }
      } catch (e) {
        console.warn('Could not load history from localStorage', e);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  // Quick Share app link
  const handleShareApp = async () => {
    const shareData = {
      title: 'مولّد رموز الاستجابة السريعة الاحترافي',
      text: 'أنشئ وخصّص رموز QR احترافية ومجانية فائقة الدقة بسهولة وسرعة!',
      url: typeof window !== 'undefined' ? window.location.href : '',
    };

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        // Fallback to clipboard
      }
    }

    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      await navigator.clipboard.writeText(window.location.href);
      setToastNotification('🔗 تم نسخ رابط الموقع للحافظة بنجاح، يمكنك مشاركته الآن!');
      setTimeout(() => setToastNotification(null), 3500);
    }
  };


  // Helper to format payload string
  const getFormattedPayload = useCallback((): string => {
    switch (dataType) {
      case 'url':
        return urlInput.trim().startsWith('http://') || urlInput.trim().startsWith('https://')
          ? urlInput.trim()
          : `https://${urlInput.trim()}`;
      case 'wifi': {
        const { ssid, password, encryption, hidden } = wifiData;
        const enc = encryption === 'None' ? 'nopass' : encryption;
        return `WIFI:T:${enc};S:${ssid};P:${password};H:${hidden ? 'true' : 'false'};;`;
      }
      case 'vcard': {
        const {
          firstName,
          lastName,
          organization,
          title,
          phoneWork,
          phoneMobile,
          email,
          url,
          address,
          note,
        } = vCardData;
        return [
          'BEGIN:VCARD',
          'VERSION:3.0',
          `N:${lastName};${firstName};;;`,
          `FN:${firstName} ${lastName}`.trim(),
          organization ? `ORG:${organization}` : '',
          title ? `TITLE:${title}` : '',
          phoneMobile ? `TEL;TYPE=CELL,VOICE:${phoneMobile}` : '',
          phoneWork ? `TEL;TYPE=WORK,VOICE:${phoneWork}` : '',
          email ? `EMAIL;TYPE=INTERNET,PREF:${email}` : '',
          url ? `URL:${url}` : '',
          address ? `ADR;TYPE=WORK:;;${address};;;;` : '',
          note ? `NOTE:${note}` : '',
          'END:VCARD',
        ]
          .filter(Boolean)
          .join('\n');
      }
      case 'text':
        return textInput || ' ';
      case 'email': {
        const { to, subject, body } = emailData;
        return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      }
      case 'sms': {
        const { phone, message } = smsData;
        return `SMSTO:${phone}:${message}`;
      }
      case 'phone':
        return `tel:${phoneInput.trim()}`;
      case 'location': {
        const { lat, lng } = locationData;
        return `https://www.google.com/maps?q=${lat},${lng}`;
      }
      default:
        return 'https://github.com';
    }
  }, [dataType, urlInput, wifiData, vCardData, textInput, emailData, smsData, phoneInput, locationData]);

  // Build QRCodeStyling options
  const getQRCodeOptions = useCallback((customWidth?: number, customHeight?: number) => {
    const rawData = getFormattedPayload();
    const effectiveBg = isTransparentBg ? 'transparent' : bgColor;
    const finalCorrection = logoImage && errorCorrection === 'L' ? 'Q' : errorCorrection;

    const dotsOptions: any = {
      type: dotStyle,
    };

    if (useGradient) {
      dotsOptions.gradient = {
        type: gradientType,
        rotation: (gradientRotation * Math.PI) / 180,
        colorStops: [
          { offset: 0, color: gradientColor1 },
          { offset: 1, color: gradientColor2 },
        ],
      };
    } else {
      dotsOptions.color = singleColor;
    }

    return {
      width: customWidth || 320,
      height: customHeight || 320,
      type: 'canvas' as const,
      data: rawData,
      margin: quietZone,
      qrOptions: {
        typeNumber: 0 as any,
        mode: 'Byte' as any,
        errorCorrectionLevel: finalCorrection,
      },
      image: logoImage || undefined,
      imageOptions: {
        hideBackgroundDots: clearLogoBackground,
        imageSize: logoSize,
        margin: logoMargin,
        crossOrigin: 'anonymous',
      },
      dotsOptions,
      cornersSquareOptions: {
        type: cornerSquareStyle,
        color: cornerSquareColor,
      },
      cornersDotOptions: {
        type: cornerDotStyle,
        color: cornerDotColor,
      },
      backgroundOptions: {
        color: effectiveBg,
      },
    };
  }, [
    getFormattedPayload,
    isTransparentBg,
    bgColor,
    logoImage,
    errorCorrection,
    dotStyle,
    useGradient,
    gradientType,
    gradientRotation,
    gradientColor1,
    gradientColor2,
    singleColor,
    quietZone,
    clearLogoBackground,
    logoSize,
    logoMargin,
    cornerSquareStyle,
    cornerSquareColor,
    cornerDotStyle,
    cornerDotColor,
  ]);

  // Initialize and update QRCodeStyling
  useEffect(() => {
    let isMounted = true;

    const initOrUpdateQR = async () => {
      if (typeof window === 'undefined') return;

      try {
        const QRCodeStyling = (await import('qr-code-styling')).default;
        const options = getQRCodeOptions(300, 300);

        if (!qrCodeInstanceRef.current) {
          qrCodeInstanceRef.current = new QRCodeStyling(options);
          if (qrContainerRef.current && isMounted) {
            qrContainerRef.current.innerHTML = '';
            qrCodeInstanceRef.current.append(qrContainerRef.current);
          }
        } else {
          qrCodeInstanceRef.current.update(options);
        }
      } catch (err) {
        console.error('Failed to initialize or update QR Code:', err);
      }
    };

    initOrUpdateQR();

    return () => {
      isMounted = false;
    };
  }, [getQRCodeOptions]);

  // Handle Logo Upload
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('حجم الصورة كبير جداً، يرجى اختيار صورة أقل من 5 ميجابايت.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setLogoImage(event.target?.result as string);
        if (errorCorrection === 'L' || errorCorrection === 'M') {
          setErrorCorrection('H'); // Auto boost error correction for logos
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Apply preset theme
  const applyPreset = (preset: PresetTheme) => {
    setDotStyle(preset.dotType);
    setCornerSquareStyle(preset.cornerSquareType);
    setCornerSquareColor(preset.cornerSquareColor);
    setCornerDotStyle(preset.cornerDotType);
    setCornerDotColor(preset.cornerDotColor);
    setBgColor(preset.bgColor);
    setIsTransparentBg(preset.isTransparent);

    if (preset.gradient) {
      setUseGradient(true);
      setGradientType(preset.gradient.type);
      setGradientColor1(preset.gradient.color1);
      setGradientColor2(preset.gradient.color2);
      setGradientRotation(preset.gradient.rotation);
    } else {
      setUseGradient(false);
      setSingleColor(preset.dotColor);
    }
  };

  // Reset to default
  const handleReset = () => {
    setUrlInput('https://github.com');
    setDataType('url');
    setDotStyle('rounded');
    setUseGradient(false);
    setSingleColor('#1e40af');
    setCornerSquareStyle('extra-rounded');
    setCornerSquareColor('#1e3a8a');
    setCornerDotStyle('dot');
    setCornerDotColor('#2563eb');
    setBgColor('#ffffff');
    setIsTransparentBg(false);
    setLogoImage(null);
    setQuietZone(10);
    setErrorCorrection('Q');
  };

  // Save current QR Code state to user's history list in localStorage
  const saveToHistory = useCallback((previewDataUrl: string) => {
    try {
      let summaryText = '';
      switch (dataType) {
        case 'url':
          summaryText = urlInput;
          break;
        case 'wifi':
          summaryText = `شبكة: ${wifiData.ssid || 'Wi-Fi'}`;
          break;
        case 'vcard':
          summaryText = `${vCardData.firstName} ${vCardData.lastName}`.trim() || 'بطاقة عمل';
          break;
        case 'text':
          summaryText = textInput.slice(0, 45) + (textInput.length > 45 ? '...' : '');
          break;
        case 'email':
          summaryText = emailData.to ? `إلى: ${emailData.to}` : 'بريد إلكتروني';
          break;
        case 'sms':
          summaryText = smsData.phone ? `SMS: ${smsData.phone}` : 'رسالة قصيرة';
          break;
        case 'phone':
          summaryText = phoneInput || 'رقم هاتف';
          break;
        case 'location':
          summaryText = locationData.title || `إحداثيات: ${locationData.lat}, ${locationData.lng}`;
          break;
        default:
          summaryText = 'رمز QR مخصص';
      }

      const payload = getFormattedPayload();

      const newItem: HistoryItem = {
        id: `qr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        timestamp: Date.now(),
        dataType,
        summary: summaryText || 'رمز QR',
        dataPayload: payload,
        previewImage: previewDataUrl,
        exportFormat,
        exportResolution,
        config: {
          dataType,
          urlInput,
          wifiData: { ...wifiData },
          vCardData: { ...vCardData },
          textInput,
          emailData: { ...emailData },
          smsData: { ...smsData },
          phoneInput,
          locationData: { ...locationData },
          dotStyle,
          useGradient,
          singleColor,
          gradientType,
          gradientColor1,
          gradientColor2,
          gradientRotation,
          cornerSquareStyle,
          cornerSquareColor,
          cornerDotStyle,
          cornerDotColor,
          bgColor,
          isTransparentBg,
          logoImage,
          logoSize,
          logoMargin,
          clearLogoBackground,
          errorCorrection,
          quietZone,
        },
      };

      setHistory((prev) => {
        const updated = [newItem, ...prev.filter((h) => h.id !== newItem.id)].slice(0, 50);
        try {
          localStorage.setItem('qr_download_history', JSON.stringify(updated));
        } catch (e) {
          console.warn('Could not persist history to localStorage', e);
        }
        return updated;
      });
    } catch (err) {
      console.error('Error saving to history:', err);
    }
  }, [
    dataType,
    urlInput,
    wifiData,
    vCardData,
    textInput,
    emailData,
    smsData,
    phoneInput,
    locationData,
    dotStyle,
    useGradient,
    singleColor,
    gradientType,
    gradientColor1,
    gradientColor2,
    gradientRotation,
    cornerSquareStyle,
    cornerSquareColor,
    cornerDotStyle,
    cornerDotColor,
    bgColor,
    isTransparentBg,
    logoImage,
    logoSize,
    logoMargin,
    clearLogoBackground,
    errorCorrection,
    quietZone,
    exportFormat,
    exportResolution,
    getFormattedPayload,
  ]);

  // Restore history item configuration to active editor
  const restoreFromHistory = (item: HistoryItem) => {
    const cfg = item.config;
    setDataType(cfg.dataType);
    setUrlInput(cfg.urlInput);
    setWifiData({ ...cfg.wifiData });
    setVCardData({ ...cfg.vCardData });
    setTextInput(cfg.textInput);
    setEmailData({ ...cfg.emailData });
    setSmsData({ ...cfg.smsData });
    setPhoneInput(cfg.phoneInput);
    setLocationData({ ...cfg.locationData });
    setDotStyle(cfg.dotStyle);
    setUseGradient(cfg.useGradient);
    setSingleColor(cfg.singleColor);
    setGradientType(cfg.gradientType);
    setGradientColor1(cfg.gradientColor1);
    setGradientColor2(cfg.gradientColor2);
    setGradientRotation(cfg.gradientRotation);
    setCornerSquareStyle(cfg.cornerSquareStyle);
    setCornerSquareColor(cfg.cornerSquareColor);
    setCornerDotStyle(cfg.cornerDotStyle);
    setCornerDotColor(cfg.cornerDotColor);
    setBgColor(cfg.bgColor);
    setIsTransparentBg(cfg.isTransparentBg);
    setLogoImage(cfg.logoImage);
    setLogoSize(cfg.logoSize);
    setLogoMargin(cfg.logoMargin);
    setClearLogoBackground(cfg.clearLogoBackground);
    setErrorCorrection(cfg.errorCorrection);
    setQuietZone(cfg.quietZone);

    setShowHistoryModal(false);
  };

  // Delete specific history item
  const deleteHistoryItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setHistory((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      try {
        localStorage.setItem('qr_download_history', JSON.stringify(updated));
      } catch (err) {
        console.error('Error removing item from history', err);
      }
      return updated;
    });
  };

  // Clear entire history
  const clearAllHistory = () => {
    if (window.confirm('هل أنت متأكد من مسح جميع عناصر السجل؟')) {
      setHistory([]);
      try {
        localStorage.removeItem('qr_download_history');
      } catch (err) {
        console.error('Error clearing history', err);
      }
    }
  };

  // Download directly from history item
  const downloadHistoryItemDirect = (item: HistoryItem, e: React.MouseEvent) => {
    e.stopPropagation();
    const link = document.createElement('a');
    link.download = `qrcode_${item.dataType}_${item.id}.png`;
    link.href = item.previewImage;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Copy data payload of history item
  const copyHistoryPayload = async (item: HistoryItem, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(item.dataPayload);
      setCopiedHistoryId(item.id);
      setTimeout(() => {
        setCopiedHistoryId(null);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy payload:', err);
    }
  };

  // Resolution selection handler
  const handleSelectResolution = (res: number) => {
    setExportResolution(res);
  };

  // Actual export download logic
  const executeActualDownload = async () => {
    if (!qrCodeInstanceRef.current) return;
    setIsDownloading(true);

    try {
      const QRCodeStyling = (await import('qr-code-styling')).default;
      const exportOptions = getQRCodeOptions(exportResolution, exportResolution);
      const tempQR = new QRCodeStyling(exportOptions);

      const fileName = `qrcode_${dataType}_${Date.now()}`;
      await tempQR.download({
        name: fileName,
        extension: exportFormat === 'webp' ? 'png' : exportFormat,
      });

      // Save to user history
      const canvas = qrContainerRef.current?.querySelector('canvas');
      if (canvas) {
        const previewDataUrl = canvas.toDataURL('image/png');
        saveToHistory(previewDataUrl);
      }

      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.8 },
      });

      setToastNotification(`✅ تم تنزيل رمز QR بدقة ${exportResolution}px بصيغة ${exportFormat.toUpperCase()} بنجاح!`);
      setTimeout(() => setToastNotification(null), 4500);
    } catch (err) {
      console.error('Download failed:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  // Copy to clipboard
  const handleCopyImage = async () => {
    try {
      const canvas = qrContainerRef.current?.querySelector('canvas');
      if (!canvas) {
        throw new Error('Canvas not found');
      }

      canvas.toBlob(async (blob) => {
        if (!blob) return;
        try {
          const item = new ClipboardItem({ 'image/png': blob });
          await navigator.clipboard.write([item]);
          setIsCopied(true);
          setCopiedType('image');
          setTimeout(() => {
            setIsCopied(false);
            setCopiedType(null);
          }, 3000);
        } catch (clipErr) {
          // Fallback data url copy
          const dataUrl = canvas.toDataURL('image/png');
          await navigator.clipboard.writeText(dataUrl);
          setIsCopied(true);
          setCopiedType('dataurl');
          setTimeout(() => {
            setIsCopied(false);
            setCopiedType(null);
          }, 3000);
        }
      });
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  // Print QR Code
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-12 relative" id="qr-app-root">
      {/* Asymmetrical Decorative Blobs in background */}
      <div className="fixed top-16 right-[-80px] w-[450px] h-[450px] blob-1 opacity-50 -z-10 pointer-events-none" />
      <div className="fixed bottom-[-60px] left-[-40px] w-[500px] h-[500px] blob-2 opacity-40 -z-10 pointer-events-none" />
      <div className="fixed top-[40%] left-[5%] w-[300px] h-[300px] blob-3 opacity-30 -z-10 pointer-events-none" />

      {/* App Header */}
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 pb-4">
        <div className="max-w-3xl space-y-5">
          <div className="text-xs font-black tracking-wider text-slate-900 bg-lime-400 inline-flex items-center gap-2 px-4 py-1.5 rounded-xl border-2 border-slate-900 shadow-[3px_3px_0px_#171717]">
            <Sparkles className="w-3.5 h-3.5 text-slate-900" />
            <span>مجاني 100% · سريع وبدون إعلانات</span>
          </div>

          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tighter text-[#171717]">
            مولّد<br />
            <span className="text-lime-500 underline decoration-slate-900 decoration-wavy decoration-2">الرمز</span> الاحترافي.
          </h1>

          <p className="text-base sm:text-lg font-bold text-slate-700 leading-relaxed pr-5 border-r-4 border-slate-900 max-w-2xl">
            أنشئ وخصّص رموز QR احترافية وديناميكية بسرعة فائقة: روابط الويب، بطاقات عمل vCard الرقمية، شبكات Wi-Fi، تدرجات لونية وشعارات وتصدير بجودة حتى 4K مجاناً بالكامل.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto self-end">
          <button
            onClick={handleShareApp}
            className="brutalist-card bg-lime-400 hover:bg-lime-300 px-5 py-3 font-black text-xs tracking-wider flex items-center gap-2.5 cursor-pointer text-slate-950"
            id="share-app-btn"
            title="مشاركة رابط الموقع مع الأصدقاء"
          >
            <Share2 className="w-4 h-4 text-slate-950" />
            <span>مشاركة الموقع</span>
          </button>
          <button
            onClick={() => setShowHistoryModal(true)}
            className="brutalist-card bg-white px-5 py-3 font-black text-xs tracking-wider flex items-center gap-2.5 hover:bg-lime-50 cursor-pointer relative"
            id="view-history-btn"
          >
            <History className="w-4 h-4 text-slate-900" />
            <span>سجل التحميلات</span>
            {history.length > 0 && (
              <span className="bg-lime-400 text-slate-950 px-2 py-0.5 rounded-md border border-slate-900 text-[11px] font-black shadow-[1px_1px_0px_#171717]">
                {history.length}
              </span>
            )}
          </button>
          <button
            onClick={handleReset}
            className="brutalist-card bg-white px-5 py-3 font-black text-xs tracking-wider flex items-center gap-2 hover:bg-slate-100 cursor-pointer"
            title="إعادة تعيين للإعدادات الافتراضية"
            id="reset-config-btn"
          >
            <RotateCcw className="w-4 h-4 text-slate-900" />
            <span>إعادة ضبط</span>
          </button>
        </div>
      </header>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Configuration Panels (7 Cols) */}
        <div className="lg:col-span-7 space-y-8">
          {/* Navigation Sub-Tabs (Neo-Brutalist Pill Tabs) */}
          <div className="flex items-center gap-2.5 p-2 rounded-2xl bg-white border-3 border-slate-900 shadow-[5px_5px_0px_#171717] overflow-x-auto">
            <button
              onClick={() => setActiveTab('content')}
              className={`flex-1 min-w-[110px] flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
                activeTab === 'content'
                  ? 'bg-lime-400 text-slate-900 border-2 border-slate-900 shadow-[3px_3px_0px_#171717]'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
              }`}
              id="tab-btn-content"
            >
              <FileText className="w-4 h-4" />
              <span>1. المحتوى والبيانات</span>
            </button>

            <button
              onClick={() => setActiveTab('style')}
              className={`flex-1 min-w-[110px] flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
                activeTab === 'style'
                  ? 'bg-lime-400 text-slate-900 border-2 border-slate-900 shadow-[3px_3px_0px_#171717]'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
              }`}
              id="tab-btn-style"
            >
              <Palette className="w-4 h-4" />
              <span>2. النمط والألوان</span>
            </button>

            <button
              onClick={() => setActiveTab('logo')}
              className={`flex-1 min-w-[110px] flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
                activeTab === 'logo'
                  ? 'bg-lime-400 text-slate-900 border-2 border-slate-900 shadow-[3px_3px_0px_#171717]'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
              }`}
              id="tab-btn-logo"
            >
              <ImageIcon className="w-4 h-4" />
              <span>3. الشعار والوسط</span>
            </button>

            <button
              onClick={() => setActiveTab('presets')}
              className={`flex-1 min-w-[110px] flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
                activeTab === 'presets'
                  ? 'bg-lime-400 text-slate-900 border-2 border-slate-900 shadow-[3px_3px_0px_#171717]'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
              }`}
              id="tab-btn-presets"
            >
              <Sparkles className="w-4 h-4" />
              <span>4. قوالب جاهزة</span>
            </button>
          </div>

          {/* TAB 1: DATA CONTENT */}
          {activeTab === 'content' && (
            <div className="space-y-6 brutalist-card bg-white p-6 sm:p-8 rounded-2xl">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900">أولاً. نوع البيانات والمحتوى</h2>
                <div className="h-[3px] flex-1 bg-slate-900"></div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-3">
                  اختر نوع البيانات لتوليد الرمز:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: 'url', label: 'رابط ويب / سوشيال', icon: Link },
                    { id: 'wifi', label: 'شبكة Wi-Fi', icon: Wifi },
                    { id: 'vcard', label: 'بطاقة عمل vCard', icon: Contact },
                    { id: 'text', label: 'نص مخصص', icon: FileText },
                    { id: 'email', label: 'بريد إلكتروني', icon: Mail },
                    { id: 'sms', label: 'رسالة SMS', icon: MessageSquare },
                    { id: 'phone', label: 'رقم هاتف مباشر', icon: Phone },
                    { id: 'location', label: 'موقع جغرافي', icon: MapPin },
                  ].map((item) => {
                    const IconComp = item.icon;
                    const isSelected = dataType === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setDataType(item.id as DataType)}
                        className={`flex flex-col items-center justify-center gap-2 p-3.5 rounded-xl border-2 border-slate-900 text-xs font-black transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-lime-400 text-slate-900 shadow-[4px_4px_0px_#171717] -translate-y-0.5'
                            : 'bg-white text-slate-700 shadow-[2px_2px_0px_#171717] hover:bg-lime-50 hover:shadow-[3px_3px_0px_#171717]'
                        }`}
                        id={`data-type-btn-${item.id}`}
                      >
                        <IconComp className={`w-5 h-5 ${isSelected ? 'text-slate-900 stroke-[2.5]' : 'text-slate-700 stroke-[2]'}`} />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dynamic Form Inputs */}
              <div className="pt-4 border-t-2 border-slate-900 space-y-4">
                {/* 1. URL */}
                {dataType === 'url' && (
                  <div className="space-y-3">
                    <label className="block text-xs font-black uppercase text-slate-800" htmlFor="url-input-field">
                      رابط الموقع أو الحساب الإلكتروني (URL):
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-800">
                        <Link className="w-5 h-5" />
                      </div>
                      <input
                        type="url"
                        id="url-input-field"
                        value={urlInput}
                        onChange={(e) => setUrlInput(e.target.value)}
                        placeholder="https://example.com/profile"
                        className="w-full pl-4 pr-11 py-3 bg-white border-2 border-slate-900 rounded-xl text-slate-900 font-bold placeholder-slate-400 shadow-[3px_3px_0px_#171717] focus:outline-none focus:shadow-[4px_4px_0px_#84cc16] text-sm transition"
                        dir="ltr"
                      />
                    </div>
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <span className="text-xs font-black text-slate-600">روابط سريعة:</span>
                      {['https://google.com', 'https://github.com', 'https://wa.me/966500000000', 'https://x.com'].map((ex) => (
                        <button
                          key={ex}
                          type="button"
                          onClick={() => setUrlInput(ex)}
                          className="text-xs px-2.5 py-1 rounded-md bg-white border border-slate-900 shadow-[1px_1px_0px_#171717] hover:bg-lime-200 text-slate-900 font-mono font-bold transition"
                          dir="ltr"
                        >
                          {ex}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 2. Wi-Fi */}
                {dataType === 'wifi' && (
                  <div className="space-y-4">
                    <div className="p-3.5 rounded-xl bg-lime-50 border-2 border-slate-900 shadow-[2px_2px_0px_#171717] text-slate-900 text-xs flex items-center gap-2.5 font-bold">
                      <Info className="w-4 h-4 flex-shrink-0 text-lime-700" />
                      <span>يتيح مسح الرمز للأجهزة الاتصال بالشبكة تلقائياً دون كتابة كلمة المرور يدوياً.</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-black text-slate-800 mb-1.5" htmlFor="wifi-ssid">
                          اسم الشبكة (SSID):
                        </label>
                        <input
                          type="text"
                          id="wifi-ssid"
                          value={wifiData.ssid}
                          onChange={(e) => setWifiData({ ...wifiData, ssid: e.target.value })}
                          placeholder="MyHome_Network"
                          className="w-full px-3.5 py-2.5 bg-white border-2 border-slate-900 rounded-xl text-slate-900 font-bold placeholder-slate-400 text-sm shadow-[2px_2px_0px_#171717] focus:outline-none focus:shadow-[3px_3px_0px_#84cc16]"
                          dir="ltr"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-black text-slate-800 mb-1.5" htmlFor="wifi-password">
                          كلمة المرور (Password):
                        </label>
                        <input
                          type="text"
                          id="wifi-password"
                          value={wifiData.password}
                          onChange={(e) => setWifiData({ ...wifiData, password: e.target.value })}
                          placeholder="كلمة مرور الشبكة"
                          disabled={wifiData.encryption === 'None'}
                          className="w-full px-3.5 py-2.5 bg-white border-2 border-slate-900 rounded-xl text-slate-900 font-bold placeholder-slate-400 text-sm shadow-[2px_2px_0px_#171717] focus:outline-none focus:shadow-[3px_3px_0px_#84cc16] disabled:opacity-40"
                          dir="ltr"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                      <div>
                        <label className="block text-xs font-black text-slate-800 mb-1.5" htmlFor="wifi-encryption">
                          نوع التشفير (Security Type):
                        </label>
                        <select
                          id="wifi-encryption"
                          value={wifiData.encryption}
                          onChange={(e) => setWifiData({ ...wifiData, encryption: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-white border-2 border-slate-900 rounded-xl text-slate-900 font-bold text-sm shadow-[2px_2px_0px_#171717] focus:outline-none focus:shadow-[3px_3px_0px_#84cc16]"
                        >
                          <option value="WPA">WPA / WPA2 / WPA3 (الأكثر شيوعاً)</option>
                          <option value="WEP">WEP</option>
                          <option value="None">شبكة مفتوحة بدون كلمة مرور (None)</option>
                        </select>
                      </div>

                      <div className="flex items-center gap-3 pt-4 sm:pt-6">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={wifiData.hidden}
                            onChange={(e) => setWifiData({ ...wifiData, hidden: e.target.checked })}
                            className="sr-only peer"
                            id="wifi-hidden-checkbox"
                          />
                          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-lime-500 border border-slate-900"></div>
                        </label>
                        <span className="text-xs font-bold text-slate-800">شبكة مخفية (Hidden SSID)</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. vCard 3.0 */}
                {dataType === 'vcard' && (
                  <div className="space-y-4">
                    <div className="p-3.5 rounded-xl bg-blue-50 border-2 border-slate-900 shadow-[2px_2px_0px_#171717] text-slate-900 text-xs flex items-center gap-2.5 font-bold">
                      <Contact className="w-4 h-4 flex-shrink-0 text-blue-700" />
                      <span>بطاقة عمل رقمية قياسية (vCard 3.0) تُحفظ جهة الاتصال بضغطة زر واحدة في هاتف المستخدم.</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-black text-slate-800 mb-1" htmlFor="vcard-fname">
                          الاسم الأول:
                        </label>
                        <input
                          type="text"
                          id="vcard-fname"
                          value={vCardData.firstName}
                          onChange={(e) => setVCardData({ ...vCardData, firstName: e.target.value })}
                          className="w-full px-3 py-2 bg-white border-2 border-slate-900 rounded-xl text-slate-900 font-bold text-sm shadow-[2px_2px_0px_#171717] focus:outline-none focus:shadow-[3px_3px_0px_#84cc16]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-black text-slate-800 mb-1" htmlFor="vcard-lname">
                          اسم العائلة / اللقب:
                        </label>
                        <input
                          type="text"
                          id="vcard-lname"
                          value={vCardData.lastName}
                          onChange={(e) => setVCardData({ ...vCardData, lastName: e.target.value })}
                          className="w-full px-3 py-2 bg-white border-2 border-slate-900 rounded-xl text-slate-900 font-bold text-sm shadow-[2px_2px_0px_#171717] focus:outline-none focus:shadow-[3px_3px_0px_#84cc16]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-black text-slate-800 mb-1" htmlFor="vcard-org">
                          الشركة / المنظمة:
                        </label>
                        <input
                          type="text"
                          id="vcard-org"
                          value={vCardData.organization}
                          onChange={(e) => setVCardData({ ...vCardData, organization: e.target.value })}
                          className="w-full px-3 py-2 bg-white border-2 border-slate-900 rounded-xl text-slate-900 font-bold text-sm shadow-[2px_2px_0px_#171717] focus:outline-none focus:shadow-[3px_3px_0px_#84cc16]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-black text-slate-800 mb-1" htmlFor="vcard-title">
                          المسمى الوظيفي:
                        </label>
                        <input
                          type="text"
                          id="vcard-title"
                          value={vCardData.title}
                          onChange={(e) => setVCardData({ ...vCardData, title: e.target.value })}
                          className="w-full px-3 py-2 bg-white border-2 border-slate-900 rounded-xl text-slate-900 font-bold text-sm shadow-[2px_2px_0px_#171717] focus:outline-none focus:shadow-[3px_3px_0px_#84cc16]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-black text-slate-800 mb-1" htmlFor="vcard-mobile">
                          رقم الجوال:
                        </label>
                        <input
                          type="tel"
                          id="vcard-mobile"
                          value={vCardData.phoneMobile}
                          onChange={(e) => setVCardData({ ...vCardData, phoneMobile: e.target.value })}
                          className="w-full px-3 py-2 bg-white border-2 border-slate-900 rounded-xl text-slate-900 font-bold text-sm shadow-[2px_2px_0px_#171717] font-mono focus:outline-none focus:shadow-[3px_3px_0px_#84cc16]"
                          dir="ltr"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-black text-slate-800 mb-1" htmlFor="vcard-work-phone">
                          هاتف العمل:
                        </label>
                        <input
                          type="tel"
                          id="vcard-work-phone"
                          value={vCardData.phoneWork}
                          onChange={(e) => setVCardData({ ...vCardData, phoneWork: e.target.value })}
                          className="w-full px-3 py-2 bg-white border-2 border-slate-900 rounded-xl text-slate-900 font-bold text-sm shadow-[2px_2px_0px_#171717] font-mono focus:outline-none focus:shadow-[3px_3px_0px_#84cc16]"
                          dir="ltr"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-black text-slate-800 mb-1" htmlFor="vcard-email">
                          البريد الإلكتروني:
                        </label>
                        <input
                          type="email"
                          id="vcard-email"
                          value={vCardData.email}
                          onChange={(e) => setVCardData({ ...vCardData, email: e.target.value })}
                          className="w-full px-3 py-2 bg-white border-2 border-slate-900 rounded-xl text-slate-900 font-bold text-sm shadow-[2px_2px_0px_#171717] focus:outline-none focus:shadow-[3px_3px_0px_#84cc16]"
                          dir="ltr"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-black text-slate-800 mb-1" htmlFor="vcard-website">
                          الموقع الإلكتروني:
                        </label>
                        <input
                          type="url"
                          id="vcard-website"
                          value={vCardData.url}
                          onChange={(e) => setVCardData({ ...vCardData, url: e.target.value })}
                          className="w-full px-3 py-2 bg-white border-2 border-slate-900 rounded-xl text-slate-900 font-bold text-sm shadow-[2px_2px_0px_#171717] focus:outline-none focus:shadow-[3px_3px_0px_#84cc16]"
                          dir="ltr"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-black text-slate-800 mb-1" htmlFor="vcard-address">
                        العنوان / المدينة:
                      </label>
                      <input
                        type="text"
                        id="vcard-address"
                        value={vCardData.address}
                        onChange={(e) => setVCardData({ ...vCardData, address: e.target.value })}
                        className="w-full px-3 py-2 bg-white border-2 border-slate-900 rounded-xl text-slate-900 font-bold text-sm shadow-[2px_2px_0px_#171717] focus:outline-none focus:shadow-[3px_3px_0px_#84cc16]"
                      />
                    </div>
                  </div>
                )}

                {/* 4. Plain Text */}
                {dataType === 'text' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-black uppercase text-slate-800" htmlFor="text-content-area">
                        النص المراد تشفيره في رمز QR:
                      </label>
                      <span className="text-xs text-slate-500 font-mono font-bold">{textInput.length} حرف</span>
                    </div>
                    <textarea
                      id="text-content-area"
                      rows={4}
                      value={textInput}
                      onChange={(e) => setTextInput(e.target.value)}
                      placeholder="اكتب هنا أي نص، ملاحظة، أو كود..."
                      className="w-full p-3.5 bg-white border-2 border-slate-900 rounded-xl text-slate-900 font-bold placeholder-slate-400 text-sm shadow-[2px_2px_0px_#171717] focus:outline-none focus:shadow-[3px_3px_0px_#84cc16] leading-relaxed"
                    />
                  </div>
                )}

                {/* 5. Email */}
                {dataType === 'email' && (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-black text-slate-800 mb-1" htmlFor="email-to">
                        البريد الإلكتروني المستلم:
                      </label>
                      <input
                        type="email"
                        id="email-to"
                        value={emailData.to}
                        onChange={(e) => setEmailData({ ...emailData, to: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-white border-2 border-slate-900 rounded-xl text-slate-900 font-bold text-sm font-mono shadow-[2px_2px_0px_#171717] focus:outline-none focus:shadow-[3px_3px_0px_#84cc16]"
                        dir="ltr"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-slate-800 mb-1" htmlFor="email-subject">
                        موضوع الرسالة:
                      </label>
                      <input
                        type="text"
                        id="email-subject"
                        value={emailData.subject}
                        onChange={(e) => setEmailData({ ...emailData, subject: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-white border-2 border-slate-900 rounded-xl text-slate-900 font-bold text-sm shadow-[2px_2px_0px_#171717] focus:outline-none focus:shadow-[3px_3px_0px_#84cc16]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-slate-800 mb-1" htmlFor="email-body">
                        نص الرسالة:
                      </label>
                      <textarea
                        id="email-body"
                        rows={3}
                        value={emailData.body}
                        onChange={(e) => setEmailData({ ...emailData, body: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-white border-2 border-slate-900 rounded-xl text-slate-900 font-bold text-sm shadow-[2px_2px_0px_#171717] focus:outline-none focus:shadow-[3px_3px_0px_#84cc16]"
                      />
                    </div>
                  </div>
                )}

                {/* 6. SMS */}
                {dataType === 'sms' && (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-black text-slate-800 mb-1" htmlFor="sms-phone">
                        رقم الهاتف المستلم:
                      </label>
                      <input
                        type="tel"
                        id="sms-phone"
                        value={smsData.phone}
                        onChange={(e) => setSmsData({ ...smsData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-white border-2 border-slate-900 rounded-xl text-slate-900 font-bold text-sm font-mono shadow-[2px_2px_0px_#171717] focus:outline-none focus:shadow-[3px_3px_0px_#84cc16]"
                        dir="ltr"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-slate-800 mb-1" htmlFor="sms-msg">
                        نص الرسالة القصيرة:
                      </label>
                      <textarea
                        id="sms-msg"
                        rows={3}
                        value={smsData.message}
                        onChange={(e) => setSmsData({ ...smsData, message: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-white border-2 border-slate-900 rounded-xl text-slate-900 font-bold text-sm shadow-[2px_2px_0px_#171717] focus:outline-none focus:shadow-[3px_3px_0px_#84cc16]"
                      />
                    </div>
                  </div>
                )}

                {/* 7. Phone */}
                {dataType === 'phone' && (
                  <div className="space-y-3">
                    <label className="block text-xs font-black uppercase text-slate-800" htmlFor="phone-input">
                      رقم الهاتف للاتصال المباشر:
                    </label>
                    <input
                      type="tel"
                      id="phone-input"
                      value={phoneInput}
                      onChange={(e) => setPhoneInput(e.target.value)}
                      placeholder="+966500000000"
                      className="w-full px-4 py-3 bg-white border-2 border-slate-900 rounded-xl text-slate-900 font-bold text-sm font-mono shadow-[2px_2px_0px_#171717] focus:outline-none focus:shadow-[3px_3px_0px_#84cc16]"
                      dir="ltr"
                    />
                  </div>
                )}

                {/* 8. Location */}
                {dataType === 'location' && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-black text-slate-800 mb-1" htmlFor="loc-lat">
                          خط العرض (Latitude):
                        </label>
                        <input
                          type="text"
                          id="loc-lat"
                          value={locationData.lat}
                          onChange={(e) => setLocationData({ ...locationData, lat: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-white border-2 border-slate-900 rounded-xl text-slate-900 font-bold text-sm font-mono shadow-[2px_2px_0px_#171717] focus:outline-none focus:shadow-[3px_3px_0px_#84cc16]"
                          dir="ltr"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-black text-slate-800 mb-1" htmlFor="loc-lng">
                          خط الطول (Longitude):
                        </label>
                        <input
                          type="text"
                          id="loc-lng"
                          value={locationData.lng}
                          onChange={(e) => setLocationData({ ...locationData, lng: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-white border-2 border-slate-900 rounded-xl text-slate-900 font-bold text-sm font-mono shadow-[2px_2px_0px_#171717] focus:outline-none focus:shadow-[3px_3px_0px_#84cc16]"
                          dir="ltr"
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        if (navigator.geolocation) {
                          navigator.geolocation.getCurrentPosition((pos) => {
                            setLocationData({
                              ...locationData,
                              lat: pos.coords.latitude.toFixed(6),
                              lng: pos.coords.longitude.toFixed(6),
                            });
                          });
                        }
                      }}
                      className="text-xs text-slate-900 hover:text-lime-700 flex items-center gap-1.5 font-black underline pt-1"
                    >
                      <MapPin className="w-3.5 h-3.5 text-lime-600" />
                      <span>جلب موقعي الحالي تلقائياً</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: STYLES & COLORS */}
          {activeTab === 'style' && (
            <div className="space-y-6 brutalist-card bg-white p-6 sm:p-8 rounded-2xl">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900">ثانياً. تخصيص النمط والألوان</h2>
                <div className="h-[3px] flex-1 bg-slate-900"></div>
              </div>

              {/* Dots Style */}
              <div className="space-y-3">
                <label className="block text-xs font-black uppercase tracking-wider text-slate-800">
                  شكل النقاط الداخلية (Dots Pattern):
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
                  {[
                    { id: 'rounded', label: 'دائري ناعم' },
                    { id: 'dots', label: 'نقاط' },
                    { id: 'classy', label: 'كلاسيكي' },
                    { id: 'classy-rounded', label: 'كلاسيكي مدور' },
                    { id: 'square', label: 'مربعات' },
                    { id: 'extra-rounded', label: 'مستدير كامل' },
                  ].map((style) => (
                    <button
                      key={style.id}
                      type="button"
                      onClick={() => setDotStyle(style.id as DotType)}
                      className={`p-3 rounded-xl border-2 border-slate-900 text-xs font-black transition cursor-pointer ${
                        dotStyle === style.id
                          ? 'bg-lime-400 text-slate-900 shadow-[3px_3px_0px_#171717] -translate-y-0.5'
                          : 'bg-white text-slate-700 shadow-[2px_2px_0px_#171717] hover:bg-slate-100'
                      }`}
                    >
                      {style.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dots Color / Gradient */}
              <div className="pt-4 border-t-2 border-slate-900 space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-black uppercase text-slate-800">ألوان النقاط والتدرج (Color / Gradient):</label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setUseGradient(false)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-black border-2 border-slate-900 transition cursor-pointer ${
                        !useGradient ? 'bg-lime-400 text-slate-900 shadow-[2px_2px_0px_#171717]' : 'bg-white text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      لون موحد
                    </button>
                    <button
                      type="button"
                      onClick={() => setUseGradient(true)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-black border-2 border-slate-900 transition cursor-pointer ${
                        useGradient ? 'bg-lime-400 text-slate-900 shadow-[2px_2px_0px_#171717]' : 'bg-white text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      تدرج لوني
                    </button>
                  </div>
                </div>

                {!useGradient ? (
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={singleColor}
                      onChange={(e) => setSingleColor(e.target.value)}
                      className="w-12 h-10 rounded-xl bg-white border-2 border-slate-900 shadow-[2px_2px_0px_#171717] cursor-pointer"
                    />
                    <input
                      type="text"
                      value={singleColor}
                      onChange={(e) => setSingleColor(e.target.value)}
                      className="w-32 px-3 py-2 bg-white border-2 border-slate-900 rounded-xl text-slate-900 text-xs font-mono font-bold shadow-[2px_2px_0px_#171717]"
                      dir="ltr"
                    />
                    {/* Quick Swatches */}
                    <div className="flex items-center gap-2 flex-wrap">
                      {['#171717', '#84cc16', '#2563eb', '#dc2626', '#9333ea', '#d97706'].map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => setSingleColor(c)}
                          style={{ backgroundColor: c }}
                          className="w-7 h-7 rounded-full border-2 border-slate-900 shadow-[1px_1px_0px_#171717] hover:scale-110 transition cursor-pointer"
                          title={c}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 p-5 rounded-xl bg-lime-50/70 border-2 border-slate-900 shadow-[3px_3px_0px_#171717]">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-slate-800 mb-1.5 font-black">اللون الأول (Start Color):</label>
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            value={gradientColor1}
                            onChange={(e) => setGradientColor1(e.target.value)}
                            className="w-10 h-10 rounded-lg bg-white border-2 border-slate-900 cursor-pointer"
                          />
                          <input
                            type="text"
                            value={gradientColor1}
                            onChange={(e) => setGradientColor1(e.target.value)}
                            className="w-full px-2.5 py-2 bg-white border-2 border-slate-900 rounded-lg text-slate-900 text-xs font-mono font-bold"
                            dir="ltr"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs text-slate-800 mb-1.5 font-black">اللون الثاني (End Color):</label>
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            value={gradientColor2}
                            onChange={(e) => setGradientColor2(e.target.value)}
                            className="w-10 h-10 rounded-lg bg-white border-2 border-slate-900 cursor-pointer"
                          />
                          <input
                            type="text"
                            value={gradientColor2}
                            onChange={(e) => setGradientColor2(e.target.value)}
                            className="w-full px-2.5 py-2 bg-white border-2 border-slate-900 rounded-lg text-slate-900 text-xs font-mono font-bold"
                            dir="ltr"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                      <div>
                        <label className="block text-xs text-slate-800 mb-1.5 font-black">نوع التدرج:</label>
                        <select
                          value={gradientType}
                          onChange={(e) => setGradientType(e.target.value as 'linear' | 'radial')}
                          className="w-full px-3 py-2 bg-white border-2 border-slate-900 rounded-xl text-slate-900 text-xs font-bold shadow-[2px_2px_0px_#171717]"
                        >
                          <option value="linear">خطي (Linear)</option>
                          <option value="radial">دائري / شعاعي (Radial)</option>
                        </select>
                      </div>

                      <div>
                        <div className="flex items-center justify-between text-xs text-slate-800 mb-1 font-black">
                          <span>زاوية التدوير:</span>
                          <span className="font-mono bg-slate-900 text-white px-2 py-0.5 rounded text-[11px]">{gradientRotation}°</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="360"
                          step="15"
                          value={gradientRotation}
                          onChange={(e) => setGradientRotation(Number(e.target.value))}
                          className="w-full h-3 bg-slate-200 rounded-full appearance-none cursor-pointer accent-lime-500 border border-slate-900"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Corners & Eyes Customization */}
              <div className="pt-4 border-t-2 border-slate-900 space-y-4">
                <label className="block text-xs font-black uppercase text-slate-800">
                  تخصيص زوايا التحديد (Corner Eyes & Dots):
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Corner Square */}
                  <div className="p-4 rounded-xl bg-white border-2 border-slate-900 shadow-[3px_3px_0px_#171717] space-y-3">
                    <span className="text-xs font-black text-slate-800">مربع الزاوية الخارجي (Corner Square):</span>
                    <div className="grid grid-cols-3 gap-1.5">
                      {[
                        { id: 'square', label: 'مربع' },
                        { id: 'extra-rounded', label: 'مستدير' },
                        { id: 'dot', label: 'دائري' },
                      ].map((c) => (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => setCornerSquareStyle(c.id as CornerSquareType)}
                          className={`py-1.5 px-2 rounded-lg text-xs font-black border-2 border-slate-900 transition cursor-pointer ${
                            cornerSquareStyle === c.id ? 'bg-lime-400 text-slate-900 shadow-[2px_2px_0px_#171717]' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          {c.label}
                        </button>
                      ))}
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={cornerSquareColor}
                        onChange={(e) => setCornerSquareColor(e.target.value)}
                        className="w-8 h-8 rounded bg-white border-2 border-slate-900 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={cornerSquareColor}
                        onChange={(e) => setCornerSquareColor(e.target.value)}
                        className="w-28 px-2 py-1 bg-white border-2 border-slate-900 rounded text-xs font-mono font-bold text-slate-900"
                        dir="ltr"
                      />
                    </div>
                  </div>

                  {/* Corner Dot */}
                  <div className="p-4 rounded-xl bg-white border-2 border-slate-900 shadow-[3px_3px_0px_#171717] space-y-3">
                    <span className="text-xs font-black text-slate-800">نقطة الزاوية الداخلية (Corner Dot):</span>
                    <div className="grid grid-cols-2 gap-1.5">
                      {[
                        { id: 'dot', label: 'نقطة دائرية' },
                        { id: 'square', label: 'مربع' },
                      ].map((c) => (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => setCornerDotStyle(c.id as CornerDotType)}
                          className={`py-1.5 px-2 rounded-lg text-xs font-black border-2 border-slate-900 transition cursor-pointer ${
                            cornerDotStyle === c.id ? 'bg-lime-400 text-slate-900 shadow-[2px_2px_0px_#171717]' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          {c.label}
                        </button>
                      ))}
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={cornerDotColor}
                        onChange={(e) => setCornerDotColor(e.target.value)}
                        className="w-8 h-8 rounded bg-white border-2 border-slate-900 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={cornerDotColor}
                        onChange={(e) => setCornerDotColor(e.target.value)}
                        className="w-28 px-2 py-1 bg-white border-2 border-slate-900 rounded text-xs font-mono font-bold text-slate-900"
                        dir="ltr"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Background & Margins */}
              <div className="pt-4 border-t-2 border-slate-900 space-y-4">
                <label className="block text-xs font-black uppercase text-slate-800">الخلفية وهوامش الأمان (Background & Margins):</label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                  <div className="flex items-center gap-4">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isTransparentBg}
                        onChange={(e) => setIsTransparentBg(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-lime-500 border border-slate-900"></div>
                    </label>
                    <span className="text-xs text-slate-900 font-black">خلفية شفافة (Transparent)</span>
                  </div>

                  {!isTransparentBg && (
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                        className="w-9 h-9 rounded-lg bg-white border-2 border-slate-900 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                        className="w-28 px-2.5 py-1.5 bg-white border-2 border-slate-900 rounded-lg text-xs font-mono font-bold text-slate-900"
                        dir="ltr"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs text-slate-800 mb-1 font-black">
                    <span>الهامش الخارجي (Quiet Zone Margin):</span>
                    <span className="font-mono bg-slate-900 text-white px-2 py-0.5 rounded text-[11px]">{quietZone}px</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="40"
                    value={quietZone}
                    onChange={(e) => setQuietZone(Number(e.target.value))}
                    className="w-full h-3 bg-slate-200 rounded-full appearance-none cursor-pointer accent-lime-500 border border-slate-900"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: LOGO & CENTER IMAGE */}
          {activeTab === 'logo' && (
            <div className="space-y-6 brutalist-card bg-white p-6 sm:p-8 rounded-2xl">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 flex items-center gap-2">
                  <ImageIcon className="w-6 h-6 text-slate-900" />
                  <span>ثالثاً. إضافة شعار في المنتصف</span>
                </h2>
                <div className="h-[3px] flex-1 bg-slate-900"></div>
              </div>
              <p className="text-xs font-bold text-slate-700">
                يمكنك رفع شعار شركتك أو اختيار أحد الشعارات الشائعة الجاهزة أدناه. يتم ضبط نسبة تصحيح الأخطاء تلقائياً لضمان سهولة المسح.
              </p>

              {/* Upload Dropzone */}
              <div className="border-3 border-dashed border-slate-900 hover:border-lime-500 rounded-2xl p-6 text-center transition bg-lime-50/40 hover:bg-lime-100/50 cursor-pointer shadow-[3px_3px_0px_#171717]">
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/svg+xml,image/webp"
                  onChange={handleLogoUpload}
                  className="hidden"
                  id="logo-file-input"
                />
                <label htmlFor="logo-file-input" className="cursor-pointer space-y-3 block">
                  <div className="w-14 h-14 rounded-2xl bg-white text-slate-900 flex items-center justify-center mx-auto border-2 border-slate-900 shadow-[3px_3px_0px_#171717]">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-sm font-black text-slate-900 underline block">اضغط لاختيار صورة الشعار</span>
                    <p className="text-xs text-slate-600 font-bold">يدعم صيغ PNG, JPG, SVG, WebP (بحد أقصى 5 ميجابايت)</p>
                  </div>
                </label>
              </div>

              {/* Current Logo Preview & Clear */}
              {logoImage && (
                <div className="p-4 rounded-xl bg-lime-100 border-2 border-slate-900 shadow-[3px_3px_0px_#171717] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={logoImage}
                      alt="Logo Preview"
                      className="w-12 h-12 object-contain rounded-xl bg-white p-1 shadow-[2px_2px_0px_#171717] border-2 border-slate-900"
                    />
                    <div>
                      <span className="text-xs font-black text-slate-900 block">الشعار مفعّل حالياً</span>
                      <p className="text-[11px] text-slate-700 font-bold">تم رفع مستوى تصحيح الخطأ تلقائياً إلى عالي (High)</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setLogoImage(null)}
                    className="p-2 text-slate-900 bg-rose-300 hover:bg-rose-400 border-2 border-slate-900 rounded-xl shadow-[2px_2px_0px_#171717] transition cursor-pointer"
                    title="حذف الشعار"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              )}

              {/* Preset Logos */}
              <div className="space-y-3 pt-2">
                <label className="block text-xs font-black uppercase text-slate-800">أيقونات وشعارات شائعة جاهزة:</label>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2.5">
                  {PRESET_LOGOS.map((item) => (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => {
                        setLogoImage(item.icon);
                        if (errorCorrection === 'L' || errorCorrection === 'M') {
                          setErrorCorrection('H');
                        }
                      }}
                      className="p-2.5 rounded-xl bg-white hover:bg-lime-200 border-2 border-slate-900 shadow-[2px_2px_0px_#171717] hover:shadow-[3px_3px_0px_#171717] hover:-translate-y-0.5 flex flex-col items-center gap-1.5 transition group cursor-pointer"
                      title={item.name}
                    >
                      <img src={item.icon} alt={item.name} className="w-6 h-6 object-contain group-hover:scale-110 transition" />
                      <span className="text-[10px] text-slate-900 font-black">{item.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Logo Sliders */}
              {logoImage && (
                <div className="pt-4 border-t-2 border-slate-900 space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-800 mb-1 font-black">
                      <span>حجم الشعار بالنسبة للرمز:</span>
                      <span className="font-mono bg-slate-900 text-white px-2 py-0.5 rounded text-[11px]">{Math.round(logoSize * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0.15"
                      max="0.40"
                      step="0.01"
                      value={logoSize}
                      onChange={(e) => setLogoSize(Number(e.target.value))}
                      className="w-full h-3 bg-slate-200 rounded-full appearance-none cursor-pointer accent-lime-500 border border-slate-900"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-800 mb-1 font-black">
                      <span>هامش التفريغ حول الشعار:</span>
                      <span className="font-mono bg-slate-900 text-white px-2 py-0.5 rounded text-[11px]">{logoMargin}px</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="20"
                      value={logoMargin}
                      onChange={(e) => setLogoMargin(Number(e.target.value))}
                      className="w-full h-3 bg-slate-200 rounded-full appearance-none cursor-pointer accent-lime-500 border border-slate-900"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={clearLogoBackground}
                        onChange={(e) => setClearLogoBackground(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-lime-500 border border-slate-900"></div>
                    </label>
                    <span className="text-xs text-slate-900 font-black">إخفاء النقاط خلف الشعار (حماية وضوح الأيقونة)</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: PRESETS */}
          {activeTab === 'presets' && (
            <div className="space-y-6 brutalist-card bg-white p-6 sm:p-8 rounded-2xl">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900">رابعاً. قوالب وتنسيقات جاهزة</h2>
                <div className="h-[3px] flex-1 bg-slate-900"></div>
              </div>
              <p className="text-xs font-bold text-slate-700">اختر تصميماً متناسقاً تم اختياره بعناية ليتناسب مع هويتك البصرية بضغطة زر واحدة.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {PRESET_THEMES.map((theme) => (
                  <button
                    key={theme.name}
                    type="button"
                    onClick={() => applyPreset(theme)}
                    className="p-4 rounded-xl bg-white hover:bg-lime-50 border-2 border-slate-900 shadow-[3px_3px_0px_#171717] hover:shadow-[5px_5px_0px_#171717] hover:-translate-y-0.5 text-right flex items-center justify-between group transition cursor-pointer"
                  >
                    <div className="space-y-1">
                      <span className="text-sm font-black text-slate-900 group-hover:text-lime-700 transition">
                        {theme.name}
                      </span>
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-600 font-bold">
                        <span>النمط: {theme.dotType}</span>
                        <span>•</span>
                        <span>{theme.gradient ? 'تدرج لوني' : 'لون موحد'}</span>
                      </div>
                    </div>

                    <div className="w-11 h-11 rounded-xl border-2 border-slate-900 flex items-center justify-center p-1 shadow-[2px_2px_0px_#171717]" style={{ backgroundColor: theme.bgColor }}>
                      <div
                        className="w-full h-full rounded-lg"
                        style={{
                          backgroundColor: theme.gradient ? theme.gradient.color1 : theme.dotColor,
                          background: theme.gradient
                            ? `linear-gradient(${theme.gradient.rotation}deg, ${theme.gradient.color1}, ${theme.gradient.color2})`
                            : theme.dotColor,
                        }}
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Sticky Live Preview & Export Hub (5 Cols) */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-6">
          <div className="brutalist-card bg-white p-6 sm:p-7 rounded-2xl space-y-6">
            {/* Header of Preview Box */}
            <div className="flex items-center justify-between border-b-2 border-slate-900 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-lime-400 flex items-center justify-center text-slate-900 border-2 border-slate-900 shadow-[2px_2px_0px_#171717]">
                  <Eye className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-base font-black text-slate-900 block leading-tight">المعاينة المباشرة</span>
                  <span className="text-[11px] text-slate-500 font-mono font-bold">Live Preview</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-lime-200 border-2 border-slate-900 text-slate-900 text-xs font-black shadow-[2px_2px_0px_#171717]">
                <span className="w-2 h-2 rounded-full bg-slate-900 animate-ping" />
                <span>تحديث فوري</span>
              </div>
            </div>

            {/* QR Visual Stage */}
            <div className="flex flex-col items-center justify-center">
              <div
                id="qr-preview-wrapper"
                className={`p-5 sm:p-6 rounded-2xl transition-all flex items-center justify-center relative border-2 border-slate-900 shadow-[4px_4px_0px_#171717] ${
                  isTransparentBg ? 'bg-checkerboard-dark' : 'bg-slate-50'
                }`}
              >
                <div
                  ref={qrContainerRef}
                  id="qr-code-canvas-container"
                  className="flex items-center justify-center max-w-full overflow-hidden transition-transform duration-300"
                />
              </div>

              {/* Format & Reliability Meta */}
              <div className="mt-4 flex items-center justify-between w-full text-xs text-slate-700 px-1 font-bold">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-lime-600 flex-shrink-0" />
                  <span>دقة المسح: {errorCorrection === 'H' ? 'فائقة (30%)' : errorCorrection === 'Q' ? 'عالية (25%)' : 'قياسية'}</span>
                </span>
                <span className="font-mono text-xs text-slate-900 font-black px-2.5 py-0.5 rounded bg-lime-300 border border-slate-900 shadow-[1px_1px_0px_#171717] truncate max-w-[160px]" dir="ltr">
                  {dataType.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Error Correction Setting */}
            <div className="space-y-2.5 pt-4 border-t-2 border-slate-900">
              <div className="flex items-center justify-between text-xs text-slate-900 font-black">
                <span>مستوى تصحيح الأخطاء (Error Correction):</span>
                <span className="bg-slate-900 text-white px-2 py-0.5 rounded font-mono text-[11px]">{errorCorrection} ({errorCorrection === 'L' ? '7%' : errorCorrection === 'M' ? '15%' : errorCorrection === 'Q' ? '25%' : '30%'})</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { level: 'L', label: 'منخفض L' },
                  { level: 'M', label: 'متوسط M' },
                  { level: 'Q', label: 'مرتفع Q' },
                  { level: 'H', label: 'فائق H' },
                ].map((item) => (
                  <button
                    key={item.level}
                    type="button"
                    onClick={() => setErrorCorrection(item.level as ErrorCorrectionLevel)}
                    className={`py-2 px-2 rounded-xl text-xs font-black border-2 border-slate-900 transition cursor-pointer ${
                      errorCorrection === item.level
                        ? 'bg-lime-400 text-slate-900 shadow-[3px_3px_0px_#171717] -translate-y-0.5'
                        : 'bg-white text-slate-700 shadow-[1px_1px_0px_#171717] hover:bg-slate-100'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Export Settings */}
            <div className="space-y-4 pt-4 border-t-2 border-slate-900">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-black uppercase text-slate-800 mb-1.5">صيغة التنزيل:</label>
                  <select
                    value={exportFormat}
                    onChange={(e) => setExportFormat(e.target.value as ExportFormat)}
                    className="w-full px-3 py-2 bg-white border-2 border-slate-900 rounded-xl text-slate-900 text-xs font-bold shadow-[2px_2px_0px_#171717] focus:outline-none focus:shadow-[3px_3px_0px_#84cc16]"
                  >
                    <option value="png">PNG (صورة عالية الجودة)</option>
                    <option value="svg">SVG (فيكتور متجهي)</option>
                    <option value="jpeg">JPEG (صورة قياسية)</option>
                    <option value="webp">WebP (حديث للويب)</option>
                  </select>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-black uppercase text-slate-800">أبعاد ودقة الصورة:</label>
                    <span className="text-[10px] font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-500">
                      دقة غير محدودة مجاناً
                    </span>
                  </div>
                  <select
                    value={exportResolution}
                    onChange={(e) => handleSelectResolution(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-white border-2 border-slate-900 rounded-xl text-slate-900 text-xs font-bold font-mono shadow-[2px_2px_0px_#171717] focus:outline-none focus:shadow-[3px_3px_0px_#84cc16]"
                    dir="ltr"
                  >
                    <option value="512">512 × 512 px (للمواقع وشبكات التواصل)</option>
                    <option value="1024">1024 × 1024 px (HD عالي الوضوح للشاشات)</option>
                    <option value="2048">2048 × 2048 px (2K مناسب للمطبوعات والبطاقات)</option>
                    <option value="4096">4096 × 4096 px (4K Ultra Print للطباعة الضخمة واللافتات)</option>
                  </select>
                </div>
              </div>

              {/* Quick Resolution Buttons */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between text-[11px] font-black text-slate-700">
                  <span>اختيار سريع للدقة:</span>
                  <span className="text-[10px] text-slate-500 font-bold">تصدير بدقة فائقة تصل إلى 4096px</span>
                </div>
                <div className="grid grid-cols-4 gap-1.5">
                  {[
                    { res: 512, label: '512px', sub: 'ويب' },
                    { res: 1024, label: '1024px', sub: 'HD' },
                    { res: 2048, label: '2K', sub: '2048px' },
                    { res: 4096, label: '4K', sub: '4096px' },
                  ].map((item) => {
                    const isSelected = exportResolution === item.res;
                    return (
                      <button
                        key={item.res}
                        type="button"
                        onClick={() => handleSelectResolution(item.res)}
                        className={`p-2 rounded-xl border-2 border-slate-900 text-center transition cursor-pointer flex flex-col items-center justify-center relative ${
                          isSelected
                            ? 'bg-lime-400 text-slate-950 shadow-[2px_2px_0px_#171717] -translate-y-0.5'
                            : 'bg-white text-slate-800 shadow-[1px_1px_0px_#171717] hover:bg-slate-50'
                        }`}
                        title={`دقة ${item.label}`}
                      >
                        <div className="font-black text-xs">
                          <span>{item.label}</span>
                        </div>
                        <span className="text-[10px] text-slate-600 font-bold">{item.sub}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Main Action Buttons */}
              <div className="space-y-3 pt-2">
                <button
                  type="button"
                  onClick={executeActualDownload}
                  disabled={isDownloading}
                  className="w-full py-4 px-5 rounded-xl bg-lime-400 hover:bg-lime-300 text-slate-900 border-2 border-slate-900 font-black text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-[4px_4px_0px_#171717] hover:shadow-[6px_6px_0px_#171717] active:shadow-[1px_1px_0px_#171717] active:translate-x-0.5 active:translate-y-0.5 transition-all disabled:opacity-50 cursor-pointer"
                  id="main-download-btn"
                >
                  <Download className="w-5 h-5" />
                  <span>{isDownloading ? 'جارٍ المعالجة والتصدير...' : `تحميل رمز QR بصيغة ${exportFormat.toUpperCase()} (${exportResolution}px)`}</span>
                </button>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={handleCopyImage}
                    className="py-2.5 px-3 rounded-xl bg-white hover:bg-slate-100 border-2 border-slate-900 text-slate-900 text-xs font-black shadow-[2px_2px_0px_#171717] flex items-center justify-center gap-2 transition cursor-pointer"
                    id="copy-to-clipboard-btn"
                  >
                    {isCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-900" />}
                    <span>{isCopied ? 'تم النسخ للحافظة!' : 'نسخ الصورة'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handlePrint}
                    className="py-2.5 px-3 rounded-xl bg-white hover:bg-slate-100 border-2 border-slate-900 text-slate-900 text-xs font-black shadow-[2px_2px_0px_#171717] flex items-center justify-center gap-2 transition cursor-pointer"
                    id="print-qr-btn"
                  >
                    <Printer className="w-4 h-4 text-slate-900" />
                    <span>طباعة مباشرة</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Showcase & Information Section */}
      <section className="pt-6 pb-2 border-t-2 border-slate-900 space-y-6" id="features-showcase">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            أداة متكاملة لإنشاء رموز الاستجابة السريعة
          </h2>
          <p className="text-xs sm:text-sm font-bold text-slate-600 leading-relaxed">
            صُممت لتلبي احتياجات الأفراد، أصحاب الأعمال، المصممين، والمطورين بدون قيود أو رسوم
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border-2 border-slate-900 rounded-2xl p-5 shadow-[4px_4px_0px_#171717] space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-lime-300 border-2 border-slate-900 flex items-center justify-center shadow-[2px_2px_0px_#171717]">
              <Sparkles className="w-5 h-5 text-slate-950" />
            </div>
            <h3 className="text-sm font-black text-slate-900">دقة 4K فائقة للطباعة</h3>
            <p className="text-xs font-bold text-slate-600 leading-relaxed">
              تصدير عالي الدقة يصل إلى 4096 بكسل وبصيغة SVG المتجهية، مما يجعلها مثالية للطباعة على اللافتات واللوحات الكبيرة دون أي تشويش.
            </p>
          </div>

          <div className="bg-white border-2 border-slate-900 rounded-2xl p-5 shadow-[4px_4px_0px_#171717] space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-300 border-2 border-slate-900 flex items-center justify-center shadow-[2px_2px_0px_#171717]">
              <Shield className="w-5 h-5 text-slate-950" />
            </div>
            <h3 className="text-sm font-black text-slate-900">خصوصية وأمان 100%</h3>
            <p className="text-xs font-bold text-slate-600 leading-relaxed">
              تتم عملية التوليد والتشفير بالكامل داخل متصفحك مباشرة. بياناتك لا تُرسل ولا تُخزن على أي خوادم خارجية.
            </p>
          </div>

          <div className="bg-white border-2 border-slate-900 rounded-2xl p-5 shadow-[4px_4px_0px_#171717] space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-200 border-2 border-slate-900 flex items-center justify-center shadow-[2px_2px_0px_#171717]">
              <Palette className="w-5 h-5 text-slate-950" />
            </div>
            <h3 className="text-sm font-black text-slate-900">تخصيص فني احترافي</h3>
            <p className="text-xs font-bold text-slate-600 leading-relaxed">
              تحكم دقيق بأنماط النقاط والزوايا، التدرجات اللونية الخطية والدائرية، وإضافة شعارك أو أيقونة علامتك التجارية في المنتصف بسهولة.
            </p>
          </div>

          <div className="bg-white border-2 border-slate-900 rounded-2xl p-5 shadow-[4px_4px_0px_#171717] space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-rose-200 border-2 border-slate-900 flex items-center justify-center shadow-[2px_2px_0px_#171717]">
              <FileCheck className="w-5 h-5 text-slate-950" />
            </div>
            <h3 className="text-sm font-black text-slate-900">دعم كافة أنواع المحتوى</h3>
            <p className="text-xs font-bold text-slate-600 leading-relaxed">
              توليد روابط الويب، شبكات الواي فاي المشفرة، بطاقات الأعمال الرقمية vCard، رسائل WhatsApp و SMS والبريد والمواقع الجغرافية.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-8 pb-12 border-t-2 border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-700 text-xs font-bold">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-lime-400 border border-slate-900 flex items-center justify-center font-black text-[11px] text-slate-950">
            QR
          </div>
          <span className="font-black text-slate-900">مولّد رموز QR الاحترافي</span>
          <span className="text-slate-400">|</span>
          <span>جميع الحقوق محفوظة · متاح مجاناً للجميع</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleShareApp}
            className="hover:text-slate-950 underline cursor-pointer"
          >
            مشاركة الرابط
          </button>
          <span className="text-slate-400">·</span>
          <button
            type="button"
            onClick={() => setShowHistoryModal(true)}
            className="hover:text-slate-950 underline cursor-pointer"
          >
            سجل التنزيلات
          </button>
          <span className="text-slate-400">·</span>
          <button
            type="button"
            onClick={handleReset}
            className="hover:text-slate-950 underline cursor-pointer"
          >
            إعادة تعيين
          </button>
        </div>
      </footer>

      {/* Hidden Print Area */}
      <div id="qr-print-area" className="hidden print:flex flex-col items-center justify-center p-8 text-black bg-white">
        <h2 className="text-2xl font-black mb-4">رمز الاستجابة السريعة (QR Code)</h2>
        <div className="p-4 border-4 border-black rounded-xl">
          {/* Print will capture canvas elements natively */}
        </div>
        <p className="mt-4 text-sm font-bold text-gray-800">امسح الرمز بواسطة كاميرا الهاتف الذكي</p>
      </div>

      {/* Download History Modal */}
      {showHistoryModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto" id="history-modal-overlay">
          <div className="bg-white border-3 border-slate-900 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-[8px_8px_0px_#171717] overflow-hidden my-auto" id="history-modal-container">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b-2 border-slate-900 flex items-center justify-between bg-lime-300">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-900 border-2 border-slate-900 shadow-[2px_2px_0px_#171717]">
                  <History className="w-5 h-5 text-slate-900" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base sm:text-lg font-black text-slate-900">سجل التحميلات والرموز المحفوظة</h3>
                    <span className="bg-white text-slate-900 px-2 py-0.5 rounded-lg border-2 border-slate-900 text-xs font-black shadow-[1px_1px_0px_#171717]">
                      {history.length} رمز
                    </span>
                  </div>
                  <p className="text-xs font-bold text-slate-800">يتم حفظ جميع الرموز التي تم تنزيلها تلقائياً مع كامل إعداداتها وتصميمها للرجوع إليها بأي وقت</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowHistoryModal(false)}
                className="w-9 h-9 rounded-xl bg-white border-2 border-slate-900 shadow-[2px_2px_0px_#171717] text-slate-900 font-black flex items-center justify-center hover:bg-rose-300 transition cursor-pointer"
                id="close-history-modal-btn"
              >
                ✕
              </button>
            </div>

            {/* Filter & Search Bar */}
            <div className="p-4 border-b-2 border-slate-900 bg-slate-50 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={historySearchQuery}
                  onChange={(e) => setHistorySearchQuery(e.target.value)}
                  placeholder="ابحث في السجل بالعنوان أو المحتوى..."
                  className="w-full pr-9 pl-3 py-2 bg-white border-2 border-slate-900 rounded-xl text-slate-900 text-xs font-bold shadow-[2px_2px_0px_#171717] focus:outline-none focus:shadow-[3px_3px_0px_#84cc16]"
                  id="history-search-input"
                />
              </div>

              {history.length > 0 && (
                <button
                  type="button"
                  onClick={clearAllHistory}
                  className="px-3 py-2 bg-rose-100 hover:bg-rose-200 text-rose-800 border-2 border-slate-900 rounded-xl text-xs font-black shadow-[2px_2px_0px_#171717] flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
                  id="clear-all-history-btn"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>مسح السجل بالكامل</span>
                </button>
              )}
            </div>

            {/* Type Filter Pills */}
            <div className="px-4 py-2.5 bg-white border-b-2 border-slate-900 flex items-center gap-2 overflow-x-auto text-xs no-scrollbar">
              <span className="font-black text-slate-700 shrink-0 ml-1">تصفية حسب:</span>
              {[
                { id: 'all', label: 'الكل' },
                { id: 'url', label: 'روابط' },
                { id: 'wifi', label: 'Wi-Fi' },
                { id: 'vcard', label: 'بطاقة عمل' },
                { id: 'text', label: 'نصوص' },
                { id: 'email', label: 'بريد' },
                { id: 'sms', label: 'رسائل SMS' },
                { id: 'phone', label: 'هاتف' },
                { id: 'location', label: 'مواقع' },
              ].map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setHistoryFilterType(f.id)}
                  className={`px-3 py-1 rounded-lg border-2 border-slate-900 text-xs font-black shrink-0 transition cursor-pointer ${
                    historyFilterType === f.id
                      ? 'bg-lime-400 text-slate-950 shadow-[2px_2px_0px_#171717]'
                      : 'bg-white text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* History List Content */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1 max-h-[60vh] space-y-4">
              {history.length === 0 ? (
                <div className="text-center py-12 px-4 border-3 border-dashed border-slate-300 rounded-2xl space-y-4 bg-slate-50">
                  <div className="w-16 h-16 rounded-2xl bg-white border-2 border-slate-900 shadow-[3px_3px_0px_#171717] flex items-center justify-center mx-auto text-slate-400">
                    <History className="w-8 h-8 text-slate-700" />
                  </div>
                  <div className="space-y-1 max-w-md mx-auto">
                    <h4 className="text-base font-black text-slate-900">سجل التحميلات فارغ حالياً</h4>
                    <p className="text-xs font-bold text-slate-600 leading-relaxed">
                      عندما تقوم بتنزيل أي رمز QR من المنشئ، سيتم أرشفته هنا تلقائياً مع كافة خيارات التخصيص والألوان لتتمكن من استعادته وإعادة تنزيله في أي وقت.
                    </p>
                  </div>
                </div>
              ) : (
                (() => {
                  const filtered = history.filter((item) => {
                    const matchesFilter = historyFilterType === 'all' || item.dataType === historyFilterType;
                    const matchesSearch =
                      !historySearchQuery ||
                      item.summary.toLowerCase().includes(historySearchQuery.toLowerCase()) ||
                      item.dataPayload.toLowerCase().includes(historySearchQuery.toLowerCase());
                    return matchesFilter && matchesSearch;
                  });

                  if (filtered.length === 0) {
                    return (
                      <div className="text-center py-10 text-slate-600 font-bold text-xs bg-slate-50 rounded-xl border-2 border-slate-200">
                        لا توجد نتائج مطابقة لبحثك أو للتصفية الحالية.
                      </div>
                    );
                  }

                  return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {filtered.map((item) => (
                        <div
                          key={item.id}
                          className="bg-white border-2 border-slate-900 rounded-xl p-4 shadow-[4px_4px_0px_#171717] hover:shadow-[6px_6px_0px_#171717] transition flex flex-col justify-between gap-3 relative group"
                        >
                          <div className="flex items-start gap-3">
                            {/* QR Thumbnail */}
                            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-slate-100 rounded-xl border-2 border-slate-900 p-1 flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#171717] overflow-hidden">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={item.previewImage}
                                alt={item.summary}
                                className="w-full h-full object-contain"
                              />
                            </div>

                            {/* Details */}
                            <div className="flex-1 min-w-0 space-y-1.5">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span className="px-2 py-0.5 bg-lime-200 text-slate-900 border border-slate-900 rounded-md text-[10px] font-black uppercase shadow-[1px_1px_0px_#171717]">
                                  {item.dataType}
                                </span>
                                <span className="px-1.5 py-0.5 bg-slate-100 text-slate-700 border border-slate-900 rounded-md text-[10px] font-bold font-mono">
                                  {item.exportResolution}px · {item.exportFormat.toUpperCase()}
                                </span>
                              </div>

                              <h4 className="text-xs sm:text-sm font-black text-slate-900 truncate" title={item.summary}>
                                {item.summary}
                              </h4>

                              <div className="flex items-center gap-1 text-[10px] font-bold text-slate-500">
                                <Clock className="w-3 h-3 text-slate-400" />
                                <span>{new Date(item.timestamp).toLocaleString('ar-SA', { dateStyle: 'short', timeStyle: 'short' })}</span>
                              </div>

                              <div className="bg-slate-50 p-1.5 rounded-lg border border-slate-200 flex items-center justify-between text-[11px] font-mono text-slate-600">
                                <span className="truncate max-w-[140px] sm:max-w-[180px]" dir="ltr">{item.dataPayload}</span>
                                <button
                                  type="button"
                                  onClick={(e) => copyHistoryPayload(item, e)}
                                  className="text-slate-700 hover:text-lime-700 p-1 font-bold cursor-pointer"
                                  title="نسخ المحتوى"
                                >
                                  {copiedHistoryId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Item Footer Buttons */}
                          <div className="pt-2 border-t border-slate-200 grid grid-cols-3 gap-2 text-xs font-black">
                            <button
                              type="button"
                              onClick={() => restoreFromHistory(item)}
                              className="py-1.5 px-2 bg-lime-400 hover:bg-lime-300 text-slate-950 border border-slate-900 rounded-lg text-[11px] shadow-[2px_2px_0px_#171717] hover:shadow-[3px_3px_0px_#171717] flex items-center justify-center gap-1 cursor-pointer"
                              title="استعادة كافة خيارات التصميم والمحتوى إلى المنشئ"
                            >
                              <RotateCcw className="w-3 h-3" />
                              <span>استعادة</span>
                            </button>

                            <button
                              type="button"
                              onClick={(e) => downloadHistoryItemDirect(item, e)}
                              className="py-1.5 px-2 bg-white hover:bg-slate-100 text-slate-900 border border-slate-900 rounded-lg text-[11px] shadow-[2px_2px_0px_#171717] flex items-center justify-center gap-1 cursor-pointer"
                              title="تنزيل الصورة فوراً"
                            >
                              <Download className="w-3 h-3" />
                              <span>تنزيل</span>
                            </button>

                            <button
                              type="button"
                              onClick={(e) => deleteHistoryItem(item.id, e)}
                              className="py-1.5 px-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-slate-900 rounded-lg text-[11px] shadow-[2px_2px_0px_#171717] flex items-center justify-center gap-1 cursor-pointer"
                              title="حذف من السجل"
                            >
                              <Trash2 className="w-3 h-3" />
                              <span>حذف</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })()
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t-2 border-slate-900 bg-slate-50 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-600">
                يتم حفظ السجل محلياً في متصفحك بأمان دون الحاجة إلى خادم.
              </span>
              <button
                type="button"
                onClick={() => setShowHistoryModal(false)}
                className="px-6 py-2 rounded-xl bg-lime-400 hover:bg-lime-300 text-slate-900 border-2 border-slate-900 text-xs font-black shadow-[3px_3px_0px_#171717] hover:shadow-[4px_4px_0px_#171717] transition cursor-pointer"
                id="close-history-footer-btn"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastNotification && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md bg-slate-900 text-white border-2 border-lime-400 rounded-2xl p-4 shadow-[6px_6px_0px_#84cc16] flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5 duration-300" id="toast-banner">
          <div className="w-8 h-8 rounded-xl bg-lime-400 text-slate-900 flex items-center justify-center font-black shrink-0">
            <Check className="w-5 h-5 text-slate-900" />
          </div>
          <p className="text-xs font-black text-slate-100 leading-relaxed">{toastNotification}</p>
        </div>
      )}
    </div>
  );
}
