module('smoothers');

test('mg_pow_weight', function() {

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