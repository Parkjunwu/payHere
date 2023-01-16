import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext } from "react";
import { MY_REPOSITORIES } from "../constants";
import RepositoriesContext from "../contexts/RepositoriesContext";
import { repositoryType } from "../type/githubApiFilteredDataType";

const useEditRepository = () => {

  const { setRepositories } = useContext(RepositoriesContext);
  
  const addRepository = (newRepository:repositoryType) => setRepositories((prevRepositories)=>{
    const newRepositories = [ newRepository, ...prevRepositories ];
    AsyncStorage.setItem(MY_REPOSITORIES, JSON.stringify(newRepositories));
    return newRepositories;
  });

  const deleteRepository = (id:string) => setRepositories((prevRepositories)=>{
    const newRepositories = prevRepositories.filter(repository=>repository.id !== id);
    AsyncStorage.setItem(MY_REPOSITORIES, JSON.stringify(newRepositories));
    return newRepositories;
  });

  return {
    addRepository,
    deleteRepository,
  };
};

export default useEditRepository;