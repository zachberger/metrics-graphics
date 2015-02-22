function generateMouseEvent(type) {
  var event = document.createEvent('MouseEvent');
  event.initEvent(type, true, true);
  return event;
}

// essentially the same as $.extend
function extend(){
  var result = {},
    $__arguments = [].slice.call(arguments);

  $__arguments.forEach(function(obj) {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        result[prop] = obj[prop];
      }
    }
  });
  return result;
}

var target = '#qunit-fixture',
  defaults;

module('bar', {
  setup: function() {
    defaults = {
      target: target,
      chart_type: 'bar',
      data: [{
        label: 'Bar 1',
        value: 100
      },{
        label: 'Bar 2',
        value: 200
      },{
        label: 'Bar 3',
        value: 300
      }]
    };
  }
});

test('Correct number of bars are added', function() {
    MG.data_graphic(defaults);
    equal(document.querySelectorAll('.mg-bar').length, 3, 'Should have 3 bars');
});

test('Triggers callbacks when provided', function() {
    var mouseoverCalled = false,
        mousemoveCalled = false,
        mouseoutCalled = false,

    params = extend(defaults, {
        mouseover: function() {
            mouseoverCalled = true;
        },
        mousemove: function() {
            mousemoveCalled = true;
        },
        mouseout: function() {
            mouseoutCalled = true;
        }
    });

    MG.data_graphic(params);

    var bar = document.getElementsByClassName('mg-bar-rollover')[0];

    bar.dispatchEvent(generateMouseEvent('mouseover'));
    equal(mouseoverCalled, true, 'mouseover was called');

    bar.dispatchEvent(generateMouseEvent('mousemove'));
    equal(mousemoveCalled, true, 'mousemove was called');

    bar.dispatchEvent(generateMouseEvent('mouseout'));
    equal(mouseoutCalled, true, 'mouseout was called');
});

module('histogram');

test('A solitary active datapoint exists', function() {
     var params = {
        target: '#qunit-fixture',
        data: d3.range(10000).map(d3.random.bates(10)),
        chart_type: 'histogram',
        linked: true
    };

    MG.data_graphic(params);
    equal(document.querySelectorAll('.mg-active-datapoint').length, 1, 'One active datapoint exists');
});

test('Rollovers exist', function() {
     var params = {
        target: '#qunit-fixture',
        data: d3.range(10000).map(d3.random.bates(10)),
        chart_type: 'histogram',
        linked: true
    };

    MG.data_graphic(params);
    ok(document.querySelector('.mg-rollover-rect'), 'Rollovers exist');
});

test('We have only one set of rollovers', function() {
     var params = {
        target: '#qunit-fixture',
        data: d3.range(10000).map(d3.random.bates(10)),
        chart_type: 'histogram',
        linked: true
    };

    MG.data_graphic(params);
    equal(document.querySelectorAll('.mg-rollover-rect').length, 1, 'One set of rollovers exists');
});

test('Linked chart has the required class set', function() {
     var params = {
        target: '#qunit-fixture',
        data: d3.range(10000).map(d3.random.bates(10)),
        chart_type: 'histogram',
        linked: true
    };

    MG.data_graphic(params);
    var matches = document.querySelector(params.target + ' svg').getAttribute('class').match(/linked/);
    ok(matches, 'Linked chart has class `linked` set');
});

test('Histogram exists', function() {
    var params = {
        target: '#qunit-fixture',
        data: d3.range(10000).map(d3.random.bates(10)),
        chart_type: 'histogram',
        linked: true
    };

    MG.data_graphic(params);
    ok(document.querySelector('.mg-histogram'), 'Histogram exists');
});
module('line');

test('Confidence band is added', function() {
    var params = {
        target: '#qunit-fixture',
        data: [{'date': new Date('2014-01-01'), 'value': 12, 'l': 10, 'u': 14},
               {'date': new Date('2014-03-01'), 'value': 18, 'l': 16, 'u': 20}],
        show_confidence_band: ['l', 'u']
    };

    MG.data_graphic(params);
    ok(document.querySelector('.mg-confidence-band'), 'Confidence band is added');
});

test('Only one confidence is added on multiple calls to the same target element', function() {
    var params = {
        target: '#qunit-fixture',
        data: [{'date': new Date('2014-01-01'), 'value': 12, 'l': 10, 'u': 14},
               {'date': new Date('2014-03-01'), 'value': 18, 'l': 16, 'u': 20}],
        show_confidence_band: ['l', 'u']
    };

    MG.data_graphic(params);
    MG.data_graphic(MG.clone(params));

    equal(document.querySelectorAll(target + ' .mg-confidence-band').length, 1, 'We only have one confidence band');
});

test('args.area set to true', function() {
    var params = {
        target: '#qunit-fixture',
        data: [{'date': new Date('2014-01-01'), 'value': 12},
               {'date': new Date('2014-03-01'), 'value': 18}]
    };

    MG.data_graphic(params);
    ok(document.querySelector('.mg-main-area'), 'Path set for area');
});

test('args.area set to false', function() {
    var params = {
        target: '#qunit-fixture',
        data: [{'date': new Date('2014-01-01'), 'value': 12},
               {'date': new Date('2014-03-01'), 'value': 18}],
        area: false
    };

    MG.data_graphic(params);
    equal(document.querySelector('.mg-main-area'), null, 'No path for area');
});

test('A solitary active datapoint exists', function() {
    var params = {
        target: '#qunit-fixture',
        data: [{'date': new Date('2014-01-01'), 'value': 12},
               {'date': new Date('2014-03-01'), 'value': 18}]
    };

    MG.data_graphic(params);
    equal(document.querySelectorAll('.mg-active-datapoint').length, 1, 'One active datapoint exists');
});

