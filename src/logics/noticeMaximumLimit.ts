import { Alert } from "react-native";

const noticeMaximumLimit = () => Alert.alert("저장소를 4개 이상 지정하실 수 없습니다.","다른 저장소를 추가하려면 기존 저장소를 정리해 주세요.");

export default noticeMaximumLimit;