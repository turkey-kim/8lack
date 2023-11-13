import {wholeChatRoom} from 'api/wholeChatRoom';
import {myChatRoom} from 'api/myChatRoom';
import styled from 'styled-components';
import HeaderLayout from './HeaderLayout/HeaderLayout';
import GroupChatRoomsLayout from './GroupChatRoomsLayout/GroupChatRoomsLayout';
import {useCallback, useEffect, useState} from 'react';
import {Chat} from 'types/chatroom.types';
import TabProps from './HeaderLayout/TabButton/TabProps';

const StyledGroupLists = styled.div`
  width: 100%;
  height: 100vh;
`;

const GroupChatList = () => {
  const [searchedGroupChat, setSearchedGroupChat] = useState<string>('');
  // 검색어
  const [filteredGroupChat, setFilteredGroupChat] = useState<Chat[]>([]);
  // 최종적인 검색결과 리스트
  const [allGroupChat, setAllGroupChat] = useState<Chat[]>([]);
  // 모든 그룹채팅방 리스트
  const [tabs, setTabs] = useState<TabProps[]>([
    {label: '가나다 순', selected: true},
    {label: '최근 채팅 순', selected: false},
    {label: '사람 많은 순', selected: false},
    {label: '홀로 있는 방', selected: false},
  ]);
  // 탭 리스트

  const SortUsers = useCallback(
    (groupChats: Chat[]) => {
      const selectedTab = tabs.find(tab => tab.selected === true);
      if (!selectedTab) return groupChats;

      const {label} = selectedTab;
      if (label === '가나다 순') {
        groupChats.sort((prev, cur) => {
          if (prev.name.toLowerCase() > cur.name.toLowerCase()) {
            return 1;
          } else {
            return -1;
          }
        });
      } else if (label === '최근 채팅 순') {
        groupChats.sort((prev, cur) => {
          if (prev.updatedAt > cur.updatedAt) {
            return -1;
          } else {
            return 1;
          }
        });
      } else if (label === '사람 많은 순') {
        groupChats.sort((prev, cur) => {
          if (prev.users.length > cur.users.length) {
            return -1;
          } else {
            return 1;
          }
        });
      } else if (label === '홀로 있는 방') {
        let soloChat = groupChats.filter(cur => cur.users.length <= 1);
        return soloChat;
      }
      return groupChats;
    },
    [tabs],
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allChat = await wholeChatRoom();
        const myChat = await myChatRoom();
        const refinedAllChat: Chat[] = allChat.chats;
        const refinedMyChat: Chat[] = myChat.chats;

        const myChatExcepted = refinedAllChat.filter(allChat => {
          for (let i = 0; i < refinedMyChat.length; i++) {
            if (allChat.id === refinedMyChat[i].id) {
              return false;
            }
          }
          return true;
        });
        const sorted = SortUsers(myChatExcepted);
        setAllGroupChat(sorted);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [SortUsers]);

  const filterUsers = useCallback(() => {
    if (!searchedGroupChat) {
      const sorted = SortUsers(allGroupChat);
      setFilteredGroupChat(sorted.slice());
    } else {
      const filtered = allGroupChat.filter(groupchat =>
        groupchat.name.toLowerCase().includes(searchedGroupChat.toLowerCase()),
      );
      const sorted = SortUsers(filtered);
      setFilteredGroupChat(sorted.slice());
    }
  }, [SortUsers, allGroupChat, searchedGroupChat]);

  useEffect(() => {
    filterUsers();
  }, [allGroupChat, searchedGroupChat, tabs, filterUsers]);

  return (
    <StyledGroupLists>
      <HeaderLayout onSearchGroupChat={setSearchedGroupChat} tabs={tabs} setTabs={setTabs}></HeaderLayout>
      <GroupChatRoomsLayout
        filteredGroupChat={filteredGroupChat}
        onSetGroupChat={setFilteredGroupChat}
      ></GroupChatRoomsLayout>
    </StyledGroupLists>
  );
};

export default GroupChatList;
