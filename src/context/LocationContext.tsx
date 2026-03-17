'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type CountryCode = 'IN' | 'CA' | 'AE' | 'US' | 'OTHER'

export interface CountryConfig {
  code:         CountryCode
  name:         string
  flag:         string
  currency:     string
  currencyCode: string
  symbol:       string
  city:         string
  // Which worker types are available in this country
  hasFreelancers: boolean
  hasGigWorkers:  boolean
  hasDrivers:     boolean
  // Exchange rate to USD (approximate)
  rateToUSD: number
}

export const COUNTRIES: Record<CountryCode, CountryConfig> = {
  IN: {
    code: 'IN', name: 'India', flag: '🇮🇳', currency: 'Indian Rupee',
    currencyCode: 'INR', symbol: '₹', city: 'Bangalore',
    hasFreelancers: true, hasGigWorkers: true, hasDrivers: true,
    rateToUSD: 83,
  },
  CA: {
    code: 'CA', name: 'Canada', flag: '🇨🇦', currency: 'Canadian Dollar',
    currencyCode: 'CAD', symbol: 'CA$', city: 'Toronto',
    hasFreelancers: true, hasGigWorkers: false, hasDrivers: false,
    rateToUSD: 1.36,
  },
  AE: {
    code: 'AE', name: 'Dubai', flag: '🇦🇪', currency: 'UAE Dirham',
    currencyCode: 'AED', symbol: 'AED', city: 'Dubai',
    hasFreelancers: true, hasGigWorkers: false, hasDrivers: false,
    rateToUSD: 3.67,
  },
  US: {
    code: 'US', name: 'United States', flag: '🇺🇸', currency: 'US Dollar',
    currencyCode: 'USD', symbol: '$', city: 'New York',
    hasFreelancers: true, hasGigWorkers: false, hasDrivers: false,
    rateToUSD: 1,
  },
  OTHER: {
    code: 'OTHER', name: 'Other', flag: '🌍', currency: 'US Dollar',
    currencyCode: 'USD', symbol: '$', city: '',
    hasFreelancers: true, hasGigWorkers: false, hasDrivers: false,
    rateToUSD: 1,
  },
}

// Convert a USD price to local currency
export function convertPrice(usdPrice: number, country: CountryConfig): string {
  const converted = Math.round(usdPrice * country.rateToUSD)
  if (country.currencyCode === 'INR') {
    return `₹${converted.toLocaleString('en-IN')}`
  }
  return `${country.symbol}${converted.toLocaleString()}`
}

interface LocationContextType {
  country:        CountryConfig
  setCountry:     (code: CountryCode) => void
  showPopup:      boolean
  dismissPopup:   () => void
  convertPrice:   (usd: number) => string
}

const LocationContext = createContext<LocationContextType>({
  country:      COUNTRIES.US,
  setCountry:   () => {},
  showPopup:    false,
  dismissPopup: () => {},
  convertPrice: (usd) => `$${usd}`,
})

export function LocationProvider({ children }: { children: ReactNode }) {
  const [country,   setCountryState] = useState<CountryConfig>(COUNTRIES.US)
  const [showPopup, setShowPopup]    = useState(false)
  const [detected,  setDetected]     = useState(false)

  useEffect(() => {
    // 1. Check localStorage first
    const saved = localStorage.getItem('gighub_country') as CountryCode | null
    if (saved && COUNTRIES[saved]) {
      setCountryState(COUNTRIES[saved])
      setDetected(true)
      return
    }

    // 2. Auto-detect via timezone
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
    let detected: CountryCode = 'US'
    if (tz.includes('Kolkata') || tz.includes('India'))          detected = 'IN'
    else if (tz.includes('Dubai') || tz.includes('Abu_Dhabi'))   detected = 'AE'
    else if (tz.includes('Toronto') || tz.includes('Vancouver') || tz.includes('Canada')) detected = 'CA'
    else if (tz.includes('America/New_York') || tz.includes('America/Los_Angeles') || tz.includes('America/Chicago')) detected = 'US'

    setCountryState(COUNTRIES[detected])
    setDetected(true)

    // 3. Show popup if not set before
    const dismissed = localStorage.getItem('gighub_country_dismissed')
    if (!dismissed) {
      setTimeout(() => setShowPopup(true), 1200)
    }
  }, [])

  function setCountry(code: CountryCode) {
    const cfg = COUNTRIES[code] ?? COUNTRIES.US
    setCountryState(cfg)
    localStorage.setItem('gighub_country', code)
    setShowPopup(false)
  }

  function dismissPopup() {
    setShowPopup(false)
    localStorage.setItem('gighub_country_dismissed', '1')
  }

  function convert(usd: number) {
    return convertPrice(usd, country)
  }

  return (
    <LocationContext.Provider value={{ country, setCountry, showPopup, dismissPopup, convertPrice: convert }}>
      {children}
      {showPopup && <CountryPopup country={country} onSelect={setCountry} onDismiss={dismissPopup} />}
    </LocationContext.Provider>
  )
}

