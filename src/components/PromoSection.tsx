import React from 'react';

const PromoSection = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#2D2D2D] to-[#1A1A1A] py-20 px-8">
      {/* Main Bubbles Section */}
      <div className="relative flex justify-center items-center mb-20">
        {/* Left Bubble */}
        <div className="relative">
          <div 
            className="w-48 h-48 rounded-full flex flex-col items-center justify-center"
            style={{
              background: 'radial-gradient(circle at 30% 30%, #00BFFF, #007BFF)',
              boxShadow: '0 0 60px rgba(0, 191, 255, 0.8), inset -20px -20px 40px rgba(0, 0, 0, 0.3)'
            }}
          >
            <svg className="w-12 h-12 text-white mb-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z"/>
            </svg>
            <span className="text-white font-bold text-lg">New Arrivals</span>
          </div>
        </div>

        {/* Connecting Line 1 */}
        <div 
          className="w-32 h-0.5 mx-8"
          style={{
            background: 'linear-gradient(90deg, #00BFFF, #00FFFF)',
            boxShadow: '0 0 20px rgba(0, 191, 255, 0.6)'
          }}
        />

        {/* Middle Bubble */}
        <div className="relative">
          <div 
            className="w-48 h-48 rounded-full flex items-center justify-center"
            style={{
              background: 'radial-gradient(circle at 30% 30%, #00FFFF, #00BFFF)',
              boxShadow: '0 0 60px rgba(0, 255, 255, 0.8), inset -20px -20px 40px rgba(0, 0, 0, 0.3)'
            }}
          >
            <div className="w-20 h-32 bg-white rounded-lg relative overflow-hidden">
              <div className="w-full h-8 bg-blue-500"></div>
              <div className="p-2 space-y-1">
                <div className="w-full h-2 bg-red-400 rounded"></div>
                <div className="w-3/4 h-2 bg-green-400 rounded"></div>
                <div className="w-1/2 h-2 bg-yellow-400 rounded"></div>
                <div className="w-full h-2 bg-purple-400 rounded"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Connecting Line 2 */}
        <div 
          className="w-32 h-0.5 mx-8"
          style={{
            background: 'linear-gradient(90deg, #00FFFF, #FF00FF)',
            boxShadow: '0 0 20px rgba(0, 255, 255, 0.6)'
          }}
        />

        {/* Right Bubble */}
        <div className="relative">
          <div 
            className="w-48 h-48 rounded-full flex items-center justify-center"
            style={{
              background: 'radial-gradient(circle at 30% 30%, #FF00FF, #A020F0)',
              boxShadow: '0 0 60px rgba(255, 0, 255, 0.8), inset -20px -20px 40px rgba(0, 0, 0, 0.3)'
            }}
          >
            <div className="relative">
              <svg className="w-16 h-12 text-white" fill="currentColor" viewBox="0 0 100 60">
                <ellipse cx="20" cy="45" rx="8" ry="8" />
                <ellipse cx="70" cy="45" rx="8" ry="8" />
                <path d="M15 45 L15 25 Q15 15 25 15 L60 15 Q70 15 70 25 L70 35 L75 35 L75 45" stroke="currentColor" strokeWidth="3" fill="none"/>
                <rect x="65" y="20" width="15" height="10" rx="2" fill="#007BFF"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Content Columns */}
      <div className="max-w-7xl mx-auto grid grid-cols-3 gap-16">
        {/* Left Column */}
        <div className="text-left">
          <h2 className="text-5xl font-bold text-white mb-8">New Arrivals</h2>
          <ul className="text-white text-base space-y-2 mb-8 list-disc list-inside">
            <li>Tegulrung rætting</li>
            <li>Exturish Beamming</li>
            <li>Suckurstine Cunsing</li>
            <li>Actinia blesse nn</li>
            <li>3relinonah ccendes.js</li>
          </ul>
          <div className="space-y-4">
            <div className="w-36 h-24 bg-gray-800 border border-white rounded flex items-center justify-center">
              <span className="text-white text-xs">Black Boots</span>
            </div>
            <div className="w-36 h-24 bg-gray-800 border border-white rounded flex items-center justify-center">
              <span className="text-white text-xs">Turtlenecks</span>
            </div>
          </div>
        </div>

        {/* Middle Column */}
        <div className="text-left">
          <h2 className="text-5xl font-bold text-white mb-8">Exclusive Deals</h2>
          <ul className="text-white text-base space-y-2 mb-8 list-disc list-inside">
            <li>Exclunbeitæn</li>
            <li>Eoclu Blan Catesoon</li>
            <li>Bocondinat Harisfiads</li>
            <li>Accessnieriæth ood:34</li>
            <li>Årdien Sjøles.</li>
          </ul>
          <div className="space-y-4">
            <div className="w-36 h-24 bg-gray-800 border border-white rounded flex items-center justify-center">
              <span className="text-white text-xs">Chelsea Boots</span>
            </div>
            <div className="w-36 h-24 bg-gray-800 border border-white rounded flex items-center justify-center">
              <span className="text-white text-xs">iPhone App</span>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="text-left">
          <h2 className="text-5xl font-bold text-white mb-8">Customer Stories</h2>
          <ul className="text-white text-base space-y-2 mb-8 list-disc list-inside">
            <li>Euslærome Stories.</li>
            <li>Ådsen Storiæ.</li>
            <li>Sponsruan Dossieæna</li>
            <li>Thildy Lænredziging</li>
            <li>Sperferolcio:6</li>
          </ul>
          <div className="space-y-4">
            <div className="w-36 h-24 bg-gray-800 border border-white rounded flex items-center justify-center">
              <span className="text-white text-xs">White Scooter</span>
            </div>
            <div className="w-36 h-24 bg-gray-800 border border-white rounded flex items-center justify-center">
              <span className="text-white text-xs">Delivery Scooter</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoSection;