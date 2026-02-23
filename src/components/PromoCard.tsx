interface PromoCardProps {
  title: string
  description: string
  bgClass: string
  buttonClass: string
}

export default function PromoCard({ title, description, bgClass, buttonClass }: PromoCardProps) {
  return (
    <div className={`${bgClass} p-6 sm:p-8 lg:p-10 flex flex-col items-center justify-center text-center shadow-lg`}>
      <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl text-white mb-2 sm:mb-3">{title}</h3>
      <p className="font-body text-white text-sm opacity-90 mb-4 sm:mb-6 max-w-xs leading-relaxed">{description}</p>
      <button
        className={`${buttonClass} text-white font-body font-bold px-8 sm:px-10 py-2 sm:py-3 shadow-md hover:scale-105 transition-transform duration-200`}
      >
        SHOP NOW
      </button>
    </div>
  )
}
