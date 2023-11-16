import {useState, useEffect} from 'react';
import {
  User,
  StyledUserContainer,
  StyledUserProfile,
  StyledUserDescription,
  StyledUserName,
  StyledChatButton,
} from './UserLists';
import {FaStar} from 'react-icons/fa';
import {MdCircle} from 'react-icons/md';
import styled from 'styled-components';
import {useNavigate} from 'react-router';
import {isStarBtnClicked, onlineUserList} from 'states/atom';
import {useRecoilState, useRecoilValue} from 'recoil';
import {myChatRoom} from 'api/myChatRoom';
import {ChatRoom} from 'types/chatroom.types';
import {debounce} from 'lodash';
import {useUid} from 'hooks/useUid';
import {useChatCreation} from 'hooks/useChatRoomMutation';

interface UserItemProps {
  user: User;
}

const UserItem = ({user}: UserItemProps) => {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(() => {
    const saved = localStorage.getItem(`isChecked-${user.id}`);
    return saved !== null ? saved === 'true' : false;
  });
  const {uid, isLoading, error} = useUid();
  const myId = uid;
  const [starBtnClicked, setStarBtnClicked] = useRecoilState(isStarBtnClicked);
  const getOnlineUserList = useRecoilValue(onlineUserList);

  useEffect(() => {
    localStorage.setItem(`isChecked-${user.id}`, isChecked.toString());
  }, [isChecked, user.id]);

  const {createChatRoom} = useChatCreation();

  const handleCreateChat = debounce(async (userId: string, userName: string, e: React.MouseEvent) => {
    e.preventDefault();

    try {
      const isConfirmed = window.confirm(`${userName}님과 채팅을 시작하시겠습니까?`);
      if (isConfirmed) {
        const chatName = `${userName}`;
        const users = [userId];

        const existingChatRooms: {chats: ChatRoom[]} | undefined = await myChatRoom();

        if (existingChatRooms && Array.isArray(existingChatRooms.chats)) {
          const existingChat = existingChatRooms.chats.find(
            chatRoom =>
              chatRoom.isPrivate &&
              chatRoom.users.some(user => user.id === userId) &&
              chatRoom.users.some(user => user.id === myId),
          );

          if (existingChat) {
            navigate(`/chat/${existingChat.id}`);
          } else {
            await createChatRoom(chatName, users, true);
          }
        } else {
          console.error('채팅방 목록이 존재하지 않습니다.');
        }
      }
    } catch (err) {
      console.error('채팅방 생성 또는 조회 실패', err);
    }
  }, 1000);

  return (
    <>
      <StyledUserContainer
        key={user.id}
        onClick={e => {
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        <StyledUserProfile src={user.picture} />
        <StyledUserDescription>
          <StyledUserName>
            {user.name}&nbsp;
            {getOnlineUserList.some((item: string) => item === user.id) ? (
              <StyledActiveCircle className="active" />
            ) : (
              <StyledActiveCircle className="Inactive" />
            )}
            <StyledStar
              className={isChecked ? 'checked' : 'unchecked'}
              onClick={() => {
                setIsChecked(prev => !prev);
                setStarBtnClicked(!starBtnClicked);
              }}
            />
          </StyledUserName>
          <StyledChatButton
            onClick={e => {
              handleCreateChat(user.id, user.name, e);
            }}
          >
            1:1 채팅하기
          </StyledChatButton>
        </StyledUserDescription>
      </StyledUserContainer>
    </>
  );
};

export default UserItem;

const StyledActiveCircle = styled(MdCircle)`
  color: ${props => props.theme.colors.gray300};

  &.active {
    color: ${props => props.theme.colors.success};
  }
  &.Inactive {
    color: ${props => props.theme.colors.gray300};
  }
`;

const StyledStar = styled(FaStar)`
  margin-left: auto;
  vertical-align: top;
  &.checked {
    color: ${props => props.theme.colors.blue700};
  }
  &.unchecked {
    color: ${props => props.theme.colors.blue300};
  }
`;
