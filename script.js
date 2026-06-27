let mouse={
    x:null,
    y:null
};
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

class Particle{
    constructor(){
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;

        this.size = Math.random() * 3 + 1;

        this.speedX = (Math.random() - 0.7) * 1;
        this.speedY = (Math.random() - 0.1) * 1;
    }

    update(){
        //Particle movement
        this.x += this.speedX;
        this.y += this.speedY;

        if(this.x < 0 || this.x > canvas.width)
            this.speedX *= -1;

        if(this.y < 0 || this.y > canvas.height)
            this.speedY *= -1;
        
        //lines connecting the particles
        const dx=this.x-mouse.x;
        const dy=this.y-mouse.y;

        const distance=Math.sqrt(dx*dx+dy*dy);

        if(distance<150){

            this.x+=dx*0.02;
            this.y+=dy*0.02;
        }
    }

    draw(){
        ctx.fillStyle = "#d4af37";
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
        ctx.fill();
    }
}

for(let i=0;i<100;i++){
    particles.push(new Particle());
}

function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    particles.forEach(p=>{
        p.update();
        p.draw();
    });
    for(let i=0;i<particles.length;i++){

    for(let j=i+1;j<particles.length;j++){

        const dx=particles[i].x-particles[j].x;
        const dy=particles[i].y-particles[j].y;

        const distance=Math.sqrt(dx*dx+dy*dy);

        if(distance<120){

            ctx.beginPath();

            ctx.moveTo(
                particles[i].x,
                particles[i].y
            );

            ctx.lineTo(
                particles[j].x,
                particles[j].y
            );

            ctx.strokeStyle=
            "rgba(212,175,55,0.12)";

            ctx.stroke();

        }

    }

}

    requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize",()=>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
window.addEventListener("mousemove",(e)=>{
    mouse.x=e.x;
    mouse.y=e.y;
});
