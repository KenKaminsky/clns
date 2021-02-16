import React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import Data from '../Pages/data';
import Insight from '../Pages/predict';
import { Flex, FlexCenter, RowContainer } from '../styles';
import PageNotFound from './PageNotFound';
import { Header, LayoutGrid } from './styles';

const Layout: React.FC = () => {
  return (
    <LayoutGrid>
      <Header>
        <RowContainer data-testid={'nav'}>
          <FlexCenter as={NavLink} to='/' exact>
            Data
          </FlexCenter>
          <FlexCenter as={NavLink} to='/insight'>
            Insight
          </FlexCenter>
        </RowContainer>
      </Header>
      <LayoutGrid data-testid={'main'}>
        <Switch>
          <Route exact path='/' component={Data} />
          <Route path='/insight/:series' component={Insight} />
          <Route component={PageNotFound} />
        </Switch>
      </LayoutGrid>
    </LayoutGrid>
  );
};

export default Layout;
