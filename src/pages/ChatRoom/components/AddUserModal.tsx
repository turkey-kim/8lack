import React, {useState, useEffect} from 'react';
import Modal from 'components/Modal';
import styled from 'styled-components';
import {inviteChatRoom} from 'api/myChatRoom';
import {User} from 'types/chatroom.types';
import {useRecoilValue} from 'recoil';
import {userInformation} from 'states/atom';
import {useUsersQuery} from 'hooks/useUsersQuery';

interface IAddUserModal {
  chatId: string;
  onClose: () => void;
}

const AddUserModal = ({chatId, onClose}: IAddUserModal) => {
  const myInfo = useRecoilValue(userInformation);
  const {data: users} = useUsersQuery();
  const [userList, setUserList] = useState<Map<string, User>>(new Map());
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  useEffect(() => {
    if (users) {
      const filteredUsers: User[] = (users as User[]).filter(user => user.id !== myInfo.id);
      const usersMap = new Map<string, User>(filteredUsers.map(user => [user.id, user]));
      setUserList(usersMap);
    }
  }, [users, myInfo]);

  const handleUserSelect = (userId: string) => {
    setSelectedUsers(prevSelectedUsers => {
      return prevSelectedUsers.includes(userId)
        ? prevSelectedUsers.filter(id => id !== userId)
        : [...prevSelectedUsers, userId];
    });
  };

  const handleInviteUsers = async () => {
    if (selectedUsers.length > 0) {
      await inviteChatRoom(chatId, selectedUsers);
      onClose();
    }
  };

  console.log(userList);

  return (
    <Modal title="대화상대 추가" onClose={onClose} onSubmit={handleInviteUsers} buttonText="초대하기">
      <StyledUserList>
        {Array.from(userList.values()).map(user => (
          <StyledUserItem key={user.id} onClick={() => handleUserSelect(user.id)}>
            {user.name}
            {selectedUsers.includes(user.id) && <span>선택됨</span>}
          </StyledUserItem>
        ))}
      </StyledUserList>
    </Modal>
  );
};

export default AddUserModal;

const StyledUserList = styled.ul`
  list-style: none;
  padding: 0;
  max-height: 300px;
  overflow-y: auto;
`;

const StyledUserItem = styled.li`
  padding: 10px;
  border-bottom: 1px solid #ccc;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;
