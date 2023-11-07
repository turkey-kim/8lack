import styled from 'styled-components';
import {useState, useEffect} from 'react';
import io from 'socket.io-client';

//이용자 모두 받아오는 페이지

interface User {
  id: string;
  name: string;
  picture: string;
}

type Users = User[];

// curl https://fastcampus-chat.net/users
//   \ -X 'GET'
//   \ -H 'Authorization: Bearer <accessToken>'

export default function Users() {
  return (
    <PageContainer>
      <MainTitle>사용자 리스트</MainTitle>
      <StyledSearchBar />
      <hr />
      <SubTitle>사용자</SubTitle>

      <UserContainer>
        <UserProfile />
        <UserDescription>
          <strong>사용자 1</strong>
          <ChatDescription>1:1 채팅하기</ChatDescription>
        </UserDescription>
      </UserContainer>

      <UserContainer>
        <UserProfile />
        <UserDescription>
          <strong>사용자 2</strong>
          <ChatDescription>1:1 채팅하기</ChatDescription>
        </UserDescription>
      </UserContainer>

      <UserContainer>
        <UserProfile />
        <UserDescription>
          <strong>사용자 3</strong>
          <ChatDescription>1:1 채팅하기</ChatDescription>
        </UserDescription>
      </UserContainer>

      <UserContainer>
        <UserProfile />
        <UserDescription>
          <strong>사용자 4</strong>
          <ChatDescription>1:1 채팅하기</ChatDescription>
        </UserDescription>
      </UserContainer>
    </PageContainer>
  );
}

export const PageContainer = styled.div`
  width: 100%;
  padding: 2rem 2rem;
`;

export const MainTitle = styled.h2`
  display: block;
  margin-bottom: 8px;
  width: 100%;
  padding: 8px;
  font-size: 1.5rem;
`;

export const StyledSearchBar = styled.input`
  margin-bottom: 1rem;
  width: 60%;
  padding: 8px;
  font-size: 1rem;
  border-radius: 8px;
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.blue700};
  }
`;

export const SubTitle = styled.h1`
  margin-bottom: 8px;
  width: 100%;
  padding: 8px;
  font-size: 1rem;
`;

export const UserContainer = styled.div`
  padding: 1rem;
  width: 20rem;
  height: 20rem;
  border: 1px solid ${props => props.theme.colors.gray600};
  display: inline-block;
  cursor: pointer;
  border-radius: 8px;
  margin: 0.5rem 3rem 3rem 1rem;
`;

export const UserProfile = styled.div`
  display: inline;
  width: 100%;
  height: 80%; //사진 비율에 따라서 추후 조정
  border: 1px solid ${props => props.theme.colors.blue600};
  padding: 2rem 2rem;
  margin-bottom: 0.5rem;
  border-radius: 8px;
  display: flex;
`;

export const UserDescription = styled.div`
  width: 100%;
  height: 20%;
  border: 1px solid ${props => props.theme.colors.blue700};
  border-radius: 4px;
  padding: 0.5rem 0.5rem;
`;

export const ChatDescription = styled.div`
  width: 100%;
  margin: 0.5rem 1rem 0.5rem 0;
  text-align: right;
`;
