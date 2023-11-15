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

export const StyledLeftSection = styled.div`
  background-color: white;
  height: 45rem;
  padding: 0rem 0 0 15rem;
  text-align: left;
  overflow: hidden;
  width: 100vw;
`;

export const StyledRightSection = styled.div`
  background-color: ${theme.colors.blue100};
  padding: 0rem 15rem 0 0rem;
  text-align: right;
  height: 45rem;
  overflow: hidden;
  width: 100vw;
`;

export const StyledWrapper = styled.div`
  display: inline-block;
  vertical-align: top;
  width: 50%;
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
