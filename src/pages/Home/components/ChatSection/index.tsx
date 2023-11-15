import React from 'react';
import styled from 'styled-components';
import {theme} from 'styles/Theme';
import SlidingList from './SlidingList';
import {dataBottom, dataTop} from './chatSection.data';

const ChatSection = () => {
  return (
    <StyledContainer>
      <StyledTitle>어떤 주제가 좋으세요?</StyledTitle>
      <SlidingList data={dataTop} direction="left" />
      <SlidingList data={dataBottom} direction="right" />
    </StyledContainer>
  );
};

export default ChatSection;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${theme.colors.bg3};
  padding: 3rem 0rem;
`;

const StyledTitle = styled.div`
  padding: 4rem 0rem;
  color: ${theme.colors.white};
  font-size: 4rem;
  font-weight: ${theme.fonts.subtitle1.fontWeight};
  text-align: center;
`;
