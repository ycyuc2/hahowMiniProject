import actionTypes from './actionTypes';

const getHeros = payload => {
  return dispatch => {
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
          })
          .catch(err => {
          })
      })
      .catch(err => {
      })
  }

}

const herosActions = {
  getHeros,
}

export default herosActions