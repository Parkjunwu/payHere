import AsyncStorage from "@react-native-async-storage/async-storage";
import { MY_REPOSITORIES } from "../../constants";
import { repositoryType } from "../../type/githubApiFilteredDataType";

const getStoredRepositoriesThenSetRepositories = async(setRepositories:React.Dispatch<React.SetStateAction<repositoryType[]>>) => {

  const storedRepositories = await AsyncStorage.getItem(MY_REPOSITORIES);
  storedRepositories && setRepositories(JSON.parse(storedRepositories));
  
};

export default getStoredRepositoriesThenSetRepositories;