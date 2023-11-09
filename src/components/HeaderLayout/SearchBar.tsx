import {MdSearch} from 'react-icons/md';
import styled from 'styled-components';
import {theme} from '../../styles/Theme';

const SearchBar = () => {
  return (
    <StyledInputContainer>
      <StyledSearchIcon></StyledSearchIcon>
      <StyledSearchBar placeholder="채팅방을 검색해보세요"></StyledSearchBar>
    </StyledInputContainer>
  );
};

export default SearchBar;

const StyledInputContainer = styled.div`
  position: relative;
`;

const StyledSearchIcon = styled(MdSearch)`
  position: absolute;
  width: 24px;
  top: 0;
  bottom: 0;
  margin: auto 16px;

  color: ${theme.colors.gray500};
`;

const StyledSearchBar = styled.input`
  width: 100%;
  height: 50px;
  padding-left: 48px;
  border: 1px solid ${theme.colors.gray500};
  border-radius: 4px;
`;
