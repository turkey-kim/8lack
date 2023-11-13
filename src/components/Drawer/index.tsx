import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import {IDrawer} from './Drawer.types';

const Drawer: React.FC<IDrawer> = ({isOpen, onClose, children}) => {
  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <>
      <StyledBackdrop onClick={onClose} />
      <StyledDrawerContent>{children}</StyledDrawerContent>
    </>,
    document.getElementById('drawer-root') as HTMLElement,
  );
};

export default Drawer;

const StyledBackdrop = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 3;
`;

const StyledDrawerContent = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  height: 100%;
  background-color: ${({theme}) => theme.colors.white};
  padding: 1rem;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.1);
  z-index: 4;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
