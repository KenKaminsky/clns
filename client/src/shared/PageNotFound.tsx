import React from 'react';
import { Flex, FlexCenter } from '../styles';

export const PAGE_NOT_FOUND_MESSAGE =
  '404 - This is not the page you are looking for';

const PageNotFound: React.FC = () => {
  return <FlexCenter>{PAGE_NOT_FOUND_MESSAGE}</FlexCenter>;
};

export default PageNotFound;
