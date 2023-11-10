import {StyledLine} from 'pages/Users';
import {
  StyledActiveCircle,
  StyledChatButton,
  StyledStar,
  StyledSubTitle,
  StyledUserContainer,
  StyledUserDescription,
  StyledUserName,
  StyledUserProfile,
  StyledUsersWrapper,
} from './UserLists';
import {FaStar} from 'react-icons/fa';
import {MdCircle} from 'react-icons/md';

const FavorUserLists = () => {
  //즐겨찾기한 유저 조회
  return (
    <>
      <StyledLine />
      <StyledSubTitle>즐겨찾기</StyledSubTitle>
      <StyledUsersWrapper>
        <StyledUserContainer>
          <StyledUserProfile />
          <StyledUserDescription>
            <StyledUserName>
              김ㅇㅇ&nbsp;
              <StyledActiveCircle>
                <MdCircle />
              </StyledActiveCircle>
              <StyledStar>
                <FaStar />
              </StyledStar>
            </StyledUserName>
            <StyledChatButton>1:1 채팅하기</StyledChatButton>
          </StyledUserDescription>
        </StyledUserContainer>
      </StyledUsersWrapper>
    </>
  );
};

export default FavorUserLists;
