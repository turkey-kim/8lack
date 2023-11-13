import styled from 'styled-components';
import {theme} from '../../../styles/Theme';
import TabButtons from './TabButton/TabButtons';
import SearchBar from './SearchBar';
import {useState} from 'react';
import GenerateChat from './GenerateChat/GenerateChat';
import TabProps from './TabButton/TabProps';

const MARGIN = '5rem';

interface HeaderLayoutProps {
  onSearchGroupChat: React.Dispatch<React.SetStateAction<string>>;
  setTabs: React.Dispatch<React.SetStateAction<TabProps[]>>;
  tabs: TabProps[];
}

const HeaderLayout = (props: HeaderLayoutProps) => {
  const [isModalOpened, setModalOpened] = useState<boolean>(false);

  const generateModalOpenHander = () => {
    setModalOpened(true);
  };

  return (
    <StyledContainer>
      {isModalOpened && <GenerateChat onToggleModal={setModalOpened}></GenerateChat>}
      <StyledHeaderDiv>
        <StyledH1>입장가능한 그룹 채팅방</StyledH1>
        <StyledButton onClick={generateModalOpenHander}>그룹 채팅방 만들기</StyledButton>
      </StyledHeaderDiv>
      <StyledDiv>
        <SearchBar
          content="채팅방을 검색해보세요" //
          height="50"
          onSearchGroupChat={props.onSearchGroupChat}
        ></SearchBar>
        <TabButtons setTabs={props.setTabs} tabs={props.tabs}></TabButtons>
      </StyledDiv>
    </StyledContainer>
  );
};

export default HeaderLayout;

const StyledContainer = styled.div`
  height: 17.75rem;
  border-bottom: 1px solid ${theme.colors.gray300};
  padding-top: 3rem;
`;

const StyledHeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin: 0 ${MARGIN} 2.5rem;
`;

const StyledButton = styled.button`
  padding: 0.75rem 2rem;
  border-radius: 0.75rem;

  font-size: ${theme.fonts.subtitle5};

  background-color: ${theme.colors.blue700};
  color: ${theme.colors.white};

  transition: 0.3s;

  &:hover {
    background-color: ${theme.colors.blue800};
  }
`;

const StyledH1 = styled.h1`
  font-size: ${theme.fonts.subtitle2.fontSize};
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin: 0 ${MARGIN};
`;
