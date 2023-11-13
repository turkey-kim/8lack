import styled from 'styled-components';
import {theme} from 'styles/Theme';
import UserCell from './UserCell';
import {User} from 'types/chatroom.types';
import {useEffect, useState} from 'react';

interface UserCellsProps {
  typed: string;
  height: string;
  $marginTop?: string;
  $inputState?: string;
  filteredUserData?: User[];
  allocatedData: User[];
  subData: User[];
  onToggleUser: React.Dispatch<React.SetStateAction<[User[], User[]]>>;
  searchUserData?: string;
}

const UserCells = (props: UserCellsProps) => {
  const [filteredUserData, setFilteredUserData] = useState<User[]>([]);
  const {searchUserData, allocatedData} = props;

  useEffect(() => {
    filterUsers();
  }, [searchUserData, allocatedData]);

  const filterUsers = () => {
    if (!searchUserData) {
      setFilteredUserData(allocatedData);
    } else {
      const filtered = allocatedData.filter(user => user.name.toLowerCase().includes(searchUserData.toLowerCase()));
      setFilteredUserData(filtered);
    }
  };

  return (
    <StyledUserContainer //
      height={props.height}
      $marginTop={props.$marginTop}
      $inputState={props.$inputState}
    >
      {searchUserData && filteredUserData
        ? filteredUserData.map(userData => (
            <UserCell
              typed={props.typed}
              key={userData.id}
              allocatedData={allocatedData}
              subData={props.subData}
              user={userData}
              onToggleUser={props.onToggleUser}
            ></UserCell>
          ))
        : allocatedData.map(userData => (
            <UserCell
              typed={props.typed}
              key={userData.id}
              allocatedData={allocatedData}
              subData={props.subData}
              user={userData}
              onToggleUser={props.onToggleUser}
            ></UserCell>
          ))}
    </StyledUserContainer>
  );
};

export default UserCells;

const StyledUserContainer = styled.div<Pick<UserCellsProps, 'height' | '$marginTop' | '$inputState'>>`
  width: 100%;
  height: ${props => props.height};
  margin-top: ${props => (props.$marginTop ? props.$marginTop : '')};

  background-color: ${theme.colors.gray100};
  border: 0.063rem solid
    ${props => {
      if (props.$inputState === 'error') {
        return theme.colors.error;
      } else if (props.$inputState === 'success') {
        return theme.colors.success;
      } else {
        return theme.colors.gray400;
      }
    }};
  border-radius: 0.25rem;
  overflow: scroll;
`;
