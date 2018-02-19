function init_chat(){
    $("#p_input").keyup(function(event) {
        if (event.keyCode === 13) {
            $("#btn_send").click();
        }
    });
}

function sendText() {
    
    var text = document.getElementById("p_input").value;

    if(text != "")
        document.getElementById("p_chat").innerHTML += "<br>" + "&nbsp+ " +text;

    document.getElementById("p_input").value = "";
}  

function init_caracteristicas(){

    for(var i=0; i < 4; i++){
        document.getElementById("p_car").innerHTML += "<br>" + "&nbsp- Característica " + (i+1) + ": ";
    }
}

/*$('document').ready(function(){ 
    // Validación para campos de texto exclusivo, sin caracteres especiales ni números
    var nameregex = /^[a-zA-Z ]+$/;
    
    $.validator.addMethod("validname", function( value, element ) {
        return this.optional( element ) || nameregex.test( value );
    }); 

    var age_regex=/\s[0-1]{1}[0-9]{0,2}/;

    $.validator.addMethod("valideage", function( value, element ) {
        return this.optional( element ) || nameregex.test( value );
    }); 
    
    $("#form").validate({
    
        rules:
        {
            nombre: {
            required: true,
            minlength: 8
            },
            edad: {
            required: true,
            valideage: true
            }, 
        },
        messages:
        {
            nombre: {
            required: "Tu Nombre y Apellidos son importantes",
            minlength: "Tu Nombre es demasiado corto"
            },
            edad: {
            required: "Tu Edad es importante",
            valideage: "Tu Edad no es válida"
            },
        },

        errorPlacement : function(error, element) {
        $(element).closest('.form-group').find('.help-block').html(error.html());
        },
        highlight : function(element) {
        $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
        },
        unhighlight: function(element, errorClass, validClass) {
        $(element).closest('.form-group').removeClass('has-error').addClass('has-success');
        $(element).closest('.form-group').find('.help-block').html('');
        },
        
        submitHandler: function(form) { 
            form.action="pagina que envia el correo.php";
            form.submit(); 
            
            alert('ok');
        }
        }); 
    })
*/

function send_info(){

    var name = document.getElementById("nombre").value;
    var age = document.getElementById("edad").value;
    var desc = document.getElementById("desc").value;
    
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/wizardofoz/php/getinfouser.php",
        //url: "../wizardofoz/php/getinfouser.php",
        data: {nombre:name, edad:age ,motivo:desc},
        success: function(data){
            load_userchat();
        },
        error: function(xhr){
            console.log(xhr.responseText);
        }
    });
}

function load_userchat(){
    $("#form_user").load("chatuser.html");
    //init_caracteristicas();
    //init_chat();
}