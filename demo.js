

function convertToF(celsius) {
  var fahrenheit;
   fahrenheit=((celsius*9)/5)+32;
  return fahrenheit;
}
var degree=prompt("Please enter Celsius temperture Degree");
var result=convertToF(degree);
 console.log(result);
