import React from 'react';
import styled from 'styled-components'


// styled
const HeroListContainer = styled.div`
  width: 100%;
  max-width: 1040px;
  @media screen and (max-width: 1060px){
    padding: 0 20px
  }
`;

const HeroListView = props => {
  return (
    <HeroListContainer>
      HeroListView
    </HeroListContainer>
  )
}

export default HeroListView