test('A solitary rollover circle exists', function() {
    var params = {
        target: '#qunit-fixture',
        data: [{'date': new Date('2014-01-01'), 'value': 12},
               {'date': new Date('2014-03-01'), 'value': 18}]
    };

    MG.data_graphic(params);
    equal(document.querySelectorAll('.mg-line-rollover-circle').length, 1, 'One rollover circle exists');
});

test('Rollovers work for single lines', function() {
    var params = {
        target: '#qunit-fixture',
        data: [{'date': new Date('2014-01-01'), 'value': 12},
               {'date': new Date('2014-03-01'), 'value': 18}]
    };

    MG.data_graphic(params);
    ok(document.querySelector('.mg-rollover-rect'), 'Rollovers exist');
});

test('Rollovers work for multiple lines', function() {
    var params = {
        target: '#qunit-fixture',
        data: [[{'date': new Date('2014-01-01'), 'value': 12},
               {'date': new Date('2014-03-01'), 'value': 18}],
               [{'date': new Date('2014-01-01'), 'value': 120},
               {'date': new Date('2014-03-01'), 'value': 180}]]
    };

    MG.data_graphic(params);
    ok(document.querySelector('.mg-voronoi'), 'Rollovers exist');
});

test('We have only one set of rollovers for single lines', function() {
    var params = {
        target: '#qunit-fixture',
        data: [{'date': new Date('2014-01-01'), 'value': 12},
               {'date': new Date('2014-03-01'), 'value': 18}]
    };

    MG.data_graphic(params);
    equal(document.querySelectorAll('.mg-rollover-rect').length, 1, 'One set of rollovers exists');
});

test('We have only one set of rollovers for multiple lines', function() {
    var params = {
        target: '#qunit-fixture',
        data: [[{'date': new Date('2014-01-01'), 'value': 12},
               {'date': new Date('2014-03-01'), 'value': 18}],
               [{'date': new Date('2014-01-01'), 'value': 120},
               {'date': new Date('2014-03-01'), 'value': 180}]]
    };

    MG.data_graphic(params);
    equal(document.querySelectorAll('.mg-voronoi').length, 1, 'One set of rollovers exists');
});

test('We use the rect-style rollovers when `aggregate_rolloveres == true`', function() {
    var params = {
        target: '#qunit-fixture',
        data: [[{'date': new Date('2014-01-01'), 'value': 12},
               {'date': new Date('2014-03-01'), 'value': 18}],
               [{'date': new Date('2014-01-01'), 'value': 120},
               {'date': new Date('2014-03-01'), 'value': 180}]],
        aggregate_rollover: true
    };

    MG.data_graphic(params);

    // ensure rollover returns aggregated result data
    equal(document.querySelectorAll('.mg-voronoi').length, 0, 'Voronoi rollover is not generated');
    equal(document.querySelectorAll('.mg-rollover-rect').length, 1, 'Rect rollover is generated');
});

test('There are as many lines as data series (one)', function() {
    var params = {
        target: '#qunit-fixture',
        data: [{'date': new Date('2014-01-01'), 'value': 12},
               {'date': new Date('2014-03-01'), 'value': 18}]
    };

    MG.data_graphic(params);
    equal(document.querySelectorAll('.mg-main-line').length, 1, 'One line exists');
});

test('There are as many lines as data series (two)', function() {
    var params = {
        target: '#qunit-fixture',
        data: [[{'date': new Date('2014-01-01'), 'value': 12},
               {'date': new Date('2014-03-01'), 'value': 18}],
               [{'date': new Date('2014-01-01'), 'value': 120},
               {'date': new Date('2014-03-01'), 'value': 180}]]
    };

    MG.data_graphic(params);
    equal(document.querySelectorAll('.mg-main-line').length, 2, 'Two lines exist');
});

test('There are as many lines as data series (two) on multiple calls to an existing chart', function() {
    var params = {
        target: '#qunit-fixture',
        data: [[{'date': new Date('2014-01-01'), 'value': 12},
               {'date': new Date('2014-03-01'), 'value': 18}],
               [{'date': new Date('2014-01-01'), 'value': 120},
               {'date': new Date('2014-03-01'), 'value': 180}]]
    };

    MG.data_graphic(params);
    MG.data_graphic(MG.clone(params));

    equal(document.querySelectorAll('.mg-main-line').length, 2, 'Two lines exist');
});

test('No zombie lines when we update a chart with fewer lines', function() {
    var params = {
        target: '#qunit-fixture',
        data: [[{'date': new Date('2014-01-01'), 'value': 12},
               {'date': new Date('2014-03-01'), 'value': 18}],
               [{'date': new Date('2014-01-01'), 'value': 120},
               {'date': new Date('2014-03-01'), 'value': 180}]]
    };

    var params2 = {
        target: '#qunit-fixture',
        data: [{'date': new Date('2014-01-01'), 'value': 12},
               {'date': new Date('2014-03-01'), 'value': 18}]
    };

    MG.data_graphic(params);
    MG.data_graphic(params2);

    equal(document.querySelectorAll('.mg-main-line').length, 1, 'One line exists');
});

test('Rollover circle is visible on load if the dataset is of length 1', function() {
    var data = [{"date": '2014-02-01', "value": 6}];
    var data = MG.convert.date(data, 'date');

    MG.data_graphic({
        data: data,
        target: "#qunit-fixture"
    });

    deepEqual(d3.select('.mg-line-rollover-circle').style('opacity'), "1", 'Rollover circle is visible');
});

