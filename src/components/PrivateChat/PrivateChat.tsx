import {useState, useEffect} from 'react';
import styled from 'styled-components';
import {theme} from '../../styles/Theme';
import {format, register} from 'timeago.js';
import koLocale from 'timeago.js/lib/lang/ko';
import {Props, IChat} from 'types/chatroom.types';
import {useNavigate, useParams} from 'react-router-dom';
import useRealTimeUpdate from 'hooks/useRealTimeUpdate';
import {authCheck} from 'api/auth';
import {USER_DEFAULT_IMG} from 'constant/constant';

register('ko', koLocale);

export default function PrivateChat(props: Props) {
  const [myId, setMyId] = useState<string>('');
  const {id, users} = props.data;
  const navigate = useNavigate();
  const params = useParams();
  const {
    updateQuery: {isLoading, data: realTimeData},
  } = useRealTimeUpdate();

  const selectedChatRoom = realTimeData?.chats.find((chat: IChat) => chat.id === id);

  const getAuth = async () => {
    const res = await authCheck();
    setMyId(res.user.id);
  };

  useEffect(() => {
    getAuth();
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return (
    <StyledTopContainer>
      <StyledContainer onClick={() => navigate(`/chat/${id}`)} className={params.chatId === id ? 'selected_chat' : ''}>
        <StyledSubContainer>
          {users.map(user =>
            user.id !== myId ? (
              <StyledImg key={user.id} src={user.picture} alt="사용자 프로필 이미지" />
            ) : (
              users.length === 1 && <StyledImg key={user.id} src={USER_DEFAULT_IMG} alt="알 수 없는 사용자" />
            ),
          )}
          <StyledTextContainer>
            {users.map(user =>
              user.id !== myId ? (
                <StyledTitle key={user.id}>{user.username}</StyledTitle>
              ) : (
                users.length === 1 && <StyledTitle key={user.id}>(알 수 없음)</StyledTitle>
              ),
            )}
            <StyledText>{selectedChatRoom?.latestMessage?.text}</StyledText>
          </StyledTextContainer>
        </StyledSubContainer>
        <StyledDiv>
          <StyledDate>{format(selectedChatRoom?.updatedAt, 'ko')}</StyledDate>
          {/* {selectedChatRoom?.latestMessage === null ? '' : <StyledLatestMessage />} */}
        </StyledDiv>
      </StyledContainer>
    </StyledTopContainer>
  );
}

export const StyledTopContainer = styled.div`
  .selected_chat {
    background-color: ${theme.colors.blue100};
  }
`;

const StyledContainer = styled.li`
  display: flex;
  justify-content: space-around;
  width: 100%;
  padding: 1rem 0;
  background-color: white;
  cursor: pointer;
  transition: all 0.3s ease-out;

  &:hover {
    background-color: ${theme.colors.blue100};
  }
`;

export const StyledSubContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const StyledImg = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
`;

export const StyledTextContainer = styled.div`
  width: 11.25rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 0.5rem;
  overflow: hidden;
`;

export const StyledTitle = styled.h2`
  font-size: ${theme.fonts.subtitle5.fontSize};
`;

export const StyledText = styled.p`
  font-size: ${theme.fonts.body2.fontSize};
  width: 100%;
  height: 1rem;
`;

export const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
`;

export const StyledDate = styled.p`
  margin-top: 0.5rem;
  font-size: ${props => props.theme.fonts.body2.fontSize};
  color: ${props => props.theme.colors.gray600};
`;

export const StyledLatestMessage = styled.div`
  margin-bottom: 0.625rem;
  width: 0.875rem;
  height: 0.875rem;
  border-radius: 50%;
  background-color: ${theme.colors.pink800};
`;
