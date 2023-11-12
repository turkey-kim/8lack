import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import {IModal} from './Modal.types';
import {MdClose} from 'react-icons/md';

const Modal: React.FC<IModal> = ({title, onClose, onSubmit, buttonText, children}) => {
  return ReactDOM.createPortal(
    <StyledBackdrop>
      <StyledModal>
        <StyledHeader>
          <h4>{title}</h4>
          <StyledCloseBtn onClick={onClose}>
            <MdClose />
          </StyledCloseBtn>
        </StyledHeader>
        {children}
        {onSubmit && (
          <StyledFooter>
            <StyledBtn onClick={onSubmit}>{buttonText}</StyledBtn>
          </StyledFooter>
        )}
      </StyledModal>
    </StyledBackdrop>,
    document.getElementById('modal-root') as HTMLElement,
  );
};
export default Modal;

const StyledBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1500;
`;
const StyledModal = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
  width: 300px;
`;
const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;
const StyledFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const StyledBtn = styled.button`
  // 버튼 스타일
`;

const StyledCloseBtn = styled.button`
  // 닫기 버튼 스타일
`;
