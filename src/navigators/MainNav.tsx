import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GoToRepositoriesBtn from '../components/mainNav/GoToRepositoriesBtn';
import useBackgroundAndTextAndPlaceHolderColor from '../hooks/useBackgroundAndTextAndPlaceHolderColor';
import Issues from '../screens/mainNav/Issues';
import Repositories from '../screens/mainNav/Repositories';
import SearchRepositories from '../screens/mainNav/SearchRepositories';
import { MainNavScreenProps } from '../type/navigationType';

const Stack = createNativeStackNavigator<MainNavScreenProps>();

const MainNav = () => {

  const {textColor,backgroundColor} = useBackgroundAndTextAndPlaceHolderColor();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShadowVisible: false,
        headerTintColor: textColor,
        headerStyle: {
          backgroundColor,
        },
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen
        name="Issues"
        component={Issues}
        options={{
          headerRight:({tintColor})=><GoToRepositoriesBtn tintColor={tintColor+""}/>
        }}
      />
      <Stack.Screen
        name="Repositories"
        component={Repositories}
        options={{
          title: "나의 저장소",
        }}
      />
      <Stack.Screen
        name="SearchRepositories"
        component={SearchRepositories}
        options={{
          title: "저장소 찾기",
        }}
      />
    </Stack.Navigator>
  );
};

export default MainNav;