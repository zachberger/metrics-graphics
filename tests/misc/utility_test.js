module('utility');

test('MG.convert.date', function() {
    var data = [{'date': '2014-01-01', 'value': 12},
               {'date': '2014-03-01', 'value': 18}];
    
    MG.convert.date(data, 'date');
    equal($.type(data[0].date), 'date', 'First date is of type date');
    equal($.type(data[0].date), 'date', 'Second date is of type date');
});

test('MG.convert.date with an alternative timestamp style', function() {
    var data = [{'date': '2014-20-12', 'value': 12},
               {'date': '2014-21-12', 'value': 18}];
    
    MG.convert.date(data, 'date', '%Y-%d-%m');
    equal($.type(data[0].date), 'date', 'First date is of type date');
    equal($.type(data[0].date), 'date', 'Second date is of type date');
});

test('MG.convert.number', function() {
    var data = [{'date': '2014-20-12', 'value': '12'},
               {'date': '2014-21-12', 'value': '18'}];
    
    MG.convert.number(data, 'value');
    equal($.type(data[0].value), 'number', 'First value is a number');
    equal($.type(data[0].value), 'number', 'Second value is a number');
});

test('mg_get_svg_child_of', function(){
    d3.select('#qunit-fixture').append('svg');

    var svg_element_with_node = mg_get_svg_child_of(document.querySelector('#qunit-fixture'));
    var svg_element_with_text = mg_get_svg_child_of('#qunit-fixture');

    equal(svg_element_with_node.length, 1, 'Node-based argument should return a d3 selection with svg.');
    equal(svg_element_with_node.length, 1, 'Selector-based argument should return a d3 selection with svg.');
});

test('mg_is_numeric', function(){

    equal(isNumeric(NaN), false, '');
    equal(isNumeric("xyzzy"), false, '');
    equal(isNumeric(Infinity), false, '');
    equal(isNumeric(false), false, '');
    equal(isNumeric({}), false, '');
    equal(isNumeric(2), true, '');
    equal(isNumeric(0.0), true, '');

});

test('mg_is_function', function(){

    var test = function (){

    };

    equal(is_function(NaN), false, '');
    equal(is_function("xyzzy"), false, '');
    equal(is_function(Infinity), false, '');
    equal(is_function(false), false, '');
    equal(is_function({}), false, '');
    equal(is_function(2), false, '');
    equal(is_function(0.0), false, '');
    equal(is_function(test), true, '');

});



test('mg_number_of_values', function(){

  var none = [

  ];

  var one = [
    {
      "x" : 1
    }
  ];

  var some = [
    {
      "x" : 1
    },
    {
      "x" : 2
    },
    {
      "x" : 1
    }
  ];

  var noAccessor =[
    {
      "y" : 1
    }
  ];
  equal(number_of_values(none,"x",1), 0, '');
  equal(number_of_values(one,"x",1), 1, '');
  equal(number_of_values(some,"x",1), 2, '');
  throws(number_of_values(noAccessor,"x",1),'');

});

test('mg_number_of_values_below', function(){

  var none = [

  ];

  var none_below = [
    {
      "x" : 3
    }
  ];

  var some_below = [
    {
      "x" : 1
    },
    {
      "x" : 2
    },
    {
      "x" : 1
    }
  ];

  var noAccessor =[
    {
      "y" : 1
    }
  ];
  equal(has_values_below(none,"x",1),false, '');
  equal(has_values_below(none_below,"x",2), false, '');
  equal(has_values_below(some_below,"x",2), true, '');
  throws(has_values_below(noAccessor,"x",1),'');

});

module('Utility Functions');


////////////////////////////////////////////////////
//              Ch. 1 - MG.convert.               //
////////////////////////////////////////////////////

/*var datapoint1 = [{date: '2014-03-01', value: 6}];
var datapoint2 = [{date: 232243442, value: 6}];

test('Date works as intended', function() {
  var transformed = MG.convert.date(datapoint1, 'date');
  var out = d3.time.format('%Y-%m-%d')('2014-03-01');
  equal(datapoint[0].date, out, 'both values should be new Date obj set at 2014-03-01');
});

test('custom date', function() {
  var transformed = MG.convert.date(datapoint1, 'date', '%m-%d');
  var out = d3.time.format('%m-%d')('2014-03-01');
  equal(datapoint[0].date, out, 'both values should be new Date obj set at 2014-03-01');
});

test('invalid date', function() {
  var transformed = MG.convert.date(datapoint1, 'date', '%m-%d');
  var out = d3.time.format('%m-%d')('2014-03-01');
  equal(datapoint[0].date, out, 'both values should be new Date obj set at 2014-03-01');
});
*/
