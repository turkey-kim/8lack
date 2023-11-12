import styled from 'styled-components';
import {theme} from '../../styles/Theme';
import {format, register} from 'timeago.js';
import koLocale from 'timeago.js/lib/lang/ko';

register('ko', koLocale);

export interface Chat {
  id: string;
  name: string;
  users: User[]; // 속한 유저 id
  isPrivate: boolean;
  latestMessage: Message | null;
  updatedAt: Date;
}

interface User {
  id: string;
  name: string;
  picture: string;
}

interface Message {
  id: string;
  text: string;
  userId: string;
  createdAt: Date;
}

interface Props {
  key: string;
  data: Chat;
}

export default function PrivateChat(props: Props) {
  const {id, name, updatedAt, latestMessage, users} = props.data;

  return (
    <StyledContainer>
      <StyledSubContainer>
        <StyledImg src={users[1].picture} alt="사용자 프로필 이미지" />
        <StyledTextContainer>
          <StyledTitle>{users[1].name}</StyledTitle>
          <StyledText>{latestMessage?.text}</StyledText>
        </StyledTextContainer>
      </StyledSubContainer>
      <StyledDiv>
        <StyledDate>{format(updatedAt, 'ko')}</StyledDate>
        {latestMessage === null ? '' : <StyledLatestMessage />}
      </StyledDiv>
    </StyledContainer>
  );
}

export const StyledContainer = styled.li`
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

export const StyledSubContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

export const StyledImg = styled.img`
  width: 4rem;
  height: 4rem;
`;

export const StyledTextContainer = styled.div`
  width: 11.25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 0.5rem;
`;

export const StyledTitle = styled.h2`
  font-size: ${props => props.theme.fonts.subtitle5.fontSize};
`;

export const StyledText = styled.p`
  font-size: ${props => props.theme.fonts.body2.fontSize};
`;

export const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
`;

export const StyledDate = styled.p`
  margin-top: 0.5rem;
  font-size: ${props => props.theme.fonts.body2.fontSize};
  color: ${props => props.theme.colors.gray600};
`;

export const StyledLatestMessage = styled.div`
  margin-bottom: 0.625rem;
  width: 0.875rem;
  height: 0.875rem;
  border-radius: 50%;
  background-color: ${theme.colors.pink800};
`;
