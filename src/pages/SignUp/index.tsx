import styled from 'styled-components';
import SignUpBox from './components/SignUpBox';

const SignUp = () => {
  return (
    <StyledContainer>
      <StyledTextSection>8lack</StyledTextSection>
      <StyledSignInSection>
        <SignUpBox />
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

export default SignUp;
