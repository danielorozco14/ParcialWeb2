let app={
    init:function(){
        this.addEvents();
    },
    addEvents:function(){
        var contadorFilas=1;
        fetch("/movil")
        .then(res=>res.json())
        .then(data=>{
            let moviles=document.getElementsByClassName("tablaMoviles")[0];
            moviles.innerHTML=data.reduce((cadena,element)=>{
                return cadena + 
                `
                <tr>
                    <th scope="row">${contadorFilas}</th>
                    <td class="name">${element.nombre}</td>
                    <td class="publicador">${element.publicador}</td>
                    <td class="fecha">${element.fechaPublicacion}</td>
                </tr>                
                `
                
            })

        })
    }
}