init_buttons();
init_caracteristicas();
init_chat();
//init_log();

var log = [];
//var file = new File();

function init_chat(){
    $("#p_input").keyup(function(event) {
        if (event.keyCode === 13) {
            $("#btn_send").click();
        }
    });
}

function getSpaces(num) {
    var text = "";
    for(var i = 0; i < num; i++){
        text += "&nbsp;";
    }
    return text;
}

function getButtonPosition(gesture) {
    alert("Boton: " + gesture);
}

function init_buttons(){
    var i;
    for(i=0; i < 6; i++){
        var boton = document.createElement("button");
        boton.className = "btn btn-primary btn-lg botones";
        boton.id = "btn_ani_" + i;
        switch(i){
            case 0:
                boton.innerHTML = ":)";
                break;
            case 1:
                boton.innerHTML = ":(";
                break;
            case 2:
                boton.innerHTML = ":|";
                break;
            case 3:
                boton.innerHTML = ":_(";
                break;
            default:
                boton.innerHTML = "...";
            break;
        }
        $(boton).on("click", function(){ getButtonPosition(this.innerHTML); });
        $("#gestures").append(boton, getSpaces(6));
    }
}


function sendText() {
    
    var text = document.getElementById("p_input").value;

    if(text != ""){
        if(text.includes("::")){
            //write_log(text.split("::")[1]);
            console.log(text.split("::")[1]);
        } else{
            document.getElementById("p_chat").innerHTML += "<br>" + "&nbsp+ " +text;
        }
    }

    document.getElementById("p_input").value = "";
}  

function destroyClickedElement(event)
{
    document.body.removeChild(event.target);
}

function write_log(texto){
/*
    log.push({
        key:   log.length,
        date: "date",
        text: texto
    });*/
}

/*
$("#btn_save_log").click( function() {
    
    var FileSaver = require('file-saver');

    var text = $("#p_input").val();
    var filename = "log_antonia";
    var blob = new Blob([text], {type: "text/plain;charset=utf-8"});
    FileSaver.saveAs(blob, filename + ".txt");
    });
*/
function init_log(){

}

function init_caracteristicas(){

    for(var i=0; i < 4; i++){
        document.getElementById("p_car").innerHTML += "<br>" + "&nbsp- Característica " + (i+1) + ": ";
    }
}


//https://www.pubnub.com/blog/2015-08-25-webrtc-video-chat-app-in-20-lines-of-javascript/