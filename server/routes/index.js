const { Router } = require('express');
const router = Router();
const { getProductById } = require('../../database/Postgres/getProductById.js');
const { getProductList } = require('../../database/Postgres/getProductList.js');
const { getRelated } = require('../../database/Postgres/getRelated.js');
const { getStyles } = require('../../database/Postgres/getStyles.js');
// import cache methods
const {
  getProductByIdCache,
  setProductByIdCache,
} = require('../../database/Redis/getProductsById.js');

router.get('/products/list', function (req, res) {
  // res.send('Product List');
  getProductList(req.query.count, req.query.page)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => res.sendStatus(500));
});

router.get('/products/:id', (req, res) => {
  const prod = req.params.id;
  getProductByIdCache(prod)
    .then((cached) => {
      if (cached) return cached;

      // res.send(`this is the great product ${prod}`);
      return getProductById(prod)
        .then((result) => {
          setProductByIdCache(prod, result).catch((e) => console.log(e));
          return result;
        })
        .catch((err) => {
          throw new Error('Error getting data');
        });
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(404);
      res.send('Error getting product');
    });

  // console.log(cached);
});

router.get('/products/:id/styles', (req, res) => {
  const prod = req.params.id;

  getStyles(prod)
    .then((result) => res.send(result))
    .catch((err) => res.sendStatus(500));
  // res.send(`this is product ${prod} styles`);
});

router.get('/products/:id/related', (req, res) => {
  const prod = req.params.id;

  getRelated(prod)
    .then((result) => res.send(result))
    .catch((err) => res.sendStatus(500));
});

module.exports = router;
