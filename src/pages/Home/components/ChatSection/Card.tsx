import styled from 'styled-components';
import {theme} from 'styles/Theme';
import {CardProps} from './ChatSection.types';

const Card = ({title, member, time, people}: CardProps) => {
  return (
    <StyledContainer>
      <StyledTitle>{title}</StyledTitle>
      <StyledTextBox>{member}</StyledTextBox>
      <StyledTextBox>{time}</StyledTextBox>
      <StyledSectorLine />
      <StyledLabel>참여하고 있는 사람</StyledLabel>
      <StyledPoepleContainer>
        {people?.map((item, index) => (
          <StyledPeopleLabel key={title + member + time + String(index)}>{item}</StyledPeopleLabel>
        ))}
      </StyledPoepleContainer>
    </StyledContainer>
  );
};

export default Card;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 290px;
  height: 310px;
  border-radius: 16px;
  margin: 1rem;
  background-color: ${theme.colors.navy};
  box-shadow: ${theme.shadows.shadow2.shadow};
  font-size: 3rem;
`;

const StyledTitle = styled.div`
  background: linear-gradient(to right top, ${theme.colors.blue800}, ${theme.colors.pink700});
  font-size: ${theme.fonts.subtitle2.fontSize};
  font-weight: ${theme.fonts.subtitle2.fontWeight};
  padding: 2.4rem 0rem 1rem 0rem;
  color: transparent;
  -webkit-background-clip: text;
`;

const StyledTextBox = styled.span`
  color: ${theme.colors.gray500};
  font-size: ${theme.fonts.body1.fontSize};
  font-weight: ${theme.fonts.body1.fontWeight};
  padding: 0.4rem;
`;

const StyledSectorLine = styled.span`
  width: 15%;
  border-top: 0.5px solid ${theme.colors.gray600};
  margin: 1.2rem;
  margin-top: 2rem;
`;

const StyledLabel = styled.span`
  color: ${theme.colors.white};
  font-size: 1rem;
  font-weight: ${theme.fonts.body2.fontWeight};
  padding: 1rem;
`;

const StyledPoepleContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledPeopleLabel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto;
  height: auto;
  margin-left: 10px;
  padding: 10px;
  border-radius: 4px;
  background-color: ${theme.colors.bg2};
  color: ${theme.colors.white};
  font-size: ${theme.fonts.body1.fontSize};
  font-weight: ${theme.fonts.body2.fontWeight};
`;
