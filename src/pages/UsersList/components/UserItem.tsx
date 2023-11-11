import {
  User,
  StyledUserContainer,
  StyledUserProfile,
  StyledUserDescription,
  StyledUserName,
  StyledActiveCircle,
  StyledStar,
  StyledChatButton,
} from './UserLists';

interface UserItem {
  user: User;
}

const UserItem = ({user}: UserItem) => (
  <StyledUserContainer key={user.id}>
    <StyledUserProfile src={user.picture} />
    <StyledUserDescription>
      <StyledUserName>
        {user.name}&nbsp;
        <StyledActiveCircle />
        <StyledStar />
      </StyledUserName>
      <StyledChatButton
        onClick={() => {
          window.confirm(`${user.name}님과 채팅 시작하시겠습니까?`);
          //채팅 로직 함수 구현 추가
        }}
      >
        1:1 채팅하기
      </StyledChatButton>
    </StyledUserDescription>
  </StyledUserContainer>
);

export default UserItem;
