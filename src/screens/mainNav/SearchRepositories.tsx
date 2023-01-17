import { NativeStackScreenProps } from "@react-navigation/native-stack";
import BaseSafeAreaView from "../../components/BaseSafeAreaView";
import { MainNavScreenProps } from "../../type/navigationType";
import DismissKeyboard from "../../components/DismissKeyboard";
import { FlatList } from "react-native";
import { useState } from "react";
import { searchRepositoriesByQueryString } from "../../github/api";
import RepositorySummary from "../../components/commonForRepositories/RepositorySummary";
import useGithubQuery from "../../hooks/useGithubQuery";
import SearchBar from "../../components/searchRepositories/SearchBar";

type SearchRepositoriesProps = NativeStackScreenProps<MainNavScreenProps,"SearchRepositories">;

const SearchRepositories = (props:SearchRepositoriesProps) => {

  const [keyword,setKeyword] = useState("");

  const {
    githubData,
    firstFetch,
    fetchMore,
  } = useGithubQuery({
    query: searchRepositoriesByQueryString,
    queryString: keyword,
  });

  const onSubmitSearchByKeyword = () => firstFetch();

  const onEndReached = () => fetchMore();

  return (
    <BaseSafeAreaView>
      <DismissKeyboard>
        <>
          <SearchBar
            keyword={keyword}
            setKeyword={setKeyword}
            onSubmitSearchByKeyword={onSubmitSearchByKeyword}
          />
          <FlatList
            data={githubData}
            keyExtractor={(item)=>item.id+""}
            renderItem={({item}) => <RepositorySummary {...item} fromWhere={"SearchRepositories"} settingMode={true}/>}
            onEndReached={onEndReached}
            onEndReachedThreshold={1}
          />
        </>
      </DismissKeyboard>
    </BaseSafeAreaView>
  );
};

export default SearchRepositories;