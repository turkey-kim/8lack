import styled from 'styled-components';
import {theme} from 'styles/Theme';
import {StyledLeftSection, StyledWrapper, StyledText, StyledSubText, StyledIntroText} from '..';
import chat1 from 'assets/images/main_mychat1.png';
import chat2 from 'assets/images/main_mychat2.png';

const MyChat = () => {
  return (
    <StyledLeftSection>
      <StyledWrapper>
        <StyledText>나의 채팅목록</StyledText>
        <StyledSubText>
          내가 참여하고 있는 채팅을
          <br />
          언제든지 확인하세요.
        </StyledSubText>
        <StyledIntroText>
          가장 먼저 온 메시지순으로 확인할 수 있어,
          <br /> 편리하게 사용할 수 있답니다!
        </StyledIntroText>
      </StyledWrapper>
      <StyledWrapper>
        <StyledImg src={chat1} />
        <StyledImg2 src={chat2} />
      </StyledWrapper>
    </StyledLeftSection>
  );
};

const StyledImg = styled.img`
  height: 25rem;
  position: relative;
  top: 10rem;
  right: 13rem;

  @media (max-width: 800px) {
    height: 20rem;
    right: 7rem;
  }
`;

const StyledImg2 = styled.img`
  height: 30rem;
  position: relative;
  top: 6rem;
  right: 20rem;

  @media (max-width: 800px) {
    height: 25rem;
    right: 10rem;
  }
`;

export default MyChat;
