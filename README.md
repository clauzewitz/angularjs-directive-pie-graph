# angularjs-directive-pie-graph
D3 Pie Graph Directive

# How to use
```npm
npm install d3
```

```javascript
angular.module('app', [
  'pieChart'
]);

var chartData = 0.098

var colors = [
  '#F7C82D',
  '#FBE99D'
];

<line-chart data="chartData" width="200" height="200" colors="colors"></line-chart>
```

![demo.png](/demo.png "demo")

# License
MIT License
