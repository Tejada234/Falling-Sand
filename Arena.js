

let width = 20
let height = 20
let stopped = false

function generateCanvas(width, height) {
    let id = 0;
    for(let i = 1; i <= height; i++){
        document.getElementById("canvas").innerHTML += "<tr id='"+i+"f'>";
        for(let j = 1; j <= width; j++){
            id = String(i) + "0" + String(j);
            document.getElementById(i+ "f").innerHTML += "<td id='" + id + "' onclick='drawSand(" + id + ");' style='background-color: black;'></td>";
        }
        document.getElementById("canvas").innerHTML += "</tr>";
    }
}

async function drawSand(id){

    document.getElementById(id).style.backgroundColor = "white";
    console.log("origen" + id);
    await delay(100);
    let newID = await fallingSand(id);
    await delay(100);
    await fallingSand(getIdLados(newID, 1)); // Hacia Abajo izquierda: -1, derecha: 1

}

async function fallingSand(id){

    let seguir = true;
    while(seguir){
        try {
            if(document.getElementById(getIdAbajo(id)).style.backgroundColor == "black"){ // Cuadrado de Abajo Negro
                document.getElementById(id).style.backgroundColor = "black";
                document.getElementById(getIdAbajo(id)).style.backgroundColor = "white";
                await delay(100);
            }else {
                seguir = false;
            }
            id = getIdAbajo(id);
        } catch {
            seguir = false;
        }
    }
    return id;
}

function getIdLados(id, lado){

    let numero = String(id);

    /*
    console.log("fila" + numero[0]);
    console.log("fila" + numero[1]);
    console.log("separador" + numero[2]);
    console.log("columna" + numero[3]);
    console.log("columna" + numero[4]);
    */

    if(numero.length == 3) {
        return Number(numero[0]) + 1 + "0" + (Number(numero[2]) + lado);
    }
    if(numero.length == 4) {
        if (numero[2] == 0){
            return numero[0] + (Number(numero[1]) + 1) + "0" + (Number(numero[3]) + lado);
        }else if (numero[1] == 0){
            return (Number(numero[0]) + 1) + "0" +  numero[2] + (Number(numero[3]) + lado);
        }
    }
    if(numero.length == 5) {
        if (numero[1] == 9){
            return (Number(numero[0]) + 1) + "0" + "0" + numero[3] + (Number(numero[4]) + lado);
        }
        return numero[0] + String(Number(numero[1]) + 1) + "0" + numero[3] + (Number(numero[4]) + lado);
    }   

}

function getIdAbajo(id) {

    let numero = String(id);

    /*
    console.log("fila" + numero[0]);
    console.log("fila" + numero[1]);
    console.log("separador" + numero[2]);
    console.log("columna" + numero[3]);
    console.log("columna" + numero[4]);
    */

    if(numero.length == 3) {
        return Number(numero[0]) + 1 + "0" + numero[2];
    }
    if(numero.length == 4) {
        if (numero[2] == 0){
            return numero[0] + (Number(numero[1]) + 1) + "0" + numero[3];
        }else if (numero[1] == 0){
            return (Number(numero[0]) + 1) + "0" + numero[2] + numero[3];
        }
    }
    if(numero.length == 5) {
        return numero[0] + (Number(numero[1]) + 1) + "0" + numero[3] + numero[4];
    }
}




function delay(milliseconds){
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}

generateCanvas(width, height);