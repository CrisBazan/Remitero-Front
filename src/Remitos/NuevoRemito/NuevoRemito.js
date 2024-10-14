//Creacion e inicializacion de variables para ser accedidas por demas funciones en el scope
let clientSelect = null;
let selectedClientId = null;
let details_count = 1;

//Asignacion de valores y acciones al cargar el DOM
document.addEventListener('DOMContentLoaded', function (){

    addNavBar();

    clientSelect = document.getElementById('clientSelect');
    selectedClientId = null;

    fetchClients();

    clientSelect.addEventListener('change', function() {

        const clientId = this.value;
        if (clientId) {

            selectedClientId = this.value;
        }
    });
});

// Obtener la lista de clientes desde la API
function fetchClients() {
    fetch('http://localhost:8080/client')
        .then(response => response.json())
        .then(clients => {
            clients.forEach(client => {
                const option = document.createElement('option');
                option.value = client.id;
                option.text = client.name;
                clientSelect.appendChild(option);
            });
        })
        .catch(error => Swal.fire({
            icon: "error",
            title: "Error al obtener los clientes",
            text: "Algo salió mal y no pudo realizarse la acción. Por favor reintente o pruebe con cerrar y volver a " +
                "abrir el programa. Si este error persiste comuníquese con soporte para recibir " +
                "ayuda avanzada. (Información del Error: " + error.message + ")",
            footer: '<a href="mailto:cristianbazan.cr@gmail.com">Contactar con Soporte</a>'
        }));
}

function addDetail() {

    var table = document.getElementById("details-table");
    var row = table.insertRow();

    details_count++;

    var date_newCell = row.insertCell(0);
    var date_input = document.createElement("textarea");
    date_input.rows = "1";
    date_input.cols = "0";
    date_input.id = 'date' + details_count;

    var desc_newCell = row.insertCell(1);
    var desc_input = document.createElement("textarea");
    desc_input.rows = "1";
    desc_input.cols = "0";
    desc_input.id = 'desc' + details_count;

    var cant_newCell = row.insertCell(2);
    var cant_input = document.createElement("textarea");
    cant_input.rows = "1";
    cant_input.cols = "0";
    cant_input.id = 'cant' + details_count;


    var pTotal_newCell = row.insertCell(3);
    var pTotal_input = document.createElement("textarea");
    pTotal_input.rows = "1";
    pTotal_input.cols = "0";
    pTotal_input.id = 'pTotal' + details_count;

    date_newCell.appendChild(date_input);
    desc_newCell.appendChild(desc_input);
    cant_newCell.appendChild(cant_input);
    pTotal_newCell.appendChild(pTotal_input);
}

function removeDetail() {

    var table = document.getElementById("details-table");

    if (details_count >1) {

        table.deleteRow(details_count);
        details_count--;
    }
}

function createRemito() {

    if (clientSelect < 1){

        Swal.fire({
            icon: "error",
            title: "Error en el Cliente",
            text: "Por favor asegúrese de seleccionar un cliente"
        });
        return;
    }

    // Client info
    let date = document.getElementById("inputDate").value;
    if (date == null || date.length != 10){

        Swal.fire({
            icon: "error",
            title: "Error en la Fecha ingresada",
            text: "Por favor asegúrese que el campo 'Fecha' fue completado siguiendo el patrón 'dd/mm/aaaa'"
        });
        return;
    }

    let observations = document.getElementById("inputObservations").value;
    let total = document.getElementById("inputTotal").value;

    // Detail info
    const details = [];

    for (let i=0; i < details_count; i++){

        let detail_date = document.getElementById('date'+(i+1)).value;
        let detail_desc = document.getElementById('desc'+(i+1)).value;
        let detail_cant = document.getElementById('cant'+(i+1)).value;
        let detail_pTotal = document.getElementById('pTotal'+(i+1)).value;

        const detail = {
            date        : detail_date,
            description : detail_desc,
            quantity    : detail_cant,
            ptotal      : detail_pTotal
        };
        details.push(detail);
    }

    const remito = {
        clientId:selectedClientId,
        total: total,
        date: date,
        observations: observations,
        details: details
    }

    fetchRemito(remito);
}

function fetchRemito(remito) {

    fetch('http://localhost:8080/remito/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(remito)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la creación del remito');
            }
            return response.json();
        })
        .then(data => {
            Swal.fire({
                title: "Nuevo Remito",
                text: "Remito creado exitosamente!",
                icon: "success",
                showCancelButton: true,
                cancelButtonText: "Ver Remito",
                confirmButtonText: "Entendido",
            }).then((result) => {
                if (!result.isConfirmed){
                    openRemito(data.id);
                } else {
                    window.location.reload()
                }
            });
        })
        .catch(error => {
            Swal.fire({
                icon: "error",
                title: "Hubo un problema al crear el remito",
                text: "Algo salió mal y no pudo realizarse la acción. Por favor reintente o pruebe con cerrar y volver a " +
                    "abrir el programa. Si este error persiste comuníquese con soporte para recibir " +
                    "ayuda avanzada. (Información del Error: " + error.message + ")",
                footer: '<a href="mailto:cristianbazan.cr@gmail.com">Contactar con Soporte</a>',
            });
        });
}

function calcularTotal() {

    let total = parseFloat('0');

    for (let i=0; i < details_count; i++){

        let valor = parseFloat(document.getElementById('pTotal'+(i+1)).value);
        if (!isNaN(valor)){

            total += valor;
        }else {

            Swal.fire({
                icon: "error",
                title: "Error en valor de P. Total",
                text: "Todos los campos P. Total deben estar completos con números. Por favor revise y complete correctamente"
            });
            return
        }

    }
    document.getElementById("inputTotal").value = total;
}

function openRemito(remitoId) {

    fetch('http://localhost:8080/owner')
        .then(response => response.json())
        .then(owner => {
            console.log(owner)
            if (owner.name == ""){

                Swal.fire({
                    icon: "error",
                    title: "Datos personales vacíos",
                    text: "Por favor diríjase a 'Menu -> Configuraciones -> Mis Datos' y complete sus datos"
                })
            }else {

                window.location.href = `../VerRemito/VerRemito.html?nRemito=${remitoId}`
            }
        })
        .catch(error => Swal.fire({
            icon: "error",
            title: "Error al revisar los datos personales",
            text: "Algo salió mal y no pudo realizarse la acción. Por favor reintente o pruebe con cerrar y volver a " +
                "abrir el programa. Si este error persiste comuníquese con soporte para recibir " +
                "ayuda avanzada. (Información del Error: " + error.message + ")",
            footer: '<a href="mailto:cristianbazan.cr@gmail.com">Contactar con Soporte</a>'
        }));
}