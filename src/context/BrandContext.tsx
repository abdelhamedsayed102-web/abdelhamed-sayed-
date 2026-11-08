import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  BrandConfig,
  BRAND_CONFIG,
  Product,
  CollectionItem,
  LookbookImage,
  BrandContact,
  BrandIntro,
} from '../data/config';

export interface AdminCredentials {
  username: string;
  passwordHash: string; // Plain/stored for local atelier admin
}

interface BrandContextType {
  config: BrandConfig;
  isDashboardOpen: boolean;
  setIsDashboardOpen: (isOpen: boolean) => void;
  isAdminAuthenticated: boolean;
  adminUsername: string;
  login: (usernameOrPassword: string, password?: string) => boolean;
  logout: () => void;
  updateAdminCredentials: (newUsername: string, newPassword: string) => boolean;
  updateProduct: (id: string, updated: Partial<Product>) => void;
  addProduct: (newProduct: Omit<Product, 'id'> & { id?: string }) => void;
  deleteProduct: (id: string) => void;
  updateCollection: (id: string, updated: Partial<CollectionItem>) => void;
  updateContact: (contact: Partial<BrandContact>) => void;
  updateIntro: (intro: Partial<BrandIntro>) => void;
  updateBrandBasics: (basics: { name?: string; tagline?: string; origin?: string; heroCover?: string; logo?: string }) => void;
  updateLookbook: (items: LookbookImage[]) => void;
  addLookbookItem: (item: Omit<LookbookImage, 'id'>) => void;
  deleteLookbookItem: (id: string) => void;
  resetToDefaults: () => void;
  exportConfigJson: () => void;
  importConfigJson: (jsonString: string) => boolean;
}

const STORAGE_KEY = 'noom_wear_custom_config_v1';
const ADMIN_STORAGE_KEY = 'noom_wear_admin_credentials_v1';
const SESSION_AUTH_KEY = 'noom_wear_admin_auth_session';

const DEFAULT_ADMIN = {
  username: 'admin',
  password: 'noomwear2026',
};

const BrandContext = createContext<BrandContextType | undefined>(undefined);

