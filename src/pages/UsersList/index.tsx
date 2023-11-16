import styled from 'styled-components';
import UserLists from 'pages/UsersList/components/UserLists';
import {StyledH1} from 'pages/GroupChatList/HeaderLayout';

const Users = () => {
  return (
    <StyledPageContainer>
      <StyledHeader>
        <StyledH1>사용자 리스트</StyledH1>
      </StyledHeader>
      <UserLists />
    </StyledPageContainer>
  );
};

export const StyledHeader = styled.div`
  padding: 1rem 0 2rem 0.5rem;
`;

export const StyledPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4rem 2rem;
  overflow-y: auto;
  height: 100vh;
  width: 100%;
  padding: 40px 10px 0 80px;
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
  width: 90%;
  height: 3rem;
  padding-left: 2.25rem;
  border-radius: 0.25rem;
  border: 0.063rem solid ${props => props.theme.colors.gray500};
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
