export type Language = "fr" | "ar" | "en";

export interface Translations {
  nav: {
    home: string;
    howItWorks: string;
    about: string;
    contact: string;
    downloadApp: string;
    downloadCompact: string;
    lightMode: string;
    darkMode: string;
    themeAria: string;
    languageAria: string;
    openMenu: string;
    closeMenu: string;
  };
  hero: {
    kickerBrand: string;
    kickerDesc: string;
    titleStart: string;
    titleSimply: string;
    titleQuickly: string;
    description: string;
    ctaDownload: string;
    ctaDiscover: string;
    audFarmers: string;
    audCooperatives: string;
    audWilayas: string;
  };
  about: {
    kicker: string;
    kickerLong: string;
    title: string;
    description1: string;
    description2: string;
    mapSelectPrompt: string;
    reset: string;
    wilayaPrefix: string;
    availableNearby: string;
    rentIn: string;
    benefits: {
      b1Title: string;
      b1Desc: string;
      b2Title: string;
      b2Desc: string;
      b3Title: string;
      b3Desc: string;
    };
  };
  dropdown: {
    selectWilaya: string;
    searchPrompt: string;
    placeholder: string;
    clearSearch: string;
    noResults: string;
    showAll: string;
    clearSelected: string;
    wilayasCount: string;
  };
  categories: {
    badge: string;
    title: string;
    subtitle: string;
    filterAll: string;
    filterTractorsTillage: string;
    filterHarvestHay: string;
    filterSeedingCropCare: string;
    filterTransportIrrigation: string;
    modalCta: string;
    viewDetails: string;
    appCatalogNotice: string;
  };
  howItWorks: {
    badge: string;
    title: string;
    subtitle: string;
    interactiveNotice: string;
    steps: {
      s1Number: "01";
      s1Short: string;
      s1Title: string;
      s1Detail: string;
      s2Number: "02";
      s2Short: string;
      s2Title: string;
      s2Detail: string;
      s3Number: "03";
      s3Short: string;
      s3Title: string;
      s3Detail: string;
    };
    appMockup: {
      searchPlaceholder: string;
      availableNearby: string;
      filterDay: string;
      filterWeek: string;
      filterMonth: string;
      radius50km: string;
      instantBooking: string;
      directOwner: string;
      certifiedEquip: string;
      tapToRequest: string;
      statusActive: string;
    };
  };
  owners: {
    badge: string;
    title: string;
    description: string;
    ctaJoin: string;
    steps: {
      s1Step: "01";
      s1Title: string;
      s1Desc: string;
      s2Step: "02";
      s2Title: string;
      s2Desc: string;
      s3Step: "03";
      s3Title: string;
      s3Desc: string;
      s4Step: "04";
      s4Title: string;
      s4Desc: string;
    };
  };
  downloadCta: {
    badge: string;
    title: string;
    description: string;
    prelaunchNotice: string;
    googlePlayBtn: string;
    appStoreBtn: string;
    badgeImmediate: string;
    badgeNationwide: string;
    badgeSecure: string;
  };
  footer: {
    description: string;
    ecosystemNote: string;
    quickLinks: string;
    equipment: string;
    contactUs: string;
    rightsReserved: string;
    privacy: string;
    terms: string;
    sendInquiry: string;
    socialSoon: string;
  };
  modals: {
    close: string;
    prelaunchTitle: string;
    prelaunchSubtitle: string;
    notifyMePrompt: string;
    emailPlaceholder: string;
    phonePlaceholder: string;
    notifySuccess: string;
    submitNotify: string;
    inquiryOwnerTitle: string;
    inquiryOwnerSubtitle: string;
    inquiryContactTitle: string;
    inquiryContactSubtitle: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    phoneLabel: string;
    wilayaLabel: string;
    wilayaPlaceholder: string;
    equipLabel: string;
    equipPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    submitInquiry: string;
    submitting: string;
    inquirySuccessTitle: string;
    inquirySuccessMsg: string;
    privacyTitle: string;
    termsTitle: string;
    legalClose: string;
  };
}

