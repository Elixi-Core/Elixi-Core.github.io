// portfolio.js — single source of truth for all portfolio content. Edit here;
// every section component imports from this file. No copy duplication anywhere.

export const profile = {
  name: 'Caesar Funches',
  tagline: 'Aspiring SOC Analyst · Founder & CEO of Elixi-Core · Houston, TX',
  shortLead:
    'Cybersecurity and IT support professional with 8+ years of technical experience and founder of Elixi-Core — building hands-on SOC, digital forensics, and secure-AI-automation skills toward a career as a Security Operations Center Analyst.',
  email: 'caesarfunches@gmail.com',
  linkedin: 'https://www.linkedin.com/in/caesar-funches-a8279a162/',
  github: 'https://github.com/Elixi-Core',
  location: 'Houston, TX',
  resumeUrl: '/assets/resume.pdf',
  stats: [
    { num: '8/8',      label: 'XP Cyber Dangerous Drives' },
    { num: '8+',       label: 'Years technical experience' },
    { num: 'May 2026', label: 'AAS Computer Systems Networking' },
  ],
};

export const nav = [
  { id: 'about',          label: 'About' },
  { id: 'education',      label: 'Education' },
  { id: 'skills',         label: 'Skills' },
  { id: 'projects',       label: 'Projects' },
  { id: 'competitions',   label: 'Competitions' },
  { id: 'experience',     label: 'Experience' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact',        label: 'Contact' },
];

export const about = {
  who: [
    { k: 'Class rank',   v: 'Sophomore' },
    { k: 'College',      v: 'Houston City College' },
    { k: 'Career goal',  v: 'SOC Analyst or Cybersecurity Analyst' },
    { k: 'Founder & CEO',v: 'Elixi-Core (formerly Elixira & Co) — applying cybersecurity principles to AI automation products in production' },
  ],
};

export const education = {
  school: 'Houston City College',
  city:   'Houston, TX',
  degree: 'AAS, Computer Systems Networking',
  expected: 'Expected May 2026',
  coursework: [
    'Network Security',
    'Digital Forensics',
    'Cybersecurity Fundamentals',
    'Threat Detection',
    'ITSY-2472 Network Defense / IR',
  ],
  description:
    'Coursework directly maps to SOC analyst day-one work: log analysis and SIEM workflows, packet inspection, endpoint visibility with Sysmon, and threat-detection methodology grounded in the NICE Workforce Framework.',
};

export const skills = {
  technical: ['Windows', 'Linux', 'Kali Linux', 'Splunk', 'Wireshark', 'Nmap', 'Burp Suite', 'Sysmon', 'Python', 'SQL', 'Microsoft Office'],
  domains:   ['SOC Operations', 'Network Security', 'Endpoint Security', 'Threat Hunting', 'Log Analysis', 'Vulnerability Assessment', 'Digital Forensics', 'Incident Response', 'Secure Cloud Architecture', 'Secure-by-Design AI/Automation'],
  professional: ['Documentation', 'Analysis', 'Communication', 'Customer Service', 'Ticketing Systems', 'Training & Mentoring', 'Database Management'],
};

export const projects = [
  {
    title: 'Mini SOC — Sysmon + Splunk',
    badge: 'ITSY 2472 · Feb 2026',
    bullets: [
      'Installed and configured Sysmon for deep Windows endpoint logging beyond default Event Viewer',
      'Forwarded Sysmon logs to Splunk via inputs.conf at C:\\Program Files\\Splunk\\etc\\system\\local\\',
      'Validated pipeline with source="WinEventLog:Microsoft-Windows-Sysmon/Operational"',
      'Generated PowerShell whoami activity and detected it via index=main whoami — full attacker-action → SIEM-detection loop',
    ],
    takeaway: 'Why SOCs use SIEMs over Event Viewer — centralization, correlation, alerting at scale.',
    chips: ['Sysmon', 'Splunk', 'PowerShell', 'Windows Event Logs'],
  },
  {
    title: 'Wireshark Attack PCAP Analysis',
    badge: 'ITSY-2472 · Mar 2026',
    bullets: [
      'Analyzed PCAP capturing a TCP SYN port scan from attacker IP 192.168.56.10 against target 192.168.56.20',
      'Identified reconnaissance pattern: one source IP, many destination ports, short time window, no completed handshakes',
      'Used Wireshark filters and Follow TCP Stream to confirm scan vs. legitimate traffic',
    ],
    takeaway: 'Patterns reveal intent — single packets show events, patterns show attacks.',
    chips: ['Wireshark', 'TCP/IP', 'PCAP Analysis'],
  },
  {
    title: 'XP Cyber — Dangerous Drives [NG]',
    badge: '8/8 · 13 min · May 2026',
    featured: true,
    bullets: [
      'USB thumb-drive forensics: identify and remove malicious files without damaging legitimate data',
      'Full pass: 8/8 checks in 13 minutes — alternating Remove-Infected-File and Maintain-File-Integrity checks',
      'Mapped to NICE Workforce Framework: Forensics Analyst · DCWF Task 1081 (virus scanning on digital media)',
      'Demonstrated KSAs: digital forensic data, file systems (NTFS/FAT/EXT), virtual machines, obfuscation identification',
    ],
    verifyHref: 'https://range.xpcyber.com/reports/verify/36E78-D70F-20EEF/',
    verifyLabel: 'Verify report: range.xpcyber.com/reports/verify/36E78-D70F-20EEF →',
    chips: ['Digital Forensics', 'File Integrity', 'Anti-malware Analysis'],
  },
  {
    title: 'Threat Hunting with Splunk',
    bullets: [
      'Analyzed security logs and system activity to detect potential threats',
      'Investigated PowerShell activity and authentication events',
      'Built search queries to surface suspicious system behavior',
      'Practiced log analysis techniques used by SOC analysts',
    ],
    chips: ['Splunk', 'SPL', 'Log Analysis'],
  },
  {
    title: 'Ethical Hacking Lab Environment',
    bullets: [
      'Performed penetration testing exercises in Kali Linux',
      'Conducted reconnaissance and network scanning with Nmap',
      'Identified open ports, services, and vulnerabilities on test systems',
      'Practiced ethical hacking methodology in a controlled lab',
    ],
    chips: ['Kali Linux', 'Nmap', 'Recon'],
  },
  {
    title: 'Web Application Security Testing',
    bullets: [
      'Used Burp Suite to intercept and analyze HTTP traffic',
      'Examined requests and responses for vulnerabilities',
      'Tested authentication weaknesses and input-validation issues',
    ],
    chips: ['Burp Suite', 'HTTP', 'OWASP'],
  },
  {
    title: 'Password Cracking & Security Analysis',
    bullets: [
      'Conducted password-cracking exercises with Kali Linux tools',
      'Analyzed hash security and brute-force techniques',
      'Studied password policy and authentication-protection best practices',
    ],
    chips: ['Kali Linux', 'Hash Analysis', 'Auth'],
  },
];

export const competitions = [
  {
    title: 'XP Cyber Challenge — Dangerous Drives [NG]',
    summary: 'Full Pass 8/8 · 13 min · Submission #158607 · May 2026',
    body: 'USB drive forensics challenge — virus scanning and file integrity verification under time pressure.',
    href: 'https://range.xpcyber.com/reports/verify/36E78-D70F-20EEF/',
    hrefLabel: 'Verify on Experience Cyber →',
  },
  {
    title: 'NCL / Cyber Skyline',
    body: 'National Cyber League participation — capture-the-flag style cybersecurity competition covering log analysis, network traffic, cryptography, scanning, web application exploitation, and forensics.',
  },
];

export const experience = [
  {
    role: 'Founder & CEO',
    org: 'Elixi-Core (formerly Elixira & Co)',
    location: 'Houston, TX',
    period: '2025 – Present',
    summary:
      'Founder of a technology-driven automation and AI solutions brand building intelligent systems that streamline workflows, enhance operational efficiency, and support business decision-making. Design, develop, and deploy branded AI agents and automation tools that integrate with cloud platforms, business systems, and data workflows.',
    flagship: [
      { name: 'Elixira',                       desc: 'legal automation and document-generation AI agent' },
      { name: 'Nexus Estate by Elixi-Core',    desc: 'real estate workflow automation agent' },
      { name: 'AOA (Apex Office Agent)',       desc: 'premium office-operations system for scheduling, document drafting, inbox triage, knowledge retrieval, and workflow execution' },
      { name: 'Internal agents',               desc: 'data processing, task orchestration, and backend automation' },
    ],
    closing:
      'Apply cybersecurity principles, secure development practices, and cloud-based architecture so every automation system is reliable, scalable, and protected against common threats — directly reinforcing SOC-analyst-aligned secure-by-design thinking.',
    chips: ['n8n', 'Supabase', 'Anthropic Claude', 'Next.js', 'Webhook HMAC', 'Parameterized Queries', 'Idempotency', 'Spend Caps'],
  },
  {
    role: 'Help Desk Representative',
    org: "Elizondo's Construction",
    location: 'Houston, TX',
    period: 'Nov 2023 – Present',
    bullets: [
      'Diagnose and resolve hardware, software, and network issues',
      'Provide technical support and troubleshooting for internal systems',
      'Maintain digital records and support documentation',
      'Manage scheduling, customer calls, and service requests',
    ],
  },
  {
    role: 'Learning Ambassador',
    org: 'Amazon',
    location: 'Houston, TX',
    period: 'Nov 2021 – Nov 2023',
    bullets: [
      'Trained and mentored new employees on operational systems and safety protocols',
      'Facilitated onboarding and training sessions',
      'Supported internal communication and warehouse-tech troubleshooting',
      'Maintained documentation and improved training workflows',
    ],
  },
];

export const reflections = [
  {
    title: 'Skills gained',
    body: 'Sysmon → Splunk pipeline, PCAP analysis, recognizing attack patterns vs. isolated events, and why SIEMs matter at enterprise scale.',
  },
  {
    title: 'Challenges faced',
    body:
      'Command-line and file-extension friction during Sysmon install — solved by navigating into the right directory, enabling Windows file extensions, and verifying config filenames step-by-step. Small mistakes in CLI tools taught me precision matters.',
  },
  {
    title: 'How my understanding developed',
    body:
      'Generating PowerShell activity and watching it appear in Splunk made cybersecurity tangible — attackers leave digital footprints, and SOC analysts follow them. Theory turned into practice the moment a whoami command surfaced as a SIEM event.',
  },
  {
    title: 'Areas for improvement',
    body: 'Deeper Linux administration, Python scripting for automation, and hands-on cloud security tooling (AWS GuardDuty, Azure Sentinel).',
  },
];

export const certifications = [
  { status: 'Earned',   title: 'Google Cybersecurity Professional Certificate', meta: '2024' },
  { status: 'Pursuing', title: 'CompTIA Security+',                              meta: 'Target 2026' },
  { status: 'Planned',  title: 'Blue Team Level 1 (BTL1)',                       meta: 'SOC analyst certification' },
];

export const documents = [
  { title: 'Résumé',                          meta: '2026 · PDF',          href: '/assets/resume.pdf', cta: 'Download →' },
  { title: 'XP Cyber — Dangerous Drives Report', meta: 'Submission #158607 · PDF', href: '/assets/xpcyber-dangerous-drives.pdf', cta: 'Download →' },
  { title: 'Recommendation Letters',          meta: 'Drop into /public/assets/ when ready', placeholder: true },
];
