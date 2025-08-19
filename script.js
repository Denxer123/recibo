const URLfake = 'https://denxer123.github.io/recibo/index.html?client_name=Denser%20Medina%20Cerron&phone_1=971393955&phone_2=921902622&receipt_date=08%2F18%2F2025%2021%3A30%3A45&numTicket=11482&total=450&advance=100&company_name=Celular%20Seguro&company_phones=971393955%20-%20921902622&company_description=Servicio%20tecnico%20en%20Celulares%2C%20Tabletes%2C%20Laptops%2C%20Impresoras&company_address=Av.%20Giraldez%20212%20-%202do%20Piso%20Oficina%202&company_horary=Lunes%2C%20Martes%2C%20Jueves%2C%20S%C3%A1bado%0A8%3A00%20am%20-%207%3A00%20pm%0A%0AMi%C3%A9rcoles%2C%20Viernes%0A8%3A00%20am%20-%205%3A00%20pm&company_technician=Denser%20Medina&company_symbol=s%2F.&company_clauses=-%20Todo%20equipo%20se%20devolver%C3%A1%20solo%20con%20su%20respectivo%20recibo%20o%20DNI.%0A-%20Las%20garant%C3%ADas%20de%20pantallas%20es%20de%201%20mes%2C%20solo%20en%20altas%20calidad%2C%20otras%20calidades%20no%20tienen%20garant%C3%ADas.%0A-%20No%20se%20responde%20a%20las%20garant%C3%ADas%20por%20da%C3%B1ar%20el%20sello%20de%20seguridad%20o%20da%C3%B1os%20ocasionados%20por%20el%20cliente%20como%20ca%C3%ADdas%2C%20golpes%2C%20da%C3%B1os%20por%20agua%2C%20humedad%2C%20mala%20manipulaci%C3%B3n%2C%20etc.%0A-%20Todo%20equipo%20que%20no%20se%20recoja%20dentro%20de%20los%2015%20d%C3%ADas%20h%C3%A1biles%2C%20despu%C3%A9s%20de%20ser%20notificado%2C%20no%20tiene%20derecho%20a%20reclamos%20por%20el%20equipo.&equipments=%5B%7B%22device%22%3A%22%20Samsung%20A10%22%2C%22repairs%22%3A%20%5B%7B%22repairDetail%22%3A%22Falla%20de%20tactil%22%2C%22price%22%3A%20100%7D%20%2C%20%7B%22repairDetail%22%3A%22Reparacion%20Placa%22%2C%22price%22%3A%2050%7D%20%2C%20%7B%22repairDetail%22%3A%22conector%20FPC%22%2C%22price%22%3A%20100%7D%5D%7D%20%2C%20%7B%22device%22%3A%22%20Samsung%20A13%22%2C%22repairs%22%3A%20%5B%7B%22repairDetail%22%3A%22Reparacion%20Placa%22%2C%22price%22%3A%20100%7D%20%2C%20%7B%22repairDetail%22%3A%22Falla%20de%20tactil%22%2C%22price%22%3A%20100%7D%5D%7D%5D'


const url = new URL(URLfake);
const params = new URLSearchParams(url.search);

//const params = new URLSearchParams(window.location.search);
// const params = new URLSearchParams(window.location.search);

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

// --- Equipos (único campo que sí es JSON) ---
const equipments = JSON.parse(params.get("equipments"));
const tbody = document.getElementById("equipments-table");

equipments.forEach(eq => {
  const repairCount = eq.repairs.length;
  const tr = document.createElement("tr");

  // Equipo
  const tdEquipo = document.createElement("td");
  tdEquipo.textContent = eq.device;
  tdEquipo.rowSpan = repairCount;
  tdEquipo.style.verticalAlign = "middle";
  tr.appendChild(tdEquipo);

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
  tr.appendChild(tdObs);

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

// Cuando todo el documento se haya cargado
window.onload = function () {
  // Aquí ya llenas tus datos normalmente...
  // Por ejemplo: document.getElementById("company-name").textContent = "Mi Empresa";

  // Y al final abres automáticamente la ventana de impresión
  //window.print();
};

