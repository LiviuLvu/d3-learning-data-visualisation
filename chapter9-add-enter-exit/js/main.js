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
      'x': function(d, i) {
         return xScale(i);
      },
      'y': function(d) {
         return h - yScale(d);
      },
      'width': xScale.rangeBand(),
      'height': function(d) {
         return yScale(d);
      },
      'fill': function(d) {
         return 'rgb(0,0,' + (d * 10) + ')';
      }
   });

// Update random values on click
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
// add new value to dataset array
d3.select('.add-item')
   .on('click', function() {
      // value representing maximum height of bars
      var maxValue = 25;
      // random new number
      var newNumber = Math.floor(Math.random() * maxValue);
      // add number to array
      dataset.push(newNumber);
      // update scale domains
      xScale.domain(d3.range(dataset.length));
      yScale.domain([0, d3.max(dataset)]);
      // rebind data to existing bars
      var bars = svg.selectAll('rect').data(dataset);
      // enter the new data
      bars.enter()
         .append('rect')
         .attr({
            'x': w,
            'y': function(d) {
               return h - yScale(d);
            },
            'width': xScale.rangeBand(),
            'height': function(d) {
               return yScale(d);
            },
            'fill': function(d) {
               return 'rgb(0,' + (d * 10) + ',0)';
            }
         });
      // update elements
      bars.transition()
         .duration(500)
         .attr({
            'x': function(d, i) {
               // position based on updated xScale
               return xScale(i);
            },
            'y': function(d) {
               return h - yScale(d);
            },
            'width': xScale.rangeBand(),
            'height': function(d) {
               return yScale(d);
            },
         });

   });
// remove item
d3.select('.del-item')
   .on('click', function() {
      // remove one item from the start of the data array
      dataset.shift();
      // update scale domains
      xScale.domain(d3.range(dataset.length));
      yScale.domain([0, d3.max(dataset)]);
      // select remaining elements
      var bars = svg.selectAll('rect').data(dataset);
      // enter selection, a subset of update dataset selection
      bars.enter()
         .append('rect')
         .attr({
            // x: set initial position beyond the right edge of svg
            'x': w,
            'y': function(d) {
               return h - yScale(d);
            },
            'width': xScale.rangeBand(),
            'height': function(d) {
               return yScale(d);
            },
            'fill': function(d) {
               return 'rgb(0,0' + (d * 10) + ')';
            },
         });
      // transition all elements in update selection (var bars)
      bars.transition()
         .duration(500)
         .attr({
            // new position based on updated xScale
            'x': function(d, i) {
               return xScale(i);
            },
            'y': function(d) {
               return h - yScale(d);
            },
            'width': xScale.rangeBand(),
            'height': function(d) {
               return yScale(d);
            },
         });
      // exit selection, a subset of update dataset selection
      bars.exit()
      // transition the one element we are deleting
      .transition()
         .duration(500)
      // move past edge of svg
      .attr('x', w)
      // delete from DOM once transition completed
      .remove();
   });
