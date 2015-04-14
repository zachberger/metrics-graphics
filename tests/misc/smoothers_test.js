module('smoothers');

test('mg_pow_weight', function() {

});

test('mg_neighborhood_width', function(){

	var empty = [];
	var one = [ 7 ];
	var some_ordered = [ 3, 7, 11 ];
	var some_unordered = [ 11, 3, 7 ];

	equals( _neighborhood_width(empty, 0), null );
	equals( _neighborhood_width(one, 5), 2 );
	equals( _neighborhood_width(some_ordered, 5), 6);
	equals( _neighborhood_width(some_unordered, 5), 6);
});

test('mg_manhattan', function(){

	equals(_manhattan(0,0), 0);
	equals(_manhattan(1,0), 1);
	equals(_manhattan(0,1), 1);
	equals(_manhattan(0,5), 5);
	equals(_manhattan(5,0), 5);
	equals(_manhtttan(1,5), 4);
	equals(_manhattan(5,1), 4);

});