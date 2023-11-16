import {MdSearch} from 'react-icons/md';
import styled from 'styled-components';
import {theme} from '../../../styles/Theme';

interface SearchBarProps {
  height: string;
  content: string;
  $inputState?: string;
  onChangeName?: React.Dispatch<React.SetStateAction<string>>;
  onSearchName?: React.Dispatch<React.SetStateAction<string>>;
  onSearchGroupChat?: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar = (props: SearchBarProps) => {
  const nameHandler: React.ChangeEventHandler<HTMLInputElement> = e => {
    const tar = e.target as HTMLInputElement;
    if (props.onChangeName) {
      props.onChangeName(tar.value);
    }
    if (props.onSearchName) {
      props.onSearchName(tar.value);
    }
    if (props.onSearchGroupChat) {
      props.onSearchGroupChat(tar.value);
    }
  };

  return (
    <StyledInputContainer>
      <StyledSearchIcon></StyledSearchIcon>
      <StyledSearchBar
        $inputState={props.$inputState}
        onChange={nameHandler}
        height={props.height}
        placeholder={props.content}
      ></StyledSearchBar>
    </StyledInputContainer>
  );
};

export default SearchBar;

export const StyledInputContainer = styled.div`
  position: relative;
`;

export const StyledSearchIcon = styled(MdSearch)`
  position: absolute;
  width: 1.5rem;
  top: 0;
  bottom: 0;
  margin: auto 0.5rem;

  color: ${theme.colors.gray500};
`;

const StyledSearchBar = styled.input<Pick<SearchBarProps, 'height' | '$inputState'>>`
  width: 100%;
  height: ${props => props.height + 'px'};
  padding-left: 2.25rem;
  border: 0.063rem solid ${props => (props.$inputState === 'error' ? theme.colors.error : props.theme.colors.gray500)};
  border-radius: 0.25rem;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.blue700};
  }
`;
