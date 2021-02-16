import styled from 'styled-components';
import { colors, Grid } from '../../styles';

export const DataLayout = styled(Grid)`
  padding: 15px;
  grid-template-columns: 200px auto;
`;

export const InsightButton = styled.button`
  height: 2rem;
  width: 100%;
  border-radius: 4px;
  margin-top: 10px;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${colors.primary};
  color: ${colors.light};
`;
