import styled from 'styled-components';
import Navigation from 'components/Navigation/Navigation';
import {useRecoilValue} from 'recoil';
import {loginState} from 'states/atom';
import {useNavigate} from 'react-router';
import {theme} from 'styles/Theme';
import IntroSection from './components/IntroSection';
import HeaderSection from './components/HeaderSection/HeaderSection';
import {ReactComponent as Logo} from '../../assets/images/8lack.svg';

const Home = () => {
  const isLoggedIn = useRecoilValue(loginState);
  const navigate = useNavigate();

  const goToSignin = () => {
    navigate('/signin');
  };

  return (
    <StyledContainer>
      {isLoggedIn && <Navigation />}
      <StyledInnerContainer>
        {isLoggedIn ? (
          <></>
        ) : (
          <StyledNavigationContainer>
            <Logo />
            <StyledSignInBtn onClick={goToSignin}>로그인</StyledSignInBtn>
          </StyledNavigationContainer>
        )}
        <StyledWrapper className={isLoggedIn ? 'login' : 'logout'}>
          <HeaderSection />
          <IntroSection />
        </StyledWrapper>
      </StyledInnerContainer>
    </StyledContainer>
  );
};

export default Home;

const StyledNavigationContainer = styled.div`
  position: fixed;
  top: 0;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  width: 100%;
  height: 6rem;
  background-color: rgba(255, 255, 255, 0.7);
`;

const StyledWrapper = styled.div`
  width: auto;
  height: auto;

  &.login {
    margin-top: 0;
  }

  &.logout {
    margin-top: 6rem;
  }
`;

const StyledContainer = styled.div`
  display: flex;
  height: auto;
`;

const StyledInnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  width: 100%;
  height: 100vh;
`;

const StyledSignInBtn = styled.button`
  position: fixed;
  top: 1.5rem;
  right: 2rem;
  padding: 1rem 2rem;
  border-radius: 8px;
  background-color: ${theme.colors.blue700};
  color: ${theme.colors.white};
  font-weight: ${theme.fonts.subtitle1.fontWeight};
  font-size: ${theme.fonts.subtitle5.fontSize};

  &:hover {
    background-color: ${theme.colors.blue800};
  }
`;
