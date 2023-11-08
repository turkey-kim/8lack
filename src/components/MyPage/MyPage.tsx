import styled from 'styled-components';
import {useState, useEffect} from 'react';
import Modal from 'react-modal';
import {StyledMainTitle, StyledLine} from '../../pages/Users';
import {AiOutlineClose} from 'react-icons/ai';

// 사진과 이름 수정 페이지

interface UpdateUser {
  name?: string; // 새로운 표시 이름
  picture?: string; // 사용자 프로필 이미지(url or base64)
}

interface UpdateStateMessage {
  message: string;
}

//  curl https://fastcampus-chat.net/user
//   \ -X 'PATCH'
//   \ -H 'Authorization: Bearer <accessToken>'

//로직 : accessToken

interface AppModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40%',
    height: '50%',
    borderRadius: '8px',
    overflow: 'hidden',
  },
};

const MyPage = ({isOpen, onRequestClose}: AppModalProps) => {
  const [editing, setEditing] = useState<boolean>(false);

  const toggleEditing = () => {
    setEditing(prev => !prev);
  };

  return (
    <StyledPageContainer>
      <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
        <StyledTitle>
          <StyledMainTitle>내 정보 수정</StyledMainTitle>
          <AiOutlineClose onClick={onRequestClose} style={{cursor: 'pointer'}} />
        </StyledTitle>
        <StyledLine />
        <StyledPicContainer>{/* 사진 위치 */}</StyledPicContainer>
        <StyledContainer>
          <StyledDiv>이름</StyledDiv>
          <StyledNextDiv>김ㅇㅇ</StyledNextDiv>
          <StyledDiv>아이디</StyledDiv>
          <StyledNextDiv>momomo</StyledNextDiv>
        </StyledContainer>
        <StyledLine />
        <StyledButtonContainer>
          <StyledEditButton onClick={toggleEditing}>내 정보 수정</StyledEditButton>
          <StyledCancelButton onClick={onRequestClose}>닫기</StyledCancelButton>
        </StyledButtonContainer>
      </Modal>
    </StyledPageContainer>
  );
};

export default MyPage;

const StyledPageContainer = styled.div`
  width: 100%;
  padding: 4rem 4rem;
`;

const StyledPicContainer = styled.div`
  width: 18rem;
  height: 18rem;
  background-color: ${props => props.theme.colors.gray300};
  display: inline-block;
  cursor: pointer;
  border-radius: 8px;
  vertical-align: top;
  margin-right: 3rem;
  margin-top: 1rem;
  padding: 1rem;
`;

const StyledDiv = styled.div`
  display: block;
  cursor: pointer;
  border-radius: 8px;
  margin: 0.5rem 3rem 1rem 0;
  padding: 1rem;
  font-size: ${props => props.theme.fonts.subtitle5.fontSize};
  font-weight: ${props => props.theme.fonts.subtitle5.fontWeight};
`;

const StyledNextDiv = styled.div`
  display: block;
  cursor: pointer;
  border-radius: 8px;
  margin: -1rem 3rem 1rem 0;
  padding-left: 1rem;
`;

const StyledContainer = styled.div`
  width: 18rem;
  height: 18rem;
  display: inline-block;
  cursor: pointer;
  border-radius: 8px;
  vertical-align: top;
  margin: 1rem 3rem 1rem 0;
  padding: 1rem;
`;

const StyledTitle = styled.div`
  width: 100%;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
`;

const StyledButtonContainer = styled.div`
  display: block;
  cursor: pointer;
  border-radius: 8px;
  margin: 0.5rem 3rem 3rem 0rem;
  vertical-align: top;
  text-align: right;
`;

const StyledEditButton = styled.button`
  border-radius: 8px;
  padding: 0.8rem;
  border: none;
  background-color: ${props => props.theme.colors.blue700};
  color: ${props => props.theme.colors.blue100};
  margin-right: 2rem;

  &:hover {
    background-color: ${props => props.theme.colors.blue100};
    color: ${props => props.theme.colors.blue700};
  }
`;

const StyledCancelButton = styled.button`
  border-radius: 8px;
  padding: 0.8rem;
  border: none;
  background-color: ${props => props.theme.colors.gray300};
  color: ${props => props.theme.colors.gray700};

  &:hover {
    border: none;
    background-color: ${props => props.theme.colors.gray700};
    color: ${props => props.theme.colors.gray300};
  }
`;
