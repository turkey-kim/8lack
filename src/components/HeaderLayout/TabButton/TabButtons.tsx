import styled from 'styled-components';
import TabEl from './TabEl';
import {useState} from 'react';
import TabProps from './TabProps';
import {theme} from '../../../styles/Theme';

const TabButton = () => {
  const [tabContents, setTabContents] = useState<TabProps[]>([
    {label: '가나다 순', isSelected: true},
    {label: '최근 채팅 순', isSelected: false},
    {label: '사람 많은 순', isSelected: false},
    {label: '새로운 순', isSelected: false},
    {label: '홀로 있는 방', isSelected: false},
  ]);

  return (
    <StyledDiv>
      <StyledLabel>정렬</StyledLabel>
      <StyledTabContainer>
        {tabContents.map(contents => (
          <TabEl onClick={setTabContents} tabContents={tabContents} contents={contents}></TabEl>
        ))}
      </StyledTabContainer>
    </StyledDiv>
  );
};

export default TabButton;

const StyledLabel = styled.label`
  font-size: ${theme.fonts.body2.fontSize};
  color: ${theme.colors.gray700};
  margin-right: 16px;
`;

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  margin-top: 16px;
`;

const StyledTabContainer = styled(StyledDiv)`
  gap: 16px;
  border: 1px solid ${theme.colors.gray400};
  margin-top: 0;

  background-color: ${theme.colors.gray100};
  padding: 4px 12px;
  border-radius: 4px;
`;
