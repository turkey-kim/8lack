import React from 'react';
import styled from 'styled-components';
import {motion} from 'framer-motion';
import symbol from 'assets/images/symbol.png';
import {MdClose} from 'react-icons/md';
import {theme} from 'styles/Theme';
import {IoMdArrowRoundForward} from 'react-icons/io';

export interface IToast {
  onJoin: () => void;
  onClose: () => void;
  children: React.ReactNode;
}

const ToastItem: React.FC<IToast> = ({onJoin, onClose, children}) => {
  const variants = {
    initial: {
      opacity: 0.5,
      y: 24,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.2,
        ease: 'easeOut',
      },
    },
    hidden: {
      opacity: 0,
      scale: 0.5,
      y: 12,
      transition: {
        duration: 0.2,
        ease: 'easeOut',
      },
    },
  };

  return (
    <StyledContainer initial="initial" animate="visible" exit="hidden" variants={variants} layout>
      <StyledChatSymbol src={symbol} alt="symbol" />
      <StyledChatInfo>{children}</StyledChatInfo>
      <StyledButtonWrapper>
        <StyledCloseButton onClick={onClose} />
        <StyledJoinButton onClick={onJoin}>
          입장하기 <IoMdArrowRoundForward />
        </StyledJoinButton>
      </StyledButtonWrapper>
    </StyledContainer>
  );
};

export default ToastItem;

const StyledContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  position: relative;
  max-width: 450px;
  width: 100%;
  background-color: ${({theme}) => theme.alpha.alpha1};
  box-shadow: 0 2px 8px ${({theme}) => theme.alpha.alpha6};
  backdrop-filter: blur(8px);
  border: 1px solid rgba(202, 202, 202, 0.1);
  border-radius: 20px;
  padding: 16px;
  margin-bottom: 10px;
`;

const StyledChatSymbol = styled.img`
  margin-right: 16px;
  background-color: ${({theme}) => theme.colors.white};
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
`;

const StyledChatInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: auto;
`;

const StyledButtonWrapper = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  gap: 20px;
`;

const StyledCloseButton = styled(MdClose)`
  font-size: 15px;
  border-radius: 15px;
  color: ${theme.colors.gray600};
  cursor: pointer;
  transition: all 0.15s ease-out 0s;

  &:hover {
    background-color: ${({theme}) => theme.alpha.alpha1};
  }
`;
const StyledJoinButton = styled.button`
  display: flex;
  align-items: center;
  padding: 0.5rem 0.9rem;
  gap: 0.3rem;
  background-color: ${({theme}) => theme.alpha.alpha4};
  border: 1px solid ${({theme}) => theme.alpha.alpha5};
  border-radius: 20px;
  cursor: pointer;
  margin-left: 16px;
  transition: all 0.15s ease-out 0s;

  &:hover {
    background-color: ${({theme}) => theme.alpha.alpha1};
  }
`;
