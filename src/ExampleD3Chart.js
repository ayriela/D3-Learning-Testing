//grabs every module from d3 so this is inefficient in practice
import * as d3 from 'd3';


const url='https://udemy-react-d3.firebaseio.com/tallest_men.json';
const width=800;
const height=500;

export default class D3Chart {
    constructor(element){
         //set to svg constant so you can continue appending to it later
         const svg=d3.select(element)
         .append('svg')
             .attr('width',width)
             .attr('height', height)

        d3.json(url).then(data=> {
            //max takes an array as first argument and an accessor function (to grab value) as the second arg 
            /*const max=d3.max(data, d => {
                return d.height
            }) */
            //spaces and sizes data for the space we have in the svg
            const y=d3.scaleLinear()
                        //grab the tallest value automatically from the dataset 
                      .domain([0,d3.max(data, d => d.height)])
                      .range([0,height])
                //check a specific value's output with scale
                //console.log(y(272));
            const x=d3.scaleBand()
                      .domain(data.map(d=>d.name))
                      .range([0,width])
                      //just play with padding value to get the look you want
                      .padding(0.4)

            const xAxisCall=d3.axisBottom(x)
            const yAxisCall=d3.axisLeft(y)
            //call twice will wipe away each previous axis so only allows one axis also 
            //anything that runs over the edge of svg is still cut instead use margin
            svg.call(yAxisCall)
            //need to transform to shift the axis to the bottom of the screen (by default at 0,0)
            svg.call(xAxisCall)

                //good practice when bringing in new dataset
                //console.log(data)
                const rects=svg.selectAll('rect')
                   .data(data)

                rects.enter()
                     .append('rect')
                        //sets the x to the scale value for the given piece of data
                        .attr("x", d=>x(d.name))
                        //since svg starts at top right we have to calculate values to push each bar to the bottom
                        .attr("y", d=>height-y(d.height))
                        //uses linear scale to set bar heights
                        .attr("height",d=>y(d.height))
                        //automatically calculated width for given space
                        .attr("width",x.bandwidth)
                        .attr("fill", "grey")
            }
        )
    }
}