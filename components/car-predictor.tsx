'use client'

import { useMemo, useState } from 'react'
import { ArrowUpRight, BarChart3, CarFront, CircleHelp, Crown, Gauge, IndianRupee, RotateCcw, Search, Sparkles, SlidersHorizontal, TrendingUp } from 'lucide-react'

const brands = ['Maruti', 'Hyundai', 'Honda', 'Toyota', 'Tata', 'Mahindra', 'Kia', 'Volkswagen']
const fuels = ['Petrol', 'Diesel', 'CNG', 'Electric']

const featuredCars = [
  { name: 'Maruti Swift', meta: '2019 · Petrol · 42,000 km', price: '₹6.84 Lakh', image: '/cars/maruti-swift.png' },
  { name: 'Hyundai Creta', meta: '2020 · Diesel · 51,200 km', price: '₹12.40 Lakh', image: '/cars/hyundai-creta.png' },
  { name: 'Honda City', meta: '2018 · Petrol · 38,600 km', price: '₹8.15 Lakh', image: '/cars/honda-city.png' },
  { name: 'Tata Nexon', meta: '2021 · Petrol · 27,900 km', price: '₹9.35 Lakh', image: '/cars/tata-nexon.png' },
]

const catalogBrands = [
  { brand: 'Maruti', models: ['Swift', 'Baleno', 'Wagon R', 'Dzire', 'Brezza', 'Ertiga', 'Ciaz', 'S-Presso', 'Jimny', 'Ignis'], image: '/cars/maruti-swift.png' },
  { brand: 'Hyundai', models: ['Creta', 'i20', 'Venue', 'Verna', 'Grand i10', 'Exter', 'Alcazar', 'Tucson', 'Aura', 'Kona'], image: '/cars/hyundai-creta.png' },
  { brand: 'Honda', models: ['City', 'Amaze', 'Jazz', 'WR-V', 'Elevate', 'Civic', 'CR-V', 'Brio', 'Mobilio', 'Accord'], image: '/cars/honda-city.png' },
  { brand: 'Tata', models: ['Nexon', 'Punch', 'Harrier', 'Safari', 'Altroz', 'Tiago', 'Tigor', 'Curvv', 'Hexa', 'Bolt'], image: '/cars/tata-nexon.png' },
  { brand: 'Toyota', models: ['Innova Crysta', 'Fortuner', 'Glanza', 'Urban Cruiser', 'Camry', 'Vellfire', 'Corolla', 'Yaris', 'Etios', 'Rumion'], image: '/cars/hyundai-creta.png' },
  { brand: 'Mahindra', models: ['Thar', 'XUV700', 'Scorpio', 'Bolero', 'XUV300', 'Marazzo', 'Alturas G4', 'KUV100', 'TUV300', 'BE 6'], image: '/cars/tata-nexon.png' },
  { brand: 'Kia', models: ['Seltos', 'Sonet', 'Carens', 'EV6', 'Carnival', 'Syros', 'Sportage', 'EV9', 'Sorento', 'Picanto'], image: '/cars/hyundai-creta.png' },
  { brand: 'Volkswagen', models: ['Virtus', 'Taigun', 'Polo', 'Vento', 'Tiguan', 'T-Roc', 'Ameo', 'Passat', 'Jetta', 'Beetle'], image: '/cars/maruti-swift.png' },
  { brand: 'BMW', models: ['3 Series', '5 Series', '7 Series', 'X1', 'X3', 'X5', 'X7', 'i4', 'iX', 'M4'], image: '/cars/honda-city.png' },
  { brand: 'Mercedes-Benz', models: ['A-Class', 'C-Class', 'E-Class', 'S-Class', 'GLA', 'GLC', 'GLE', 'GLS', 'EQS', 'G-Class'], image: '/cars/hyundai-creta.png' },
  { brand: 'Audi', models: ['A4', 'A6', 'A8', 'Q3', 'Q5', 'Q7', 'Q8', 'e-tron', 'S5', 'RS5'], image: '/cars/tata-nexon.png' },
  { brand: 'Volvo', models: ['S60', 'S90', 'XC40', 'XC60', 'XC90', 'C40', 'EX30', 'EX40', 'V40', 'V90'], image: '/cars/honda-city.png' },
  { brand: 'Lexus', models: ['ES', 'LS', 'NX', 'RX', 'LX', 'LC', 'LM', 'UX', 'IS', 'RZ'], image: '/cars/hyundai-creta.png' },
  { brand: 'Jaguar', models: ['XE', 'XF', 'F-Pace', 'E-Pace', 'I-Pace', 'F-Type', 'XJ', 'XK', 'S-Type', 'X-Type'], image: '/cars/tata-nexon.png' },
  { brand: 'Land Rover', models: ['Defender', 'Range Rover', 'Discovery', 'Evoque', 'Velar', 'Sport', 'Freelander', 'Series I', 'Series II', 'Series III'], image: '/cars/hyundai-creta.png' },
  { brand: 'Porsche', models: ['911', 'Cayenne', 'Macan', 'Panamera', 'Taycan', '718 Cayman', '718 Boxster', 'Carrera', 'Turbo S', 'GT3'], image: '/cars/honda-city.png' },
  { brand: 'Skoda', models: ['Slavia', 'Kushaq', 'Kodiaq', 'Superb', 'Octavia', 'Rapid', 'Karoq', 'Fabia', 'Laura', 'Yeti'], image: '/cars/maruti-swift.png' },
  { brand: 'Renault', models: ['Kwid', 'Kiger', 'Triber', 'Duster', 'Captur', 'Fluence', 'Lodgy', 'Pulse', 'Scala', 'Koleos'], image: '/cars/tata-nexon.png' },
  { brand: 'Nissan', models: ['Magnite', 'Kicks', 'Terrano', 'Micra', 'Sunny', 'X-Trail', 'Qashqai', 'Leaf', '370Z', 'Patrol'], image: '/cars/hyundai-creta.png' },
  { brand: 'MG', models: ['Hector', 'Astor', 'Gloster', 'ZS EV', 'Comet', 'Windsor', 'Marvel R', 'HS', '5', 'Cyberster'], image: '/cars/honda-city.png' },
]

