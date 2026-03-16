// ── USER TYPES ──────────────────────────────────────────────────────────────

export type UserRole = 'client' | 'freelancer' | 'onsite_worker' | 'enterprise' | 'admin'

export type UserStatus = 'active' | 'pending' | 'suspended' | 'unverified'

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: UserRole
  status: UserStatus
  avatarUrl?: string
  createdAt: string
  kycVerified: boolean
}

// ── FREELANCER ───────────────────────────────────────────────────────────────

export interface Freelancer {
  id: string
  userId: string
  name: string
  title: string
  avatarUrl: string
  bio: string
  hourlyRateMin: number
  hourlyRateMax: number
  location: string
  timezone: string
  englishLevel: 'Basic' | 'Conversational' | 'Professional' | 'Native'
  skills: string[]
  rating: number
  reviewCount: number
  jobsCompleted: number
  responseTime: string
  isOnline: boolean
  isVerified: boolean
  isTopRated: boolean
  portfolioItems: PortfolioItem[]
  education: Education[]
  experience: Experience[]
  services: Service[]
  availability: 'available' | 'busy' | 'unavailable'
}

export interface PortfolioItem {
  id: string
  title: string
  imageUrl: string
  category: string
}

export interface Education {
  id: string
  degree: string
  institution: string
  year: string
  description: string
}

export interface Experience {
  id: string
  title: string
  company: string
  period: string
  description: string
}

export interface Service {
  id: string
  title: string
  description: string
  price: number
  deliveryDays: number
  category: string
  imageUrl?: string
  rating: number
  reviewCount: number
  isFeatured?: boolean
}

// ── ONSITE WORKER ────────────────────────────────────────────────────────────

export type WeightTier = 'light' | 'medium' | 'heavy' | 'extreme'

export interface WeightTierInfo {
  tier: WeightTier
  label: string
  range: string
  ratePerHour: number
  color: string
  bgColor: string
  icon: string
}

export interface OnsiteWorker {
  id: string
  userId: string
  workerCode: string       // e.g. "ON-4821" — shown before hire
  name: string             // hidden until hire
  avatarUrl: string        // blurred until hire
  photoVisible: boolean    // true only after payment
  weightTier: WeightTier
  skills: string[]
  radiusKm: number
  location: string
  coordinates: { lat: number; lng: number }
  availableDays: string[]
  availableHours: string
  vehicleType?: string
  rating: number
  reviewCount: number
  jobsCompleted: number
  isVerified: boolean
  isOnline: boolean
}

// ── ENTERPRISE / AGENCY ──────────────────────────────────────────────────────

export interface Enterprise {
  id: string
  userId: string
  companyName: string
  logoUrl?: string
  brandColor: string
  customDomain?: string
  smtpHost?: string
  fromEmailName?: string
  employeeCount: number
  plan: 'starter' | 'pro' | 'enterprise'
  isVerified: boolean
}

export interface Employee {
  id: string
  enterpriseId: string
  name: string
  email: string
  role: string
  department?: string
  avatarEmoji: string
  weightTier?: WeightTier
  status: 'active' | 'inactive' | 'pending' | 'deployed'
  emailVerified: boolean
  clockedIn: boolean
  currentShift?: string
}

// ── JOBS ─────────────────────────────────────────────────────────────────────

export type JobType = 'freelance' | 'onsite' | 'staffing'
export type JobStatus = 'open' | 'in_progress' | 'review' | 'completed' | 'cancelled'

export interface Job {
  id: string
  type: JobType
  title: string
  description: string
  clientId: string
  clientName: string
  clientAvatarUrl?: string
  budget: { min: number; max: number; type: 'fixed' | 'hourly' }
  skills: string[]
  location?: string
  weightTierRequired?: WeightTier
  status: JobStatus
  proposalCount: number
  postedAt: string
  deadline?: string
  isUrgent?: boolean
  category: string
}

// ── REVIEW ───────────────────────────────────────────────────────────────────

export interface Review {
  id: string
  authorName: string
  authorAvatar?: string
  rating: number
  comment: string
  date: string
  jobTitle: string
}

// ── PAYMENT ──────────────────────────────────────────────────────────────────

export type PaymentStatus = 'pending' | 'held' | 'released' | 'refunded'
export type PaymentProvider = 'stripe' | 'razorpay' | 'wallet'

export interface Payment {
  id: string
  jobId: string
  amount: number
  currency: string
  provider: PaymentProvider
  status: PaymentStatus
  escrowReleased: boolean
  createdAt: string
}

// ── NAV / UI ─────────────────────────────────────────────────────────────────

export interface NavItem {
  label: string
  href: string
  badge?: string
}

export interface CategoryItem {
  icon: string
  name: string
  count: string
  href: string
  type: 'freelance' | 'onsite'
}

export interface StatItem {
  value: string
  label: string
  accent?: boolean
}

// ── FILTER TYPES ─────────────────────────────────────────────────────────────

export interface FreelancerFilters {
  category: string
  skillLevel: string
  minRate: number
  maxRate: number
  location: string
  availability: string
  rating: number
  deliveryTime: string
}

export interface OnsiteFilters {
  weightTier: WeightTier | 'all'
  radiusKm: number
  availableToday: boolean
  vehicleType: string
  rating: number
}
