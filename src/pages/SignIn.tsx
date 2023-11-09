import styled from 'styled-components';
import SignInBox from '../components/signIn/SignInBox';

const SignIn = () => {
  return (
    <StyledContainer>
      <StyledTextSection>8lack</StyledTextSection>
      <StyledSignInSection>
        <SignInBox />
      </StyledSignInSection>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  display: flex;
`;

const StyledTextSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 100vh;

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

export default SignIn;
