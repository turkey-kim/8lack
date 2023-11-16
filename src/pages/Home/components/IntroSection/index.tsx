import styled from 'styled-components';
import {theme} from 'styles/Theme';
import MyInfo from './components/MyInfo';
import User from './components/User';
import MyChat from './components/MyChat';
import Invite from './components/Invite';
import ChatRoom from './components/ChatRoom';
import ChatSection from '../ChatSection';

const IntroSection = () => {
  return (
    <>
      <ChatRoom />
      <Invite />
      <MyChat />
      <ChatSection />
      <User />
      <MyInfo />
    </>
  );
};
export default IntroSection;

export const StyledInner = styled.div`
  position: relative;
  width: 1200px;
  min-width: 900px;
  display: flex;
  justify-content: space-between;
`;

export const StyledLeftSection = styled.div`
  background-color: ${theme.colors.white};
  text-align: left;
  height: 40rem;
  overflow: hidden;
  width: 100vw;
  display: flex;
  justify-content: center;
`;

export const StyledWrapper = styled.div`
  display: inline-block;
  vertical-align: top;
`;

export const StyledTextWrapper = styled.div`
  display: inline-block;
  vertical-align: top;
  margin: 0 140px;
`;

export const StyledText = styled.h3`
  padding-top: 5rem;
  color: ${theme.colors.blue700};
`;

export const StyledSubText = styled.div`
  color: black;
  margin-top: 2rem;
  font-weight: ${theme.fonts.subtitle2.fontWeight};
  font-size: ${theme.fonts.subtitle2.fontSize};
  line-height: 1.5;
`;

export const StyledIntroText = styled.div`
  color: black;
  margin-top: 2rem;
  font-size: ${theme.fonts.subtitle5.fontSize};
  line-height: 1.5;
`;
