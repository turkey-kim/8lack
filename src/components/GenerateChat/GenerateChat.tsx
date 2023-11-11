import SearchBar from 'components/HeaderLayout/SearchBar';
import {MdClose} from 'react-icons/md';
import styled from 'styled-components';
import {theme} from 'styles/Theme';
import UserCells from './UserCells';
import {User} from '../../types/chatroom.types';
import {useEffect, useState} from 'react';
import {getUsers} from 'api/users';
import {makeChatRoom} from 'api/myChatRoom';
import {useRecoilValue} from 'recoil';
import {userInformation} from 'states/atom';
import {useNavigate} from 'react-router';

interface ModalProps {
  onClick: React.Dispatch<boolean>;
}

type InputStates = [{name: 'chatName'; state: string}, {name: 'pickedUser'; state: string}];

const GenerateChat = (props: ModalProps) => {
  const [userData, setUserData] = useState<[User[], User[]]>([[], []]);
  const [chatName, setChatName] = useState<string>('');

  const [inputStates, setInputStates] = useState<InputStates>([
    {name: 'chatName', state: 'default'},
    {name: 'pickedUser', state: 'default'},
  ]);
  const navigate = useNavigate();

  const myInfo = useRecoilValue(userInformation);

  useEffect(() => {
    // 사용자 불러오기

    getUsers().then(res => {
      const filtered = (res as User[]).slice().filter(val => val.id !== myInfo.id);
      setUserData([filtered, []]);
    });
  }, [myInfo.id]);

  const modalCloseHandler = () => {
    props.onClick(false);
  };

  const generateChatHandler = () => {
    if (chatName.trim().length === 0) {
      // 채팅방 이름 0자 예외 조건 처리
      let temp: InputStates = [...inputStates];
      temp[0].state = 'error';
      setInputStates(temp);
      alert('그룹 채팅방 이름을 입력해주세요.');
      return;
    }

    if (userData[1].length < 2) {
      // 자신을 포함 3명 이하 예외 조건 처리
      let temp: InputStates = [...inputStates];
      temp[1].state = 'error';
      setInputStates(temp);
      alert('자신을 제외하고 2명 이상을 선택해야 그룹 채팅방을 만들 수 있습니다.');
      return;
    }

    const users = userData[1].slice().map(val => val.id); // 아이디만 있는 배열로 바꾸기
    const madeChatRoom = makeChatRoom(chatName, users, false).then(res => {
      let chatId = res.id;
      alert(`${chatName} 방이 생성되었습니다.`);
      navigate(`/chat/${chatId}`);
    });
    // 생성

    modalCloseHandler(); // 모달 닫기
  };

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
            <StyledLabel>사용자 선택하기</StyledLabel>
            <SearchBar content="사용자를 검색해보세요" height="40"></SearchBar>
            <UserCells
              height="312px"
              marginTop="8px"
              typed=""
              allocatedData={userData[0]}
              subData={userData[1]}
              onToggleUser={setUserData}
            ></UserCells>
          </StyledUnit>
          <StyledUnit>
            <StyledDiv>
              <StyledLabel>그룹 채팅방 제목 (필수)</StyledLabel>
              <SearchBar
                inputState={inputStates[0].state}
                onChangeName={setChatName}
                content="그룹 채팅방 이름을 적어주세요"
                height="40"
              ></SearchBar>
            </StyledDiv>
            <div>
              <StyledLabel>선택된 사용자 (3명 이상)</StyledLabel>
              <UserCells
                typed="checked"
                allocatedData={userData[1]}
                subData={userData[0]}
                onToggleUser={setUserData}
                height="275px"
                inputState={inputStates[1].state}
              ></UserCells>
            </div>
          </StyledUnit>
        </StyledMain>
        <StyledBottom>
          <StyledButton onClick={generateChatHandler}>그룹 채팅 만들기</StyledButton>
          <StyledCancelButton onClick={modalCloseHandler}>취소하기</StyledCancelButton>
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
