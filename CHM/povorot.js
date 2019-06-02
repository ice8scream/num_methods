
const {
    CML
} = require("./myMathMethods");

function createRotateMatrix(len,i,j,c,s) {
    let E = CML.createE(len);
    E[i][i] = E[j][j] = c;
    E[i][j] = s;
    E[j][i] = -s;
    return E;
}

function showMatx(matx, name) {
    console.log(`\n/====${name}====\\`);
    matx.forEach((item) => console.log(item));
    console.log(`\\====${name}====/`);
}
function setMax(val, i, j) {
    return {
        value: val,
        i: i,
        j: j
    };
}

let getMaxCell = (B) => {
    let a = setMax(B[1][0], 1, 0);
    for(let i = 0; i < B.length; i++) {
        for(let j = 0; j < i; j++) {
            if(a.value < B[i][j]) {
                a = setMax(B[i][j], i, j);
            } 
        }    
    }
    
    return a;
};

let eps = 0.1;

let A = [
    [1, 1, 3],
    [1, 5, 1],
    [3, 1, 1]
];

let B = A.map(row => row.map(cel => cel));

let stop = false;
let step = 0;
let rotateHub = CML.createE(A);
while (stop === false) {
    step++;
    console.log('\n//========================== Step ' + step + ' ===');
    let A = B.map(row => row.map(cel => cel));
    B = A.map(row => row.map(cel => '*'));
    showMatx(A, '#');
    let a  = getMaxCell(A);
    console.log('\n' + JSON.stringify(a));
    
    let i = a.i,
        j = a.j;
    
    let p = 2 * a.value,
        q = A[i][i] - A[j][j];
    let d = Math.sqrt(p*p + q*q);
    let c, s;
    
    if(q === 0){
        c = s = Math.sqrt(2) / 2;
    }else {
        let R = Math.abs(q) / (2 * d);
        c = Math.sqrt(0.5 + R);
        s = Math.sqrt(0.5 - R) * (Math.sign(p*q) || 1);
        if (Math.abs(p) < Math.abs(q)){
            s = Math.abs(p) * (Math.sign(p*q) || 1) / ( 2 * c * d);
        }
    }
    showMatx(createRotateMatrix(A,i,j,c,s), 'rotate matrix');
    rotateHub = CML.matxMultiply(rotateHub, createRotateMatrix(A,i,j,c,s));
//========================== stage 3 ===
    B[i][i] = c*c*A[i][i] + s*s*A[j][j] + 2*c*s*A[i][j];
    B[j][j] = c*c*A[j][j] + s*s*A[i][i] - 2*c*s*A[i][j];
    B[i][j] = B[j][i] = 0;
    
//========================== stage 4 ===
    for(let m = 0; m < A.length; m++){
        if (m === i || m === j){ continue;}
            B[i][m] = B[m][i] = c * A[m][i] + s * A[m][j];
            B[j][m] = B[m][j] = -1 * s * A[m][i] + c * A[m][j];
    }
//========================== stage 5 ===
    for(let i = 0; i < B.length; i++) {
        for(let j = 0; j < B.length; j++) {
            if(B[i][j] === '*'){
                B[i][j] = A[i][j];
            }
        }
    }
    stop = true;
    for(let i = 0; i < B.length; i++) {
        for(let j = 0; j < i; j++) {
            if(B[i][j] > eps){
                stop = false;
                break;
            }
            if(stop === false){
                break;
            }
        }
    }
}

console.log('\n<<========================== Answer ===')
showMatx(B, '#');

    showMatx(rotateHub, 'rotate vectors');
