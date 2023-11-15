import styled from 'styled-components';
import {theme} from 'styles/Theme';
import {StyledLeftSection, StyledWrapper, StyledText, StyledSubText, StyledIntroText} from '..';
import chat1 from 'assets/images/main_chatroom1.png';
import chat2 from 'assets/images/main_chat1.png';

const ChatRoom = () => {
  return (
    <StyledLeftSection>
      <StyledWrapper>
        <StyledText>1:1 & 그룹 채팅방</StyledText>
        <StyledSubText>
          친구들과 함께 <br />
          채팅을 시작해보세요.
        </StyledSubText>
        <StyledIntroText>
          가장 먼저 온 메시지순으로 확인할 수 있어, <br /> 편리하게 사용할 수 있답니다!
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
  top: 4rem;
  right: 8rem;

  @media (max-width: 800px) {
    height: 20rem;
    right: 4rem;
  }
`;

const StyledImg2 = styled.img`
  height: 20rem;
  position: relative;
  top: -8rem;
  right: 15rem;

  @media (max-width: 800px) {
    height: 16rem;
    right: 9rem;
  }
`;

export default ChatRoom;
