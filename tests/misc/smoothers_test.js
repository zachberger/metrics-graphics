module('smoothers');

test('mg_pow_weight', function() {
	equal(_pow_weight(2,0),0,'');
	equal(_pow_weight(1,2),0,'');
	equal(_pow_weight(0,1),1,'');
	equal(_pow_weight(0.5,3),0.669921875,'');
	equal(_pow_weight(0,1),2,'');
});

// TODO: Re-enable when _neighborhood_width is fixed
// test('mg_neighborhood_width', function(){

// 	var empty = [ ];
// 	var one = [ 7 ];
// 	var some_ordered = [ 3, 7, 11 ];
// 	var some_unordered = [ 11, 3, 7 ];

// 	throws( _neighborhood_width(0,empty), null );
// 	throws( _neighborhood_width(5,one), 2 );
// 	throws( _neighborhood_width(5,some_ordered), 6);
// 	throws( _neighborhood_width(5,some_unordered), 6);
// });

// test('mg_manhattan', function(){

// 	throws(_manhattan(0,0), 0);
// 	throws(_manhattan(1,0), 1);
// 	throws(_manhattan(0,1), 1);
// 	throws(_manhattan(0,5), 5);
// 	throws(_manhattan(5,0), 5);
// 	throws(_manhattan(1,5), 4);
// 	throws(_manhattan(5,1), 4);

// });

test('mg_weighted_means', function(){

});
