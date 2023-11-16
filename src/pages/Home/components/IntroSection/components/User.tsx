import styled from 'styled-components';
import {theme} from 'styles/Theme';
import {StyledWrapper, StyledText, StyledSubText, StyledIntroText} from '..';
import background from 'assets/images/main_background.png';
import user1 from 'assets/images/main_user1.png';
import user2 from 'assets/images/main_user2.png';
import user3 from 'assets/images/main_user3.png';
import {Player} from '@lottiefiles/react-lottie-player';

const UserLottie = () => {
  return (
    <StyledPlayer>
      <Player
        autoplay
        loop
        style={{width: '40%', height: '100%'}}
        src="https://lottie.host/71993139-f0a8-440f-80d4-6fae6d198c69/kkqnGwASyk.json"
      />
    </StyledPlayer>
  );
};

const User = () => {
  return (
    <StyledRightSection>
      <StyledWrapper>
        <StyledImg2 src={user3} />
        <StyledImg src={user1} />
        <StyledImg3 src={user2} />
        <UserLottie />
      </StyledWrapper>
      <StyledWrapper>
        <StyledText>유저 목록 조회 & 즐겨찾기</StyledText>
        <StyledSubText>
          친한 친구를 검색하고 <br />
          즐겨찾기에 추가해보세요.
        </StyledSubText>
        <StyledIntroText>
          현재 접속중인 친구를 확인하거나, <br />
          친한 친구를 즐겨찾기하거나. <br />
          새로운 친구를 만나보세요!
        </StyledIntroText>
      </StyledWrapper>
    </StyledRightSection>
  );
};

const StyledPlayer = styled.div`
  position: relative;
  right: -40rem;
  top: -5rem;
`;

export const StyledRightSection = styled.div`
  background-color: ${theme.colors.blue100};
  background-image: url(${background});
  padding: 0rem 15rem 0 10rem;
  text-align: right;
  height: 45rem;
  overflow: hidden;
  width: 100vw;
  background-repeat: no-repeat;
  background-size: cover;
`;

const StyledImg = styled.img`
  height: 25rem;
  position: relative;
  top: 14rem;
  right: -10rem;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

const StyledImg2 = styled.img`
  height: 12rem;
  position: relative;
  top: -2rem;
  right: -11rem;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

const StyledImg3 = styled.img`
  height: 17rem;
  position: relative;
  top: 14rem;
  right: 20rem;
  border-radius: 8px;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

export default User;
