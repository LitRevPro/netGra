const { valueCounts } = require('./mathstuff')


// returns network density
// returns float
exports.density = function(data){
    const an = data['nodes'].length;
    const ae = data['links'].length;
    const pc = (an*(an-1))/(2);
    const de = ae/pc;
    return de.toFixed(3)
}

// calculates node's degree centrality
// returns node array
exports.degcent = function(graphdata){

    // get node array
    const nar = graphdata["nodes"];

    // calculate total number of links
    const fulln = nar.length;

    //collapse nodes from links
    let linkednodes = [];
    for (eachlink of graphdata['links']){
        linkednodes.push(eachlink['source'])
        linkednodes.push(eachlink['target'])
    }

    // get a value count
    const countarray = valueCounts(linkednodes);
    // iterate through the nodes to add data
    for (eano of nar) {
        const nid = eano['id']

        if (nid in countarray){
          eano['dcen'] = countarray[nid];
        } else {
            eano['dcen'] = 0
        }
    }

    // returns node array
    return nar;
}