export const BrandProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<BrandConfig>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Shallow merge to ensure any newly added structure is preserved
        return {
          ...BRAND_CONFIG,
          ...parsed,
          contact: { ...BRAND_CONFIG.contact, ...(parsed.contact || {}) },
          intro: { ...BRAND_CONFIG.intro, ...(parsed.intro || {}) },
          assets: { ...BRAND_CONFIG.assets, ...(parsed.assets || {}) },
          products: Array.isArray(parsed.products) && parsed.products.length > 0 ? parsed.products : BRAND_CONFIG.products,
          collections: Array.isArray(parsed.collections) && parsed.collections.length > 0 ? parsed.collections : BRAND_CONFIG.collections,
          lookbook: Array.isArray(parsed.lookbook) && parsed.lookbook.length > 0 ? parsed.lookbook : BRAND_CONFIG.lookbook,
        };
      }
    } catch (e) {
      console.warn('Could not load custom brand configuration from localStorage', e);
    }
    return BRAND_CONFIG;
  });

  const [isDashboardOpen, setIsDashboardOpen] = useState(false);

  // Admin Credentials & Authentication State
  const [credentials, setCredentials] = useState<{ username: string; password: string }>(() => {
    try {
      const storedCreds = localStorage.getItem(ADMIN_STORAGE_KEY);
      if (storedCreds) {
        const parsed = JSON.parse(storedCreds);
        if (parsed.username && parsed.password) {
          return parsed;
        }
      }
    } catch (_) {}
    return DEFAULT_ADMIN;
  });

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(SESSION_AUTH_KEY) === 'true';
    } catch (_) {
      return false;
    }
  });

  const login = (usr: string, pwd?: string): boolean => {
    // If only 1 argument provided, treat as password directly
    const targetPassword = pwd !== undefined ? pwd.trim() : usr.trim();
    const targetUsername = pwd !== undefined ? usr.trim().toLowerCase() : '';

    const passwordValid = targetPassword === credentials.password;
    const usernameValid = !targetUsername || targetUsername === credentials.username.toLowerCase();

    if (passwordValid && usernameValid) {
      setIsAdminAuthenticated(true);
      try {
        sessionStorage.setItem(SESSION_AUTH_KEY, 'true');
      } catch (_) {}
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdminAuthenticated(false);
    try {
      sessionStorage.removeItem(SESSION_AUTH_KEY);
    } catch (_) {}
  };

  const updateAdminCredentials = (newUsername: string, newPassword: string): boolean => {
    if (!newUsername.trim() || !newPassword.trim() || newPassword.length < 4) {
      return false;
    }
    const updated = {
      username: newUsername.trim(),
      password: newPassword.trim(),
    };
    setCredentials(updated);
    try {
      localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(updated));
    } catch (_) {}
    return true;
  };

  // Auto-sync with localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    } catch (e) {
      console.warn('Could not save custom brand configuration to localStorage', e);
    }
  }, [config]);

  const updateProduct = (id: string, updated: Partial<Product>) => {
    setConfig((prev) => ({
      ...prev,
      products: prev.products.map((p) => {
        if (p.id === id) {
          const newPrice = updated.priceEGP !== undefined ? updated.priceEGP : p.priceEGP;
          const formattedPrice =
            updated.formattedPrice || `${newPrice.toLocaleString('en-US')} EGP`;
          return { ...p, ...updated, priceEGP: newPrice, formattedPrice };
        }
        return p;
      }),
    }));
  };

  const addProduct = (newProduct: Omit<Product, 'id'> & { id?: string }) => {
    const id = newProduct.id || `product-${Date.now()}`;
    const priceEGP = Number(newProduct.priceEGP) || 2000;
    const formattedPrice =
      newProduct.formattedPrice || `${priceEGP.toLocaleString('en-US')} EGP`;

    const product: Product = {
      ...newProduct,
      id,
      priceEGP,
      formattedPrice,
      sizes: newProduct.sizes || ['S', 'M', 'L'],
      colors: newProduct.colors || [{ name: 'Chocolate', hex: '#3B1E14' }],
      image: newProduct.image || BRAND_CONFIG.assets.heroCover,
    };

    setConfig((prev) => ({
      ...prev,
      products: [product, ...prev.products],
    }));
  };

  const deleteProduct = (id: string) => {
    setConfig((prev) => ({
      ...prev,
      products: prev.products.filter((p) => p.id !== id),
    }));
  };

  const updateCollection = (id: string, updated: Partial<CollectionItem>) => {
    setConfig((prev) => ({
      ...prev,
      collections: prev.collections.map((col) =>
        col.id === id ? { ...col, ...updated } : col
      ),
    }));
  };

  const updateContact = (contact: Partial<BrandContact>) => {
    setConfig((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        ...contact,
      },
    }));
  };

  const updateIntro = (intro: Partial<BrandIntro>) => {
    setConfig((prev) => ({
      ...prev,
      intro: {
        ...prev.intro,
        ...intro,
      },
    }));
  };

  const updateBrandBasics = (basics: {
    name?: string;
    tagline?: string;
    origin?: string;
    heroCover?: string;
    logo?: string;
  }) => {
    setConfig((prev) => ({
      ...prev,
      name: basics.name ?? prev.name,
      tagline: basics.tagline ?? prev.tagline,
      origin: basics.origin ?? prev.origin,
      assets: {
        ...prev.assets,
        heroCover: basics.heroCover ?? prev.assets.heroCover,
        logo: basics.logo ?? prev.assets.logo,
      },
    }));
  };

  const updateLookbook = (items: LookbookImage[]) => {
    setConfig((prev) => ({
      ...prev,
      lookbook: items,
    }));
  };

  const addLookbookItem = (item: Omit<LookbookImage, 'id'>) => {
    const id = `look-${Date.now()}`;
    setConfig((prev) => ({
      ...prev,
      lookbook: [...prev.lookbook, { ...item, id }],
    }));
  };

  const deleteLookbookItem = (id: string) => {
    setConfig((prev) => ({
      ...prev,
      lookbook: prev.lookbook.filter((item) => item.id !== id),
    }));
  };

  const resetToDefaults = () => {
    localStorage.removeItem(STORAGE_KEY);
    setConfig(BRAND_CONFIG);
  };

  const exportConfigJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(config, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `noom-wear-settings-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const importConfigJson = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed && typeof parsed === 'object') {
        setConfig({
          ...BRAND_CONFIG,
          ...parsed,
        });
        return true;
      }
    } catch (e) {
      console.error('Invalid configuration file', e);
    }
    return false;
  };

  return (
    <BrandContext.Provider
      value={{
        config,
        isDashboardOpen,
        setIsDashboardOpen,
        isAdminAuthenticated,
        adminUsername: credentials.username,
        login,
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
      }}
    >
      {children}
    </BrandContext.Provider>
  );
};

export const useBrand = () => {
  const context = useContext(BrandContext);
  if (!context) {
    throw new Error('useBrand must be used within a BrandProvider');
  }
  return context;
};
