import styled from 'styled-components';
import {theme} from 'styles/Theme';
import {StyledRightSection, StyledWrapper, StyledText, StyledSubText, StyledIntroText} from '..';
import chat2 from 'assets/images/main_chatroom2.png';

const Invite = () => {
  return (
    <StyledRightSection>
      <StyledWrapper>{<StyledImg src={chat2} />}</StyledWrapper>
      <StyledWrapper>
        <StyledText>편리한 초대 기능</StyledText>
        <StyledSubText>
          대화하고 싶은 친구를
          <br />
          검색하고 초대해보세요.
        </StyledSubText>
        <StyledIntroText>
          가장 먼저 온 메시지순으로 확인할 수 있어, <br /> 편리하게 사용할 수 있답니다!
        </StyledIntroText>
      </StyledWrapper>
    </StyledRightSection>
  );
};

const StyledImg = styled.img`
  height: 25rem;
  position: relative;
  top: 4rem;
  right: 8rem;
  margin-left: 20rem;

  @media (max-width: 800px) {
    height: 20rem;
    right: 4rem;
    margin-left: 10rem;
  }
`;

export default Invite;
