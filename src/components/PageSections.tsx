import { useState, useEffect } from 'react';
import { Package, Flame, Gift, Rocket, Headphones, PackageSearch, Undo2, CreditCard, Truck, User, Phone, Mail, Instagram, Facebook, Banknote } from 'lucide-react';
import { useTranslation } from '@/lib/TranslationContext';

export function ShopPage() {
  const { t } = useTranslation();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, productsRes] = await Promise.all([
          fetch('/api/categories'),
          fetch('/api/products')
        ]);
        const categoriesData = await categoriesRes.json();
        const productsData = await productsRes.json();
        
        setCategories(categoriesData);
        setProducts(productsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching shop data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getCategoryImage = (categoryName: string) => {
    if (!Array.isArray(products)) return null;
    const categoryProduct = products.find(p => p.category === categoryName && p.imageUrl);
    return categoryProduct?.imageUrl || null;
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl p-12 shadow-lg text-center">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-gray-100 rounded-xl h-48" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 sm:p-8 lg:p-12 shadow-lg">
      <h2 className="text-2xl sm:text-3xl font-bold text-[#730000] mb-4 text-center">{t.pageSections.shop.title}</h2>
      <p className="text-sm sm:text-base text-gray-600 mb-8 text-center">{t.pageSections.shop.subtitle}</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {categories.map((cat: any) => {
          const imageUrl = getCategoryImage(cat.name);
          return (
            <div 
              key={cat.id} 
              className="bg-gray-50 rounded-xl overflow-hidden cursor-pointer border-2 border-transparent hover:border-[#730000] transition-all group"
            >
              <div className="aspect-square bg-gray-100 overflow-hidden">
                {imageUrl ? (
                  <img 
                    src={imageUrl} 
                    alt={cat.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Package className="w-16 h-16 text-gray-400" />
                  </div>
                )}
              </div>
              <div className="p-4 text-center">
                <h3 className="text-sm sm:text-base font-bold text-[#233D4C] group-hover:text-[#730000] transition-colors">{cat.name}</h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function DealsPage({ onNavigateHome }: { onNavigateHome: () => void }) {
  const { t } = useTranslation();
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await fetch('/api/promo-banners');
        const data = await res.json();
        setBanners(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching banners:', error);
        setLoading(false);
      }
    };
    fetchBanners();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-xl p-12 shadow-lg">
        <div className="animate-pulse space-y-6">
          <div className="h-10 bg-gray-200 rounded w-1/2 mx-auto" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-100 rounded-xl h-96" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 sm:p-8 lg:p-12 shadow-lg">
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#730000] mb-3">{t.pageSections.deals.title}</h2>
        <p className="text-lg text-gray-600">{t.pageSections.deals.subtitle}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {banners.map((banner: any) => (
          <div 
            key={banner.id} 
            className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 group cursor-pointer"
          >
            <div className="relative h-64 overflow-hidden">
              <img 
                src={banner.imageUrl} 
                alt={banner.title} 
                className="w-full h-full object-contain bg-gray-50"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-[#730000] mb-2 group-hover:text-[#FD802E] transition-colors">{banner.title}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{banner.subtitle || t.pageSections.deals.specialOffer}</p>
              <button onClick={onNavigateHome} className="w-full bg-[#730000] hover:bg-[#FD802E] text-white font-bold py-3 rounded-lg transition-all duration-300 transform group-hover:scale-105">
                {t.pageSections.deals.shopNow}
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {banners.length === 0 && (
        <div className="text-center py-12">
          <Gift className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 text-xl">{t.pageSections.deals.noDeals}</p>
        </div>
      )}
    </div>
  );
}

export function HowToBuyPage() {
  const { t } = useTranslation();
  const steps = [
    { 
      number: 1, 
      title: t.pageSections.howToBuy.steps.browseProducts.title, 
      desc: t.pageSections.howToBuy.steps.browseProducts.desc,
      Icon: PackageSearch 
    },
    { 
      number: 2, 
      title: t.pageSections.howToBuy.steps.addToCart.title, 
      desc: t.pageSections.howToBuy.steps.addToCart.desc,
      Icon: Package 
    },
    { 
      number: 3, 
      title: t.pageSections.howToBuy.steps.checkout.title, 
      desc: t.pageSections.howToBuy.steps.checkout.desc,
      Icon: CreditCard 
    },
    { 
      number: 4, 
      title: t.pageSections.howToBuy.steps.confirmOrder.title, 
      desc: t.pageSections.howToBuy.steps.confirmOrder.desc,
      Icon: Phone 
    },
    { 
      number: 5, 
      title: t.pageSections.howToBuy.steps.payment.title, 
      desc: t.pageSections.howToBuy.steps.payment.desc,
      Icon: Banknote
    },
    { 
      number: 6, 
      title: t.pageSections.howToBuy.steps.delivery.title, 
      desc: t.pageSections.howToBuy.steps.delivery.desc,
      Icon: Truck 
    }
  ];

  return (
    <div className="bg-white rounded-xl p-6 sm:p-8 lg:p-12 shadow-lg max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#730000] mb-3">{t.pageSections.howToBuy.title}</h2>
        <p className="text-base text-gray-600">{t.pageSections.howToBuy.subtitle}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {steps.map(({ number, title, desc, Icon }) => (
          <div key={number} className="bg-gray-50 p-6 rounded-xl border-2 border-transparent hover:border-[#730000] transition-all">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#730000] text-white rounded-full flex items-center justify-center text-xl font-bold">
                {number}
              </div>
              <div className="flex-1">
                <Icon className="w-8 h-8 text-[#FD802E] mb-3" />
                <h3 className="text-lg font-bold text-[#233D4C] mb-2">{title}</h3>
                <p className="text-sm text-gray-600">{desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-12 bg-[#730000] text-white p-6 rounded-xl text-center">
        <h3 className="text-xl font-bold mb-2">{t.pageSections.howToBuy.needHelp.title}</h3>
        <p className="text-sm mb-4">{t.pageSections.howToBuy.needHelp.description}</p>
        <button className="bg-white text-[#730000] px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
          {t.pageSections.howToBuy.needHelp.button}
        </button>
      </div>
    </div>
  );
}

export function ContactUsPage() {
  const { t } = useTranslation();
  return (
    <div className="bg-white rounded-xl p-6 sm:p-8 lg:p-12 shadow-lg max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#730000] mb-3">{t.pageSections.contact.title}</h2>
        <p className="text-base text-gray-600">{t.pageSections.contact.subtitle}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-gray-50 p-6 rounded-xl">
          <h3 className="text-xl font-bold text-[#730000] mb-4">{t.pageSections.contact.nyamirambo.title}</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-[#FD802E]" />
              <span className="text-gray-700">{t.pageSections.contact.nyamirambo.phone}</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-[#FD802E]" />
              <span className="text-gray-700">{t.pageSections.contact.nyamirambo.email}</span>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-xl">
          <h3 className="text-xl font-bold text-[#730000] mb-4">{t.pageSections.contact.gikondo.title}</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-[#FD802E]" />
              <span className="text-gray-700">{t.pageSections.contact.gikondo.phone}</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-[#FD802E]" />
              <span className="text-gray-700">{t.pageSections.contact.gikondo.email}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 p-8 rounded-xl mb-8">
        <h3 className="text-xl font-bold text-[#730000] mb-6 text-center">{t.pageSections.contact.connectWithUs}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <a href="#" className="flex items-center justify-center gap-3 p-4 bg-white rounded-lg border-2 border-transparent hover:border-[#730000] transition-all">
            <Instagram className="w-6 h-6 text-[#730000]" />
            <span className="font-semibold text-[#730000]">{t.pageSections.contact.socialMedia.instagram}</span>
          </a>
          <a href="#" className="flex items-center justify-center gap-3 p-4 bg-white rounded-lg border-2 border-transparent hover:border-[#730000] transition-all">
            <span className="text-xl font-bold text-[#730000]">TT</span>
            <span className="font-semibold text-[#730000]">{t.pageSections.contact.socialMedia.tiktok}</span>
          </a>
          <a href="#" className="flex items-center justify-center gap-3 p-4 bg-white rounded-lg border-2 border-transparent hover:border-[#730000] transition-all">
            <Facebook className="w-6 h-6 text-[#730000]" />
            <span className="font-semibold text-[#730000]">{t.pageSections.contact.socialMedia.facebook}</span>
          </a>
        </div>
      </div>
      
      <div className="bg-[#730000] text-white p-6 rounded-xl text-center">
        <h3 className="text-xl font-bold mb-2">{t.pageSections.contact.googleReviews.title}</h3>
        <p className="text-sm mb-4">{t.pageSections.contact.googleReviews.description}</p>
        <a href="https://maps.app.goo.gl/UpKCmTXuPhvjdSF78" target="_blank" rel="noopener noreferrer" className="inline-block bg-white text-[#730000] px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
          {t.pageSections.contact.googleReviews.button}
        </a>
      </div>
    </div>
  );
}

export function HelpCenterPage() {
  const { t } = useTranslation();
  const helpItems = [
    { title: t.pageSections.helpCenter.items.orderTracking.title, desc: t.pageSections.helpCenter.items.orderTracking.desc, Icon: PackageSearch },
    { title: t.pageSections.helpCenter.items.returns.title, desc: t.pageSections.helpCenter.items.returns.desc, Icon: Undo2 },
    { title: t.pageSections.helpCenter.items.payment.title, desc: t.pageSections.helpCenter.items.payment.desc, Icon: CreditCard },
    { title: t.pageSections.helpCenter.items.shipping.title, desc: t.pageSections.helpCenter.items.shipping.desc, Icon: Truck },
    { title: t.pageSections.helpCenter.items.account.title, desc: t.pageSections.helpCenter.items.account.desc, Icon: User },
    { title: t.pageSections.helpCenter.items.contactUs.title, desc: t.pageSections.helpCenter.items.contactUs.desc, Icon: Phone }
  ];

  return (
    <div className="bg-white rounded-xl p-12 shadow-lg max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-[#730000] mb-8 text-center">{t.pageSections.helpCenter.title}</h2>
      <div className="grid grid-cols-2 gap-6">
        {helpItems.map(({ title, desc, Icon }) => (
          <div key={title} className="bg-gray-50 p-6 rounded-xl cursor-pointer border-2 border-transparent hover:border-[#730000] transition-all">
            <Icon className="w-10 h-10 text-[#730000] mb-3" />
            <h4 className="text-lg font-bold text-[#233D4C] mb-2">{title}</h4>
            <p className="text-sm text-gray-600">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
