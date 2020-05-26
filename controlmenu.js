$("#cind").text("=")
$("#controlmenu").mouseover(function(){
    $("#controlmenu").addClass("controlmenac");
    $("#cind").text("x");
}).mouseout(function(){
    $("#controlmenu").removeClass("controlmenac");
    $("#cind").text("=");
});



// add the text for the open close thing

/*
// add the toggle function for the menu
$("#cind").click(function(){
    if ($("#controlmenu").hasClass("controlmenac")) {
        $("#cind").text("x")
    } else {
        $("#cind").text("=")
    }
})
*/

$("#controlmenu").append('<div id="nmen" class="menite">node attributes</div>')
$("#controlmenu").append('<div id="lmen" class="menite">link attributes</div>')

// add node attribute data
const nodekeydata = Object.keys(data['nodes'][0])
for (dpk of nodekeydata){
    let dpval = data['nodes'][0][dpk]
    $("#nodedatapoints").append("<tr><td class=tabi>"+ dpk +":</td><td></td><td>"+ typeof dpval +"</td></tr>")
}
// add node attribute data
const linkkeydata = Object.keys(data['links'][0])
for (dpk of linkkeydata){
    let lpval = data['links'][0][dpk]
    $("#linkdatapoints").append("<tr><td class=tabi>"+ dpk +":</td><td></td><td>"+ typeof lpval +"</td></tr>")
}

// node attributes submenu
$("#nmen").mouseover(function(){
    $("#nodedataw").css("visibility","visible");
}).mouseout(function(){
    $("#nodedataw").css("visibility","hidden");
});

// links attributes submenu
$("#lmen").mouseover(function(){
    $("#linkdataw").css("visibility","visible");
}).mouseout(function(){
    $("#linkdataw").css("visibility","hidden");
});