const catalog = catalogBrands.flatMap(({ brand, models, image }) => models.map((model, index) => ({
  name: `${brand} ${model}`, brand, image, premium: ['BMW', 'Mercedes-Benz', 'Audi', 'Volvo', 'Lexus', 'Jaguar', 'Land Rover', 'Porsche'].includes(brand), year: 2017 + (index % 8), fuel: index % 4 === 0 ? 'Diesel' : index % 5 === 0 ? 'Electric' : 'Petrol', km: 18000 + index * 4700, price: 4.2 + index * 0.8 + (['BMW', 'Mercedes-Benz', 'Audi', 'Volvo', 'Lexus', 'Jaguar', 'Land Rover', 'Porsche'].includes(brand) ? 22 : 0),
})))

function formatPrice(value: number) {
  return `₹${value.toFixed(2)} Lakh`
}

export function CarPredictor() {
  const [brand, setBrand] = useState('Maruti')
  const [fuel, setFuel] = useState('Petrol')
  const [year, setYear] = useState(2019)
  const [kms, setKms] = useState(42000)
  const [result, setResult] = useState(6.84)
  const [search, setSearch] = useState('')
  const [showPremium, setShowPremium] = useState(false)
  const [visibleCount, setVisibleCount] = useState(12)

  const filteredCatalog = useMemo(() => catalog.filter(car => {
    const matchesSearch = car.name.toLowerCase().includes(search.toLowerCase())
    return matchesSearch && (!showPremium || car.premium)
  }), [search, showPremium])

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
        <div className="mb-10 rounded-[24px] border border-[#dfe7d9] bg-[#edf3e8] p-5 md:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div><div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#789344]"><SlidersHorizontal size={14} /> Browse inventory</div><p className="mt-2 text-sm text-[#66766b]">Explore all {catalog.length}+ models, from everyday hatchbacks to premium performance cars.</p></div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <label className="relative"><Search size={16} className="absolute left-3 top-3 text-[#85938a]" /><span className="sr-only">Search cars</span><input value={search} onChange={e => { setSearch(e.target.value); setVisibleCount(12) }} placeholder="Search car or brand" className="h-10 w-full rounded-xl border border-[#d7e1d3] bg-white pl-9 pr-3 text-sm outline-none ring-[#9fbe4a] placeholder:text-[#9aa69e] focus:ring-2 sm:w-56" /></label>
              <button onClick={() => { setShowPremium(!showPremium); setVisibleCount(12) }} className={`flex h-10 items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold transition ${showPremium ? 'bg-[#173c31] text-white' : 'border border-[#d7e1d3] bg-white text-[#40584b] hover:border-[#9fbe4a]'}`}><Crown size={15} /> {showPremium ? 'Premium only' : 'Show premium'}</button>
            </div>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredCatalog.slice(0, visibleCount).map(car => <article key={car.name} className="group overflow-hidden rounded-2xl border border-[#e1e7de] bg-white transition hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(43,68,47,0.12)]"><div className="relative"><img src={car.image} alt={`${car.name} car`} className="h-28 w-full object-cover transition duration-300 group-hover:scale-105" />{car.premium && <span className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-[#173c31]/90 px-2 py-1 text-[10px] font-bold text-[#d7f26d]"><Crown size={10} /> PREMIUM</span>}</div><div className="p-3"><div className="flex items-start justify-between gap-2"><h3 className="text-sm font-semibold text-[#244536]">{car.name}</h3><span className="text-xs font-bold text-[#6c8b3d]">₹{car.price.toFixed(1)}L</span></div><p className="mt-1 text-[11px] text-[#849087]">{car.year} · {car.fuel} · {(car.km / 1000).toFixed(1)}k km</p></div></article>)}
          </div>
          {filteredCatalog.length === 0 && <p className="py-8 text-center text-sm text-[#77847c]">No cars match that search.</p>}
          {visibleCount < filteredCatalog.length && <button onClick={() => setVisibleCount(count => count + 12)} className="mx-auto mt-6 flex rounded-xl border border-[#bfd0b8] bg-white px-5 py-2.5 text-sm font-bold text-[#315342] transition hover:border-[#789344] hover:bg-[#f8fbf6]">Load more cars <span className="ml-2 text-[#789344]">({filteredCatalog.length - visibleCount} left)</span></button>}
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
