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

interface UserItemProps {
  user: User;
  //toggleChecked: (userId: string) => void;
}

const UserItem = ({user}: UserItemProps) => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false); //활동중 ..소켓에서 받아와서 저장해오기
  const [isChecked, setIsChecked] = useState(() => {
    const saved = localStorage.getItem(`isChecked-${user.id}`);
    //console.log(`init ${user.id}:`, saved);
    return saved !== null ? saved === 'true' : 'false';
  });
  const [starBtnClicked, setStarBtnCliced] = useRecoilState(isStarBtnClicked);

  useEffect(() => {
    localStorage.setItem(`isChecked-${user.id}`, isChecked.toString());
    //console.log(`updated ${user.id}:`, isChecked);
  }, [isChecked, user.id]);

  const handleCreateChat = async (userId: string, userName: string) => {
    const isConfirmed = window.confirm(`${userName}님과 채팅 시작하시겠습니까?`);
    if (isConfirmed) {
      const chatName = `${userName}`; //이렇게 하면 나중에 중복되지 않나 체크
      const users = [userId];
      try {
        const res = await makeChatRoom(chatName, users, true);
        console.log(res); //채팅방 정보
        navigate(`/chat/${res.id}`);
      } catch (err) {
        console.error('채팅방 생성 실패', err);
      }
    }
  };

  return (
    //유저마다 생성 되는 것
    <StyledUserContainer key={user.id}>
      <StyledUserProfile src={user.picture} />
      <StyledUserDescription>
        <StyledUserName>
          {user.name}&nbsp;
          <StyledActiveCircle />
          <StyledStar
            className={isChecked ? 'checked' : 'unchecked'}
            onClick={() => {
              setIsChecked(prev => !prev);
              setStarBtnCliced(!starBtnClicked);
            }}
          />
        </StyledUserName>
        <StyledChatButton onClick={() => handleCreateChat(user.id, user.name)}>1:1 채팅하기</StyledChatButton>
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
