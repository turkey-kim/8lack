import {useState, useEffect} from 'react';
import {
  User,
  StyledUserContainer,
  StyledUserProfile,
  StyledUserDescription,
  StyledUserName,
  StyledChatButton,
} from './UserLists';
import {FaRegStar, FaStar} from 'react-icons/fa';
import {MdCircle} from 'react-icons/md';
import styled from 'styled-components';
import {makeChatRoom} from 'api/myChatRoom';
import {useNavigate} from 'react-router';
import {isStarBtnClicked} from 'states/atom';
import {useRecoilState} from 'recoil';
import {authCheck} from 'api/auth';

interface UserItemProps {
  user: User;
}

const UserItem = ({user}: UserItemProps) => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false); //활동중 ..소켓에서 받아와서 저장해오기
  const [isChecked, setIsChecked] = useState(() => {
    const saved = localStorage.getItem(`isChecked-${user.id}`);
    return saved !== null ? saved === 'true' : 'false';
  });
  const [starBtnClicked, setStarBtnClicked] = useRecoilState(isStarBtnClicked);
  const [myId, setMyId] = useState<string>('');

  useEffect(() => {
    localStorage.setItem(`isChecked-${user.id}`, isChecked.toString());
  }, [isChecked, user.id]);

  const handleCreateChat = async (userId: string, userName: string) => {
    const isConfirmed = window.confirm(`${userName}님과 채팅 시작하시겠습니까?`);
    if (isConfirmed) {
      const chatName = `${userName}`;
      const users = [userId];
      //1:1 채팅방이 기존에 있을 경우에는, 다시 생성되지 않고 연결되게 하기
      // -> users가 클릭된 저 유저아이디이고, private가 true인 경우
      try {
        const res = await makeChatRoom(chatName, users, true);
        console.log(res); //채팅방 정보
        // 기존 채팅방중에 users에 나랑 저 클릭된 아이디, private true값인게 존재하면 기존꺼 가져오게
        navigate(`/chat/${res.id}`);
      } catch (err) {
        console.error('채팅방 생성 실패', err);
      }
    }
  };

  return (
    <StyledUserContainer
      key={user.id}
      onClick={e => {
        e.stopPropagation();
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
            e.stopPropagation();
            handleCreateChat(user.id, user.name);
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
