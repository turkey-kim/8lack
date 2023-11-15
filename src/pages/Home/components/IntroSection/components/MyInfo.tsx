import styled from 'styled-components';
import {StyledWrapper, StyledText, StyledSubText, StyledIntroText} from '..';
import background from 'assets/images/main_userbackground.png';

const MyInfo = () => {
  return (
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
      <StyledWrapper></StyledWrapper>
    </StyledLeftSection>
  );
};

const StyledLeftSection = styled.div`
  background-color: white;
  background-image: url(${background});
  height: 45rem;

  text-align: left;
  overflow: hidden;
  background-repeat: no-repeat;
  background-size: contain;
  margin-left: 15rem;
`;

export default MyInfo;
