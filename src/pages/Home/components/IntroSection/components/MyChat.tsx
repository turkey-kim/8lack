import styled from 'styled-components';
import {theme} from 'styles/Theme';
import {
  StyledTextWrapper,
  StyledInner,
  StyledLeftSection,
  StyledWrapper,
  StyledText,
  StyledSubText,
  StyledIntroText,
} from '..';
import chat1 from 'assets/images/main_mychat1.png';
import chat2 from 'assets/images/main_mychat2.png';

const MyChat = () => {
  return (
    <StyledLeftSection>
      <StyledInner>
        <StyledTextWrapper>
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
        </StyledTextWrapper>
        <StyledWrapper>
          <StyledImg src={chat1} />
          <StyledImg2 src={chat2} />
        </StyledWrapper>
      </StyledInner>
    </StyledLeftSection>
  );
};

const StyledImg = styled.img`
  height: 25rem;
  position: absolute;
  top: 10rem;
  right: 18rem;
  transition: transform 0.3s ease-in-out;

  @media (max-width: 800px) {
    height: 20rem;
    right: 7rem;
  }

  &:hover {
    transform: scale(1.1);
  }
`;

const StyledImg2 = styled.img`
  height: 30rem;
  position: absolute;
  top: 6rem;
  right: 10rem;
  transition: transform 0.3s ease-in-out;

  @media (max-width: 800px) {
    height: 25rem;
    right: 10rem;
  }

  &:hover {
    transform: scale(1.1);
  }
`;

export default MyChat;
