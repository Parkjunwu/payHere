import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useContext } from "react";
import styled from "styled-components/native";
import RepositoriesContext from "../../contexts/RepositoriesContext";
import noticeMaximumLimit from "../../logics/noticeMaximumLimit";
import colors from "../../srcAssets/colors";
import { MainNavScreenProps } from "../../type/navigationType";

const GoToSearchButton = styled.TouchableOpacity<{size:"big"|"small"}>`
  height: ${({size})=>size === "small" ? 100 : 150 }px;
  width: ${({size})=>size === "small" ? 100 : 150 }px;
  border-radius: 200px;
  background-color: ${colors.yellow};
  align-items: center;
  justify-content: center;
`;
const GoToSearchBtnText = styled.Text<{size:"big"|"small"}>`
  font-size: ${({size})=>size === "small" ? 50 : 70 }px;
  text-align: center;
  color: ${colors.darkYellow};;
`;

type GoToSearchBtnProps = {
  size: "big"|"small";
};

const GoToSearchBtn = ({
  size,
}: GoToSearchBtnProps) => {

  const {repositories} = useContext(RepositoriesContext);

  const navigation = useNavigation<NativeStackNavigationProp<MainNavScreenProps>>();

  const onPressGoToSearch = () => {
    if(repositories.length >= 4) return noticeMaximumLimit();
    navigation.navigate("SearchRepositories");
  };

  return (
    <GoToSearchButton size={size} onPress={onPressGoToSearch}>
      <GoToSearchBtnText size={size}>추가</GoToSearchBtnText>
    </GoToSearchButton>
  );
};

export default GoToSearchBtn;