import useIsDarkMode from "./useIsDarkMode";

const useBackgroundAndTextAndPlaceHolderColor = () => {

  const isDarkMode = useIsDarkMode();

  const [ placeholderTextColor, backgroundColor, textColor ] =   
    isDarkMode ?
      [ "rgba(255,255,255,0.5)", "black", "white" ]
    :
      [ "rgba(0,0,0,0.5)", "white", "black" ];
  
  return {
    placeholderTextColor,
    backgroundColor,
    textColor,
  };
};

export default useBackgroundAndTextAndPlaceHolderColor;