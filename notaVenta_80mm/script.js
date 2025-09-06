// Pasar Datos localmente

// const URLfake = 'https://denxer123.github.io/recibo/index.html?client_name=Max%20Yalllico%20Camarena&phone_1=942491316&phone_2=&receipt_date=08%2F25%2F2025%2011%3A00%3A30&numTicket=11515&total=130&advance=0&company_name=Celular%20Seguro&company_phones=971393955%20-%20921902622&company_description=Servicio%20tecnico%20en%20Celulares%2C%20Tabletes%2C%20Laptops%2C%20Impresoras&company_address=A%20partir%20de%2020%20de%20Setiembre%20encu%C3%A9ntranos%20en%3A%20%0AAv.%20Gir%C3%A1ldez%20386%20(Antes%20del%20puente%20Giraldez%2C%20frente%20del%20Grifo)&company_horary=Lunes%2C%20Martes%2C%20Jueves%2C%20S%C3%A1bado%0A8%3A00%20am%20-%207%3A00%20pm%0A%0AMi%C3%A9rcoles%2C%20Viernes%0A8%3A00%20am%20-%205%3A00%20pm&company_technician=Denser%20Medina&company_symbol=s%2F.&company_clauses=-%20Todo%20equipo%20se%20devolver%C3%A1%20solo%20con%20su%20respectivo%20recibo%20o%20DNI.%0A-%20Las%20garant%C3%ADas%20de%20pantallas%20es%20de%201%20mes%2C%20solo%20en%20altas%20calidad%2C%20otras%20calidades%20no%20tienen%20garant%C3%ADas.%0A-%20No%20se%20responde%20a%20las%20garant%C3%ADas%20por%20da%C3%B1ar%20el%20sello%20de%20seguridad%20o%20da%C3%B1os%20ocasionados%20por%20el%20cliente%20como%20ca%C3%ADdas%2C%20golpes%2C%20da%C3%B1os%20por%20agua%2C%20humedad%2C%20mala%20manipulaci%C3%B3n%2C%20etc.%0A-%20Todo%20equipo%20que%20no%20se%20recoja%20dentro%20de%20los%2015%20d%C3%ADas%20h%C3%A1biles%2C%20despu%C3%A9s%20de%20ser%20notificado%2C%20no%20tiene%20derecho%20a%20reclamos%20por%20el%20equipo.&equipments=%5B%7B%22device%22%3A%22%20Xiaomi%20Mi%2010T%20Pro%22%2C%22repairs%22%3A%20%5B%7B%22repairDetail%22%3A%22Cambio%20pantalla%22%2C%22price%22%3A%20105%7D%20%2C%20%7B%22repairDetail%22%3A%22Falla%20de%20Sonido%22%2C%22price%22%3A%200%7D%20%2C%20%7B%22repairDetail%22%3A%22Linterna%20no%20prende%22%2C%22price%22%3A%200%7D%20%2C%20%7B%22repairDetail%22%3A%22Tarjeta%20de%20carga%22%2C%22price%22%3A%200%7D%20%2C%20%7B%22repairDetail%22%3A%22Cambio%20tapa%22%2C%22price%22%3A%2025%7D%5D%7D%5D'

// const url = new URL(URLfake);
// const params = new URLSearchParams(url.search);


const params = new URLSearchParams(window.location.search);

// --- Empresa ---
document.getElementById("company-name").textContent = params.get("company_name");
document.getElementById("company-description").textContent = params.get("company_description");
document.getElementById("company-phones").textContent = params.get("company_phones");
document.getElementById("company-address").textContent = params.get("company_address");
document.getElementById("responsible-technician").textContent = params.get("company_technician");
document.getElementById("company-clauses").textContent = params.get("company_clauses");
document.getElementById("company-horary").textContent = params.get("company_horary");

// --- Cliente y ticket ---
document.getElementById("client-name").textContent = params.get("client_name");
const phone1 = params.get("phone_1");
const phone2 = params.get("phone_2");
document.getElementById("client-phone").textContent = phone2 ? `${phone1} / ${phone2}` : phone1;
document.getElementById("receipt-date").textContent = params.get("receipt_date");
document.getElementById("num-ticket").textContent = params.get("numTicket");

// --- Totales ---
const currency = params.get("company_symbol");
const total = Number(params.get("total") || 0);
const advance = Number(params.get("advance") || 0);
const rest = total - advance;

document.getElementById("total").textContent = `${currency} ${total}`;
document.getElementById("advance").textContent = `${currency} ${advance}`;
document.getElementById("rest").textContent = `${currency} ${rest}`;

// --- Equipos (único campo JSON) ---
const equipments = JSON.parse(params.get("equipments"));
const tbody = document.getElementById("equipments-table");

equipments.forEach(eq => {
    const repairCount = eq.repairs.length;
    const trDevice = document.createElement("tr");
    const tr = document.createElement("tr");
    const trObs = document.createElement("tr");
    // const th = document.createElement("th");

    // Equipo
    const tdEquipo = document.createElement("th");
    tdEquipo.textContent = eq.device;
    tdEquipo.colSpan = 2;
    tdEquipo.className = "device-row";
    trDevice.appendChild(tdEquipo);
    document.getElementById("equipments-table").appendChild(tdEquipo);

    // Primera reparación
    const tdRepair = document.createElement("td");
    tdRepair.textContent = eq.repairs[0].repairDetail;
    tr.appendChild(tdRepair);

    const tdPrice = document.createElement("td");
    tdPrice.textContent = `${currency} ${eq.repairs[0].price}`;
    tr.appendChild(tdPrice);

    // Observaciones
    const tdObs = document.createElement("td");
    tdObs.textContent = eq.observations || "";
    tdObs.rowSpan = repairCount;
    tdObs.style.verticalAlign = "middle";
    trObs.appendChild(tdObs);

    tbody.appendChild(tr);

    // Reparaciones extra
    for (let i = 1; i < repairCount; i++) {
        const trRepair = document.createElement("tr");

        const tdRepairExtra = document.createElement("td");
        tdRepairExtra.textContent = eq.repairs[i].repairDetail;
        trRepair.appendChild(tdRepairExtra);

        const tdPriceExtra = document.createElement("td");
        tdPriceExtra.textContent = `${currency} ${eq.repairs[i].price}`;
        trRepair.appendChild(tdPriceExtra);

        tbody.appendChild(trRepair);
    }
});

// Imprimir automáticamente
// window.onload = function () {
//     window.print();
//     console.log("cargado el documento desde JS");
// };
