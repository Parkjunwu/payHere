import { PropsWithChildren } from "react";
import { Image } from "react-native";
import styled from "styled-components/native";
import localImage from "../../srcAssets/localImage";
import { DarkModeAppliedText } from "../DarkModeAppliedStyledComponents";

const Container = styled.View`
  margin-left: 10px;
  margin-right: 10px;
  padding-top: 10px;
  padding-bottom: 7px;
  border-bottom-color: grey;
  border-bottom-width: 1px;
`;
const MarginHorizontalContainer = styled.TouchableOpacity`
  flex-direction: row;
`;
const ImageContainer = styled.View`

`;
const InfoContainer = styled.View`
  flex: 1;
`;
const TopText = styled(DarkModeAppliedText)`
  font-weight: bold;
  padding-bottom: 5px;
  margin-right: 8px;
`;
const MiddleText = styled(DarkModeAppliedText)`
  padding-bottom: 5px;
  margin-left: 3px;
  margin-right: 10px;
  font-size: 12px;
`;
const BottomText = styled(DarkModeAppliedText)`
  font-size: 12px;
  font-weight: 100;
`;
const TimeText = styled(DarkModeAppliedText)`
  padding-top: 3px;
  margin-left: 3px;
  font-size: 11px;
  font-weight: 100;
`;

type SummaryProps = {
  onPressSummary?: ()=>any;
  imageSource?: string;
  topText: string;
  middleText: string;
  bottomText: string;
  timeText?: string;
};

const Summary: React.FC<
  PropsWithChildren<SummaryProps>
> = ({
  onPressSummary,
  imageSource,
  topText,
  middleText,
  bottomText,
  timeText,
  children,
}) => (
  <Container>
    <MarginHorizontalContainer onPress={onPressSummary} disabled={!onPressSummary}>
      <ImageContainer>
        <Image
          style={{
            width: 60,
            height: 60,
            marginRight: 10,
          }}
          source={{ uri: imageSource ? imageSource : localImage.noImage }}
          resizeMode="cover"
        />
      </ImageContainer>
      <InfoContainer>
        <TopText ellipsizeMode='tail' numberOfLines={1}>
          {topText}
        </TopText>
        <MiddleText ellipsizeMode='tail' numberOfLines={1}>
          {middleText}
        </MiddleText>
        <BottomText>
          {bottomText}
        </BottomText>
        {timeText && <TimeText>
          {timeText}
        </TimeText>}
      </InfoContainer>
      {children}
    </MarginHorizontalContainer>
  </Container>
);

export default Summary;