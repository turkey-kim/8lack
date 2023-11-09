import {useEffect} from 'react';
import {useRecoilState} from 'recoil';
import io from 'socket.io-client';
import {authHeaders} from 'api/auth';
import {chatSocketState} from 'states/chatSocketAtom';

export const useChatSocket = (chatId: string) => {
  const [socket, setSocket] = useRecoilState(chatSocketState);

  useEffect(() => {
    // 웹소켓 인스턴스 생성 및 이벤트 리스너 설정
    const newSocket = io(`https://fastcampus-chat.net/chat?chatId=${chatId}`, {
      extraHeaders: authHeaders,
    });
    // setSocket(newSocket);

    // 컴포넌트가 unmount될 때 웹소켓 인스턴스 정리
    return () => {
      newSocket.close();
      // setSocket(null);
    };
  }, [chatId, setSocket]);

  return socket;
};
