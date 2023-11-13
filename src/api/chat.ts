import axios from 'axios';
import {authHeaders} from './auth';
import {SERVER_URL} from 'constant/constant';

export const handleChatParticipate = async (chatId: string) => {
  try {
    const response = await fetch(`https://fastcampus-chat.net/chat/participate`, {
      method: 'PATCH',
      headers: authHeaders(),
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
      headers: authHeaders(),
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

export const handleChatInvite = async (chatId: string, users: string[]) => {
  try {
    const response = await fetch(`${SERVER_URL}/chat/invite`, {
      method: 'PATCH',
      headers: authHeaders(),
      body: JSON.stringify({chatId, users}),
    });

    if (!response.ok) {
      throw new Error('Error on inviting another users');
    }

    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.log('Error on Inviting: ', error);
  }
};
