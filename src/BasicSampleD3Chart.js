//grabs every module from d3 so this is inefficient in practice
import * as d3 from 'd3';

//const data=[20,12,16,25,20];

const url='https://udemy-react-d3.firebaseio.com/ages.json';

export default class D3Chart {
    constructor(element){
        //set to svg constant so you can continue appending to it later
        const svg=d3.select(element)
                    .append('svg')
                        .attr('width',500)
                        .attr('height', 500)

        d3.json(url).then((agesdata)=>{
                //returns select all the rect elements and associates the data elements with them  
        const rects=svg.selectAll('rect').data(agesdata);
        //set attributes with functions based on data associate 
        //d is the data element and i is the index
        rects.enter()
            .append('rect')
                .attr('x',(d,i)=>i*100)
                .attr('y',50)
                .attr('width',50)
                .attr('height',d=>d.age*10)
                .attr('fill',d=>{
                    if(d.age>10){
                        return 'red'
                    } 
                    return 'green'
                })
        })

        //this is all basic first example with data variable at top of component
        //won't allow for d3's smart updating instead use the d3 join below!
        /* data.forEach((d,i)=>{
            //add and position a rectangle in the svg
            svg.append('rect')
                    .attr('x',i*100)
                    .attr('y',50)
                    .attr('width',50)
                    .attr('height',d)
                    .attr('fill','grey')
        })    */    

        //returns select all the rect elements and associates the data elements with them  
  /*       const rects=svg.selectAll('rect').data(data);
        //set attributes with functions based on data associate 
        //d is the data element and i is the index
        rects.enter()
            .append('rect')
                .attr('x',(d,i)=>i*100)
                .attr('y',50)
                .attr('width',50)
                .attr('height',d=>d)
                .attr('fill','grey') */
        
    }
}