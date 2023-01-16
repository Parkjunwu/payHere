import React, { useEffect, useMemo, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MainNav from './navigators/MainNav';
import { DefaultTheme, ThemeProvider } from 'styled-components/native';
import useBackgroundAndTextAndPlaceHolderColor from './hooks/useBackgroundAndTextAndPlaceHolderColor';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MY_REPOSITORIES } from './constants';
import { repositoryType } from './type/githubApiFilteredDataType';
import RepositoriesContext from './contexts/RepositoriesContext';

const App = () => {

  const {
    backgroundColor,
    textColor,
  } = useBackgroundAndTextAndPlaceHolderColor();

  const theme: DefaultTheme = {
    backgroundColor,
    textColor,
  };

  const [isReady,setIsReady] = useState(false);
  
  const [repositories,setRepositories] = useState<repositoryType[]>([]);
  
  useEffect(()=>{
    const getRepositories = async() => {
      const storedRepositories = await AsyncStorage.getItem(MY_REPOSITORIES);
      storedRepositories && setRepositories(JSON.parse(storedRepositories));
      setIsReady(true);
    };

    getRepositories();
  },[]);

  const value = useMemo(() => ({ repositories, setRepositories }), [repositories]);

  if(!isReady) return null;

  return (
    <RepositoriesContext.Provider value={value}>
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
