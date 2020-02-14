import React, { Component } from 'react';
//import D3Chart from './D3Chart.js';
//import TestData from './TestData.js';
import DonutTest from './DonutTest.js';

class ChartWrapper extends Component {
    data=[
        {name: "flare", title: "flare", group: undefined, value: 0}
        , {name: "analytics", title: "flare/analytics", group: "analytics", value: 0}
        , {name: "cluster", title: "flare/analytics/cluster", group: "analytics", value: 0}
        , {name: "AgglomerativeCluster", title: "flare/analytics/cluster/AgglomerativeCluster", group: "TEST", value: 3938}
        , {name: "CommunityStructure", title: "flare/analytics/cluster/CommunityStructure", group: "analytics", value: 3812}
        , {name: "HierarchicalCluster", title: "flare/analytics/cluster/HierarchicalCluster", group: "analytics", value: 6714}
        ,{name: "MergeEdge", title: "flare/analytics/cluster/MergeEdge", group: "analytics", value: 743}
        , {name: "graph", title: "flare/analytics/graph", group: "analytics", value: 0}
        , {name: "BetweennessCentrality", title: "flare/analytics/graph/BetweennessCentrality", group: "analytics", value: 3534}
        , {name: "LinkDistance", title: "flare/analytics/graph/LinkDistance", group: "analytics", value: 5731}
        , {name: "MaxFlowMinCut", title: "flare/analytics/graph/MaxFlowMinCut", group: "analytics", value: 7840}
        ,{name: "ShortestPaths", title: "flare/analytics/graph/ShortestPaths", group: "analytics", value: 5914}
        ,{name: "SpanningTree", title: "flare/analytics/graph/SpanningTree", group: "analytics", value: 3416},
    ];
    //set up the D3Chart instance that will render in this component
    componentDidMount(){
        //new TestData(this.refs.chart)
        //new D3Chart(this.refs.chart, this.data)
        new DonutTest(this.refs.chart)
    }

    render() {
      return (
        <div ref="chart" >
          
         
        </div>
      );
    }
  }
  
  export default ChartWrapper;