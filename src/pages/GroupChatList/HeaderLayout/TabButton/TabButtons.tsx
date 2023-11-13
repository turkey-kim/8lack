import styled from 'styled-components';
import TabEl from './TabEl';
import {theme} from '../../../../styles/Theme';
import TabProps from './TabProps';

interface tabButtonProps {
  setTabs: React.Dispatch<React.SetStateAction<TabProps[]>>;
  tabs: TabProps[];
}

const TabButton = (props: tabButtonProps) => {
  return (
    <StyledDiv>
      <StyledLabel>정렬</StyledLabel>
      <StyledTabContainer>
        {props.tabs.map(tab => (
          <TabEl key={tab.label} onClick={props.setTabs} tabs={props.tabs} tab={tab}></TabEl>
        ))}
      </StyledTabContainer>
    </StyledDiv>
  );
};

export default TabButton;

const StyledLabel = styled.label`
  font-size: ${theme.fonts.body2.fontSize};
  color: ${theme.colors.gray700};
  margin-right: 1rem;
`;

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  margin-top: 1rem;
`;

const StyledTabContainer = styled(StyledDiv)`
  gap: 16px;
  border: 1px solid ${theme.colors.gray400};
  margin-top: 0;

  background-color: ${theme.colors.gray100};
  padding: 0.25rem 0.75rem;
  border-radius: 0.25rem;
`;
