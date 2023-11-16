import background from '../../../assets/images/home-header.png';
import backObj from '../../../assets/images/backObj.png';
import bloat from '../../../assets/images/Burst-Bloat.png';
import styled, {keyframes} from 'styled-components';
import {theme} from '../../../styles/Theme';
import {ReactComponent as MainLogo} from '../../../assets/images/home-main8.svg';

export default function HeaderSection() {
  return (
    <StyledContainer>
      <StyledMainBackground>
        <StyledBackObj1 src={backObj} />
        <StyledBackObj2 src={backObj} />
        <StyledMainText>
          마치
          <StyledLogoText>팔락</StyledLogoText>
          이듯
        </StyledMainText>
        <StyledMainLogoContainer>
          <StyledShakingMainLogo />
        </StyledMainLogoContainer>
        <StyledMainText>날아가는 메시지</StyledMainText>
        <StyledBloatImg1 src={bloat} />
        <StyledBloatImg2 src={bloat} />
      </StyledMainBackground>
      <StyledTextContainer>
        <StyledText1>
          <StyledLogoText2>8lack</StyledLogoText2>
          에서 다양한 사람들과 다양한 주제로 이야기를 나눠볼 수 있어요! <br />
        </StyledText1>
        <StyledText2>새로운 경험을 통해 일상의 재미를 더해보세요!</StyledText2>
      </StyledTextContainer>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const backAnimation1 = keyframes`
  0% {
    opacity: 0;
    transform: translateY(0);
  }
  70% {
    opacity: 0.07;
    transform: translateY(100px);
  }
  100% {
    opacity: 0;
    transform: translateY(300px);
  }
`;

const backAnimation2 = keyframes`
  0% {
    opacity: 0;
    transform: translateY(300px);
  }
  70% {
    opacity: 0.07;
    transform: translateY(100px);
  }
  100% {
    opacity: 0;
    transform: translateY(0);
  }
`;

const StyledBackObj1 = styled.img`
  width: 70rem;
  position: absolute;
  left: -15rem;
  bottom: 2rem;
  opacity: 0.07;
  animation: ${backAnimation1} 15s ease-in-out infinite;
`;

const StyledBackObj2 = styled.img`
  width: 70rem;
  position: absolute;
  right: -15rem;
  bottom: 2rem;
  opacity: 0;
  animation: ${backAnimation2} 10s ease-in-out infinite;
  animation-delay: 15s;
`;

const StyledMainBackground = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 4rem;
  height: 100vh;
  background-image: url(${background});
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
`;

const StyledMainText = styled.h1`
  color: ${theme.colors.white};
  font-size: 4rem;
  display: flex;
  align-items: center;
`;

const mainLogoColorChange = keyframes`
  0% {
    filter: grayscale(100%);
  }
  40% {
    filter: grayscale(0%) sepia(100%) hue-rotate(0deg);
  }
  70% {
    filter: grayscale(0%) sepia(50%) hue-rotate(180deg);
  }
  100% {
    filter: grayscale(100%);
  }
`;

const Animation = keyframes`
  0% {
    transform: rotate(5deg);
  }
  25% {
    transform: rotate(5deg);
  }
  50% {
    transform: rotate(-5deg);
  }
  75% {
    transform: rotate(5deg);
  }
  100% {
    transform: rotate(5deg);
  }
`;

const StyledMainLogoContainer = styled.div`
  animation: ${mainLogoColorChange} 5s infinite;
`;

const StyledShakingMainLogo = styled(MainLogo)`
  animation: ${Animation} 8s infinite;
`;

const StyledLogoText = styled(StyledMainText)`
  font-family: 'CWDangamAsac-Bold';
  font-size: 80px;
  margin-left: 1.5rem;
`;

const rotateBloadImg1 = keyframes`
  0% {
    transform: rotate(0deg);
    opacity: 1;
    filter: brightness(100%);
  }
  50% {
    transform: rotate(180deg);
    opacity: 0.5;
    filter: brightness(50%);
  }
  100% {
    transform: rotate(360deg);
    opacity: 0;
    filter: brightness(0%);
  }
`;

const rotateBloadImg2 = keyframes`
  0% {
    transform: rotate(0deg);
    opacity: 0;
    filter: brightness(100%);
  }
  50% {
    transform: rotate(180deg);
    opacity: 1;
    filter: brightness(50%);
  }
  100% {
    transform: rotate(360deg);
    opacity: 0;
    filter: brightness(0%);
  }
`;

const StyledBloatImg1 = styled.img`
  width: 18rem;
  position: absolute;
  left: 5rem;
  bottom: 2rem;
  animation: ${rotateBloadImg1} 12s ease-in-out infinite;
`;

const StyledBloatImg2 = styled.img`
  width: 15rem;
  position: absolute;
  top: 2rem;
  right: 5rem;
  animation: ${rotateBloadImg2} 8s ease-in-out infinite;
  animation-delay: 3s;
`;

const StyledTextContainer = styled.div`
  height: 21.5rem;
  background-color: ${theme.colors.bg3};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const StyledText1 = styled.h2`
  color: ${theme.colors.white};
  font-size: 2rem;
  display: flex;
  justify-content: center;
`;

const StyledLogoText2 = styled.h2`
  font-family: 'CWDangamAsac-Bold';
  font-size: 1.95rem;
`;

const StyledText2 = styled.h2`
  color: ${theme.colors.white};
  font-size: 2rem;
`;
