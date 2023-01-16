import { useEffect } from "react";
import { repositoryType } from "../../type/githubApiFilteredDataType";

type useIfRepositoriesLengthZeroThenSettingModeFalseProps = {
  repositories: repositoryType[];
  setSettingMode: React.Dispatch<React.SetStateAction<boolean>>;
};

const useIfRepositoriesLengthZeroThenSettingModeFalse = ({
  setSettingMode,
  repositories,
}: useIfRepositoriesLengthZeroThenSettingModeFalseProps) => {

  useEffect(()=>{
    if(repositories.length === 0) {
      setSettingMode(false);
    }
  },[repositories]);
  
};

export default useIfRepositoriesLengthZeroThenSettingModeFalse;