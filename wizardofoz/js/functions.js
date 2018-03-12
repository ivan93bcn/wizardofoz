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
        type: "info_mago",
        name: document.getElementById("nombre").value,
        age: document.getElementById("edad").value,
        inst: document.getElementById("inst").value,
        cargo: document.getElementById("cargo").value
    }
    server.sendMessage(pack);
}

validate_form = function (){
    
    var nombre = document.getElementById("nombre");
    var edad = document.getElementById("edad");
    var inst = document.getElementById("inst");
    var cargo = document.getElementById("cargo");

    var error_nombre = document.getElementById("error_nombre");
    var error_edad = document.getElementById("error_edad");
    var error_inst = document.getElementById("error_inst");
    var error_cargo = document.getElementById("error_cargo");

    if(nombre.value == ""){
        error_nombre.innerHTML = "Nombre obligatorio";
        error_edad.innerHTML = "";
        error_inst.innerHTML = "";
        error_cargo.innerHTML = "";
        nombre.focus();
        nombre.classList.add("input_error");
        edad.classList.remove("input_error");
        inst.classList.remove("input_error");
        cargo.classList.remove("input_error");
        return false;
    }
    else if(edad.value == ""){
        error_edad.innerHTML = "Edad obligatoria";
        error_nombre.innerHTML = "";
        error_inst.innerHTML = "";
        error_cargo.innerHTML = "";
        edad.focus();
        edad.classList.add("input_error");
        nombre.classList.remove("input_error");
        inst.classList.remove("input_error");
        cargo.classList.remove("input_error");
        return false;
    }
    else if(inst.value == ""){
        error_inst.innerHTML = "Institución obligatoria";
        error_nombre.innerHTML = "";
        error_edad.innerHTML = "";
        error_cargo.innerHTML = "";
        inst.focus();
        inst.classList.add("input_error");
        nombre.classList.remove("input_error");
        edad.classList.remove("input_error");
        cargo.classList.remove("input_error");
        return false;
    }
    else if(cargo.value == ""){
        error_cargo.innerHTML = "Cargo obligatorio";
        error_nombre.innerHTML = "";
        error_edad.innerHTML = "";
        error_inst.innerHTML = "";        
        cargo.focus();
        cargo.classList.add("input_error");
        nombre.classList.remove("input_error");
        edad.classList.remove("input_error");
        inst.classList.remove("input_error");
        return false;
    }
    return true;
}

function save_info(){
    if(validate_form()){      
        load_userchat();
        init_buttons();
        init_chat();
        send_wizard_info();
    }
}

function load_userchat(){
    document.getElementById('container').style.display = "none";
    document.getElementById('half').style.display = "";
}

function add_user(user){
    users.push(user);

    var pos = users.length - 1;

    $("#dropdown ul").append('<li><a onClick="show_chars(\'' + pos + '\'); return false;">' + user.name + '</a></li>');
    send_wizard_info();
}

function show_chars(pos){

	var caracteristicas = "&nbsp Nombre: " + users[pos].name +
							 "<br>&nbsp Edad: " + users[pos].age + 
							 "<br>&nbsp Motivo: " + users[pos].desc;

	document.getElementById("p_car").innerHTML = caracteristicas;
}