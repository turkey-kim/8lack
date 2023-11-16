import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import {motion, AnimatePresence} from 'framer-motion';
import {IDrawer} from './Drawer.types';

const Drawer: React.FC<IDrawer> = ({isOpen, onClose, children}) => {
  const backdrop = {
    visible: {opacity: 1},
    hidden: {opacity: 0},
  };

  const drawer = {
    visible: {
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
    hidden: {
      x: '100%',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
  };

  return ReactDOM.createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          <MotionBackdrop variants={backdrop} initial="hidden" animate="visible" exit="hidden" onClick={onClose} />
          <MotionDrawer variants={drawer} initial="hidden" animate="visible" exit="hidden">
            {children}
          </MotionDrawer>
        </>
      )}
    </AnimatePresence>,
    document.getElementById('drawer-root') as HTMLElement,
  );
};

export default Drawer;

const MotionBackdrop = styled(motion.div)`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 3;
  background-color: rgba(0, 0, 0, 0.05);
`;

const MotionDrawer = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  width: 350px;
  height: 100%;
  background-color: ${({theme}) => theme.colors.white};
  padding: 1rem;
  box-shadow: -2px 0 20px rgba(0, 0, 0, 0.05);
  z-index: 4;
  display: flex;
  flex-direction: column;
`;
