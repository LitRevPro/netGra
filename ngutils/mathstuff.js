exports.valueCounts = function(longarray){

    let theoutput = {}

    for (eachnode of longarray){
        if (!(eachnode in theoutput)){
            theoutput[eachnode]=1;
        }
        else {
            theoutput[eachnode]++;
        }
    }
    return theoutput
}