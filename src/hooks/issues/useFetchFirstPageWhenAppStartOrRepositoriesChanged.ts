import { useEffect } from "react";
import { repositoryType } from "../../type/githubApiFilteredDataType";

type useFetchFirstPageWhenAppStartOrRepositoriesChangedProps = {
  firstFetch: () => Promise<void>;
  repositories: repositoryType[];
}

const useFetchFirstPageWhenAppStartOrRepositoriesChanged = ({
  firstFetch,
  repositories,
}: useFetchFirstPageWhenAppStartOrRepositoriesChangedProps) => {

  useEffect(()=>{
    firstFetch();
  },[repositories]);

};

export default useFetchFirstPageWhenAppStartOrRepositoriesChanged;