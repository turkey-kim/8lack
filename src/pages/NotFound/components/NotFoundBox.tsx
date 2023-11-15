import {Player} from '@lottiefiles/react-lottie-player';
import styled from 'styled-components';
import {theme} from '../../../styles/Theme';

export default function NotFoundBox() {
  const boxStyle = {
    width: '40rem',
  };
  return (
    <StyledContainer>
      <Player
        autoplay
        loop
        style={boxStyle}
        src="https://lottie.host/941f9936-867f-459f-8054-cb8236426bac/fJcjckSNoW.json"
      />
      <StyledText>🤔 어라, 이곳에는 채팅이 없네요. 다른 톡방에서 즐거운 이야기를 찾아보세요!</StyledText>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  background-color: ${theme.colors.blue100};
`;

const StyledText = styled.h2`
  color: ${theme.colors.error};
`;
