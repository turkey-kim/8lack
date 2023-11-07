import styled from 'styled-components';
import PrivateChats from '../PrivateChat/PrivateChats';

export default function SideBar() {
  return (
    <StyledContainer>
      <StyledText>안녕하세요. 김팔락님👋</StyledText>
      <StyledCategoryContainer>
        <StyledCategoryText>개인</StyledCategoryText>
        <StyledCategoryText>그룹</StyledCategoryText>
      </StyledCategoryContainer>
      <StyledLine />
      <PrivateChats />
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  width: 29rem;
  border-right: 1px solid ${props => props.theme.colors.gray400};
`;

const StyledText = styled.h2`
  margin: 2rem 1.5rem;
  font-size: ${props => props.theme.fonts.subtitle4.fontSize};
`;

const StyledCategoryContainer = styled.div`
  margin: 3.5rem 1.5rem 1rem 1.5rem;
  gap: 1.5rem;
  display: flex;
`;

const StyledCategoryText = styled.p`
  font-size: ${props => props.theme.fonts.subtitle5.fontSize};
  font-weight: ${props => props.theme.fonts.subtitle5.fontWeight};
`;

const StyledLine = styled.div`
  border-bottom: 1px solid ${props => props.theme.colors.gray400};
`;
