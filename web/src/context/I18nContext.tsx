// I18nContext.tsx
import React, { createContext, useContext, ReactNode } from 'react';
import i18n from '../i18n'; 

const I18nContext = createContext<typeof i18n | undefined>(undefined);

interface I18nProviderProps {
  children: ReactNode;
}

export const I18nProvider: React.FC<I18nProviderProps> = ({ children }) => {
  return (
    <I18nContext.Provider value={i18n}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = (): typeof i18n => {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};
