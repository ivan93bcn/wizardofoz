init_buttons();
init_caracteristicas();
init_chat();

var log = [];

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

function writePosition(gesture) {
    write_log("Gesto: " + gesture);
}

function init_buttons(){
    var i;
    var botons_ani = [":)", ":(", ":|", ":_(", "..."];
    for(i=0; i < botons_ani.length; i++){
        var boton = document.createElement("button");
        boton.className = "btn btn-primary btn-lg botones";
        boton.id = "btn_ani_" + i;
        boton.innerHTML = botons_ani[i];
        $(boton).on("click", function(){ writePosition(this.innerHTML); });
        $("#gestures").append(boton, getSpaces(6));
    }
}

function sendText() {
    
    var text = document.getElementById("p_input").value;

    if(text != ""){
        if(text.includes("::")){
            write_log(text.split("::")[1]);
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

var textFile = null,
makeTextFile = function (text) {

    var acc = "";
    for(var i = 0; i < text.length; i++){
        acc += text[i];
    }

    var data = new Blob([acc], {type: 'text/plain'});

    // If we are replacing a previously generated file we need to
    // manually revoke the object URL to avoid memory leaks.
    if (textFile !== null) {
        window.URL.revokeObjectURL(textFile);
    }

    textFile = window.URL.createObjectURL(data);

    return textFile;
};

getDate = function (){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd = '0' + dd
    } 

    if(mm<10) {
        mm = '0' + mm
    } 

    return dd + '/' + mm + '/' + yyyy;
}

getTime = function (){
    var today = new Date();
    var hh = today.getHours();
    var mm = today.getMinutes();
    var ss = today.getSeconds();

    return hh + ':' + mm + ':' + ss;
}

function write_log(mensaje){
    var hora = getTime();
    var username = "antonia";
    var filename = "log_" + username + ".txt";
    if(log.length == 0)
        log.push(" ------- " + getDate() + " ------- \r\n");
    log.push(hora + " - " + mensaje + "\r\n");
    var link = document.getElementById('btn_log');
    link.href = makeTextFile(log);
    link.download = filename;
}

function init_caracteristicas(){

    for(var i=0; i < 4; i++){
        document.getElementById("p_car").innerHTML += "<br>" + "&nbsp- Característica " + (i+1) + ": ";
    }
}

//https://www.pubnub.com/blog/2015-08-25-webrtc-video-chat-app-in-20-lines-of-javascript/