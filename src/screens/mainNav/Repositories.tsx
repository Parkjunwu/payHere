import { NativeStackScreenProps } from "@react-navigation/native-stack/lib/typescript/src/types";
import { useContext, useState } from "react";
import { FlatList } from "react-native";
import styled from "styled-components/native";
import BaseSafeAreaView from "../../components/BaseSafeAreaView";
import RepositorySummary from "../../components/commonForRepositories/RepositorySummary";
import { MainNavScreenProps } from "../../type/navigationType";
import NoRepositoryView from "../../components/commonForRepositories/NoRepositoryView";
import GoToSearchBtn from "../../components/commonForRepositories/GoToSearchBtn";
import RepositoriesContext from "../../contexts/RepositoriesContext";
import useMakeHeaderRightChangedByRepositoriesAndSettingMode from "../../hooks/repositories/useMakeHeaderRightChangedByRepositoriesAndSettingMode";
import useIfRepositoriesLengthZeroThenSettingModeFalse from "../../hooks/repositories/useIfRepositoriesLengthZeroThenSettingModeFalse";

const Separator = styled.View`
  height: 2px;
  background-color: rgba(200,200,200,0.5);
`;
const BottomContainer = styled.View`
  align-items: center;
`;

type RepositoriesProps = NativeStackScreenProps<MainNavScreenProps,"Repositories">;

const Repositories = (props:RepositoriesProps) => {

  const { repositories } = useContext(RepositoriesContext);

  const [settingMode,setSettingMode] = useState(false);

  useMakeHeaderRightChangedByRepositoriesAndSettingMode({
    repositories,
    settingMode,
    setSettingMode,
  });

  useIfRepositoriesLengthZeroThenSettingModeFalse({
    repositories,
    setSettingMode,
  });

  return (
    repositories.length === 0 ?
      <NoRepositoryView/>
    :
      <BaseSafeAreaView>
        <FlatList
          style={{
            flex: 1,
          }}
          data={repositories}
          renderItem={({item})=><RepositorySummary {...item} fromWhere="Repositories" settingMode={settingMode}/>}
          keyExtractor={(item)=>item.id}
          ItemSeparatorComponent={()=><Separator/>}
        />
        {!settingMode && <BottomContainer>
          <GoToSearchBtn size="small" />
        </BottomContainer>}
      </BaseSafeAreaView>
  );
};

export default Repositories;