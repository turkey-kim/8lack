import styled from 'styled-components';
import {theme} from 'styles/Theme';
import UserCell from './UserCell';
import {User} from '../../types/chatroom.types';

interface UserCellsProps {
  typed: string;
  height: string;
  marginTop?: string;
  allocatedData: User[];
  subData: User[];
  onToggleUser: React.Dispatch<React.SetStateAction<[User[], User[]]>>;
}

const UserCells = (props: UserCellsProps) => {
  // 1. 체크박스에 상태 심기
  // 2. 체크 되면
  return (
    <StyledUserContainer //
      height={props.height}
      marginTop={props.marginTop}
    >
      {props.allocatedData.map(userData => (
        <UserCell
          typed={props.typed}
          key={userData.id}
          allocatedData={props.allocatedData}
          subData={props.subData}
          user={userData}
          onToggleUser={props.onToggleUser}
        ></UserCell>
      ))}
    </StyledUserContainer>
  );
};

export default UserCells;

const StyledUserContainer = styled.div<Pick<UserCellsProps, 'height' | 'marginTop'>>`
  width: 100%;
  height: ${props => props.height};
  margin-top: ${props => (props.marginTop ? props.marginTop : '')};

  background-color: ${theme.colors.gray100};
  border: 1px solid ${theme.colors.gray400};
  border-radius: 4px;
  overflow: scroll;
`;
