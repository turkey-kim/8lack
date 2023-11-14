import {useState} from 'react';
import styled from 'styled-components';
import {theme} from 'styles/Theme';
import {FaAngleDown} from 'react-icons/fa';
import {User} from 'types/chatroom.types';

interface GroupChatParticipantProps {
  children: string;
  users: User[];
}

const GroupChatParticipant = (props: GroupChatParticipantProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleHandler = () => {
    setIsOpen(prev => !prev);
  };
  return (
    <StyledContainer>
      <StyledMemberListBtn onFocus={toggleHandler} onBlur={toggleHandler}>
        {props.children}
        <StyledAngleDown></StyledAngleDown>
      </StyledMemberListBtn>
      {isOpen && (
        <StyledUl>
          {props.users.map(user => (
            <StyledLi>{user.username}</StyledLi>
          ))}
        </StyledUl>
      )}
    </StyledContainer>
  );
};

export default GroupChatParticipant;

const StyledContainer = styled.div`
  position: relative;
`;

const StyledMemberListBtn = styled.button`
  font-size: ${theme.fonts.body1.fontSize};
  font-weight: ${theme.fonts.body1.fontWeight};
  line-height: ${theme.fonts.body1.lineHeight};

  color: ${theme.colors.gray700};
  display: flex;
  gap: 0.125rem;
  align-items: center;
  border-radius: 0.25rem;

  transition: 0.5s;

  &:hover {
    background-color: ${theme.colors.blue200};
  }

  &:focus {
    background-color: ${theme.colors.blue200};
  }
`;

const StyledAngleDown = styled(FaAngleDown)`
  color: ${theme.colors.gray600};
`;

const StyledUl = styled.ul`
  position: absolute;
  z-index: 5;

  display: flex;
  flex-direction: column;

  width: 100%;
  max-height: 128px;
  background-color: ${theme.colors.white};

  border: 0.063rem solid ${theme.colors.blue500};
  border-radius: 0.25rem;
  overflow-y: scroll;
  overflow-x: hidden;
  box-shadow: ${theme.shadows.shadow1.shadow};
`;

const StyledLi = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${theme.colors.white};
  width: 100%;
  height: 2rem;
  border-radius: 0.25rem;

  font-size: ${theme.fonts.body2.fontSize};
  font-weight: ${theme.fonts.body2.fontWeight};
  line-height: ${theme.fonts.body2.lineHeight};

  color: ${theme.colors.gray700};
`;
