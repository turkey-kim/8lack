import background from '../../../../assets/images/home-header.png';
import bloat from '../../../../assets/images/Burst-Bloat.png';
import styled, {keyframes} from 'styled-components';
import {theme} from '../../../../styles/Theme';
import {ReactComponent as MainLogo} from '../../../../assets/images/home-main8.svg';

export default function HeaderSection() {
  return (
    <StyledContainer>
      <StyledMainBackground>
        <StyledMainTextContainer>
          <StyledMainText>마치</StyledMainText>
          <StyledLogoText>팔락</StyledLogoText>
          <StyledMainText>이듯</StyledMainText>
        </StyledMainTextContainer>
        <StyledMainLogoContainer>
          <StyledShakingMainLogo />
        </StyledMainLogoContainer>
        <StyledMainText>날아가는 메시지</StyledMainText>
        <StyledBloatImg1 src={bloat} />
        <StyledBloatImg2 src={bloat} />
      </StyledMainBackground>
      <StyledTextContainer>
        <StyledTextInnerContainer>
          <StyledLogoText2>8lack</StyledLogoText2>
          <StyledText1>
            에서 다양한 사람들과 다양한 주제로 이야기를 나눠볼 수 있어요! <br />
          </StyledText1>
        </StyledTextInnerContainer>
        <StyledText2>새로운 경험을 통해 일상의 재미를 더해보세요!</StyledText2>
      </StyledTextContainer>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
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
`;

const StyledMainTextContainer = styled.div`
  display: flex;
`;

const StyledMainText = styled.h1`
  color: ${theme.colors.white};
  font-size: 4rem;
  display: flex;
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

const shakeAnimation = keyframes`
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
  animation: ${shakeAnimation} 8s infinite;
`;

const StyledLogoText = styled(StyledMainText)`
  font-family: 'CWDangamAsac-Bold';
  margin-left: 1.5rem;
`;

const rotateBloadImg = keyframes`
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

const StyledBloatImg1 = styled.img`
  width: 15rem;
  position: absolute;
  left: 5rem;
  bottom: 2rem;
  animation: ${rotateBloadImg} 10s linear infinite;
`;

const StyledBloatImg2 = styled.img`
  width: 15rem;
  position: absolute;
  top: 2rem;
  right: 5rem;
  animation: ${rotateBloadImg} 10s linear infinite;
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

const StyledTextInnerContainer = styled.div`
  display: flex;
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
  color: ${theme.colors.white};
`;

const StyledText2 = styled.h2`
  color: ${theme.colors.white};
  font-size: 2rem;
`;
