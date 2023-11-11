import {useEffect, useState} from 'react';
import styled from 'styled-components';
import PrivateChats from '../PrivateChat/PrivateChats';
import {theme} from '../../styles/Theme';
import GroupChat from 'components/GroupChat/GroupChats';
import {authCheck} from '../../api/auth';

export default function SideBar() {
  const [categoryButton, setCategoryButton] = useState<boolean>(true);
  const [name, setName] = useState<string>('');

  const getAuth = async () => {
    const res = await authCheck();
    setName(res.user.name);
  };

  useEffect(() => {
    getAuth();
  }, []);

  return (
    <StyledContainer>
      <StyledText>안녕하세요. {name}님👋</StyledText>
      <StyledCategoryContainer>
        <StyledPrivateButton
          className={categoryButton ? 'selected_category' : ''}
          onClick={() => setCategoryButton(true)}
        >
          개인
        </StyledPrivateButton>
        <StyledGroupButton
          className={!categoryButton ? 'selected_category' : ''}
          onClick={() => setCategoryButton(false)}
        >
          그룹
        </StyledGroupButton>
      </StyledCategoryContainer>
      <StyledLine />
      <StyledChatContainer>{categoryButton ? <PrivateChats /> : <GroupChat />}</StyledChatContainer>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  width: 35rem;
  border-left: 1px solid ${theme.colors.gray400};
  border-right: 1px solid ${theme.colors.gray400};
`;

const StyledText = styled.h2`
  margin: 2rem 1.5rem;
  font-size: ${theme.fonts.subtitle4.fontSize};
`;

const StyledCategoryContainer = styled.div`
  margin: 3.5rem 1.5rem 1rem 1.5rem;
  gap: 1.5rem;
  display: flex;

  .selected_category {
    color: ${theme.colors.blue700};
  }
`;

const StyledPrivateButton = styled.button`
  font-size: ${theme.fonts.subtitle5.fontSize};
  font-weight: ${theme.fonts.subtitle5.fontWeight};
  color: ${theme.colors.blue500};
`;

const StyledGroupButton = styled(StyledPrivateButton)`
  color: ${theme.colors.blue500};
`;

const StyledLine = styled.div`
  border-bottom: 1px solid ${theme.colors.gray400};
`;

const StyledChatContainer = styled.div`
  height: 100vh;
  background-color: ${theme.colors.gray100};
`;
