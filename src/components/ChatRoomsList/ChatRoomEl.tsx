import {useEffect, useState} from 'react';
import {FaAngleDown} from 'react-icons/fa';
import styled from 'styled-components';
import {theme} from 'styles/Theme';

import {format} from 'timeago.js';

interface Message {
  id: string;
  text: string;
  userId: string;

  createdAt: Date;
}

interface Chat {
  id: string;
  name: string;
  isPrivate: boolean;
  users: string[];
  messages: Message[]; // message 객체가 속합니다.

  updatedAt: Date;
}

interface Props {
  key: string;
  data: Chat;
}

const ChatRoomEl = (props: Props) => {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const calcTime = () => {
      let time = format(props.data.updatedAt);
      if (time === 'just now') {
        setTime('방금 전');
      } else {
        let spl = time.split(' ');
        let num = spl[0];
        let measure = spl[1];
        if (measure.includes('minute')) {
          setTime(num + ' 분 전 마지막 채팅');
        } else if (measure.includes('hour')) {
          setTime(num + ' 시간 전 마지막 채팅');
        } else if (measure.includes('day')) {
          setTime(num + ' 일 전 마지막 채팅');
        } else if (measure.includes('week')) {
          setTime(num + ' 주 전 마지막 채팅');
        } else if (measure.includes('month')) {
          setTime(num + ' 달 전 마지막 채팅');
        } else if (measure.includes('year')) {
          setTime('오래 전');
        }
      }
    };

    calcTime();

    setInterval(() => {
      calcTime();
    }, 30000);
  }, [props.data.updatedAt]);

  return (
    <StyledContainer>
      <StyledInner>
        <StyledInformation>
          <StyledH3>{props.data.name}</StyledH3>
          <StyledChatInfo>
            <StyledAmount>{props.data.users.length} 명의 맴버</StyledAmount>
            <StyledDivider></StyledDivider>
            <StyledLatestTime>{time}</StyledLatestTime>
          </StyledChatInfo>
        </StyledInformation>
        <StyledEnterance>
          <StyledMemberListBtn>
            <span>참여 중인 사용자</span>
            <StyledAngleDown></StyledAngleDown>
          </StyledMemberListBtn>
          <StyledEnterButton>들어가기</StyledEnterButton>
        </StyledEnterance>
      </StyledInner>
    </StyledContainer>
  );
};

export default ChatRoomEl;

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  position: relative;

  width: 100%;
  height: 156px;
  border-bottom: 1px solid ${theme.colors.gray300};
  padding: 37px 80px;
  transition: 0.3;

  &:hover {
    background-color: ${theme.colors.blue100};
  }
`;

const StyledInner = styled.div`
  height: 82px;
  width: Calc(100% - 160px);
  position: absolute;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledInformation = styled.div``;

const StyledH3 = styled.h3`
  font-size: ${theme.fonts.subtitle4.fontSize};
  font-weight: ${theme.fonts.subtitle4.fontWeight};
  line-height: ${theme.fonts.subtitle4.lineHeight};
  margin-bottom: 8px;
`;

const StyledChatInfo = styled.div`
  font-size: ${theme.fonts.body1.fontSize};
  font-weight: ${theme.fonts.body1.fontWeight};
  line-height: ${theme.fonts.body1.lineHeight};

  display: flex;
  align-items: center;
  gap: 12px;

  color: ${theme.colors.gray600};
`;

const StyledAmount = styled.span``;

const StyledDivider = styled.div`
  width: 1px;
  height: 16px;
  background-color: ${theme.colors.gray500};
`;
const StyledLatestTime = styled.span``;

const StyledEnterance = styled.div`
  display: flex;
  gap: 8px;
`;

const StyledMemberListBtn = styled.button`
  font-size: ${theme.fonts.body1.fontSize};
  font-weight: ${theme.fonts.body1.fontWeight};
  line-height: ${theme.fonts.body1.lineHeight};

  color: ${theme.colors.gray700};
  display: flex;
  gap: 2px;
  align-items: center;
  border-radius: 4px;

  transition: 0.5;

  &:hover {
    background-color: ${theme.colors.blue200};
  }
`;

const StyledEnterButton = styled.button`
  font-size: ${theme.fonts.subtitle5.fontSize};
  font-weight: ${theme.fonts.subtitle5.fontWeight};
  line-height: ${theme.fonts.subtitle5.lineHeight};

  padding: 4px 28px;

  border: 2px solid ${theme.colors.blue700};
  border-radius: 4px;
  color: ${theme.colors.blue700};

  &:hover {
    background-color: ${theme.colors.blue200};
    color: ${theme.colors.blue800};
    border: 2px solid ${theme.colors.blue800};
  }
`;

const StyledAngleDown = styled(FaAngleDown)`
  color: ${theme.colors.gray600};
`;