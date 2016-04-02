// var globalvar;
// d3.csv("food.csv", function(err, data) {
//    if (err) {
//       d3.select("body").append("p").text(["Sorry, No data found :("]);
//    } else {
//       globalvar = data;
//       logMe();
//    }
// });
// function logMe() {
//    console.log(globalvar);
// }

var dataset = [5, 10, 15, 20, 25];

d3.select("body").selectAll("p")
   .data(dataset)
   .enter()
   .append('p')
   .text(function(d) {
      return d;
   })
   .style('color', function(d) {
      if (d % 2) {
         return 'red';
      } else {
         return 'black';
      }
   });
