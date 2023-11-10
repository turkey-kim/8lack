import styled from 'styled-components';
import {theme} from 'styles/Theme';
import {User} from 'types/chatroom.types';

interface UserCellProps {
  user: User;
}

const UserCell = (props: UserCellProps) => {
  return (
    <StyledCellContainer>
      <StyledPrf>
        <StyledPrfImg src={props.user.picture} />
        <StyledPrfName>{props.user.name}</StyledPrfName>
      </StyledPrf>
      <input type="checkbox"></input>
    </StyledCellContainer>
  );
};

export default UserCell;

const StyledCellContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 16px 4px 4px;
  background-color: ${theme.colors.white};
  border-bottom: 1px solid ${theme.colors.gray400};
`;
const StyledPrf = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
const StyledPrfImg = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;
const StyledPrfName = styled.span`
  font-size: ${theme.fonts.body2.fontSize};
  font-weight: ${theme.fonts.subtitle5.fontWeight};
  line-height: ${theme.fonts.body2.lineHeight};
`;
