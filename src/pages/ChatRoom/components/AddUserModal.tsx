import React, {useState, useEffect} from 'react';
import Modal from 'components/Modal';
import styled from 'styled-components';
import {inviteChatRoom} from 'api/myChatRoom';
import {User} from 'types/chatroom.types';
import {useRecoilValue} from 'recoil';
import {userInformation} from 'states/atom';
import {useUsersQuery} from 'hooks/useUsersQuery';
import {theme} from 'styles/Theme';

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

  const handleCheckboxChange = (userId: string) => {
    setSelectedUsers(prevSelectedUsers => {
      if (prevSelectedUsers.includes(userId)) {
        return prevSelectedUsers.filter(id => id !== userId);
      } else {
        return [...prevSelectedUsers, userId];
      }
    });
  };

  const handleInviteUsers = async () => {
    if (selectedUsers.length > 0) {
      await inviteChatRoom(chatId, selectedUsers);
      onClose();
    }
  };

  return (
    <Modal title="대화상대 추가" onClose={onClose} onSubmit={handleInviteUsers} buttonText="초대하기">
      <StyledUserList>
        {Array.from(userList.values()).map(user => (
          <StyledUserItem key={user.id} onClick={() => handleCheckboxChange(user.id)}>
            <StyledPrf>
              <StyledPrfImg src={user.picture} />
              <StyledPrfName>{user.name}</StyledPrfName>
            </StyledPrf>
            <input
              type="checkbox"
              checked={selectedUsers.includes(user.id)}
              onChange={() => handleCheckboxChange(user.id)}
            />
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
  width: 100%;
  max-height: 400px;
  overflow-y: auto;
`;

const StyledUserItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 16px 4px 4px;
  background-color: ${theme.colors.white};
  border-bottom: 1px solid ${theme.colors.gray400};
  cursor: pointer;

  &:hover {
    background-color: ${theme.colors.blue100};
  }
`;

const StyledPrf = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StyledPrfImg = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;

const StyledPrfName = styled.span`
  font-size: ${theme.fonts.body2.fontSize};
  font-weight: ${theme.fonts.subtitle5.fontWeight};
  line-height: ${theme.fonts.body2.lineHeight};
`;
