
///
// Codigo asosiaco a la pagina pedidos
///

const precios = [500,700,450,450,500];

// Creacion de objetos con los productos

class Cupcake {
    constructor (sabor, precio, imagen, cantidad){
        this.sabor = sabor;
        this.precio = precio;  
        this.imagen = imagen;
        this.cantidad = cantidad;
    }

}

//
// Se crean los objetos de manera individual para tener mas orden en el codigo
//

const saborChoco = new Cupcake("chocochips", precios[0], "multimedia/choco.jpg", 0);
const saborBrownie = new Cupcake("brownie", precios[1], 'multimedia/brownie.jpg',0);
const saborLimon = new Cupcake("limon", precios[2], 'multimedia/limon.jpg',0);
const saborZanahoria = new Cupcake("zanahoria", precios[3], 'multimedia/zanahoria.jpg',0);
const saborOreo = new Cupcake("oreo", precios[4], 'multimedia/oreo.jpg',0);

let baseDeProductos = [saborChoco, saborBrownie, saborLimon, saborZanahoria, saborOreo];
let acumuladorCard = [];

/**
 * Funcion para agregar las cards al html apartir del array baseDeProductos
 * @param {} () no aplica parametro ya que se inicia con el onload
 */

function colocarProductos (){

    if (localStorage.getItem("pedidoAlmacenado") ){

        baseDeProductos = JSON.parse(localStorage.getItem("pedidoAlmacenado"));
    }
   
    for (let i = 0; i < baseDeProductos.length; i++){
     
        acumuladorCard += 
        `<div class="col-sm-12 col-md-6 col-lg-4 producto">
            <h2 class="card-title"> ${baseDeProductos[i].sabor} </h2>
            <img src="${baseDeProductos[i].imagen}" width="250px">
            <p class="card-text text-center"> $${baseDeProductos[i].precio}</p>
            <div class = "botones">
                <button class = "boton" onclick="agregarAlPedido(${i})"> Agregar </button>
                <button class = "boton" onclick="eliminarProducto(${i})"> Eliminar </button>
            </div>
            <p  id="${baseDeProductos[i].sabor}"> Has pedido ${baseDeProductos[i].cantidad} </p>
        </div> `
    }    

    document.getElementById("productosEnVenta").innerHTML=acumuladorCard;

    if (localStorage.getItem("carrito")) {
        carrito = JSON.parse(localStorage.getItem("carrito"));
    } else {
        carrito = [];
    }
  
} 

 
/**
 * Funcion para agregar productos al carrito
 * Suma el precio a la variable carrito y va guardando la cantidad solicitada
 * @param {} i ingresa la posicion del objeto dentro del array baseDeProductos
 */

function agregarAlPedido(i){

    baseDeProductos[i].cantidad++
    let pedido = document.getElementById(`${baseDeProductos[i].sabor}`);
    pedido.innerHTML = ` Has pedido ${baseDeProductos[i].cantidad}`;
    precio = baseDeProductos[i].precio;
    carrito.push(precio);
}

/**
 * Funcion para eliminar productos al carrito
 * Elimina el precio a la variable carrito y de la cantidad solicitada
 * @param {} i ingresa la posicion del objeto dentro del array baseDeProductos
 */

function eliminarProducto(i){

        
    aux = baseDeProductos[i].cantidad;
    
    if (aux == 0){
        let pedido = document.getElementById(`${baseDeProductos[i].sabor}`);
        pedido.innerHTML = ` Has pedido ${baseDeProductos[i].cantidad}
                            <p> No puedes eliminar mas </p>`;
    } else{
        baseDeProductos[i].cantidad-=1;
        let pedido = document.getElementById(`${baseDeProductos[i].sabor}`);
        pedido.innerHTML = ` Has pedido ${baseDeProductos[i].cantidad}`;
        precio = baseDeProductos[i].precio;
        let pos = carrito.indexOf(precio);
        carrito.splice(pos,1);
    }
  
}


// Arreglo con el carrito final y funcion para mostrar el resumen del pedido

let costoDelPedido = 0;
let cantidadCupcakes = 0;
let detallePedido = "";
let i = 0;

/**
 * Funcion para agregar productos al carrito
 * Muestra en pantalla el total del pedido detallado
 * @param {} () 
 */

function totalPedido(){
    for (i ==0; i < carrito.length; i++) {
        costoDelPedido+=carrito[i]; 
    }

    baseDeProductos.forEach(element => {
        aux = element.cantidad;
        cantidadCupcakes+=aux;
    })

    console.log(carrito)
    console.log (costoDelPedido)
    console.log(cantidadCupcakes);
    console.log(baseDeProductos);

    let resumen = document.createTextNode(`Se han pedido ${cantidadCupcakes} cupcakes por un total de $${costoDelPedido}`);
    let agregar = document.getElementById("resumen");
    agregar.appendChild(resumen)

    baseDeProductos.forEach(element => {
    detallePedido+= ` 
                       <tr>
                            <td>${element.sabor}</td>
                            <td>$${element.precio}</td>
                            <td>${element.cantidad}</td>
                        </tr>`
    });
    
    document.getElementById("detallePedido").innerHTML=detallePedido;

    localStorage.setItem("pedidoAlmacenado",JSON.stringify(baseDeProductos));
    localStorage.setItem("carrito",JSON.stringify(carrito));

}


///
// Codigo asociado a la pagina de contacto
///


function paginaDeContacto (){
    let formulario = document.getElementById("formulario");

    formulario.addEventListener("submit", (e) =>{
        e.preventDefault();
        console.log('Has ingressado tu solicitud');
    })
}    

/**
 * Funcion para validar que no ingresen numeros en los datos de nombre y apellido
 *  * @param {} () se activa al reconocer el evento
 */

function validarTexto(event) {
    event.target.value
    if (event.which == 96 || event.which == 97 || event.which == 98 || event.which == 99 || event.which == 100 || event.which == 101 || event.which == 102 || event.which == 103 || event.which == 104 || event.which == 105 || event.which == 48 || event.which == 49 || event.which == 50 || event.which == 51 || event.which == 52 || event.which == 53 || event.which == 54 || event.which == 55 || event.which == 56 || event.which == 57){
        alert("no puedes ingresar numeros")
        console.log(event)
        let array = Array.from(event.target.value);
        array.pop();
        array = array.join('');
        let cambio = document.getElementById('texto');
        cambio.value = array;
        console.log(array)
    }
}