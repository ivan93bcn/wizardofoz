function init_chat(){
    $("#p_input").keyup(function(event) {
        if (event.keyCode === 13) {
            $("#btn_send").click();
        }
    });
}

function sendText() {
    
    var text = document.getElementById("p_input").value;

    if(text != ""){
        document.getElementById("p_chat").innerHTML += "<br>" + "&nbsp+ " +text;
        sendChat(text);
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

function init_caracteristicas(){

    for(var i=0; i < 4; i++){
        document.getElementById("p_car").innerHTML += "<br>" + "&nbsp- Característica " + (i+1) + ": ";
    }
}

validate_form = function (){
    
    var nombre = document.getElementById("nombre").value;
    var edad = document.getElementById("edad").value;
    var desc = document.getElementById("desc").value;

    
    if(nombre == ""){
        document.getElementById("error_nombre").innerHTML = "Nombre obligatorio";
        document.getElementById("error_edad").innerHTML = "";
        return false;
    }
    if(edad == ""){
        document.getElementById("error_edad").innerHTML = "Edad obligatoria";
        document.getElementById("error_nombre").innerHTML = "";
        return false;
    }
    return true;
}

function send_info(){
    if(validate_form()){
        var pack = {
            type: "info",
            name: document.getElementById("nombre").value,
            age: document.getElementById("edad").value,
            desc: document.getElementById("desc").value
        }
        server.sendMessage(pack);
        load_userchat();
    }
}

function load_userchat(){
    $("#form_user").load("chatuser.html");
    //init_caracteristicas();
    //init_chat();
}

