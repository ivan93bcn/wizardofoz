var server = new SillyClient(); //create our class
var room = "GLOBAL";
init_server();

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
	
	if (msg.type == "chat")
		write_chat(msg.chat)
	else if (msg.type == "info_mago")
		write_caracteristicas(msg)

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

function write_chat(mensaje){
	document.getElementById("p_chat").innerHTML += "<br>" + "&nbsp- " +mensaje;
}

function write_caracteristicas(mensaje){

	var caracteristicas = "&nbsp Nombre: " + mensaje.name +
							 "<br>&nbsp Edad: " + mensaje.age + 
							 "<br>&nbsp Institución: " + mensaje.inst +
							 "<br>&nbsp Cargo: " + mensaje.cargo;

	document.getElementById("p_car").innerHTML = caracteristicas;
}