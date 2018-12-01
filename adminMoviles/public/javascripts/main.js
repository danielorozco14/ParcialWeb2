let app={
    init:function(){
        this.addEvents();
    },
    addEvents:function(){
        
        fetch("/movil")
        .then(res=>res.json())
        .then(data=>{
            
            let moviles=document.getElementsByClassName("tablaMoviles")[0];
            moviles.innerHTML=data.reduce((cadena,element)=>{
                var contadorFilas=1;//VERFIFICAR VARIABLE EN SCOPE ROW MAS ADELANTE
                return cadena + 
                `<tr>
                    <th scope="row">${contadorFilas}</th>
                    <td class="name">${element.nombre}</td>
                    <td class="publicador">${element.publicador}</td>
                    <td class="fecha">${element.fechaPublicacion}</td>
                    <td class="opciones">
                        <a data-id="${element._id}" class= "edit" href="">Editar</a>
                        <a data-id="${element._id}" class= "delete" href="">Eliminar</a>
                     </td>
                </tr>                
                `              
            contadorFilas++;
            },"");
            document.querySelectorAll(".delete").forEach(element=>{//PARA ELIMINAR UN REGISTRO
                element.addEventListener('click',function(event){
                    event.preventDefault();
                    let id =element.getAttribute("data-id");
                    fetch('/movil/'+id,{
                        method:'DELETE'
                    })
                    .then(res=>res.json())
                    .then(data=>{
                        if(data.success){
                            moviles.removeChild(element.parentElement.parentElement);
                        }
                    }).catch(err=>{
                        console.log('La cague en algo:v '+ err);
                    });
                });
            });
            document.querySelectorAll(".edit").forEach(element=>{//PARA EDITAR UN REGISTRO
                element.addEventListener('click',function(evnt){//CHEQUEAR VARIABLE evnt
                    event.preventDefault();
                    let id =element.getAttribute("data-id");
                    fetch('/movil/'+id)
                    .then(res=>res.json())
                    .then(data=>{
                        var formulario=document.forms.guardarMovil;
                        formulario.nombre.value=data.nombre;
                        formulario.publicador.value=data.publicador;
                        formulario.fechaPublicacion.value=data.fechaPublicacion;
                        formulario.action="/movil/" + data._id;
                    });                    
                });
            });

        });
    }    
}
let formulario= document.forms.guardarMovil;

formulario.addEventListener('submit',function(event){
    event.preventDefault();
    if(formulario.action=='/movil'){
        fetch(formulario.action,{
            method:'POST',
            body: new URLSearchParams(new FormData(formulario))
        }).then(res=>res.json())
        .then(data=>{
            console.log(data);
            loadContent();
        });
    }else{
        fetch(formulario.action,{
            method:'PUT',
            body: new URLSearchParams(new FormData(formulario))
        }).then (res=>res.json())
        .then(data=>{
            if(data.success){
                formulario.action='/movil';
                formulario.method='POST';
                alert('DATOS ACTUALIZADOS')//PARA PROBAR,ELIMINAR DESPUES
                formulario.publicador.value=formulario.nombre.value=formulario.fechaPublicacion.value="";
                loadContent();
            }
        });
        loadContent();
    }
    
});
window.onload=()=>app.init();