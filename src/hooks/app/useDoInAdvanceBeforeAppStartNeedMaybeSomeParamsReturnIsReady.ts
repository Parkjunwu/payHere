import { useEffect, useState } from "react";
import getStoredRepositoriesThenSetRepositories from "../../logics/app/getStoredRepositoriesThenSetRepositories";
import { repositoryType } from "../../type/githubApiFilteredDataType";

type useDoInAdvanceBeforeAppStartNeedMaybeSomeParamsReturnIsReadyProps = {
  setRepositories: React.Dispatch<React.SetStateAction<repositoryType[]>>;
};

const useDoInAdvanceBeforeAppStartNeedMaybeSomeParamsReturnIsReady = ({
  setRepositories,
}: useDoInAdvanceBeforeAppStartNeedMaybeSomeParamsReturnIsReadyProps) => {

  const [isAppReady,setIsAppReady] = useState(false);

  const doInAdvanceThenAppIsReady = async () => {
    const toDoList = [
      await getStoredRepositoriesThenSetRepositories(setRepositories),
    ];

    await Promise.all(toDoList);
    setIsAppReady(true);
  };

  useEffect(()=>{
    doInAdvanceThenAppIsReady();
  },[]);

  return isAppReady;
};

export default useDoInAdvanceBeforeAppStartNeedMaybeSomeParamsReturnIsReady;