test('Only one active data point container is added on multiple calls to the same target element', function() {
    var params = {
        target: '#qunit-fixture',
        data: [{'date': new Date('2014-01-01'), 'value': 12, 'l': 10, 'u': 14},
               {'date': new Date('2014-03-01'), 'value': 18, 'l': 16, 'u': 20}]
    };

    MG.data_graphic(params);
    MG.data_graphic(MG.clone(params));

    equal(document.querySelectorAll('.mg-active-datapoint-container').length, 1, 'We only have one active data point container');
});
module('missing');

test('Missing chart\'s text matches specified missing_text', function() {
    var params = {
        target: '#qunit-fixture',
        chart_type: 'missing-data',
        missing_text: 'In an astral plane that was never meant to fly...'
    };

    MG.data_graphic(params);
    equal(document.querySelector('.mg-missing-text').textContent,
        params.missing_text,
        'Missing chart\'s text matches missing_text');
});

test('Only one mg-missing-pane on multiple calls to the same target element', function() {
    var params = {
        target: '#qunit-fixture',
        chart_type: 'missing-data',
        missing_text: 'In an astral plane that was never meant to fly...'
    };

    MG.data_graphic(params);
    MG.data_graphic(MG.clone(params));

    equal(document.querySelectorAll(target + ' .mg-missing-pane').length, 1, 'We only have one mg-missing-pane');
});

test('Only one mg-missing-text on multiple calls to the same target element', function() {
    var params = {
        target: '#qunit-fixture',
        chart_type: 'missing-data',
        missing_text: 'In an astral plane that was never meant to fly...'
    };

    MG.data_graphic(params);
    MG.data_graphic(MG.clone(params));

    equal(document.querySelectorAll(target + ' .mg-missing-text').length, 1, 'We only have one mg-missing-text');
});

test('Missing chart\'s width is set correctly on subsequent calls to existing chart', function() {
    var params_0 = {
        target: '#qunit-fixture',
        chart_type: 'missing-data',
        missing_text: 'In an astral plane that was never meant to fly...'
    };

    var params = {
        target: '#qunit-fixture',
        chart_type: 'missing-data',
        missing_text: 'In an astral plane that was never meant to fly...',
        width: 200,
        height: 100,
    };

    MG.data_graphic(params_0);
    MG.data_graphic(params);

    var width = document.querySelector(params.target + ' svg').offsetWidth;
    ok(width == 200, 'SVG\'s width matches latest specified width');
});
module('point');

test('A solitary active datapoint exists', function() {
    var params = {
        target: '#qunit-fixture',
        data: [{'date': new Date('2014-01-01'), 'value': 12},
               {'date': new Date('2014-03-01'), 'value': 18}],
        chart_type: 'point'
    };

    MG.data_graphic(params);
    equal(document.querySelectorAll('.mg-active-datapoint').length, 1, 'One active datapoint exists');
});

test('Rollovers exist', function() {
    var params = {
        target: '#qunit-fixture',
        data: [[{'date': new Date('2014-01-01'), 'value': 12},
               {'date': new Date('2014-03-01'), 'value': 18}],
               [{'date': new Date('2014-01-01'), 'value': 120},
               {'date': new Date('2014-03-01'), 'value': 180}]],
        chart_type: 'point'
    };

    MG.data_graphic(params);
    ok(document.querySelector('.mg-voronoi'), 'Rollovers exist');
});

test('We have only one set of rollovers', function() {
    var params = {
        target: '#qunit-fixture',
        data: [[{'date': new Date('2014-01-01'), 'value': 12},
               {'date': new Date('2014-03-01'), 'value': 18}],
               [{'date': new Date('2014-01-01'), 'value': 120},
               {'date': new Date('2014-03-01'), 'value': 180}]],
        chart_type: 'point'
    };

    MG.data_graphic(params);
    equal(document.querySelectorAll('.mg-voronoi').length, 1, 'One set of rollovers exists');
});

test('args.x_rug', function() {
    var params = {
        target: '#qunit-fixture',
        data: [{'date': new Date('2014-01-01'), 'value': 12},
               {'date': new Date('2014-03-01'), 'value': 18}],
        x_rug: true,
        chart_type: 'point'
    };

    MG.data_graphic(params);
    ok(document.querySelector('.mg-x-rug'), 'X-axis rugplot exists');
});

test('Only one rugplot is added on multiple calls to the same target element', function() {
    var params = {
        target: '#qunit-fixture',
        data: [{'date': new Date('2014-01-01'), 'value': 12},
               {'date': new Date('2014-03-01'), 'value': 18}],
        x_rug: true,
        chart_type: 'point'
    };

    MG.data_graphic(params);
    MG.data_graphic(MG.clone(params));
    
    equal(document.querySelectorAll('.mg-x-rug').length, 2, 'We only have one rugplot (two ticks) on the x-axis');
});

test('args.y_rug', function() {
    var params = {
        target: '#qunit-fixture',
        data: [{'date': new Date('2014-01-01'), 'value': 12},
               {'date': new Date('2014-03-01'), 'value': 18}],
        y_rug: true,
        chart_type: 'point'
    };

    MG.data_graphic(params);
    ok(document.querySelector('.mg-y-rug'), 'Y-axis rugplot exists');
});

