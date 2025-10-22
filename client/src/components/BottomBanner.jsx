import React from 'react'
import { assets } from '../assets/assets'

const features = [
  { icon: assets.delivery_truck_icon, title: 'Fastest Delivery', desc: 'Groceries delivered in under 30 minutes.' },
  { icon: assets.leaf_icon, title: 'Freshness Guaranteed', desc: 'Fresh produce straight from the source.' },
  { icon: assets.coin_icon, title: 'Affordable Prices', desc: 'Quality groceries at unbeatable prices.' },
  { icon: assets.trust_icon, title: 'Trusted by Thousands', desc: 'Loved by 10,000+ happy customers.' },
]

const BottomBanner = () => {
  return (
    <section className="relative mt-24">
      {/* responsive background images */}
      <img src={assets.bottom_banner_image} alt="Banner" className="w-full hidden md:block" />
      <img src={assets.bottom_banner_image_sm} alt="Banner" className="w-full md:hidden" />

      {/* overlay content for desktop */}
      <div className="hidden md:block absolute inset-0 pointer-events-none">
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-8">
          {/* left area intentionally left (image sits behind) */}
          <div className="w-1/2"></div>

          {/* right features list */}
            <div className="w-1/2 md:pl-35">
            <h3 className="text-3xl font-semibold text-primary mb-6">Why We Are the Best?</h3>
            <ul className="flex flex-col gap-4">
              {features.map((f, idx) => (
                <li key={idx} className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary rounded-md flex items-center justify-center">
                    <img src={f.icon} alt="icon" className="w-12 h-12" />
                  </div>
                  <div>
                    <div className="font-semibold text-black">{f.title}</div>
                    <div className="text-sm text-gray-600">{f.desc}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      

      {/* mobile features stacked below banner */}
      <div className="md:hidden max-w-3xl mx-auto px-4 mt-4">
        <h3 className="text-xl font-semibold text-primary mb-4 text-center">Why We Are the Best?</h3>
        <ul className="flex flex-col gap-3">
          {features.map((f, idx) => (
            <li key={idx} className="flex items-start gap-3 bg-white/60 rounded-lg p-3">
              <div className="w-10 h-10 bg-primary rounded-md flex items-center justify-center flex-shrink-0">
                <img src={f.icon} alt="icon" className="w-5 h-5" />
              </div>
              <div>
                <div className="font-medium text-black">{f.title}</div>
                <div className="text-sm text-gray-600">{f.desc}</div>
              </div>
            </li>
          ))}
        </ul>

        {/* mobile floating badge centered under image */}
        <div className="flex justify-center mt-4">
          <div className="bg-white rounded-full px-4 py-2 shadow-md flex items-center gap-3">
            <img src={assets.delivery_truck_icon} alt="truck" className="w-5 h-5" />
            <div className="text-left">
              <div className="text-sm font-medium text-primary">Fast Delivery</div>
              <div className="text-xs text-gray-600">In 30 Min</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BottomBanner