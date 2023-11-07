import {useState} from 'react';
import styled from 'styled-components';
import {theme} from '../../styles/Theme';
import {useNavigate} from 'react-router';

const SignUpBox = () => {
  const navigate = useNavigate();

  const goToSignIn = () => {
    navigate('/signIn');
  };

  return (
    <Container>
      <NavField>
        <SignInNav onClick={goToSignIn}>로그인</SignInNav>
        <SignUpNav>회원가입</SignUpNav>
      </NavField>
      <FormField>
        <Label>이름</Label>
        <Input></Input>
        <Label>아이디</Label>
        <Input></Input>
        <Label>비밀번호</Label>
        <Input style={{marginBottom: '15px'}}></Input>
        <Label>비밀번호 확인</Label>
        <Input></Input>
        <Submit>회원가입</Submit>
      </FormField>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%;
  max-width: 500px;
  min-height: 500px;
  background-color: ${theme.colors.blue100};
  box-shadow: ${theme.shadows.shadow3.shadow};
  border-radius: 8px;
`;

const NavField = styled.div`
  display: flex;
  width: 100%;
`;

const SignInNav = styled.button`
  width: 50%;
  height: 60px;
  border: none;
  border-radius: 8px 8px 0 0;
  background-color: ${theme.colors.blue200};
  font-size: ${theme.fonts.body1.fontSize};
  font-weight: 800;

  &:hover {
    background-color: ${theme.colors.blue300};
  }
`;

const SignUpNav = styled.button`
  width: 50%;
  height: 60px;
  border: none;
  border-radius: 8px 8px 0 0;
  font-size: ${theme.fonts.body1.fontSize};
  font-weight: 800;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  margin-top: 50px;
`;

const Label = styled.label`
  align-self: flex-start;
  font-size: ${theme.fonts.body1.fontSize};
  font-weight: 700;
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  border: 1px solid ${theme.colors.gray500};
  border-radius: 4px;
  margin-bottom: 30px;
`;

const Submit = styled.button`
  width: 100%;
  height: 60px;
  margin: 50px 0px;
  border: none;
  border-radius: 8px;
  background-color: ${theme.colors.blue700};
  color: ${theme.colors.white};
  font-size: ${theme.fonts.subtitle5.fontSize};
  font-weight: 800;

  &:hover {
    background-color: ${theme.colors.blue800};
  }
`;

export default SignUpBox;
