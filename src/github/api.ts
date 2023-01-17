import { githubApiSearchQueryType, issueType, repositoryType } from "../type/githubApiFilteredDataType";
import { rawGithubRepositoriesDataType, rawGithubIssueDataType } from "../type/githubApiRawDataType";
import octokit from "./octokit";

const baseGetNumber = 30;
const basePageNumber = 1;

const endPoint = {
  getSearchIssues: 'GET /search/issues{?q,sort,order,per_page,page}',
  getSearchRepositories: 'GET /search/repositories{?q,sort,order,per_page,page}',
};

const getRepositoriesIssues: githubApiSearchQueryType<issueType> = async ({
  queryString,
  sort,
  order,
  per_page = baseGetNumber,
  page = basePageNumber,
  storedRepositoriesInfo,
}) => {
  if(!queryString) return {
    isLastPage: true,
    data: [],
  };

  const rawIssueData: rawGithubIssueDataType = await octokit.request(endPoint.getSearchIssues, {
    q: queryString,
    ...(sort && {sort}),
    ...(order && {order}),
    per_page: per_page+"",
    page: page+"",
  });

  const { data: { total_count, items }} = rawIssueData;

  const isLastPage = getIsLastPage(total_count,per_page,page);

  const extractedData = items.map((item) => {
    const { id, html_url, title, user:{ login, avatar_url }, state, created_at, comments, score, reactions:{ total_count } } = item;

    const thisRepositoryName = html_url.split("https://github.com/")[1].split("/")[1];

    const repositoryAvatarUrl = storedRepositoriesInfo?.find(repository=>repository.repositoryName === thisRepositoryName)?.avatar_url ?? "";

    return { id: id, html_url, title, repositoryName: thisRepositoryName, userName: login, avatar_url: repositoryAvatarUrl, state, created_at, comments: comments, score: score, reactions:total_count };
  });

  return {
    isLastPage,
    data: extractedData,
  };
};

const searchRepositoriesByQueryString: githubApiSearchQueryType<repositoryType> = async({
  queryString,
  sort,
  order,
  per_page = baseGetNumber,
  page = basePageNumber,
}) => {
  const rawRepositoryData: rawGithubRepositoriesDataType = await octokit.request(endPoint.getSearchRepositories, {
    q: queryString,
    ...(sort && {sort}),
    ...(order && {order}),
    per_page: per_page+"",
    page: page+"",
  });

  const { data: { total_count, items }} = rawRepositoryData;

  const isLastPage = getIsLastPage(total_count,per_page,page);

  const extractedData = items.map((item) => {
    const { id, name, owner: { login, avatar_url }, html_url, description, open_issues, } = item;
    return { id: id, repositoryName:name, userName:login, avatar_url, html_url, description, open_issues: open_issues, };
  });

  return {
    isLastPage,
    data: extractedData,
  };
};

const getIsLastPage = (total_count:number,per_page:number,page:number) => total_count <= per_page*page;

export {
  getRepositoriesIssues,
  searchRepositoriesByQueryString,
};
