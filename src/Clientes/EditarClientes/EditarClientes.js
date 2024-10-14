//Creacion e inicializacion de variables para ser accedidas por demas funciones en el scope
let clientSelect = null;
let nameInput = null;
let cuitInput = null;
let addressInput = null;
let selectedClientId = null;

//Asignacion de valores al cargar el DOM
$(document).ready(function (){

    addNavBar();

    clientSelect = document.getElementById('clientSelect');
    nameInput = document.getElementById('name');
    cuitInput = document.getElementById('cuit');
    addressInput = document.getElementById('address');
    selectedClientId = null;

    fetchClients().then(() => {
        const queryParams = getQueryParams();
        if (queryParams.clientId) {
            clientSelect.value = queryParams.clientId;
            const event = new Event('change');
            clientSelect.dispatchEvent(event);
        }
    });

    // Rellenar los campos con la información del cliente seleccionado
    clientSelect.addEventListener('change', function() {
        const clientId = this.value;
        if (clientId) {
            fetch(`http://localhost:8080/client/${clientId}`)
                .then(response => response.json())
                .then(client => {
                    selectedClientId = client.id;
                    nameInput.value = client.name;
                    cuitInput.value = client.cuit;
                    addressInput.value = client.address;
                })
                .catch(error => console.error('Error al obtener los detalles del cliente:', error));
        } else {
            nameInput.value = '';
            cuitInput.value = '';
            addressInput.value = '';
        }
    });
});

// Obtener la lista de clientes desde la API
function fetchClients() {
    return  fetch('http://localhost:8080/client')
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



function createNewEditedClient() {

    if (!selectedClientId) {

        Swal.fire({
            icon: "error",
            title: "Seleccione un cliente",
            text: "Por favor seleccione un cliente desde el desplegable 'Seleccione un Cliente:'",
        });
        return;
    }

    const updatedClient = {
        id: selectedClientId,
        name: nameInput.value.trim(),
        cuit: cuitInput.value.trim(),
        address: addressInput.value.trim()
    };

    fetchEdit(updatedClient);
}

function fetchEdit(updatedClient) {

    fetch(`http://localhost:8080/client/edit`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedClient)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al editar el cliente');
            }
            return response.json();
        })
        .then(data => {

            Swal.fire({
                title: "Cliente actualizado exitosamente!",
                text: "El cliente se ha editado correctamente en la base de datos",
                icon: "success",
                showDenyButton: false,
                showCancelButton: false,
                confirmButtonText: "Aceptar",
            }).then((result) => {

                location.reload();
            });
            // Recargar la página para actualizar la lista de clientes
        })
        .catch(error => {

            Swal.fire({
                icon: "error",
                title: "Hubo un problema al actualizar el cliente",
                text: "Algo salió mal y no pudo realizarse la acción. Por favor reintente o pruebe con cerrar y volver a " +
                    "abrir el programa. Si este error persiste comuníquese con soporte para recibir " +
                    "ayuda avanzada. (Información del Error: " + error.message + ")",
                footer: '<a href="mailto:cristianbazan.cr@gmail.com">Contactar con Soporte</a>'
            });
        });
}

function getQueryParams() {

    const urlValues = window.location.search;
    const params = new URLSearchParams(urlValues);
    return {
        clientId: params.get('clientId')
    };
}