
type storedRepositoriesInfoType = {
  repositoryName: string;
  avatar_url: string;
}[];

type githubApiSearchQueryType<T> = (props:{
  q: string;
  sort?: string;
  order?: string;
  per_page?: string;
  page?: string;
  storedRepositoriesInfo?: storedRepositoriesInfoType;
}) => Promise<{
  isLastPage: boolean;
  data: Array<T>;
}>;

type issueType = {
  id: string;
  repositoryName: string;
  userName: string;
  avatar_url: string;
  html_url: string;
  title: string;
  state: string;
  created_at: string;
  comments: string;
  score: string;
  reactions: string;
};

type repositoryType = {
  id: string;
  repositoryName: string;
  userName: string;
  avatar_url: string;
  html_url: string;
  description: string;
  open_issues: string;
};

export type {
  storedRepositoriesInfoType,
  githubApiSearchQueryType,
  issueType,
  repositoryType,
};