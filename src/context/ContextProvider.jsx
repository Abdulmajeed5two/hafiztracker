import React from 'react';
import { LanguageProvider } from './LanguageContext';


const ContextProvider = ({ children }) => {
  return (
    <LanguageProvider>
            {children}
    </LanguageProvider>

  );
};

export default ContextProvider;
