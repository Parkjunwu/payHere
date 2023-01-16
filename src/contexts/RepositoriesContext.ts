import { createContext } from "react";
import { repositoryType } from "../type/githubApiFilteredDataType";

const RepositoriesContext = createContext<{
  repositories: repositoryType[];
  setRepositories: React.Dispatch<React.SetStateAction<repositoryType[]>>;
}>({
  repositories:[],
  setRepositories:()=>{},
});

export default RepositoriesContext;