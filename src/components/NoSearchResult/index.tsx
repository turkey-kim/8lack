import styled from 'styled-components';
import {Player} from '@lottiefiles/react-lottie-player';
import {theme} from 'styles/Theme';

interface NoSearchResultProps {
  width?: string;
  height?: string;
  text: string;
}

const NoSearchResult = ({width = '250px', height = '250px', text}: NoSearchResultProps) => {
  return (
    <StyledContainer>
      <Player
        autoplay
        loop
        src="https://lottie.host/ec5e6378-d6c3-45fa-841e-935cb220561c/ZsxLuOHOZj.json"
        style={{height: height, width: width}}
      ></Player>
      <StyledDiv>{text}</StyledDiv>
    </StyledContainer>
  );
};

export default NoSearchResult;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const StyledDiv = styled.div`
  font-size: ${theme.fonts.subtitle5.fontSize};
  font-weight: ${theme.fonts.subtitle5.fontWeight};
  line-height: ${theme.fonts.subtitle5.lineHeight};

  color: ${theme.colors.gray700};
`;
