"use client";

import {
  Search,
  User,
  ShoppingCart,
  Menu,
  Star,
  ArrowRight,
  X,
  Plus,
  Minus,
  Trash2,
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  ChevronLeft,
  ChevronRight,
 LucideLocationEdit 
} from "lucide-react";

import { useState, useEffect } from "react";
import React from "react";
import AdminLoginModal from "./AdminLoginModal";
import { useTranslation } from "@/lib/TranslationContext";
import LanguageSwitcher from "./LanguageSwitcher";
import {
  ShopPage,
  DealsPage,
  HowToBuyPage,
  ContactUsPage,
  HelpCenterPage,
} from "./PageSections";

const CategoryCarousel = ({
  category,
  products,
  currentIndex,
  onIndexChange,
  addToCart,
  addedToCart,
  t,
}: any) => {
  const [shuffledProducts, setShuffledProducts] = useState([]);

  useEffect(() => {
    const cacheKey = `shuffled_${category.id}`;
    const cached = sessionStorage.getItem(cacheKey);
    
    if (cached) {
      setShuffledProducts(JSON.parse(cached));
    } else {
      const shuffled = [...products].sort(() => Math.random() - 0.5);
      setShuffledProducts(shuffled);
      sessionStorage.setItem(cacheKey, JSON.stringify(shuffled));
    }
  }, [products, category.id]);

  const displayProducts = shuffledProducts;

  const handleCategoryNavigation = (direction: "left" | "right") => {
    const nextIndex =
      direction === "right"
        ? currentIndex + 4 >= shuffledProducts.length
          ? 0
          : currentIndex + 4
        : currentIndex - 4 < 0
          ? Math.max(0, shuffledProducts.length - 4)
          : currentIndex - 4;
    onIndexChange(nextIndex);
  };

  return (
    <div className="mb-3 sm:mb-4 lg:mb-4">
      <div className="flex items-center justify-between mb-2 sm:mb-3">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#233D4C]">
          {category.name}
        </h2>
        <div className="flex gap-1 sm:gap-2">
          <button
            onClick={() => handleCategoryNavigation("left")}
            className="w-[24px] h-[24px] sm:w-[28px] sm:h-[28px] lg:w-[30px] lg:h-[30px] bg-[#ca0408] hover:bg-[#9D0208] border-none rounded-full flex items-center justify-center cursor-pointer shadow-[0_2px_8px_rgba(0,0,0,0.2)] transition-colors duration-200"
          >
            <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
          </button>
          <button
            onClick={() => handleCategoryNavigation("right")}
            className="w-[24px] h-[24px] sm:w-[28px] sm:h-[28px] lg:w-[30px] lg:h-[30px] bg-[#ca0408] hover:bg-[#9D0208] border-none rounded-full flex items-center justify-center cursor-pointer shadow-[0_2px_8px_rgba(0,0,0,0.2)] transition-colors duration-200"
          >
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
          </button>
        </div>
      </div>

      <div className="overflow-hidden">
        <div
          className="flex gap-2 sm:gap-3 lg:gap-4"
        >
          {displayProducts.slice(currentIndex, currentIndex + 4).map((product: any, idx) => (
            <div
              key={`${product.id}-${idx}`}
              className="bg-white overflow-hidden relative h-[280px] sm:h-[320px] lg:h-[340px] flex flex-col group flex-shrink-0"
              style={{
                width:
                  window.innerWidth >= 1024
                    ? "calc(25% - 12px)"
                    : window.innerWidth >= 768
                      ? "calc(33.333% - 10px)"
                      : "calc(50% - 4px)",
                maxWidth:
                  window.innerWidth >= 1024
                    ? "300px"
                    : window.innerWidth >= 768
                      ? "250px"
                      : "180px",
                scrollSnapAlign: 'start'
              }}
            >
              {product.discount && (
                <div className="absolute top-2 left-2 bg-[#FD802E] text-white text-xs font-bold px-2 py-1 rounded z-10">
                  {product.discount} {t.product.off}
                </div>
              )}
              {!product.inStock && (
                <div className="absolute top-2 right-2 bg-gray-500 text-white text-xs font-bold px-2 py-1 rounded z-10">
                  {t.product.outOfStock}
                </div>
              )}
              <div className="aspect-square overflow-hidden bg-gray-100">
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl">
                    📦
                  </div>
                )}
              </div>
              <div className="p-2 sm:p-3 flex-1 flex flex-col">
                <div className="text-xs text-gray-500 mb-1">
                  {product.brand}
                </div>
                <h3 className="text-xs sm:text-sm font-semibold text-[#233D4C] mb-2 line-clamp-2">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm sm:text-base font-bold text-[#ca0408]">
                    {product.price} {t.product.rwf}
                  </span>
                  {product.oldPrice && (
                    <span className="text-xs text-gray-400 line-through">
                      {product.oldPrice}
                    </span>
                  )}
                </div>
                {product.wholesalePrice && product.wholesalePrice !== product.price && (
                  <div className="text-xs text-green-600 font-semibold">
                    {product.wholesalePrice} {t.product.rwf} (5+ units)
                  </div>
                )}
                <button
                  onClick={() => addToCart(product)}
                  disabled={!product.inStock}
                  className={`w-full text-white text-xs font-semibold py-1.5 sm:py-2 border-none cursor-pointer transition-all duration-200 mt-auto opacity-100 lg:opacity-0 lg:group-hover:opacity-100 ${
                    addedToCart === product.id
                      ? "bg-green-600"
                      : product.inStock
                        ? "bg-[#ca0408] lg:hover:bg-[#ca0408]"
                        : "bg-gray-300 cursor-not-allowed"
                  }`}
                >
                  {addedToCart === product.id ? t.product.added : product.inStock ? t.product.addToCart : t.product.outOfStock}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const EcommerceHomepage = () => {
  const { t } = useTranslation();
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<
    "cart" | "summary" | "billing" | "payment"
  >("cart");
  const [shippingMethod, setShippingMethod] = useState<"delivery" | "pickup">(
    "delivery",
  );
  const [billingData, setBillingData] = useState({
    fullName: "",
    country: "Rwanda",
    address: "Kigali Rwanda",
    neighborhood: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    const savedBillingData = localStorage.getItem("billingData");
    if (savedBillingData) {
      setBillingData(JSON.parse(savedBillingData));
    }
  }, []);
  const [activePage, setActivePage] = useState("home");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [filters, setFilters] = useState({
    categories: [],
    brands: [],
    priceRange: "",
    inStock: false,
  });
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [heroProduct, setHeroProduct] = useState(null);
  const [banners, setBanners] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryCarouselIndex, setCategoryCarouselIndex] = useState<{
    [key: string]: number;
  }>({});
  const [latestProductsIndex, setLatestProductsIndex] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAllMobileFilters, setShowAllMobileFilters] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const [isHelpCenterOpen, setIsHelpCenterOpen] = useState(false);
  const [helpMessage, setHelpMessage] = useState("");
  const [sidebarBannerIndices, setSidebarBannerIndices] = useState([
    0, 1, 2, 3, 4, 5,
  ]);
  const [showMoreCategories, setShowMoreCategories] = useState(false);
  const [toast, setToast] = useState<{ show: boolean; message: string; product?: any }>({ show: false, message: "" });
  const [addedToCart, setAddedToCart] = useState<number | null>(null);
  const baselineCategoryCount = 8;

  useEffect(() => {
    if (isUserScrolling) return;

    const timer = setInterval(() => {
      setCurrentSectionIndex((prev) => {
        const next = prev + 1;
        if (next % 10 === 0) {
          setTimeout(() => setCurrentSectionIndex(0), 50);
          return 9;
        }
        return next;
      });
    }, 15000);

    return () => clearInterval(timer);
  }, [isUserScrolling]);

  useEffect(() => {
    const sidebarBanners = banners.filter(
      (b) => b.position === "sidebar1" || b.position === "sidebar2",
    );
    if (sidebarBanners.length <= 6) return;

    const timer = setInterval(() => {
      setSidebarBannerIndices((prev) =>
        prev.map((idx, position) => {
          if (sidebarBanners.length > 6 + position) {
            return (idx + 1) % sidebarBanners.length;
          }
          return idx;
        }),
      );
    }, 3000);

    return () => clearInterval(timer);
  }, [banners]);

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      setIsUserScrolling(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsUserScrolling(false);
        const scrollContainer = document.querySelector(
          "[data-scroll-container]",
        );
        if (scrollContainer) {
          scrollContainer.scrollTop = 0;
        }
      }, 3000);
    };

    const scrollContainer = document.querySelector("[data-scroll-container]");
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
      return () => {
        scrollContainer.removeEventListener("scroll", handleScroll);
        clearTimeout(scrollTimeout);
      };
    }
  }, []);

  const shuffleArray = (array: any[]) => {
    return [...array];
  };

  useEffect(() => {
    const cached = localStorage.getItem("shopData");
    if (cached) {
      const data = JSON.parse(cached);
      setProducts(data.products);
      setAllProducts(data.products);
      setCategories(data.categories);
      setBrands(data.brands);
      if (data.products.length > 0) {
        const inStock = data.products.filter((p: any) => p.inStock);
        setHeroProduct(inStock[0] || data.products[0]);
      }
    }

    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes, brandsRes, bannersRes] =
          await Promise.all([
            fetch("/api/products"),
            fetch("/api/categories"),
            fetch("/api/brands"),
            fetch("/api/promo-banners"),
          ]);

        const productsData = await productsRes.json();
        const categoriesData = await categoriesRes.json();
        const brandsData = await brandsRes.json();
        const bannersData = await bannersRes.json();

        if (
          Array.isArray(productsData) &&
          Array.isArray(categoriesData) &&
          Array.isArray(brandsData) &&
          Array.isArray(bannersData)
        ) {
          localStorage.setItem(
            "shopData",
            JSON.stringify({
              products: productsData,
              categories: categoriesData,
              brands: brandsData,
              banners: bannersData,
            }),
          );

          setProducts(productsData);
          setAllProducts(productsData);
          setCategories(categoriesData);
          setBrands(brandsData);
          setBanners(bannersData);

          if (productsData.length > 0) {
            const inStock = productsData.filter((p: any) => p.inStock);
            setHeroProduct(inStock[0] || productsData[0]);
          }
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const addToCart = (product: any) => {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    
    setAddedToCart(product.id);
    setToast({ show: true, message: "Added to cart!", product });
    setTimeout(() => {
      setAddedToCart(null);
      setToast({ show: false, message: "" });
    }, 3000);
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item,
      ),
    );
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const getTotal = () =>
    cart.reduce((sum, item) => {
      const price = item.quantity >= 5 && item.wholesalePrice ? item.wholesalePrice : item.price;
      return sum + price * item.quantity;
    }, 0);

  const getShippingFee = () => (shippingMethod === "delivery" ? 1000 : 0);

  const sendHelpMessage = () => {
    const message = encodeURIComponent(helpMessage);
    window.open(`https://wa.me/250785941195?text=${message}`, "_blank");
    setHelpMessage("");
    setIsHelpCenterOpen(false);
  };

  const sendWhatsAppOrder = () => {
    localStorage.setItem("billingData", JSON.stringify(billingData));

    
    const items = cart
      .map((item) => {
        const price = item.quantity >= 5 && item.wholesalePrice ? item.wholesalePrice : item.price;
        const priceType = item.quantity >= 5 && item.wholesalePrice ? ' (Wholesale Price)' : ' (Retail Price)';
        return `${item.name} (x${item.quantity})${priceType} - ${price * item.quantity} RWF`;
      })
      .join("%0A");

    const message = `*New Order*%0A%0A*Customer Details:*%0AName: ${billingData.fullName}%0APhone: ${billingData.phone}%0AEmail: ${billingData.email}%0AAddress: ${billingData.address}%0ANeighborhood: ${billingData.neighborhood || "N/A"}%0A%0A*Order Items:*%0A${items}%0A%0A*Pricing Note:*%0ARetail: 1-4 units | Wholesale: 5+ units%0A%0A*Order Summary:*%0ASubtotal: ${getTotal()} RWF%0AShipping: ${getShippingFee()} RWF%0ATotal: ${getTotal() + getShippingFee()} RWF%0A%0AShipping Method: ${shippingMethod === "delivery" ? "Delivery" : "In-store Pickup"}`;

    window.open(`https://wa.me/250785941195?text=${message}`, "_blank");
    setCheckoutStep("payment");
  };

  const handleNavigateSection = (direction: "up" | "down") => {
    setIsUserScrolling(true);
    setCurrentSectionIndex((prev) =>
      direction === "down" ? prev + 1 : Math.max(0, prev - 1),
    );
    setTimeout(() => setIsUserScrolling(false), 3000);
  };

  const handleFilterChange = (type: string, value: any) => {
    let newFilters = { ...filters };

    if (type === "category") {
      const cats = filters.categories.includes(value)
        ? filters.categories.filter((c) => c !== value)
        : [...filters.categories, value];
      newFilters = { ...filters, categories: cats };
    }

    if (type === "brand") {
      const brds = filters.brands.includes(value)
        ? filters.brands.filter((b) => b !== value)
        : [...filters.brands, value];
      newFilters = { ...filters, brands: brds };
    }

    if (type === "price")
      newFilters = {
        ...filters,
        priceRange: filters.priceRange === value ? "" : value,
      };
    if (type === "stock")
      newFilters = { ...filters, inStock: !filters.inStock };

    setFilters(newFilters);
    applyAllFilters(newFilters, searchQuery);
  };

  const applyAllFilters = (currentFilters = filters, query = searchQuery) => {
    let filtered = [...allProducts];

    if (query) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.brand.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()),
      );
    }

    if (currentFilters.categories.length) {
      filtered = filtered.filter((p) =>
        currentFilters.categories.includes(p.category),
      );
    }

    if (currentFilters.brands.length) {
      filtered = filtered.filter((p) =>
        currentFilters.brands.includes(p.brand),
      );
    }

    if (currentFilters.priceRange) {
      const max =
        currentFilters.priceRange === "50"
          ? 50000
          : currentFilters.priceRange === "100"
            ? 100000
            : currentFilters.priceRange === "200"
              ? 200000
              : currentFilters.priceRange === "500"
                ? 500000
                : 1000000;
      filtered = filtered.filter((p) => p.price <= max);
    }

    if (currentFilters.inStock) {
      filtered = filtered.filter((p) => p.inStock);
    }

    setProducts(filtered);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    applyAllFilters(filters, query);
  };

  const applyFilters = () => {
    applyAllFilters(filters, searchQuery);
  };

  const clearFilters = () => {
    setFilters({ categories: [], brands: [], priceRange: "", inStock: false });
    setSearchQuery("");
    setProducts(allProducts);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gray-100 px-3 py-2 sm:px-4 sm:py-3 lg:px-6 lg:py-4 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4 lg:gap-6">
          <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-xl flex items-center justify-center shadow-md">
              <img
                src="/logo.jpg"
                alt="Logo"
                className="w-full h-full rounded-xl object-cover"
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-sm sm:text-lg lg:text-xl font-bold text-[#ca0408] leading-tight">
                NEWBEICHINI
              </h1>
              <p className="text-xs text-gray-600 hidden lg:block">
                {t.header.tagline}
              </p>
            </div>
          </div>

          <div className="flex-1 max-w-2xl relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder={t.header.searchPlaceholder}
              className="w-full h-8 sm:h-10 lg:h-12 bg-white border-2 border-[#ca0408] rounded-3xl px-3 sm:px-4 lg:px-6 pr-10 sm:pr-12 lg:pr-14 text-xs sm:text-sm font-medium text-[#233D4C] outline-none shadow-[0_2px_8px_rgba(253,128,46,0.15)]"
            />
            <Search className="absolute right-3 sm:right-4 lg:right-5 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-[#ca0408]" />
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageSwitcher />
            <div
              onClick={() => setIsAdminLoginOpen(true)}
              className="w-8 h-8 sm:w-10 sm:h-10 lg:w-11 lg:h-11 bg-white rounded-xl flex items-center justify-center cursor-pointer"
            >
              <User className="w-4 h-4 sm:w-5 sm:h-5 text-[#ca0408]" />
            </div>
            <div
              onClick={() => setIsCartOpen(true)}
              className="relative w-8 h-8 sm:w-10 sm:h-10 lg:w-11 lg:h-11 bg-white rounded-xl flex items-center justify-center cursor-pointer shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
            >
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-[#ca0408]" />
              {cart.length > 0 && (
                <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-5 h-5 sm:w-6 sm:h-6 bg-[#FD802E] rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-white">
                    {cart.length}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="bg-[#ca0408] px-3 py-3 sm:px-4 sm:py-4 sticky top-[56px] sm:top-[68px] lg:top-[88px] z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-white"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="hidden lg:flex items-center gap-8 mx-auto">
            {[
              { key: "home", label: t.navigation.home },
              { key: "shop", label: t.navigation.shop },
              { key: "deals", label: t.navigation.deals },
              { key: "how-to-buy", label: t.navigation.howToBuy },
              { key: "contact-us", label: t.navigation.contactUs },
            ].map((item) => (
              <div
                key={item.key}
                onClick={() => setActivePage(item.key)}
                className={`text-base font-semibold text-[#E5E4E2] no-underline pb-2 cursor-pointer transition-all ${
                  activePage === item.key
                    ? "border-b-2 border-[#FD802E]"
                    : "border-b-2 border-transparent"
                }`}
              >
                {item.label}
              </div>
            ))}
          </div>
          <div className="flex lg:hidden items-center gap-4 mx-auto">
            {[
              { key: "home", label: t.navigation.home },
              { key: "shop", label: t.navigation.shop },
              { key: "deals", label: t.navigation.deals },
            ].map((item) => (
              <div
                key={item.key}
                onClick={() => setActivePage(item.key)}
                className={`text-xs sm:text-sm font-semibold text-[#E5E4E2] no-underline pb-1 cursor-pointer transition-all ${
                  activePage === item.key
                    ? "border-b-2 border-[#FD802E]"
                    : "border-b-2 border-transparent"
                }`}
              >
                {item.label}
              </div>
            ))}
          </div>
          <div
            onClick={() => setIsHelpCenterOpen(true)}
            className="hidden lg:block text-base font-semibold text-[#E5E4E2] no-underline pb-2 cursor-pointer transition-all border-b-2 border-transparent hover:border-[#FD802E]"
          >
            {t.navigation.helpCenter}
          </div>
        </div>
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-3 space-y-2 border-t border-[#9D0208] pt-3">
            {[
              { key: "how-to-buy", label: t.navigation.howToBuy },
              { key: "contact-us", label: t.navigation.contactUs },
              { key: "help-center", label: t.navigation.helpCenter },
            ].map((item) => (
              <div
                key={item.key}
                onClick={() => {
                  if (item.key === "help-center") {
                    setIsHelpCenterOpen(true);
                  } else {
                    setActivePage(item.key);
                  }
                  setIsMobileMenuOpen(false);
                }}
                className="text-sm font-semibold text-[#E5E4E2] py-2 cursor-pointer"
              >
                {item.label}
              </div>
            ))}
          </div>
        )}
      </nav>

      {/* Page Content */}
      {activePage !== "home" && (
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-6 sm:py-8 lg:py-12">
          {activePage === "shop" && <ShopPage />}
          {activePage === "deals" && (
            <DealsPage onNavigateHome={() => setActivePage("home")} />
          )}
          {activePage === "how-to-buy" && <HowToBuyPage />}
          {activePage === "contact-us" && <ContactUsPage />}
        </div>
      )}

      {/* Help Center Modal */}
      {isHelpCenterOpen && (
        <div
          onClick={() => setIsHelpCenterOpen(false)}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-lg shadow-2xl w-full max-w-md p-4 sm:p-5 lg:p-6 m-3 sm:m-4"
          >
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h2 className="text-lg sm:text-xl font-bold text-[#233D4C]">
                {t.helpCenter.title}
              </h2>
              <X
                onClick={() => setIsHelpCenterOpen(false)}
                className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500 cursor-pointer hover:text-[#ca0408]"
              />
            </div>
            <div className="mb-3 sm:mb-4">
              <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-green-50 rounded-lg mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#25D366] rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 sm:w-7 sm:h-7 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-sm sm:text-base text-[#233D4C]">
                    {t.helpCenter.subtitle}
                  </h3>
                  <p className="text-xs text-gray-600">
                    {t.helpCenter.description}
                  </p>
                </div>
              </div>
              <label className="block text-xs sm:text-sm font-medium text-[#233D4C] mb-2">
                {t.helpCenter.yourMessage}
              </label>
              <textarea
                value={helpMessage}
                onChange={(e) => setHelpMessage(e.target.value)}
                placeholder={t.helpCenter.placeholder}
                rows={5}
                className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg text-xs sm:text-sm resize-none focus:outline-none focus:border-[#ca0408]"
              />
            </div>
            <button
              onClick={sendHelpMessage}
              disabled={!helpMessage.trim()}
              className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white text-sm sm:text-base font-bold py-2.5 sm:py-3 rounded-lg cursor-pointer transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {t.helpCenter.sendMessage}
            </button>
          </div>
        </div>
      )}

      {activePage === "home" && (
        <>
          {/* Hero Banner */}
          {banners.filter((b) => b.position === "hero").length > 0 && (
            <div className="px-3 sm:px-4 lg:px-6 mb-4 sm:mb-6 lg:mb-8 mt-3 sm:mt-4 lg:mt-6">
              <img
                src={banners.filter((b) => b.position === "hero")[0].imageUrl}
                alt={banners.filter((b) => b.position === "hero")[0].title}
                className="w-full h-[150px] sm:h-[200px] lg:h-[250px] mx-auto block object-cover"
              />
            </div>
          )}

          {/* Mobile Filters */}
          <div className="lg:hidden px-3 sm:px-4 py-3 sm:py-4 bg-white sticky top-[100px] sm:top-[112px] z-40 shadow-sm">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {categories.filter(cat => !['Audio & Radios', 'Electronics', 'Home & Living', 'Home Appliances', 'Personal Care & Grooming'].includes(cat.name)).map(
                (cat) => (
                  <div
                    key={cat.id}
                    onClick={() => handleFilterChange("category", cat.name)}
                    className={`flex-shrink-0 py-1.5 sm:py-2 px-3 sm:px-4 text-xs font-medium cursor-pointer whitespace-nowrap border transition-all ${
                      filters.categories.includes(cat.name)
                        ? "bg-[#666] text-white border-[#666] font-bold"
                        : "bg-gray-200 text-[#666] border-gray-200 hover:font-bold"
                    }`}
                  >
                    {cat.name}
                  </div>
                ),
              )}

              {brands.map(
                (brand) => (
                  <div
                    key={brand.id}
                    onClick={() => handleFilterChange("brand", brand.name)}
                    className={`flex-shrink-0 py-1.5 sm:py-2 px-3 sm:px-4 text-xs font-medium cursor-pointer whitespace-nowrap border transition-all ${
                      filters.brands.includes(brand.name)
                        ? "bg-[#666] text-white border-[#666] font-bold"
                        : "bg-gray-200 text-[#666] border-gray-200 hover:font-bold"
                    }`}
                  >
                    {brand.name}
                  </div>
                ),
              )}

              <div
                onClick={() => handleFilterChange("stock", true)}
                className={`flex-shrink-0 py-1.5 sm:py-2 px-3 sm:px-4 text-xs font-medium cursor-pointer whitespace-nowrap border transition-all ${
                  filters.inStock
                    ? "bg-[#666] text-white border-[#666] font-bold"
                    : "bg-gray-200 text-[#666] border-gray-200 hover:font-bold"
                }`}
              >
                In Stock
              </div>
            </div>
            <button
              onClick={clearFilters}
              className="mt-2 text-xs text-[#ca0408] font-semibold"
            >
              {t.filters.clearAll}
            </button>
          </div>

          {/* Main Content */}
          <div className="max-w-[1600px] mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
            <div className="flex gap-4 lg:gap-8">
            {/* Sidebar Filters - Desktop */}
            <div className="hidden lg:block w-[200px] flex-shrink-0 space-y-4 self-start sticky top-[140px]">
              <div className="bg-white shadow-md p-4 lg:p-6">
                <h3 className="text-lg font-bold text-[#233D4C] mb-4">
                  {t.filters.title}
                </h3>

                {/* Categories */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-[#233D4C] mb-3">
                    {t.filters.categories}
                  </h4>
                  <div className="space-y-2">
                    {categories.filter(cat => !['Audio & Radios', 'Electronics', 'Home & Living', 'Home Appliances', 'Personal Care & Grooming'].includes(cat.name)).map((cat) => (
                      <label
                        key={cat.id}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={filters.categories.includes(cat.name)}
                          onChange={() =>
                            handleFilterChange("category", cat.name)
                          }
                          className="w-4 h-4 cursor-pointer accent-[#ca0408]"
                        />
                        <span className="text-sm text-gray-700">
                          {cat.name}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-[#233D4C] mb-3">
                    {t.filters.priceRange}
                  </h4>
                  <div className="space-y-2">
                    {[
                      t.filters.prices.under50k,
                      t.filters.prices.under100k,
                      t.filters.prices.under200k,
                      t.filters.prices.under500k,
                      t.filters.prices.under1m,
                    ].map((price, idx) => {
                      const val = ["50", "100", "200", "500", "1000"][idx];
                      return (
                        <label
                          key={val}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="priceRange"
                            checked={filters.priceRange === val}
                            onChange={() => handleFilterChange("price", val)}
                            className="w-4 h-4 cursor-pointer accent-[#ca0408]"
                          />
                          <span className="text-sm text-gray-700">{price}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Brands */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-[#233D4C] mb-3">
                    {t.filters.brands}
                  </h4>
                  <div className="space-y-2">
                    {brands.map((brand) => (
                      <label
                        key={brand.id}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={filters.brands.includes(brand.name)}
                          onChange={() =>
                            handleFilterChange("brand", brand.name)
                          }
                          className="w-4 h-4 cursor-pointer accent-[#ca0408]"
                        />
                        <span className="text-sm text-gray-700">
                          {brand.name}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Rating */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-[#233D4C] mb-3">
                    {t.filters.rating}
                  </h4>
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <label
                        key={rating}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          className="w-4 h-4 cursor-pointer accent-[#ca0408]"
                        />
                        <div className="flex items-center gap-1">
                          {[...Array(rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-3 h-3 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                          <span className="text-sm text-gray-700 ml-1">
                            {t.filters.andUp}
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Availability */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-[#233D4C] mb-3">
                    {t.filters.availability}
                  </h4>
                  <div className="space-y-2">
                    {[t.product.inStock].map((avail) => (
                      <label
                        key={avail}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={filters.inStock}
                          onChange={() => handleFilterChange("stock", true)}
                          className="w-4 h-4 cursor-pointer accent-[#ca0408]"
                        />
                        <span className="text-sm text-gray-700">{avail}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {(() => {
                const sidebarBanners = banners.filter(
                  (b) => b.position === "sidebar1" || b.position === "sidebar2",
                );
                if (sidebarBanners.length === 0) return null;

                return [4, 5].map((pos) => {
                  const bannerIdx =
                    sidebarBannerIndices[pos] % sidebarBanners.length;
                  const banner = sidebarBanners[bannerIdx];
                  if (!banner) return null;

                  return (
                    <img
                      key={pos}
                      src={banner.imageUrl}
                      alt={banner.title}
                      className="w-[200px] h-[400px] object-cover"
                    />
                  );
                });
              })()}

              {/* Categories List */}
              <div className="bg-white shadow-md p-4">
                <h3 className="text-sm font-bold text-[#233D4C] mb-3">Shop by Category</h3>
                <div className="space-y-2">
                  {categories.filter(cat => !['Audio & Radios', 'Electronics', 'Home & Living', 'Home Appliances', 'Personal Care & Grooming'].includes(cat.name)).map((cat) => (
                    <div
                      key={cat.id}
                      onClick={() => handleFilterChange("category", cat.name)}
                      className="text-xs text-gray-700 hover:text-[#ca0408] cursor-pointer py-1 border-b border-gray-100"
                    >
                      {cat.name}
                    </div>
                  ))}
                </div>
              </div>

              {/* Dynamic Products - 1 product initially, +1 per new category */}
              {allProducts.filter(p => p.inStock).slice(0, 1 + Math.max(0, categories.length - baselineCategoryCount)).map((product, idx) => (
                <div key={`left-${idx}`} className="bg-white shadow-md p-3">
                  <img src={product.imageUrl} alt={product.name} className="w-full h-32 object-cover mb-2 rounded" />
                  <h4 className="text-xs font-semibold text-[#233D4C] mb-1 line-clamp-2">{product.name}</h4>
                  <p className="text-sm font-bold text-[#ca0408] mb-2">{product.price} RWF</p>
                  <button onClick={() => addToCart(product)} className="w-full bg-[#ca0408] text-white text-xs py-1.5 rounded hover:bg-[#9D0208]">
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>

            {/* Products Grid */}
            <div className="w-full lg:max-w-[calc(100%-432px)] bg-white p-3 sm:p-4 lg:p-6 flex flex-col">
              {isLoading ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="bg-white shadow-md overflow-hidden animate-pulse"
                    >
                      <div className="aspect-square bg-gray-200" />
                      <div className="p-3 sm:p-4 space-y-3">
                        <div className="h-3 sm:h-4 bg-gray-200 w-3/4" />
                        <div className="h-3 sm:h-4 bg-gray-200 w-1/2" />
                        <div className="h-6 sm:h-8 bg-gray-200" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : searchQuery || filters.categories.length > 0 || filters.brands.length > 0 || filters.priceRange || filters.inStock ? (
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-[#233D4C] mb-4">
                    {searchQuery ? `Search Results for "${searchQuery}"` : 'Filtered Products'} ({products.length})
                  </h2>
                  {products.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-gray-500">No products found</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                      {products.map((product: any) => (
                        <div key={product.id} className="bg-white shadow-md overflow-hidden relative group">
                          {product.discount && (
                            <div className="absolute top-2 left-2 bg-[#FD802E] text-white text-xs font-bold px-2 py-1 rounded z-10">
                              {product.discount} {t.product.off}
                            </div>
                          )}
                          {!product.inStock && (
                            <div className="absolute top-2 right-2 bg-gray-500 text-white text-xs font-bold px-2 py-1 rounded z-10">
                              {t.product.outOfStock}
                            </div>
                          )}
                          <div className="aspect-square overflow-hidden bg-gray-100">
                            {product.imageUrl ? (
                              <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-4xl">📦</div>
                            )}
                          </div>
                          <div className="p-3 flex flex-col">
                            <div className="text-xs text-gray-500 mb-1">{product.brand}</div>
                            <h3 className="text-sm font-semibold text-[#233D4C] mb-2 line-clamp-2">{product.name}</h3>
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-base font-bold text-[#ca0408]">{product.price} {t.product.rwf}</span>
                              {product.oldPrice && (
                                <span className="text-xs text-gray-400 line-through">{product.oldPrice}</span>
                              )}
                            </div>
                            {product.wholesalePrice && product.wholesalePrice !== product.price && (
                              <div className="text-xs text-green-600 font-semibold mb-2">
                                {product.wholesalePrice} {t.product.rwf} (5+ units)
                              </div>
                            )}
                            <button
                              onClick={() => addToCart(product)}
                              disabled={!product.inStock}
                              className={`w-full text-white text-xs font-semibold py-2 border-none cursor-pointer transition-all ${
                                addedToCart === product.id ? "bg-green-600" : product.inStock ? "bg-[#ca0408] hover:bg-[#9D0208]" : "bg-gray-300 cursor-not-allowed"
                              }`}
                            >
                              {addedToCart === product.id ? t.product.added : product.inStock ? t.product.addToCart : t.product.outOfStock}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <div className="space-y-4 flex-1 overflow-hidden">
                    <CategoryCarousel
                      category={{ id: "latest", name: t.categories.latestProducts }}
                      products={products}
                      currentIndex={latestProductsIndex}
                      onIndexChange={(newIndex: number | ((prev: number) => number)) =>
                        setLatestProductsIndex((prev) => typeof newIndex === 'function' ? newIndex(prev) : newIndex)
                      }
                      addToCart={addToCart}
                      addedToCart={addedToCart}
                      t={t}
                    />

                    {['Audio & Radios', 'Electronics', 'Home & Living', 'Home Appliances', 'Personal Care & Grooming'].map((mainCategoryName) => {
                      const categoryProducts = products.filter(
                        (p) => p.mainCategory === mainCategoryName,
                      );
                      if (categoryProducts.length === 0) return null;

                      const currentIndex =
                        categoryCarouselIndex[mainCategoryName] || 0;

                      return (
                        <CategoryCarousel
                          key={mainCategoryName}
                          category={{ id: mainCategoryName, name: mainCategoryName }}
                          products={categoryProducts}
                          currentIndex={currentIndex}
                          onIndexChange={(newIndex: number | ((prev: number) => number)) =>
                            setCategoryCarouselIndex((prev) => ({
                              ...prev,
                              [mainCategoryName]: typeof newIndex === 'function' ? newIndex(prev[mainCategoryName] || 0) : newIndex,
                            }))
                          }
                          addToCart={addToCart}
                          addedToCart={addedToCart}
                          t={t}
                        />
                      );
                    })}
                  </div>
                </>
              )}
            </div>

            {/* Right Sidebar Banners - Desktop */}
            <div className="hidden lg:block w-[200px] flex-shrink-0 space-y-4 self-start sticky top-[140px]">
              {(() => {
                const sidebarBanners = banners.filter(
                  (b) => b.position === "sidebar1" || b.position === "sidebar2",
                );
                if (sidebarBanners.length === 0) return null;

                return [0, 1, 2, 3].map((pos) => {
                  const bannerIdx =
                    sidebarBannerIndices[pos] % sidebarBanners.length;
                  const banner = sidebarBanners[bannerIdx];
                  if (!banner) return null;

                  return (
                    <img
                      key={pos}
                      src={banner.imageUrl}
                      alt={banner.title}
                      className="w-[200px] h-[400px] object-cover"
                    />
                  );
                });
              })()}

              {/* Top Brands */}
              <div className="bg-white shadow-md p-4">
                <h3 className="text-sm font-bold text-[#233D4C] mb-3">Top Brands</h3>
                <div className="space-y-2">
                  {brands.map((brand) => (
                    <div
                      key={brand.id}
                      onClick={() => handleFilterChange("brand", brand.name)}
                      className="text-xs text-gray-700 hover:text-[#ca0408] cursor-pointer py-1 border-b border-gray-100"
                    >
                      {brand.name}
                    </div>
                  ))}
                </div>
              </div>

              {/* Dynamic Products - 2 products initially, +2 per new category */}
              {allProducts.filter(p => p.inStock).slice(0, 2 + Math.max(0, (categories.length - baselineCategoryCount) * 2)).map((product, idx) => (
                <div key={`right-${idx}`} className="bg-white shadow-md p-3">
                  <img src={product.imageUrl} alt={product.name} className="w-full h-32 object-cover mb-2 rounded" />
                  <h4 className="text-xs font-semibold text-[#233D4C] mb-1 line-clamp-2">{product.name}</h4>
                  <p className="text-sm font-bold text-[#ca0408] mb-2">{product.price} RWF</p>
                  <button onClick={() => addToCart(product)} className="w-full bg-[#ca0408] text-white text-xs py-1.5 rounded hover:bg-[#9D0208]">
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
            </div>

            {/* Mobile Sidebar Banners */}
            <div className="lg:hidden mt-6 px-3 sm:px-4 space-y-3">
              {(() => {
                const sidebarBanners = banners.filter(
                  (b) => b.position === "sidebar1" || b.position === "sidebar2",
                );
                if (sidebarBanners.length === 0) return null;

                return sidebarBanners.map((banner, idx) => (
                  <img
                    key={idx}
                    src={banner.imageUrl}
                    alt={banner.title}
                    className="w-full h-auto object-cover"
                  />
                ));
              })()}
            </div>
          </div>
        </>
      )}

      {/* Footer */}
      <footer className="bg-white text-[#233D4C] mt-8 sm:mt-12 lg:mt-16 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-6 sm:py-8 lg:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-xl flex items-center justify-center shadow-md">
                  <img
                    src="/logo.jpg"
                    alt="Logo"
                    className="w-full h-full rounded-xl object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#ca0408]">
                    {t.footer.brandTitle}
                  </h3>
                  <p className="text-xs text-gray-600">
                    {t.footer.brandTagline}
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                {t.footer.description}
              </p>
              <div className="mb-4">
                <div className="text-sm font-semibold mb-2">
                  {t.footer.ratingTitle}
                </div>
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-600">
                  {t.footer.reviewQuote}
                </p>
                <a
                  href="https://maps.app.goo.gl/UpKCmTXuPhvjdSF78"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#FD802E] hover:underline"
                >
                  {t.footer.viewReviews}
                </a>
              </div>
            </div>

            {/* Branches */}
            <div>
              <h4 className="text-lg font-bold mb-4">{t.footer.branches}</h4>
              <div className="space-y-4">
                <div>
                  <h5 className="font-semibold mb-2">{t.footer.nyamirambo}</h5>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span>{t.locations.nyamiramboPhone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <LucideLocationEdit  className="w-4 h-4" />
                      <span>{t.locations.nyamiramboAddress}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h5 className="font-semibold mb-2">{t.footer.gikondo}</h5>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span>{t.locations.gikondoPhone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <LucideLocationEdit className="w-4 h-4" />
                      <span>{t.locations.gikondoAddress}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold mb-4">{t.footer.quickLinks}</h4>
              <div className="space-y-2">
                {[
                  t.footer.links.howToBuy,
                  t.footer.links.bestSellers,
                  t.footer.links.dealsOffers,
                  t.footer.links.trackOrder,
                  t.footer.links.helpCenter,
                ].map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="block text-sm text-gray-600 hover:text-[#FD802E] transition-colors"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>

            {/* Connect */}
            <div>
              <h4 className="text-lg font-bold mb-4">{t.footer.connectWithUs}</h4>
              <div className="space-y-3">
                <a
                  href="https://www.instagram.com/beichini250/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-gray-100/10 border border-gray-700 rounded-lg hover:bg-[#FD802E] hover:border-[#FD802E] transition-all group"
                >
                  <Instagram className="w-5 h-5 text-[#ca0408] group-hover:text-white transition-colors" />
                  <span className="text-sm font-medium text-[#ca0408] group-hover:text-white transition-colors">
                    {t.footer.instagram}
                  </span>
                </a>
                <a
                  href="https://www.tiktok.com/@newbeichini250"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-gray-100/10 border border-gray-700 rounded-lg hover:bg-[#FD802E] hover:border-[#FD802E] transition-all group"
                >
                  <svg className="w-5 h-5 text-[#ca0408] group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                  <span className="text-sm font-medium text-[#ca0408] group-hover:text-white transition-colors">
                    {t.footer.tiktok}
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-300 mt-6 sm:mt-8 pt-4 sm:pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4 mb-4">
              <p className="text-xs sm:text-sm text-gray-600">
                {t.footer.copyright}
              </p>
              <div>
                <p className="text-xs sm:text-sm text-gray-600 mb-2">
                  {t.footer.weAccept}
                </p>
                <div className="flex gap-2 sm:gap-3">
                  <div className="bg-white rounded px-2 sm:px-3 py-1">
                    <span className="text-xs font-bold text-[#ca0408]">
                      {t.footer.mtnMomo}
                    </span>
                  </div>
                  <div className="bg-white rounded px-2 sm:px-3 py-1">
                    <span className="text-xs font-bold text-[#ca0408]">{t.footer.cash}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Website Developer Credit */}
            <div className="border-t border-gray-200 pt-4 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
              <a href="https://www.gotekhub.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <img src="/logo.png" alt="GoTekHub" className="w-6 h-6 sm:w-8 sm:h-8 rounded" />
                <span className="text-xs sm:text-sm text-gray-600">Website by <span className="font-semibold text-[#ca0408]">GoTekHub</span></span>
              </a>
              <span className="text-xs text-gray-500">|</span>
              <a href="https://wa.me/250794269385" target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm text-gray-600 hover:text-[#25D366] transition-colors">
                Need a website? Contact us: +250 794 269 385
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Shopping Cart Drawer */}
      {isCartOpen && (
        <div
          onClick={() => {
            setIsCartOpen(false);
            setCheckoutStep("cart");
          }}
          className="fixed inset-0 bg-black/50 z-50 flex justify-end"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full md:max-w-md bg-white shadow-2xl flex flex-col max-h-screen"
          >
            {/* Cart Header */}
            <div className="bg-[#ca0408] text-white p-4 sm:p-5 lg:p-6 flex items-center justify-between">
              <h2 className="text-lg sm:text-xl font-bold">
                {checkoutStep === "cart"
                  ? `${t.cart.title} (${cart.length})`
                  : checkoutStep === "summary"
                    ? t.cart.orderSummary
                    : checkoutStep === "billing"
                      ? t.cart.billingDetails
                      : t.cart.payment}
              </h2>
              <X
                onClick={() => {
                  setIsCartOpen(false);
                  setCheckoutStep("cart");
                }}
                className="w-5 h-5 sm:w-6 sm:h-6 text-[#FEFACD] cursor-pointer"
              />
            </div>

            {/* Cart Content */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 lg:p-6">
              {checkoutStep === "cart" && (
                <>
                  <div className="space-y-3 sm:space-y-4">
                    {cart.length === 0 ? (
                      <div className="text-center py-8 sm:py-12">
                        <ShoppingCart className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-3 sm:mb-4" />
                        <p className="text-sm sm:text-base text-gray-500">
                          {t.cart.empty}
                        </p>
                      </div>
                    ) : (
                      cart.map((item) => {
                        const price = item.quantity >= 5 && item.wholesalePrice ? item.wholesalePrice : item.price;
                        const priceLabel = item.quantity >= 5 && item.wholesalePrice ? ' (Wholesale)' : '';
                        return (
                        <div
                          key={item.id}
                          className="flex gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-lg"
                        >
                          <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 bg-white rounded overflow-hidden">
                            {item.imageUrl ? (
                              <img
                                src={item.imageUrl}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-xl sm:text-2xl">
                                📦
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-xs sm:text-sm mb-1">
                              {item.name}
                            </h3>
                            <p className="text-xs text-gray-500 mb-2">
                              {item.brand}
                            </p>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updateQuantity(item.id, -1)}
                                className="w-5 h-5 sm:w-6 sm:h-6 bg-[#ca0408] text-white border-none rounded flex items-center justify-center cursor-pointer"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-xs sm:text-sm font-semibold">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, 1)}
                                className="w-5 h-5 sm:w-6 sm:h-6 bg-[#ca0408] text-white border-none rounded flex items-center justify-center cursor-pointer"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                          <div className="flex flex-col items-end justify-between">
                            <div>
                              <span className="font-bold text-xs sm:text-sm text-[#ca0408]">
                                {price * item.quantity} {t.product.rwf}
                              </span>
                              {priceLabel && (
                                <div className="text-xs text-green-600">{priceLabel}</div>
                              )}
                            </div>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="bg-transparent border-none cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
                            </button>
                          </div>
                        </div>
                      );
                      })
                    )}
                  </div>

                  {cart.length > 0 && (
                    <div className="mt-4 sm:mt-6 space-y-2 sm:space-y-3">
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span>{t.cart.subtotal}</span>
                        <span className="font-semibold">{getTotal()} {t.product.rwf}</span>
                      </div>
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span>{t.cart.shipping}</span>
                        <span className="font-semibold text-green-600">
                          {t.cart.free}
                        </span>
                      </div>
                      <div className="border-t pt-2 sm:pt-3 flex justify-between text-base sm:text-lg font-bold">
                        <span>{t.cart.total}</span>
                        <span className="text-[#ca0408]">{getTotal()} {t.product.rwf}</span>
                      </div>
                      <button
                        onClick={() => setCheckoutStep("summary")}
                        className="w-full bg-[#ca0408] text-[#FEFACD] text-sm sm:text-base font-bold py-3 sm:py-4 border-none rounded-lg cursor-pointer mb-2 sm:mb-3"
                      >
                        {t.cart.proceedToCheckout}
                      </button>
                      <button
                        onClick={() => setIsCartOpen(false)}
                        className="w-full bg-transparent text-[#ca0408] text-xs sm:text-sm font-semibold py-2 sm:py-3 border-2 border-[#ca0408] rounded-lg cursor-pointer"
                      >
                        {t.cart.continueShopping}
                      </button>
                    </div>
                  )}
                </>
              )}

              {checkoutStep === "summary" && (
                <>
                  <div className="mb-6">
                    <h3 className="font-bold text-lg mb-4">{t.checkout.cartItems}</h3>
                    <div className="space-y-2">
                      {cart.map((item) => {
                        const price = item.quantity >= 5 && item.wholesalePrice ? item.wholesalePrice : item.price;
                        const priceType = item.quantity >= 5 && item.wholesalePrice ? ' @Wholesale' : '';
                        return (
                        <div
                          key={item.id}
                          className="flex justify-between text-sm py-2 border-b"
                        >
                          <span>
                            {item.name} (x{item.quantity}){priceType}
                          </span>
                          <span className="font-semibold">
                            {price * item.quantity} {t.product.rwf}
                          </span>
                        </div>
                      );
                      })}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-bold text-lg mb-4">{t.checkout.cartTotals}</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>{t.cart.subtotal}</span>
                        <span className="font-semibold">{getTotal()} {t.product.rwf}</span>
                      </div>

                      <div className="border-t pt-3">
                        <h4 className="font-semibold mb-3">{t.checkout.shippingTitle}</h4>
                        <div className="space-y-2">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              checked={shippingMethod === "delivery"}
                              onChange={() => setShippingMethod("delivery")}
                              className="accent-[#ca0408]"
                            />
                            <span className="text-sm">
                              {t.checkout.deliveryFees}
                            </span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              checked={shippingMethod === "pickup"}
                              onChange={() => setShippingMethod("pickup")}
                              className="accent-[#ca0408]"
                            />
                            <span className="text-sm">{t.checkout.inStorePickup}</span>
                          </label>
                        </div>
                      </div>

                      <div className="text-sm text-gray-600">
                        {t.checkout.shippingTo}{" "}
                        <a href="#" className="text-[#ca0408] underline">
                          {t.checkout.changeAddress}
                        </a>
                      </div>

                      <div className="border-t pt-3 flex justify-between text-lg font-bold">
                        <span>{t.cart.total}</span>
                        <span className="text-[#ca0408]">
                          {getTotal() + getShippingFee()} {t.product.rwf}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setCheckoutStep("billing")}
                    className="w-full bg-[#ca0408] text-[#FEFACD] text-base font-bold py-4 border-none rounded-lg cursor-pointer mb-3"
                  >
                    {t.cart.proceedToCheckout}
                  </button>
                  <button
                    onClick={() => setCheckoutStep("cart")}
                    className="w-full bg-transparent text-[#ca0408] text-sm font-semibold py-3 border-2 border-[#ca0408] rounded-lg cursor-pointer"
                  >
                    {t.cart.backToCart}
                  </button>
                </>
              )}

              {checkoutStep === "billing" && (
                <>
                  <div className="space-y-4 mb-6">
                    <h3 className="font-bold text-lg">{t.billing.title}</h3>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        {t.billing.fullName}
                      </label>
                      <input
                        type="text"
                        value={billingData.fullName}
                        onChange={(e) =>
                          setBillingData({
                            ...billingData,
                            fullName: e.target.value,
                          })
                        }
                        placeholder={t.billing.fullNamePlaceholder}
                        className="w-full p-2.5 border border-gray-300 rounded text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        {t.billing.country}
                      </label>
                      <input
                        type="text"
                        value={billingData.country}
                        onChange={(e) =>
                          setBillingData({
                            ...billingData,
                            country: e.target.value,
                          })
                        }
                        className="w-full p-2.5 border border-gray-300 rounded text-sm bg-gray-50"
                        readOnly
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        {t.billing.kigaliNeighborhood}
                      </label>
                      <input
                        type="text"
                        value={billingData.address}
                        onChange={(e) =>
                          setBillingData({
                            ...billingData,
                            address: e.target.value,
                          })
                        }
                        className="w-full p-2.5 border border-gray-300 rounded text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        {t.billing.neighborhoodDetails}
                      </label>
                      <input
                        type="text"
                        value={billingData.neighborhood}
                        onChange={(e) =>
                          setBillingData({
                            ...billingData,
                            neighborhood: e.target.value,
                          })
                        }
                        placeholder={t.billing.neighborhoodPlaceholder}
                        className="w-full p-2.5 border border-gray-300 rounded text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        {t.billing.phone}
                      </label>
                      <input
                        type="tel"
                        value={billingData.phone}
                        onChange={(e) =>
                          setBillingData({
                            ...billingData,
                            phone: e.target.value,
                          })
                        }
                        className="w-full p-2.5 border border-gray-300 rounded text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        {t.billing.email}
                      </label>
                      <input
                        type="email"
                        value={billingData.email}
                        onChange={(e) =>
                          setBillingData({
                            ...billingData,
                            email: e.target.value,
                          })
                        }
                        className="w-full p-2.5 border border-gray-300 rounded text-sm"
                      />
                    </div>
                  </div>

                  <button
                    onClick={sendWhatsAppOrder}
                    className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white text-base font-bold py-4 border-none rounded-lg cursor-pointer mb-3 transition-colors"
                  >
                    {t.billing.orderViaWhatsApp}
                  </button>
                  <button
                    onClick={() => setCheckoutStep("summary")}
                    className="w-full bg-transparent text-[#ca0408] text-sm font-semibold py-3 border-2 border-[#ca0408] rounded-lg cursor-pointer"
                  >
                    {t.cart.backToSummary}
                  </button>
                </>
              )}

              {checkoutStep === "payment" && (
                <>
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-3xl text-green-600">✓</span>
                    </div>
                    <h3 className="text-xl font-bold text-[#233D4C] mb-2">
                      {t.paymentSuccess.title}
                    </h3>
                    <p className="text-gray-600 mb-8">
                      {t.paymentSuccess.message}
                    </p>

                    <div className="space-y-4 text-left">
                      <h4 className="font-bold text-lg">{t.paymentSuccess.paymentMethods}</h4>

                      <div className="p-4 border-2 border-[#FD802E] rounded-lg bg-orange-50">
                        <h5 className="font-semibold mb-2">{t.paymentSuccess.mtnMomo}</h5>
                        <p className="text-sm text-gray-600 mb-2">
                          {t.paymentSuccess.mtnInstructions}
                        </p>
                        <code className="block bg-gray-800 text-white p-3 rounded text-sm">
                          *182*8*1*077936*PIN#
                        </code>
                      </div>

                      <div className="p-4 border-2 border-gray-300 rounded-lg">
                        <h5 className="font-semibold mb-2">{t.paymentSuccess.cashOnDelivery}</h5>
                        <p className="text-sm text-gray-600">
                          {t.paymentSuccess.cashMessage}
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      setCheckoutStep("cart");
                      setCart([]);
                    }}
                    className="w-full bg-[#ca0408] text-[#FEFACD] text-base font-bold py-4 border-none rounded-lg cursor-pointer"
                  >
                    {t.cart.continueShopping}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
      />

      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg z-50 flex items-center gap-3 animate-slide-up">
          {toast.product?.imageUrl && (
            <img src={toast.product.imageUrl} alt="" className="w-12 h-12 object-cover rounded" />
          )}
          <div>
            <p className="font-semibold text-sm">{toast.message}</p>
            {toast.product && (
              <p className="text-xs opacity-90">{toast.product.name}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EcommerceHomepage;
