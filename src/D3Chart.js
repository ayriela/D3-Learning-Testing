import * as d3 from 'd3';


/*  const data=[
    {name: "flare", title: "flare", group: undefined, value: 0}
    , {name: "analytics", title: "flare/analytics", group: "analytics", value: 0}
    , {name: "cluster", title: "flare/analytics/cluster", group: "analytics", value: 0}
    , {name: "AgglomerativeCluster", title: "flare/analytics/cluster/AgglomerativeCluster", group: "TEST", value: 3938}
    , {name: "CommunityStructure", title: "flare/analytics/cluster/CommunityStructure", group: "analytics", value: 3812}
    , {name: "HierarchicalCluster", title: "flare/analytics/cluster/HierarchicalCluster", group: "analytics", value: 6714}
    ,{name: "MergeEdge", title: "flare/analytics/cluster/MergeEdge", group: "analytics", value: 743}
    , {name: "graph", title: "flare/analytics/graph", group: "analytics", value: 0}
    ,  {name: "BetweennessCentrality", title: "flare/analytics/graph/BetweennessCentrality", group: "analytics", value: 3534}
    , {name: "LinkDistance", title: "flare/analytics/graph/LinkDistance", group: "analytics", value: 5731}
    , {name: "MaxFlowMinCut", title: "flare/analytics/graph/MaxFlowMinCut", group: "analytics", value: 7840}
    ,{name: "ShortestPaths", title: "flare/analytics/graph/ShortestPaths", group: "analytics", value: 5914}
    ,{name: "SpanningTree", title: "flare/analytics/graph/SpanningTree", group: "analytics", value: 3416},
]; */



const width = 932; 
const height = width;
const format = d3.format(",d");
//const color = d3.scaleOrdinal(data.map(d => d.group), d3.schemeCategory10);

export default class D3Chart {
    constructor(element){
        const pack = data => d3.pack()
                                .size([width - 2, height - 2])
                                .padding(3)
                                (d3.hierarchy({children: data}).sum(d => d.value));
        const root = pack(data);
        const color = d3.scaleOrdinal(data.map(d => d.group), d3.schemeCategory10);
        const svg = d3.select(element).append("svg")
            .attr("viewBox", [0, 0, width, height])
            .attr("font-size", 10)
            .attr("font-family", "sans-serif")
            .attr("text-anchor", "middle");
      
        const leaf = svg.selectAll("g")
          .data(root.leaves())
          .join("g")
            .attr("transform", d => `translate(${d.x + 1},${d.y + 1})`);
      
        leaf.append("circle")
            //.attr("id", d => (d.leafUid = DOM.uid("leaf")).id)
            .attr("id", (d,i) => (d.leafUid = i))
            .attr("r", d => d.r)
            .attr("fill-opacity", 0.7)
            .attr("fill", d => color(d.data.group));
      
        leaf.append("clipPath")
            //.attr("id", d => (d.clipUid = DOM.uid("clip")).id)
              .attr("id", (d,i) => (d.clipUid = i))
          .append("use")
            .attr("xlink:href", d => d.leafUid.href);
      
        leaf.append("text")
            .attr("clip-path", d => d.clipUid)
          .selectAll("tspan")
          .data(d => d.data.name.split(/(?=[A-Z][^A-Z])/g))
          .join("tspan")
            .attr("x", 0)
            .attr("y", (d, i, nodes) => `${i - nodes.length / 2 + 0.8}em`)
            .text(d => d);
      
        leaf.append("title")
            .text(d => `${d.data.title}\n${format(d.value)}`);
          
        return svg.node();
      
    }
}