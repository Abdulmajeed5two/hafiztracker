import React from 'react';
import { LanguageProvider } from './LanguageContext';
import { CampusProvider } from './CampusContext';
import { StudentProvider } from './StudentContext';
import { TeacherProvider } from './TeacherContext';
import { ParentsProvider } from './ParentsContext';
import { MasjidProvider } from './MasjidContext';
import { SuratProvider } from './SuratContext';
import { AyatBysuratnumberProvider } from './AyatbySuratNumber';
import { HomeProvider } from './HomeWorkContext';


const ContextProvider = ({ children }) => {
  return (
    <LanguageProvider>
      <CampusProvider>
        <StudentProvider>
          <TeacherProvider>
            <ParentsProvider>
              <MasjidProvider>
                <SuratProvider>
                  <AyatBysuratnumberProvider >
                    <HomeProvider>
                  {children}
                    </HomeProvider>
                  </AyatBysuratnumberProvider>
                </SuratProvider>
              </MasjidProvider>
            </ParentsProvider>
          </TeacherProvider>
        </StudentProvider>
      </CampusProvider>
    </LanguageProvider>

  );
};

export default ContextProvider;