test('Only one rugplot is added on multiple calls to the same target element', function() {
    var params = {
        target: '#qunit-fixture',
        data: [{'date': new Date('2014-01-01'), 'value': 12},
               {'date': new Date('2014-03-01'), 'value': 18}],
        y_rug: true,
        chart_type: 'point'
    };

    MG.data_graphic(params);
    MG.data_graphic(MG.clone(params));
    equal(document.querySelectorAll('.mg-y-rug').length, 2, 'We only have one rugplot (two ticks) on the y-axis');
});

test('args.least_squares', function() {
    var params = {
        target: '#qunit-fixture',
        data: [{'date': new Date('2014-01-01'), 'value': 12},
               {'date': new Date('2014-03-01'), 'value': 18}],
        chart_type: 'point',
        least_squares: true
    };

    MG.data_graphic(params);
    ok(document.querySelector('.mg-least-squares-line'), 'Least-squares line exists');
});

test('Only one least-squares line is added on multiple calls to the same target element', function() {
    var params = {
        target: '#qunit-fixture',
        data: [{'date': new Date('2014-01-01'), 'value': 12},
               {'date': new Date('2014-03-01'), 'value': 18}],
        chart_type: 'point',
        least_squares: true
    };

    MG.data_graphic(params);
    MG.data_graphic(MG.clone(params));
    equal(document.querySelectorAll('.mg-least-squares-line').length, 1, 'We only have one least-squares line');
});
module('chart_title');

test('Chart title is updated', function() {
    var params = {
        title: 'foo',
        target: '#qunit-fixture',
        data: [{'date': new Date('2014-01-01'), 'value': 12},
               {'date': new Date('2014-03-01'), 'value': 18}]
    };

    var params2 = MG.clone(params);
    params2.title = 'bar';

    MG.data_graphic(params);
    MG.data_graphic(params2);
    equal(document.querySelector('.mg-chart-title').innerText, 'bar', 'Chart title is foo');
});

test('Chart title is removed if title is set to blank', function() {
    var params = {
        title: 'foo',
        target: '#qunit-fixture',
        data: [{'date': new Date('2014-01-01'), 'value': 12},
               {'date': new Date('2014-03-01'), 'value': 18}]
    };

    var params2 = MG.clone(params);
    params2.title = '';

    MG.data_graphic(params);
    MG.data_graphic(params2);
    equal(document.querySelector('.mg-chart-title'), null, 'Chart title is not added');
});

test('Chart title is removed if title is not set', function() {
    var params = {
        title: 'foo',
        target: '#qunit-fixture',
        data: [{'date': new Date('2014-01-01'), 'value': 12},
               {'date': new Date('2014-03-01'), 'value': 18}]
    };

    var params2 = MG.clone(params);
    delete params2.title;

    MG.data_graphic(params);
    MG.data_graphic(params2);
    equal(document.querySelector('.mg-chart-title'), null, 'Chart title is not added');
});

test('When a description is set, we get a question mark', function() {
    var params = {
        title: 'foo',
        description: 'bar',
        target: '#qunit-fixture',
        data: [{'date': new Date('2014-01-01'), 'value': 12},
               {'date': new Date('2014-03-01'), 'value': 18}],
        show_tooltips: true
    };

    MG.data_graphic(params);
    ok(document.querySelector('.mg-chart-title .description'), 'Description icon exists');
});

test('When an error is set, we get an exclamation icon', function() {
    var params = {
        title: 'foo',
        description: 'bar',
        target: '#qunit-fixture',
        data: [{'date': new Date('2014-01-01'), 'value': 12},
               {'date': new Date('2014-03-01'), 'value': 18}],
        error: 'lorem ipsum'
    };

    MG.data_graphic(params);
    ok(document.querySelector('.mg-chart-title .warning'), 'Error icon exists');
});

test('Chart title is not duplicated on redraw', function() {
    var params = {
        title: 'foo',
        target: '#qunit-fixture',
        data: [{'date': new Date('2014-01-01'), 'value': 12},
               {'date': new Date('2014-03-01'), 'value': 18}]
    };

    MG.data_graphic(params);
    MG.data_graphic(params);
    equal(document.querySelectorAll('.mg-chart-title').length, 1, 'there is once chart title');
});

module('data_graphic');

test('Required arguments are set', function() {
    var params = {
        target: '#qunit-fixture',
        data: [{'date': new Date('2014-11-01'), 'value': 12},
               {'date': new Date('2014-11-02'), 'value': 18}]
    };

    MG.data_graphic(params);

    ok(params.width, 'args.width is set');
    ok(params.height, 'args.height is set');
    ok(params.data, 'args.data is set');
    ok(params.target, 'args.target is set');
});

// Can be removed in 2.x
test('Correctly aliases callbacks when using 1.x-style method names', function() {
  var mouseoverCalled = false,
    mouseoutCalled = false,

    params = {
      target: '#qunit-fixture',
      data: [{value: 1, label: 'One'}],
      chart_type: 'bar',
      rollover_callback: function() {
        mouseoverCalled = true;
      },
      rollout_callback: function() {
        mouseoutCalled = true;
      }
    };

  MG.data_graphic(params);

  var bar = document.getElementsByClassName('mg-bar-rollover')[0];

  bar.dispatchEvent(generateMouseEvent('mouseover'));
  equal(mouseoverCalled, true, 'rollover_callback was called');

  bar.dispatchEvent(generateMouseEvent('mouseout'));
  equal(mouseoutCalled, true, 'rollout_callback was called');

  ok(MG.deprecations.rollover_callback.warned, 'rollover_callback deprecation notice displayed');
  ok(MG.deprecations.rollout_callback.warned, 'rollout_callback deprecation notice displayed');
});
module('init');

