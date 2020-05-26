const { dialog } = require('electron').remote;
const fs = require('fs');
const d3 = require('d3');

// include local stuff
const { density, degcent } = require('./ngutils/density.js');

window.$ = window.jQuery = require('jquery');

// open the dialog box to get the file path
const filepath = dialog.showOpenDialogSync();

// for testing
// const filepath = ["/Users/jose/Desktop/graph-test/fullgraph_th2.json"]

// read the localfile and parse data
const rawdata = fs.readFileSync(filepath[0], 'utf-8');
const data = JSON.parse(rawdata);

// get the file name for title
const filename = filepath[0].split(/(\\|\/)/g).pop();

// set the title of the graph
$("#graphtitle").text(filename);

// add general data about the graph.
// number of nodes and links for now, later to include density.
$("#nodesnumb").text(data["nodes"].length);
$("#linksnumb").text(data["links"].length);
$("#densnumb").text(density(data));

// pass data into constants
const nodes = degcent(data);
const links = data['links'];

// declare the drag function settings
drag = simulation => {
    function dragstarted(d) {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }
  
    function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }
  
    function dragended(d) {
        if (!d3.event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }
  
    return d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
};

// set the dimensions for the graph itself
const width = 900;
const height = 600;

// declare the draw dimension for the viewBox
const p1x = (width/2)*(-1);
const p1y = (height/2)*(-1);

// set up the simulation
const simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.id))
        .force("charge", d3.forceManyBody().strength(-50))
        .force("x", d3.forceX())
        .force("y", d3.forceY());

// create the svg
const svg = d3.select("#maingraph")
        .attr("viewBox", [p1x, p1y, width, height]);

// Start the actual drawing.
// add the links
const link = svg.append("g")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
    .selectAll("line")
    .data(links)
    .join("line")
      .attr("stroke-width", d => Math.sqrt(d.value));

// add the nodes
  const node = svg.append("g")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
    .selectAll("circle")
    .data(nodes)
    .join("circle")
      .attr("r", 5)
      .attr("fill", '#333')
      .call(drag(simulation));

// add names
node.append("title")
.text(d => d.name);

simulation.on("tick", () => {
link
  .attr("x1", d => d.source.x)
  .attr("y1", d => d.source.y)
  .attr("x2", d => d.target.x)
  .attr("y2", d => d.target.y);

node
  .attr("cx", d => d.x)
  .attr("cy", d => d.y);
});
