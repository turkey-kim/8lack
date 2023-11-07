import styled from 'styled-components';
import SignUpBox from '../components/signUp/SignUpBox';

const SignUp = () => {
  return (
    <Container>
      <TextSection>8lack</TextSection>
      <SignInSection>
        <SignUpBox />
      </SignInSection>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
`;

const TextSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 100vh;
`;

const SignInSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 100vh;
`;

export default SignUp;
