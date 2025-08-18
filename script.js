const params = new URLSearchParams(window.location.search);

// --- Empresa ---
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
window.onload = function() {
  // Aquí ya llenas tus datos normalmente...
  // Por ejemplo: document.getElementById("company-name").textContent = "Mi Empresa";

  // Y al final abres automáticamente la ventana de impresión
  window.print();
};

