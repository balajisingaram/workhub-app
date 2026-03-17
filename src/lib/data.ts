import type { Freelancer, OnsiteWorker, Job, Review, CategoryItem, WeightTierInfo, Employee, Enterprise } from '@/types'

// ── WEIGHT TIERS ─────────────────────────────────────────────────────────────
export const WEIGHT_TIERS: WeightTierInfo[] = [
  { tier: 'light',   label: 'Light duty',   range: 'Up to 25 kg',  ratePerHour: 12, color: '#27ae60', bgColor: '#e3f7ec', icon: '🌿' },
  { tier: 'medium',  label: 'Medium duty',  range: '26 – 60 kg',   ratePerHour: 18, color: '#2980b9', bgColor: '#e5f0fa', icon: '💪' },
  { tier: 'heavy',   label: 'Heavy duty',   range: '61 – 120 kg',  ratePerHour: 26, color: '#e67e22', bgColor: '#fdf0e0', icon: '🔩' },
  { tier: 'extreme', label: 'Extreme duty', range: '120 kg +',     ratePerHour: 40, color: '#c94040', bgColor: '#fde8e8', icon: '🏗️' },
]

// ── CATEGORIES ───────────────────────────────────────────────────────────────
export const CATEGORIES: CategoryItem[] = [
  { icon: '💻', name: 'Development & IT',       count: '8,420 freelancers', href: '/freelancers?cat=dev',       type: 'freelance' },
  { icon: '🎨', name: 'Design & Creative',       count: '6,340 freelancers', href: '/freelancers?cat=design',    type: 'freelance' },
  { icon: '📱', name: 'Digital Marketing',       count: '4,180 freelancers', href: '/freelancers?cat=marketing', type: 'freelance' },
  { icon: '✍️', name: 'Writing & Translation',   count: '3,960 freelancers', href: '/freelancers?cat=writing',   type: 'freelance' },
  { icon: '🚛', name: 'Drivers & Delivery',      count: '2,800 workers',     href: '/onsite?type=driver',        type: 'onsite'    },
  { icon: '🔧', name: 'General Labour',          count: '4,520 workers',     href: '/onsite?type=labour',        type: 'onsite'    },
  { icon: '💰', name: 'Finance & Accounting',    count: '2,100 freelancers', href: '/freelancers?cat=finance',   type: 'freelance' },
  { icon: '🏭', name: 'Staffing & Enterprise',   count: '360 agencies',      href: '/enterprise',                type: 'onsite'    },
]

