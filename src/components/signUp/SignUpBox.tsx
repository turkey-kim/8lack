import {useState, useEffect} from 'react';
import styled from 'styled-components';
import {theme} from '../../styles/Theme';
import {useNavigate} from 'react-router';
import {postSignUp} from '../../api/auth';

interface Props {
  isError?: string;
}

const SignUpBox = () => {
  const navigate = useNavigate();
  const [pwErrorMessage, setPwErrorMessage] = useState('');
  const [inputs, setInputs] = useState<any>({
    name: '',
    id: '',
    pw: '',
    pw2: '',
  });
  let {name, id, pw, pw2} = inputs;

  useEffect(() => {
    checkPassword();
  }, [pw, pw2]);

  const goToSignIn = () => {
    navigate('/signin');
  };

  const checkPassword = () => {
    if (pw === pw2) {
      setPwErrorMessage('');
    } else if (pw && !pw2) {
      setPwErrorMessage('');
    } else if (pw !== pw2) {
      setPwErrorMessage('비밀번호가 일치하지 않습니다');
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const signUp = async () => {
    if (pw && pw === pw2) {
      return await postSignUp(id, pw, name);
    } else {
      alert('빈칸을 모두 채워주세요');
    }
  };

  return (
    <StyledContainer>
      <StyledNavField>
        <StyledSignInNav onClick={goToSignIn}>로그인</StyledSignInNav>
        <StyledSignUpNav>회원가입</StyledSignUpNav>
      </StyledNavField>
      <StyledForm>
        <StyledLabel>이름</StyledLabel>
        <StyledInput
          name="name"
          placeholder="20자 이하의 이름을 입력해주세요"
          value={name}
          onChange={onChange}
          autoComplete="off"
        ></StyledInput>
        <StyledLabel>아이디</StyledLabel>
        <StyledInput
          name="id"
          placeholder="영문으로 이루어진 아이디를 입력해주세요"
          value={id}
          onChange={onChange}
          autoComplete="off"
        ></StyledInput>
        <StyledLabel>비밀번호</StyledLabel>
        <StyledPwInput
          name="pw"
          placeholder="5자리 이상의 비밀번호를 입력해주세요"
          value={pw}
          type="password"
          onChange={onChange}
          autoComplete="off"
          isError={pwErrorMessage}
        ></StyledPwInput>
        <StyledLabel>비밀번호 확인</StyledLabel>
        <StyledPwInput
          name="pw2"
          placeholder="5자리 이상의 비밀번호를 입력해주세요"
          value={pw2}
          type="password"
          onChange={onChange}
          autoComplete="off"
          isError={pwErrorMessage}
        ></StyledPwInput>
        <StyledPwAlarm>{pwErrorMessage}</StyledPwAlarm>
        <StyledSubmit onClick={signUp}>회원가입</StyledSubmit>
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
  box-shadow: ${theme.shadows.shadow3.shadow};
  border-radius: 8px;
`;

const StyledNavField = styled.div`
  display: flex;
  width: 100%;
`;

const StyledSignInNav = styled.button`
  width: 50%;
  height: 4rem;
  border: none;
  border-radius: 8px 8px 0 0;
  background-color: ${theme.colors.gray100};
  color: ${theme.colors.gray600};
  font-size: ${theme.fonts.body1.fontSize};
  font-weight: 800;

  &:hover {
    background-color: ${theme.colors.blue200};
  }
`;

const StyledSignUpNav = styled.button`
  width: 50%;
  height: 4rem;
  border: none;
  border-radius: 8px 8px 0 0;
  font-size: ${theme.fonts.body1.fontSize};
  font-weight: 800;
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
  margin: 2rem 0rem 0.5rem 0rem;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 3rem;
  padding: 1rem;
  border: 1px solid ${theme.colors.gray500};
  border-radius: 4px;
  outline: none;
`;

const StyledPwInput = styled.input<Props>`
  width: 100%;
  height: 3rem;
  padding: 1rem;
  border: 1px solid ${props => (props.isError ? theme.colors.error : theme.colors.gray500)};
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
  font-size: ${theme.fonts.subtitle4.fontSize};
  font-weight: 800;

  &:hover {
    background-color: ${theme.colors.blue800};
  }
`;

const StyledPwAlarm = styled.span`
  align-self: flex-start;
  padding: 0.5rem 0rem;
  color: ${theme.colors.error};
`;

export default SignUpBox;
