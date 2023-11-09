import React from 'react';
import ReactDOM from 'react-dom';
import UserList from 'components/UserList/UserList';
import styled from 'styled-components';
import {IDrawer} from './Drawer.types';

const Drawer: React.FC<IDrawer> = ({isOpen, onClose, connectedUserIds, usersMap}) => {
  if (!isOpen) return null;
  const portalRoot = document.getElementById('drawer-root') as HTMLElement;
  return ReactDOM.createPortal(
    <>
      <StyledBackdrop onClick={onClose} />
      <StyledDrawerContent>
        <UserList connectedUserIds={connectedUserIds} usersMap={usersMap} />
      </StyledDrawerContent>
    </>,
    portalRoot,
  );
};

const StyledBackdrop = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const StyledDrawerContent = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  height: 100%;
  background-color: ${({theme}) => theme.colors.white};
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.1);
  z-index: 1010;
  display: flex;
  flex-direction: column;
`;

export default Drawer;
