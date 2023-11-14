import {useEffect, useState} from 'react';
import styled from 'styled-components';
import PrivateChats from '../PrivateChat/PrivateChats';
import {theme} from '../../styles/Theme';
import GroupChat from 'components/GroupChat/GroupChats';
import {authCheck} from '../../api/auth';
import LoadingCircle from 'components/LoadingCircle/LoadingCircle';

export default function SideBar() {
  const [categoryButton, setCategoryButton] = useState<boolean>(true);
  const [name, setName] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleTabClick = async () => {
    setIsLoading(true);
    try {
      const res = await authCheck();
      setName(res.user.name);
    } catch (error) {
      alert('⚠️사용자의 이름을 불러오지 못하였습니다.');
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    }
  };

  useEffect(() => {
    handleTabClick();
  }, []);

  return (
    <StyledContainer>
      <StyledText>안녕하세요. {name}님👋</StyledText>
      <StyledCategoryContainer>
        <StyledPrivateButton
          className={categoryButton ? 'selected_category' : ''}
          onClick={() => {
            setCategoryButton(true);
            handleTabClick();
          }}
        >
          개인
        </StyledPrivateButton>
        <StyledGroupButton
          className={!categoryButton ? 'selected_category' : ''}
          onClick={() => {
            setCategoryButton(false);
            handleTabClick();
          }}
        >
          그룹
        </StyledGroupButton>
      </StyledCategoryContainer>
      <StyledLine />
      <StyledChatContainer>
        {isLoading ? (
          <LoadingCircle width="130px" height={'calc(100vh - 15rem)'} />
        ) : categoryButton ? (
          <PrivateChats />
        ) : (
          <GroupChat />
        )}
      </StyledChatContainer>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  width: 35rem;
  height: 100vh;
  display: flex;
  flex-direction: column;
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
  background-color: ${theme.colors.gray100};
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 6px;
    background: ${theme.colors.gray100};
  }
  &::-webkit-scrollbar-thumb {
    background: ${theme.colors.gray300};
    border-radius: 6px;
  }
`;
