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
import chat2 from 'assets/images/main_chatroom2.png';
import chat3 from 'assets/images/main_chatback.png';
import {Player} from '@lottiefiles/react-lottie-player';

const InviteLottie = () => {
  return (
    <StyledPlayer>
      <Player
        autoplay
        loop
        style={{width: '20%', height: '100%'}}
        src="https://lottie.host/41315642-1016-41c4-92eb-5144b8f8b6c7/HrTMBGNfIu.json"
      />
    </StyledPlayer>
  );
};

const Invite = () => {
  return (
    <StyledLeftSection>
      <StyledInner>
        <StyledWrapper>
          <StyledImg src={chat2} />
          <StyledImg2 src={chat3} />
          <InviteLottie />
        </StyledWrapper>
        <StyledTextWrapper>
          <StyledText>편리한 초대 기능</StyledText>
          <StyledSubText>
            대화하고 싶은 친구를
            <br />
            검색하고 초대해보세요.
          </StyledSubText>
          <StyledIntroText>
            가장 먼저 온 메시지순으로 확인할 수 있어, <br /> 편리하게 사용할 수 있답니다!
          </StyledIntroText>
        </StyledTextWrapper>
      </StyledInner>
    </StyledLeftSection>
  );
};

const StyledPlayer = styled.div`
  position: absolute;
  right: 0;
  left: 0;
  top: 18rem;
  margin: auto;
  z-index: 1;
  transform: scale(0.8);
`;

const StyledImg = styled.img`
  height: 25rem;
  position: absolute;
  top: 4rem;
  left: 5rem;
  transition: transform 0.3s ease-in-out;
  z-index: 1;

  @media (max-width: 800px) {
    height: 20rem;
    right: 4rem;
    margin-left: 10rem;
  }

  &:hover {
    transform: scale(1.1);
  }
`;

const StyledImg2 = styled.img`
  position: absolute;
  height: 10rem;
  left: 5rem;
  bottom: 8rem;
  transition: transform 0.3s ease-in-out;
  transform: scale(1.4);
  opacity: 0.2;
`;

export default Invite;
