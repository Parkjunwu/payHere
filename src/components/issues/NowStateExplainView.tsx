import styled from "styled-components/native";
import BaseSafeAreaView from "../BaseSafeAreaView";
import { DarkModeAppliedText } from "../DarkModeAppliedStyledComponents";

const CenteredContainer = styled.View`
  flex: 1;
  align-items: center;
  padding-top: 50%;
`;
const StateExplainText = styled(DarkModeAppliedText)`
  font-size: 16px;
  font-weight: bold;
`;

type NowStateExplainViewProps = {
  nowState: string;
};

const NowStateExplainView = ({
  nowState,
}: NowStateExplainViewProps) => (
  <BaseSafeAreaView>
    <CenteredContainer>
      <StateExplainText>{nowState}</StateExplainText>
    </CenteredContainer>
  </BaseSafeAreaView>
);

export default NowStateExplainView;