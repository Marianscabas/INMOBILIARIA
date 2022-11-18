// json-server --watch server.json para activar API REST

const API_URL = "http://localhost:3000"
const INMUEBLE_URL = "http://localhost:3000/inmuebles"


// CREACION DE ETIQUETAS DE HTML PARA UTILIZAR
const saveCard = (div) => {
    let div_main = document.querySelector("#main")
    div_main.appendChild(div)
}

const saveCard2 = (div) => {
    let div_main = document.createElement("div")
    div_main.setAttribute("id", "maine")
    div_main.appendChild(div)
    let body = document.querySelector("body")
    body.appendChild(div_main)
}

    const createImg = (text) => {
        let img = document.createElement("img")
        img.setAttribute('src', text)
        console.log(img)
        return img
    
    }
    const createP = (text) => {
        let p = document.createElement("p")
        p.innerHTML = text
        console.log(p)
        return p
    
    }


    //CONSUMIR DATA DEL JSON-SERVER CON ASYNC /AWAIT 

 const traer_inmuebles = async () => {
    try {
        let response = await fetch(API_URL + "/inmuebles")
        let data = await response.json()
        console.log(data);
        return data 
    } catch (error) {
        console.log(error);

    }
}

//CONSUMIR DATA PARA EL FILTRADO EL FILTRADO SOLO ES POR NOMBRE ("272 S Rexford Dr, Beverly Hills")

const traer_inmueble = async (URL_NAME) => {
    try {
        let response = await fetch(URL_NAME)
        let data = await response.json()
        return data

    } catch (error) {
        console.log(error);

    }
}

//LLAMAR EL CONSUMO A PANTALLA 
const llamar_inmueble = async () => {
    let inmuebles = await traer_inmuebles()
    inmuebles.forEach(element => {
        let div = document.createElement("div")
        div.setAttribute("class", "card")
        div.appendChild(createImg(element.img))
        div.appendChild(createP( element.tipo_de_inmueble))
        div.appendChild(createP( element.name))
        div.appendChild(createP(element.pies_cuadrados))
        div.appendChild(createP(element.precio))
        div.appendChild(createP(element.estado))
        saveCard(div)
    });
}
// LLAMAR EL FILTRO A PANTALLA 
let arr = []
const llamar_card = async (URL_NAME) => {
    let div_main = document.getElementById("main")
    div_main.style.display = "none";
    let inmueble = await traer_inmueble(URL_NAME)

    let div = document.createElement("div")
    div.setAttribute("class", "card")
    div.appendChild(createImg(inmueble[0].img))
    div.appendChild(createP(inmueble[0].tipo_de_inmueble))
    div.appendChild(createP(inmueble[0].name))
    div.appendChild(createP(inmueble[0].pies_cuadrados))
    div.appendChild(createP(inmueble[0].precio))
    div.appendChild(createP(inmueble[0].estado))
    saveCard2(div)
        ;
}

llamar_inmueble()

let cards = document.getElementsByClassName("card")
let form = document.getElementById("form")

//FUNCION PARA BUSQUE CON EL EVENTO DEL BOTTON
form.addEventListener("submit", async (e) => {
    e.preventDefault()
    let inmueble = await traer_inmuebles()
    const term = search.value;
    if (term && term !== "") {
        inmueble.forEach((element) => {
            if (term === element.name) {
                llamar_card(INMUEBLE_URL + "?name=" + element.name)
             }
        })
        search.value = "";
    } else {
        window.location.reload();
    }
})

// FUNCIONES PARA LOS BOTONES ME LLEVEN A OTRA PAGINA 
function card1_div() {
   window.location=("card1.html")
}
function card2_div() {
   window.location=("card2.html")
}
function card3_div() {
   window.location=("card3.html")
}
function card4_div() {
   window.location=("card4.html")
}
function card5_div() {
   window.location=("card5.html")
}
function card6_div() {
   window.location=("card6.html")
}


// en el css tube un erro con los pantallazos que se me sobre escribian sobre el resultado de la busqueda