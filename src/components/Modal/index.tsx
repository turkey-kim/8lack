import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import {theme} from 'styles/Theme';
import {IModal} from './Modal.types';
import {MdClose} from 'react-icons/md';

const Modal: React.FC<IModal> = ({title, onClose, onSubmit, buttonText, children}) => {
  return ReactDOM.createPortal(
    <StyledBackdrop>
      <StyledModal>
        <StyledHeader>
          <StyledH4>{title}</StyledH4>
          <StyledCloseIcon onClick={onClose} />
        </StyledHeader>
        <StyledMain>{children}</StyledMain>
        <StyledFooter>
          <StyledButton onClick={onSubmit}>{buttonText}</StyledButton>
        </StyledFooter>
      </StyledModal>
    </StyledBackdrop>,
    document.getElementById('modal-root') as HTMLElement,
  );
};
export default Modal;

const StyledBackdrop = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 5;
`;
const StyledModal = styled.div`
  width: 747px;
  height: 562px;
  border-radius: 8px;
  background-color: ${theme.colors.white};
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 5;
  margin: auto;
  box-shadow: ${theme.shadows.shadow3};
`;
const StyledHeader = styled.div`
  height: 70px;
  display: flex;
  justify-content: space-between;
  padding: 16px 24px;
  border-bottom: 1px solid ${theme.colors.gray400};
`;

const StyledH4 = styled.h4`
  font-size: ${theme.fonts.subtitle4.fontSize};
  font-weight: ${theme.fonts.subtitle4.fontWeight};
  line-height: ${theme.fonts.subtitle4.lineHeight};
`;

const StyledMain = styled.div`
  display: flex;
  padding: 16px 24px;
  gap: 24px;
`;

const StyledLabel = styled.label`
  font-size: ${theme.fonts.body2.fontSize};
  font-weight: ${theme.fonts.subtitle5.fontWeight};
  line-height: ${theme.fonts.body2.lineHeight};

  display: block;
  margin-bottom: 6px;
`;

const StyledFooter = styled.div`
  position: absolute;
  bottom: 0;

  width: 100%;
  height: 72px;
  border-top: 1px solid ${theme.colors.gray400};

  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 24px;

  gap: 8px;
`;

const StyledButton = styled.button`
  height: 48px;
  padding: 12px 32px;
  border-radius: 12px;

  font-size: ${theme.fonts.subtitle5};

  background-color: ${theme.colors.blue700};
  color: ${theme.colors.white};

  transition: 0.2s;

  &:hover {
    background-color: ${theme.colors.blue800};
  }
`;

const StyledCloseIcon = styled(MdClose)`
  font-size: 32px;
  border-radius: 4px;
  color: ${theme.colors.gray800};
  cursor: pointer;

  &:hover {
    background-color: ${theme.colors.blue100};
  }
`;
