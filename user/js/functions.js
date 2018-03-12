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

validate_form = function (){
    
    var nombre = document.getElementById("nombre");
    var edad = document.getElementById("edad");
    var desc = document.getElementById("desc");

    var error_nombre = document.getElementById("error_nombre");
    var error_edad = document.getElementById("error_edad");

    if(nombre.value == ""){
        error_nombre.innerHTML = "Nombre obligatorio";
        nombre.classList.add("input_error");
        edad.classList.remove("input_error");
        error_edad.innerHTML = "";
        nombre.focus();
        return false;
    }
    else if(edad.value == ""){
        error_edad.innerHTML = "Edad obligatoria";
        error_nombre.innerHTML = "";
        nombre.classList.remove("input_error");
        edad.classList.add("input_error");
        edad.focus();
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
        init_chat();
    }
}

function load_userchat(){
    document.getElementById('container').style.display = "none";
    document.getElementById('half').style.display = "";
}
