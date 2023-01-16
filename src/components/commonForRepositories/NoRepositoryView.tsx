import styled from "styled-components/native";
import BaseSafeAreaView from "../BaseSafeAreaView";
import { DarkModeAppliedText } from "../DarkModeAppliedStyledComponents";
import GoToSearchBtn from "./GoToSearchBtn";

const EmptyContainer = styled(BaseSafeAreaView)`
  align-items: center;
  justify-content: center;
`;
const TopText = styled(DarkModeAppliedText)`
  margin-bottom: 7px;
  font-size: 20px;
  font-weight: bold;
`;
const BottomText = styled(DarkModeAppliedText)`
  margin-bottom: 30px;
  font-size: 14px;
  font-weight: bold;
`;

const NoRepositoryView = () => (
  <EmptyContainer>
    <TopText>
      저장소를 추가해 주세요!
    </TopText>
    <BottomText>
      구독 중인 저장소가 없습니다.
    </BottomText>
    <GoToSearchBtn size="big"/>
  </EmptyContainer>
);

export default NoRepositoryView;