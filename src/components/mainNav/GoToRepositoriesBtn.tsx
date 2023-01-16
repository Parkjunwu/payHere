import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import styled from "styled-components/native";
import { MainNavScreenProps } from "../../type/navigationType";

const Button = styled.TouchableOpacity`

`;
const ButtonText = styled.Text<{tintColor: string}>`
  color: ${({tintColor})=>tintColor};
  font-weight: bold;
`;

type GoToRepositoriesBtnType = {
  tintColor: string;
};

type RepositoriesProps = NativeStackScreenProps<MainNavScreenProps,"Issues">

const GoToRepositoriesBtn = ({tintColor}:GoToRepositoriesBtnType) => {

  const navigation = useNavigation<RepositoriesProps["navigation"]>();
  const onPressButton = () => navigation.navigate("Repositories");

  return (
    <Button onPress={onPressButton}>
      <ButtonText tintColor={tintColor}>
        관리
      </ButtonText>
    </Button>
  );
};

export default GoToRepositoriesBtn;