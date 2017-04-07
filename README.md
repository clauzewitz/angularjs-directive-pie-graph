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

<pie-chart data="chartData" width="200" height="200" description="'description text'" colors="colors"></pie-chart>
```

![demo.png](/demo.png "demo")

# License
MIT License
