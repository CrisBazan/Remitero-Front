/*
function addNavBar () {

    document.body.innerHTML = "<!-- NavBar -->\n" +
        "\n" +
        "    <nav class=\"navbar navbar-dark bg-dark\">\n" +
        "        <div class=\"container-fluid\">\n" +
        "          <a class=\"navbar-brand\" href=\"#\">Remitero</a>\n" +
        "          <button class=\"navbar-toggler\" type=\"button\" data-bs-toggle=\"offcanvas\" data-bs-target=\"#offcanvasDarkNavbar\" aria-controls=\"offcanvasDarkNavbar\">\n" +
        "            <span class=\"navbar-toggler-icon\"></span>\n" +
        "          </button>\n" +
        "          <div class=\"offcanvas offcanvas-end text-bg-dark\" tabindex=\"-1\" id=\"offcanvasDarkNavbar\" aria-labelledby=\"offcanvasDarkNavbarLabel\">\n" +
        "            <div class=\"offcanvas-header\">\n" +
        "              <h5 class=\"offcanvas-title\" id=\"offcanvasDarkNavbarLabel\">Menu</h5>\n" +
        "              <button type=\"button\" class=\"btn-close btn-close-white\" data-bs-dismiss=\"offcanvas\" aria-label=\"Close\"></button>\n" +
        "            </div>\n" +
        "            <div class=\"offcanvas-body\">\n" +
        "              <ul class=\"navbar-nav justify-content-end flex-grow-1 pe-3\">\n" +
        "                <li class=\"nav-item\">\n" +
        "                  <a class=\"nav-link\" href=\"../../../src/index.html\" role=\"button\" aria-expanded=\"false\">\n" +
        "                    Inicio\n" +
        "                  </a>\n" +
        "                </li>\n" +
        "              </ul>\n" +
        "              <ul class=\"navbar-nav justify-content-end flex-grow-1 pe-3\">\n" +
        "                <li class=\"nav-item dropdown\">\n" +
        "                  <a class=\"nav-link dropdown-toggle\" href=\"#\" role=\"button\" data-bs-toggle=\"dropdown\" aria-expanded=\"false\">\n" +
        "                    Clientes\n" +
        "                  </a>\n" +
        "                  <ul class=\"dropdown-menu dropdown-menu-dark\">\n" +
        "                    <li><a class=\"dropdown-item\" href=\"../../../src/Clientes/NuevoCliente/NuevoCliente.html\">Agregar Cliente</a></li>\n" +
        "                    <li><a class=\"dropdown-item\" href=\"../../../src/Clientes/AdministrarClientes/AdministrarClientes.html\">Administrar Clientes</a></li>\n" +
        "                    <li><a class=\"dropdown-item\" href=\"../../../src/Clientes/EditarClientes/EditarClientes.html\">Editar Clientes</a></li>\n" +
        "                  </ul>\n" +
        "              <ul class=\"navbar-nav justify-content-end flex-grow-1 pe-3\">\n" +
        "                <li class=\"nav-item dropdown\">\n" +
        "                  <a class=\"nav-link dropdown-toggle\" href=\"#\" role=\"button\" data-bs-toggle=\"dropdown\" aria-expanded=\"false\">\n" +
        "                    Remitos\n" +
        "                  </a>\n" +
        "                  <ul class=\"dropdown-menu dropdown-menu-dark\">\n" +
        "                    <li><a class=\"dropdown-item\" href=\"../../../src/Remitos/NuevoRemito/NuevoRemito.html\">Nuevo Remito</a></li>\n" +
        "                    <li><a class=\"dropdown-item\" href=\"../../../src/Remitos/AdministrarRemitos/AdministrarRemitos.html\">Administrar Remitos</a></li>\n" +
        "                  </ul>\n" +
        "                </li>\n" +
        "              </ul>\n" +
        "            </div>\n" +
        "          </div>\n" +
        "        </div>\n" +
        "      </nav>\n" +
        "\n" +
        "      <br>"
        + document.body.innerHTML
}
*/

