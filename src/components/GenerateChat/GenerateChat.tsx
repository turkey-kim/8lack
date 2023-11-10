import SearchBar from 'components/HeaderLayout/SearchBar';
import {MdClose} from 'react-icons/md';
import styled from 'styled-components';
import {theme} from 'styles/Theme';
import UserCells from './UserCells';
import {User} from '../../types/chatroom.types';
import {useState} from 'react';

interface ModalProps {
  onClick: React.Dispatch<boolean>;
}

const DUMMY_USERS: User[] = [
  {
    id: 'string1',
    name: '김팔락',
    picture: 'https://lh3.googleusercontent.com/a/ACg8ocKwXHK0B_qALPkVP9CEI2cynKa-vMTOxX-sFDuEWejmtFvD=s576-c-no',
  },
  {
    id: 'string2',
    name: '양희은',
    picture: 'https://lh3.googleusercontent.com/a/ACg8ocKwXHK0B_qALPkVP9CEI2cynKa-vMTOxX-sFDuEWejmtFvD=s576-c-no',
  },
  {
    id: 'string3',
    name: '한문철',
    picture: 'https://lh3.googleusercontent.com/a/ACg8ocKwXHK0B_qALPkVP9CEI2cynKa-vMTOxX-sFDuEWejmtFvD=s576-c-no',
  },
  {
    id: 'string4',
    name: '김연아',
    picture: 'https://lh3.googleusercontent.com/a/ACg8ocKwXHK0B_qALPkVP9CEI2cynKa-vMTOxX-sFDuEWejmtFvD=s576-c-no',
  },
];

const GenerateChat = (props: ModalProps) => {
  const modalCloseHandler = () => {
    props.onClick(false);
  };

  const [userData, setUserData] = useState<[User[], User[]]>([DUMMY_USERS, []]);

  return (
    <Bundler>
      <BackDrop onClick={modalCloseHandler} />
      <StyledModalContainer>
        <StyledHeader>
          <StyledH4>그룹 채팅방 만들기</StyledH4>
          <StyledCloseIcon onClick={modalCloseHandler}></StyledCloseIcon>
        </StyledHeader>
        <StyledMain>
          <StyledUnit>
            <StyledDiv>
              <StyledLabel>그룹 채팅방 제목</StyledLabel>
              <SearchBar content="그룹 채팅방 이름을 적어주세요" height="40"></SearchBar>
            </StyledDiv>
            <div>
              <StyledLabel>사용자 선택하기</StyledLabel>
              <SearchBar content="사용자를 검색해보세요" height="40"></SearchBar>
              <UserCells
                height="216px"
                marginTop="8px"
                allocatedData={userData[0]}
                subData={userData[1]}
                onToggleUser={setUserData}
              ></UserCells>
            </div>
          </StyledUnit>
          <StyledUnit>
            <StyledLabel>선택된 사용자</StyledLabel>
            <UserCells
              allocatedData={userData[1]}
              subData={userData[1]}
              onToggleUser={setUserData}
              height="350px"
            ></UserCells>
          </StyledUnit>
        </StyledMain>
        <StyledBottom>
          <StyledButton>그룹 채팅 만들기</StyledButton>
          <StyledCancelButton>취소하기</StyledCancelButton>
        </StyledBottom>
      </StyledModalContainer>
    </Bundler>
  );
};

export default GenerateChat;

const Bundler = styled.div``;

const BackDrop = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);

  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 5;
`;

const StyledModalContainer = styled.div`
  width: 747px;
  height: 562px;
  border-radius: 8px;

  background-color: ${theme.colors.white};

  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 5;

  margin: auto;
  box-shadow: ${theme.shadows.shadow3};
`;

const StyledHeader = styled.div`
  height: 70px;
  display: flex;
  justify-content: space-between;
  padding: 16px 24px;
  border-bottom: 1px solid ${theme.colors.gray400};
`;

const StyledH4 = styled.h4`
  font-size: ${theme.fonts.subtitle4.fontSize};
  font-weight: ${theme.fonts.subtitle4.fontWeight};
  line-height: ${theme.fonts.subtitle4.lineHeight};
`;

const StyledCloseIcon = styled(MdClose)`
  font-size: 32px;
  border-radius: 4px;
  color: ${theme.colors.gray800};

  &:hover {
    background-color: ${theme.colors.blue100};
  }
`;

const StyledMain = styled.div`
  display: flex;
  padding: 16px 24px;
  gap: 24px;
`;

const StyledUnit = styled.div`
  width: 338px;
  height: 380px;
`;

const StyledLabel = styled.label`
  font-size: ${theme.fonts.body2.fontSize};
  font-weight: ${theme.fonts.subtitle5.fontWeight};
  line-height: ${theme.fonts.body2.lineHeight};

  display: block;
  margin-bottom: 6px;
`;

const StyledBottom = styled.div`
  position: absolute;
  bottom: 0;

  width: 100%;
  height: 72px;
  border-top: 1px solid ${theme.colors.gray400};

  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 24px;

  gap: 8px;
`;

const StyledButton = styled.button`
  height: 48px;
  padding: 12px 32px;
  border-radius: 12px;

  font-size: ${theme.fonts.subtitle5};

  background-color: ${theme.colors.blue700};
  color: ${theme.colors.white};

  transition: 0.2s;

  &:hover {
    background-color: ${theme.colors.blue800};
  }
`;

const StyledCancelButton = styled(StyledButton)`
  color: ${theme.colors.gray900};
  background-color: ${theme.colors.gray400};

  &:hover {
    background-color: ${theme.colors.gray500};
  }
`;

const StyledDiv = styled.div`
  margin-bottom: 16px;
`;