test('Chart\'s width is set correctly on subsequent calls to existing chart', function() {
    var params_0 = {
        target: '#qunit-fixture',
        data: [{'date': new Date('2014-11-01'), 'value': 12},
               {'date': new Date('2014-11-02'), 'value': 18}],
    };

    var params = {
        target: '#qunit-fixture',
        data: [{'date': new Date('2014-11-01'), 'value': 12},
               {'date': new Date('2014-11-02'), 'value': 18}],
        width: 200,
        height: 100,
    };

    MG.data_graphic(params_0);
    MG.data_graphic(params);

    var width = document.querySelector(params.target + ' svg').offsetWidth;
    ok(width == 200, 'SVG\'s width matches latest specified width');
});

test('Chart\'s height is set correctly on subsequent calls to existing chart', function() {
    var params_0 = {
        target: '#qunit-fixture',
        data: [{'date': new Date('2014-11-01'), 'value': 12},
               {'date': new Date('2014-11-02'), 'value': 18}],
    };

    var params = {
        target: '#qunit-fixture',
        data: [{'date': new Date('2014-11-01'), 'value': 12},
               {'date': new Date('2014-11-02'), 'value': 18}],
        width: 200,
        height: 100,
    };

    MG.data_graphic(params_0);
    MG.data_graphic(params);

    var height = document.querySelector(params.target + ' svg').offsetHeight;
    ok(height == params.height, 'SVG\'s height matches latest specified height');
});

test('Charts are plotted correctly when MG is called multiple times on the same target element', function() {
    var params_0 = {
        target: '#qunit-fixture',
        data: [{'date': new Date('2014-11-01'), 'value': 12},
               {'date': new Date('2014-11-02'), 'value': 18}]
    };

    var params = {
        target: '#qunit-fixture',
        data: [{'date': new Date('2014-11-01'), 'value': 12},
               {'date': new Date('2014-11-02'), 'value': 18}],
        width: 200,
        height: 100,
    };

    MG.data_graphic(params_0);
    MG.data_graphic(params);

    //ensure chart types change appropriately
    var line = document.querySelector('.mg-main-line');
    ok(line, 'chart_type is `line`, line chart is plotted');

    //check all the other chart types
    var chart_types = [{id: 'point', domElement: '.mg-points'},
        {id: 'histogram', domElement: '.mg-histogram'},
        {id: 'bar', domElement: '.mg-barplot'}];

    for(var i = 0; i < chart_types.length; i++) {
        var params = {
            target: '#qunit-fixture',
            data: [{'date': new Date('2014-11-01'), 'value': 12},
                   {'date': new Date('2014-11-02'), 'value': 18}],
            chart_type: chart_types[i].id,
            width: 200,
            height: 100,
        };

        MG.data_graphic(params);
        ok(document.querySelector(chart_types[i].domElement),
            'chart_type switched to `' + chart_types[i].id + '`, the correct chart type is plotted');
            
        //ensure old chart was removed
        equal(document.querySelectorAll('.mg-main-line').length, 0, 'line chart (old one) was removed');
    }
});

test('Missing chart has required class name set', function() {
    expect(1);
    var params = {
        target: '#qunit-fixture',
        data: [{'date': new Date('2014-11-01'), 'value': 12},
               {'date': new Date('2014-11-02'), 'value': 18}],
        chart_type: 'missing-data'
    };

    MG.data_graphic(params);

    var matches = document.querySelector(params.target + ' svg').getAttribute('class').match(/mg-missing/);
    ok(matches, 'Missing chart has class `missing` set');
});

test('Linked chart has the required class set', function() {
    var params = {
        target: '#qunit-fixture',
        data: [{'date': new Date('2014-11-01'), 'value': 12},
               {'date': new Date('2014-11-02'), 'value': 18}],
        linked: true
    };

    MG.data_graphic(params);

    var matches = document.querySelector(params.target + ' svg').getAttribute('class').match(/linked/);
    ok(matches, 'Linked chart has class `linked` set');
});

test('args.time_series is set to true when data is time-series', function() {
    var params = {
        target: '#qunit-fixture',
        data: [{'foo': new Date('2014-11-01'), 'value': 12},
               {'foo': new Date('2014-11-02'), 'value': 18}],
        x_accessor: 'foo'
    };

    MG.data_graphic(params);
    ok(params.time_series, 'args.time_series is set to true when data is time-series');
});

test('args.time_series is set to false when data is not time-series', function() {
    var params = {
        target: '#qunit-fixture',
        data: [{'foo': 100, 'value': 12},
               {'foo': 200, 'value': 18}],
        x_accessor: 'foo'
    };

    MG.data_graphic(params);
    equal(params.time_series, false, 'args.time_series is set to false when data is not time-series');
});

test('Only one clip path is added on multiple calls to the same target element', function() {
    var params = {
        target: '#qunit-fixture',
        data: [{'date': new Date('2014-01-01'), 'value': 12, 'l': 10, 'u': 14},
               {'date': new Date('2014-03-01'), 'value': 18, 'l': 16, 'u': 20}]
    };

    MG.data_graphic(params);
    MG.data_graphic(MG.clone(params));

    equal(document.querySelectorAll('.mg-clip-path').length, 1, 'We only have one clip path');
});
module('markers');

test('All markers are added if they lie within the visible range', function() {
    var markers = [{
            'date': new Date('2014-02-01'),
            'label': '1st Milestone'
        }, {
            'date': new Date('2014-02-02'),
            'label': '2nd Milestone'
        }];

    var params = {
        target: '#qunit-fixture',
        data: [{'date': new Date('2014-01-01'), 'value': 12},
               {'date': new Date('2014-03-01'), 'value': 18}],
        markers: markers
    };

    MG.data_graphic(params);
    equal(document.querySelectorAll(target + ' .mg-markers line').length, markers.length, 'Two markers added');
});

