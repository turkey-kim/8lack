import styled from 'styled-components';
import {useState, useEffect} from 'react';
import io from 'socket.io-client';
import {FaRegStar, FaStar} from 'react-icons/fa';
import {MdCircle} from 'react-icons/md';

//이용자 모두 받아오는 페이지

interface User {
  id: string;
  name: string;
  picture: string;
}

type AllUsers = User[];

// curl https://fastcampus-chat.net/users
//   \ -X 'GET'
//   \ -H 'Authorization: Bearer <accessToken>'

export default function Users() {
  return (
    <StyledPageContainer>
      <StyledMainTitle>사용자 리스트</StyledMainTitle>
      <StyledSearchBar placeholder="사용자를 검색해보세요." />

      <StyledLine />
      <StyledSubTitle>즐겨찾기</StyledSubTitle>

      <StyledUserContainer>
        <StyledUserProfile />
        <StyledUserDescription>
          <StyledUserName>
            사용자 1&nbsp;
            <MdCircle />
            <StyledStar>
              <FaRegStar />
            </StyledStar>
          </StyledUserName>
          <StyledChatButton>1:1 채팅하기</StyledChatButton>
        </StyledUserDescription>
      </StyledUserContainer>

      <StyledUserContainer>
        <StyledUserProfile />
        <StyledUserDescription>
          <StyledUserName>
            사용자 2&nbsp;
            <MdCircle />
            <StyledStar>
              <FaRegStar />
            </StyledStar>
          </StyledUserName>
          <StyledChatButton>1:1 채팅하기</StyledChatButton>
        </StyledUserDescription>
      </StyledUserContainer>

      <StyledLine />
      <StyledSubTitle>유저목록</StyledSubTitle>

      <StyledUserContainer>
        <StyledUserProfile />
        <StyledUserDescription>
          <StyledUserName>
            사용자 1&nbsp;
            <MdCircle />
            <StyledStar>
              <FaRegStar />
            </StyledStar>
          </StyledUserName>
          <StyledChatButton>1:1 채팅하기</StyledChatButton>
        </StyledUserDescription>
      </StyledUserContainer>

      <StyledUserContainer>
        <StyledUserProfile />
        <StyledUserDescription>
          <StyledUserName>
            사용자 2&nbsp;
            <MdCircle />
            <StyledStar>
              <FaRegStar />
            </StyledStar>
          </StyledUserName>
          <StyledChatButton>1:1 채팅하기</StyledChatButton>
        </StyledUserDescription>
      </StyledUserContainer>

      <StyledUserContainer>
        <StyledUserProfile />
        <StyledUserDescription>
          <StyledUserName>
            사용자 3&nbsp;
            <MdCircle />
            <StyledStar>
              <FaRegStar />
            </StyledStar>
          </StyledUserName>
          <StyledChatButton>1:1 채팅하기</StyledChatButton>
        </StyledUserDescription>
      </StyledUserContainer>

      <StyledUserContainer>
        <StyledUserProfile />
        <StyledUserDescription>
          <StyledUserName>
            사용자 4&nbsp;
            <MdCircle />
            <StyledStar>
              <FaRegStar />
            </StyledStar>
          </StyledUserName>
          <StyledChatButton>1:1 채팅하기</StyledChatButton>
        </StyledUserDescription>
      </StyledUserContainer>
    </StyledPageContainer>
  );
}

export const StyledPageContainer = styled.div`
  width: 100%;
  padding: 4rem 4rem;
`;

export const StyledMainTitle = styled.div`
  display: block;
  margin-bottom: 1rem;
  width: 100%;
  padding: 8px 0 0 0;
  font-size: ${props => props.theme.fonts.subtitle4.fontSize};
  font-weight: ${props => props.theme.fonts.subtitle4.fontWeight};
`;

export const StyledSearchBar = styled.input`
  margin: 1rem 0 1.5rem 0;
  width: 60%;
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 4px;
  border-color: ${props => props.theme.colors.gray400};
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.blue700};
  }
`;

export const StyledSubTitle = styled.div`
  margin: 0.5rem 0 0.5rem 0rem;
  width: 100%;
  padding: 1rem 0 0 0;
  font-size: ${props => props.theme.fonts.subtitle5.fontSize};
  font-weight: ${props => props.theme.fonts.subtitle5.fontWeight};
`;

export const StyledLine = styled.div`
  border-bottom: 1px solid ${props => props.theme.colors.gray400};
`;

export const StyledUserContainer = styled.div`
  width: 20rem;
  height: 20rem;
  border: 1px solid ${props => props.theme.colors.gray300};
  display: inline-block;
  cursor: pointer;
  border-radius: 8px;
  margin: 0.5rem 3rem 3rem 0rem;
  vertical-align: top;
`;

export const StyledUserProfile = styled.div`
  height: 70%;
  background-color: ${props => props.theme.colors.gray300};
  border-radius: 8px 8px 0 0;
`;

export const StyledUserDescription = styled.div`
  padding: 1rem 0.5rem 1rem 0.5rem;
  width: 100%;
  height: calc(30%);
`;

export const StyledUserName = styled.div`
  width: 100%;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  font-size: ${props => props.theme.fonts.subtitle5.fontSize};
  font-weight: ${props => props.theme.fonts.subtitle5.fontWeight};
`;

export const StyledStar = styled.div`
  margin-left: auto;
  font-size: ${props => props.theme.fonts.subtitle5.fontSize};
  font-weight: ${props => props.theme.fonts.subtitle5.fontWeight};
`;

export const StyledChatButton = styled.button`
  width: 100%;
  height: 50%;
  margin: 0.5rem 1rem 0 0;
  border-radius: 8px;
  border: 1px solid ${props => props.theme.colors.blue400};
  color: ${props => props.theme.colors.blue400};

  &:hover {
    border: none;
    background-color: ${props => props.theme.colors.blue700};
    color: ${props => props.theme.colors.blue100};
  }
`;
