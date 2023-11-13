import {useState, useEffect} from 'react';
import styled from 'styled-components';
import {StyledLine, StyledSearchBar} from 'pages/UsersList';
import {getUsers} from 'api/users';
import UserItem from './UserItem';
import {isStarBtnClicked} from 'states/atom';
import {useRecoilValue} from 'recoil';
import {authCheck} from 'api/auth';

export interface User {
  id: string;
  name: string;
  picture: string;
}

interface CheckedStates {
  [key: string]: boolean;
}

const UserLists = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchUser, setSearchUser] = useState('');
  const [checkedStates, setCheckedStates] = useState<CheckedStates>({});
  const starBtnClicked = useRecoilValue(isStarBtnClicked);
  const [id, setId] = useState<string>('');

  const getAuth = async () => {
    const res = await authCheck();
    setId(res.user.id);
  };

  useEffect(() => {
    getAuth();
    console.log(id);
  }, []);

  useEffect(() => {
    getUsers().then(allUsers => {
      const newCheckedStates: CheckedStates = {};
      allUsers.forEach((user: User) => {
        const saved = localStorage.getItem(`isChecked-${user.id}`);
        newCheckedStates[user.id] = saved === 'true';
      });
      setCheckedStates(newCheckedStates);
      setUsers(allUsers);
      setFilteredUsers(allUsers);
    });
  }, [starBtnClicked]);

  useEffect(() => {
    Object.keys(checkedStates).forEach(key => {
      localStorage.setItem(`isChecked-${key}`, checkedStates[key].toString());
    });
  }, [checkedStates]);

  //검색 구현
  useEffect(() => {
    filterUsers();
  }, [searchUser]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    filterUsers();
  };

  const filterUsers = () => {
    if (searchUser === '') {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(user => user.name.toLowerCase().includes(searchUser.toLowerCase()));
      setFilteredUsers(filtered);
    }
  };

  return (
    <StyledForm onSubmit={handleSearch}>
      <StyledSearchBar placeholder="사용자를 검색해보세요." onChange={e => setSearchUser(e.target.value)} />{' '}
      <StyledLine />
      <StyledSubTitle>즐겨찾기</StyledSubTitle>
      {filteredUsers.length > 0 ? (
        filteredUsers
          .sort((a, b) => a.name.localeCompare(b.name, 'ko-KR'))
          .filter(user => user.name.toLowerCase())
          .filter(user => checkedStates[user.id])
          .filter(user => user.id !== id)
          .map(user => <UserItem key={user.id} user={user} />)
      ) : (
        <br />
      )}
      <StyledLine />
      <StyledSubTitle>유저목록</StyledSubTitle>
      {filteredUsers.length > 0
        ? filteredUsers
            .sort((a, b) => a.name.localeCompare(b.name, 'ko-KR'))
            .filter(user => user.name.toLowerCase())
            .filter(user => !checkedStates[user.id])
            .filter(user => user.id !== id)
            .map(user => <UserItem key={user.id} user={user} />)
        : '검색된 유저가 없습니다.'}
    </StyledForm>
  );
};

export default UserLists;

const StyledForm = styled.form`
  width: 100%;
`;

export const StyledUsersWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
`;

export const StyledSubTitle = styled.div`
  margin: 0.5rem 0 0.5rem 0rem;
  padding: 1rem 0 0 0;
  font-size: ${props => props.theme.fonts.subtitle5.fontSize};
  font-weight: ${props => props.theme.fonts.subtitle5.fontWeight};
`;

// user container
export const StyledUserContainer = styled.div`
  width: 14rem;
  height: 18rem;
  border: 1px solid ${props => props.theme.colors.gray300};
  display: inline-block;
  cursor: pointer;
  border-radius: 8px;
  margin: 0.5rem 3rem 3rem 0rem;
  vertical-align: top;
  padding: 0.5rem 0.5rem 0 0.5rem;
`;

export const StyledUserProfile = styled.img`
  height: 70%;
  width: 100%;
  background-color: ${props => props.theme.colors.gray300};
  border-radius: 8px 8px 0 0;
`;

export const StyledUserDescription = styled.div`
  padding: 1rem 0.5rem 1rem 0.5rem;
  width: 100%;
  height: calc(30%);
  font-size: ${props => props.theme.fonts.subtitle5.fontSize};
  font-weight: ${props => props.theme.fonts.subtitle5.fontWeight};
`;

export const StyledUserName = styled.div`
  width: 100%;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
`;

export const StyledChatButton = styled.button`
  width: 100%;
  height: 60%;
  margin: 0 1rem 1rem 0;
  border-radius: 8px;
  border: 1px solid ${props => props.theme.colors.blue400};
  color: ${props => props.theme.colors.blue400};

  &:hover {
    border: none;
    background-color: ${props => props.theme.colors.blue700};
    color: ${props => props.theme.colors.blue100};
  }
`;
