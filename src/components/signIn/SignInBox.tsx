import {useState} from 'react';
import styled from 'styled-components';
import {theme} from '../../styles/Theme';
import {useNavigate} from 'react-router';
import {postSignIn} from '../../api/auth';

const SignInBox = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState<any>({
    id: '',
    pw: '',
  });
  let {id, pw} = inputs;

  const goToSignUp = () => {
    navigate('/signup');
  };

  const signIn = async () => {
    const res = await postSignIn(id, pw);
    const {accessToken, refreshToken} = res;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    navigate('/');
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {value, name} = e.target;
    setInputs({...inputs, [name]: value});
  };

  return (
    <StyledContainer>
      <StyledNavBar>
        <StyledSignInNav>로그인</StyledSignInNav>
        <StyledSignUpNav onClick={goToSignUp}>회원가입</StyledSignUpNav>
      </StyledNavBar>
      <StyledForm>
        <StyledLabel>아이디</StyledLabel>
        <StyledInput name="id" value={id} onChange={onChange}></StyledInput>
        <StyledLabel>비밀번호</StyledLabel>
        <StyledInput name="pw" type="password" value={pw} onChange={onChange}></StyledInput>
        <StyledSubmit onClick={signIn}>로그인</StyledSubmit>
      </StyledForm>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
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

const StyledNavBar = styled.div`
  display: flex;
  width: 100%;
`;

const StyledSignInNav = styled.button`
  width: 50%;
  height: 4rem;
  border: none;
  border-radius: 8px 8px 0 0;
  font-size: ${theme.fonts.body1.fontSize};
  font-weight: 800;
`;

const StyledSignUpNav = styled.button`
  width: 50%;
  height: 4rem;
  border: none;
  border-radius: 8px 8px 0 0;
  background-color: ${theme.colors.blue200};
  font-size: ${theme.fonts.body1.fontSize};
  font-weight: 800;
  &:hover {
    background-color: ${theme.colors.blue300};
  }
`;

const StyledForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  margin-top: 2rem;
`;

const StyledLabel = styled.label`
  align-self: flex-start;
  font-size: ${theme.fonts.body1.fontSize};
  font-weight: 700;
  margin: 1.5rem 0rem 1rem 0rem;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 2.5rem;
  padding: 1rem;
  border: 1px solid ${theme.colors.gray500};
  border-radius: 4px;
  outline: none;
`;

const StyledSubmit = styled.button`
  width: 100%;
  height: 3.5rem;
  margin: 4rem 0rem;
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

export default SignInBox;
