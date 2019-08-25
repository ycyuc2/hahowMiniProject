import React, { useEffect, useState }  from 'react';
import styled from 'styled-components'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import actionCreators from '../actions';

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
  border: 4px solid ${props => props.active ? '#0f0' : '#999'};
  transition: .2s;
  cursor: ${props => props.active ? 'pointer' : 'not-allowed'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.active ? '#0f0' : '#000'};
  background-color: ${props => props.active ? '#333' : '#ccc'};
  font-size: 24px;
  font-weight: bold;
  user-select: none;
  &:hover {
    border: 4px solid ${props => props.active ? '#fff' : '#999'};
    background-color: ${props => props.active ? '#fff' : '#999'};
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
  border: 4px solid ${props => props.disable ? '#999' : '#0f0'};
  background-color: ${props => props.disable ? '#ccc' : '#333'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.disable ? '#000' : '#0f0'};;
  margin-right: 10px;
  transition: .2s;
  cursor: ${props => props.disable ? 'not-allowed' : 'pointer'};
  svg {
    font-size: 20px;
  }
  &:hover {
    border: 4px solid ${props => props.disable ? '#999' : '#fff'};
    background-color: ${props => props.disable ? '#999' : '#fff'};
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
  // effects
  useEffect(() => {
    props.selectedHero &&
      props.heroActions.getHeroProfile({
        heroId: props.selectedHero
      })
        .then(result => {
          setHeroProfile(result)
          const totalPoint = Object.values(result).reduce((prevValue, nextValue) => prevValue + nextValue)
          setTotalPoint(totalPoint)
        })
  }, [props.selectedHero])

  // states
  const [heroProfileState, setHeroProfile] = useState({})

  const [pointLeft, setPointLeft] = useState(0)

  const [totalPoint, setTotalPoint] = useState(0)

  const [isSaving, setSaving] = useState(false)

  // functions
  function handleProfileChange(type, fieldName) {
    let new_heroProfile = Object.assign({}, heroProfileState)
    const pointGap = type === 'minus' ? 1 : -1
    const new_pointLeft = pointLeft + pointGap
    const new_point = new_heroProfile[fieldName] - pointGap

    if (new_pointLeft > totalPoint || new_pointLeft < 0 || new_point < 0) return

    new_heroProfile = Object.assign({}, new_heroProfile, {
      [fieldName]: new_point
    })
    setPointLeft(new_pointLeft)
    setHeroProfile(new_heroProfile)
  }

  function updateHeroProfile() {
    if (pointLeft !== 0) return
    setSaving(true)
    props.heroActions.updateHeroProfile({
      heroId: props.selectedHero,
      heroProfile: heroProfileState
    }).then(
      // 無論如何都要改變 saving 狀態
      result => setSaving(false),
      err => setSaving(false)
    )
  }

  const hero = props.herosCache[props.selectedHero]
  if (!hero) return null
  
  const {
    str,
    int,
    agi,
    luk
  } = heroProfileState
  return (
    <HeroProfileContainer>
      <HeroStatusArea>
        <HeroStatusRow>
          <StatusName
            color="#f00"
          >
            STR
          </StatusName>
          <Btn
            onClick={() => handleProfileChange('minus', 'str')}
            disable={str === 0}
          >
            <MdRemove />
          </Btn>
          <StatusBarContainer
            color="#f00"
            statusPercentage={totalPoint ? (str / totalPoint) * 100 : 0}
          >
            <StatusBar />
          </StatusBarContainer>
          <Btn
            onClick={() => handleProfileChange('add', 'str')}
            disable={str === totalPoint || pointLeft === 0}
          >
            <MdAdd />
          </Btn>
        </HeroStatusRow>
        <HeroStatusRow>
          <StatusName
            color="#09f"
          >
            INT
          </StatusName>
          <Btn
            onClick={() => handleProfileChange('minus', 'int')}
            disable={int === 0}
          >
            <MdRemove />
          </Btn>
          <StatusBarContainer
            color="#09f"
            statusPercentage={totalPoint ? (int / totalPoint) * 100 : 0}
          >
            <StatusBar />
          </StatusBarContainer>
          <Btn
            onClick={() => handleProfileChange('add', 'int')}
            disable={int === totalPoint || pointLeft === 0}
          >
            <MdAdd />
          </Btn>
        </HeroStatusRow>
        <HeroStatusRow>
          <StatusName
            color="#0f0"
          >
            AGI
          </StatusName>
          <Btn
            onClick={() => handleProfileChange('minus', 'agi')}
            disable={agi === 0}
          >
            <MdRemove />
          </Btn>
          <StatusBarContainer
            color="#0f0"
            statusPercentage={totalPoint ? (agi / totalPoint) * 100 : 0}
          >
            <StatusBar />
          </StatusBarContainer>
          <Btn
            onClick={() => handleProfileChange('add', 'agi')}
            disable={agi === totalPoint || pointLeft === 0}
          >
            <MdAdd />
          </Btn>
        </HeroStatusRow>
        <HeroStatusRow>
          <StatusName
            color="#ff0"
          >
            LUK
          </StatusName>
          <Btn
            onClick={() => handleProfileChange('minus', 'luk')}
            disable={luk === 0}
          >
            <MdRemove />
          </Btn>
          <StatusBarContainer
            color="#ff0"
            statusPercentage={totalPoint ? (luk / totalPoint) * 100 : 0}
          >
            <StatusBar />
          </StatusBarContainer>
          <Btn
            onClick={() => handleProfileChange('add', 'luk')}
            disable={luk === totalPoint || pointLeft === 0}
          >
            <MdAdd />
          </Btn>
        </HeroStatusRow>
      </HeroStatusArea>
      <HeroImgAndSaveArea>
        <PointLeft>
          POINT: <span>{pointLeft}</span>
        </PointLeft>
        <SaveBtn
          active={pointLeft === 0}
        >
          SAVE
        </SaveBtn>
      </HeroImgAndSaveArea>
    </HeroProfileContainer>
  )
}

const mapStateToProps = state => {
  return {
    herosCache: state.heros.herosCache,
    selectedHero: state.heros.selectedHero,
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
)(HeroView)