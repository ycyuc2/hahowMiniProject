import React, { useEffect } from 'react';
import styled from 'styled-components'
import { useRoutes } from 'hookrouter';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import actionCreators from '../actions';
import HeroView from './HeroView'
import HeroCardView from './HeroCardView'

// routes
const routes = {
  '/:heroId': ({ heroId }) => <HeroView heroId={heroId} />
};

// styled
const HeroListContainer = styled.div`
  width: 100%;
  max-width: 1040px;
  @media screen and (max-width: 1060px){
    padding: 0 20px
  }
`;
const HeroListWrapper = styled.div`
  width: 100%;
  padding: 20px 20px 0 20px;
  border: 1px solid #0f0;
  border-radius: 3px;
  &:after {
    content: '';
    display: block;
    clear: both;
  }
`;
const StatusWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: #0f0;
  height: 300px;
`;


// view
const HeroListView = props => {
  const routeResult = useRoutes(routes);
  // effects
  useEffect(() => {
    if (props.isInit) return
    props.heroActions.getHeros()
    // eslint-disable-next-line
  }, [])
  return (
    <HeroListContainer>
      <HeroListWrapper>
        {props.isLoading ?
          <StatusWrapper>
            Loading...我在 develope 分支做ㄌ一件事
          </StatusWrapper>
          :
          null
        }
        {props.isError ?
          <StatusWrapper>
            An error occurred, please try again.
          </StatusWrapper>
          :
          null
        }
        {props.ids.map((id, idx) => {
          const hero = props.herosCache[id]
          const {
            id: heroId,
          } = hero
          return (
            <HeroCardView
              key={heroId}
              hero={hero}
            />
          )
        })}
      </HeroListWrapper>
      {routeResult}
    </HeroListContainer>
  )
}


const mapStateToProps = state => {
  return {
    ids: state.heros.ids,
    herosCache: state.heros.herosCache,
    isLoading: state.heros.isLoading,
    isError: state.heros.isError,
    isInit: state.heros.isInit,
  };
};

const mapActionToProps = dispatch => {
  return {
    heroActions: bindActionCreators(actionCreators.heroActionCreators, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(HeroListView)