import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {authHeaders} from 'api/auth';
import {useSetRecoilState} from 'recoil';
import {chatRoomState} from 'states/chatRoomState';
import {ChatRoomCreateRequest, ChatRoomResponse} from './ChatRoomForm.types';

const ChatRoomForm: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [userIds, setUserIds] = useState(''); // 문자열 상태로 관리
  const [isPrivate, setIsPrivate] = useState(false);

  // FIXME: 소켓 api 수정되면 지울 것
  const setChatRoom = useSetRecoilState(chatRoomState);

  const handleCreateChatRoom = async () => {
    const requestBody: ChatRoomCreateRequest = {
      name,
      users: userIds.split(',').map(user => user.trim()),
      isPrivate,
    };

    try {
      const response = await fetch('https://fastcampus-chat.net/chat', {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData: ChatRoomResponse = await response.json();
      setChatRoom(currentState => responseData);
      console.log('Chat room created:', responseData);

      navigate(`/chat/${responseData.id}`);
    } catch (error) {
      console.error('Error creating chat room:', error);
    }
  };

  return (
    <div>
      <h1>채팅방 생성하기</h1>
      <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="채팅방 이름" />
      <input type="text" value={userIds} onChange={e => setUserIds(e.target.value)} placeholder="유저 id" />
      <label>
        <input type="checkbox" checked={isPrivate} onChange={e => setIsPrivate(e.target.checked)} />
        비공개 채팅방
      </label>
      <button onClick={handleCreateChatRoom}>생성</button>
    </div>
  );
};

export default ChatRoomForm;