test('Markers that lie outside the visible range are excluded', function() {
    var markers = [{
            'date': new Date('2014-02-01'),
            'label': '1st Milestone'
        }, {
            'date': new Date('2014-02-02'),
            'label': '2nd Milestone'
        }];

    var params = {
        target: '#qunit-fixture',
        data: [{'date': new Date('2014-02-01'), 'value': 12},
               {'date': new Date('2014-03-01'), 'value': 18}],
        markers: markers
    };

    MG.data_graphic(params);
    equal(document.querySelectorAll(target + ' .mg-markers line').length, 1, 'One marker added');
});

test('All baselines are added', function() {
    var baselines = [{value:50, label:'a baseline'}];

    var params = {
        target: '#qunit-fixture',
        data: [{'date': new Date('2014-01-01'), 'value': 100},
               {'date': new Date('2014-03-01'), 'value': 10}],
        baselines: baselines
    };

    MG.data_graphic(params);
    equal(document.querySelectorAll(target + ' .mg-baselines line').length, markers.length, 'One baseline added');
});

test('Markers\' texts are correctly added', function() {
    var markers = [{
            'date': new Date('2014-02-01'),
            'label': '1st Milestone'
        }, {
            'date': new Date('2014-02-02'),
            'label': '2nd Milestone'
        }];

    var params = {
        target: '#qunit-fixture',
        data: [{'date': new Date('2014-01-01'), 'value': 100},
               {'date': new Date('2014-03-01'), 'value': 10}],
        markers: markers
    };

    MG.data_graphic(params);
    equal(document.querySelectorAll(target + ' .mg-markers text')[0].textContent, markers[0].label, 'First marker\'s text matches specified one');
    equal(document.querySelectorAll(target + ' .mg-markers text')[1].textContent, markers[1].label, 'Second marker\'s text matches specified one');
});

test('Baseline text is correctly added', function() {
    var baselines = [{value:50, label:'a baseline'}];

    var params = {
        target: '#qunit-fixture',
        data: [{'date': new Date('2014-01-01'), 'value': 100},
               {'date': new Date('2014-03-01'), 'value': 10}],
        baselines: baselines
    };

    MG.data_graphic(params);
    equal(document.querySelectorAll(target + ' .mg-baselines text')[0].textContent, baselines[0].label, 'Baseline text matches specified one');
});

test('When an existing chart is updated with no markers, existing markers are cleared', function() {
    var markers = [{
            'date': new Date('2014-11-02'),
            'label': 'Lorem Ipsum'
        }];

    var params_0 = {
        target: '#qunit-fixture',
        data: [{'date': new Date('2014-11-01'), 'value': 12},
               {'date': new Date('2014-11-03'), 'value': 18}],
        markers: markers
    };

    var params = {
        target: '#qunit-fixture',
        data: [{'date': new Date('2014-11-01'), 'value': 14},
               {'date': new Date('2014-11-03'), 'value': 20}],
    };

    MG.data_graphic(params_0);
    MG.data_graphic(params);

    equal(document.querySelectorAll('.mg-markers').length, 0, 'Old markers were cleared');
});

test('When an existing chart is updated with no baselines, existing baselines are cleared', function() {
    var baselines = [{
            'value': 10,
            'label': 'Lorem Ipsum'
        }];

    var params_0 = {
        target: '#qunit-fixture',
        data: [{'date': new Date('2014-11-01'), 'value': 12},
               {'date': new Date('2014-11-03'), 'value': 18}],
        baselines: baselines
    };

    var params = {
        target: '#qunit-fixture',
        data: [{'date': new Date('2014-11-01'), 'value': 14},
               {'date': new Date('2014-11-03'), 'value': 20}],
    };

    MG.data_graphic(params_0);
    MG.data_graphic(params);

    equal(document.querySelectorAll('.mg-baselines').length, 0, 'Old baselines were cleared');
});

module('x_axis');

test('X-axis is added', function() {
    var params = {
        target: '#qunit-fixture',
        data: [{'date': new Date('2014-01-01'), 'value': 12},
               {'date': new Date('2014-03-01'), 'value': 18}]
    };

    MG.data_graphic(params);
    ok(document.querySelector('.mg-x-axis'), 'X-axis is added');
});

test('args.x_axis set to false', function() {
    var params = {
        target: '#qunit-fixture',
        data: [{'date': new Date('2014-01-01'), 'value': 12},
               {'date': new Date('2014-03-01'), 'value': 18}],
        x_axis: false
    };

    MG.data_graphic(params);
    equal(document.querySelector('.mg-x-axis'), null, 'X-axis is not added');
});

test('Only one x-axis is added on multiple calls to the same target element', function() {
    var params = {
        target: '#qunit-fixture',
        data: [{'date': new Date('2014-01-01'), 'value': 12},
               {'date': new Date('2014-03-01'), 'value': 18}]
    };

    MG.data_graphic(params);
    MG.data_graphic(MG.clone(params));

    equal(document.querySelectorAll(target + ' .mg-x-axis').length, 1, 'We only have one x-axis');
});

test('args.show_secondary_x_label: true', function() {
    var params = {
        target: '#qunit-fixture',
        data: [{'date': new Date('2014-01-01'), 'value': 12},
               {'date': new Date('2014-03-01'), 'value': 18}]
    };

    MG.data_graphic(params);
    ok(document.querySelector('.mg-year-marker'), 'Year marker exists');
});

