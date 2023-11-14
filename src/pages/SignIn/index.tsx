import styled from 'styled-components';
import SignInBox from './components/SignInBox';
import SignUpBox from './components/SignUpBox';
import {useEffect} from 'react';
import {useLocation} from 'react-router';
import background from 'assets/images/login-background.png';
import {ReactComponent as TextLogo} from 'assets/icons/TextLogo.svg';
import {theme} from 'styles/Theme';

const SignIn = () => {
  const location = useLocation();
  const {pathname} = location;
  return (
    <StyledContainer>
      <StyledTextLogo />
      <StyledTextSection>
        마치 팔락이듯 <br /> 날아가는 메시지
      </StyledTextSection>
      <StyledSignInSection>{pathname === '/signin' ? <SignInBox /> : <SignUpBox />}</StyledSignInSection>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  display: flex;
  position: relative;
  background: url(${background});
  background-size: cover;
`;

const StyledTextSection = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
  height: 100vh;
  padding-left: 4rem;
  color: ${theme.colors.white};
  font-size: 4.2rem;
  font-weight: 800;
  line-height: 6.5rem;

  @media screen and (max-width: 990px) {
    display: none;
  }
`;

const StyledSignInSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 100vh;

  @media screen and (max-width: 990px) {
    width: 100%;
  }
`;

const StyledTextLogo = styled(TextLogo)`
  position: absolute;
  top: 1.2rem;
  left: 2rem;
`;

export default SignIn;
