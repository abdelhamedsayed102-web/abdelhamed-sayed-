import React, { useState } from 'react';
import {
  X,
  Plus,
  Trash2,
  Edit2,
  Save,
  RotateCcw,
  Download,
  Upload,
  MessageCircle,
  Image as ImageIcon,
  Check,
  Package,
  Layers,
  Phone,
  BookOpen,
  Camera,
  ExternalLink,
  AlertCircle,
  KeyRound,
  Shield,
  LogOut,
} from 'lucide-react';
import { useBrand } from '../context/BrandContext';
import { Product, CollectionItem, LookbookImage } from '../data/config';

interface AdminDashboardProps {
  isStandalone?: boolean;
  onExitAdmin?: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isStandalone = false,
  onExitAdmin,
}) => {
  const {
    config,
    isDashboardOpen,
    setIsDashboardOpen,
    adminUsername,
    logout,
    updateAdminCredentials,
    updateProduct,
    addProduct,
    deleteProduct,
    updateCollection,
    updateContact,
    updateIntro,
    updateBrandBasics,
    updateLookbook,
    addLookbookItem,
    deleteLookbookItem,
    resetToDefaults,
    exportConfigJson,
    importConfigJson,
  } = useBrand();

  const [activeTab, setActiveTab] = useState<
    'products' | 'collections' | 'contact' | 'brand' | 'lookbook' | 'backup' | 'security'
  >('products');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isNewProduct, setIsNewProduct] = useState(false);
  const [savedNotification, setSavedNotification] = useState<string | null>(null);

  // Security Credentials form state
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [credError, setCredError] = useState<string | null>(null);

  // Quick Notification trigger
  const showNotification = (msg: string) => {
    setSavedNotification(msg);
    setTimeout(() => setSavedNotification(null), 3000);
  };

  const handleClose = () => {
    if (onExitAdmin) {
      onExitAdmin();
    } else {
      setIsDashboardOpen(false);
    }
  };

  if (!isStandalone && !isDashboardOpen) return null;

  // Handler for Image File Upload (converts file to Data URL for instant live preview)
  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    callback: (dataUrl: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('حجم الصورة كبير جداً. يرجى اختيار صورة أقل من 5 ميجابايت.');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          callback(reader.result);
          showNotification('تم تحميل ومعاينة الصورة بنجاح');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const wrapperClass = isStandalone
    ? 'w-full h-full flex flex-col bg-[#F8F3EC] text-[#3B1E14]'
    : 'fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md overflow-hidden text-[#3B1E14]';

  const innerClass = isStandalone
    ? 'relative w-full h-full flex flex-col overflow-hidden bg-[#F8F3EC]'
    : 'relative w-full max-w-6xl h-[92vh] bg-[#F8F3EC] border border-[#C49A6C]/40 shadow-2xl flex flex-col overflow-hidden rounded-none';

  return (
    <div className={wrapperClass} role="dialog" aria-modal="true">
      <div className={innerClass}>
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#3B1E14] text-[#F8F3EC] border-b border-[#C49A6C]/30 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-none bg-[#C49A6C] text-[#22120C] flex items-center justify-center font-bold text-sm">
              NW
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-serif tracking-wide text-[#F8F3EC]">
                  لوحة تحكم NOOM WEAR · Atelier Admin
                </h2>
                <span className="text-[10px] bg-[#C49A6C]/20 text-[#DFC4A5] px-2 py-0.5 uppercase tracking-wider">
                  Live Management
                </span>
              </div>
              <p className="text-[11px] text-[#DFC4A5]/80">
                أي تعديل هنا يُحفظ تلقائياً ويظهر مباشرة على الموقع
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {savedNotification && (
              <div className="hidden sm:flex items-center gap-1.5 text-xs bg-emerald-900/60 text-emerald-200 px-3 py-1 border border-emerald-500/30">
                <Check className="w-3.5 h-3.5" />
                <span>{savedNotification}</span>
              </div>
            )}
            <button
              onClick={handleClose}
              className="p-2 text-[#DFC4A5] hover:text-[#F8F3EC] hover:bg-white/10 transition-colors"
              aria-label="إغلاق لوحة التحكم"
              title="إغلاق والعودة للمتجر"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto bg-[#EDE3D5] px-4 py-2 border-b border-[#C49A6C]/25 shrink-0 text-xs font-medium">
          <button
            onClick={() => {
              setActiveTab('products');
              setEditingProduct(null);
            }}
            className={`flex items-center gap-2 px-3.5 py-2 whitespace-nowrap transition-all ${
              activeTab === 'products'
                ? 'bg-[#3B1E14] text-[#F8F3EC] shadow-xs'
                : 'text-[#603A2A] hover:text-[#3B1E14] hover:bg-white/40'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>المنتجات والأسعار (Products)</span>
            <span className="text-[10px] opacity-75 font-sans">({config.products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('collections')}
            className={`flex items-center gap-2 px-3.5 py-2 whitespace-nowrap transition-all ${
              activeTab === 'collections'
                ? 'bg-[#3B1E14] text-[#F8F3EC] shadow-xs'
                : 'text-[#603A2A] hover:text-[#3B1E14] hover:bg-white/40'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>المجموعات (Collections)</span>
          </button>

          <button
            onClick={() => setActiveTab('contact')}
            className={`flex items-center gap-2 px-3.5 py-2 whitespace-nowrap transition-all ${
              activeTab === 'contact'
                ? 'bg-[#3B1E14] text-[#F8F3EC] shadow-xs'
                : 'text-[#603A2A] hover:text-[#3B1E14] hover:bg-white/40'
            }`}
          >
            <Phone className="w-4 h-4" />
            <span>الواتساب والتواصل (Contact & Social)</span>
          </button>

          <button
            onClick={() => setActiveTab('brand')}
            className={`flex items-center gap-2 px-3.5 py-2 whitespace-nowrap transition-all ${
              activeTab === 'brand'
                ? 'bg-[#3B1E14] text-[#F8F3EC] shadow-xs'
                : 'text-[#603A2A] hover:text-[#3B1E14] hover:bg-white/40'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>نصوص البراند (Story & Hero)</span>
          </button>

          <button
            onClick={() => setActiveTab('lookbook')}
            className={`flex items-center gap-2 px-3.5 py-2 whitespace-nowrap transition-all ${
              activeTab === 'lookbook'
                ? 'bg-[#3B1E14] text-[#F8F3EC] shadow-xs'
                : 'text-[#603A2A] hover:text-[#3B1E14] hover:bg-white/40'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>اللوك بوك (Lookbook)</span>
          </button>

          <button
            onClick={() => setActiveTab('backup')}
            className={`flex items-center gap-2 px-3.5 py-2 whitespace-nowrap transition-all ml-auto ${
              activeTab === 'backup'
                ? 'bg-[#3B1E14] text-[#F8F3EC] shadow-xs'
                : 'text-[#603A2A] hover:text-[#3B1E14] hover:bg-white/40'
            }`}
          >
            <RotateCcw className="w-4 h-4" />
            <span>النسخ الاحتياطي (Backup)</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`flex items-center gap-2 px-3.5 py-2 whitespace-nowrap transition-all ${
              activeTab === 'security'
                ? 'bg-[#3B1E14] text-[#F8F3EC] shadow-xs'
                : 'text-[#603A2A] hover:text-[#3B1E14] hover:bg-white/40'
            }`}
          >
            <Shield className="w-4 h-4 text-[#C49A6C]" />
            <span>الأمان وكلمة المرور (Security)</span>
          </button>
        </div>

        {/* Tab Content Body (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#F8F3EC]">
          {/* TAB 1: PRODUCTS MANAGEMENT */}
          {activeTab === 'products' && (
            <div>
              {editingProduct ? (
                /* Product Edit Form */
                <div className="bg-white border border-[#C49A6C]/30 p-6 max-w-4xl mx-auto shadow-sm">
                  <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#C49A6C]/20">
                    <h3 className="text-xl font-serif text-[#3B1E14]">
                      {isNewProduct ? 'إضافة قطعة جديدة' : `تعديل: ${editingProduct.name}`}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setEditingProduct(null)}
                      className="text-xs text-[#603A2A] hover:text-[#3B1E14] underline"
                    >
                      إلغاء والعودة للقائمة
                    </button>
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (isNewProduct) {
                        addProduct(editingProduct);
                        showNotification('تمت إضافة القطعة بنجاح إلى المتجر');
                      } else {
                        updateProduct(editingProduct.id, editingProduct);
                        showNotification('تم تحديث بيانات القطعة بنجاح');
                      }
                      setEditingProduct(null);
                    }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Name */}
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-[#3B1E14] font-medium mb-1">
                          اسم الموديل / القطعة (Product Name) *
                        </label>
                        <input
                          type="text"
                          required
                          value={editingProduct.name}
                          onChange={(e) =>
                            setEditingProduct({ ...editingProduct, name: e.target.value })
                          }
                          className="w-full px-3 py-2 border border-[#C49A6C]/30 bg-[#F8F3EC]/30 text-sm focus:outline-none focus:border-[#3B1E14]"
                          placeholder="e.g. The Signature Satin Pyjama Set"
                        />
                      </div>

                      {/* Subtitle */}
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-[#3B1E14] font-medium mb-1">
                          الوصف المختصر (Subtitle)
                        </label>
                        <input
                          type="text"
                          value={editingProduct.subtitle}
                          onChange={(e) =>
                            setEditingProduct({ ...editingProduct, subtitle: e.target.value })
                          }
                          className="w-full px-3 py-2 border border-[#C49A6C]/30 bg-[#F8F3EC]/30 text-sm focus:outline-none focus:border-[#3B1E14]"
                          placeholder="e.g. Classic Notch Collar with Champagne Hand-Piping"
                        />
                      </div>

                      {/* Collection Category */}
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-[#3B1E14] font-medium mb-1">
                          المجموعة التابعة لها (Collection)
                        </label>
                        <select
                          value={editingProduct.collectionId}
                          onChange={(e) => {
                            const val = e.target.value as 'satin' | 'comfort' | 'mother-daughter';
                            const colNames = {
                              satin: 'Satin Collection',
                              comfort: 'Everyday Comfort',
                              'mother-daughter': 'Mother & Daughter',
                            };
                            setEditingProduct({
                              ...editingProduct,
                              collectionId: val,
                              collectionName: colNames[val],
                            });
                          }}
                          className="w-full px-3 py-2 border border-[#C49A6C]/30 bg-[#F8F3EC]/30 text-sm focus:outline-none focus:border-[#3B1E14]"
                        >
                          <option value="satin">Satin Collection (مجموعة الساتان)</option>
                          <option value="comfort">Everyday Comfort (راحة يومية / مودال)</option>
                          <option value="mother-daughter">Mother & Daughter (الأم والابنة)</option>
                        </select>
                      </div>

                      {/* Price in EGP */}
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-[#3B1E14] font-medium mb-1">
                          السعر بالجنيه المصري (Price in EGP) *
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            required
                            min="0"
                            step="50"
                            value={editingProduct.priceEGP}
                            onChange={(e) => {
                              const val = Number(e.target.value);
                              setEditingProduct({
                                ...editingProduct,
                                priceEGP: val,
                                formattedPrice: `${val.toLocaleString('en-US')} EGP`,
                              });
                            }}
                            className="w-full px-3 py-2 border border-[#C49A6C]/30 bg-[#F8F3EC]/30 text-sm focus:outline-none focus:border-[#3B1E14]"
                          />
                          <span className="absolute right-3 top-2.5 text-xs text-[#603A2A] font-medium">
                            EGP
                          </span>
                        </div>
                      </div>

                      {/* Badge / Tag */}
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-[#3B1E14] font-medium mb-1">
                          شارة تمييز اختيارية (Badge)
                        </label>
                        <input
                          type="text"
                          value={editingProduct.badge || ''}
                          onChange={(e) =>
                            setEditingProduct({ ...editingProduct, badge: e.target.value })
                          }
                          className="w-full px-3 py-2 border border-[#C49A6C]/30 bg-[#F8F3EC]/30 text-sm focus:outline-none focus:border-[#3B1E14]"
                          placeholder="e.g. Bestseller, Limited Edition, New, Gift Set"
                        />
                      </div>

                      {/* Sizes */}
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-[#3B1E14] font-medium mb-1">
                          المقاسات المتاحة (Sizes - مفصولة بفواصل)
                        </label>
                        <input
                          type="text"
                          value={editingProduct.sizes.join(', ')}
                          onChange={(e) =>
                            setEditingProduct({
                              ...editingProduct,
                              sizes: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                            })
                          }
                          className="w-full px-3 py-2 border border-[#C49A6C]/30 bg-[#F8F3EC]/30 text-sm focus:outline-none focus:border-[#3B1E14]"
                          placeholder="XS, S, M, L, XL"
                        />
                      </div>
                    </div>

                    {/* Image URL & File Upload */}
                    <div className="p-4 bg-[#EDE3D5]/40 border border-[#C49A6C]/30 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs uppercase tracking-wider text-[#3B1E14] font-semibold flex items-center gap-1.5">
                          <ImageIcon className="w-4 h-4 text-[#C49A6C]" />
                          صورة المنتج الأساسية (Product Primary Photo)
                        </span>
                        <label className="cursor-pointer px-3 py-1 bg-[#3B1E14] text-[#F8F3EC] text-xs hover:bg-[#603A2A] transition-colors flex items-center gap-1.5">
                          <Upload className="w-3.5 h-3.5" />
                          <span>رفع صورة من جهازك</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) =>
                              handleImageUpload(e, (dataUrl) =>
                                setEditingProduct({ ...editingProduct, image: dataUrl })
                              )
                            }
                          />
                        </label>
                      </div>

                      <div className="flex gap-4 items-center">
                        <div className="w-20 h-24 bg-white border border-[#C49A6C]/30 shrink-0 overflow-hidden flex items-center justify-center">
                          {editingProduct.image ? (
                            <img
                              src={editingProduct.image}
                              alt="معاينة"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-[10px] text-gray-400">لا توجد صورة</span>
                          )}
                        </div>
                        <div className="flex-1">
                          <label className="block text-[11px] text-[#603A2A] mb-1">
                            أو الصق رابط الصورة المباشر (URL):
                          </label>
                          <input
                            type="text"
                            value={editingProduct.image}
                            onChange={(e) =>
                              setEditingProduct({ ...editingProduct, image: e.target.value })
                            }
                            className="w-full px-3 py-2 border border-[#C49A6C]/30 bg-white text-xs font-mono"
                            placeholder="https://... أو /assets/..."
                          />
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#3B1E14] font-medium mb-1">
                        وصف الموديل والقصة (Detailed Description)
                      </label>
                      <textarea
                        rows={3}
                        value={editingProduct.description}
                        onChange={(e) =>
                          setEditingProduct({ ...editingProduct, description: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-[#C49A6C]/30 bg-[#F8F3EC]/30 text-sm focus:outline-none focus:border-[#3B1E14]"
                      />
                    </div>

                    {/* Fabric Details */}
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#3B1E14] font-medium mb-1">
                        تفاصيل القماش والعناية (Fabric & Touch)
                      </label>
                      <input
                        type="text"
                        value={editingProduct.fabricDetails}
                        onChange={(e) =>
                          setEditingProduct({ ...editingProduct, fabricDetails: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-[#C49A6C]/30 bg-[#F8F3EC]/30 text-sm focus:outline-none focus:border-[#3B1E14]"
                        placeholder="e.g. 95% Premium Lustrous Satin Silk Blend..."
                      />
                    </div>

                    {/* Submit Buttons */}
                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#C49A6C]/20">
                      <button
                        type="button"
                        onClick={() => setEditingProduct(null)}
                        className="px-5 py-2.5 border border-[#3B1E14]/30 text-xs uppercase tracking-widest hover:bg-[#EDE3D5]"
                      >
                        إلغاء
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-[#3B1E14] text-[#F8F3EC] hover:bg-[#603A2A] transition-colors text-xs uppercase tracking-widest font-semibold flex items-center gap-2"
                      >
                        <Save className="w-4 h-4 text-[#C49A6C]" />
                        <span>حفظ التعديلات</span>
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                /* Products List */
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-[#C49A6C]/20 gap-4">
                    <div>
                      <h3 className="text-xl font-serif text-[#3B1E14]">
                        إدارة المنتجات والقطع ({config.products.length} قطعة)
                      </h3>
                      <p className="text-xs text-[#603A2A]">
                        يمكنك تعديل الأسعار، المسميات، الصور، وإضافة قطع جديدة للمتجر.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setIsNewProduct(true);
                        setEditingProduct({
                          id: `prod-${Date.now()}`,
                          name: '',
                          subtitle: '',
                          collectionId: 'satin',
                          collectionName: 'Satin Collection',
                          priceEGP: 2200,
                          formattedPrice: '2,200 EGP',
                          badge: 'New Arrival',
                          description: '',
                          fabricDetails: '100% Luxury Drape Satin',
                          sizes: ['XS', 'S', 'M', 'L', 'XL'],
                          colors: [
                            { name: 'Rich Chocolate', hex: '#3B1E14' },
                            { name: 'Champagne Gold', hex: '#C49A6C' },
                          ],
                          image: config.assets.heroCover,
                        });
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#3B1E14] text-[#F8F3EC] text-xs uppercase tracking-widest font-semibold hover:bg-[#603A2A] transition-colors shadow-xs"
                    >
                      <Plus className="w-4 h-4 text-[#C49A6C]" />
                      <span>+ إضافة قطعة جديدة</span>
                    </button>
                  </div>

                  {/* Products Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {config.products.map((p) => (
                      <div
                        key={p.id}
                        className="bg-white border border-[#C49A6C]/25 flex flex-col justify-between p-4 shadow-2xs hover:shadow-md transition-shadow"
                      >
                        <div className="flex gap-4">
                          <div className="w-20 h-24 bg-[#EDE3D5] shrink-0 overflow-hidden border border-[#C49A6C]/20">
                            {p.image ? (
                              <img
                                src={p.image}
                                alt={p.name}
                                className="w-full h-full object-cover"
                              />
                            ) : null}
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="text-[10px] text-[#C49A6C] uppercase tracking-wider block font-medium">
                              {p.collectionName}
                            </span>
                            <h4 className="font-serif text-base text-[#3B1E14] truncate font-medium">
                              {p.name}
                            </h4>
                            <div className="text-sm font-semibold text-[#3B1E14] mt-1 tabular-nums">
                              {p.formattedPrice}
                            </div>
                            <div className="text-[11px] text-[#603A2A] mt-1">
                              المقاسات: {p.sizes.join(' · ')}
                            </div>
                            {p.badge && (
                              <span className="inline-block mt-1 text-[9px] bg-[#3B1E14] text-[#F8F3EC] px-1.5 py-0.5 uppercase tracking-wider">
                                {p.badge}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-[#C49A6C]/15 flex items-center justify-between">
                          <button
                            type="button"
                            onClick={() => {
                              setIsNewProduct(false);
                              setEditingProduct(p);
                            }}
                            className="inline-flex items-center gap-1.5 text-xs text-[#3B1E14] hover:text-[#C49A6C] font-medium"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                            <span>تعديل السعر والبيانات</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (confirm(`هل أنت متأكد من حذف قطعة "${p.name}"؟`)) {
                                deleteProduct(p.id);
                                showNotification('تم حذف القطعة');
                              }
                            }}
                            className="text-xs text-rose-700 hover:text-rose-900 p-1"
                            title="حذف القطعة"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: COLLECTIONS */}
          {activeTab === 'collections' && (
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-serif text-[#3B1E14]">
                  المجموعات الرئيسية الثلاث (The 3 Collections)
                </h3>
                <p className="text-xs text-[#603A2A]">
                  تعديل عناوين المجموعات وأوصافها وصور الغلاف الخاصة بكل مجموعة.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {config.collections.map((col) => (
                  <div
                    key={col.id}
                    className="bg-white border border-[#C49A6C]/30 p-5 flex flex-col justify-between shadow-2xs space-y-4"
                  >
                    <div>
                      <div className="aspect-[4/3] w-full overflow-hidden bg-[#EDE3D5] mb-3 relative">
                        {col.image && (
                          <img
                            src={col.image}
                            alt={col.title}
                            className="w-full h-full object-cover"
                          />
                        )}
                        <label className="absolute bottom-2 right-2 px-2.5 py-1 bg-[#3B1E14]/80 text-[#F8F3EC] text-[10px] cursor-pointer hover:bg-[#3B1E14] flex items-center gap-1">
                          <Camera className="w-3 h-3" />
                          <span>تغيير الغلاف</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) =>
                              handleImageUpload(e, (dataUrl) => {
                                updateCollection(col.id, { image: dataUrl });
                                showNotification('تم تحديث صورة غلاف المجموعة');
                              })
                            }
                          />
                        </label>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <label className="block text-[11px] uppercase tracking-wider text-[#3B1E14] font-medium mb-1">
                            اسم المجموعة (Title)
                          </label>
                          <input
                            type="text"
                            value={col.title}
                            onChange={(e) =>
                              updateCollection(col.id, { title: e.target.value })
                            }
                            className="w-full px-3 py-1.5 border border-[#C49A6C]/30 text-xs"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] uppercase tracking-wider text-[#3B1E14] font-medium mb-1">
                            الشعار الفرعي (Tagline)
                          </label>
                          <input
                            type="text"
                            value={col.tagline}
                            onChange={(e) =>
                              updateCollection(col.id, { tagline: e.target.value })
                            }
                            className="w-full px-3 py-1.5 border border-[#C49A6C]/30 text-xs"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] uppercase tracking-wider text-[#3B1E14] font-medium mb-1">
                            الوصف (Description)
                          </label>
                          <textarea
                            rows={3}
                            value={col.description}
                            onChange={(e) =>
                              updateCollection(col.id, { description: e.target.value })
                            }
                            className="w-full px-3 py-1.5 border border-[#C49A6C]/30 text-xs"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] uppercase tracking-wider text-[#3B1E14] font-medium mb-1">
                            عدد القطع المعروضة (Tag)
                          </label>
                          <input
                            type="text"
                            value={col.pieceCount}
                            onChange={(e) =>
                              updateCollection(col.id, { pieceCount: e.target.value })
                            }
                            className="w-full px-3 py-1.5 border border-[#C49A6C]/30 text-xs"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: CONTACT & WHATSAPP */}
          {activeTab === 'contact' && (
            <div className="bg-white border border-[#C49A6C]/30 p-6 max-w-3xl mx-auto space-y-6">
              <div>
                <h3 className="text-xl font-serif text-[#3B1E14]">
                  بيانات التواصل والواتساب (WhatsApp & Contact)
                </h3>
                <p className="text-xs text-[#603A2A]">
                  تعديل رقم الواتساب الذي يستقبل طلبات الشراء تلقائياً، وحساب الانستجرام، وعنوان المعرض.
                </p>
              </div>

              <div className="space-y-4">
                {/* WhatsApp Number */}
                <div className="p-4 bg-[#EDE3D5]/40 border border-[#C49A6C]/30">
                  <label className="block text-xs uppercase tracking-wider text-[#3B1E14] font-semibold mb-1 flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-emerald-700" />
                    <span>رقم الواتساب لاستقبال الطلبات (WhatsApp Number with country code) *</span>
                  </label>
                  <p className="text-[11px] text-[#603A2A] mb-2">
                    اكتب الرقم بصيغة كود الدولة مثل: <strong>+201012345678</strong> (مهم لتوجيه أزرار "Order via WhatsApp" مباشرة)
                  </p>
                  <input
                    type="text"
                    value={config.contact.whatsappNumber}
                    onChange={(e) => {
                      updateContact({ whatsappNumber: e.target.value });
                      showNotification('تم تحديث رقم الواتساب');
                    }}
                    className="w-full px-3 py-2 border border-[#C49A6C]/30 bg-white text-sm font-mono"
                    placeholder="+201000000000"
                  />

                  <div className="mt-3 flex items-center justify-between text-xs">
                    <span className="text-[#603A2A]">الرقم الظاهر للعملاء (Display Phone):</span>
                    <input
                      type="text"
                      value={config.contact.whatsappDisplay}
                      onChange={(e) =>
                        updateContact({ whatsappDisplay: e.target.value })
                      }
                      className="px-2 py-1 border border-[#C49A6C]/30 bg-white text-xs"
                      placeholder="+20 (100) 000-0000"
                    />
                  </div>
                </div>

                {/* Instagram */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#3B1E14] font-medium mb-1">
                      اسم حساب الانستجرام (Instagram Handle)
                    </label>
                    <input
                      type="text"
                      value={config.contact.instagramHandle}
                      onChange={(e) => {
                        updateContact({ instagramHandle: e.target.value });
                        showNotification('تم تحديث حساب انستجرام');
                      }}
                      className="w-full px-3 py-2 border border-[#C49A6C]/30 text-xs"
                      placeholder="@noomwear.eg"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#3B1E14] font-medium mb-1">
                      رابط الانستجرام المباشر (Instagram URL)
                    </label>
                    <input
                      type="text"
                      value={config.contact.instagramUrl}
                      onChange={(e) =>
                        updateContact({ instagramUrl: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-[#C49A6C]/30 text-xs font-mono"
                      placeholder="https://instagram.com/noomwear.eg"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#3B1E14] font-medium mb-1">
                    البريد الإلكتروني للكونسيرج (Concierge Email)
                  </label>
                  <input
                    type="email"
                    value={config.contact.email}
                    onChange={(e) =>
                      updateContact({ email: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-[#C49A6C]/30 text-xs font-mono"
                    placeholder="concierge@noomwear.com"
                  />
                </div>

                {/* Showroom Location */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#3B1E14] font-medium mb-1">
                    عنوان المعرض / الأتيليه في القاهرة (Showroom Location)
                  </label>
                  <input
                    type="text"
                    value={config.contact.showroomLocation}
                    onChange={(e) =>
                      updateContact({ showroomLocation: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-[#C49A6C]/30 text-xs"
                    placeholder="Zamalek, Cairo, Egypt (By Private Appointment)"
                  />
                </div>

                {/* Working Hours */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#3B1E14] font-medium mb-1">
                    ساعات العمل (Working Hours)
                  </label>
                  <input
                    type="text"
                    value={config.contact.workingHours}
                    onChange={(e) =>
                      updateContact({ workingHours: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-[#C49A6C]/30 text-xs"
                    placeholder="Sunday – Thursday: 10:00 AM – 8:00 PM CLT"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: BRAND STORY & TEXTS */}
          {activeTab === 'brand' && (
            <div className="bg-white border border-[#C49A6C]/30 p-6 max-w-3xl mx-auto space-y-6">
              <div>
                <h3 className="text-xl font-serif text-[#3B1E14]">
                  نصوص البراند وقصة الأتيليه (Brand Story & Headlines)
                </h3>
                <p className="text-xs text-[#603A2A]">
                  تعديل الشعار الرئيسي، الكلمات الافتتاحية، وإحصائيات الثقة.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#3B1E14] font-medium mb-1">
                    الشعار الرئيسي (Tagline)
                  </label>
                  <input
                    type="text"
                    value={config.tagline}
                    onChange={(e) => {
                      updateBrandBasics({ tagline: e.target.value });
                      showNotification('تم تحديث الشعار');
                    }}
                    className="w-full px-3 py-2 border border-[#C49A6C]/30 text-sm font-serif"
                    placeholder="Comfort Meets Elegance"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#3B1E14] font-medium mb-1">
                    عنوان قسم القصة (Story Heading)
                  </label>
                  <input
                    type="text"
                    value={config.intro.heading}
                    onChange={(e) =>
                      updateIntro({ heading: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-[#C49A6C]/30 text-sm font-serif"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#3B1E14] font-medium mb-1">
                    الفقرة الأولى (First Paragraph)
                  </label>
                  <textarea
                    rows={3}
                    value={config.intro.paragraph1}
                    onChange={(e) =>
                      updateIntro({ paragraph1: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-[#C49A6C]/30 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#3B1E14] font-medium mb-1">
                    الفقرة الثانية (Second Paragraph)
                  </label>
                  <textarea
                    rows={3}
                    value={config.intro.paragraph2}
                    onChange={(e) =>
                      updateIntro({ paragraph2: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-[#C49A6C]/30 text-xs"
                  />
                </div>

                {/* Stats */}
                <div className="pt-4 border-t border-[#C49A6C]/20">
                  <span className="text-xs uppercase tracking-wider text-[#3B1E14] font-semibold block mb-3">
                    أرقام وإحصائيات الثقة (Key Trust Metrics):
                  </span>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <input
                        type="text"
                        value={config.intro.stat1.number}
                        onChange={(e) =>
                          updateIntro({ stat1: { ...config.intro.stat1, number: e.target.value } })
                        }
                        className="w-full px-2 py-1 border border-[#C49A6C]/30 text-xs font-serif font-bold text-center"
                      />
                      <input
                        type="text"
                        value={config.intro.stat1.label}
                        onChange={(e) =>
                          updateIntro({ stat1: { ...config.intro.stat1, label: e.target.value } })
                        }
                        className="w-full px-2 py-1 border border-[#C49A6C]/30 text-[10px] text-center mt-1"
                      />
                    </div>

                    <div>
                      <input
                        type="text"
                        value={config.intro.stat2.number}
                        onChange={(e) =>
                          updateIntro({ stat2: { ...config.intro.stat2, number: e.target.value } })
                        }
                        className="w-full px-2 py-1 border border-[#C49A6C]/30 text-xs font-serif font-bold text-center"
                      />
                      <input
                        type="text"
                        value={config.intro.stat2.label}
                        onChange={(e) =>
                          updateIntro({ stat2: { ...config.intro.stat2, label: e.target.value } })
                        }
                        className="w-full px-2 py-1 border border-[#C49A6C]/30 text-[10px] text-center mt-1"
                      />
                    </div>

                    <div>
                      <input
                        type="text"
                        value={config.intro.stat3.number}
                        onChange={(e) =>
                          updateIntro({ stat3: { ...config.intro.stat3, number: e.target.value } })
                        }
                        className="w-full px-2 py-1 border border-[#C49A6C]/30 text-xs font-serif font-bold text-center"
                      />
                      <input
                        type="text"
                        value={config.intro.stat3.label}
                        onChange={(e) =>
                          updateIntro({ stat3: { ...config.intro.stat3, label: e.target.value } })
                        }
                        className="w-full px-2 py-1 border border-[#C49A6C]/30 text-[10px] text-center mt-1"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: LOOKBOOK */}
          {activeTab === 'lookbook' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#C49A6C]/20 gap-3">
                <div>
                  <h3 className="text-xl font-serif text-[#3B1E14]">
                    معرض الصور واللوك بوك ({config.lookbook.length} لقطة)
                  </h3>
                  <p className="text-xs text-[#603A2A]">
                    الصور تظهر في شبكة اللوك بوك التحريرية ومتاحة للتكبير في الـ Lightbox.
                  </p>
                </div>

                <label className="cursor-pointer px-4 py-2 bg-[#3B1E14] text-[#F8F3EC] text-xs uppercase tracking-widest font-semibold hover:bg-[#603A2A] flex items-center gap-1.5 self-start">
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ إضافة صورة جديدة للوك بوك</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) =>
                      handleImageUpload(e, (dataUrl) => {
                        addLookbookItem({
                          title: 'New Editorial Look',
                          subtitle: 'NOOM WEAR Cairo Atelier',
                          image: dataUrl,
                        });
                        showNotification('تمت إضافة الصورة بنجاح إلى اللوك بوك');
                      })
                    }
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {config.lookbook.map((item, idx) => (
                  <div
                    key={item.id}
                    className="bg-white border border-[#C49A6C]/25 p-4 flex flex-col justify-between shadow-2xs space-y-3"
                  >
                    <div className="aspect-[4/3] w-full overflow-hidden bg-[#EDE3D5] relative">
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      )}
                      <label className="absolute bottom-2 right-2 px-2 py-1 bg-[#3B1E14]/80 text-[#F8F3EC] text-[10px] cursor-pointer hover:bg-[#3B1E14] flex items-center gap-1">
                        <Upload className="w-3 h-3" />
                        <span>استبدال</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            handleImageUpload(e, (dataUrl) => {
                              const updated = [...config.lookbook];
                              updated[idx] = { ...item, image: dataUrl };
                              updateLookbook(updated);
                              showNotification('تم تحديث الصورة');
                            })
                          }
                        />
                      </label>
                    </div>

                    <div className="space-y-2">
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => {
                          const updated = [...config.lookbook];
                          updated[idx] = { ...item, title: e.target.value };
                          updateLookbook(updated);
                        }}
                        className="w-full px-2 py-1 border border-[#C49A6C]/30 text-xs font-serif font-medium"
                        placeholder="عنوان الصورة"
                      />
                      <input
                        type="text"
                        value={item.subtitle}
                        onChange={(e) => {
                          const updated = [...config.lookbook];
                          updated[idx] = { ...item, subtitle: e.target.value };
                          updateLookbook(updated);
                        }}
                        className="w-full px-2 py-1 border border-[#C49A6C]/30 text-[11px]"
                        placeholder="الوصف الفرعي"
                      />
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm('حذف هذه الصورة من اللوك بوك؟')) {
                            deleteLookbookItem(item.id);
                            showNotification('تم حذف الصورة');
                          }
                        }}
                        className="text-xs text-rose-700 hover:text-rose-900 flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>حذف</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: BACKUP & EXPORT */}
          {activeTab === 'backup' && (
            <div className="bg-white border border-[#C49A6C]/30 p-8 max-w-2xl mx-auto space-y-8">
              <div>
                <h3 className="text-xl font-serif text-[#3B1E14]">
                  النسخ الاحتياطي واستعادة الضبط (Backup & Restore)
                </h3>
                <p className="text-xs text-[#603A2A]">
                  يمكنك تحميل ملف نسخة احتياطية بكل بياناتك وأسعارك ومنتجاتك، أو استيراد ملف محفوظ مسبقاً، أو استعادة الإعدادات الأصلية.
                </p>
              </div>

              <div className="space-y-4">
                {/* Export */}
                <div className="p-4 bg-[#EDE3D5]/40 border border-[#C49A6C]/25 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-[#3B1E14]">
                      تحميل نسخة احتياطية (Export JSON)
                    </h4>
                    <p className="text-xs text-[#603A2A]">
                      احفظ كل التعديلات الحالية كملف على جهازك.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      exportConfigJson();
                      showNotification('تم تنزيل ملف الإعدادات');
                    }}
                    className="px-4 py-2 bg-[#3B1E14] text-[#F8F3EC] text-xs uppercase tracking-wider font-medium hover:bg-[#603A2A] transition-colors flex items-center gap-1.5"
                  >
                    <Download className="w-4 h-4 text-[#C49A6C]" />
                    <span>تصدير ملف</span>
                  </button>
                </div>

                {/* Import */}
                <div className="p-4 bg-[#EDE3D5]/40 border border-[#C49A6C]/25 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-[#3B1E14]">
                      استيراد إعدادات سابقة (Import JSON)
                    </h4>
                    <p className="text-xs text-[#603A2A]">
                      قم برفع ملف نسخة احتياطية تم تنزيله مسبقاً.
                    </p>
                  </div>
                  <label className="cursor-pointer px-4 py-2 bg-white border border-[#3B1E14] text-[#3B1E14] text-xs uppercase tracking-wider font-medium hover:bg-[#EDE3D5] transition-colors flex items-center gap-1.5">
                    <Upload className="w-4 h-4 text-[#C49A6C]" />
                    <span>اختيار ملف</span>
                    <input
                      type="file"
                      accept=".json"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            const content = event.target?.result;
                            if (typeof content === 'string') {
                              const success = importConfigJson(content);
                              if (success) {
                                showNotification('تم استيراد الإعدادات وتطبيقها بنجاح!');
                              } else {
                                alert('الملف غير صالح أو حدث خطأ أثناء قراءته.');
                              }
                            }
                          };
                          reader.readAsText(file);
                        }
                      }}
                    />
                  </label>
                </div>

                {/* Reset */}
                <div className="p-4 bg-rose-50 border border-rose-200 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-rose-900">
                      استعادة الإعدادات الأصلية للبراند (Reset to Factory Defaults)
                    </h4>
                    <p className="text-xs text-rose-700">
                      سيتم مسح التعديلات المحلية واستعادة المنتجات والأسعار الأولية.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (
                        confirm(
                          'تحذير: هل أنت متأكد من استعادة الإعدادات الأصلية؟ سيتم مسح أي تعديلات غير محفوظة خارجياً.'
                        )
                      ) {
                        resetToDefaults();
                        showNotification('تمت استعادة الإعدادات الأصلية بنجاح');
                      }
                    }}
                    className="px-4 py-2 bg-rose-700 text-white text-xs uppercase tracking-wider font-medium hover:bg-rose-800 transition-colors flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>استعادة الضبط</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: SECURITY & CREDENTIALS */}
          {activeTab === 'security' && (
            <div className="bg-white border border-[#C49A6C]/30 p-8 max-w-xl mx-auto space-y-6">
              <div>
                <h3 className="text-xl font-serif text-[#3B1E14]">
                  الأمان وبيانات دخول الأدمن (Admin Credentials)
                </h3>
                <p className="text-xs text-[#603A2A]">
                  يمكنك هنا تغيير اسم المستخدم وكلمة المرور الخاصة بلوحة التحكم لحماية موقعك.
                </p>
              </div>

              {credError && (
                <div className="p-3 bg-rose-50 border border-rose-300 text-rose-800 text-xs">
                  {credError}
                </div>
              )}

              <div className="p-4 bg-[#EDE3D5]/40 border border-[#C49A6C]/25 text-xs text-[#603A2A]">
                اسم المستخدم الحالي المسجل به: <strong className="text-[#3B1E14]">{adminUsername}</strong>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setCredError(null);
                  if (newPassword !== confirmPassword) {
                    setCredError('كلمة المرور الجديدة غير متطابقة مع التأكيد.');
                    return;
                  }
                  if (newPassword.length < 4) {
                    setCredError('يرجى إدخال كلمة مرور تتكون من 4 خانات على الأقل.');
                    return;
                  }
                  const success = updateAdminCredentials(newUsername || adminUsername, newPassword);
                  if (success) {
                    showNotification('تم تحديث اسم المستخدم وكلمة المرور بنجاح!');
                    setNewPassword('');
                    setConfirmPassword('');
                  } else {
                    setCredError('حدث خطأ أثناء حفظ البيانات الجديدة.');
                  }
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#3B1E14] font-medium mb-1">
                    اسم المستخدم الجديد (New Username)
                  </label>
                  <input
                    type="text"
                    required
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    placeholder={adminUsername}
                    className="w-full px-3 py-2 border border-[#C49A6C]/30 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#3B1E14] font-medium mb-1">
                    كلمة المرور الجديدة (New Password)
                  </label>
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full px-3 py-2 border border-[#C49A6C]/30 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#3B1E14] font-medium mb-1">
                    تأكيد كلمة المرور الجديدة (Confirm Password)
                  </label>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full px-3 py-2 border border-[#C49A6C]/30 text-xs"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#3B1E14] text-[#F8F3EC] text-xs uppercase tracking-wider font-semibold hover:bg-[#603A2A] transition-colors flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4 text-[#C49A6C]" />
                    <span>حفظ بيانات الدخول الجديدة</span>
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Bottom Footer Bar */}
        <div className="px-6 py-3 bg-[#EDE3D5] border-t border-[#C49A6C]/25 flex items-center justify-between text-xs text-[#603A2A] shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block"></span>
            <span>الداش بورد متصلة بالواجهة مباشرة · التعديل فوري</span>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="px-5 py-1.5 bg-[#3B1E14] text-[#F8F3EC] text-xs uppercase tracking-widest hover:bg-[#603A2A] transition-colors"
          >
            إغلاق وعرض الموقع
          </button>
        </div>
      </div>
    </div>
  );
};