test('args.show_secondary_x_label: false', function() {
    var params = {
        target: '#qunit-fixture',
        data: [{'date': new Date('2014-01-01'), 'value': 12},
               {'date': new Date('2014-03-01'), 'value': 18}],
        show_secondary_x_label: false
    };

    MG.data_graphic(params);
    equal(document.querySelector('.mg-year-marker'), null, 'Year marker not added');
});

test('args.x_label', function() {
    var params = {
        target: '#qunit-fixture',
        data: [{'date': new Date('2014-01-01'), 'value': 12},
               {'date': new Date('2014-03-01'), 'value': 18}],
        x_label: 'foo bar'
    };

    MG.data_graphic(params);
    ok(document.querySelector('.mg-x-axis .label'), 'X-axis label exists');
});

test('X-axis doesn\'t break when data object is of length 1', function() {
    var params = {
        target: '#qunit-fixture',
        data: [{'date': new Date('2014-01-01'), 'value': 12}]
    };

    MG.data_graphic(params);
    ok(document.querySelector('.mg-x-axis'), 'X-axis exists');
});

test('args.small_text', function() {
    var params = {
        target: '#qunit-fixture',
        data: [{'date': new Date('2014-01-01'), 'value': 12}],
        small_text: true,
    };

    MG.data_graphic(params);
    ok(document.querySelector('.mg-x-axis-small'), 'Small x-axis is set');
});

test('args.small_text and args.show_secondary_x_label', function() {
    var params = {
        target: '#qunit-fixture',
        data: [{'date': new Date('2014-01-01'), 'value': 12},
               {'date': new Date('2014-03-01'), 'value': 18}],
        small_text: true
    };

    MG.data_graphic(params);
    ok(document.querySelector('.mg-year-marker-small'), 'Small year-marker is set');
});

test('args.x_rug', function() {
    var params = {
        target: '#qunit-fixture',
        data: [{'date': new Date('2014-01-01'), 'value': 12},
               {'date': new Date('2014-03-01'), 'value': 18}],
        x_rug: true
    };

    MG.data_graphic(params);
    ok(document.querySelector('.mg-x-rug'), 'X-axis rugplot exists');
});

test('Only one rugplot is added on multiple calls to the same target element', function() {
    var params = {
        target: '#qunit-fixture',
        data: [{'date': new Date('2014-01-01'), 'value': 12},
               {'date': new Date('2014-03-01'), 'value': 18}],
        x_rug: true
    };

    MG.data_graphic(params);
    MG.data_graphic(MG.clone(params));

    equal(document.querySelectorAll('.mg-x-rug').length, 2, 'We only have one rugplot on the x-axis');
});

test('args.x_extended_ticks', function() {
    var params = {
        target: '#qunit-fixture',
        data: [{'date': new Date('2014-01-01'), 'value': 12},
               {'date': new Date('2014-03-01'), 'value': 18}],
        x_extended_ticks: true
    };

    MG.data_graphic(params);
    ok(document.querySelector('.mg-extended-x-ticks'), 'X-axis extended ticks exist');
});

test('correctly calculates min and max values for line, point and histogram charts', function() {
    var args;

    // single series
    args = {
        processed: {},
        x_accessor: 'x',
        chart_type: 'line',
        data: [
            [
                {x: 4},
                {x: 5},
                {x: 6},
                {x: 7}
            ]
        ]
    };
    mg_find_min_max_x(args);
    equal(args.processed.min_x, 4, 'min is correct for single series');
    equal(args.processed.max_x, 7, 'max is correct for single series');

    // multiple series
    args = {
        processed: {},
        x_accessor: 'x',
        chart_type: 'line',
        data: [
            [
                {x: 1},
                {x: 2},
                {x: 3},
                {x: 4}
            ], [
                {x: 5},
                {x: 6},
                {x: 7}
            ]
        ]
    };
    mg_find_min_max_x(args);
    equal(args.processed.min_x, 1, 'min is correct for multiple series');
    equal(args.processed.max_x, 7, 'max is correct for multiple series');
});

test('correctly calculates min and max values for bar chart', function() {
    var args;

    // single series
    args = {
        processed: {},
        x_accessor: 'x',
        baseline_accessor: 'b',
        predictor_accessor: 'p',
        chart_type: 'bar',
        data: [
            [
                {x: 4, b: 3, p: 2},
                {x: 5, b: 2, p: 6},
                {x: 6, b: 1, p: 10},
                {x: 7, b: 0, p: 12}
            ]
        ]
    };
    mg_find_min_max_x(args);
    equal(args.processed.min_x, 0, 'min is correct');
    equal(args.processed.max_x, 12, 'max is correct');
});

module('y_axis');

test('Y-axis is added', function() {
    var params = {
        target: '#qunit-fixture',
        data: [{'date': new Date('2014-01-01'), 'value': 12},
               {'date': new Date('2014-03-01'), 'value': 18}]
    };

    MG.data_graphic(params);
    ok(document.querySelector('.mg-y-axis'), 'Y-axis is added');
});

test('args.y_axis set to false', function() {
    var params = {
        target: '#qunit-fixture',
        data: [{'date': new Date('2014-01-01'), 'value': 12},
               {'date': new Date('2014-03-01'), 'value': 18}],
        y_axis: false
    };

    MG.data_graphic(params);
    equal(document.querySelector('.mg-y-axis'), null, 'Y-axis is not added');
});

