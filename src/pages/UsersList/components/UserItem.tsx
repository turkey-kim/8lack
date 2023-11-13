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
import {makeChatRoom} from 'api/myChatRoom';
import {useNavigate} from 'react-router';
import {isStarBtnClicked} from 'states/atom';
import {useRecoilState} from 'recoil';
import {authCheck} from 'api/auth';
import {myChatRoom} from 'api/myChatRoom';
import {ChatRoom} from 'types/chatroom.types';

interface UserItemProps {
  user: User;
}

const UserItem = ({user}: UserItemProps) => {
  const navigate = useNavigate();
  // const [isActive, setIsActive] = useState(false); //활동중 ..소켓에서 받아와서 저장해오기
  const [isChecked, setIsChecked] = useState(() => {
    const saved = localStorage.getItem(`isChecked-${user.id}`);
    return saved !== null ? saved === 'true' : 'false';
  });
  const [myId, setMyId] = useState<string>('');
  const [starBtnClicked, setStarBtnClicked] = useRecoilState(isStarBtnClicked);

  const getAuth = async () => {
    const res = await authCheck();
    setMyId(res.user.id);
  };

  useEffect(() => {
    getAuth();
  }, []);

  useEffect(() => {
    localStorage.setItem(`isChecked-${user.id}`, isChecked.toString());
  }, [isChecked, user.id]);

  const handleCreateChat = async (userId: string, userName: string, e: React.MouseEvent) => {
    e.preventDefault();

    try {
      const isConfirmed = window.confirm(`${userName}님과 채팅을 시작하시겠습니까?`);
      if (isConfirmed) {
        const chatName = `${userName}`;
        const users = [userId];

        const existingChatRooms: {chats: ChatRoom[]} | undefined = await myChatRoom();
        console.log(existingChatRooms);

        if (existingChatRooms && Array.isArray(existingChatRooms.chats)) {
          const existingChat = existingChatRooms.chats.find(
            chatRoom =>
              chatRoom.isPrivate &&
              chatRoom.users.some(user => user.id === userId) &&
              chatRoom.users.some(user => user.id === myId),
          );

          if (existingChat) {
            console.log('기존 채팅방 사용', existingChat);
            navigate(`/chat/${existingChat.id}`);
          } else {
            // 기존 채팅방이 없으면 새로운 채팅방 생성
            const res = await makeChatRoom(chatName, users, true);
            console.log('새로운 채팅방 생성', res);
            navigate(`/chat/${res.id}`);
          }
        } else {
          console.error('채팅방 목록이 유효하지 않습니다.');
        }
      }
    } catch (err) {
      console.error('채팅방 생성 또는 조회 실패', err);
    }
  };

  return (
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
          <StyledActiveCircle />
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
  );
};

export default UserItem;

const StyledActiveCircle = styled(MdCircle)`
  color: ${props => props.theme.colors.success};
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
