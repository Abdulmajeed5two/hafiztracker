import React from 'react';
import { LanguageProvider } from './LanguageContext';
import { CampusProvider } from './CampusContext';
import { StudentProvider } from './StudentContext';
import { TeacherProvider } from './TeacherContext';
import { ParentsProvider } from './ParentsContext';
import { MasjidProvider } from './MasjidContext';


const ContextProvider = ({ children }) => {
  return (
    <LanguageProvider>
          <CampusProvider>
            <StudentProvider>
            <TeacherProvider>
              <ParentsProvider>
                <MasjidProvider>
            {children}
                </MasjidProvider>
              </ParentsProvider>
            </TeacherProvider>
            </StudentProvider>
          </CampusProvider>
    </LanguageProvider>

  );
};

export default ContextProvider;
