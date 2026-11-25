import React, { createContext, useContext, useState, useEffect } from "react";

export type PlateStyle = "white" | "dark" | "transparent";

export interface LogoConfig {
  url: string;
  isCustom: boolean;
  plateStyle: PlateStyle;
  zoom: number; // percentage, e.g. 100 for normal, 120 for zoomed
}

const DEFAULT_LOGO_URL = "/assets/aistudio/MOTO_175fdec7.png";
const STORAGE_KEY = "moto_enduro_logo_config_v3";

interface LogoContextType {
  logoConfig: LogoConfig;
  uploadLogo: (dataUrl: string, plateStyle?: PlateStyle) => void;
  setPlateStyle: (plateStyle: PlateStyle) => void;
  setZoom: (zoom: number) => void;
  resetLogo: () => void;
  isUploadModalOpen: boolean;
  openUploadModal: () => void;
  closeUploadModal: () => void;
}

const defaultState: LogoConfig = {
  url: DEFAULT_LOGO_URL,
  isCustom: false,
  plateStyle: "transparent",
  zoom: 100
};

const LogoContext = createContext<LogoContextType | undefined>(undefined);

export const LogoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [logoConfig, setLogoConfig] = useState<LogoConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.url) {
          return {
            url: parsed.url,
            isCustom: true,
            plateStyle: parsed.plateStyle || "transparent",
            zoom: parsed.zoom || 100
          };
        }
      }
    } catch (e) {
      console.warn("Could not load stored logo config", e);
    }
    return defaultState;
  });

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Persist custom logo changes to localStorage
  const saveConfig = (newConfig: LogoConfig) => {
    setLogoConfig(newConfig);
    try {
      if (newConfig.isCustom) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newConfig));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (e) {
      console.warn("Could not persist logo to localStorage", e);
    }
  };

  const uploadLogo = (dataUrl: string, plateStyle: PlateStyle = "transparent") => {
    saveConfig({
      url: dataUrl,
      isCustom: true,
      plateStyle,
      zoom: 100
    });
  };

  const setPlateStyle = (plateStyle: PlateStyle) => {
    saveConfig({
      ...logoConfig,
      plateStyle
    });
  };

  const setZoom = (zoom: number) => {
    saveConfig({
      ...logoConfig,
      zoom
    });
  };

  const resetLogo = () => {
    saveConfig(defaultState);
  };

  const openUploadModal = () => setIsUploadModalOpen(true);
  const closeUploadModal = () => setIsUploadModalOpen(false);

  return (
    <LogoContext.Provider
      value={{
        logoConfig,
        uploadLogo,
        setPlateStyle,
        setZoom,
        resetLogo,
        isUploadModalOpen,
        openUploadModal,
        closeUploadModal
      }}
    >
      {children}
    </LogoContext.Provider>
  );
};

export const useBrandLogo = () => {
  const context = useContext(LogoContext);
  if (!context) {
    throw new Error("useBrandLogo must be used within a LogoProvider");
  }
  return context;
};
