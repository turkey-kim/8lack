import styled from 'styled-components';
import {theme} from 'styles/Theme';
import chatimg from './chatimg.png';

const IntroSection = () => {
  return (
    <>
      <StyledLeftSection>
        <StyledWrapper>
          <StyledText>1:1 & 그룹 채팅방</StyledText>
          <StyledSubText>
            친구들과 함께 <br />
            채팅을 시작해보세요.
          </StyledSubText>
          <StyledIntroText>가장 먼저 온 메시지순으로 확인할 수 있어, 편리하게 사용할 수 있답니다!</StyledIntroText>
        </StyledWrapper>
        <StyledWrapper>
          <StyledImg src={chatimg} />
        </StyledWrapper>
      </StyledLeftSection>

      <StyledRightSection>
        <StyledWrapper>
          <StyledImg src={chatimg} />
        </StyledWrapper>
        <StyledWrapper>
          <StyledText>편리한 초대 기능</StyledText>
          <StyledSubText>
            대화하고 싶은 친구를
            <br />
            검색하고 초대해보세요.
          </StyledSubText>
          <StyledIntroText>가장 먼저 온 메시지순으로 확인할 수 있어, 편리하게 사용할 수 있답니다!</StyledIntroText>
        </StyledWrapper>
      </StyledRightSection>

      <StyledLeftSection>
        <StyledWrapper>
          <StyledText>나의 채팅목록</StyledText>
          <StyledSubText>
            내가 참여하고 있는 채팅을
            <br />
            언제든지 확인하세요.
          </StyledSubText>
          <StyledIntroText>가장 먼저 온 메시지순으로 확인할 수 있어, 편리하게 사용할 수 있답니다!</StyledIntroText>
        </StyledWrapper>
        <StyledWrapper>
          <StyledImg src={chatimg} />
        </StyledWrapper>
      </StyledLeftSection>

      {/* <>채팅 컴포넌트 추가될 곳</> */}

      <StyledRightSection>
        <StyledWrapper>
          <StyledImg src={chatimg} />
        </StyledWrapper>
        <StyledWrapper>
          <StyledText>유저 목록 조회 & 즐겨찾기</StyledText>
          <StyledSubText>
            친한 친구를 검색하고 <br />
            즐겨찾기에 추가해보세요.
          </StyledSubText>
          <StyledIntroText>
            현재 접속중인 친구를 확인하거나, <br />
            친한 친구를 즐겨찾기하거나. <br />
            새로운 친구를 만나보세요
          </StyledIntroText>
        </StyledWrapper>
      </StyledRightSection>

      <StyledLeftSection>
        <StyledWrapper>
          <StyledText>내 정보</StyledText>
          <StyledSubText>
            나에 대해서 <br />더 자유롭게 표현해보세요.
          </StyledSubText>
          <StyledIntroText>
            나만의 개성 넘치는 프로필 이미지와 이름을 설정해보세요. <br />
            사진 뿐만 아니라, 움직이는 이미지도 사용할 수 있어요!
          </StyledIntroText>
        </StyledWrapper>
        <StyledWrapper>
          <StyledImg src={chatimg} />
        </StyledWrapper>
      </StyledLeftSection>
    </>
  );
};
export default IntroSection;

const StyledLeftSection = styled.div`
  background-color: white;
  height: auto;
  padding: 0rem 0 10rem 10rem;
`;

const StyledWrapper = styled.div`
  display: inline-block;
  vertical-align: top;
`;

const StyledImg = styled.img`
  height: 20rem;
  margin: 10rem 0 0 10rem;
`;

const StyledRightSection = styled.div`
  background-color: ${theme.colors.blue200};
  height: auto;
  padding: 0rem 10rem 10rem 0rem;
  text-align: right;
`;

const StyledText = styled.h3`
  padding-top: 5rem;
  color: ${theme.colors.blue700};
`;

const StyledSubText = styled.div`
  color: black;
  margin-top: 2rem;
  font-weight: ${theme.fonts.subtitle2.fontWeight};
  font-size: ${theme.fonts.subtitle2.fontSize};
  line-height: 1.5;
`;

const StyledIntroText = styled.div`
  color: black;
  margin-top: 2rem;
  font-size: ${theme.fonts.subtitle5.fontSize};
  line-height: 1.5;
`;
