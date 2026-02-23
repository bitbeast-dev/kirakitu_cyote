import { bestsellers } from '@/lib/kirakitu-products'

export default function BestsellersSidebar() {
  return (
    <div className="bg-gradient-to-b from-pink-100 to-pink-200 p-6 shadow-md flex flex-col gap-4">
      <h3 className="font-display text-2xl text-pink-600 text-center border-b-2 border-pink-300 pb-3">
        BESTSELLERS
      </h3>
      {bestsellers.map((item) => (
        <div key={item.id} className="bg-white p-3 shadow-sm flex flex-col items-center gap-2 hover:shadow-md transition-shadow">
          <img src={item.image} alt={item.name} className="w-full h-28 object-cover" />
          <p className="font-body font-bold text-gray-700 text-sm text-center">{item.name}</p>
          <span className="font-body text-pink-500 font-bold text-sm">{item.price}</span>
          <button className="bg-pink-400 text-white text-xs font-bold px-5 py-1.5 hover:bg-pink-500 transition-colors w-full">
            SHOP NOW
          </button>
        </div>
      ))}
    </div>
  )
}
