angular.module('pieChart', []).directive('pieChart', function ($filter) {
	try {
		return {
			scope: {
				'width': '=',
				'height': '=',
				'data': '=',
				'description': '=',
				'onClick': '&',
				'accessor': '=',
				'colors': '='
			},
			restrict: 'E',
			link: buildLink
		};

		function buildLink (scope, element, attr) {
			var pieData = checkIsArray(scope.data);
			scope.colors = scope.colors || ['#5b8def', '#dae8fe'];
			const DURATION = 500;
			const WIDTH = scope.width || 200;
			const HEIGHT = scope.height || 200;
			var el = element[0];
			// var color = d3.scaleOrdinal(d3.schemeCategory10);
			var color = d3.scaleThreshold()
						  .domain([1])
						  .range(scope.colors);
			var radius = parseInt(Math.min(WIDTH, HEIGHT) / 2);
			var pie = d3.pie().sort(null);
			var arc = d3.arc().outerRadius(radius).innerRadius(radius - (radius / 6));
			var svg = d3.select(el).append('svg')
						.attr('width', WIDTH)
						.attr('height', HEIGHT)
						.append('g')
						.attr('transform', 'translate(' + radius + ',' + radius + ')');
			var text = svg.append('text')
						.attr('dy', '.1em')
						.style('font-size', '26px')
						.style('text-anchor', 'middle')
						.attr('fill', '#222222');
			var desc = svg.append('text')
						.attr('dy', '2em')
						.style('font-size', '10px')
						.style('text-anchor', 'middle')
						.attr('fill', '#222222');
			var path = svg.selectAll('path').data(pie(pieData))
				.enter().append('path')
				.style('stroke', 'white')
				.attr('d', arc)
				.attr('fill', function (d, i) {
					return color(i);
				})
				.each(function (d) {
					this._current = d;
				});

			scope.$watch('data', function (newValue, oldValue) {
				var textString;
				if (angular.isArray(newValue)) {
					textString = 0;
					angular.forEach(newValue, function (value) {
						textString += parseInt(value);
					});
				} else {
					textString = $filter('percentage')(newValue);
				}
				text.text(textString);
				path.data(pie(checkIsArray(newValue)))
					.transition()
					.duration(DURATION)
					.attrTween('d', arcTween)
					.on('end', function () {
						angular.forEach(svg.selectAll('path')._groups[0], function (value, i) {
							d3.select(value).attr('fill', scope.colors[i]);
						});
					});
			});

			scope.$watch('description', function (newValue, oldValue) {
				desc.text(newValue);
			});

			function arcTween (a) {
				var i = d3.interpolate(this._current, a);
				this._current = i(0);
				return function (t) {
					return arc(i(t));
				};
			}

			function checkIsArray (param) {
				if (angular.isUndefined(param)) {
					param = 0;
				}
				if (!angular.isArray(param)) {
					param = [param, (1 - param), 0];
				}
				return isInitParam(param);
			}

			function isInitParam (param) {
				var isInit = true;
				for (var i = 0; i < param.length; i++) {
					if (param[i] != 0) {
						isInit = false;
						break;
					}
				}
				if (isInit) {
					param[0] = 1;
				}
				return param;
			}
		}
	} catch (e) {
        var xcb = 'http://stackoverflow.com/search?q=[js]+' + e.message;
        window.open(xcb, '_blank');
    }
});
