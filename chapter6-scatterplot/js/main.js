var w = 600;
var h = 100;
var barPadding = 1;
var dataset = [
   [5, 20],
   [480, 90],
   [250, 50],
   [100, 33],
   [330, 95],
   [410, 12],
   [475, 44],
   [25, 67],
   [85, 21],
   [220, 88]
];
// create empty svg element within the body tag
var svg = d3.select('body')
   .append('svg')
   .attr('width', w)
   .attr('height', h);
// shapes about to be created inside svg
svg.selectAll('circle')
   .data(dataset)
   .enter()
   .append('circle')
   .attr({
      x: function(d, i) {
         return i * (w / dataset.length);
      },
      y: function(d) {
         return h - d * 4;
      },
      cx: function(d) {
         return d[0];
      },
      cy: function(d) {
         return d[1];
      },
      r: function(d) {
         return Math.sqrt(h - d[1]);
      },
   });

svg.selectAll("text") // <-- Note "text", not "circle" or "rect"
.data(dataset)
   .enter()
   .append("text")
   .text(function(d) {
      return d[0] + ',' + d[1];
   })
   .attr({
      x: function(d) {
         return d[0];
      },
      y: function(d) {
         return d[1];
      },
      "font-family": "sans-serif",
      "font-size": "11px",
      "fill": "red",
   });
