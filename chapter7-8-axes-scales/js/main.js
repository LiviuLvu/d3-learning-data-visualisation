var h = 300;
var w = 500;
var padding = 30;

// dynamic data
var dataset = [];
var numDataPoints = 30;
var xRange = Math.random() * 1000;
var yRange = Math.random() * 1000;
for (var i = 0; i < numDataPoints; i++) {
   var newNumber1 = Math.floor(Math.random() * xRange);
   var newNumber2 = Math.floor(Math.random() * yRange);
   dataset.push([newNumber1, newNumber2]);
}


// static data
// var dataset = [
//    [5, 20],
//    [480, 90],
//    [250, 50],
//    [100, 33],
//    [330, 95],
//    [410, 12],
//    [475, 44],
//    [25, 67],
//    [85, 21],
//    [220, 88],
//    [600, 150],
// ];

var xScale = d3.scale.linear()
   .domain([0, d3.max(dataset, function(d) {
      return d[0];
   })])
   .range([padding, w - padding]);

var yScale = d3.scale.linear()
   .domain([0, d3.max(dataset, function(d) {
      return d[1];
   })])
   .range([h - padding, padding]);

// circle size
var rScale = d3.scale.linear()
   .domain([0, d3.max(dataset, function(d) {
      return d[1];
   })]).range([2, 10]);

// axes
var xAxis = d3.svg.axis()
   .scale(xScale)
   .orient('bottom')
   .ticks(5);
var yAxis = d3.svg.axis()
   .scale(yScale)
   .orient('left')
   .ticks(5);

// Create SVG element
var svg = d3.select("body")
   .append("svg")
   .attr("width", w)
   .attr("height", h);

// Call axis function within the g (group) of the svg
svg.append('g')
   .attr({
      'class': 'axis',
      'transform': 'translate(0, ' + (h - padding) + ')',
   })
   .call(xAxis);
svg.append('g')
   .attr({
      'class': 'axis',
      'transform': 'translate(' + padding + ', 0)',
   })
   .call(yAxis);

// circles
svg.selectAll("circle")
   .data(dataset)
   .enter()
   .append("circle")
   .attr({
      'cx': function(d) {
         return xScale(d[0]);
      },
      'cy': function(d) {
         return yScale(d[1]);
      },
      'x': function(d) {
         return xScale(d[0]);
      },
      'y': function(d) {
         return yScale(d[1]);
      },
      "r": function(d) {
         return rScale(d[1]);
      }
   });
