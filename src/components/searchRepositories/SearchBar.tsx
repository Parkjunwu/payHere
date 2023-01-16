import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { DarkModeAppliedTextInput } from "../DarkModeAppliedStyledComponents";
import Ionicons from "react-native-vector-icons/Ionicons";
import useBackgroundAndTextAndPlaceHolderColor from "../../hooks/useBackgroundAndTextAndPlaceHolderColor";
import { isIOS } from "../../logics/getDevicePlatform";

const SearchBarContainer = styled.View`
  background-color: grey;
  padding: ${isIOS ? "10px" : "1px 10px"};
  border-radius: 25px;
  flex-direction: row;
  align-items: center;
  width: 95%;
  margin: 0px auto 3px auto;
`;
const SearchInput = styled(DarkModeAppliedTextInput)`
  font-size: 18px;
  width: 80%;
  margin-left: 4px;
`;

type SearchBarProps = {
  keyword: string;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
  onSubmitSearchByKeyword: () => Promise<void>;
};

const SearchBar = ({
  keyword,
  setKeyword,
  onSubmitSearchByKeyword,
}: SearchBarProps) => {

  const { textColor, placeholderTextColor } = useBackgroundAndTextAndPlaceHolderColor();

  return (
    <SearchBarContainer>
      <TouchableOpacity onPress={onSubmitSearchByKeyword}>
        <Ionicons name="search" size={30} color={textColor} />
      </TouchableOpacity>
      <SearchInput
        placeholder={"키워드 입력"}
        placeholderTextColor={placeholderTextColor}
        autoCapitalize="none"
        returnKeyType="search"
        value={keyword}
        onChangeText={(text:string) => setKeyword(text)}
        autoCorrect={false}
        onSubmitEditing={onSubmitSearchByKeyword}
      />
    </SearchBarContainer>
  );
};

export default SearchBar;