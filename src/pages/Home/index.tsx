import React from 'react';
import styled from 'styled-components';
import Navigation from 'components/Navigation/Navigation';
import {useRecoilValue} from 'recoil';
import {loginState} from 'states/atom';
import {useNavigate} from 'react-router';
import {theme} from 'styles/Theme';

const Home = () => {
  const isLoggedIn = useRecoilValue(loginState);
  const navigate = useNavigate();

  const goToSignin = () => {
    navigate('/signin');
  };

  return (
    <StyledContainer>
      {isLoggedIn ? <Navigation /> : null}
      <StyledInnerContainer>
        {isLoggedIn ? null : <StyledSignInBtn onClick={goToSignin}>로그인</StyledSignInBtn>}
        <StyledWrapper>
          <Section1></Section1>
          <Section1></Section1>
          <Section1></Section1>
        </StyledWrapper>
      </StyledInnerContainer>
    </StyledContainer>
  );
};

export default Home;

const Section1 = styled.div``;

const StyledWrapper = styled.div`
  width: auto;
  height: auto;
`;

const StyledContainer = styled.div`
  display: flex;
  height: auto;
`;

const StyledInnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 4rem 2rem;
  width: 100%;
  height: 100vh;
`;

const StyledSignInBtn = styled.button`
  position: absolute;
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
