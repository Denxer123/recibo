const params = new URLSearchParams(window.location.search);
const equipments = JSON.parse(params.get("equipments"));

const tbody = document.getElementById("equipments-table");

equipments.forEach(eq => {
    const repairCount = eq.repairs.length;
    const tr = document.createElement("tr");

    // Celda Equipo
    const tdEquipo = document.createElement("td");
    tdEquipo.textContent = eq.device;
    tdEquipo.rowSpan = repairCount;
    tdEquipo.style.verticalAlign = "middle";
    tdEquipo.style.textAlign = "left";
    tr.appendChild(tdEquipo);

    // Primera reparación
    const tdRepair = document.createElement("td");
    tdRepair.textContent = eq.repairs[0].repairDetail;
    tdRepair.style.verticalAlign = "middle";
    tr.appendChild(tdRepair);

    const tdPrice = document.createElement("td");
    tdPrice.textContent = eq.repairs[0].price;
    tdPrice.style.verticalAlign = "middle";
    tr.appendChild(tdPrice);

    // Observaciones
    const tdObs = document.createElement("td");
    tdObs.textContent = eq.observations || "";
    tdObs.rowSpan = repairCount;
    tdObs.style.verticalAlign = "middle";
    tr.appendChild(tdObs);

    tbody.appendChild(tr);

    // Reparaciones restantes (sin líneas horizontales entre ellas)
    for (let i = 1; i < repairCount; i++) {
    const trRepair = document.createElement("tr");

    const tdRepairExtra = document.createElement("td");
    tdRepairExtra.textContent = eq.repairs[i].repairDetail;
    tdRepairExtra.style.borderTop = "none";
    trRepair.appendChild(tdRepairExtra);

    const tdPriceExtra = document.createElement("td");
    tdPriceExtra.textContent = eq.repairs[i].price;
    tdPriceExtra.style.borderTop = "none";
    trRepair.appendChild(tdPriceExtra);

    tbody.appendChild(trRepair);
    }
});