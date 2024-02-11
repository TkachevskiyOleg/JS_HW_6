function checkInput(event) {
    let inputText = event.target.value;

    let sanitizedText = inputText.replace(/\d/g, '');

    event.target.value = sanitizedText;
}

function openModal() {
    document.getElementById('modal').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

function moveBall(event) {
    const soccerBall = document.getElementById('soccerBall');
    const fieldRect = document.getElementById('soccerField').getBoundingClientRect();

    const mouseX = event.clientX - fieldRect.left;
    const mouseY = event.clientY - fieldRect.top;

    const ballX = mouseX - soccerBall.clientWidth / 2;
    const ballY = mouseY - soccerBall.clientHeight / 2;

    const maxX = fieldRect.width - soccerBall.clientWidth;
    const maxY = fieldRect.height - soccerBall.clientHeight;

    const finalX = Math.max(0, Math.min(ballX, maxX));
    const finalY = Math.max(0, Math.min(ballY, maxY));

    soccerBall.style.transform = `translate(${finalX}px, ${finalY}px)`;
}

const lights = ['red', 'yellow', 'green'];
let currentLightIndex = 0;

function changeColor() {
    for (let i = 0; i < lights.length; i++) {
        const light = document.getElementById(lights[i]);
        if (i === currentLightIndex) {
            light.style.backgroundColor = lights[i];
        } else {
            light.style.backgroundColor = 'gray';
        }
    }

    currentLightIndex = (currentLightIndex + 1) % lights.length;
}

function OrangeColor(element) {
    let status = element.classList.contains('orange');

    document.querySelectorAll('ul li').forEach(function (item) 
    {
        item.classList.remove('orange');
    });

    if (!status) 
    {
        element.classList.add('orange');
    }
}

function showMess(element, text) {
    let mess = document.createElement('div');
    mess.className = 'mess';
    mess.innerHTML = text;

    let rect = element.getBoundingClientRect();
    let topPosition = rect.top - mess.offsetHeight - 5;

    if (topPosition < 15) {
        topPosition = rect.bottom + 5;
    }

    mess.style.left = rect.left + 'px';
    mess.style.top = topPosition + 'px';

    document.body.appendChild(mess);

    element.addEventListener('mouseout', function () {
        mess.remove();
    });
}

document.addEventListener('DOMContentLoaded', function () {
    let folders = document.querySelectorAll('.folder');

    folders.forEach(function (folder) {
        folder.addEventListener('click', function (event) {
            if (event.target === this) {
                event.stopPropagation();
                this.classList.toggle('collapsed');
            }
        });
    });
});

let resizableBlock = document.getElementById('resizableBlock');
let resizeHandle = document.getElementById('resizeHandle');
let isResizing = false;
let originalX;
let originalY;

resizeHandle.addEventListener('mousedown', function (e) {
    e.preventDefault();
    isResizing = true;
    originalX = e.clientX;
    originalY = e.clientY;
});

document.addEventListener('mousemove', function (e) {
    if (!isResizing) return;

    let width = e.clientX - resizableBlock.getBoundingClientRect().left - 16;
    let height = e.clientY - resizableBlock.getBoundingClientRect().top - 16;

    resizableBlock.style.width = `${width}px`;
    resizableBlock.style.height = `${height}px`;

    originalX = e.clientX;
    originalY = e.clientY;
});

document.addEventListener('mouseup', function () {
    isResizing = false;
});