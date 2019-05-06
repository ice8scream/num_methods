function equality(x, alpha) {
    return Math.sin(x) - alpha * x;
}



//console.log(Math.sin(Math.PI));

// for(let i = 1; i>0; i-=0.001){
//     if(equality(0.001, i) > 0){
//         console.log(`Gotcha!!! ${i}`);
//         break;
//     }
//     console.log(`no ${i}`);
// }

// for(let i = -0.22; i<0; i+=0.0001){
//     if(equality(Math.PI * 3 / 2, i) < 0){
//         console.log(`Gotcha!!! ${i}`);
//         break;
//     }
//     console.log(`no ${i}`);
// }

// X > 1, X < -2.10 ~ 1 solve
let eps = 0.01,
    alpha = 0.5;

let segment = {
    start: -Math.PI * 2 + 0.1,
    end: Math.PI * 2,
    length: function(){
        return this.end - this.start;
    },
    breakPoint: function(){
        return (this.end + this.start) / 2;
    }
}

//console.log(segment.breakPoint());

function searchSolve(seg){
    console.log(`[${seg.start} - ${seg.end}]`);
    if(seg.length() < eps) return seg.breakPoint();
    let c = seg.breakPoint();
    if(equality(seg.start, alpha) * equality(c, alpha) < 0){
        seg.end = c;
    } else {
        seg.start = c;
    }
    
    return searchSolve(seg);
}

console.log(searchSolve(segment));

console.log(equality(searchSolve(segment), 0.5))