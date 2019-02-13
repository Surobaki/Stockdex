var express = require('express');
var router = express.Router();
var stock_request = require('../retrieve.js');
let stock_response;

router.get('/', function(req, res) {
  if (req.query.ticker != null && req.query.range != null && req.query.entry != null) {
   stock_request.vantage_request(req.query.ticker,
                                 req.query.range,
                                 req.query.entry)
     .then(value => (stock_response = value))
     .catch(console.log);
  res.render('timeseries', {ticker: req.query.ticker,
                            range: req.query.range,
                            entry: req.query.entry,
                            data: stock_response});
  }
  else {res.render('index')}
});
module.exports = router;
