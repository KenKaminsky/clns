import React from 'react';
import { Flex } from '../styles';

export const PAGE_NOT_FOUND_MESSAGE =
  '404 - This is not the page you are looking for';

const PageNotFound: React.FC = () => {
  return <Flex>{PAGE_NOT_FOUND_MESSAGE}</Flex>;
};

export default PageNotFound;