function addNavBar() {
    // Crear el elemento nav
    const nav = document.createElement("nav");
    nav.className = "navbar navbar-dark bg-dark";

    const container = document.createElement("div");
    container.className = "container-fluid";

    const brand = document.createElement("a");
    brand.className = "navbar-brand";
    brand.href = "#";
    brand.textContent = "Remitero";

    const button = document.createElement("button");
    button.className = "navbar-toggler";
    button.type = "button";
    button.setAttribute("data-bs-toggle", "offcanvas");
    button.setAttribute("data-bs-target", "#offcanvasDarkNavbar");
    button.setAttribute("aria-controls", "offcanvasDarkNavbar");

    const buttonIcon = document.createElement("span");
    buttonIcon.className = "navbar-toggler-icon";
    button.appendChild(buttonIcon);

    const offcanvas = document.createElement("div");
    offcanvas.className = "offcanvas offcanvas-end text-bg-dark";
    offcanvas.tabIndex = -1;
    offcanvas.id = "offcanvasDarkNavbar";
    offcanvas.setAttribute("aria-labelledby", "offcanvasDarkNavbarLabel");

    const offcanvasHeader = document.createElement("div");
    offcanvasHeader.className = "offcanvas-header";

    const offcanvasTitle = document.createElement("h5");
    offcanvasTitle.className = "offcanvas-title";
    offcanvasTitle.id = "offcanvasDarkNavbarLabel";
    offcanvasTitle.textContent = "Menu";

    const closeButton = document.createElement("button");
    closeButton.type = "button";
    closeButton.className = "btn-close btn-close-white";
    closeButton.setAttribute("data-bs-dismiss", "offcanvas");
    closeButton.setAttribute("aria-label", "Close");

    offcanvasHeader.appendChild(offcanvasTitle);
    offcanvasHeader.appendChild(closeButton);

    const offcanvasBody = document.createElement("div");
    offcanvasBody.className = "offcanvas-body";

    const navList1 = createNavList("Inicio", "../../../src/Inicio/InicioPagina/index.html");
    const navListClients = createDropdown("Clientes", [
        { text: "Agregar Cliente", href: "../../../src/Clientes/NuevoCliente/NuevoCliente.html" },
        { text: "Administrar Clientes", href: "../../../src/Clientes/AdministrarClientes/AdministrarClientes.html" },
        { text: "Editar Clientes", href: "../../../src/Clientes/EditarClientes/EditarClientes.html" },
        { text: "Papelera Clientes", href: "../../../src/Clientes/PapeleraClientes/PapeleraClientes.html" }
    ]);
    const navListRemitos = createDropdown("Remitos", [
        { text: "Nuevo Remito", href: "../../../src/Remitos/NuevoRemito/NuevoRemito.html" },
        { text: "Administrar Remitos", href: "../../../src/Remitos/AdministrarRemitos/AdministrarRemitos.html" }
    ]);
    const navListConfig = createDropdown("Configuraciones",[
        {text: "Mis Datos", href: "../../../src/Config/MisDatos/MisDatos.html"}
    ]);

    offcanvasBody.appendChild(navList1);
    offcanvasBody.appendChild(navListClients);
    offcanvasBody.appendChild(navListRemitos);
    offcanvasBody.appendChild(navListConfig);

    offcanvas.appendChild(offcanvasHeader);
    offcanvas.appendChild(offcanvasBody);
    container.appendChild(brand);
    container.appendChild(button);
    container.appendChild(offcanvas);
    nav.appendChild(container);

    // Insertar la navbar en el body
    //document.body.innerHTML = "<br>" + document.body.innerHTML; // Espacio en blanco antes
    document.body.prepend(nav); // Agrega la navbar al inicio del body
}

// Función para crear un elemento de lista de navegación simple
function createNavList(name, href) {
    const ul = document.createElement("ul");
    ul.className = "navbar-nav justify-content-end flex-grow-1 pe-3";

    const li = document.createElement("li");
    li.className = "nav-item";

    const a = document.createElement("a");
    a.className = "nav-link";
    a.href = href.toString();
    a.role = "button";
    a.setAttribute("aria-expanded", "false");
    a.textContent = name.toString();

    li.appendChild(a);
    ul.appendChild(li);

    return ul;
}

// Función para crear un dropdown
function createDropdown(title, items) {
    const ul = document.createElement("ul");
    ul.className = "navbar-nav justify-content-end flex-grow-1 pe-3";

    const li = document.createElement("li");
    li.className = "nav-item dropdown";

    const a = document.createElement("a");
    a.className = "nav-link dropdown-toggle";
    a.href = "#";
    a.role = "button";
    a.setAttribute("data-bs-toggle", "dropdown");
    a.setAttribute("aria-expanded", "false");
    a.textContent = title;

    const dropdownMenu = document.createElement("ul");
    dropdownMenu.className = "dropdown-menu dropdown-menu-dark";

    items.forEach(item => {
        const dropdownItem = document.createElement("li");
        const dropdownLink = document.createElement("a");
        dropdownLink.className = "dropdown-item";
        dropdownLink.href = item.href;
        dropdownLink.textContent = item.text;
        dropdownItem.appendChild(dropdownLink);
        dropdownMenu.appendChild(dropdownItem);
    });

    li.appendChild(a);
    li.appendChild(dropdownMenu);
    ul.appendChild(li);

    return ul;
}