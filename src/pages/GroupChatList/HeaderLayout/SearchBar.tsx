import {MdSearch} from 'react-icons/md';
import styled from 'styled-components';
import {theme} from '../../../styles/Theme';

interface SearchBarProps {
  height: string;
  content: string;
  inputState?: string;
  onChangeName?: React.Dispatch<React.SetStateAction<string>>;
  onSearchName?: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar = (props: SearchBarProps) => {
  const nameHander: React.ChangeEventHandler<HTMLInputElement> = e => {
    const tar = e.target as HTMLInputElement;
    if (props.onChangeName) {
      props.onChangeName(tar.value);
    }
    if (props.onSearchName) {
      props.onSearchName(tar.value);
      console.log('seachedData');
    }
  };

  return (
    <StyledInputContainer>
      <StyledSearchIcon></StyledSearchIcon>
      <StyledSearchBar
        inputState={props.inputState}
        onChange={nameHander}
        height={props.height}
        placeholder={props.content}
      ></StyledSearchBar>
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
  margin: auto 8px;

  color: ${theme.colors.gray500};
`;

const StyledSearchBar = styled.input<Pick<SearchBarProps, 'height' | 'inputState'>>`
  width: 100%;
  height: ${props => props.height + 'px'};
  padding-left: 36px;
  border: 1px solid ${props => (props.inputState === 'error' ? theme.colors.error : props.theme.colors.gray500)};
  border-radius: 4px;
`;
