import React, { useMemo, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MainNav from './navigators/MainNav';
import { DefaultTheme, ThemeProvider } from 'styled-components/native';
import useBackgroundAndTextAndPlaceHolderColor from './hooks/useBackgroundAndTextAndPlaceHolderColor';
import { repositoryType } from './type/githubApiFilteredDataType';
import RepositoriesContext from './contexts/RepositoriesContext';
import useDoInAdvanceBeforeAppStartNeedMaybeSomeParamsReturnIsReady from './hooks/app/useDoInAdvanceBeforeAppStartNeedMaybeSomeParamsReturnIsReady';

const App = () => {

  const {
    backgroundColor,
    textColor,
  } = useBackgroundAndTextAndPlaceHolderColor();

  const theme: DefaultTheme = {
    backgroundColor,
    textColor,
  };

  const [repositories,setRepositories] = useState<repositoryType[]>([]);
  
  const isAppReady = useDoInAdvanceBeforeAppStartNeedMaybeSomeParamsReturnIsReady({
    setRepositories,
  });

  const repositoriesContextValue = useMemo(() => ({ repositories, setRepositories }), [repositories]);

  if(!isAppReady) return null;

  return (
    <RepositoriesContext.Provider value={repositoriesContextValue}>
      <SafeAreaProvider>
        <NavigationContainer>
          <ThemeProvider theme={theme}>
            <MainNav/>
          </ThemeProvider>
        </NavigationContainer>
      </SafeAreaProvider>
    </RepositoriesContext.Provider>
  );
};

export default App;
