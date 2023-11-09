import styled from 'styled-components';
import HeaderLayout from '../components/HeaderLayout/HeaderLayout';
import ChatRooms from '../components/ChatRooms/ChatRooms';

const StyledGroupLists = styled.div`
  width: 100%;
  height: 100vh;
`;

const GroupChatList = () => {
  return (
    <StyledGroupLists>
      <HeaderLayout></HeaderLayout>
      <ChatRooms></ChatRooms>
    </StyledGroupLists>
  );
};

export default GroupChatList;