// ── FREELANCERS ──────────────────────────────────────────────────────────────
export const MOCK_FREELANCERS: Freelancer[] = [
  {
    id: 'fl-001', userId: 'u-001',
    name: 'Sarah Johnson', title: 'UI/UX Designer & Product Strategist',
    avatarUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
    bio: 'Award-winning UI/UX designer with 8 years of experience building digital products for Fortune 500 companies and fast-growing startups.',
    hourlyRateMin: 60, hourlyRateMax: 80, location: 'New York, USA', timezone: 'EST (UTC-5)',
    englishLevel: 'Native', skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research', 'Design Systems', 'Framer'],
    rating: 4.9, reviewCount: 128, jobsCompleted: 94, responseTime: '< 1 hour',
    isOnline: true, isVerified: true, isTopRated: true, availability: 'available',
    portfolioItems: [
      { id: 'p1', title: 'FinTech Dashboard Redesign', imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80', category: 'Dashboard' },
      { id: 'p2', title: 'E-Commerce Mobile App',      imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&q=80', category: 'Mobile' },
      { id: 'p3', title: 'SaaS Onboarding Flow',       imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80', category: 'Web App' },
      { id: 'p4', title: 'Healthcare Portal UI',       imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&q=80', category: 'Web App' },
    ],
    education:   [{ id: 'e1', degree: 'BFA in Graphic Design', institution: 'Parsons School of Design', year: '2015', description: 'Graduated magna cum laude.' }],
    experience:  [{ id: 'ex1', title: 'Senior UX Designer', company: 'Stripe', period: '2020–2023', description: 'Led design for Stripe Dashboard.' }],
    services: [
      { id: 's1', title: 'Complete UI/UX Design for Web App', description: 'Full product design from wireframes to pixel-perfect Figma files', price: 499, deliveryDays: 7, category: 'Design', rating: 4.9, reviewCount: 48, isFeatured: true },
      { id: 's2', title: 'Mobile App UI Design', description: 'Beautiful mobile interfaces', price: 349, deliveryDays: 5, category: 'Design', rating: 4.8, reviewCount: 32 },
    ],
  },
  {
    id: 'fl-002', userId: 'u-002',
    name: 'Alex Chen', title: 'Full Stack Developer (React + Node.js)',
    avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
    bio: 'Full-stack engineer with 6 years building scalable web applications. Expert in React, Node.js, PostgreSQL and AWS.',
    hourlyRateMin: 75, hourlyRateMax: 100, location: 'San Francisco, USA', timezone: 'PST (UTC-8)',
    englishLevel: 'Professional', skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS', 'Docker', 'GraphQL'],
    rating: 5.0, reviewCount: 84, jobsCompleted: 67, responseTime: '2 hours',
    isOnline: true, isVerified: true, isTopRated: true, availability: 'available',
    portfolioItems: [
      { id: 'p1', title: 'SaaS Platform for HR Teams',    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80', category: 'SaaS' },
      { id: 'p2', title: 'Real-time Analytics Dashboard', imageUrl: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=400&q=80', category: 'Dashboard' },
    ],
    education:  [{ id: 'e1', degree: 'MS Computer Science', institution: 'Stanford University', year: '2018', description: 'Specialisation in distributed systems.' }],
    experience: [{ id: 'ex1', title: 'Senior Software Engineer', company: 'Vercel', period: '2021–2024', description: 'Core infrastructure team.' }],
    services: [
      { id: 's1', title: 'Full Stack Web Application', description: 'Next.js + Node.js + PostgreSQL — production-ready', price: 1299, deliveryDays: 14, category: 'Development', rating: 5.0, reviewCount: 34, isFeatured: true },
    ],
  },
  {
    id: 'fl-003', userId: 'u-003',
    name: 'Maya Patel', title: 'Brand Designer & Illustrator',
    avatarUrl: 'https://randomuser.me/api/portraits/women/68.jpg',
    bio: 'Creative brand designer with a deep love for storytelling through visuals.',
    hourlyRateMin: 45, hourlyRateMax: 65, location: 'London, UK', timezone: 'GMT (UTC+0)',
    englishLevel: 'Native', skills: ['Adobe Illustrator', 'Branding', 'Logo Design', 'Typography', 'Packaging', 'Figma'],
    rating: 4.8, reviewCount: 216, jobsCompleted: 180, responseTime: '3 hours',
    isOnline: false, isVerified: true, isTopRated: true, availability: 'available',
    portfolioItems: [
      { id: 'p1', title: 'Artisan Coffee Brand Identity', imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80', category: 'Branding' },
    ],
    education: [], experience: [],
    services: [
      { id: 's1', title: 'Complete Brand Identity Package', description: 'Logo, colours, typography, brand guidelines', price: 699, deliveryDays: 10, category: 'Design', rating: 4.9, reviewCount: 86, isFeatured: true },
    ],
  },
  {
    id: 'fl-004', userId: 'u-004',
    name: 'James Wilson', title: 'Digital Marketing & SEO Expert',
    avatarUrl: 'https://randomuser.me/api/portraits/men/75.jpg',
    bio: 'Results-driven digital marketer with a track record of growing organic traffic by 300%+.',
    hourlyRateMin: 55, hourlyRateMax: 75, location: 'Austin, TX, USA', timezone: 'CST (UTC-6)',
    englishLevel: 'Native', skills: ['SEO', 'Google Ads', 'Meta Ads', 'Analytics', 'Content Strategy', 'Email Marketing'],
    rating: 4.7, reviewCount: 92, jobsCompleted: 74, responseTime: '1 hour',
    isOnline: true, isVerified: true, isTopRated: false, availability: 'busy',
    portfolioItems: [], education: [], experience: [],
    services: [{ id: 's1', title: 'Full SEO Audit & Strategy', description: 'Comprehensive audit with 90-day roadmap', price: 399, deliveryDays: 5, category: 'Marketing', rating: 4.7, reviewCount: 42 }],
  },
  {
    id: 'fl-005', userId: 'u-005',
    name: 'Priya Nair', title: 'React Native Mobile Developer',
    avatarUrl: 'https://randomuser.me/api/portraits/women/26.jpg',
    bio: 'Mobile app developer specialising in React Native. Delivered 20+ apps on both iOS and Android.',
    hourlyRateMin: 65, hourlyRateMax: 85, location: 'Bangalore, India', timezone: 'IST (UTC+5:30)',
    englishLevel: 'Professional', skills: ['React Native', 'Expo', 'TypeScript', 'Firebase', 'Redux', 'iOS', 'Android'],
    rating: 4.9, reviewCount: 61, jobsCompleted: 52, responseTime: '< 1 hour',
    isOnline: true, isVerified: true, isTopRated: true, availability: 'available',
    portfolioItems: [], education: [], experience: [],
    services: [{ id: 's1', title: 'React Native App (iOS + Android)', description: 'Cross-platform mobile app from design to App Store', price: 1999, deliveryDays: 21, category: 'Mobile', rating: 4.9, reviewCount: 28, isFeatured: true }],
  },
  {
    id: 'fl-006', userId: 'u-006',
    name: 'Carlos Mendez', title: 'Content Writer & Copywriter',
    avatarUrl: 'https://randomuser.me/api/portraits/men/54.jpg',
    bio: 'Conversion copywriter and content strategist. I help SaaS companies and e-commerce brands tell their story.',
    hourlyRateMin: 35, hourlyRateMax: 55, location: 'Barcelona, Spain', timezone: 'CET (UTC+1)',
    englishLevel: 'Professional', skills: ['Copywriting', 'SEO Writing', 'Blog Posts', 'Email Copy', 'Landing Pages', 'UX Writing'],
    rating: 4.8, reviewCount: 144, jobsCompleted: 128, responseTime: '4 hours',
    isOnline: false, isVerified: true, isTopRated: false, availability: 'available',
    portfolioItems: [], education: [], experience: [],
    services: [{ id: 's1', title: 'Landing Page Copywriting', description: 'High-converting copy for SaaS products', price: 299, deliveryDays: 3, category: 'Writing', rating: 4.8, reviewCount: 64 }],
  },
  {
    id: 'fl-007', userId: 'u-007',
    name: 'Yuki Tanaka', title: 'Motion Designer & Video Editor',
    avatarUrl: 'https://randomuser.me/api/portraits/women/90.jpg',
    bio: 'Motion designer creating scroll-stopping animations and video content for brands.',
    hourlyRateMin: 50, hourlyRateMax: 70, location: 'Tokyo, Japan', timezone: 'JST (UTC+9)',
    englishLevel: 'Conversational', skills: ['After Effects', 'Cinema 4D', 'Premiere Pro', 'Motion Graphics', '3D Animation'],
    rating: 4.9, reviewCount: 77, jobsCompleted: 63, responseTime: '6 hours',
    isOnline: true, isVerified: true, isTopRated: true, availability: 'available',
    portfolioItems: [], education: [], experience: [],
    services: [{ id: 's1', title: 'Brand Animation & Intro Video', description: '15-second brand animation for social and website', price: 449, deliveryDays: 5, category: 'Video', rating: 4.9, reviewCount: 38 }],
  },
  {
    id: 'fl-008', userId: 'u-008',
    name: 'Amara Osei', title: 'Data Scientist & ML Engineer',
    avatarUrl: 'https://randomuser.me/api/portraits/men/11.jpg',
    bio: 'Data scientist with expertise in building ML pipelines, predictive models, and data dashboards.',
    hourlyRateMin: 80, hourlyRateMax: 120, location: 'Amsterdam, Netherlands', timezone: 'CET (UTC+1)',
    englishLevel: 'Professional', skills: ['Python', 'Machine Learning', 'TensorFlow', 'SQL', 'Tableau', 'Data Analysis'],
    rating: 4.8, reviewCount: 39, jobsCompleted: 31, responseTime: '2 hours',
    isOnline: false, isVerified: true, isTopRated: false, availability: 'busy',
    portfolioItems: [], education: [], experience: [],
    services: [{ id: 's1', title: 'Custom ML Model Development', description: 'End-to-end model training, evaluation and deployment', price: 1599, deliveryDays: 14, category: 'Data Science', rating: 4.8, reviewCount: 18 }],
  },
]

// ── ONSITE WORKERS ───────────────────────────────────────────────────────────
export const MOCK_WORKERS: OnsiteWorker[] = [
  {
    id: 'ow-001', userId: 'u-101', workerCode: 'ON-4821',
    name: 'Ravi Kumar', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ravi',
    photoVisible: false, weightTier: 'heavy',
    skills: ['Furniture moving', 'Warehouse work', 'Loading/Unloading'],
    radiusKm: 30, location: 'Chennai, TN', coordinates: { lat: 13.08, lng: 80.27 },
    availableDays: ['Mon','Tue','Wed','Thu','Fri'],
    availableHours: '8am – 6pm', vehicleType: 'None',
    rating: 4.8, reviewCount: 47, jobsCompleted: 52,
    isVerified: true, isOnline: true,
  },
  {
    id: 'ow-002', userId: 'u-102', workerCode: 'ON-3347',
    name: 'Suresh Babu', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=suresh',
    photoVisible: false, weightTier: 'extreme',
    skills: ['Heavy machinery', 'Construction site', 'Steel handling'],
    radiusKm: 20, location: 'Chennai, TN', coordinates: { lat: 13.06, lng: 80.25 },
    availableDays: ['Mon','Wed','Fri','Sat'],
    availableHours: '6am – 4pm', vehicleType: 'Own vehicle',
    rating: 4.9, reviewCount: 82, jobsCompleted: 94,
    isVerified: true, isOnline: true,
  },
  {
    id: 'ow-003', userId: 'u-103', workerCode: 'ON-7612',
    name: 'Deepak Raj', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=deepak',
    photoVisible: false, weightTier: 'light',
    skills: ['Document delivery', 'Small packages', 'Office runs'],
    radiusKm: 50, location: 'Chennai, TN', coordinates: { lat: 13.10, lng: 80.21 },
    availableDays: ['Mon','Tue','Wed','Thu','Fri','Sat'],
    availableHours: '9am – 7pm', vehicleType: 'Motorbike',
    rating: 4.6, reviewCount: 28, jobsCompleted: 34,
    isVerified: true, isOnline: false,
  },
  {
    id: 'ow-004', userId: 'u-104', workerCode: 'ON-2298',
    name: 'Arjun Singh', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=arjun',
    photoVisible: false, weightTier: 'medium',
    skills: ['Appliance installation', 'General labour', 'Painting'],
    radiusKm: 25, location: 'Chennai, TN', coordinates: { lat: 13.04, lng: 80.28 },
    availableDays: ['Tue','Thu','Fri','Sat','Sun'],
    availableHours: '7am – 5pm', vehicleType: 'Van',
    rating: 4.7, reviewCount: 55, jobsCompleted: 61,
    isVerified: true, isOnline: true,
  },
  {
    id: 'ow-005', userId: 'u-105', workerCode: 'ON-9901',
    name: 'Murugan P', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=murugan',
    photoVisible: false, weightTier: 'heavy',
    skills: ['Warehouse packing', 'Stock management', 'Forklift operator'],
    radiusKm: 15, location: 'Chennai, TN', coordinates: { lat: 13.07, lng: 80.29 },
    availableDays: ['Mon','Tue','Wed','Thu','Fri'],
    availableHours: '8am – 8pm', vehicleType: 'None',
    rating: 4.5, reviewCount: 33, jobsCompleted: 39,
    isVerified: true, isOnline: true,
  },
  {
    id: 'ow-006', userId: 'u-106', workerCode: 'ON-5544',
    name: 'Kumar Pillai', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=kumar',
    photoVisible: false, weightTier: 'extreme',
    skills: ['Industrial equipment', 'Demolition', 'Structural work'],
    radiusKm: 40, location: 'Chennai, TN', coordinates: { lat: 13.12, lng: 80.23 },
    availableDays: ['Mon','Wed','Thu','Sat'],
    availableHours: '6am – 6pm', vehicleType: 'Truck',
    rating: 4.9, reviewCount: 106, jobsCompleted: 120,
    isVerified: true, isOnline: false,
  },
]

// ── MOCK REVIEWS ─────────────────────────────────────────────────────────────
export const MOCK_REVIEWS: Review[] = [
  { id: 'r1', authorName: 'Michael Torres', authorAvatar: '👨‍💼', rating: 5, comment: 'Sarah delivered outstanding work — the redesign exceeded our expectations. Very responsive and professional throughout.', date: 'Dec 2024', jobTitle: 'SaaS Dashboard Redesign' },
  { id: 'r2', authorName: 'Lisa Chen', authorAvatar: '👩‍💼', rating: 5, comment: 'Exceptional attention to detail. The design system she built has scaled perfectly as our product grew.', date: 'Nov 2024', jobTitle: 'Design System Creation' },
  { id: 'r3', authorName: 'David Park', authorAvatar: '👨‍💻', rating: 5, comment: 'One of the best designers I\'ve worked with. Understands business goals and translates them into beautiful UX.', date: 'Oct 2024', jobTitle: 'Mobile App UI Design' },
  { id: 'r4', authorName: 'Emma Wilson', authorAvatar: '👩', rating: 4, comment: 'Great work on the brand guidelines. Delivered on time and the final output was exactly what we needed.', date: 'Sep 2024', jobTitle: 'Brand Identity Package' },
]

// ── ENTERPRISE MOCK ───────────────────────────────────────────────────────────
export const MOCK_ENTERPRISE: Enterprise = {
  id: 'ent-001',
  userId: 'u-201',
  companyName: 'Acme Construction Ltd',
  logoUrl: undefined,
  brandColor: '#1a6b3c',
  customDomain: 'portal.acmecorp.com',
  smtpHost: 'smtp.acmecorp.com',
  fromEmailName: 'Acme HR',
  employeeCount: 248,
  plan: 'enterprise',
  isVerified: true,
}

export const MOCK_EMPLOYEES: Employee[] = [
  { id: 'emp-001', enterpriseId: 'ent-001', name: 'Ravi Kumar',    email: 'ravi@acme.com',  role: 'Heavy duty worker', department: 'Site Operations', avatarEmoji: '👷', weightTier: 'heavy',  status: 'active',  emailVerified: true,  clockedIn: true,  currentShift: 'Site A — 8am–6pm' },
  { id: 'emp-002', enterpriseId: 'ent-001', name: 'Priya Sharma',  email: 'priya@acme.com', role: 'Driver',            department: 'Logistics',       avatarEmoji: '🚛', weightTier: 'medium', status: 'active',  emailVerified: true,  clockedIn: true,  currentShift: 'Route B — 9am–5pm' },
  { id: 'emp-003', enterpriseId: 'ent-001', name: 'Arjun Mehta',   email: 'arjun@acme.com', role: 'General labour',    department: 'Site Operations', avatarEmoji: '🔧', weightTier: 'light',  status: 'pending', emailVerified: false, clockedIn: false, currentShift: undefined },
  { id: 'emp-004', enterpriseId: 'ent-001', name: 'Meena Rajan',   email: 'meena@acme.com', role: 'Supervisor',        department: 'Management',      avatarEmoji: '👷‍♀️', status: 'active', emailVerified: true,  clockedIn: false, currentShift: undefined },
  { id: 'emp-005', enterpriseId: 'ent-001', name: 'Suresh Pillai', email: 'suresh@acme.com',role: 'Extreme duty worker',department: 'Heavy Works',    avatarEmoji: '🏗️', weightTier: 'extreme',status: 'deployed',emailVerified: true,  clockedIn: true,  currentShift: 'Site C — 6am–4pm' },
  { id: 'emp-006', enterpriseId: 'ent-001', name: 'Kavya Nair',    email: 'kavya@acme.com', role: 'Light delivery',    department: 'Logistics',       avatarEmoji: '📦', weightTier: 'light',  status: 'active',  emailVerified: true,  clockedIn: false, currentShift: undefined },
]

// ── MOCK JOBS ─────────────────────────────────────────────────────────────────
export const MOCK_JOBS: Job[] = [
  { id: 'j-001', type: 'freelance', title: 'Senior React Developer for SaaS Platform', description: 'We need an experienced React/TypeScript developer to build out our core product dashboard.', clientId: 'c-001', clientName: 'TechStartup Inc', budget: { min: 5000, max: 8000, type: 'fixed' }, skills: ['React', 'TypeScript', 'Node.js'], status: 'open', proposalCount: 14, postedAt: '2h ago', category: 'Development', isUrgent: true },
  { id: 'j-002', type: 'freelance', title: 'Brand Identity Design for Fintech App', description: 'Looking for a creative brand designer to create a complete brand identity for our new fintech product.', clientId: 'c-002', clientName: 'FinFlow Ltd', budget: { min: 800, max: 1500, type: 'fixed' }, skills: ['Branding', 'Figma', 'Logo Design'], status: 'open', proposalCount: 8, postedAt: '5h ago', category: 'Design' },
  { id: 'j-003', type: 'onsite', title: 'Heavy Equipment Movers Needed — Warehouse', description: 'Need 4 heavy-duty workers to move industrial equipment in our Chennai warehouse. One day job.', clientId: 'c-003', clientName: 'Chennai Logistics', budget: { min: 150, max: 200, type: 'hourly' }, skills: ['Heavy lifting', 'Warehouse'], weightTierRequired: 'heavy', location: 'Guindy, Chennai', status: 'open', proposalCount: 6, postedAt: '1h ago', category: 'Labour' },
  { id: 'j-004', type: 'freelance', title: 'SEO & Content Strategy for E-Commerce', description: 'Growing e-commerce brand needs a full SEO audit and 6-month content strategy.', clientId: 'c-004', clientName: 'ShopMart Online', budget: { min: 60, max: 80, type: 'hourly' }, skills: ['SEO', 'Content Strategy', 'Analytics'], status: 'open', proposalCount: 22, postedAt: '1d ago', category: 'Marketing' },
]
