const {
    CML
} = require("./myMathMethods");
const {
    showMatx
} = require("./myMathMethods");
const {
    createInput
} = require("./myMathMethods");

let A = [
    [2, 0, 1],
    [0, 1, -1],
    [1, -1, 2]
];
let b = [1, 2, -2];

// let A = [
//         [5, 1, 1],
//         [1, 5, 1],
//         [1, 1, 5]
//     ],
//     b = [7, 7, 7];

let inputVar = createInput(A, b, 0.01, [0, 0, 0]);


function createNowStep(x) {
let xi = CML.anySum(CML.matxAndVectorMultiply(inputVar.A, x),
    CML.constMultiply(-1, inputVar.b));

    if( CML.getNorm(xi) === 0) {
        return {
            xi: xi,
            x: x
        };
    }

let T = CML.scalarMultiply(
        CML.matxAndVectorMultiply(inputVar.A, xi),
        xi
    ) /
    CML.scalarMultiply(
        CML.matxAndVectorMultiply(inputVar.A, xi),
        CML.matxAndVectorMultiply(inputVar.A, xi)
    );



return {
    xi: xi,
    T: T,
    x: CML.anySum(
        x,
        CML.constMultiply(-T, xi)
    )
};
}
let mnv = {
    now: createNowStep(inputVar.x)
};



let stepcount = 0;

while (CML.getNorm(mnv.now.xi) > inputVar.eps && CML.getNorm(mnv.now.xi) < 20) {
    stepcount ++;
    mnv.last = Object.assign({}, mnv.now);
    
    mnv.now = createNowStep(mnv.last.x);
    if(stepcount){
    console.log(`step ${stepcount}:\n` +
 `    xi   = ${mnv.now.xi}\n` +
 `  ||xi|| = ${CML.getNorm(mnv.now.xi)}\n` +
 `    x    = ${mnv.now.x}`);
    }
}
console.log(`\n/=ansver=\\\nx = [${mnv.now.x}]\n\\========/`);

console.log('[' + CML.matxAndVectorMultiply(inputVar.A , mnv.now.x) + '] ~ [' + inputVar.b + ']');

//showMatx(CML.createE(inputVar.A),'E');