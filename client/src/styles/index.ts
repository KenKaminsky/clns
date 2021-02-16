import styled from 'styled-components';

export const BaseContainer = styled.div`
  min-height: 100%;
  min-width: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export const Flex = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1rem;

  height: 100%;
  width: 100%;
  transition: all 500ms;
  overflow: hidden;
`;

export const FlexCenter = styled(Flex)`
  justify-content: center;
  align-items: center;
`;

export const HighContainer = styled.div`
  height: 100%;
`;

export const RowContainer = styled(Flex)`
  flex-direction: row;
  justify-content: space-around;
`;

interface IGrid {
  cols: number;
  rows: number;
}

export const Grid = styled.div<IGrid>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.cols}, 1fr);
  grid-template-rows: repeat(${(props) => props.rows}, 1fr);
  height: 100%;
  width: 100%;
`;

export const colors = {
  dark: '#1D1E27',
  light: '#fff',
  primary: '#0A6ED1',
};
