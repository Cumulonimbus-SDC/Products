const { getAsync, setAsync } = require('./index.js');

const producsCommonKey = 'product:id';

module.exports = {
  getProductByIdCache: (id) => {
    return getAsync(`${producsCommonKey}${id}`)
      .then((res) => JSON.parse(res))
      .catch(() => null);
  },
  setProductByIdCache: (id, body) => {
    return setAsync(`${producsCommonKey}${id}`, JSON.stringify(body))
      .then((res) => console.log('added to cache'))
      .catch(() => {
        throw new Error('Failed to save');
      });
  },
};
