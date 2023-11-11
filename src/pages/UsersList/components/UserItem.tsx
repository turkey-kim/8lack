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

interface UserItemProps {
  user: User;
  //toggleChecked: (userId: string) => void;
}

const UserItem = ({user}: UserItemProps) => {
  const [isActive, setIsActive] = useState(false); //활동중 ..소켓에서 받아와서 저장해오기
  const [isChecked, setIsChecked] = useState(() => {
    const saved = localStorage.getItem(`isChecked-${user.id}`);
    console.log(`init ${user.id}:`, saved);
    return saved !== null ? saved === 'true' : 'false';
  });

  useEffect(() => {
    localStorage.setItem(`isChecked-${user.id}`, isChecked.toString());
    console.log(`updated ${user.id}:`, isChecked);
  }, [isChecked, user.id]);

  // useEffect(() => {
  //   console.log(isChecked);
  // }, [isChecked]); //즐찾 테스트

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
              //이 부분 수정
              // if (isChecked === true) {
              //   window.confirm(`${user.name}님을 즐겨찾기 하시겠습니가?`);
              // } else {
              //   window.confirm(`${user.name}님을 즐겨찾기 해제 하시겠습니가?`);
              // }
              //toggleChecked(user.id);
              setIsChecked(prev => !prev);
              console.log(`on clicked ${user.id}`);
            }}
          />
        </StyledUserName>
        <StyledChatButton
          onClick={() => {
            window.confirm(`${user.name}님과 채팅 시작하시겠습니까?`);
            //채팅방 생성 로직 + 채팅방 이동 추가
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
