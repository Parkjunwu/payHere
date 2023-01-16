import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect } from "react"
import styled from "styled-components/native";
import { repositoryType } from "../../type/githubApiFilteredDataType";
import { MainNavScreenProps } from "../../type/navigationType";

const Button = styled.TouchableOpacity`

`;
const ButtonText = styled.Text<{tintColor: string}>`
  color: ${({tintColor})=>tintColor};
  font-weight: bold;
`;

type useMakeHeaderRightChangedByRepositoriesAndSettingModeProps = {
  repositories: repositoryType[];
  settingMode: boolean;
  setSettingMode: React.Dispatch<React.SetStateAction<boolean>>;
};

const useMakeHeaderRightChangedByRepositoriesAndSettingMode = ({
  repositories,
  settingMode,
  setSettingMode,
}: useMakeHeaderRightChangedByRepositoriesAndSettingModeProps) => {

  const navigation = useNavigation<NativeStackNavigationProp<MainNavScreenProps, "Repositories">>();

  useEffect(()=>{
    navigation.setOptions({
      headerRight:({tintColor})=>repositories.length !== 0 ?
        <Button onPress={()=>setSettingMode(prev=>!prev)}>
          <ButtonText tintColor={tintColor+""}>
            {settingMode ? "완료" : "관리"}
          </ButtonText>
        </Button>
      :
        null
    });
  },[repositories,settingMode]);
};

export default useMakeHeaderRightChangedByRepositoriesAndSettingMode;