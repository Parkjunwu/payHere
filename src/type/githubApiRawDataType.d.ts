type rawGithubApiSearchDataType<T> = {
  data: {
    total_count: number;
    items: Array<T>;
  };
};

type repository = {
  id: number;
  name: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  html_url: string;
  description: string;
  open_issues: number;
};

type issue = {
  id: number;
  html_url: string;
  title: string;
  user: {
    login: string;
    avatar_url: string;
  };
  state: string;
  created_at: string;
  comments: number;
  score: number;
  reactions: {
    total_count: number;
  };
};

type rawGithubRepositoriesDataType = rawGithubApiSearchDataType<repository>;

type rawGithubIssueDataType = rawGithubApiSearchDataType<issue>;

export {
  rawGithubRepositoriesDataType,
  rawGithubIssueDataType,
};