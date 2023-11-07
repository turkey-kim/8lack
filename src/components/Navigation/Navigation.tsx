import styled from 'styled-components';
import {Link} from 'react-router-dom';
import Logo from '../../assets/icons/Logo.png';
import Chat from '../../assets/icons/Chat.svg';

export default function Navigation() {
  return (
    <StyledNav>
      <Link to="/">
        <StyledLogo src={Logo} alt="Logo" />
      </Link>
      <StyledIconContainer>
        <Link to="/chat/all">
          <StyledChat src={Chat} alt="Chat" />
        </Link>
        <Link to="/users">
          <p>사용자</p>
        </Link>
        <Link to="/user">
          <p>내정보</p>
        </Link>
      </StyledIconContainer>
      <StyledLogout>로그아웃</StyledLogout>
    </StyledNav>
  );
}

const StyledNav = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 6rem;
  height: 50rem;
  padding: 1.5rem 0.5rem;
  border-right: 1px solid ${props => props.theme.colors.gray400};
`;

const StyledLogo = styled.img`
  width: 3.5rem;
  height: 3.5rem;
  margin-bottom: 4rem;
  cursor: pointer;
`;

const StyledIconContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5rem;
`;

const StyledChat = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  cursor: pointer;
`;

const StyledLogout = styled.button`
  padding: 0rem;
  font-size: 1rem;
  margin-top: 10rem;
`;
