import styled from 'styled-components';
import {theme} from 'styles/Theme';
import UserCell from './UserCell';
import {User} from '../../types/chatroom.types';

interface UserCellsProps {
  height: string;
  marginTop?: string;
  allocatedData?: User[];
  subData?: User[];
  onToggleUser?: React.Dispatch<React.SetStateAction<[User[], User[]]>>;
}

const UserCells = (props: UserCellsProps) => {
  return (
    <StyledUserContainer //
      height={props.height}
      marginTop={props.marginTop}
    >
      {props.allocatedData?.map(user => (
        <UserCell key={user.id} user={user}></UserCell>
      ))}
    </StyledUserContainer>
  );
};

export default UserCells;

const StyledUserContainer = styled.div<UserCellsProps>`
  width: 100%;
  height: ${props => props.height};
  margin-top: ${props => (props.marginTop ? props.marginTop : '')};

  background-color: ${theme.colors.gray100};
  border: 1px solid ${theme.colors.gray400};
  border-radius: 4px;
  overflow: scroll;
`;
