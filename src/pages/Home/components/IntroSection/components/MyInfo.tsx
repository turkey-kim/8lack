import styled from 'styled-components';
import {
  StyledTextWrapper,
  StyledInner,
  StyledWrapper,
  StyledText,
  StyledSubText,
  StyledIntroText,
  StyledLeftSection,
} from '..';
import background from 'assets/images/main_userbackground.png';

const MyInfo = () => {
  return (
    <StyledLeftSection>
      <StyledInner>
        <StyledTextWrapper>
          <StyledText>내 정보</StyledText>
          <StyledSubText>
            나에 대해서 <br />더 자유롭게 표현해보세요.
          </StyledSubText>
          <StyledIntroText>
            나만의 개성 넘치는 프로필 이미지와 이름을 설정해보세요. <br />
            사진 뿐만 아니라, 움직이는 이미지도 사용할 수 있어요!
          </StyledIntroText>
        </StyledTextWrapper>
        <StyledBackGround src={background}></StyledBackGround>
      </StyledInner>
    </StyledLeftSection>
  );
};

const StyledBackGround = styled.img`
  position: absolute;
  width: 70rem;
  bottom: -7rem;
  right: -235px;
`;
export default MyInfo;
