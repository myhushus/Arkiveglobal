const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
const year = document.querySelector('#year');
const languageButton = document.querySelector('.language-toggle');

const translations = {
  en: {
    title: 'ARKIVE GLOBAL | Intellectual Property Licensing',
    description: 'ARKIVE GLOBAL is an intellectual property holding and licensing company focused on global technology commercialization.',
    homeLabel: 'ARKIVE GLOBAL home',
    menuLabel: 'Open navigation',
    menu: 'Menu',
    languageLabel: '한국어로 전환',
    languageButton: '한국어',
    nav: ['About', 'Technology', 'Licensing', 'Contact'],
    heroEyebrow: 'Technology IP Holding & Licensing',
    heroTitle: 'Turning intellectual property into global opportunity.',
    heroText: 'ARKIVE GLOBAL develops, manages, and licenses innovative technologies across multiple industries. We work with qualified partners to bring intellectual property into real-world markets.',
    heroActions: ['Explore Licensing', 'Start a Conversation'],
    process: [
      ['Develop', 'Identify and protect original technologies.'],
      ['Structure', 'Build clear territorial and field-based licensing models.'],
      ['Commercialize', 'Partner with capable operators around the world.']
    ],
    aboutEyebrow: 'About',
    aboutTitle: 'Focused on ownership, licensing, and long-term value.',
    aboutBody: [
      'ARKIVE GLOBAL is an intellectual property company focused on the development, ownership, management, and licensing of technology assets.',
      'Our role is to connect protected innovation with companies that have the manufacturing, distribution, market access, and operational capability to commercialize it effectively.'
    ],
    scopeEyebrow: 'Technology Scope',
    scopeTitle: 'A broad platform for diverse innovation.',
    scopeLead: 'Our portfolio may span multiple industries and technology categories.',
    cards: [
      ['Software & Digital Platforms', 'Applications, workflows, infrastructure, and connected digital services.'],
      ['Artificial Intelligence', 'Practical systems, automation concepts, and intelligent user experiences.'],
      ['Mechanical Systems', 'Product mechanisms, industrial improvements, and physical system design.'],
      ['Consumer Technology', 'Devices, interfaces, mobile experiences, and everyday product innovation.']
    ],
    disclosure: 'Detailed technical information is available upon request and, where appropriate, under a confidentiality agreement.',
    licensingEyebrow: 'Licensing',
    licensingTitle: 'Flexible structures for qualified partners.',
    licensingLead: 'Licenses may be structured according to territory, field of use, exclusivity, performance obligations, and commercial scope.',
    licenses: [
      ['Territory-Based Licensing', 'Rights structured for defined national or regional markets.'],
      ['Exclusive or Non-Exclusive Rights', 'Commercial arrangements aligned with capability and market commitment.'],
      ['Field-of-Use Licensing', 'Rights limited to a specific product category, industry, or application.'],
      ['Performance-Based Exclusivity', 'Exclusivity supported by milestones, minimum performance, and active commercialization.']
    ],
    statement: 'We seek practical, commercially capable partners who value innovation, responsible execution, and long-term collaboration.',
    contactEyebrow: 'Contact',
    contactTitle: 'Discuss a licensing opportunity.',
    contactText: 'For partnership and licensing inquiries, contact ARKIVE GLOBAL.',
    email: 'Email',
    contactNote: 'Please include your company name, country, area of interest, and intended commercial market.',
    footerTagline: 'Technology IP Holding & Licensing',
    rights: 'All rights reserved.'
  },
  ko: {
    title: 'ARKIVE GLOBAL | 지식재산권 라이선싱',
    description: 'ARKIVE GLOBAL은 혁신 기술의 세계 시장 사업화를 추진하는 지식재산권 보유 및 라이선싱 기업입니다.',
    homeLabel: 'ARKIVE GLOBAL 홈',
    menuLabel: '탐색 메뉴 열기',
    menu: '메뉴',
    languageLabel: '영어로 전환',
    languageButton: 'English',
    nav: ['회사 소개', '기술 분야', '라이선싱', '문의'],
    heroEyebrow: '기술 IP 보유 및 라이선싱',
    heroTitle: '지식재산을 세계적인 사업 기회로 연결합니다.',
    heroText: 'ARKIVE GLOBAL은 다양한 산업 분야의 혁신 기술을 개발하고 관리하며 라이선스합니다. 역량 있는 파트너와 협력하여 지식재산이 실제 시장에서 사업화될 수 있도록 합니다.',
    heroActions: ['라이선싱 알아보기', '협력 문의하기'],
    process: [
      ['개발', '독창적인 기술을 발굴하고 권리화합니다.'],
      ['구조화', '지역과 사용 분야에 따른 명확한 라이선싱 모델을 설계합니다.'],
      ['사업화', '세계 각지의 역량 있는 사업자와 협력합니다.']
    ],
    aboutEyebrow: '회사 소개',
    aboutTitle: '지식재산의 보유, 라이선싱과 장기적 가치에 집중합니다.',
    aboutBody: [
      'ARKIVE GLOBAL은 기술 자산의 개발, 보유, 관리 및 라이선싱에 집중하는 지식재산 전문 기업입니다.',
      '당사의 역할은 보호된 혁신 기술을 제조, 유통, 시장 접근성과 운영 역량을 갖춘 기업과 연결하여 효과적인 사업화를 이루는 것입니다.'
    ],
    scopeEyebrow: '기술 분야',
    scopeTitle: '다양한 혁신을 포괄하는 확장 가능한 기반.',
    scopeLead: '당사의 포트폴리오는 여러 산업과 기술 분야에 걸쳐 구성될 수 있습니다.',
    cards: [
      ['소프트웨어 및 디지털 플랫폼', '애플리케이션, 업무 흐름, 인프라와 연결형 디지털 서비스.'],
      ['인공지능', '실용적인 시스템, 자동화 개념과 지능형 사용자 경험.'],
      ['기계 시스템', '제품 메커니즘, 산업 개선 기술과 물리 시스템 설계.'],
      ['소비자 기술', '기기, 인터페이스, 모바일 경험과 일상 제품 혁신.']
    ],
    disclosure: '상세한 기술 정보는 요청에 따라 제공되며, 필요한 경우 비밀유지계약 체결 후 공개됩니다.',
    licensingEyebrow: '라이선싱',
    licensingTitle: '역량 있는 파트너를 위한 유연한 라이선싱 구조.',
    licensingLead: '라이선스는 지역, 사용 분야, 독점성, 성과 의무 및 사업 범위에 따라 설계할 수 있습니다.',
    licenses: [
      ['지역 기반 라이선싱', '특정 국가 또는 지역 시장을 대상으로 권리를 설정합니다.'],
      ['독점 또는 비독점 권리', '사업 수행 역량과 시장 투입 의지에 맞춰 조건을 구성합니다.'],
      ['사용 분야 제한 라이선싱', '특정 제품군, 산업 또는 적용 분야로 권리를 한정합니다.'],
      ['성과 조건부 독점권', '마일스톤, 최소 성과와 적극적인 사업화를 전제로 독점권을 부여합니다.']
    ],
    statement: '당사는 혁신의 가치, 책임 있는 실행과 장기적인 협력을 중시하는 실질적인 사업 역량을 갖춘 파트너를 찾습니다.',
    contactEyebrow: '문의',
    contactTitle: '라이선싱 기회를 논의해 보세요.',
    contactText: '파트너십 및 라이선싱 문의는 ARKIVE GLOBAL로 연락해 주세요.',
    email: '이메일',
    contactNote: '회사명, 국가, 관심 기술 분야와 예정된 사업 시장을 함께 알려주시기 바랍니다.',
    footerTagline: '기술 IP 보유 및 라이선싱',
    rights: '모든 권리 보유.'
  }
};

