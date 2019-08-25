import React, { useEffect } from 'react';
import styled from 'styled-components'
import { useRoutes, A } from 'hookrouter';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import actionCreators from '../actions';
import HeroView from './HeroView'

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
const HeroCardItem = styled(({ active, ...props }) => <A {...props} />)`
  display: block;
  text-decoration: none;
  float: left;
  background-color: #000;
  padding: 10px;
  transition: .2s;
  border-radius: 3px;
  transform: scale(${props => props.active ? 1.02 : 1});
  filter: grayscale(${props => props.active ? 0 : .5});
  box-shadow: ${props => props.active ? '0px 0px 16px #0f0, 0 0 10px #fff' : 0};
  &:hover {
    transform: scale(1.02);
    box-shadow: 0px 0px 16px #0f0, 0 0 10px #fff;
    filter: grayscale(0);
  }
  @media screen and (min-width: 1060px){
    width: 234.5px;
    margin-right: 20px;
    margin-bottom: 20px;
    &:nth-child(4n) {
      margin-right: 0;
    }
  }
  @media screen and (min-width: 768px) and (max-width: 1059px){
    width: 32%;
    margin-right: 2%;
    margin-bottom: 2%;
    &:nth-child(3n) {
      margin-right: 0;
    }
  }
  @media screen and (min-width: 480px) and (max-width: 767px){
    width: 48%;
    margin-right: 4%;
    margin-bottom: 4%;
    &:nth-child(2n) {
      margin-right: 0;
    }
  }
  @media screen and (max-width: 480px){
    width: 100%;
    margin-bottom: 20px;
  }
`;
const HeroImg = styled.div`
  width: 100%;
  padding-bottom: 100%;
  background-image: url(${props => props.imgurl});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
`;
const HeroName = styled.div`
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  color: #0f0;
  padding: 20px 0;
  user-select: none;
`;

// view
const HeroListView = props => {
  const routeResult = useRoutes(routes);
  // effects
  useEffect(() => {
    if (props.isInit) return
    props.heroActions.getHeros()
  }, [])
  return (
    <HeroListContainer>
      <HeroListWrapper>
        {props.ids.map((id, idx) => {
          const hero = props.herosCache[id]
          const {
            id: heroId,
            image,
            name
          } = hero
          return (
            <HeroCardItem
              key={heroId}
              href={`/heros/${heroId}`}
            >
              <HeroImg 
                imgurl={image}
              />
              <HeroName>
                {name}
              </HeroName>
            </HeroCardItem>
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