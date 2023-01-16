import { repositoryType, storedRepositoriesInfoType } from "../../type/githubApiFilteredDataType";

const getQueryStringAndRepositoriesInfoForIssue = (repositories: repositoryType[]) => {
  let queryString = "";
  repositories.forEach(repository => {
    const { repositoryName, userName } = repository;
    queryString += ` repo:${userName}/${repositoryName}`;
  });

  const storedRepositoriesInfo: storedRepositoriesInfoType = repositories.map(repository=>({
    repositoryName:repository.repositoryName,
    avatar_url:repository.avatar_url,
  }));

  return {
    queryString,
    storedRepositoriesInfo,
  };
};

export default getQueryStringAndRepositoriesInfoForIssue;