function setText(selector, value) {
  const element = document.querySelector(selector);
  if (element) element.textContent = value;
}

function applyLanguage(language) {
  const lang = translations[language] ? language : 'en';
  const t = translations[lang];

  document.documentElement.lang = lang;
  document.title = t.title;
  document.querySelector('meta[name="description"]').setAttribute('content', t.description);
  document.querySelector('.brand').setAttribute('aria-label', t.homeLabel);
  menuButton.setAttribute('aria-label', t.menuLabel);
  menuButton.textContent = t.menu;
  languageButton.textContent = t.languageButton;
  languageButton.setAttribute('aria-label', t.languageLabel);
  languageButton.setAttribute('aria-pressed', String(lang === 'ko'));

  document.querySelectorAll('.site-nav a').forEach((link, index) => {
    link.textContent = t.nav[index];
  });

  setText('.hero .eyebrow', t.heroEyebrow);
  setText('.hero h1', t.heroTitle);
  setText('.hero-text', t.heroText);
  document.querySelectorAll('.hero-actions a').forEach((button, index) => {
    button.textContent = t.heroActions[index];
  });
  document.querySelectorAll('.panel-card').forEach((card, index) => {
    card.querySelector('strong').textContent = t.process[index][0];
    card.querySelector('p').textContent = t.process[index][1];
  });

  setText('#about .eyebrow', t.aboutEyebrow);
  setText('#about h2', t.aboutTitle);
  document.querySelectorAll('#about .body-copy p').forEach((paragraph, index) => {
    paragraph.textContent = t.aboutBody[index];
  });

  setText('#scope .eyebrow', t.scopeEyebrow);
  setText('#scope h2', t.scopeTitle);
  setText('#scope .section-heading > p:last-child', t.scopeLead);
  document.querySelectorAll('#scope .info-card').forEach((card, index) => {
    card.querySelector('h3').textContent = t.cards[index][0];
    card.querySelector('p').textContent = t.cards[index][1];
  });
  setText('.disclosure-note', t.disclosure);

  setText('#licensing .eyebrow', t.licensingEyebrow);
  setText('#licensing h2', t.licensingTitle);
  setText('#licensing .lead', t.licensingLead);
  document.querySelectorAll('.licensing-list > div').forEach((item, index) => {
    item.querySelector('strong').textContent = t.licenses[index][0];
    item.querySelector('p').textContent = t.licenses[index][1];
  });

  setText('.statement p', t.statement);
  setText('#contact .eyebrow', t.contactEyebrow);
  setText('#contact h2', t.contactTitle);
  setText('#contact .contact-grid > div:first-child > p:last-child', t.contactText);
  setText('.contact-label', t.email);
  setText('.contact-note', t.contactNote);
  setText('.site-footer div > p', t.footerTagline);
  setText('.footer-wrap > p', `© ${new Date().getFullYear()} ARKIVE GLOBAL. ${t.rights}`);

  localStorage.setItem('arkiveglobal-language', lang);
}

const savedLanguage = localStorage.getItem('arkiveglobal-language');
const initialLanguage = savedLanguage || (navigator.language.toLowerCase().startsWith('ko') ? 'ko' : 'en');
applyLanguage(initialLanguage);

year.textContent = new Date().getFullYear();

languageButton.addEventListener('click', () => {
  applyLanguage(document.documentElement.lang === 'ko' ? 'en' : 'ko');
});

menuButton.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});
