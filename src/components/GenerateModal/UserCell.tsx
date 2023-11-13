import styled from 'styled-components';
import {theme} from 'styles/Theme';
import {User} from 'types/chatroom.types';

interface UserCellProps {
  typed: string;
  user: User;
  allocatedData: User[];
  subData: User[];
  onToggleUser: React.Dispatch<React.SetStateAction<[User[], User[]]>>;
}

const UserCell = (props: UserCellProps) => {
  const isCheckedHandler: React.ChangeEventHandler = e => {
    const newAllocUser = props.allocatedData.slice().filter(arg => arg.id !== props.user.id);
    const newSubUser = props.subData.slice();
    newSubUser.push(props.user);

    if (props.typed === 'checked') {
      props.onToggleUser([newSubUser, newAllocUser]);
    } else {
      props.onToggleUser([newAllocUser, newSubUser]);
    }
  };

  return (
    <StyledCellContainer>
      <StyledPrf>
        <StyledPrfImg src={props.user.picture} />
        <StyledPrfName>{props.user.name}</StyledPrfName>
      </StyledPrf>
      <input type="checkbox" onChange={isCheckedHandler} checked={props.typed ? true : false} />
    </StyledCellContainer>
  );
};

export default UserCell;

const StyledCellContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.25rem 1rem 0.25rem 0.25rem;
  background-color: ${theme.colors.white};
  border-bottom: 0.063rem solid ${theme.colors.gray400};
`;

const StyledPrf = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StyledPrfImg = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
`;

const StyledPrfName = styled.span`
  font-size: ${theme.fonts.body2.fontSize};
  font-weight: ${theme.fonts.subtitle5.fontWeight};
  line-height: ${theme.fonts.body2.lineHeight};
`;
