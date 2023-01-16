import { githubApiSearchQueryType, issueType, repositoryType } from "../type/githubApiFilteredDataType";
import { rawGithubRepositoriesDataType, rawGithubIssueDataType } from "../type/githubApiRawDataType";
import octokit from "./octokit";

const baseGetNumber = "15";
const basePageNumber = "1";

const getRepositoriesIssues: githubApiSearchQueryType<issueType> = async ({
  q,
  sort,
  order,
  per_page = baseGetNumber,
  page = basePageNumber,
  storedRepositoriesInfo,
}) => {
  if(!q) return {
    isLastPage: true,
    data: [],
  };

  const issueData: rawGithubIssueDataType = await octokit.request('GET /search/issues{?q,sort,order,per_page,page}', {
    q,
    ...(sort && {sort}),
    ...(order && {order}),
    per_page,
    page,
  });

  const { data: { total_count, items }} = issueData;

  const isLastPage = total_count <= Number(per_page)*Number(page);
  const extractedData = items.map((item) => {
    const { id, html_url, title, user:{ login, avatar_url }, state, created_at, comments, score, reactions:{ total_count } } = item;

    const thisRepositoryName = html_url.split("https://github.com/")[1].split("/")[1];

    const repositoryAvatarUrl = storedRepositoriesInfo?.find(repository=>repository.repositoryName === thisRepositoryName)?.avatar_url ?? "";

    return { id: id+"", html_url, title, repositoryName:thisRepositoryName, userName:login, avatar_url: repositoryAvatarUrl, state, created_at, comments: comments+"", score: score+"", reactions:total_count+"" };
  });

  return {
    isLastPage,
    data: extractedData,
  };
};

const searchRepositoriesByQueryString: githubApiSearchQueryType<repositoryType> = async({
  q,
  sort,
  order,
  per_page = baseGetNumber,
  page = basePageNumber,
}) => {
  const repositoryData: rawGithubRepositoriesDataType = await octokit.request('GET /search/repositories{?q,sort,order,per_page,page}', {
    q,
    ...(sort && {sort}),
    ...(order && {order}),
    per_page,
    page,
  });

  const { data: { total_count, items }} = repositoryData;

  const isLastPage = total_count <= Number(per_page)*Number(page);
  const extractedData = items.map((item) => {
    const { id, name, owner: { login, avatar_url }, html_url, description, open_issues, } = item;
    return { id: id+"", repositoryName:name, userName:login, avatar_url, html_url, description, open_issues: open_issues+"", };
  });

  return {
    isLastPage,
    data: extractedData,
  };
};

export {
  getRepositoriesIssues,
  searchRepositoriesByQueryString,
};
