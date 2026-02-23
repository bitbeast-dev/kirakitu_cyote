"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Package, ShoppingBag, TrendingUp, Users, Plus, Edit, Trash2, LogOut, Tag, Layers, Image, Menu, X } from 'lucide-react';
import { ProductModal, CategoryModal, BrandModal, PromoBannerModal } from '@/components/AdminModals';
import { useTranslation } from '@/lib/TranslationContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import './responsive.css';

export default function AdminDashboard() {
  const { t } = useTranslation();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('products');
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showBrandModal, setShowBrandModal] = useState(false);
  const [showPromoBannerModal, setShowPromoBannerModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const fetchData = async () => {
    try {
      const [productsRes, categoriesRes, brandsRes, bannersRes] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/categories'),
        fetch('/api/brands'),
        fetch('/api/promo-banners')
      ]);
      const productsData = await productsRes.json();
      const categoriesData = await categoriesRes.json();
      const brandsData = await brandsRes.json();
      const bannersData = await bannersRes.json();
      
      setProducts(Array.isArray(productsData) ? productsData : []);
      setCategories(Array.isArray(categoriesData) ? categoriesData : []);
      setBrands(Array.isArray(brandsData) ? brandsData : []);
      setBanners(Array.isArray(bannersData) ? bannersData : []);
    } catch (error) {
      console.error('Error fetching data:', error);
      setProducts([]);
      setCategories([]);
      setBrands([]);
      setBanners([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && !localStorage.getItem('admin_session')) {
      router.push('/');
    } else {
      fetchData();
    }
  }, [router]);

  const handleDelete = async (type: string, id: string) => {
    if (!confirm(t.admin.products.messages.deleteConfirm)) return;
    try {
      await fetch(`/api/${type}?id=${id}`, { method: 'DELETE' });
      fetchData();
    } catch (error) {
      console.error('Error deleting:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_session');
    localStorage.removeItem('admin_id');
    router.push('/');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f4f4f4' }}>
      <div style={{ background: '#730000', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <div>
          <h1 style={{ fontSize: '18px', fontWeight: '800', color: '#FEFACD', margin: 0 }}>{t.admin.header.title}</h1>
          <p style={{ fontSize: '11px', color: '#FD802E', margin: '4px 0 0 0' }}>{t.admin.header.subtitle}</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <LanguageSwitcher />
          <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#FD802E', color: '#FEFACD', fontSize: '12px', fontWeight: '600', padding: '8px 16px', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
            <LogOut style={{ width: '16px', height: '16px' }} />
            <span className="logout-text" style={{ display: 'none' }}>{t.admin.header.logout}</span>
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px', padding: '16px' }} className="admin-layout">
        <div style={{ background: '#FFFFFF', borderRadius: '12px', padding: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', overflowX: 'auto' }} className="admin-sidebar">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="menu-toggle-btn" style={{ background: '#730000', color: '#FEFACD', border: 'none', borderRadius: '8px', padding: '8px 12px', cursor: 'pointer', fontSize: '20px', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {isMenuOpen ? <X style={{ width: '20px', height: '20px' }} /> : <Menu style={{ width: '20px', height: '20px' }} />}
            </button>
            <h3 style={{ fontSize: '12px', fontWeight: '700', color: '#730000', textTransform: 'uppercase', letterSpacing: '0.5px', margin: 0 }}>{t.admin.navigation.title}</h3>
          </div>
          <div style={{ display: isMenuOpen ? 'flex' : 'none', gap: '8px', flexWrap: 'wrap', flexDirection: 'column' }} className="nav-buttons">
          {[
            { id: 'dashboard', label: t.admin.navigation.dashboard, icon: TrendingUp },
            { id: 'products', label: t.admin.navigation.products, icon: Package },
            { id: 'categories', label: t.admin.navigation.categories, icon: Layers },
            { id: 'brands', label: t.admin.navigation.brands, icon: Tag },
            { id: 'promos', label: t.admin.navigation.promos, icon: Image },
            { id: 'orders', label: t.admin.navigation.orders, icon: ShoppingBag },
            { id: 'customers', label: t.admin.navigation.customers, icon: Users },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); setIsMenuOpen(false); }}
              className="nav-button"
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: '6px',
                padding: '10px 12px',
                background: activeTab === item.id ? '#730000' : 'transparent',
                color: activeTab === item.id ? '#FEFACD' : '#233D4C',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '11px',
                fontWeight: '600',
                textAlign: 'left',
              }}
            >
              <item.icon style={{ width: '16px', height: '16px' }} />
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
          </div>
        </div>

        <div>
          {activeTab === 'dashboard' && (
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#233D4C', marginBottom: '16px' }}>{t.admin.dashboard.title}</h2>
              <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                {[
                  { label: t.admin.dashboard.stats.totalProducts, value: products.length, icon: Package, color: '#730000' },
                  { label: t.admin.dashboard.stats.totalOrders, value: '0', icon: ShoppingBag, color: '#FD802E' },
                  { label: t.admin.dashboard.stats.categories, value: categories.length, icon: Layers, color: '#00A86B' },
                  { label: t.admin.dashboard.stats.brands, value: brands.length, icon: Tag, color: '#5F4A8B' },
                ].map((stat, idx) => (
                  <div key={idx} style={{ background: '#FFFFFF', padding: '16px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                    <stat.icon style={{ width: '24px', height: '24px', color: stat.color, marginBottom: '8px' }} />
                    <p style={{ fontSize: '20px', fontWeight: '800', color: '#233D4C', margin: '0 0 4px 0' }}>{stat.value}</p>
                    <p style={{ fontSize: '11px', color: '#666', margin: 0 }}>{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div>
              <div className="section-header" style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#233D4C', margin: 0 }}>{t.admin.products.title}</h2>
                <button onClick={() => setShowProductModal(true)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', background: '#730000', color: '#FEFACD', fontSize: '12px', fontWeight: '600', padding: '10px 16px', border: 'none', borderRadius: '8px', cursor: 'pointer', width: '100%', maxWidth: '200px' }}>
                  <Plus style={{ width: '18px', height: '18px' }} />
                  {t.admin.products.addButton}
                </button>
              </div>

              <div style={{ background: '#FFFFFF', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                      <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px', fontWeight: '700', color: '#730000', textTransform: 'uppercase' }}>{t.admin.products.table.product}</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px', fontWeight: '700', color: '#730000', textTransform: 'uppercase' }}>Category</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px', fontWeight: '700', color: '#730000', textTransform: 'uppercase' }}>{t.admin.products.table.brand}</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px', fontWeight: '700', color: '#730000', textTransform: 'uppercase' }}>Retail/Wholesale</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px', fontWeight: '700', color: '#730000', textTransform: 'uppercase' }}>{t.admin.products.table.stock}</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px', fontWeight: '700', color: '#730000', textTransform: 'uppercase' }}>{t.admin.products.table.status}</th>
                      <th style={{ padding: '12px', textAlign: 'right', fontSize: '13px', fontWeight: '700', color: '#730000', textTransform: 'uppercase' }}>{t.admin.products.table.actions}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr><td colSpan={7} style={{ padding: '40px', textAlign: 'center', color: '#666' }}>{t.admin.products.messages.loading}</td></tr>
                    ) : products.length === 0 ? (
                      <tr><td colSpan={7} style={{ padding: '40px', textAlign: 'center', color: '#666' }}>{t.admin.products.messages.noProducts}</td></tr>
                    ) : (
                      products.map((product: any) => (
                        <tr key={product.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                          <td style={{ padding: '16px', fontSize: '14px', fontWeight: '600', color: '#233D4C' }}>{product.name}</td>
                          <td style={{ padding: '16px' }}>
                            <div style={{ fontSize: '13px', fontWeight: '600', color: '#730000' }}>{product.mainCategory}</div>
                            <div style={{ fontSize: '12px', color: '#666' }}>{product.category}</div>
                          </td>
                          <td style={{ padding: '16px', fontSize: '13px', color: '#666' }}>{product.brand}</td>
                          <td style={{ padding: '16px' }}>
                            <div style={{ fontSize: '14px', fontWeight: '700', color: '#730000' }}>{product.price} RWF</div>
                            {product.wholesalePrice && product.wholesalePrice !== product.price && (
                              <div style={{ fontSize: '12px', color: '#00A86B' }}>{product.wholesalePrice} RWF (5+)</div>
                            )}
                          </td>
                          <td style={{ padding: '16px', fontSize: '13px', color: '#666' }}>{product.stockCount}</td>
                          <td style={{ padding: '16px' }}>
                            <span style={{ padding: '4px 12px', borderRadius: '12px', fontSize: '11px', fontWeight: '600', background: product.inStock ? '#E8F5E9' : '#FFEBEE', color: product.inStock ? '#2E7D32' : '#C62828' }}>
                              {product.inStock ? t.admin.products.status.inStock : t.admin.products.status.outOfStock}
                            </span>
                          </td>
                          <td style={{ padding: '16px', textAlign: 'right' }}>
                            <button onClick={() => { setEditingProduct(product); setShowProductModal(true); }} style={{ background: 'transparent', border: 'none', cursor: 'pointer', marginRight: '8px' }}>
                              <Edit style={{ width: '18px', height: '18px', color: '#730000' }} />
                            </button>
                            <button onClick={() => handleDelete('products', product.id)} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
                              <Trash2 style={{ width: '18px', height: '18px', color: '#FF4444' }} />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'categories' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#233D4C', margin: 0 }}>{t.admin.categories.title}</h2>
                <button onClick={() => setShowCategoryModal(true)} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#730000', color: '#FEFACD', fontSize: '14px', fontWeight: '600', padding: '12px 20px', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
                  <Plus style={{ width: '18px', height: '18px' }} />
                  {t.admin.categories.addButton}
                </button>
              </div>
              <div style={{ background: '#FFFFFF', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                      <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px', fontWeight: '700', color: '#730000', textTransform: 'uppercase' }}>{t.admin.categories.table.categoryName}</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px', fontWeight: '700', color: '#730000', textTransform: 'uppercase' }}>{t.admin.categories.table.productsCount}</th>
                      <th style={{ padding: '12px', textAlign: 'right', fontSize: '13px', fontWeight: '700', color: '#730000', textTransform: 'uppercase' }}>{t.admin.categories.table.actions}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr><td colSpan={3} style={{ padding: '40px', textAlign: 'center', color: '#666' }}>{t.admin.categories.messages.loading}</td></tr>
                    ) : categories.length === 0 ? (
                      <tr><td colSpan={3} style={{ padding: '40px', textAlign: 'center', color: '#666' }}>{t.admin.categories.messages.noCategories}</td></tr>
                    ) : (
                      categories.map((category: any) => (
                        <tr key={category.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                          <td style={{ padding: '16px', fontSize: '14px', fontWeight: '600', color: '#233D4C' }}>{category.name}</td>
                          <td style={{ padding: '16px', fontSize: '13px', color: '#666' }}>{products.filter((p: any) => p.category === category.name).length} {t.admin.categories.messages.productsCount}</td>
                          <td style={{ padding: '16px', textAlign: 'right' }}>
                            <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', marginRight: '8px' }}>
                              <Edit style={{ width: '18px', height: '18px', color: '#730000' }} />
                            </button>
                            <button onClick={() => handleDelete('categories', category.id)} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
                              <Trash2 style={{ width: '18px', height: '18px', color: '#FF4444' }} />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'brands' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#233D4C', margin: 0 }}>{t.admin.brands.title}</h2>
                <button onClick={() => setShowBrandModal(true)} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#730000', color: '#FEFACD', fontSize: '14px', fontWeight: '600', padding: '12px 20px', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
                  <Plus style={{ width: '18px', height: '18px' }} />
                  {t.admin.brands.addButton}
                </button>
              </div>
              <div style={{ background: '#FFFFFF', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                      <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px', fontWeight: '700', color: '#730000', textTransform: 'uppercase' }}>{t.admin.brands.table.brandName}</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px', fontWeight: '700', color: '#730000', textTransform: 'uppercase' }}>{t.admin.brands.table.productsCount}</th>
                      <th style={{ padding: '12px', textAlign: 'right', fontSize: '13px', fontWeight: '700', color: '#730000', textTransform: 'uppercase' }}>{t.admin.brands.table.actions}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr><td colSpan={3} style={{ padding: '40px', textAlign: 'center', color: '#666' }}>{t.admin.brands.messages.loading}</td></tr>
                    ) : brands.length === 0 ? (
                      <tr><td colSpan={3} style={{ padding: '40px', textAlign: 'center', color: '#666' }}>{t.admin.brands.messages.noBrands}</td></tr>
                    ) : (
                      brands.map((brand: any) => (
                        <tr key={brand.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                          <td style={{ padding: '16px', fontSize: '14px', fontWeight: '600', color: '#233D4C' }}>{brand.name}</td>
                          <td style={{ padding: '16px', fontSize: '13px', color: '#666' }}>{products.filter((p: any) => p.brand === brand.name).length} {t.admin.brands.messages.productsCount}</td>
                          <td style={{ padding: '16px', textAlign: 'right' }}>
                            <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', marginRight: '8px' }}>
                              <Edit style={{ width: '18px', height: '18px', color: '#730000' }} />
                            </button>
                            <button onClick={() => handleDelete('brands', brand.id)} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
                              <Trash2 style={{ width: '18px', height: '18px', color: '#FF4444' }} />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'promos' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#233D4C', margin: 0 }}>{t.admin.promos.title}</h2>
                <button onClick={() => setShowPromoBannerModal(true)} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#730000', color: '#FEFACD', fontSize: '14px', fontWeight: '600', padding: '12px 20px', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
                  <Plus style={{ width: '18px', height: '18px' }} />
                  {t.admin.promos.addButton}
                </button>
              </div>
              <div style={{ background: '#FFFFFF', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                      <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px', fontWeight: '700', color: '#730000', textTransform: 'uppercase' }}>{t.admin.promos.table.title}</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px', fontWeight: '700', color: '#730000', textTransform: 'uppercase' }}>{t.admin.promos.table.status}</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px', fontWeight: '700', color: '#730000', textTransform: 'uppercase' }}>{t.admin.promos.table.order}</th>
                      <th style={{ padding: '12px', textAlign: 'right', fontSize: '13px', fontWeight: '700', color: '#730000', textTransform: 'uppercase' }}>{t.admin.promos.table.actions}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr><td colSpan={4} style={{ padding: '40px', textAlign: 'center', color: '#666' }}>{t.admin.promos.messages.loading}</td></tr>
                    ) : banners.length === 0 ? (
                      <tr><td colSpan={4} style={{ padding: '40px', textAlign: 'center', color: '#666' }}>{t.admin.promos.messages.noBanners}</td></tr>
                    ) : (
                      banners.map((banner: any) => (
                        <tr key={banner.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                          <td style={{ padding: '16px', fontSize: '14px', fontWeight: '600', color: '#233D4C' }}>{banner.title}</td>
                          <td style={{ padding: '16px' }}>
                            <span style={{ padding: '4px 12px', borderRadius: '12px', fontSize: '11px', fontWeight: '600', background: banner.isActive ? '#E8F5E9' : '#FFEBEE', color: banner.isActive ? '#2E7D32' : '#C62828' }}>
                              {banner.isActive ? t.admin.promos.status.active : t.admin.promos.status.inactive}
                            </span>
                          </td>
                          <td style={{ padding: '16px', fontSize: '13px', color: '#666' }}>{banner.order}</td>
                          <td style={{ padding: '16px', textAlign: 'right' }}>
                            <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', marginRight: '8px' }}>
                              <Edit style={{ width: '18px', height: '18px', color: '#730000' }} />
                            </button>
                            <button onClick={() => handleDelete('promo-banners', banner.id)} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
                              <Trash2 style={{ width: '18px', height: '18px', color: '#FF4444' }} />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#233D4C', marginBottom: '24px' }}>{t.admin.orders.title}</h2>
              <div style={{ background: '#FFFFFF', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                <p style={{ fontSize: '14px', color: '#666' }}>{t.admin.orders.messages.placeholder}</p>
              </div>
            </div>
          )}

          {activeTab === 'customers' && (
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#233D4C', marginBottom: '24px' }}>{t.admin.customers.title}</h2>
              <div style={{ background: '#FFFFFF', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                <p style={{ fontSize: '14px', color: '#666' }}>{t.admin.customers.messages.placeholder}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <ProductModal isOpen={showProductModal} onClose={() => { setShowProductModal(false); setEditingProduct(null); fetchData(); }} categories={categories.map((c: any) => c.name)} brands={brands.map((b: any) => b.name)} editProduct={editingProduct} />
      <CategoryModal isOpen={showCategoryModal} onClose={() => { setShowCategoryModal(false); fetchData(); }} />
      <BrandModal isOpen={showBrandModal} onClose={() => { setShowBrandModal(false); fetchData(); }} />
      <PromoBannerModal isOpen={showPromoBannerModal} onClose={() => { setShowPromoBannerModal(false); fetchData(); }} />
    </div>
  );
}
