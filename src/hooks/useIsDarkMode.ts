import { useColorScheme as systemDarkMode } from "react-native";

const useIsDarkMode = () => systemDarkMode() === "dark";

export default useIsDarkMode;