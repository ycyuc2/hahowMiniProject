import React from 'react';
import { useRoutes, useRedirect } from 'hookrouter';
import { Provider } from 'react-redux'
import styled from 'styled-components'
import HeroListView from './components/HeroListView'
import store from './store/store'

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
  useRedirect('/', '/heros')
  const routeResult = useRoutes(routes);
  return (
    <Provider store={store}>
      <Container>
        {routeResult}
      </Container>
    </Provider>
  )
}

export default App;
