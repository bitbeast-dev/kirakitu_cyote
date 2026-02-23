interface CategoryCardProps {
  title: string
  subtitle: string
  description: string
  bgColor: string
  image: string
  buttonColor: string
}

export default function CategoryCard({
  title,
  subtitle,
  description,
  bgColor,
  image,
  buttonColor,
}: CategoryCardProps) {
  return (
    <div className={`${bgColor} p-4 sm:p-6 lg:p-8 shadow-lg flex flex-col sm:flex-row items-center gap-4 sm:gap-6 relative overflow-hidden`}>
      <div className="flex-1 text-center sm:text-left">
        <h3 className="font-display text-2xl sm:text-3xl text-white leading-tight mb-1">{title}</h3>
        <h4 className="font-display text-xl sm:text-2xl text-white mb-3">{subtitle}</h4>
        <p className="font-body text-white text-sm opacity-90 mb-4 sm:mb-5 leading-relaxed">{description}</p>
        <button
          className={`${buttonColor} text-white font-body font-bold px-6 sm:px-8 py-2 sm:py-2.5 shadow-md hover:scale-105 transition-transform duration-200 text-sm tracking-wide`}
        >
          SHOP NOW
        </button>
      </div>
      <div className="w-32 sm:w-40 lg:w-48 flex-shrink-0">
        <img src={image} alt={title} className="w-full object-contain drop-shadow-lg" />
      </div>
    </div>
  )
}
