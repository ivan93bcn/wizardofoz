init_buttons();
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
            write_log(" (log) " + text.split("::")[1]);
        } else{
            document.getElementById("p_chat").innerHTML += "<br>" + "&nbsp+ " +text;
            sendChat(text);
            write_log(" + " + text);
        }
    }

    document.getElementById("p_input").value = "";
}  

function sendChat(mensaje){
    var pack = {
        type: "chat",
        chat: mensaje
    }
    server.sendMessage(pack);
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
    var username = users[0].name;
    var filename = "log_" + username + ".txt";
    if(log.length == 0)
        log.push(" ------- " + getDate() + " ------- \r\n");
    log.push(hora + mensaje + "\r\n");
    var link = document.getElementById('btn_log');
    link.href = makeTextFile(log);
    link.download = filename;
}

function send_wizard_info(){
    var pack = {
        type: "info",
        name: "Profesor Font",
        age: "38",
        institution: "UB - UPF",
        lecturename: "El mundo de la informática"
    }
    server.sendMessage(pack);
}