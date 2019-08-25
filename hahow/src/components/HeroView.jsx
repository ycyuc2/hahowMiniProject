import React from 'react';
import styled from 'styled-components'

// react-icons
import { MdAdd } from "react-icons/md";
import { MdRemove } from "react-icons/md";

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
  @media screen and (max-width: 767px){
    width: 100%;
  }
`;
const HeroImgAndSaveArea = styled.div`
  width: 30%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: column;
  @media screen and (max-width: 767px){
    width: 100%;
    margin-top: 30px;
  }
`;
const PointLeft = styled.div`
  color: #0f0;
  display: flex;
  align-items: center;
  font-size: 20px;
  margin-bottom: 20px;
  user-select: none;
  > span {
    margin-left: 10px;
  }
`;
const SaveBtn = styled.div`
  width: 100%;
  height: 50px;
  border-radius: 3px;
  border: 4px solid #0f0;
  transition: .2s;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0f0;
  background-color: #333;
  font-size: 24px;
  font-weight: bold;
  user-select: none;
  &:hover {
    border: 4px solid #fff;
    background-color: #fff;
    color: #000;
  }
`;
const HeroStatusRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
`;
const StatusName = styled.div`
  font-size: 20px;
  width: 60px;
  margin-right: 10px;
  font-weight: bold;
  user-select: none;
  color: ${props => props.color};
`;
const Btn = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 3px;
  border: 4px solid #0f0;
  background-color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0f0;
  margin-right: 10px;
  transition: .2s;
  cursor: pointer;
  svg {
    font-size: 20px;
  }
  &:hover {
    border: 4px solid #999;
    background-color: #999;
    color: #000;
  }
  &:last-child {
    margin-right: 0;
  }
`;
const StatusBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 20px;
  transition: .2s;
`;
const StatusBarContainer = styled.div`
  flex: 1;
  height: 20px;
  margin-right: 10px;
  border: 1px solid ${props => props.color};
  position: relative;
  ${StatusBar} {
    background-color: ${props => props.color};
    width: ${props => props.statusPercentage}%;
  }
`;


const HeroView = props => {
  return (
    <HeroProfileContainer>
      <HeroStatusArea>
        <HeroStatusRow>
          <StatusName
            color="#f00"
          >
            STR
          </StatusName>
          <Btn>
            <MdRemove />
          </Btn>
          <StatusBarContainer
            color="#f00"
            statusPercentage={50}
          >
            <StatusBar />
          </StatusBarContainer>
          <Btn>
            <MdAdd />
          </Btn>
        </HeroStatusRow>
        <HeroStatusRow>
          <StatusName
            color="#09f"
          >
            INT
          </StatusName>
          <Btn>
            <MdRemove />
          </Btn>
          <StatusBarContainer
            color="#09f"
            statusPercentage={50}
          >
            <StatusBar />
          </StatusBarContainer>
          <Btn>
            <MdAdd />
          </Btn>
        </HeroStatusRow>
        <HeroStatusRow>
          <StatusName
            color="#0f0"
          >
            AGI
          </StatusName>
          <Btn>
            <MdRemove />
          </Btn>
          <StatusBarContainer
            color="#0f0"
            statusPercentage={50}
          >
            <StatusBar />
          </StatusBarContainer>
          <Btn>
            <MdAdd />
          </Btn>
        </HeroStatusRow>
        <HeroStatusRow>
          <StatusName
            color="#ff0"
          >
            LUK
          </StatusName>
          <Btn>
            <MdRemove />
          </Btn>
          <StatusBarContainer
            color="#ff0"
            statusPercentage={50}
          >
            <StatusBar />
          </StatusBarContainer>
          <Btn>
            <MdAdd />
          </Btn>
        </HeroStatusRow>
      </HeroStatusArea>
      <HeroImgAndSaveArea>
        <PointLeft>
          POINT: <span>10</span>
        </PointLeft>
        <SaveBtn>
          SAVE
        </SaveBtn>
      </HeroImgAndSaveArea>
    </HeroProfileContainer>
  )
}


export default HeroView