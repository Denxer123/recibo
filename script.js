const params = new URLSearchParams(window.location.search);
const data = JSON.parse(params.get("data"));

// --- Empresa ---
document.getElementById("company-name").textContent = data.company.name;
document.getElementById("company-description").textContent = data.company.description;
document.getElementById("company-phones").textContent = data.company.phones;
document.getElementById("company-address").textContent = data.company.address;
document.getElementById("responsible-technician").textContent = data.company.ResponsibleTechnician;
document.getElementById("company-clauses").textContent = data.company.Clauses;
document.getElementById("company-horary").textContent = data.company.Horary;

// --- Cliente y ticket ---
document.getElementById("client-name").textContent = data.client_name;
document.getElementById("client-phone").textContent = data.phone_2 
  ? `${data.phone_1} / ${data.phone_2}` 
  : data.phone_1;
document.getElementById("receipt-date").textContent = data.receipt_date;
document.getElementById("num-ticket").textContent = data.numTicket;

// --- Totales ---
document.getElementById("total").textContent = `${data.company.CurrencySymbol} ${data.total}`;
document.getElementById("advance").textContent = `${data.company.CurrencySymbol} ${data.advance}`;
const rest = Number(data.total) - Number(data.advance);
document.getElementById("rest").textContent = `${data.company.CurrencySymbol} ${rest}`;

// --- Equipos ---
const equipments = JSON.parse(data.equipments);
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
  tdPrice.textContent = `${data.company.CurrencySymbol} ${eq.repairs[0].price}`;
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
    tdPriceExtra.textContent = `${data.company.CurrencySymbol} ${eq.repairs[i].price}`;
    trRepair.appendChild(tdPriceExtra);

    tbody.appendChild(trRepair);
  }
});
