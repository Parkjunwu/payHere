import styled from "styled-components/native";
import { Alert } from "react-native";
import useEditRepository from "../../hooks/useEditRepositories";
import { useContext } from "react";
import noticeMaximumLimit from "../../logics/noticeMaximumLimit";
import Ionicons from "react-native-vector-icons/Ionicons"
import { repositoryType } from "../../type/githubApiFilteredDataType";
import Summary from "../listRenderComponents/Summary";
import RepositoriesContext from "../../contexts/RepositoriesContext";

const ActionContainer = styled.View`
  justify-content: center;
`;
const ActionButton = styled.TouchableOpacity`
  padding: 10px 20px;
  border-radius: 5px;
  background-color: rgb(255,190,10);
`;
const ActionButtonText = styled.Text`

`;

type RepositorySummaryProps = {
  settingMode: boolean,
  fromWhere: "Repositories" | "SearchRepositories"
} & repositoryType;

const RepositorySummary = ({
  settingMode,
  fromWhere,
  ...repositoryData
}: RepositorySummaryProps) => {

  const fromSearchRepositories = fromWhere === "SearchRepositories";

  const {
    id,
    repositoryName,
    userName,
    avatar_url,
    html_url,
    description,
    open_issues,
  } = repositoryData;

  const {
    addRepository,
    deleteRepository,
  } = useEditRepository();

  const {repositories} = useContext(RepositoriesContext);

  const onPressAction = () => {
    const NoticeMessage = fromSearchRepositories ? "해당 저장소를 추가하시겠습니까?" : "해당 저장소를 삭제하시겠습니까?";
    Alert.alert(NoticeMessage,undefined,[
      {
        text:"확인",
        onPress:()=>{
          if(fromSearchRepositories) {
            if(repositories.length >= 4) return noticeMaximumLimit();
            addRepository({...repositoryData});
          } else {
            deleteRepository(id);
          }
        },
      },
      {
        text:"취소",
        style:"destructive",
      },
    ]);
  };

  const isAlreadyMyRepository = repositories.some(repository=>repository.id === id);

  return (
    <Summary
      imageSource={avatar_url}
      topText={repositoryName}
      middleText={description}
      bottomText={`open issues : ${open_issues}`}
    >
      {settingMode && 
        <ActionContainer>
          {fromSearchRepositories && isAlreadyMyRepository ?
            <Ionicons name="checkmark-sharp" size={24} color="green" />
          :
            <ActionButton onPress={onPressAction}>
              <ActionButtonText>{fromSearchRepositories ? "추가" : "삭제"}</ActionButtonText>
            </ActionButton>
          }
        </ActionContainer>
      }
    </Summary>
  );
};

export default RepositorySummary;