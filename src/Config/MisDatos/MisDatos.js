let isNewOwner = false;
let name;
let cuit;
let telephone;
let email;
let address;

$(document).ready(function (){

    name = document.getElementById('inputName');
    cuit = document.getElementById('inputCuit');
    telephone = document.getElementById('inputTel');
    email = document.getElementById('inputEmail');
    address = document.getElementById('inputAddress');

    fetchOwner();
});

function fetchOwner() {
    fetch('http://localhost:8080/owner')
        .then(response => response.json())
        .then(owner => {
            if (owner.name !== null){

                name.value = owner.name;
                cuit.value = owner.cuit;
                telephone.value = owner.telephone;
                email.value = owner.email;
                address.value = owner.address;
            }else {

                isNewOwner = true;
            }
        })
        .catch(error => Swal.fire({
            icon: "error",
            title: "Error al obtener los datos personales",
            text: "Algo salió mal y no pudo realizarse la acción. Por favor reintente o pruebe con cerrar y volver a " +
                "abrir el programa. Si este error persiste comuníquese con soporte para recibir " +
                "ayuda avanzada. (Información del Error: " + error.message + ")",
            footer: '<a href="mailto:cristianbazan.cr@gmail.com">Contactar con Soporte</a>'
        }));
}

function updateOwner() {

    if (!name.value || !cuit.value || !telephone.value || !email.value || !address.value){

        Swal.fire({
            icon: "error",
            title: "Todos los campos son obligatorios",
            text: "Asegúrese de completar todos los campos antes de oprimir el botón 'Actualizar mis Datos'",
        });
        return;
    }else {

        const regex = /^\d{2}-\d{8}-\d{1}$/;
        const emailRegex = /^[^@]+@[^@]+\.[a-z]{2,}$/i;

        if (!regex.test(cuit.value)) {

            Swal.fire({
                icon: "error",
                title: "Número de CUIT inválido",
                text: "Por favor, ingrese un CUIT válido con el formato correcto: 00-00000000-0"
            });
            return
        }
        if (!emailRegex.test(email.value)) {

            Swal.fire({
                icon: "error",
                title: "Dirección de Email inválida",
                text: "Por favor, ingrese un email válido. Debe contener '@' y '.com'"
            });
            return;
        }

        const owner = {
            name: name.value.trim(),
            cuit: cuit.value.trim(),
            telephone: telephone.value.trim(),
            email: email.value.trim(),
            address: address.value.trim()
        }
        fetchEdit(owner);
    }
}

function fetchEdit(owner) {

    fetch(`http://localhost:8080/owner/edit`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(owner)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al editar el owner');
            }
            return response.json();
        })
        .then(data => {

            Swal.fire({
                title: "Actualizado exitosamente!",
                text: "Los datos se han editado correctamente en la base de datos",
                icon: "success",
                showDenyButton: false,
                showCancelButton: false,
                confirmButtonText: "Aceptar",
            }).then((result) => {

                location.reload();
            });
        })
        .catch(error => {

            Swal.fire({
                icon: "error",
                title: "Hubo un problema al actualizar los datos",
                text: "Algo salió mal y no pudo realizarse la acción. Por favor reintente o pruebe con cerrar y volver a " +
                    "abrir el programa. Si este error persiste comuníquese con soporte para recibir " +
                    "ayuda avanzada. (Información del Error: " + error.message + ")",
                footer: '<a href="mailto:cristianbazan.cr@gmail.com">Contactar con Soporte</a>'
            });
        });
}