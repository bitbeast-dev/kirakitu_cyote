interface ProductCardProps {
  name: string
  description: string
  image: string
  price: string
}

export default function ProductCard({ name, description, image, price }: ProductCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer group">
      <div className="bg-gradient-to-br from-pink-50 to-blue-50 p-4 flex items-center justify-center h-44">
        <img src={image} alt={name} className="h-full object-contain" />
      </div>
      <div className="p-4">
        <h4 className="font-display text-lg text-gray-800 mb-1">{name}</h4>
        <p className="font-body text-gray-500 text-xs leading-relaxed mb-3 line-clamp-2">{description}</p>
        <div className="flex items-center justify-between">
          <span className="font-body font-bold text-pink-500 text-sm">{price}</span>
          <button className="bg-gradient-to-r from-pink-400 to-pink-500 text-white font-body font-bold px-4 py-1.5 rounded-full text-xs hover:from-pink-500 hover:to-pink-600 transition-all duration-200 shadow">
            SHOP NOW
          </button>
        </div>
      </div>
    </div>
  )
}