export const TRANSLATIONS: Record<Language, Translations> = {
  fr: {
    nav: {
      home: "Accueil",
      howItWorks: "Comment ça marche",
      about: "À propos",
      contact: "Contact",
      downloadApp: "Télécharger l'application",
      downloadCompact: "Télécharger",
      lightMode: "Clair",
      darkMode: "Sombre",
      themeAria: "Mode d'affichage",
      languageAria: "Choisir la langue",
      openMenu: "Ouvrir le menu",
      closeMenu: "Fermer le menu",
    },
    hero: {
      kickerBrand: "HASAD · حصاد Algérie",
      kickerDesc: "Matériel agricole à la demande · Soft Click Technologies",
      titleStart: "Votre terre. Vos machines.",
      titleSimply: "Votre",
      titleQuickly: "récolte.",
      description:
        "La plateforme algérienne de location de matériel agricole à la demande. Demandez tracteurs, moissonneuses-batteuses ou semoirs et recevez directement les offres des propriétaires à proximité.",
      ctaDownload: "Télécharger l'application",
      ctaDiscover: "Découvrir HASAD",
      audFarmers: "Agriculteurs",
      audCooperatives: "Exploitations & Coopératives",
      audWilayas: "69 Wilayas",
    },
    about: {
      kicker: "À propos de HASAD",
      kickerLong: "À propos de HASAD · Système à la demande dans les 69 wilayas",
      title: "Le matériel agricole qu'il vous faut, à la demande.",
      description1:
        "Contrairement aux annonces classiques où l'on attend une réponse, HASAD fonctionne sur un modèle de demande et de mise en relation instantanée — vous formulez votre besoin et les propriétaires proches répondent avec leur disponibilité et leur tarif.",
      description2:
        "Inspiré du mot arabe حصاد (récolte) et développé par Soft Click Technologies, HASAD modernise l'accès aux machines agricoles partout en Algérie.",
      mapSelectPrompt: "Cliquez sur une wilaya pour explorer la couverture HASAD",
      reset: "Réinitialiser",
      wilayaPrefix: "WILAYA",
      availableNearby:
        "Tracteurs, moissonneuses et équipements disponibles à la demande sur HASAD.",
      rentIn: "Louer à",
      benefits: {
        b1Title: "Demandez",
        b1Desc:
          "Sélectionnez la machine agricole nécessaire, indiquez votre parcelle et envoyez votre demande en quelques secondes.",
        b2Title: "Comparez",
        b2Desc:
          "Les propriétaires proches reçoivent une notification instantanée et soumettent leur disponibilité, prix et photos.",
        b3Title: "Récoltez & Évaluez",
        b3Desc:
          "Choisissez la meilleure offre selon la distance, le tarif et les avis, puis notez l'expérience après la prestation.",
      },
    },
    dropdown: {
      selectWilaya: "Choisir une wilaya",
      searchPrompt: "Rechercher parmi les 69 wilayas agricoles d'Algérie",
      placeholder: "Nom, code (ex: 09, Blida, Sétif) ou région...",
      clearSearch: "Effacer la recherche",
      noResults: "Aucune wilaya ne correspond à",
      showAll: "Afficher toutes les wilayas",
      clearSelected: "Effacer la wilaya sélectionnée",
      wilayasCount: "69 wilayas disponibles",
    },
    categories: {
      badge: "Catégories d'équipements agricoles",
      title: "Toutes vos machines agricoles à portée de demande.",
      subtitle:
        "Des tracteurs 4x4 et moissonneuses-batteuses aux systèmes d'irrigation, demandez l'équipement adapté à chaque étape de votre saison.",
      filterAll: "Tous les équipements",
      filterTractorsTillage: "Tracteurs & Labour",
      filterHarvestHay: "Récolte & Fourrage",
      filterSeedingCropCare: "Semis & Traitement",
      filterTransportIrrigation: "Transport & Irrigation",
      modalCta: "Demander cet équipement",
      viewDetails: "Détails & usages",
      appCatalogNotice:
        "Équipements disponibles à la demande selon votre localisation sur l'application HASAD.",
    },
    howItWorks: {
      badge: "À la demande · Rapide · Transparent",
      title: "Comment fonctionne HASAD ?",
      subtitle:
        "Un modèle de dispatch géolocalisé : demandez, comparez les réponses des propriétaires et confirmez.",
      interactiveNotice:
        "Simulation interactive de l'application HASAD : touchez un équipement pour tester le parcours.",
      steps: {
        s1Number: "01",
        s1Short: "01 · Demander",
        s1Title: "Demandez l'équipement agricole nécessaire.",
        s1Detail:
          "Choisissez le type de machine (tracteur, moissonneuse, semoir…), précisez la localisation de votre exploitation, vos besoins et le rayon géographique.",
        s2Number: "02",
        s2Short: "02 · Offres",
        s2Title: "Recevez les réponses des propriétaires proches.",
        s2Detail:
          "HASAD notifie instantanément les propriétaires dans votre zone. Ils acceptent la demande en soumettant leur disponibilité, tarif et photos du matériel.",
        s3Number: "03",
        s3Short: "03 · Confirmer",
        s3Title: "Comparez, confirmez et évaluez la prestation.",
        s3Detail:
          "Comparez les offres selon la distance, le prix et les notes, confirmez votre location puis laissez un avis transparent une fois le travail terminé.",
      },
      appMockup: {
        searchPlaceholder: "Rechercher une machine agricole...",
        availableNearby: "Offres à proximité",
        filterDay: "Journée",
        filterWeek: "Semaine",
        filterMonth: "Hectare",
        radius50km: "Rayon 50 km",
        instantBooking: "Notification instantanée",
        directOwner: "Offres directes",
        certifiedEquip: "Avis vérifiés",
        tapToRequest: "Envoyer la demande",
        statusActive: "Disponible",
      },
    },
    owners: {
      badge: "Propriétaires de matériel agricole",
      title: "Vous possédez des engins agricoles ? Maximisez leur utilisation.",
      description:
        "Plus besoin d'attendre qu'un client trouve votre annonce : sur HASAD, recevez directement les demandes des agriculteurs proches et répondez avec votre tarif.",
      ctaJoin: "Inscrire mon matériel sur HASAD",
      steps: {
        s1Step: "01",
        s1Title: "Enregistrez vos machines et photos.",
        s1Desc:
          "Ajoutez vos tracteurs, moissonneuses, charrues, pulvérisateurs ou remorques avec leurs fiches et photos réelles.",
        s2Step: "02",
        s2Title: "Recevez des alertes géolocalisées.",
        s2Desc:
          "Dès qu'un agriculteur à proximité demande votre type d'équipement, vous recevez une notification immédiate.",
        s3Step: "03",
        s3Title: "Soumettez votre disponibilité et tarif.",
        s3Desc:
          "Acceptez ou refusez en toute liberté en proposant votre prix et vos créneaux de disponibilité.",
        s4Step: "04",
        s4Title: "Bâtissez votre réputation et vos revenus.",
        s4Desc:
          "Réduisez les périodes d'inactivité saisonnière et gagnez la confiance des exploitants grâce aux avis vérifiés.",
      },
    },
    downloadCta: {
      badge: "Votre terre. Vos machines. Votre récolte.",
      title: "Prêt à louer votre prochain équipement agricole à la demande ?",
      description:
        "Téléchargez l'application mobile HASAD pour Android et envoyez votre première demande aux propriétaires de matériel agricole près de vos terres.",
      prelaunchNotice:
        "L'application HASAD (développée par Soft Click Technologies) est en cours de déploiement sur les stores. Laissez vos coordonnées pour être averti dès la sortie.",
      googlePlayBtn: "Télécharger l'application Android (APK)",
      appStoreBtn: "Télécharger sur l'App Store",
      badgeImmediate: "Dispatch à la demande",
      badgeNationwide: "69 wilayas couvertes",
      badgeSecure: "Évaluations transparentes",
    },
    footer: {
      description:
        "HASAD | حصاد — Plateforme algérienne de location de matériel agricole à la demande, développée par Soft Click Technologies.",
      ecosystemNote:
        "Une solution agricole dédiée pour simplifier l'accès aux tracteurs, moissonneuses et équipements par la technologie.",
      quickLinks: "Navigation rapide",
      equipment: "Équipements agricoles",
      contactUs: "Contacter Soft Click / HASAD",
      rightsReserved: "Développé par Soft Click Technologies. Tous droits réservés.",
      privacy: "Politique de confidentialité",
      terms: "Conditions d'utilisation",
      sendInquiry: "Contacter l'équipe HASAD",
      socialSoon: "La page officielle {name} sera publiée prochainement.",
    },
    modals: {
      close: "Fermer",
      prelaunchTitle: "HASAD arrive bientôt sur {platform}",
      prelaunchSubtitle:
        "Nous finalisons la mise en ligne officielle sur les stores. Laissez votre e-mail ou téléphone pour recevoir le lien de téléchargement dès l'ouverture.",
      notifyMePrompt: "Être averti dès la publication :",
      emailPlaceholder: "votre.email@exemple.com",
      phonePlaceholder: "+213 555 12 34 56",
      notifySuccess:
        "Merci ! Vous recevrez le lien de téléchargement HASAD en priorité dès la mise en ligne.",
      submitNotify: "M'avertir dès la sortie",
      inquiryOwnerTitle: "Inscrire votre matériel agricole sur HASAD",
      inquiryOwnerSubtitle:
        "Rejoignez le réseau des propriétaires d'engins agricoles en Algérie. Indiquez vos coordonnées et vos machines disponibles.",
      inquiryContactTitle: "Contacter l'équipe HASAD",
      inquiryContactSubtitle:
        "Une question, une coopérative ou un partenariat avec Soft Click Technologies ? Notre équipe vous répond sous 24h.",
      nameLabel: "Nom complet ou Exploitation / Coopérative",
      namePlaceholder: "ex: Ahmed Mansouri / Ferme El Baraka",
      emailLabel: "Adresse e-mail",
      phoneLabel: "Numéro de téléphone",
      wilayaLabel: "Wilaya principale",
      wilayaPlaceholder: "Sélectionnez votre wilaya...",
      equipLabel: "Matériel agricole que vous souhaitez proposer",
      equipPlaceholder:
        "ex: Tracteur 110 CV, Moissonneuse-batteuse, Semoir de précision...",
      messageLabel: "Votre message ou demande",
      messagePlaceholder: "Précisez vos besoins ou votre matériel agricole...",
      submitInquiry: "Envoyer ma demande",
      submitting: "Envoi en cours...",
      inquirySuccessTitle: "Demande envoyée avec succès !",
      inquirySuccessMsg:
        "L'équipe HASAD (Soft Click Technologies) a bien reçu votre message et prendra contact avec vous très rapidement.",
      privacyTitle: "Politique de confidentialité",
      termsTitle: "Conditions d'utilisation",
      legalClose: "Fermer",
    },
  },

  ar: {
    nav: {
      home: "الرئيسية",
      howItWorks: "كيف يعمل التطبيق",
      about: "عن حصاد",
      contact: "اتصل بنا",
      downloadApp: "تحميل التطبيق",
      downloadCompact: "تحميل",
      lightMode: "فاتح",
      darkMode: "داكن",
      themeAria: "وضع العرض",
      languageAria: "اختيار اللغة",
      openMenu: "فتح القائمة",
      closeMenu: "إغلاق القائمة",
    },
    hero: {
      kickerBrand: "حصاد · الجزائر",
      kickerDesc: "كراء الآلات الفلاحية عند الطلب · Soft Click Technologies",
      titleStart: "أرضك. آلاتك.",
      titleSimply: "حصادك",
      titleQuickly: "بكل سهولة.",
      description:
        "منصة جزائرية لكراء العتاد والآلات الفلاحية عند الطلب. اطلب الجرار أو الحاصدة أو البذارة التي تحتاجها ليقوم حصاد تلقائياً بإشعار ملاك العتاد القريبين من أرضك.",
      ctaDownload: "تحميل التطبيق",
      ctaDiscover: "اكتشف حصاد",
      audFarmers: "الفلاحون",
      audCooperatives: "المستثمرات والتعاونيات",
      audWilayas: "69 ولاية",
    },
    about: {
      kicker: "حول منصة حصاد",
      kickerLong: "حول حصاد · طلب مباشر في 69 ولاية",
      title: "الآلة الفلاحية التي تحتاجها، عند الطلب وبالمكان المناسب.",
      description1:
        "على عكس الأسواق التقليدية لإعلانات الآلات، يعتمد تطبيق حصاد على نظام الطلب الفوري والاستجابة الجغرافية: يحدد الفلاح المعدة المطلوبة فيصل الإشعار مباشرة لملاك العتاد القريبين لتقديم عروضهم.",
      description2:
        "تطبيق حصاد من تطوير شركة Soft Click Technologies لتحديث قطاع الفلاحة وجعل كراء الآلات والمعدات الزراعية أسهل وأسرع في كامل الجزائر.",
      mapSelectPrompt: "انقر على أي ولاية لاكتشاف تغطية حصاد الفلاحية",
      reset: "إعادة تعيين",
      wilayaPrefix: "ولاية",
      availableNearby:
        "جرارات وحاصدات ومعدات فلاحية متوفرة عند الطلب عبر تطبيق حصاد.",
      rentIn: "كراء في",
      benefits: {
        b1Title: "اطلب العتاد",
        b1Desc:
          "اختر الآلة الفلاحية المطلوبة وحدد موقع أرضك ومدة العمل وأرسل طلبك في ثوانٍ.",
        b2Title: "استلم وقارن العروض",
        b2Desc:
          "يستلم ملاك العتاد القريبون إشعاراً فورياً ويرسلون توفرهم وأسعارهم وصور المعدات.",
        b3Title: "أكّد الكراء وقيّم",
        b3Desc:
          "قارن العروض حسب المسافة والسعر والتقييمات، أكّد الحجز، وقيّم التجربة بعد الإنجاز.",
      },
    },
    dropdown: {
      selectWilaya: "اختر ولاية",
      searchPrompt: "ابحث ضمن 69 ولاية فلاحية جزائرية",
      placeholder: "الاسم أو الرمز (مثال: 09، البليدة، سطيف)...",
      clearSearch: "مسح البحث",
      noResults: "لا توجد ولاية مطابقة لـ",
      showAll: "عرض جميع الولايات",
      clearSelected: "إلغاء تحديد الولاية",
      wilayasCount: "69 ولاية متوفرة",
    },
    categories: {
      badge: "فئات العتاد والآلات الفلاحية",
      title: "جميع الآلات الفلاحية في طلب واحد.",
      subtitle:
        "من الجرارات والحاصدات الدارسة إلى البذارات والرشاشات ومعدات السقي، اطلب العتاد المناسب لكل موسم فلاحي.",
      filterAll: "كافة المعدات",
      filterTractorsTillage: "الجرارات والحرث",
      filterHarvestHay: "الحصاد والأعلاف",
      filterSeedingCropCare: "البذر والمعالجة",
      filterTransportIrrigation: "النقل والسقي",
      modalCta: "طلب هذا العتاد",
      viewDetails: "التفاصيل والاستخدامات",
      appCatalogNotice:
        "عتاد متوفر عند الطلب حسب موقع مستثمرتك الفلاحية عبر تطبيق حصاد.",
    },
    howItWorks: {
      badge: "عند الطلب · سريع · شفاف",
      title: "كيف يعمل تطبيق حصاد ؟",
      subtitle:
        "نظام ربط جغرافي فوري مستوحى من تطبيقات النقل الذكية: اطلب الآلة، قارن عروض الملاك، وأكّد الكراء.",
      interactiveNotice:
        "محاكاة تفاعلية لتطبيق حصاد: اضغط على أي آلة فلاحية لاختبار مسار الطلب.",
      steps: {
        s1Number: "01",
        s1Short: "01 · اطلب",
        s1Title: "اطلب الآلة الفلاحية المناسبة.",
        s1Detail:
          "حدد نوع المعدة (جرار، حاصدة، بذارة، محراث...)، وموقع القطعة الأرضية، ومتطلبات الكراء ضمن النطاق الجغرافي.",
        s2Number: "02",
        s2Short: "02 · العروض",
        s2Title: "استلم ردود وعروض الملاك القريبين.",
        s2Detail:
          "يرسل حصاد إشعاراً للملاك ضمن نطاقك الجغرافي؛ فيقبلون الطلب ويرسلون التوفر وسعر الكراء وصور الآلة.",
        s3Number: "03",
        s3Short: "03 · أكّد",
        s3Title: "قارن العروض، أكّد الكراء وقيّم.",
        s3Detail:
          "قارن بين الملاك حسب القرب والسعر والتقييمات، ثم أكّد الاتفاق وشارك تقييمك بعد انتهاء العمل.",
      },
      appMockup: {
        searchPlaceholder: "ابحث عن آلة فلاحية...",
        availableNearby: "عروض قريبة منك",
        filterDay: "يومي",
        filterWeek: "أسبوعي",
        filterMonth: "بالهكتار",
        radius50km: "نطاق 50 كم",
        instantBooking: "إشعار فوري",
        directOwner: "عروض مباشرة",
        certifiedEquip: "تقييمات شفافة",
        tapToRequest: "إرسال طلب الكراء",
        statusActive: "متوفر",
      },
    },
    owners: {
      badge: "ملاك العتاد والآلات الفلاحية",
      title: "تملك جرارات أو حاصدات فلاحية ؟ ضاعف تشغيل عتادك.",
      description:
        "لا تنتظر أن يبحث الزبون عن إعلانك: عبر حصاد تصلك طلبات الفلاحين القريبين منك مباشرة، وترد بتحديد التوفر والسعر المناسب.",
      ctaJoin: "تسجيل عتادي في حصاد",
      steps: {
        s1Step: "01",
        s1Title: "أضف عتادك وصور الآلات.",
        s1Desc:
          "سجّل جراراتك، الحاصدات، المحاريث، البذارات أو المقطورات مع صور حقيقية ومواصفات واضحة.",
        s2Step: "02",
        s2Title: "استقبل إشعارات الطلبات القريبة.",
        s2Desc:
          "فور إرسال فلاح في منطقتك لطلب آلة من نوع عتادك، يصلك إشعار مباشر على الهاتف.",
        s3Step: "03",
        s3Title: "اقبل الطلب واقترح سعرك.",
        s3Desc:
          "تملك حرية القبول أو الرفض مع تحديد التوفر وسعر الكراء لكل طلب يناسب جدولك.",
        s4Step: "04",
        s4Title: "عزز ثقة العملاء وزد عائداتك.",
        s4Desc:
          "قلّل فترات توقف الآلات بين المواسم وابنِ سمعة قوية عبر نظام التقييمات والمراجعات.",
      },
    },
    downloadCta: {
      badge: "أرضك. آلاتك. حصادك.",
      title: "جاهز لطلب أول آلة فلاحية لمستثمرتك ؟",
      description:
        "حمّل تطبيق حصاد على أندرويد لإرسال طلبك والتواصل فوراً مع ملاك المعدات الفلاحية بالقرب من أرضك.",
      prelaunchNotice:
        "تطبيق حصاد من تطوير Soft Click Technologies في مراحله الأخيرة قبل النشر على المتاجر. سجل بياناتك لإعلامك فور الإطلاق.",
      googlePlayBtn: "تحميل تطبيق أندرويد (APK)",
      appStoreBtn: "تحميل من App Store",
      badgeImmediate: "طلب فوري عند الحاجة",
      badgeNationwide: "تغطية 69 ولاية",
      badgeSecure: "تقييمات شفافة وموثوقة",
    },
    footer: {
      description:
        "حصاد — منصة جزائرية لكراء الآلات والمعدات الفلاحية عند الطلب، من تطوير Soft Click Technologies.",
      ecosystemNote:
        "منصة رقمية متخصصة في الفلاحة لجعل كراء الجرارات والحاصدات والعتاد الزراعي أسهل وأسرع بالتكنولوجيا.",
      quickLinks: "روابط سريعة",
      equipment: "العتاد الفلاحي",
      contactUs: "تواصل مع الفريق",
      rightsReserved: "تطوير Soft Click Technologies. جميع الحقوق محفوظة.",
      privacy: "سياسة الخصوصية",
      terms: "شروط الاستخدام",
      sendInquiry: "إرسال رسالة لفريق حصاد",
      socialSoon: "سيتم إطلاق الصفحة الرسمية {name} قريباً.",
    },
    modals: {
      close: "إغلاق",
      prelaunchTitle: "تطبيق حصاد قادم قريباً على {platform}",
      prelaunchSubtitle:
        "نحن بصدد إتمام النشر الرسمي على المتاجر. اترك بريدك الإلكتروني أو رقم هاتفك ليصلك رابط التحميل فور الإطلاق.",
      notifyMePrompt: "أعلمني فور توفر التطبيق :",
      emailPlaceholder: "your.email@example.com",
      phonePlaceholder: "+213 555 12 34 56",
      notifySuccess:
        "شكراً لك ! ستصلك رسالة برابط تحميل تطبيق حصاد كأولوية فور النشر.",
      submitNotify: "أعلمني فور الإطلاق",
      inquiryOwnerTitle: "تسجيل عتادك الفلاحي في حصاد",
      inquiryOwnerSubtitle:
        "انضم إلى شبكة ملاك المعدات الفلاحية في الجزائر. أدخل بياناتك وقائمة الآلات المتاحة لديك.",
      inquiryContactTitle: "تواصل مع فريق حصاد",
      inquiryContactSubtitle:
        "لديك استفسار أو شراكة مع Soft Click Technologies ؟ فريقنا يجيبك خلال 24 ساعة.",
      nameLabel: "الاسم الكامل أو اسم المستثمرة / التعاونية",
      namePlaceholder: "مثال: أحمد منصوري / مزرعة البركة",
      emailLabel: "البريد الإلكتروني",
      phoneLabel: "رقم الهاتف",
      wilayaLabel: "الولاية الرئيسية",
      wilayaPlaceholder: "اختر ولايتك...",
      equipLabel: "الآلات الفلاحية التي ترغب في عرضها",
      equipPlaceholder:
        "مثال: جرار 110 حصان، حاصدة دارسة، بذارة دقيقة، مرشة...",
      messageLabel: "رسالتك أو تفاصيل طلبك",
      messagePlaceholder: "وضح احتياجاتك أو تفاصيل عتادك الفلاحي...",
      submitInquiry: "إرسال الطلب",
      submitting: "جارٍ الإرسال...",
      inquirySuccessTitle: "تم إرسال الطلب بنجاح !",
      inquirySuccessMsg:
        "استلم فريق حصاد (Soft Click Technologies) رسالتك وسيتواصل معك في أقرب وقت.",
      privacyTitle: "سياسة الخصوصية",
      termsTitle: "شروط الاستخدام",
      legalClose: "إغلاق",
    },
  },

  en: {
    nav: {
      home: "Home",
      howItWorks: "How It Works",
      about: "About",
      contact: "Contact",
      downloadApp: "Download App",
      downloadCompact: "Download",
      lightMode: "Light",
      darkMode: "Dark",
      themeAria: "Color scheme",
      languageAria: "Select language",
      openMenu: "Open menu",
      closeMenu: "Close menu",
    },
    hero: {
      kickerBrand: "HASAD · حصاد Algeria",
      kickerDesc: "Agricultural Machinery, On Demand · Soft Click Technologies",
      titleStart: "Your Land. Your Machinery.",
      titleSimply: "Your",
      titleQuickly: "Harvest.",
      description:
        "An on-demand agricultural machinery rental platform connecting farmers with nearby equipment owners through instant location-based requests and competitive provider offers.",
      ctaDownload: "Download App",
      ctaDiscover: "Discover HASAD",
      audFarmers: "Farmers",
      audCooperatives: "Farms & Cooperatives",
      audWilayas: "69 Wilayas",
    },
    about: {
      kicker: "About HASAD",
      kickerLong: "About HASAD · On-Demand Dispatch Across 69 Wilayas",
      title: "Agricultural machinery, whenever and wherever you need it.",
      description1:
        "HASAD is not a conventional marketplace where owners post listings and wait. Inspired by on-demand dispatch, farmers submit a request and nearby providers respond immediately with availability and pricing.",
      description2:
        "Named after the Arabic word حصاد (harvest) and developed by Soft Click Technologies, HASAD simplifies agricultural machinery access across Algeria.",
      mapSelectPrompt: "Click a wilaya to explore HASAD agricultural coverage",
      reset: "Reset",
      wilayaPrefix: "WILAYA",
      availableNearby:
        "Tractors, harvesters, and farm implements available on-demand via HASAD.",
      rentIn: "Rent in",
      benefits: {
        b1Title: "Request",
        b1Desc:
          "Select the agricultural machinery you need, set your farm location and requirements, and submit a request.",
        b2Title: "Compare Offers",
        b2Desc:
          "Nearby owners get notified instantly and respond with availability, equipment photos, and rental pricing.",
        b3Title: "Confirm & Review",
        b3Desc:
          "Choose the best offer by distance, price, and ratings, confirm your booking, and review after completion.",
      },
    },
    dropdown: {
      selectWilaya: "Select a wilaya",
      searchPrompt: "Search across Algeria's 69 wilayas",
      placeholder: "Name, code (e.g. 09, Blida, Setif) or region...",
      clearSearch: "Clear search",
      noResults: "No wilaya matches",
      showAll: "Show all wilayas",
      clearSelected: "Clear selected wilaya",
      wilayasCount: "69 wilayas available",
    },
    categories: {
      badge: "Agricultural Machinery Categories",
      title: "Every agricultural machine, available on demand.",
      subtitle:
        "From tractors and combine harvesters to precision seeders, sprayers, and irrigation systems — request the gear your fields require.",
      filterAll: "All Machinery",
      filterTractorsTillage: "Tractors & Tillage",
      filterHarvestHay: "Harvest & Hay",
      filterSeedingCropCare: "Seeding & Crop Care",
      filterTransportIrrigation: "Transport & Irrigation",
      modalCta: "Request This Machinery",
      viewDetails: "Details & uses",
      appCatalogNotice:
        "Agricultural equipment dispatched on demand near your farm on the HASAD mobile app.",
    },
    howItWorks: {
      badge: "On-Demand · Fast · Transparent",
      title: "How does HASAD work?",
      subtitle:
        "Farmers request machinery, nearby providers compete with offers, and you choose the best match.",
      interactiveNotice:
        "Interactive simulation of the HASAD app: tap any agricultural machine to explore the flow.",
      steps: {
        s1Number: "01",
        s1Short: "01 · Request",
        s1Title: "Request the machinery you need.",
        s1Detail:
          "Select the agricultural equipment category, specify your land location and rental requirements, and broadcast your request.",
        s2Number: "02",
        s2Short: "02 · Offers",
        s2Title: "Nearby providers respond with offers.",
        s2Detail:
          "HASAD notifies equipment owners within your geographical radius. Providers accept or decline and submit availability and rental prices.",
        s3Number: "03",
        s3Short: "03 · Confirm",
        s3Title: "Choose, confirm & rate the experience.",
        s3Detail:
          "Compare providers by distance, price, ratings, and photos. Confirm the arrangement and rate each other after the work is done.",
      },
      appMockup: {
        searchPlaceholder: "Search agricultural machinery...",
        availableNearby: "Nearby provider offers",
        filterDay: "Daily",
        filterWeek: "Weekly",
        filterMonth: "Per Hectare",
        radius50km: "50 km radius",
        instantBooking: "Instant notification",
        directOwner: "Provider offers",
        certifiedEquip: "Verified ratings",
        tapToRequest: "Submit Request",
        statusActive: "Available",
      },
    },
    owners: {
      badge: "Agricultural Equipment Owners",
      title: "Own agricultural machinery? Increase utilization & seasonal income.",
      description:
        "Stop waiting for farmers to browse static ads. Receive live nearby requests on HASAD and respond with your availability and pricing.",
      ctaJoin: "Register Machinery on HASAD",
      steps: {
        s1Step: "01",
        s1Title: "Add your machinery & photos.",
        s1Desc:
          "Register your tractors, combine harvesters, ploughs, sprayers, balers, and trailers with real equipment photos.",
        s2Step: "02",
        s2Title: "Get notified of nearby requests.",
        s2Desc:
          "Receive instant alerts whenever a farmer within your radius requests machinery matching your fleet.",
        s3Step: "03",
        s3Title: "Respond with availability & price.",
        s3Desc:
          "Accept or decline freely and submit your availability and rental rate directly to the farmer.",
        s4Step: "04",
        s4Title: "Grow trust through transparent reviews.",
        s4Desc:
          "Improve machinery utilization across planting and harvest seasons backed by mutual ratings.",
      },
    },
    downloadCta: {
      badge: "Your Land. Your Machinery. Your Harvest.",
      title: "Ready to request agricultural machinery on demand?",
      description:
        "Download the HASAD mobile app for Android to connect instantly with nearby agricultural machinery owners.",
      prelaunchNotice:
        "HASAD (developed by Soft Click Technologies) is completing final store rollout. Leave your contact info to get notified at launch.",
      googlePlayBtn: "Download the Android app (APK)",
      appStoreBtn: "Download on App Store",
      badgeImmediate: "On-demand dispatch",
      badgeNationwide: "69 wilayas covered",
      badgeSecure: "Ratings & reviews",
    },
    footer: {
      description:
        "HASAD | حصاد — On-demand agricultural machinery rental platform developed by Soft Click Technologies.",
      ecosystemNote:
        "A dedicated agricultural technology platform simplifying on-demand access to tractors, harvesters, and farm gear across Algeria.",
      quickLinks: "Quick Links",
      equipment: "Machinery",
      contactUs: "Contact Soft Click / HASAD",
      rightsReserved: "Developed by Soft Click Technologies. All rights reserved.",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      sendInquiry: "Message the HASAD Team",
      socialSoon: "The official {name} page will be launched soon.",
    },
    modals: {
      close: "Close",
      prelaunchTitle: "HASAD is coming soon on {platform}",
      prelaunchSubtitle:
        "We are finalizing the official store release. Leave your email or phone number to receive the download link as soon as it goes live.",
      notifyMePrompt: "Get notified upon launch:",
      emailPlaceholder: "your.email@example.com",
      phonePlaceholder: "+213 555 12 34 56",
      notifySuccess:
        "Thank you! You will be among the first to receive the HASAD download link.",
      submitNotify: "Notify Me at Launch",
      inquiryOwnerTitle: "Register Your Agricultural Machinery on HASAD",
      inquiryOwnerSubtitle:
        "Join Algeria's on-demand agricultural machinery network. Share your contact info and available equipment.",
      inquiryContactTitle: "Contact the HASAD Team",
      inquiryContactSubtitle:
        "Have a question, farm cooperative inquiry, or partnership proposal for Soft Click Technologies? We reply within 24 hours.",
      nameLabel: "Full Name or Farm / Cooperative",
      namePlaceholder: "e.g. Ahmed Mansouri / Ferme El Baraka",
      emailLabel: "Email Address",
      phoneLabel: "Phone Number",
      wilayaLabel: "Primary Wilaya",
      wilayaPlaceholder: "Select your wilaya...",
      equipLabel: "Agricultural machinery you wish to offer",
      equipPlaceholder:
        "e.g. 110HP Tractor, Combine Harvester, Precision Seeder...",
      messageLabel: "Your message or request",
      messagePlaceholder: "Describe your farming needs or machinery...",
      submitInquiry: "Submit Request",
      submitting: "Submitting...",
      inquirySuccessTitle: "Request Sent Successfully!",
      inquirySuccessMsg:
        "The HASAD team (Soft Click Technologies) received your message and will contact you shortly.",
      privacyTitle: "Privacy Policy",
      termsTitle: "Terms of Service",
      legalClose: "Close",
    },
  },
};
