import styled from 'styled-components';
import {theme} from '../../../../styles/Theme';
import TabProps from './TabProps';

interface Props {
  tabContents: TabProps[];
  contents: TabProps;
  onClick: React.Dispatch<React.SetStateAction<TabProps[]>>;
}

const TabEl = (props: Props) => {
  const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const tar = e.target as HTMLButtonElement;
    const targetLabel = tar.textContent;
    console.log(targetLabel);

    let copied = props.tabContents.slice();
    copied.forEach(el => {
      if (el.label === targetLabel) {
        el.selected = true;
      } else {
        el.selected = false;
      }
    });

    props.onClick(copied);
  };

  return (
    <StyledTabEl //
      onClick={clickHandler}
      selected={props.contents.selected}
    >
      {props.contents.label}
    </StyledTabEl>
  );
};

export default TabEl;

const StyledTabEl = styled.button<{selected?: boolean}>`
  width: 84px;
  height: 26px;

  background-color: ${props => (props.selected ? theme.colors.blue700 : '')};
  color: ${props => (props.selected ? theme.colors.white : theme.colors.gray900)};
  border-radius: 4px;
  white-space: nowrap;
  padding: 0;
`;