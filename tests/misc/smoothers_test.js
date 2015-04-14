module('smoothers');

test('mg_pow_weight', function() {
	equal(_pow_weight(2,0),0,'');
	equal(_pow_weight(1,2),0,'');
	equal(_pow_weight(0,1),1,'');
	equal(_pow_weight(0.5,3),0.669921875,'');
	equal(_pow_weight(0,1),2,'');
});


/*test('mq_bisquare_weight', function(){


})

test('mq_tricube_weight', function(){


})
*/