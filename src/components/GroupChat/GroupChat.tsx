import {format, register} from 'timeago.js';
import koLocale from 'timeago.js/lib/lang/ko';
import {Props, IChat} from 'types/chatroom.types';
import styled from 'styled-components';
import {theme} from '../../styles/Theme';
import {
  StyledTopContainer,
  StyledSubContainer,
  StyledTextContainer,
  StyledTitle,
  StyledText,
  StyledDate,
  StyledDiv,
} from 'components/PrivateChat/PrivateChat';
import {useNavigate, useParams} from 'react-router-dom';
import useRealTimeUpdate from 'hooks/useRealTimeUpdate';

register('ko', koLocale);

export default function GroupChat(props: Props) {
  const {id, name, users} = props.data;
  const navigate = useNavigate();
  const params = useParams();
  const {
    updateQuery: {data: realTimeData},
  } = useRealTimeUpdate();

  const selectedChatRoom = realTimeData?.chats.find((chat: IChat) => chat.id === id);

  return (
    <StyledTopContainer>
      <StyledGroupContainer
        onClick={() => navigate(`/chat/${id}`)}
        className={params.chatId === id ? 'selected_chat' : ''}
      >
        <StyledSubContainer>
          <StyledImgContainer>
            {users.length >= 4
              ? users
                  .slice(0, 4)
                  .map(user => <StyledGroupImg key={user.id} src={user.picture} alt="그룹 채팅방 이미지" />)
              : users.map(user => (
                  <StyledGroupImg key={user.id} src={user.picture} alt="그룹 채팅방 이미지" className="group_img" />
                ))}
          </StyledImgContainer>
          <StyledTextContainer>
            <StyledTitle>{name}</StyledTitle>
            <StyledText>{selectedChatRoom?.latestMessage?.text}</StyledText>
          </StyledTextContainer>
        </StyledSubContainer>
        <StyledDiv>
          <StyledDate>{format(selectedChatRoom?.updatedAt, 'ko')}</StyledDate>
        </StyledDiv>
      </StyledGroupContainer>
    </StyledTopContainer>
  );
}

const StyledGroupContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 6rem;
  padding: 1rem 0;
  background-color: white;
  cursor: pointer;
  transition: all 0.3s ease-out;

  &:hover {
    background-color: ${theme.colors.blue100};
  }
`;

const StyledImgContainer = styled.div`
  width: 4rem;
  height: 4rem;
  display: grid;
  grid-template-columns: 1fr 1fr;

  .group_img {
    display: flex;
    align-items: center;
  }
`;

const StyledGroupImg = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
`;
