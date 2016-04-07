var w = 600;
var h = 250;

var dataset = [5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
   11, 12, 15, 20, 18, 17, 16, 18, 23, 25
];

// Create ordinal scale
var xScale = d3.scale.ordinal()
   // generate array of sequential numbers 0,1,2,3
   .domain(d3.range(dataset.length))
   .rangeRoundBands([0, w], 0.05);

var yScale = d3.scale.linear()
   .domain([0, d3.max(dataset)])
   .range([0, h]);

// Create empty svg element within the body tag
var svg = d3.select('body')
   .append('svg')
   .attr('width', w)
   .attr('height', h);

// Bar shapes about to be created inside svg
svg.selectAll('rect')
   .data(dataset)
   .enter()
   .append('rect')
   .attr({
      x: function(d, i) {
         return xScale(i);
      },
      y: function(d) {
         return h - yScale(d);
      },
      width: xScale.rangeBand(),
      height: function(d) {
         return yScale(d);
      },
      fill: function(d) {
         return 'rgb(0,0,' + (d * 10) + ')';
      }
   });
// Add text labels to columns
svg.selectAll('text')
   .data(dataset)
   .enter()
   .append('text')
   .text(function(d) {
      return d;
   })
   .attr({
      x: function(d, i) {
         return xScale(i) + xScale.rangeBand() / 2;
      },
      y: function(d) {
         return h - yScale(d) + 14;
      },
      'font-family': 'sans-serif',
      'font-size': '11px',
      'fill': 'white',
      'text-anchor': 'middle',
   });

// Update code on click (once)
d3.select('.update-values')
   .on('click', function() {
      // generate random values for dataset
      var numValues = dataset.length;
      var maxValue = 25;
      dataset = [];
      for (var i = 0; i < numValues; i++) {
         var newNumber = Math.floor(Math.random() * maxValue);
         dataset.push(newNumber);
      }

      // Update all rects
      svg.selectAll('rect')
         .data(dataset)
         .transition()
         .delay(function(d, i) {
            // Staggered animation has same duration() regardless of number of data nodes
            return i / dataset.length * 1000;
         })
         .duration(500)
         .attr({
            y: function(d) {
               return h - yScale(d);
            },
            height: function(d) {
               return yScale(d);
            },
            fill: function(d) {
               return 'rgb(0,0,' + (d * 10) + ')';
            },
         });

      svg.selectAll('text')
         .data(dataset)
         .transition()
         .delay(function(d, i) {
            // Staggered animation has same duration() regardless of number of data nodes
            return i / dataset.length * 1000;
         })
         .duration(500)
         .text(function(d) {
            return d;
         })
         .attr({
            y: function(d) {
               return h - yScale(d) + 14;
            },
         });
   });
