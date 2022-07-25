const DEFAULT_SIZE = 16;
const DEFAULT_COLOR = '#000000';
const DEFAULT_MODE = 'color';

let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;

const settingsDiv = document.querySelector('.settings');

const grid = document.querySelector('.grid');
grid.style.display = 'grid';
grid.style.width = '600px';
grid.style.height = '600px';

const pageHeader = document.querySelector('.header');
pageHeader.textContent = 'Etch-A-Sketch';
pageHeader.style.display = 'flex';
pageHeader.style.alignItems = 'center';
pageHeader.style.justifyContent = 'center';
pageHeader.style.fontSize = '50px';
pageHeader.style.color = '#FF7300';
pageHeader.style.margin = '50px 0 50px 0';

const settingsHeader = document.createElement('span');
settingsHeader.textContent = 'Settings';
settingsHeader.style.color = '#FF7300';
settingsHeader.style.fontSize = '30px';
settingsHeader.style.marginTop = '10px';

const colorPickers = document.querySelector('.color-pickers');
colorPickers.style.display = 'flex';
colorPickers.style.flexDirection = 'column';

const penPickerContainer = document.querySelector('.pen-picker');
penPickerContainer.style.display = 'flex';

const backgroundPickerContainer = document.querySelector('.background-picker');
backgroundPickerContainer.style.display = 'flex';

const penPicker = document.createElement('input');
penPicker.type = 'color';
penPicker.setAttribute('id', 'penPicker');

const penPickerLabel = document.createElement('label');
penPickerLabel.setAttribute('for', 'penPicker');
penPickerLabel.textContent = 'Pen Color';
penPickerLabel.style.color = '#FF7300';
penPickerLabel.style.paddingTop = '5px';

const backgroundPicker = document.createElement('input');
backgroundPicker.type = 'color';

const backgroundPickerLabel = document.createElement('label');
backgroundPickerLabel.setAttribute('for', 'penPicker');
backgroundPickerLabel.textContent = 'Background Color';
backgroundPickerLabel.style.color = '#FF7300';
backgroundPickerLabel.style.paddingTop = '5px';

const colorButtonContainer = document.querySelector('.color-buttons');
colorButtonContainer.style.display = 'flex';
colorButtonContainer.style.flexDirection = 'column';
colorButtonContainer.style.gap = '10px';

const toggleButtonContainer = document.querySelector('.toggle-buttons');
toggleButtonContainer.style.display = 'flex';
toggleButtonContainer.style.flexDirection = 'column';
toggleButtonContainer.style.gap = '10px';

const toggleRainbow = document.createElement('button');
toggleRainbow.textContent = 'Toggle Rainbow';
toggleRainbow.setAttribute('id', 'btn');

const gridToggleContainer = document.querySelector('.grid-toggles');
gridToggleContainer.style.display = 'flex';
gridToggleContainer.style.flexDirection = 'column';
gridToggleContainer.style.gap = '10px';

const gridSlider = document.createElement('input');
gridSlider.type = 'range';

const clearButton = document.createElement('button');
clearButton.textContent = 'Clear';
clearButton.setAttribute('id', 'btn');

settingsDiv.appendChild(settingsHeader);
settingsDiv.appendChild(colorPickers);
colorPickers.appendChild(penPickerContainer);
colorPickers.appendChild(backgroundPickerContainer);
penPickerContainer.appendChild(penPicker);
penPickerContainer.appendChild(penPickerLabel);
backgroundPickerContainer.appendChild(backgroundPicker);
backgroundPickerContainer.appendChild(backgroundPickerLabel);
settingsDiv.appendChild(colorButtonContainer);
settingsDiv.appendChild(toggleButtonContainer);
toggleButtonContainer.appendChild(toggleRainbow);
settingsDiv.appendChild(gridToggleContainer);
gridToggleContainer.appendChild(gridSlider);
settingsDiv.appendChild(clearButton);

let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

const btn = document.getElementById('btn');

const btns = document.querySelectorAll('button');
btns.forEach(btn => btn.addEventListener('mousedown', function() {
    btn.classList.add('btn-on');  
}));

btns.forEach(btn => btn.addEventListener('mouseup', function() {
  btn.classList.remove('btn-on');
}));

backgroundPicker.addEventListener('input', function() {
  let gridBackground = backgroundPicker.value;
  grid.style.backgroundColor = gridBackground;
});

toggleRainbow.addEventListener('click', function() {
  setCurrentMode('rainbow');
});

penPicker.addEventListener('input', function(e) {
  setCurrentColor(e.target.value);
});

clearButton.addEventListener('click', function() {
  reloadGrid();
})

gridSlider.onchange = (e) => changeSize(e.target.value)

function setCurrentColor(newColor) {
  currentColor = newColor;
}

function setCurrentMode(newMode) {
  currentMode = newMode;
}

function setCurrentSize(newSize) {
  currentSize = newSize
}

function changeSize(value) {
  setCurrentSize(value)
  reloadGrid()
}

function reloadGrid() {
  clearGrid()
  setupGrid(currentSize)
}

function clearGrid() {
  grid.innerHTML = ''
}

function changeColor(e) {
  if (e.type === 'mouseover' && !mouseDown) return
  if (currentMode === 'rainbow') {
    const randomR = Math.floor(Math.random() * 256)
    const randomG = Math.floor(Math.random() * 256)
    const randomB = Math.floor(Math.random() * 256)
    e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`
  } else if (currentMode === 'color') {
    e.target.style.backgroundColor = currentColor
  } else if (currentMode === 'eraser') {
    e.target.style.backgroundColor = '#fefefe'
  }
}

function setupGrid(size) {
  grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;
  grid.style.backgroundColor = 'white';

  for (let i = 0; i < size * size; i++) {
    gridElement = document.createElement('div');
    gridElement.classList.add('grid-element');
    gridElement.style.border = 'none';
    gridElement.addEventListener('mouseover', changeColor)
    gridElement.addEventListener('mousedown', changeColor)
    grid.appendChild(gridElement);
  }
}

setupGrid(DEFAULT_SIZE);