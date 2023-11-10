import styled from 'styled-components';
import PrivateChats from '../PrivateChat/PrivateChats';
import {theme} from '../../styles/Theme';
import {dummyPrivateRooms} from '../PrivateChat/dummyPrivateRooms';
import {useNavigate} from 'react-router-dom';

export default function SideBar() {
  const navigate = useNavigate();
  const privateRoom = dummyPrivateRooms.map(dummyPrivateRoom => dummyPrivateRoom.isPrivate).includes(true);

  return (
    <StyledContainer>
      <StyledText>안녕하세요. 김팔락님👋</StyledText>
      <StyledCategoryContainer>
        <StyledPrivateText>개인</StyledPrivateText>
        <StyledGroupText>그룹</StyledGroupText>
      </StyledCategoryContainer>
      <StyledLine />
      <PrivateChats />
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  width: 24rem;
  border-left: 1px solid ${theme.colors.gray400};
  border-right: 1px solid ${theme.colors.gray400};
  background-color: ${theme.colors.gray100};
`;

const StyledText = styled.h2`
  margin: 2rem 1.5rem;
  font-size: ${theme.fonts.subtitle4.fontSize};
`;

const StyledCategoryContainer = styled.div`
  margin: 3.5rem 1.5rem 1rem 1.5rem;
  gap: 1.5rem;
  display: flex;
`;

const StyledPrivateText = styled.button`
  font-size: ${theme.fonts.subtitle5.fontSize};
  font-weight: ${theme.fonts.subtitle5.fontWeight};
  color: ${theme.colors.blue700};
`;

const StyledGroupText = styled.button`
  font-size: ${theme.fonts.subtitle5.fontSize};
  font-weight: ${theme.fonts.subtitle5.fontWeight};
  color: ${theme.colors.blue500};
`;

const StyledLine = styled.div`
  border-bottom: 1px solid ${theme.colors.gray400};
`;
