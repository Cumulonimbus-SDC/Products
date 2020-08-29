const { Router } = require('express');
const router = Router();

router.get('/products/list', function (req, res) {
  res.send('Product List');
});

router.get('/products/:id', (req, res) => {
  const prod = req.params.id;
  res.send(`this is the great product ${prod}`);
});

router.get('/products/:id/styles', (req, res) => {
  const prod = req.params.id;
  console.log(req.params, 'this is params');
  console.log(req.query, 'this is query');
  res.send(`this is product ${prod} styles`);
});

module.exports = router;