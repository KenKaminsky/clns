import styled from 'styled-components';
import { colors, Flex } from '../styles';

export const LayoutGrid = styled(Flex)`
  background: ${colors.dark};
  color: ${colors.light};
  font-family: 'Noto Sans', sans-serif;

  display: grid;
  height: 100%;
  grid-template-areas:
    'header'
    'main';
  grid-template-rows: 100px minmax(100px, auto);
`;

export const Header = styled(Flex)`
  grid-area: header;
`;

export const Main = styled(Flex)`
  grid-area: main;
  height: 100%;
`;
