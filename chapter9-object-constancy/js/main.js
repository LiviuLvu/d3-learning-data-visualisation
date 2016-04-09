var w = 600;
var h = 250;

var dataset = [{
   key: 0,
   value: 5
}, {
   key: 1,
   value: 10
}, {
   key: 2,
   value: 13
}, {
   key: 3,
   value: 19
}, {
   key: 4,
   value: 21
}, {
   key: 5,
   value: 25
}, {
   key: 6,
   value: 22
}, {
   key: 7,
   value: 18
}, {
   key: 8,
   value: 15
}, {
   key: 9,
   value: 13
}, {
   key: 10,
   value: 11
}, {
   key: 11,
   value: 12
}, {
   key: 12,
   value: 15
}, {
   key: 13,
   value: 20
}, {
   key: 14,
   value: 18
}, {
   key: 15,
   value: 17
}, {
   key: 16,
   value: 16
}, {
   key: 17,
   value: 18
}, {
   key: 18,
   value: 23
}, {
   key: 19,
   value: 25
}];
var key = function(d) {
   return d.key;
};
var theVal = function(d) {
   return d.value;
};
// Create ordinal scale
var xScale = d3.scale.ordinal()
   // generate array of sequential numbers 0,1,2,3
   .domain(d3.range(dataset.length))
   .rangeRoundBands([0, w], 0.05);

var yScale = d3.scale.linear()
   .domain([0, d3.max(dataset, theVal)])
   .range([0, h]);

// Create empty svg element within the body tag
var svg = d3.select('body')
   .append('svg')
   .attr('width', w)
   .attr('height', h);

// Bar shapes about to be created inside svg
svg.selectAll('rect')
   .data(dataset, key)
   .enter()
   .append('rect')
   .attr({
      'x': function(d, i) {
         return xScale(i);
      },
      'y': function(d) {
         return h - yScale(d.value);
      },
      'width': xScale.rangeBand(),
      'height': function(d) {
         return yScale(d.value);
      },
      'fill': function(d) {
         return 'rgb(0,0,' + (d * 10) + ')';
      }
   });
// create a text label for each column
svg.selectAll('text')
   .data(dataset, key)
   .enter()
   .append('text')
   .text(function(d) {
      return d.value;
   })
   .attr({
      'x': function(d, i) {
         return xScale(i) + xScale.rangeBand() / 2;
      },
      'y': function(d) {
         return h - yScale(d.value) + 14;
      },
      'text-anchor': 'middle',
      'font-family': 'sans-serif',
      'font-size': '11px',
      'fill': 'white',
   });
// add new value to dataset array
d3.select('.add-item')
   .on('click', function() {
      // value representing maximum height of bars
      var maxValue = 25;
      // random new number
      var newNumber = Math.floor(Math.random() * maxValue);
      var lastKeyValue = dataset[dataset.length - 1].key;
      // add items to the right end side
      dataset.push({
         key: lastKeyValue + 1,
         value: newNumber
      });
      // update scale domains
      xScale.domain(d3.range(dataset.length));
      yScale.domain([0, d3.max(dataset, theVal)]);
      // rebind data to existing bars
      var bars = svg.selectAll('rect').data(dataset, key);
      // enter the new data
      bars.enter()
         .append('rect')
         .attr({
            'x': w,
            'y': function(d) {
               return h - yScale(d.value);
            },
            'width': xScale.rangeBand(),
            'height': function(d) {
               return yScale(d.value);
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
               return h - yScale(d.value);
            },
            'width': xScale.rangeBand(),
            'height': function(d) {
               return yScale(d.value);
            },
         });
      //Exit…
      bars.exit()
         .transition()
         .duration(500)
         .attr("x", -xScale.rangeBand())
         .remove();
      updateLabels();
   });
// remove item
d3.select('.del-item')
   .on('click', function() {
      // remove one item from the start of the data array
      dataset.shift();
      // update scale domains
      xScale.domain(d3.range(dataset.length));
      yScale.domain([0, d3.max(dataset, theVal)]);
      // select remaining elements
      var bars = svg.selectAll('rect').data(dataset, key);
      // enter selection, a subset of update dataset selection
      bars.enter()
         .append('rect')
         .attr({
            // x: set initial position beyond the right edge of svg
            'x': w,
            'y': function(d) {
               return h - yScale(d.value);
            },
            'width': xScale.rangeBand(),
            'height': function(d) {
               return yScale(d.value);
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
               return h - yScale(d.value);
            },
            'width': xScale.rangeBand(),
            'height': function(d) {
               return yScale(d.value);
            },
         });
      // exit selection, a subset of update dataset selection
      bars.exit()
      // transition the one element we are deleting
      .transition()
         .duration(500)
      // move past left edge of svg
      .attr('x', -xScale.rangeBand())
      // delete from DOM once transition completed
      .remove();
      updateLabels();
   });

// Update all labels

function updateLabels() {
   var labels = svg.selectAll('text')
      .data(dataset, key);
   // enter selection of data not yet added to a dom element
   labels.enter()
      .append('text')
      .text(function(d) {
         return theVal;
      })
      .attr({
         'text-anchor': 'middle',
         'x': w,
         'y': function(d) {
            return h - yScale(d.value) + 14;
         },
         'font-family': 'sans-serif',
         'font-size': '11px',
         'fill': 'white',
      });
   // Update
   labels.transition()
      .duration(500)
      .attr('x', function(d, i) {
         return xScale(i) + xScale.rangeBand() / 2;
      });
   // Exit
   labels.exit()
      .transition()
      .duration(500)
      .attr('x', -xScale.rangeBand())
      .remove();
}
