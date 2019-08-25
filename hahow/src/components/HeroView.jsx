import React from 'react';
import styled from 'styled-components'


// styled
const HeroProfileContainer = styled.div`
  width: 100%;
  padding: 20px;
  border: 1px solid #0f0;
  border-radius: 3px;
  margin-top: 20px;
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  @media screen and (max-width: 767px){
    flex-direction: column;
  }
`;
const HeroStatusArea = styled.div`
  width: 49%;
  height: 300px;
  background-color: #fff;
  @media screen and (max-width: 767px){
    width: 100%;
  }
`;
const HeroImgAndSaveArea = styled.div`
  width: 30%;
  height: 300px;
  background-color: #fff;
  @media screen and (max-width: 767px){
    width: 100%;
    margin-top: 30px;
  }
`;


const HeroView = props => {
  return (
    <HeroProfileContainer>
      <HeroStatusArea>
      </HeroStatusArea>
      <HeroImgAndSaveArea>
      </HeroImgAndSaveArea>
    </HeroProfileContainer>
  )
}


export default HeroView