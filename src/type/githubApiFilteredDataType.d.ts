
type storedRepositoriesInfoType = {
  repositoryName: string;
  avatar_url: string;
}[];

type githubApiSearchQueryParamsTypeWithoutPage = {
  queryString: string;
  sort?: string;
  order?: string;
  per_page?: number;
  storedRepositoriesInfo?: storedRepositoriesInfoType;
};

type githubApiSearchQueryParamsType = {
  page?: number;
} & githubApiSearchQueryParamsTypeWithoutPage;

type githubApiSearchQueryType<T> = (props:githubApiSearchQueryParamsType) => Promise<{
  isLastPage: boolean;
  data: Array<T>;
}>;

type issueType = {
  id: number;
  repositoryName: string;
  userName: string;
  avatar_url: string;
  html_url: string;
  title: string;
  state: string;
  created_at: string;
  comments: number;
  score: number;
  reactions: number;
};

type repositoryType = {
  id: number;
  repositoryName: string;
  userName: string;
  avatar_url: string;
  html_url: string;
  description: string;
  open_issues: number;
};

export type {
  storedRepositoriesInfoType,
  githubApiSearchQueryParamsTypeWithoutPage,
  githubApiSearchQueryType,
  issueType,
  repositoryType,
};