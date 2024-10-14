document.addEventListener('DOMContentLoaded', function (){

    addNavBar();
});

function createUser() {

    // Validación básica
    const name = document.getElementById('name').value.trim();
    const cuit = document.getElementById('cuit').value.trim();
    const address = document.getElementById('address').value.trim();

    if (!name || !cuit || !address) {

        Swal.fire({
            icon: "error",
            title: "Todos los campos son obligatorios",
            text: "Asegúrese de completar todos los campos antes de oprimir el botón 'Crear Cliente'",
        });
        return;
    }

    const regex = /^\d{2}-\d{8}-\d{1}$/;
    if (!regex.test(cuit)) {

        Swal.fire({
            icon: "error",
            title: "Número de CUIT inválido",
            text: "Por favor, ingrese un CUIT válido con el formato correcto: 00-00000000-0"
        });
        return;
    }

    // Crear JSON con los datos
    const clientData = {
        name: name,
        cuit: cuit,
        address: address
    };

    // Enviar datos al API
    fetch('http://localhost:8080/client/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(clientData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la creación del cliente');
        }
        return response.json();
    })
    .then(data => {
        Swal.fire({
            title: "Nuevo Cliente",
            text: "Cliente creado exitosamente!",
            icon: "success"
        });
        limpiarCampos();
    })
    .catch(error => {
        Swal.fire({
            icon: "error",
            title: "Hubo un problema al crear el cliente",
            text: "Algo salió mal y no pudo realizarse la acción. No puede ingresarse 2 veces el mismo cuit, " +
                "revise la papelera y si encuentra el número de cuit restáurelo y edítelo. Si no es el caso y este " +
                "error persiste por favor reintente o pruebe con cerrar y volver a abrir el programa, si aún asi no " +
                "logra solución comuníquese con soporte para recibir ayuda avanzada. (Información del Error: "
                + error.message + ")",
            footer: '<a href="mailto:cristianbazan.cr@gmail.com">Contactar con Soporte</a>'
        });
    });

    function limpiarCampos() {
        document.getElementById('name').value = '';
        document.getElementById('cuit').value = '';
        document.getElementById('address').value = '';
    }
};