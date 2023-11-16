import styled from 'styled-components';
import {
  StyledInner,
  StyledTextWrapper,
  StyledLeftSection,
  StyledWrapper,
  StyledText,
  StyledSubText,
  StyledIntroText,
} from '..';
import chat1 from 'assets/images/main_chatroom1.png';
import chat2 from 'assets/images/main_chat1.png';

const ChatRoom = () => {
  return (
    <StyledLeftSection>
      <StyledInner>
        <StyledTextWrapper>
          <StyledText>1:1 & 그룹 채팅방</StyledText>
          <StyledSubText>
            친구들과 함께 <br />
            채팅을 시작해보세요.
          </StyledSubText>
          <StyledIntroText>
            가장 먼저 온 메시지순으로 확인할 수 있어, <br /> 편리하게 사용할 수 있답니다!
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
  top: 4rem;
  right: 8rem;
  transition: transform 0.3s ease-in-out;

  @media (max-width: 800px) {
    height: 20rem;
    right: 4rem;
  }

  &:hover {
    transform: scale(1.1);
  }
`;

const StyledImg2 = styled.img`
  height: 20rem;
  position: absolute;
  top: 20rem;
  right: 32rem;
  transition: transform 0.3s ease-in-out;

  @media (max-width: 800px) {
    height: 16rem;
    right: 9rem;
  }

  &:hover {
    transform: scale(1.1);
  }
`;

export default ChatRoom;