export function useLocation() {
  return useContext(LocationContext)
}

// ── COUNTRY POPUP ─────────────────────────────────────────────────────────────
function CountryPopup({ country, onSelect, onDismiss }: {
  country: CountryConfig
  onSelect: (c: CountryCode) => void
  onDismiss: () => void
}) {
  return (
    <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-4 sm:p-6"
      style={{ background: 'rgba(20,18,14,.55)', backdropFilter: 'blur(6px)' }}
      onClick={e => { if (e.target === e.currentTarget) onDismiss() }}>
      <div className="bg-white rounded-3xl p-7 w-full max-w-sm shadow-[0_24px_80px_rgba(20,18,14,.2)] animate-scale-in">
        <div className="text-2xl mb-3 text-center">📍</div>
        <h3 className="font-display font-black text-xl text-[var(--ink)] text-center mb-1 tracking-tight">Where are you based?</h3>
        <p className="text-sm text-[var(--ink3)] text-center mb-6">
          We detected <strong>{country.flag} {country.name}</strong> — confirm or change
        </p>
        <div className="flex flex-col gap-2 mb-5">
          {(Object.values(COUNTRIES).filter(c => c.code !== 'OTHER') as CountryConfig[]).map(c => (
            <button key={c.code} onClick={() => onSelect(c.code as CountryCode)}
              className="flex items-center gap-3 p-3.5 rounded-2xl border transition-all text-left"
              style={{
                borderColor: country.code === c.code ? '#1a6b3c' : 'rgba(20,18,14,.1)',
                background:  country.code === c.code ? '#e8f5ee' : 'transparent',
              }}>
              <span className="text-xl">{c.flag}</span>
              <div className="flex-1">
                <div className="font-semibold text-sm text-[var(--ink)]">{c.name}</div>
                <div className="text-xs text-[var(--ink3)]">{c.symbol} {c.currencyCode} · {c.hasGigWorkers ? 'Freelancers + Gig + Drivers' : 'Freelancers only'}</div>
              </div>
              {country.code === c.code && <span className="text-[var(--accent)] text-sm font-bold">✓</span>}
            </button>
          ))}
        </div>
        <button onClick={onDismiss}
          className="w-full py-3 rounded-full bg-[var(--ink)] text-white text-sm font-semibold hover:bg-[var(--accent)] transition-smooth">
          Confirm — {country.flag} {country.name}
        </button>
      </div>
    </div>
  )
}

// ── COUNTRY SELECTOR DROPDOWN (for navbar) ────────────────────────────────────
export function CountrySelector() {
  const { country, setCountry } = useLocation()
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[var(--border)] text-sm hover:bg-[var(--bg2)] transition-smooth">
        <span>{country.flag}</span>
        <span className="text-xs font-medium text-[var(--ink2)] hidden sm:block">{country.currencyCode}</span>
        <span className="text-[10px] text-[var(--ink3)]">▾</span>
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-10 z-50 bg-white rounded-2xl border border-[var(--border2)] shadow-medium w-56 py-1.5 overflow-hidden">
            {(Object.values(COUNTRIES).filter(c => c.code !== 'OTHER') as CountryConfig[]).map(c => (
              <button key={c.code} onClick={() => { setCountry(c.code as CountryCode); setOpen(false) }}
                className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-[var(--bg)] transition-smooth text-left">
                <span className="text-lg">{c.flag}</span>
                <div className="flex-1">
                  <div className="text-sm font-medium text-[var(--ink)]">{c.name}</div>
                  <div className="text-xs text-[var(--ink3)]">{c.symbol} {c.currencyCode}</div>
                </div>
                {country.code === c.code && <span className="text-[var(--accent)] text-xs font-bold">✓</span>}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
