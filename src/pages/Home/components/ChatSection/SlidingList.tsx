import styled from 'styled-components';
import Card from './Card';
import {leftMove, leftMoveForClone, rightMove, rightMoveForClone} from './styledAnimation';
import {SlidiingListProps} from './ChatSection.types';

const SlidingList = ({data, direction}: SlidiingListProps) => {
  return (
    <StyledContainer>
      <StyledListContainer>
        <StyledOriginalWrapper direction={direction}>
          {data.map((item: any) => (
            <Card
              key={item.title + item.time}
              title={item.title}
              member={item.member}
              time={item.time}
              people={item.people}
            />
          ))}
        </StyledOriginalWrapper>
        <StyledCloneWrapper direction={direction}>
          {data.map((item: any) => (
            <Card
              key={item.title + item.title}
              title={item.title}
              member={item.member}
              time={item.time}
              people={item.people}
            />
          ))}
        </StyledCloneWrapper>
      </StyledListContainer>
    </StyledContainer>
  );
};

export default SlidingList;

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  display: flex;
  overflow: hidden;
`;

const StyledListContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledOriginalWrapper = styled.span<SlidiingListProps>`
  display: flex;
  flex-direction: row;
  animation: ${({direction}) => (direction === 'left' ? leftMove : rightMove)} 45s linear infinite;
`;

const StyledCloneWrapper = styled.span<SlidiingListProps>`
  display: flex;
  flex-direction: row;
  animation: ${({direction}) => (direction === 'left' ? leftMoveForClone : rightMoveForClone)} 45s linear infinite;
`;
