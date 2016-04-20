var w = 600;
var h = 250;
var dataset = [5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
   11, 12, 15, 20, 18, 17, 16, 18, 23, 25
];
var barPadding = 1;
var padding = 30;
// create empty svg element within the body tag
var svg = d3.select('body')
   .append('svg')
   .attr('width', w)
   .attr('height', h);

var xScale = d3.scale.ordinal()
   .domain(d3.range(dataset.length))
   .rangeRoundBands([0, w], 0.05);

var yScale = d3.scale.linear()
   .domain([0, d3.max(dataset)])
   .range([0, h]);


var sortOrder = false;
// sort bars
var sortBars = function() {
   sortOrder = !sortOrder;
   svg.selectAll('rect')
   // reorder elements based on their bound data values
   .sort(function(a, b) {
      // comparator function, a and b represent two different elements
      if (sortOrder) {
         return d3.ascending(a, b);
      } else {
         return d3.descending(a, b);
      }
   })
      .transition()
      .duration(1000)
      .delay(function(d, i) {
         return i * 50;
      })
      .attr('x', function(d, i) {
         return xScale(i);
      });
};
// shapes about to be created inside svg
svg.selectAll('rect')
   .data(dataset)
   .enter()
   .append('rect')
   .attr({
      x: function(d, i) {
         return i * (w / dataset.length);
      },
      y: function(d) {
         return h - d * 4;
      },
      width: w / dataset.length - barPadding,
      height: function(d) {
         return d * 4;
      },
      fill: function(d) {
         return 'rgb(0,0,' + (d * 10) + ')';
      }
   });
svg.selectAll('rect')
   .on('click', function() {
      sortBars();
   });
