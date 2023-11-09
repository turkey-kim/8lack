import React, {useState} from 'react';
import styled from 'styled-components';
import {BsFillSendFill} from 'react-icons/bs';
import {ISendMessage} from './SendMessage.types';

const SendMessage: React.FC<ISendMessage> = ({onSendMessage}) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSendMessage(message);
    setMessage('');
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledWrapper>
        <StyledInput
          type="text"
          placeholder="메시지를 입력하세요"
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <StyledButton type="submit">
          <BsFillSendFill />
        </StyledButton>
      </StyledWrapper>
    </StyledForm>
  );
};

const StyledForm = styled.form`
  width: 100%;
  padding: 1rem;
  border-top: 1px solid ${({theme}) => theme.colors.gray200};
  background-color: ${({theme}) => theme.colors.white};
  position: sticky;
  bottom: 0;
`;
const StyledWrapper = styled.div`
  position: relative;
`;
const StyledInput = styled.input`
  padding: 1rem 3.5rem 1em 1rem;
  border: none;
  outline: none;
  border-radius: 7px;
  width: 100%;
  background-color: ${({theme}) => theme.colors.gray200};
  color: rgb(38, 38, 38);
  font-size: 0.9rem;
`;
const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  background-color: ${({theme}) => theme.colors.white};
  border-radius: 2rem;
  border: 1px solid ${({theme}) => theme.colors.gray300};
  color: ${({theme}) => theme.colors.blue700};
  cursor: pointer;
  transition: all 0.1s ease-out 0s;
  position: absolute;
  bottom: 5px;
  right: 10px;

  &:hover {
    border: 1px solid ${({theme}) => theme.colors.blue700};
    box-shadow: rgba(60, 87, 214, 0.3) 0px 0px 0px 3px;
  }

  & > svg {
    width: 1rem;
    height: 1rem;
  }
`;

export default SendMessage;
