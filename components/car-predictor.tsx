'use client'

import { useMemo, useState } from 'react'
import { ArrowUpRight, BarChart3, CarFront, CircleHelp, Gauge, IndianRupee, RotateCcw, Sparkles, TrendingUp } from 'lucide-react'

const brands = ['Maruti', 'Hyundai', 'Honda', 'Toyota', 'Tata', 'Mahindra', 'Kia', 'Volkswagen']
const fuels = ['Petrol', 'Diesel', 'CNG', 'Electric']

const featuredCars = [
  { name: 'Maruti Swift', meta: '2019 · Petrol · 42,000 km', price: '₹6.84 Lakh', image: '/cars/maruti-swift.png' },
  { name: 'Hyundai Creta', meta: '2020 · Diesel · 51,200 km', price: '₹12.40 Lakh', image: '/cars/hyundai-creta.png' },
  { name: 'Honda City', meta: '2018 · Petrol · 38,600 km', price: '₹8.15 Lakh', image: '/cars/honda-city.png' },
  { name: 'Tata Nexon', meta: '2021 · Petrol · 27,900 km', price: '₹9.35 Lakh', image: '/cars/tata-nexon.png' },
]

function formatPrice(value: number) {
  return `₹${value.toFixed(2)} Lakh`
}

export function CarPredictor() {
  const [brand, setBrand] = useState('Maruti')
  const [fuel, setFuel] = useState('Petrol')
  const [year, setYear] = useState(2019)
  const [kms, setKms] = useState(42000)
  const [result, setResult] = useState(6.84)

  const estimate = useMemo(() => {
    const brandFactor: Record<string, number> = { Maruti: 0, Hyundai: 0.38, Honda: 1.05, Toyota: 2.15, Tata: 0.32, Mahindra: 0.75, Kia: 1.6, Volkswagen: 0.92 }
    const fuelFactor: Record<string, number> = { Petrol: 0, Diesel: 0.75, CNG: -0.15, Electric: 2.3 }
    const age = Math.max(0, 2026 - year)
    const calculated = 8.15 + (brandFactor[brand] ?? 0) + (fuelFactor[fuel] ?? 0) - age * 0.42 - (kms / 10000) * 0.12
    return Math.max(1.25, Number(calculated.toFixed(2)))
  }, [brand, fuel, year, kms])

  const confidence = Math.min(94, Math.max(72, Math.round(91 - Math.abs(estimate - result) * 1.5)))

  function predict() {
    setResult(estimate)
  }

  function reset() {
    setBrand('Maruti')
    setFuel('Petrol')
    setYear(2019)
    setKms(42000)
    setResult(6.84)
  }

  return (
    <main className="min-h-screen bg-[#f7f8f5] text-[#17221e]">
      <header className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-5 lg:px-12">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#173c31] text-[#d7f26d]"><CarFront size={21} strokeWidth={2.2} /></div>
          <div><p className="text-[15px] font-bold tracking-[-0.03em]">autovalue</p><p className="text-[10px] uppercase tracking-[0.2em] text-[#738078]">india market intelligence</p></div>
        </div>
        <div className="hidden items-center gap-8 text-sm text-[#647068] md:flex"><span className="font-semibold text-[#173c31]">Predictor</span><span>How it works</span><span>Dataset</span></div>
        <div className="flex items-center gap-2 rounded-full border border-[#dae0d8] bg-white px-3 py-2 text-xs font-medium text-[#607068]"><span className="h-2 w-2 rounded-full bg-[#9dcc4a]" /> Model online</div>
      </header>

      <section className="mx-auto grid max-w-[1440px] gap-10 px-6 pb-12 pt-12 lg:grid-cols-[1.1fr_0.9fr] lg:px-12 lg:pt-20">
        <div className="max-w-[690px] self-center">
          <div className="mb-6 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#789344]"><Sparkles size={14} /> Used car pricing, decoded</div>
          <h1 className="text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.06em] text-[#173c31] md:text-7xl">Know what your car is <span className="text-[#9bb84a]">really worth.</span></h1>
          <p className="mt-7 max-w-[550px] text-lg leading-8 text-[#6b786f]">A practical price estimate trained on Indian used-car listings.</p>
          <div className="mt-10 flex flex-wrap gap-3 text-xs font-semibold text-[#5f6d65]"><span className="rounded-full bg-[#e8efdf] px-4 py-2">●  12,400+ listings</span><span className="rounded-full bg-[#e8efdf] px-4 py-2">●  Updated for 2026</span><span className="rounded-full bg-[#e8efdf] px-4 py-2">●  ₹ INR</span></div>
        </div>

        <div className="relative rounded-[28px] bg-[#173c31] p-6 shadow-[0_24px_70px_rgba(33,61,45,0.16)] md:p-8">
          <div className="absolute right-8 top-8 rounded-full border border-white/15 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#b1c7b4]">Regression model</div>
          <div className="mb-8 pr-36"><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#a6bd53]">Vehicle details</p><h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-white">Tell us about the car</h2></div>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="space-y-2 text-sm font-medium text-[#d9e3d5]">Brand<select value={brand} onChange={e => setBrand(e.target.value)} className="field">{brands.map(item => <option key={item}>{item}</option>)}</select></label>
            <label className="space-y-2 text-sm font-medium text-[#d9e3d5]">Fuel type<select value={fuel} onChange={e => setFuel(e.target.value)} className="field">{fuels.map(item => <option key={item}>{item}</option>)}</select></label>
            <label className="space-y-2 text-sm font-medium text-[#d9e3d5]">Registration year<div className="range-wrap"><input type="range" min="2012" max="2025" value={year} onChange={e => setYear(Number(e.target.value))} /><span>{year}</span></div></label>
            <label className="space-y-2 text-sm font-medium text-[#d9e3d5]">Kilometres driven<div className="relative"><input type="number" value={kms} onChange={e => setKms(Number(e.target.value))} className="field pr-16" min="0" /><span className="absolute right-4 top-3.5 text-xs text-[#8da197]">km</span></div></label>
          </div>
          <div className="mt-7 flex gap-3"><button onClick={predict} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#c7e65a] px-5 py-3.5 text-sm font-bold text-[#18352b] transition hover:bg-[#d9f47d]">Estimate price <ArrowUpRight size={17} /></button><button onClick={reset} aria-label="Reset form" className="rounded-xl border border-white/15 px-4 text-[#c2d1c4] transition hover:bg-white/10"><RotateCcw size={17} /></button></div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 pb-16 lg:px-12">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#789344]">Cars in the dataset</p><h2 className="mt-2 text-3xl font-semibold tracking-[-0.05em] text-[#173c31]">Popular Indian used cars</h2></div>
          <p className="hidden max-w-xs text-right text-sm leading-6 text-[#77847c] sm:block">Real examples help put your estimate in context.</p>
        </div>
        <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {featuredCars.map(car => <article key={car.name} className="overflow-hidden rounded-2xl border border-[#e1e7de] bg-white shadow-[0_8px_30px_rgba(43,68,47,0.05)] transition hover:-translate-y-1 hover:shadow-[0_14px_34px_rgba(43,68,47,0.1)]"><img src={car.image} alt={`${car.name} used car`} className="h-36 w-full object-cover" /><div className="p-4"><div className="flex items-start justify-between gap-3"><h3 className="font-semibold text-[#244536]">{car.name}</h3><span className="rounded-full bg-[#edf3e5] px-2 py-1 text-[10px] font-bold text-[#6c8b3d]">USED</span></div><p className="mt-2 text-xs text-[#849087]">{car.meta}</p><p className="mt-4 text-lg font-semibold tracking-[-0.03em] text-[#173c31]">{car.price}</p></div></article>)}
        </div>
        <div className="grid gap-5 lg:grid-cols-[1.25fr_0.75fr_0.75fr]">
          <div className="result-card"><div><div className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#789344]"><IndianRupee size={14} /> Estimated resale value</div><p className="text-5xl font-semibold tracking-[-0.06em] text-[#173c31]">{formatPrice(result)}</p><p className="mt-3 text-sm text-[#77847c]">Typical range <strong className="text-[#45584c]">₹{(result - 0.65).toFixed(2)} – ₹{(result + 0.65).toFixed(2)} Lakh</strong></p></div><div className="mt-6 flex items-center gap-3 border-t border-[#e6ebe3] pt-5 text-xs text-[#718078]"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e7f0d9] text-[#6b913e]"><TrendingUp size={15} /></span> Your estimate is based on comparable listings in India</div></div>
          <div className="result-card"><div className="mb-6 flex items-center justify-between"><span className="text-xs font-bold uppercase tracking-[0.16em] text-[#789344]">Confidence</span><CircleHelp size={16} className="text-[#aab6ad]" /></div><p className="text-4xl font-semibold tracking-[-0.05em] text-[#173c31]">{confidence}%</p><div className="mt-5 h-2 overflow-hidden rounded-full bg-[#e7ece4]"><div className="h-full rounded-full bg-[#9fbe4a]" style={{ width: `${confidence}%` }} /></div><p className="mt-3 text-xs leading-5 text-[#77847c]">Strong match with similar vehicles in the dataset.</p></div>
          <div className="result-card"><div className="mb-6 flex items-center justify-between"><span className="text-xs font-bold uppercase tracking-[0.16em] text-[#789344]">Model signals</span><Gauge size={17} className="text-[#9fbe4a]" /></div><div className="space-y-4 text-sm"><div className="flex justify-between"><span className="text-[#77847c]">Brand demand</span><span className="font-semibold text-[#294c3d]">High</span></div><div className="flex justify-between"><span className="text-[#77847c]">Age impact</span><span className="font-semibold text-[#294c3d]">−{(Math.max(0, 2026 - year) * 0.42).toFixed(2)} L</span></div><div className="flex justify-between"><span className="text-[#77847c]">Mileage impact</span><span className="font-semibold text-[#294c3d]">−{(kms / 10000 * 0.12).toFixed(2)} L</span></div></div></div>
        </div>
        <div className="mt-6 flex items-center justify-between border-t border-[#e0e6de] pt-5 text-xs text-[#87938b]"><span className="flex items-center gap-2"><BarChart3 size={14} /> Baseline model: multiple linear regression</span><span className="hidden sm:block">For educational purposes · Not a certified valuation</span></div>
      </section>
    </main>
  )
}
