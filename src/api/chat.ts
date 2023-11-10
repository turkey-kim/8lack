import {authHeaders} from './auth';

export const handleChatParticipate = async (chatId: string) => {
  try {
    const response = await fetch(`https://fastcampus-chat.net/chat/participate`, {
      method: 'PATCH',
      headers: authHeaders,
      body: JSON.stringify({chatId}),
    });

    if (!response.ok) {
      throw new Error('Failed to join chat room');
    }

    return await response.json();
  } catch (error) {
    console.error('Error joining chat room:', error);
  }
};

export const handleChatLeave = async (chatId: string) => {
  try {
    const response = await fetch(`https://fastcampus-chat.net/chat/leave`, {
      method: 'PATCH',
      headers: authHeaders,
      body: JSON.stringify({chatId}),
    });

    if (!response.ok) {
      throw new Error('Failed to join chat room');
    }

    return await response.json();
  } catch (error) {
    console.error('Error joining chat room:', error);
  }
};
