import styled from 'styled-components';
import UserLists from 'components/Users/UserLists';
import FavorUserLists from 'components/Users/FavorUserLists';

const Users = () => {
  return (
    <StyledPageContainer>
      <StyledMainTitle>사용자 리스트</StyledMainTitle>
      <StyledSearchBar placeholder="사용자를 검색해보세요." />
      <FavorUserLists />
      <UserLists />
    </StyledPageContainer>
  );
};

export const StyledPageContainer = styled.div`
  // display: flex;
  // flex-direction: column;
  padding: 4rem 2rem;
`;

export const StyledMainTitle = styled.div`
  display: block;
  margin-bottom: 1rem;
  padding: 8px 0 0 0;
  font-size: ${props => props.theme.fonts.subtitle4.fontSize};
  font-weight: ${props => props.theme.fonts.subtitle4.fontWeight};
`;

export const StyledSearchBar = styled.input`
  margin: 1rem 0 1.5rem 0;
  width: 80%;
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 4px;
  border-color: ${props => props.theme.colors.gray400};
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.blue700};
  }
`;

export const StyledLine = styled.div`
  border-bottom: 1px solid ${props => props.theme.colors.gray400};
  width: 100%;
`;

export default Users;
