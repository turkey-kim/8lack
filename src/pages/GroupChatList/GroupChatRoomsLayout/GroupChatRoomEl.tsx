import {participateChatRoom} from 'api/myChatRoom';
import {useEffect, useState} from 'react';
import {FaAngleDown} from 'react-icons/fa';
import {useNavigate} from 'react-router';
import styled from 'styled-components';
import {theme} from 'styles/Theme';
import {Chat} from 'types/chatroom.types';

import {format, register} from 'timeago.js'; //임포트하기 register 한국어 선택
import koLocale from 'timeago.js/lib/lang/ko'; //한국어 선택
register('ko', koLocale);

interface Props {
  key: string;
  data: Chat;
}

const ChatRoomEl = (props: Props) => {
  const [time, setTime] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const calcTime = () => {
      let time = format(props.data.updatedAt, 'ko');
      if (time === '방금') {
        setTime(time + ' 전 마지막 채팅');
      } else {
        setTime(time + ' 마지막 채팅');
      }
    };

    calcTime();

    setInterval(() => {
      calcTime();
    }, 30000); // 마지막 채팅 시간(by updatedAt)은 30초 마다 갱신
  }, [props.data.updatedAt]);

  const joinHandler = () => {
    const ID = props.data.id;
    const NAME = props.data.name;
    const confirm = window.confirm(`${NAME} 방에 들어가시겠어요?`);
    if (confirm) {
      participateChatRoom(ID).then(res => navigate(`/chat/${ID}`));
    }
  };

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
          <StyledEnterButton onClick={joinHandler}>들어가기</StyledEnterButton>
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
  transition: 0.3s;

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

  transition: 0.5s;

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
