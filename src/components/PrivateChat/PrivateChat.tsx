import styled from 'styled-components';
import {theme} from '../../styles/Theme';
import {USER_DEFAULT_IMG} from '../../constant';
import {dummyPrivateRooms} from './dummyPrivateRooms';

interface Message {
  id: string;
  text: string;
  userId: string;
  createdAt: Date;
}

export default function PrivateChat() {
  const lastMessage = dummyPrivateRooms.map(dummyPrivateRoom => dummyPrivateRoom.latestMessage.createdAt);
  console.log(lastMessage);
  // const {createdAt}: Message = lastMessage;
  // console.log(createdAt);
  return (
    <StyledContainer>
      <StyledSubContainer>
        <StyledImg src={USER_DEFAULT_IMG} alt="사용자 프로필 이미지" />
        <StyledTextContainer>
          <StyledTitle>나와의 채팅</StyledTitle>
          <StyledText>마지막으로 적은 텍스트...</StyledText>
        </StyledTextContainer>
      </StyledSubContainer>
      <StyledDate>지금</StyledDate>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  padding: 1rem 0;
  background-color: white;
  cursor: pointer;
  transition: all 0.3s ease-out;
  &:hover {
    background-color: ${theme.colors.blue100};
  }
`;

const StyledSubContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const StyledImg = styled.img`
  width: 4rem;
  height: 4rem;
`;

const StyledTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 0.5rem;
`;

const StyledTitle = styled.h2`
  font-size: ${props => props.theme.fonts.subtitle5.fontSize};
`;

const StyledText = styled.p`
  font-size: ${props => props.theme.fonts.body2.fontSize};
`;

const StyledDate = styled.p`
  margin-top: 0.5rem;
  font-size: ${props => props.theme.fonts.body2.fontSize};
  color: ${props => props.theme.colors.gray600};
`;
