module('smoothers');

test('mg_pow_weight', function() {

});

test('mg_neighborhood_width', function(){

	var empty = [];
	var one = [ 7 ];
	var some_ordered = [ 3, 7, 11 ];
	var some_unordered = [ 11, 3, 7 ];

	equal( _neighborhood_width(empty, 0), null );
	equal( _neighborhood_width(one, 5), 2 );
	equal( _neighborhood_width(some_ordered, 5), 6);
	equal( _neighborhood_width(some_unordered, 5), 6);
});

test('mg_manhattan', function(){

	equal(_manhattan(0,0), 7);
	equal(_manhattan(1,0), 1);
	equal(_manhattan(0,1), 1);
	equal(_manhattan(0,5), 5);
	equal(_manhattan(5,0), 5);
	equal(_manhtttan(1,5), 4);
	equal(_manhattan(5,1), 4);

});

test('mg_weighted_means', function(){

});