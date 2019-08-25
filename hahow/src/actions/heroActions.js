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

const herosActions = {
  getHeros,
}

export default herosActions