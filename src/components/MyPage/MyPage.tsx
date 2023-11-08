import styled from 'styled-components';
import {useState, useEffect} from 'react';
import Modal from 'react-modal';
import {StyledMainTitle, StyledLine} from '../../pages/Users';
import {AiOutlineClose} from 'react-icons/ai';
import {authCheck, patchAuth} from '../../api/auth';

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

export interface AppModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    height: '55%',
    borderRadius: '8px',
    overflow: 'auto',
  },
};

const MyPage = ({isOpen, onRequestClose}: AppModalProps) => {
  const [editing, setEditing] = useState<boolean>(false);
  const [id, setId] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [picture, setPicture] = useState<string>('');

  //정보 가져오기
  const getAuth = async () => {
    const res = await authCheck();
    setId(res.user.id);
    setName(res.user.name);
    setPicture(res.user.picture);
    console.log(id, name, picture);
  };

  const toggleEditing = () => {
    getAuth();
    setEditing(prev => !prev);
  };

  const toggleUpdating = async () => {
    setEditing(prev => !prev);
    try {
      const response = await patchAuth(name, picture);
      console.log(response);
    } catch (error) {
      console.error('업데이트 실패:', error);
    }
    console.log(id, name, picture);
  };

  return (
    <>
      {editing ? (
        <Modal isOpen={isOpen} style={customStyles}>
          <StyledPageContainer>
            <StyledTitle>
              <StyledMainTitle>내 정보 수정</StyledMainTitle>
              <AiOutlineClose onClick={onRequestClose} style={{cursor: 'pointer'}} />
            </StyledTitle>
            <StyledLine />
            <StyledPicContainer>{/* 사진  */}</StyledPicContainer>
            <StyledContainer>
              <StyledDiv>이름</StyledDiv>
              <StyledInput type="text" value={name ?? ''} onChange={e => setName(e.target.value)} />
              <StyledDiv>아이디</StyledDiv>
              <StyledNextDiv>{id}</StyledNextDiv>
              <StyledDiv>이미지</StyledDiv>
              <StyledNextDiv>
                <StyledImgDiv>이미지 변경</StyledImgDiv>
                <StyledImgDiv>이미지 삭제</StyledImgDiv>
              </StyledNextDiv>
            </StyledContainer>
            <StyledLine />
            <StyledButtonContainer>
              <StyledEditButton onClick={toggleUpdating}>수정 완료</StyledEditButton>
              <StyledCancelButton onClick={onRequestClose}>수정 취소</StyledCancelButton>
            </StyledButtonContainer>
          </StyledPageContainer>
        </Modal>
      ) : (
        <Modal isOpen={isOpen} style={customStyles}>
          <StyledPageContainer>
            <StyledTitle>
              <StyledMainTitle>내 정보</StyledMainTitle>
              <AiOutlineClose onClick={onRequestClose} style={{cursor: 'pointer'}} />
            </StyledTitle>
            <StyledLine />
            <StyledPicContainer></StyledPicContainer>
            {/* src=`${picture}` */}
            {/* 초기값으로 사진 주기 */}
            <StyledContainer>
              <StyledDiv>이름</StyledDiv>
              <StyledNextDiv>{name}</StyledNextDiv>
              <StyledDiv>아이디</StyledDiv>
              <StyledNextDiv>{id}</StyledNextDiv>
            </StyledContainer>
            <StyledLine />
            <StyledButtonContainer>
              <StyledEditButton onClick={toggleEditing}>내 정보 수정</StyledEditButton>
              <StyledCancelButton onClick={onRequestClose}>닫기</StyledCancelButton>
            </StyledButtonContainer>
          </StyledPageContainer>
        </Modal>
      )}
    </>
  );
};

export default MyPage;

const StyledPageContainer = styled.div`
  width: 100%;
  padding: 1rem 1rem;
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
  margin: 0.5rem 3rem 0.5rem 0;
  padding: 1rem;
  font-size: ${props => props.theme.fonts.subtitle5.fontSize};
  font-weight: ${props => props.theme.fonts.subtitle5.fontWeight};
`;

export const StyledNextDiv = styled.div`
  display: block;
  cursor: pointer;
  border-radius: 8px;
  margin: -1rem 3rem 1rem 0;
  padding-left: 1rem;
  width: 100%;
`;

export const StyledImgDiv = styled.p`
  font-size: ${props => props.theme.fonts.body2.fontSize};
  font-weight: ${props => props.theme.fonts.body2.fontWeight};
  color: ${props => props.theme.colors.blue500};
  display: inline;
  cursor: pointer;
  margin: 0 1.5rem 1rem 0;

  &:hover {
    color: ${props => props.theme.colors.blue700};
    text-decoration: underline;
  }
`;

const StyledContainer = styled.div`
  width: 18rem;
  height: 18rem;
  display: inline-block;
  cursor: pointer;
  border-radius: 8px;
  vertical-align: top;
  margin: 0 0 2rem 0;
  padding: 1rem;
`;

const StyledTitle = styled.div`
  width: 100%;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledButtonContainer = styled.div`
  display: block;
  cursor: pointer;
  border-radius: 8px;
  margin: 1rem 3rem 0rem 0rem;
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

const StyledInput = styled.input`
  border-radius: 8px;
  padding: 0.5rem;
  margin: -2rem 0 0 0.8rem;
  border: 1px solid ${props => props.theme.colors.gray300};
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.blue700};
  }
`;
