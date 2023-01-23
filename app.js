"use strict";

let saldoInput = document.getElementById("saldo-input");
let saldoH1 = document.getElementById("saldo-h1");
let saldoBtn = document.getElementById("saldo-btn");
let iconoSaldo = document.getElementById("icono-saldo");
let seccionSaldo = document.getElementById("seccion-saldo");
let i = 1;
let btnGasto = document.getElementById("btn-gasto");
let seccionGasto = document.getElementById("seccion-gasto");
let gastoInput = document.getElementById("gasto-input");
let montoInput = document.getElementById("monto-input");
let confirmarGasto = document.getElementById("confirmar-gasto");
let body = document.body;
let modoNocturno = document.getElementById("modo-nocturno");

// Activar modo nocturno
modoNocturno.addEventListener("click", activarModo);

function activarModo() {
  document.body.classList.toggle("dark");
}

// Mostrar los menues para ingresar datos
iconoSaldo.addEventListener("click", () => mostrarMenu(seccionSaldo));
btnGasto.addEventListener("click", () => mostrarMenu(seccionGasto));

function mostrarMenu(x) {
  x.style.maxHeight = "200px";
  x.style.padding = "1rem 0.5rem";
  x.style.transition = "0.2s";
}

//Ingresar el saldo inicial a la pagina
saldoBtn.addEventListener("click", ingresarSaldo);

function ingresarSaldo() {
  let monto = saldoInput.value;
  if (isNaN(monto)) {
    alert("solo se pueden ingresar numeros");
    monto = "0.00";
  }
  saldoH1.innerText = `$${monto}`;
  if (saldoInput.value < 0) {
    saldoH1.style.color = "red";
  } else {
    saldoH1.style.color = "green";
  }
  seccionSaldo.style.display = "none";
}

// Restar gastos al saldo inicial
confirmarGasto.addEventListener("click", restarDinero);

function restarDinero() {
  let saldoinicial = saldoInput.value;
  let dineroasacar = montoInput.value;

  saldoH1.innerText = `$${parseInt(saldoinicial) - parseInt(dineroasacar)}`;
  saldoinicial -= dineroasacar;
  saldoInput.value = parseInt(saldoInput.value) - parseInt(montoInput.value);

  if (saldoInput.value < 0) {
    saldoH1.style.color = "red";
  } else {
    saldoH1.style.color = "green";
  }

  // Mostrar el gasto realizado en la pagina
  let gastoDiv = document.createElement("div");
  gastoDiv.classList.add("gasto-realizado");
  let gastoRealizado = document.getElementById("gasto-realizado");
  gastoRealizado.appendChild(gastoDiv);
  let gastodetalles = `<div class="gasto-realizado" id="gasto-${i}">
    <p>${gastoInput.value}</p>
    <div class="monto-icono">
      <p id="valor-${i}">${montoInput.value}</p>
      <a href="#"><i class="bi bi-trash3-fill borrar" id="borrar-${i}"></i></a>
  </div>
</div>`;
  gastoDiv.innerHTML += gastodetalles;

  let borrar = document.querySelector("#borrar-" + i);
  // Conseguir el valor del gasto a borrar
  let resultado = document.getElementById("gasto-" + i);
  let resultadop = document.getElementById("valor-" + i);
  let resultadoValor = resultadop.innerText;

  // Borrar el gasto seleccionado de la pagina
  borrar.addEventListener("click", borrarGasto);
  function borrarGasto() {
    gastoRealizado.removeChild(gastoDiv);
    let saldoinicial = saldoInput.value;

    saldoH1.innerText = `$${parseInt(saldoinicial) + parseInt(resultadoValor)}`;
    saldoinicial += dineroasacar;
    saldoInput.value = parseInt(saldoInput.value) + parseInt(resultadoValor);
    if (saldoInput.value < 0) {
      saldoH1.style.color = "red";
    } else {
      saldoH1.style.color = "green";
    }
    i--;
  }
  i++;
}
