const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function resize(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
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

function animate(){

    time += 0.008;

    ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle="#000";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    const cx = canvas.width/2;
    const cy = canvas.height/2;
    const scale = Math.min(canvas.width, canvas.height) / 900;

    // Gentle breathing
    const beat = 1 + Math.sin(time*1.2)*0.03;

    ctx.save();

    ctx.translate(cx,cy);

    // Slow rotation
    ctx.rotate(Math.sin(time*0.5)*0.08);

    ctx.translate(-cx,-cy);

    words.forEach((item,index)=>{

        const t = item.t + time*0.05;

        let x = 16*Math.pow(Math.sin(t),3);
        let y =
            13*Math.cos(t)
            -5*Math.cos(2*t)
            -2*Math.cos(3*t)
            -Math.cos(4*t);

        x *= 20 * beat * scale;
        y *= 20 * beat * scale;

        const floatX = Math.sin(time * 0.8) * 4 * scale;
        const floatY = Math.cos(time * 0.8) * 6 * scale;

        const px = cx + x + floatX;
        const py = cy - y + floatY;

        const glow = 6 + Math.sin(time * 1.5 + index * 0.2) * 4;

        ctx.shadowBlur = glow;
        ctx.shadowColor = "#ff4d88";

        const alpha = 0.65 + Math.sin(time * 1.4 + index * 0.2) * 0.25;
        ctx.fillStyle = `rgba(255,209,220,${alpha})`;

        const fontSize = Math.max(14, Math.min(24, 20 * scale));
        ctx.font = `${fontSize}px Arial`;

        ctx.fillText(item.text,px,py);

    });

    ctx.restore();

    requestAnimationFrame(animate);
}

animate();
