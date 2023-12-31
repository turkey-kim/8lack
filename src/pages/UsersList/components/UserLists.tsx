import {useState, useEffect} from 'react';
import styled from 'styled-components';
import {StyledLine, StyledSearchBar} from 'pages/UsersList';
import {getUsers} from 'api/users';
import UserItem from './UserItem';
import {isStarBtnClicked} from 'states/atom';
import {useRecoilValue} from 'recoil';
import LoadingCircle from 'components/LoadingCircle/LoadingCircle';
import {StyledInputContainer, StyledSearchIcon} from 'pages/GroupChatList/HeaderLayout/SearchBar';
import NoSearchResult from './../../../components/NoSearchResult/index';
import {useUid} from 'hooks/useUid';

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
  const {uid, isLoading} = useUid();
  const myId = uid;
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getUsers().then(allUsers => {
      const newCheckedStates: CheckedStates = {};
      allUsers.forEach((user: User) => {
        const saved = localStorage.getItem(`isChecked-${user.id}`);
        newCheckedStates[user.id] = saved === 'true' || false;
      });

      setCheckedStates(newCheckedStates);
      setUsers(allUsers);
      setFilteredUsers(allUsers);
      setIsLoaded(true);
    });
  }, [starBtnClicked]);

  useEffect(() => {
    Object.keys(checkedStates).forEach(key => {
      localStorage.setItem(`isChecked-${key}`, checkedStates[key].toString());
    });
  }, [checkedStates]);

  useEffect(() => {
    filterUsers();
  }, [searchUser]);

  const handleSearch = () => {
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

  if (isLoading) return <LoadingCircle height={'calc(100vh - 17.75rem)'} />;

  return (
    <>
      <StyledForm
        onSubmit={e => {
          e.preventDefault();
          handleSearch();
        }}
        onKeyPress={e => {
          if (e.key === 'Enter') {
            e.preventDefault();
          }
        }}
      >
        <StyledInputContainer>
          <StyledSearchIcon />
          <StyledSearchBar placeholder="사용자를 검색해보세요." onChange={e => setSearchUser(e.target.value)} />
        </StyledInputContainer>
        <StyledLine />
        <StyledSubTitle>즐겨찾기</StyledSubTitle>
        {filteredUsers.length > 0 ? (
          filteredUsers
            .sort((a, b) => a.name.localeCompare(b.name, 'ko-KR'))
            .filter(user => user.name.toLowerCase())
            .filter(user => checkedStates[user.id])
            .filter(user => user.id !== myId)
            .map(user => <UserItem key={user.id} user={user} />)
        ) : (
          <br />
        )}
        <StyledLine />
        <StyledSubTitle>유저목록</StyledSubTitle>
        {filteredUsers.length > 0 ? (
          filteredUsers
            .sort((a, b) => a.name.localeCompare(b.name, 'ko-KR'))
            .filter(user => user.name.toLowerCase())
            .filter(user => !checkedStates[user.id])
            .filter(user => user.id !== myId)
            .map(user => <UserItem key={user.id} user={user} />)
        ) : isLoaded ? (
          <NoSearchResult text="검색하신 사용자는 존재하지 않습니다." />
        ) : (
          <LoadingCircle height={'calc(100vh - 17.75rem)'} />
        )}
      </StyledForm>
    </>
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
