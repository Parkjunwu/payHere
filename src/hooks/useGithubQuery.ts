import { useCallback, useRef, useState } from "react";
import { githubApiSearchQueryParamsTypeWithoutPage, githubApiSearchQueryType } from "../type/githubApiFilteredDataType";

type useGithubQueryParamsProps<T> = {
  query: githubApiSearchQueryType<T>,
} & githubApiSearchQueryParamsTypeWithoutPage;

type useGithubQueryProps = <T> (props:useGithubQueryParamsProps<T>) => {
  githubData: Array<T>;
  loading: boolean;
  firstFetch: () => Promise<void>;
  fetchMore: () => Promise<void>;
};

const useGithubQuery: useGithubQueryProps = ({
  query,
  queryString,
  sort,
  order,
  per_page,
  storedRepositoriesInfo,
}) => {
  
  const [firstLoading,setFirstLoading] = useState(false); // 얘는 렌더링 바뀌어야함
  const paginationNumber = useRef(1);
  const paginationLoading = useRef(false);
  const fetchAllData = useRef(false);
  const [githubData,setGithubData] = useState<any[]>([]);

  const queryWithPagination = () => query({
    queryString,
    page: paginationNumber.current,
    ...(sort && {sort}),
    ...(order && {order}),
    ...(per_page && {per_page}),
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