test('Only one y-axis is added on multiple calls to the same target element', function() {
    var params = {
        target: '#qunit-fixture',
        data: [{'date': new Date('2014-01-01'), 'value': 12},
               {'date': new Date('2014-03-01'), 'value': 18}]
    };

    MG.data_graphic(params);
    MG.data_graphic(MG.clone(params));

    equal(document.querySelectorAll(target + ' .mg-y-axis').length, 1, 'We only have one y-axis');
});

test('args.y_label', function() {
    var params = {
        target: '#qunit-fixture',
        data: [{'date': new Date('2014-01-01'), 'value': 12},
               {'date': new Date('2014-03-01'), 'value': 18}],
        y_label: 'foo bar'
    };

    MG.data_graphic(params);
    ok(document.querySelector('.mg-y-axis .label'), 'Y-axis label exists');
});

test('Y-axis doesn\'t break when data object is of length 1', function() {
    var params = {
        target: '#qunit-fixture',
        data: [{'date': new Date('2014-01-01'), 'value': 12}]
    };

    MG.data_graphic(params);
    ok(document.querySelector('.mg-y-axis'), 'Y-axis exists');
});

test('args.small_text', function() {
    var params = {
        target: '#qunit-fixture',
        data: [{'date': new Date('2014-01-01'), 'value': 12}],
        small_text: true,
    };

    MG.data_graphic(params);
    ok(document.querySelector('.mg-y-axis-small'), 'Small y-axis is set');
});

test('args.y_rug', function() {
    var params = {
        target: '#qunit-fixture',
        data: [{'date': new Date('2014-01-01'), 'value': 12},
               {'date': new Date('2014-03-01'), 'value': 18}],
        y_rug: true
    };

    MG.data_graphic(params);
    ok(document.querySelector('.mg-y-rug'), 'Y-axis rugplot exists');
});

test('Only one rugplot is added on multiple calls to the same target element', function() {
    var params = {
        target: '#qunit-fixture',
        data: [{'date': new Date('2014-01-01'), 'value': 12},
               {'date': new Date('2014-03-01'), 'value': 18}],
        y_rug: true
    };

    MG.data_graphic(params);
    MG.data_graphic(MG.clone(params));
    equal(document.querySelectorAll('.mg-y-rug').length, 2, 'We only have one rugplot on the y-axis');
});

test('Default min_y is 0', function() {
    var params = {
        target: '#qunit-fixture',
        data: [{'date': new Date('2014-01-01'), 'value': 12},
               {'date': new Date('2014-03-01'), 'value': 18}]
    };

    MG.data_graphic(params);
    equal(document.querySelector('.mg-y-axis text').textContent, 0, 'Y-axis starts at 0');
});

test('args.min_y_from_data', function() {
    var params = {
        target: '#qunit-fixture',
        data: [{'date': new Date('2014-01-01'), 'value': 12},
               {'date': new Date('2014-03-01'), 'value': 18}],
        min_y_from_data: true
    };

    MG.data_graphic(params);
    equal(document.querySelector('.mg-y-axis text').textContent, 12, 'Y-axis starts at 12');
});

test('args.min_y set to arbitrary value', function() {
    var params = {
        target: '#qunit-fixture',
        data: [{'date': new Date('2014-01-01'), 'value': 12},
               {'date': new Date('2014-03-01'), 'value': 18}],
        min_y: 5
    };

    MG.data_graphic(params);
    equal(document.querySelector('.mg-y-axis text').textContent, 5, 'Y-axis starts at 5');
});

test('args.y_extended_ticks', function() {
    var params = {
        target: '#qunit-fixture',
        data: [{'date': new Date('2014-01-01'), 'value': 12},
               {'date': new Date('2014-03-01'), 'value': 18}],
        y_extended_ticks: true
    };

    MG.data_graphic(params);
    ok(document.querySelector('.mg-extended-y-ticks'), 'Y-axis extended ticks exist');
});

test('args.format is set to percentage', function() {
    var params = {
        target: '#qunit-fixture',
        data: [{'date': new Date('2014-01-01'), 'value': 0.12},
               {'date': new Date('2014-03-01'), 'value': 0.18}],
        format: 'percentage'
    };

    MG.data_graphic(params);
    equal(document.querySelector('.mg-y-axis text').textContent.slice(-1), '%', 'Y-axis units are %');
});

test('args.yax_units', function() {
    var params = {
        target: '#qunit-fixture',
        data: [{'date': new Date('2014-01-01'), 'value': 2.12},
               {'date': new Date('2014-03-01'), 'value': 4.18}],
        yax_units: '$',
    };

    MG.data_graphic(params);
    equal(document.querySelector('.mg-y-axis text').textContent[0], '$', 'Y-axis units are $');
});

test('When args.max_y is set, ignore inflator', function() {
    var params = {
        target: '#qunit-fixture',
        data: [{'date': new Date('2014-01-01'), 'value': 12},
               {'date': new Date('2014-03-01'), 'value': 18}],
        max_y: 50,
    };

    MG.data_graphic(params);
    var nodes = document.querySelectorAll('.mg-y-axis text');
    equal(nodes[nodes.length - 1].textContent, 50, 'Maximum y-axis value is 50');
});

module('process');

test('args.missing_is_zero doesn\'t throw a "args.data[0][0] is undefined" error', function() {
    var data = [{"date": new Date('2014-02-02'), "value": 6}];
    var params = {
        data: data,
        target: "#qunit-fixture",
        missing_is_zero: true
    };

    MG.data_graphic(params);

    equal(params.data.length, 1, 'args.data is defined');
});
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
