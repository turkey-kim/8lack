import {useState, useEffect, FormEvent} from 'react';
import styled from 'styled-components';
import {theme} from '../../../styles/Theme';
import {useNavigate} from 'react-router';
import {postSignUp, checkIdDuplication, postSignIn} from 'api/auth';
import {loginState} from 'states/atom';
import {useRecoilState} from 'recoil';

interface Props {
  $isError?: string;
  $isValidId?: string;
}

interface Inputs {
  name: string;
  id: string;
  pw: string;
  pw2: string;
}

const SignUpBox = () => {
  const navigate = useNavigate();
  const [pwErrorMessage, setPwErrorMessage] = useState('');
  const [inputs, setInputs] = useState<Inputs>({
    name: '',
    id: '',
    pw: '',
    pw2: '',
  });
  let {name, id, pw, pw2} = inputs;
  const [validId, setValidId] = useState('default');
  const [validIdMsg, setValidIdMsg] = useState('사용 가능한 아이디 입니다');

  useEffect(() => {
    checkPassword();
  }, [pw, pw2]);

  useEffect(() => {
    if (validId !== 'default') {
      setValidId('default');
    }
  }, [id]);

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

  const signUp = async (e: FormEvent) => {
    e.preventDefault();
    if (pw && pw === pw2 && validId === 'true') {
      // 성공했을 경우
      const res = await postSignUp(id, pw, name);
      if (res) {
        navigate('/signin');
      }
    } else if (validId !== 'true') {
      alert('아이디 중복체크를 확인해주세요');
    } else {
      alert('올바른 형식을 기입해주세요');
    }
  };

  const StyledidChecker = async (e: FormEvent) => {
    e.preventDefault();
    const result = await checkIdDuplication(id);
    if (!result) {
      setValidId('false');
      setValidIdMsg('사용할 수 없는 아이디입니다');
    } else {
      if (result.isDuplicated) {
        setValidId('false');
        setValidIdMsg('사용할 수 없는 아이디입니다');
      } else {
        setValidId('true');
        setValidIdMsg('사용 가능한 아이디입니다');
      }
    }
  };

  return (
    <StyledContainer>
      <StyledNavField>
        <StyledSignInNav onClick={goToSignIn}>로그인</StyledSignInNav>
        <StyledSignUpNav>회원가입</StyledSignUpNav>
      </StyledNavField>
      <StyledForm onSubmit={signUp}>
        <StyledLabel>아이디</StyledLabel>
        <StyledIdField>
          <StyledInput
            name="id"
            placeholder="영문 아이디를 입력해주세요"
            value={id}
            onChange={onChange}
            autoComplete="off"
            $isValidId={validId}
          ></StyledInput>
          <StyledIdChecker type="button" onClick={StyledidChecker}>
            중복확인
          </StyledIdChecker>
          <StyledIdAlarm $isValidId={validId}>{validIdMsg}</StyledIdAlarm>
        </StyledIdField>
        <StyledLabel>이름</StyledLabel>
        <StyledInput
          name="name"
          placeholder="20자 이하의 이름을 입력해주세요"
          value={name}
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
          $isError={pwErrorMessage}
        ></StyledPwInput>
        <StyledLabel>비밀번호 확인</StyledLabel>
        <StyledPwInput
          name="pw2"
          placeholder="5자리 이상의 비밀번호를 입력해주세요"
          value={pw2}
          type="password"
          onChange={onChange}
          autoComplete="off"
          $isError={pwErrorMessage}
        ></StyledPwInput>
        <StyledPwAlarm>{pwErrorMessage}</StyledPwAlarm>
        <StyledSubmit type="submit">회원가입</StyledSubmit>
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
  min-width: 300px;
  box-shadow: ${theme.shadows.shadow3.shadow};
  border-radius: 8px;
  background-color: ${theme.colors.white};

  @media screen and (max-height: 750px) {
    height: 500px;
  }
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

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  margin-top: 2rem;

  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }

  @media screen and (max-width: 990px) {
    margin-top: 0;
  }
`;

const StyledLabel = styled.label`
  align-self: flex-start;
  font-size: ${theme.fonts.body1.fontSize};
  width: 100%;
  margin: 2rem 0rem 0.5rem 0rem;
`;

const StyledInput = styled.input<Props>`
  width: 100%;
  height: 3rem;
  padding: 1rem;
  border: 1px solid
    ${props =>
      props.$isValidId === 'false'
        ? theme.colors.error
        : props.$isValidId === 'true'
        ? theme.colors.success
        : theme.colors.gray500};
  border-radius: 4px;
  outline: none;
`;

const StyledPwInput = styled.input<Props>`
  width: 100%;
  height: 3rem;
  padding: 1rem;
  border: 1px solid ${({$isError}) => ($isError ? theme.colors.error : theme.colors.gray500)};
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

  @media screen and (max-height: 750px) {
    padding: 1rem;
  }
`;

const StyledPwAlarm = styled.span`
  align-self: flex-start;
  padding: 0.5rem 0rem;
  color: ${theme.colors.error};
`;

const StyledIdField = styled.div`
  position: relative;
  width: 100%;

  button {
    position: absolute;
    top: 0.8rem;
    right: 5px;
  }
`;

const StyledIdChecker = styled.button`
  color: ${theme.colors.blue700};
  font-size: ${theme.fonts.body1.fontSize};
  font-weight: ${theme.fonts.body2.fontWeight};
`;

const StyledIdAlarm = styled.span<Props>`
  display: ${props => (props.$isValidId !== 'default' ? 'flex' : 'none')};
  align-self: flex-start;
  padding: ${props => (props.$isValidId !== 'default' ? '0.5rem 0rem' : '0px')};
  color: ${props => (props.$isValidId === 'false' ? theme.colors.error : theme.colors.success)};
`;

export default SignUpBox;
