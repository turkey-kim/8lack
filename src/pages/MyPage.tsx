import styled from 'styled-components';
import {useState, useEffect} from 'react';
import {PageContainer, MainTitle} from './Users';

// 사진과 이름 수정 페이지

interface UpdateUser {
  name?: string; // 새로운 표시 이름
  picture?: string; // 사용자 프로필 이미지(url or base64)
}

interface UpdateStateMessage {
  message: string;
}

//  curl https://fastcampus-chat.net/user
//   \ -X 'PATCH'
//   \ -H 'Authorization: Bearer <accessToken>'

//로직 : accessToken

export default function MyPage() {
  return (
    <PageContainer>
      <MainTitle>내 정보</MainTitle>
    </PageContainer>
  );
}
