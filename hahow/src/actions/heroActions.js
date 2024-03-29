import actionTypes from './actionTypes';

function getHerosStart(payload = {}) {
  return {
    type: actionTypes.getHerosStart,
    payload
  }
}

function getHerosError(payload = {}) {
  return {
    type: actionTypes.getHerosError,
    payload
  }
}

function getHerosSuccess(data) {
  const payload = {
    herosCache: data.herosCache,
    ids: data.ids,
  }
  return {
    type: actionTypes.getHerosSuccess,
    payload
  }
}

const getHeros = payload => {
  return dispatch => {
    dispatch(getHerosStart())
    let url = 'http://hahow-recruit.herokuapp.com/heroes'
    fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'GET'
    })
      .then(response => {
        response.json()
          .then(result => {
            // reduce an array to {id:obj, ...}
            const herosCache = result.reduce((item, value) => {
              item[value.id] = value
              return item;
            }, {});

            const ids = result.reduce((item, value) => {
              item.push(value.id)
              return item
            }, [])
            dispatch(getHerosSuccess({ herosCache, ids }))
          })
          .catch(err => {
            dispatch(getHerosError())
          })
      })
      .catch(err => {
        dispatch(getHerosError())
      })
  }

}

function selectHeroSuccess(data) {
  const payload = {
    heroId: data.heroId
  }
  return {
    type: actionTypes.selectHeroSuccess,
    payload
  }
}

function selectHero(payload) {
  const {
    heroId
  } = payload
  return dispatch => {
    dispatch(selectHeroSuccess({ heroId }))
  }
}

function getHeroProfile(payload) {
  const {
    heroId
  } = payload
  return dispatch => {
    return new Promise((resolve, reject) => {
      let url = `http://hahow-recruit.herokuapp.com/heroes/${heroId}/profile`
      fetch(url, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'GET'
      })
        .then(response => {
          response.json()
            .then(result => {
              resolve(result)
            })
            .catch(err => {
              reject(err)
            })
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}


function updateHeroProfile(payload) {
  const {
    heroProfile,
    heroId
  } = payload
  return dispatch => {
    return new Promise((resolve, reject) => {
      let url = `https://hahow-recruit.herokuapp.com/heroes/${heroId}/profile`
      fetch(url, {
        headers: {
          "Content-Type": "application/json"
        },
        method: 'PATCH',
        body: JSON.stringify(heroProfile)
      })
        .then(response => {
          response.text()
            .then(result => {
              resolve()
            })
            .catch(err => {
              reject()
            })
        })
        .catch(err => {
          reject()
        })
    })
  }
}

const herosActions = {
  getHeros,
  selectHero,
  getHeroProfile,
  updateHeroProfile
}

export default herosActions