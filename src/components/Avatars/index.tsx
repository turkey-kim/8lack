import React from 'react';
import styled from 'styled-components';
import {IAvatars} from './Avatars.types';

const Avatars: React.FC<IAvatars> = ({users, isPrivate}) => {
  if (isPrivate) {
    // 비공개 채팅방: 아바타 1개만 보여줌
    const user = users?.[0];
    return <Avatar src={user?.picture} alt={user?.username} />;
  } else {
    // 공개 채팅방: 유저 수에 따라 다른 레이아웃
    return (
      <AvatarsContainer>
        {users?.slice(0, 4).map((user, index) => <Avatar key={user.id} src={user.picture} alt={user.username} />)}
      </AvatarsContainer>
    );
  }
};
export default Avatars;

const AvatarsContainer = styled.div`
  width: 3rem;
  height: 3rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const Avatar = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 7.75rem;
  border: 1px solid ${({theme}) => theme.colors.gray300};
`;
