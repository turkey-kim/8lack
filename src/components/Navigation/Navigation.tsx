import styled from 'styled-components';
import {Link} from 'react-router-dom';
import Logo from '../../assets/icons/Logo.png';
import MyPage from '../MyPage/MyPage';
import {useState} from 'react';
import {loginState} from 'states/atom';
import {useRecoilState} from 'recoil';
import {PiChatCircleText, PiUsers, PiSignOutFill} from 'react-icons/pi';
import {USER_DEFAULT_IMG} from 'constant/constant';
import {theme} from '../../styles/Theme';
import {useLocation} from 'react-router-dom';

export default function Navigation() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);

  const location = useLocation();
  const pathName = location.pathname;

  const logOut = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setIsLoggedIn(false);
  };

  return (
    <StyledNav>
      <Link to="/">
        <StyledLogo src={Logo} alt="Logo" />
      </Link>
      <StyledIconContainer>
        <Link to="/">
          <StyledCategoryContainer>
            <PiChatCircleText className={`chat ${pathName === '/' ? 'selected_category' : ''}`} />
            <StyledCategoryText className={pathName === '/' ? 'selected_category' : ''}>채팅</StyledCategoryText>
          </StyledCategoryContainer>
        </Link>
        <Link to="/users">
          <StyledCategoryContainer>
            <PiUsers className={`users ${pathName === '/users' ? 'selected_category' : ''}`} />
            <StyledCategoryText className={pathName === '/users' ? 'selected_category' : ''}>
              유저 목록
            </StyledCategoryText>
          </StyledCategoryContainer>
        </Link>
        <StyledCategoryContainer
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          <StyledUserImg src={USER_DEFAULT_IMG} alt="사용자 프로필 사진" />
          <StyledCategoryText>내정보</StyledCategoryText>
        </StyledCategoryContainer>
        <MyPage isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} />
      </StyledIconContainer>
      <StyledCategoryContainer onClick={logOut}>
        <PiSignOutFill className="logout" />
        <StyledCategoryText>로그아웃</StyledCategoryText>
      </StyledCategoryContainer>
    </StyledNav>
  );
}

const StyledNav = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 6rem;
  height: 100vh;
  padding: 1.5rem 0.5rem;
`;

const StyledLogo = styled.img`
  width: 3.5rem;
  height: 3.5rem;
`;

const StyledIconContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5rem;
`;

const StyledCategoryContainer = styled.div`
  width: 4rem;
  height: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
  color: ${theme.colors.blue500};
  transition: all 0.3s ease-in-out;

  .chat,
  .users,
  .logout {
    width: 2.5rem;
    height: 2.5rem;
  }

  .selected_category {
    color: ${theme.colors.blue700};
    font-weight: bold;
  }

  &:hover {
    background-color: ${theme.colors.blue100};
  }
`;

const StyledCategoryText = styled.p`
  font-size: 0.75rem;
  color: ${theme.colors.blue500};
`;

const StyledUserImg = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  color: ${theme.colors.blue500};
`;
