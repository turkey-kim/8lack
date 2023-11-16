import React from 'react';
import styled from 'styled-components';
import {IAvatars} from './Avatars.types';

const Avatars: React.FC<IAvatars> = ({users, isPrivate}) => {
  if (isPrivate) {
    const user = users?.[0];
    return <Avatar src={user?.picture} alt={user?.username} />;
  } else {
    return (
      <AvatarsContainer>
        {users?.slice(0, 4).map((user, index) => (
          <Avatar key={user.id} src={user.picture} alt={user.username} />
        ))}
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
