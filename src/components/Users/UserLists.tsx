import {useState, useEffect} from 'react';
import io from 'socket.io-client';
import {FaRegStar, FaStar} from 'react-icons/fa';
import {MdCircle} from 'react-icons/md';
import styled from 'styled-components';
import {StyledLine} from 'pages/Users';

const UserLists = () => {
  //모든 유저 조회
  return (
    <>
      <StyledLine />
      <StyledSubTitle>유저목록</StyledSubTitle>
      {/* <StyledUsersWrapper> */}
      <StyledUserContainer>
        <StyledUserProfile />
        <StyledUserDescription>
          <StyledUserName>
            김ㅇㅇ&nbsp;
            <StyledActiveCircle>
              <MdCircle />
            </StyledActiveCircle>
            <StyledStar>
              <FaStar />
            </StyledStar>
          </StyledUserName>
          <StyledChatButton>1:1 채팅하기</StyledChatButton>
        </StyledUserDescription>
      </StyledUserContainer>
      <StyledUserContainer>
        <StyledUserProfile />
        <StyledUserDescription>
          <StyledUserName>
            김ㅇㅇ&nbsp;
            <StyledActiveCircle>
              <MdCircle />
            </StyledActiveCircle>
            <StyledStar>
              <FaRegStar />
            </StyledStar>
          </StyledUserName>
          <StyledChatButton>1:1 채팅하기</StyledChatButton>
        </StyledUserDescription>
      </StyledUserContainer>
      {/* </StyledUsersWrapper> */}
    </>
  );
};

export default UserLists;

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

// user container
export const StyledUserContainer = styled.div`
  width: 12rem;
  height: 15rem;
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
  font-size: ${props => props.theme.fonts.subtitle5.fontSize};
  font-weight: ${props => props.theme.fonts.subtitle5.fontWeight};
`;

export const StyledUserName = styled.div`
  width: 100%;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
`;

export const StyledActiveCircle = styled.div`
  color: ${props => props.theme.colors.success};
`;

export const StyledStar = styled.div`
  margin-left: auto;
  color: ${props => props.theme.colors.blue700};
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
