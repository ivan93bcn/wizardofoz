var server = new SillyClient(); //create our class
var room = "GLOBAL";
init_server();

var users = [];

function init_server(){
		
	server.connect("84.89.136.150:55000", room);
	//console.log("connected in room: " + room);
}

server.on_connect = function(){  
	console.log("Connected to server! :)");
	//window.server_on = true;
}

server.on_message = function(user_id, message){

	if(!message)
		return;

	var msg = JSON.parse(message);

	if(msg.type == "info")
		init_caracteristicas(msg);
	else if (msg.type == "chat")
		write_chat(msg.chat)

    //msgs.scrollTop = msgs.scrollHeight; // conseguimos que se haga scroll automatico 
                                         // al enviar más mensajes
}

server.on_user_connected = function(user_id){  
	console.log("Somebody has connected to the room");
}

server.on_user_disconnected = function(user_id){  
	console.log("Somebody has disconnected from the room");
}

server.on_close = function(){  
	console.log("Server closed the connection" );
}

function init_caracteristicas(caracteristicas){

	document.getElementById("p_car").innerHTML += "<br>" + "&nbsp- Nombre : " + caracteristicas.name;
	document.getElementById("p_car").innerHTML += "<br>" + "&nbsp- Edad : " + caracteristicas.age;
	document.getElementById("p_car").innerHTML += "<br>" + "&nbsp- Motivo : " + caracteristicas.desc;

    var user = new User(caracteristicas.name, caracteristicas.age, caracteristicas.desc);
	users.push(user);
	send_wizard_info();
}

function write_chat(mensaje){
	document.getElementById("p_chat").innerHTML += "<br>" + "&nbsp- " +mensaje;
	write_log(" - " + mensaje);
}