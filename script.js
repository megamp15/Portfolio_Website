// Function that filters projects based on class names
function filterSelection(n) {
    let x = document.getElementsByClassName('proj');
    let b = document.getElementsByClassName('btn');

    for (let i = 0; i < b.length; i++) {
        if (b[i].classList.contains(n)) {
            b[i].classList.add('my-active')
        }
        else {
            b[i].classList.remove('my-active')
        }
    }
    if (n == 'all') n = 'proj';

    for (let i = 0; i < x.length; i++) {
        if (!x[i].classList.contains(n)) {
            x[i].classList.add('d-none')
        }
        else {
            x[i].classList.remove('d-none')
        }
    }
}

function updateURL() {
    history.pushState('', '', '/')
}

// Particle JS Effect by Frank's Laboratory - https://www.youtube.com/watch?v=d620nV6bp0A&t=1026s
// Edited to create background of homepage

const canvas = document.getElementById("canvas")
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

//Create particle
class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionY = directionY
        this.directionX = directionX
        this.size = size;
        this.color = color;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = '#eeeeee';
        ctx.fill();
    }

    // Check particle position, move the particle, draw the particle
    update() {
        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }

        //move particle
        this.x += this.directionX;
        this.y += this.directionY;
        // draw particle
        this.draw()
    }
}

// create particle array
function init() {
    particlesArray = []
    let numberofParticles = (canvas.height * canvas.width) / 10000;
    for (let i = 0; i < numberofParticles; i++) {
        let size = (Math.random() * 5) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2)
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2)
        let directionX = (Math.random() * 1) - 0.5;
        let directionY = (Math.random() * 1) - 0.5;
        let color = '#eeeeee';

        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

function connect() {
    let opacityValue = 1;

    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) +
                ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
            if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                opacityValue = 1 - (distance / 20000);
                ctx.strokeStyle = 'rgba(31,80,64,' + opacityValue + ')';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

//animation loop
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update()
    }
    connect();
}

window.addEventListener('resize',
    function () {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        init();
    }
);

init()
animate()
