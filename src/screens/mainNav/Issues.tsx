import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useContext, useMemo } from "react";
import { FlatList } from "react-native";
import BaseSafeAreaView from "../../components/BaseSafeAreaView";
import NoRepositoryView from "../../components/commonForRepositories/NoRepositoryView";
import IssueSummary from "../../components/issues/IssueSummary";
import { getRepositoriesIssues } from "../../github/api";
import useGithubQuery from "../../hooks/useGithubQuery";
import { MainNavScreenProps } from "../../type/navigationType";
import RepositoriesContext from "../../contexts/RepositoriesContext";
import useFetchFirstPageWhenAppStartOrRepositoriesChanged from "../../hooks/issues/useFetchFirstPageWhenAppStartOrRepositoriesChanged";
import getQueryStringAndRepositoriesInfoForIssue from "../../logics/issues/getQueryStringAndRepositoriesInfoForIssue";
import NowStateExplainView from "../../components/issues/NowStateExplainView";

type IssuesProps = NativeStackScreenProps<MainNavScreenProps,"Issues">

const Issues = (props:IssuesProps) => {

  const {repositories} = useContext(RepositoriesContext);

  const {
    queryString,
    storedRepositoriesInfo,
  } = useMemo(()=>getQueryStringAndRepositoriesInfoForIssue(repositories),[repositories]);

  const {
    githubData,
    loading,
    firstFetch,
    fetchMore,
  } = useGithubQuery({
    query: getRepositoriesIssues,
    queryString,
    storedRepositoriesInfo,
  });

  useFetchFirstPageWhenAppStartOrRepositoriesChanged({
    firstFetch,
    repositories,
  });

  const onEndReached = () => fetchMore();

  if(repositories.length === 0) return <NoRepositoryView/>;

  if(loading) return <NowStateExplainView nowState="로딩중..."/>;

  return (
    githubData.length === 0 ? 
      <NowStateExplainView nowState="저장소에 Issue 가 없습니다."/>
    :
      <BaseSafeAreaView>
        <FlatList
          data={githubData}
          keyExtractor={(item)=>item.id+""}
          renderItem={({item}) => <IssueSummary {...item} />}
          onEndReached={onEndReached}
          onEndReachedThreshold={1}
        />
      </BaseSafeAreaView>
  );
};

export default Issues;