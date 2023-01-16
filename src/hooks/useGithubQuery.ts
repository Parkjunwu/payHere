import { useCallback, useRef, useState } from "react";
import { githubApiSearchQueryType, storedRepositoriesInfoType } from "../type/githubApiFilteredDataType";

type useGithubQueryProps = <T> (
  query: githubApiSearchQueryType<T>,
  queryString: string,
  storedRepositoriesInfo?: storedRepositoriesInfoType,
) => {
  githubData: Array<T>;
  loading: boolean;
  firstFetch: () => Promise<void>;
  fetchMore: () => Promise<void>;
};

const useGithubQuery: useGithubQueryProps = (query,queryString,storedRepositoriesInfo) => {
  const [firstLoading,setFirstLoading] = useState(false); // 얘는 렌더링 바뀌어야함
  const paginationNumber = useRef(1);
  const paginationLoading = useRef(false);
  const fetchAllData = useRef(false);
  const [githubData,setGithubData] = useState<any[]>([]);

  const queryWithPagination = () => query({
    q: queryString,
    page: paginationNumber.current + "",
    ...(storedRepositoriesInfo && {storedRepositoriesInfo}),
  });

  const firstFetch = useCallback(
    async() => {
      setFirstLoading(true);
      paginationNumber.current = 1;
      
      const {
        isLastPage,
        data,
      } = await queryWithPagination();
      
      setGithubData(data); // 얘는 repositories 바뀌면 새로 넣어야 되서 이걸로
      fetchAllData.current = isLastPage;

      setFirstLoading(false);
    },
    [queryString]
  );

  const fetchMore = useCallback(
    async() => {
      console.log("fetchMore!")
      if(paginationLoading.current || fetchAllData.current) return;
      paginationLoading.current = true;
      paginationNumber.current += 1;
      
      const {
        isLastPage,
        data,
      } = await queryWithPagination();
      
      setGithubData(prev => [...prev,...data]);
      fetchAllData.current = isLastPage;
      
      paginationLoading.current = false;
    },
    [queryString]
  );

  return {
    githubData,
    loading: firstLoading,
    firstFetch,
    fetchMore,
  };
};

export default useGithubQuery;