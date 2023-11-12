import {format, register} from 'timeago.js';
import koLocale from 'timeago.js/lib/lang/ko';
import {Props} from 'types/chatroom.types';
import {
  StyledContainer,
  StyledSubContainer,
  StyledImg,
  StyledTextContainer,
  StyledTitle,
  StyledText,
  StyledDate,
  StyledLatestMessage,
  StyledDiv,
} from 'components/PrivateChat/PrivateChat';
register('ko', koLocale);

export default function GroupChat(props: Props) {
  const {id, name, updatedAt, latestMessage, users} = props.data;
  return (
    <StyledContainer>
      <StyledSubContainer>
        <StyledImg src={users[0].picture} alt="그룹 채팅방 이미지" />
        <StyledTextContainer>
          <StyledTitle>{name}</StyledTitle>
          <StyledText>{latestMessage?.text}</StyledText>
        </StyledTextContainer>
      </StyledSubContainer>
      <StyledDiv>
        <StyledDate>{format(updatedAt, 'ko')}</StyledDate>
        {latestMessage === null ? '' : <StyledLatestMessage />}
      </StyledDiv>
    </StyledContainer>
  );
}
