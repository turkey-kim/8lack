import styled from 'styled-components';
import SignInBox from '../components/signIn/SignInBox';

const SignIn = () => {
  return (
    <Container>
      <TextSection>8lack</TextSection>
      <SignInSection>
        <SignInBox />
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

export default SignIn;
