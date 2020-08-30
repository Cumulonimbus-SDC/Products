const { Router } = require('express');
const router = Router();
const { getProductById } = require('../../database/Postgres/getProductById.js');
const { getProductList } = require('../../database/Postgres/getProductList.js');

router.get('/products/list', function (req, res) {
  // res.send('Product List');
  getProductList(req.query.count, req.query.page)
    .then(result => res.send(result))
    .catch(err => res.sendStatus(500));
});

router.get('/products/:id', (req, res) => {
  const prod = req.params.id;
  // res.send(`this is the great product ${prod}`);
  getProductById(prod)
  .then(result => {
    console.log(result);
    res.send(result);
  })
    .catch(err => res.sendStatus(404));

});

router.get('/products/:id/styles', (req, res) => {
  const prod = req.params.id;
  console.log(req.params, 'this is params');
  console.log(req.query, 'this is query');
  res.send(`this is product ${prod} styles`);
});

module.exports = router;