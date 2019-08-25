import React from 'react';
import { useRoutes, useRedirect } from 'hookrouter';
import HeroListView from './components/HeroListView'
import styled from 'styled-components'

const Container = styled.div`
  min-height: 100vh;
  min-width: 100vw;
  background-color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const routes = {
  '/heros*': () => <HeroListView />,
};

function App() {
  const routeResult = useRoutes(routes);
  return (
      <Container>
        {routeResult}
      </Container>
  )
}

export default App;
