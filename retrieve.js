var Stocks = require('./node_modules/stocks.js/dist/stocks');
var stocks = new Stocks('Y7WGG1NC4JYN88J9');

async function vantage_request(symbol, interval, amount) {
  let json_result = await stocks.timeSeries({
    symbol: symbol,
    interval: interval,
    amount: amount
  });
  let result = "Open,High,Low,Close,Volume,Date\r\n";
  json_result.forEach( function (row) {
    row.date = row.date.toString().split(' ');
    row.date = [row.date[2],row.date[1],row.date[3],row.date[4]].join('-');
    row = Object.values(row).join(',');
    result += row + "\r\n";
  });
  return result.substr(result.search("Open"), result.length);
}

module.exports.vantage_request = vantage_request;