import ReactDOM from 'react-dom';
import SearchBar from 'pages/GroupChatList/HeaderLayout/SearchBar';
import {MdClose} from 'react-icons/md';
import styled from 'styled-components';
import {theme} from 'styles/Theme';
import UserCells from './UserCells';
import {User} from 'types/chatroom.types';
import {useEffect, useState} from 'react';
import {getUsers} from 'api/users';
import {makeChatRoom} from 'api/myChatRoom';
import {useRecoilValue} from 'recoil';
import {userInformation} from 'states/atom';
import {useNavigate, useParams} from 'react-router';
import {inviteChatRoom} from 'api/myChatRoom';

interface ModalProps {
  onToggleModal: React.Dispatch<boolean>;
  headline: string;
  label1: string;
  optionLabel?: string;
  optionInput: boolean;
  label2: string;
  primaryBtn: string;
}

type InputStates = [{name: 'chatName'; state: string}, {name: 'pickedUser'; state: string}];

const GenerateModal = (props: ModalProps) => {
  const [userData, setUserData] = useState<[User[], User[]]>([[], []]);
  // [선택가능한 유저 배열, 선택된유저 배열]
  const [searchUserData, setSearchUserData] = useState('');
  // 검색어

  const [chatName, setChatName] = useState<string>('');
  // 방이름

  const [inputStates, setInputStates] = useState<InputStates>([
    {name: 'chatName', state: 'default'},
    {name: 'pickedUser', state: 'default'},
  ]);

  const navigate = useNavigate();
  const {chatId} = useParams();
  const myInfo = useRecoilValue(userInformation);

  useEffect(() => {
    // 사용자 불러오기
    getUsers().then(res => {
      const filtered = (res as User[]).slice().filter(val => val.id !== myInfo.id);
      setUserData([filtered, []]);
    });
  }, [myInfo.id]);

  const modalCloseHandler = () => {
    props.onToggleModal(false);
  };

  const actionHandler = () => {
    if (props.headline === '그룹 채팅방 만들기') {
      if (chatName.trim().length === 0) {
        // 채팅방 이름 0자 예외 조건 처리
        let temp: InputStates = [...inputStates];
        temp[0].state = 'error';
        setInputStates(temp);
        alert('그룹 채팅방 이름을 입력해주세요.');
        return;
      }

      if (userData[1].length < 2) {
        // 자신을 포함 2명 이하 예외 조건 처리
        let temp: InputStates = [...inputStates];
        temp[1].state = 'error';
        setInputStates(temp);
        alert('자신을 제외하고 2명 이상을 선택해야 그룹 채팅방을 만들 수 있습니다.');
        return;
      }

      const users = userData[1].slice().map(val => val.id); // 아이디만 있는 배열로 바꾸기
      makeChatRoom(chatName, users, false).then(res => {
        let chatId = res.id;
        alert(`${chatName} 방이 생성되었습니다.`);
        navigate(`/chat/${chatId}`);
      });
      // 생성

      modalCloseHandler(); // 모달 닫기
    }

    if (props.headline === '그룹 채팅방에 초대하기') {
      if (userData[1].length === 0) {
        // 한 명도 초대 안 할 시
        let temp: InputStates = [...inputStates];
        temp[1].state = 'error';
        setInputStates(temp);
        alert('초대할 사용자가 없습니다.');
        return;
      }

      const users = userData[1].slice().map(val => val.id); // 아이디만 있는 배열로 바꾸기
      if (chatId) {
        inviteChatRoom(chatId, users);
      } else {
        alert('알 수 없는 이유로 채팅방을 생성할 수 없습니다.');
      }

      modalCloseHandler();
    }
  };

  return ReactDOM.createPortal(
    <Bundler>
      <BackDrop onClick={modalCloseHandler} />
      <StyledModalContainer>
        <StyledHeader>
          <StyledH4>{props.headline}</StyledH4>
          <StyledCloseIcon onClick={modalCloseHandler}></StyledCloseIcon>
        </StyledHeader>
        <StyledMain>
          <StyledUnit>
            <StyledLabel>{props.label1}</StyledLabel>
            <SearchBar content="사용자를 검색해보세요" height="40" onSearchName={setSearchUserData}></SearchBar>
            <UserCells
              height="312px"
              $marginTop="8px"
              typed=""
              allocatedData={userData[0]}
              subData={userData[1]}
              onToggleUser={setUserData}
              searchUserData={searchUserData}
            ></UserCells>
          </StyledUnit>
          <StyledUnit>
            {props.optionInput && (
              <StyledDiv>
                <StyledLabel>{props.optionLabel}</StyledLabel>
                <SearchBar
                  $inputState={inputStates[0].state}
                  onChangeName={setChatName}
                  content="그룹 채팅방 이름을 적어주세요"
                  height="40"
                ></SearchBar>
              </StyledDiv>
            )}
            <div>
              <StyledLabel>{props.label2}</StyledLabel>
              <UserCells
                typed="checked"
                allocatedData={userData[1]}
                subData={userData[0]}
                onToggleUser={setUserData}
                height={props.optionInput ? '275px' : '360px'}
                $inputState={inputStates[1].state}
              ></UserCells>
            </div>
          </StyledUnit>
        </StyledMain>
        <StyledBottom>
          <StyledButton onClick={actionHandler}>{props.primaryBtn}</StyledButton>
          <StyledCancelButton onClick={modalCloseHandler}>취소하기</StyledCancelButton>
        </StyledBottom>
      </StyledModalContainer>
    </Bundler>,
    document.getElementById('modal-root') as HTMLElement,
  );
};

export default GenerateModal;

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
  z-index: 1011;
`;

const StyledModalContainer = styled.div`
  width: 46.688rem;
  height: 35.125rem;
  border-radius: 0.5rem;

  background-color: ${theme.colors.white};

  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1011;

  margin: auto;
  box-shadow: ${theme.shadows.shadow3};
`;

const StyledHeader = styled.div`
  height: 4.375rem;
  display: flex;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  border-bottom: 0.063rem solid ${theme.colors.gray400};
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
  padding: 1rem 1.5rem;
  gap: 1.5rem;
`;

const StyledUnit = styled.div`
  width: 21.125rem;
  height: 23.75rem;
`;

const StyledLabel = styled.label`
  font-size: ${theme.fonts.body2.fontSize};
  font-weight: ${theme.fonts.subtitle5.fontWeight};
  line-height: ${theme.fonts.body2.lineHeight};

  display: block;
  margin-bottom: 0.375rem;
`;

const StyledBottom = styled.div`
  position: absolute;
  bottom: 0;

  width: 100%;
  height: 4.5rem;
  border-top: 0.063rem solid ${theme.colors.gray400};

  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 1.5rem;

  gap: 0.5rem;
`;

const StyledButton = styled.button`
  height: 3rem;
  padding: 0.75rem 2rem;
  border-radius: 0.75rem;

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
  margin-bottom: 1rem;
`;
