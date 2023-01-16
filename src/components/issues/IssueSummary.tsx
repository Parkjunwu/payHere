import { Linking } from "react-native";
import momentSeoulTZ from "../../logics/momentSeoul/momentSeoulTZ";
import { issueType } from "../../type/githubApiFilteredDataType";
import Summary from "../listRenderComponents/Summary";

const IssueSummary = ({
  id,
  repositoryName,
  userName,
  avatar_url,
  html_url,
  title,
  state,
  created_at,
  comments,
  score,
  reactions,
}: issueType) => {

  const onPressSingleIssue = () => Linking.openURL(html_url);
  const convertedToKoreanTime = momentSeoulTZ(created_at).format("YYYY년 M월 D일");
  const bottomText = `comments:${comments}    state:${state}    reactions:${reactions}`;

  return (
    <Summary
      onPressSummary={onPressSingleIssue}
      imageSource={avatar_url}
      topText={repositoryName}
      middleText={title}
      bottomText={bottomText}
      timeText={convertedToKoreanTime}
    />
  );
};

export default IssueSummary;