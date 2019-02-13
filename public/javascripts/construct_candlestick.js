let data = d3.select("#charter_script").attr("data");
const margin = {top: 20, right: 20, bottom: 30, left: 50},
  width = 960 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;
const parseDate = d3.timeParse("%d-%b-%Y-%H:%M:%S");
let x = techan.scale.financetime().range([0, width]);
let y = d3.scaleLinear().range([height, 0]);
let candlestick = techan.plot.candlestick().xScale(x).yScale(y);
let svg = d3.select("body").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
let accessor = candlestick.accessor();

let chart_data = d3.csvParse(data, function (data_row) {
  for (let key in data_row) {
    const filter = ['date'];
    if (!filter.includes(key.toLowerCase())) {
      data_row[key] = parseFloat(data_row[key]);
    } else if (filter.includes(key.toLowerCase())) {
      data_row[key] = parseDate(data_row[key]);
    }
  }
  return data_row;
});

svg.append("g")
  .attr("class", "candlestick");
svg.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + height + ")");
svg.append("g")
  .attr("class", "y axis")
  .append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 6)
  .attr("dy", ".71em")
  .style("text-anchor", "end")
  .text("Price ($)");

let x_dom = function (dates) {
  for (let entry of chart_data) {
    if (chart_data.hasOwnProperty(entry)) {
      dates.push(entry.date);
    }
  }
  return dates;
};

let y_dom = function (numericals) {
  for (let entry of chart_data) {
    numericals.push(entry.open, entry.high, entry.low, entry.close);
    return numericals.sort(function (a, b) {
      return d3.ascending(a, b);
    });
  }
};

x.domain(x_dom.call());

y.domain(y_dom.call());

svg.selectAll("g.candlestick").datum(data).call(candlestick);
svg.selectAll("g.x.axis").call(x);
svg.selectAll("g.y.axis").call(y);
