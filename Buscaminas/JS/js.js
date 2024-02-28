let filas = 5;
let columnas = 5;
const probabilidadDeUno = 0.1;
const matriz = [];
let juegoActivo = true;

// Generar una posición aleatoria para colocar una mina
const filaConUnUno = Math.floor(Math.random() * filas);
const columnaConUnUno = Math.floor(Math.random() * columnas);

const contenedorTabla = document.getElementById('contenedorTabla');
contenedorTabla.addEventListener('contextmenu', function (event) {
  event.preventDefault();
});



function generarMatriz() {
  for (let i = 0; i < filas; i++) {
    let fila = [];
    for (let j = 0; j < columnas; j++) {
      if (i === filaConUnUno && j === columnaConUnUno) {
        fila.push({ valor: 1, mostrado: false, marcada: false });
      } else {
        const valor = Math.random() < probabilidadDeUno ? 1 : 0;
        fila.push({ valor, mostrado: false, marcada: false });
      }
    }
    matriz.push(fila);
  }
}

function renderizarTablero() {
  const contenedorTabla = document.getElementById('contenedorTabla');
  const tabla = document.createElement('table');

  for (let i = 0; i < filas; i++) {
    const fila = document.createElement('tr');
    for (let j = 0; j < columnas; j++) {
      const celda = document.createElement('td');
      celda.dataset.fila = i;
      celda.dataset.columna = j;
      celda.style.width = '32px';
      celda.style.height = '32px';
      celda.style.backgroundImage = "url('/Buscaminas/IMG/hide.png')";
      celda.style.backgroundSize = 'cover';
      celda.addEventListener('click', mostrarMensaje);
      celda.addEventListener('contextmenu', marcarCasilla);
      fila.appendChild(celda);
    }
    tabla.appendChild(fila);
  }
  contenedorTabla.appendChild(tabla);
}

function mostrarMensaje(event) {
  if (!juegoActivo) return;

  const fila = parseInt(event.target.dataset.fila, 10);
  const columna = parseInt(event.target.dataset.columna, 10);
  const celda = matriz[fila][columna];

  if (!celda.mostrado && !celda.marcada) {
    celda.mostrado = true;

    if (celda.valor === 1) {
      event.target.style.backgroundImage = "url('/Buscaminas/IMG/mine.png')";
      juegoActivo = false;
    } else {
      const minesCount = detectMines(fila, columna);
      event.target.style.backgroundImage = `url('/Buscaminas/IMG/${minesCount}.png')`;
    }

    if (endGame()) {
      alert('¡Has ganado el juego!');
    }
  }
}

function marcarCasilla(event) {
  event.preventDefault();

  const fila = event.target.dataset.fila;
  const columna = event.target.dataset.columna;
  const celda = matriz[fila][columna];

  if (!celda.mostrado) {
    if (!celda.marcada) {
      event.target.style.backgroundImage = "url('/Buscaminas/IMG/bandera.png')";
      celda.marcada = true;
    } else {
      event.target.style.backgroundImage = "url('/Buscaminas/IMG/hide.png')";
      celda.marcada = false;
    }
  }
}

function reloadPage() {
  const valorFxC = parseInt(document.getElementById("selectionPanel").value, 10);

  filas = valorFxC;
  columnas = valorFxC;

  matriz.length = 0;
  generarMatriz();

  const contenedorTabla = document.getElementById('contenedorTabla');
  contenedorTabla.innerHTML = '';
  juegoActivo = true;
  renderizarTablero();
}
function detectMines(fila, columna) {
  let count = 0;

  for (let i = Math.max(0, fila - 1); i <= Math.min(filas - 1, fila + 1); i++) {
    for (let j = Math.max(0, columna - 1); j <= Math.min(columnas - 1, columna + 1); j++) {
      if (matriz[i][j].valor === 1) {
        count++;
      }
    }
  }

  return count;
}

function endGame() {
  let todasMinasMarcadas = true;
  let todasCasillasNoMinaMostradas = true;

  for (let i = 0; i < filas; i++) {
    for (let j = 0; j < columnas; j++) {
      const celda = matriz[i][j];

      if (celda.valor === 1) {
        if (!celda.marcada) {
          todasMinasMarcadas = false;
          break;
        }
      } else {
        if (!celda.mostrado) {
          todasCasillasNoMinaMostradas = false;
          break;
        }
      }
    }
  }

  return todasMinasMarcadas && todasCasillasNoMinaMostradas;
}



generarMatriz();
renderizarTablero();