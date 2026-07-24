const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function resize(){
    const size = Math.min(window.innerWidth, window.innerHeight) * 0.9;
    canvas.width = size;
    canvas.height = size;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
}

resize();
window.addEventListener("resize", resize);

const words = [];

for(let t=0;t<Math.PI*2;t+=0.08){

    words.push({
        t:t,
        text:"I love you"
    });

}

let time = 0;
let lastTime = 0;

function animate(timestamp = performance.now()){

    if(lastTime === 0){
        lastTime = timestamp;
    }

    const delta = Math.min((timestamp - lastTime) / 1000, 0.05);
    lastTime = timestamp;

    time += delta * 0.72;

    ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle="#000";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    const cx = canvas.width/2;
    const cy = canvas.height/2;
    const scale = Math.min(canvas.width, canvas.height) / 900;

    // Gentle breathing
    const beat = 1 + Math.sin(time*1.6)*0.035;

    ctx.save();

    ctx.translate(cx,cy);

    // Slow rotation
    ctx.rotate(Math.sin(time*0.65)*0.09);

    ctx.translate(-cx,-cy);

    words.forEach((item,index)=>{

        const t = item.t + time*0.07;

        let x = 16*Math.pow(Math.sin(t),3);
        let y =
            13*Math.cos(t)
            -5*Math.cos(2*t)
            -2*Math.cos(3*t)
            -Math.cos(4*t);

        x *= 20 * beat * scale;
        y *= 20 * beat * scale;

        const floatX = Math.sin(time * 1.0) * 4.5 * scale;
        const floatY = Math.cos(time * 1.0) * 6.5 * scale;

        const px = cx + x + floatX;
        const py = cy - y + floatY;

        const glow = 6 + Math.sin(time * 1.8 + index * 0.2) * 4.2;

        ctx.shadowBlur = glow;
        ctx.shadowColor = "#ff4d88";

        const alpha = 0.65 + Math.sin(time * 1.7 + index * 0.2) * 0.25;
        ctx.fillStyle = `rgba(255,209,220,${alpha})`;

        const fontSize = Math.max(14, Math.min(24, 20 * scale));
        ctx.font = `${fontSize}px Arial`;

        ctx.fillText(item.text,px,py);

    });

    ctx.restore();

    requestAnimationFrame(animate);
}

animate(performance.now());
