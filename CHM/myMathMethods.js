/*let myMath = {
    //return first + second as typeof(first and second)
    anySum: function(first,second) {
        if(typeof(first) === 'number') return  first + second;
            return first.map((item, index) => this.anySum(item,second[index]));
    },
    //return mul * target as typeof(target)
    constMultiply: function(mul,target) {
        if(typeof(target) === 'number') return  mul * target;
        return target.map(item => this.constMultiply(mul,item));
    },
    //return left * right as typeof(matx)
    matxMultiply: function(left,right) {
        return left.map((item, index) => { 
                let ind = index;
                return item.map((item,index) => this.scalarMultiply(this.getRow(ind, left), this.getRow(index, right)));
            });
    },
    //return matrix row as [] (index, matrix)
    getRow: function(ind,matx) {
        //console.log(matx[ind]);
        return matx[ind];
        
    },
    //return matrix col as [] (index, matrix)
    getCol: function(ind,matx) {
        //console.log(matx.map(item => item[ind]));
        return matx.map(item => item[ind]);
    },
    //return scalar multiply as number
    scalarMultiply: function(left,right) {
        //console.log(left.reduce((result, item , index) => result + item * right[index], 0));
        return left.reduce((result, item , index) => result + item * right[index], 0);
    },
    //return vector of result as []
    matxAndVectorMultiply: function(left,right) {
        let func;
        if(typeof(left[0]) === 'number'){
            func = this.getCol;
        } else { 
            func = this.getRow;
            let swapVar = left;
            left = right;
            right = swapVar;
        }
        return left.map((item, index) => this.scalarMultiply(left, func(index, right)));
    },
    // find rev matx as Gauss-Jordan method
    reverseMatx: function(matx){
        let forw = matx.map((item) => item.map((item) => item));
        let rev = this.createE(matx);
        //console.log(forw.length); 
        for(let i = 0; i < forw.length; i++){
            let den = forw[i][i];
           // console.log(den);
            for(let j = 0; j < forw.length; j++){
                forw[i][j] /= den;
                rev[i][j] /= den;
            }
            for(let j = 0; j < forw.length; j++){
                if(j == i) continue;
                let num = forw[j][i];
                for(let k = 0; k < forw.length; k++){
                    forw[j][k] -= (forw[i][k] * num);
                    rev[j][k] -= (rev[i][k] * num);
                }
            }
        }
        return rev; 
    },
    createE: function(matx){
        return matx.map((item, i) => 
                        item.map((item, j) =>{
                            if(i === j) return 1;
                            return 0;
                        })
                    );
    },
    getNorm: function (target) {
        if (typeof (target[0]) === 'number')
            return Math.sqrt(target.reduce((result, item) => result += item * item, 0));

        // let det = 1;
        // // triangle method
        // return det;
    },
    matrixTranspone: function(matx){
        return matx.map((item, i) => 
                        item.map((item, j) =>{
                            return matx[j][i];
                        })
                    );
    }

    
};
*/

let myMathModule = (function () {
    let anySum = function (first, second) {
        if (typeof (first) === 'number') return first + second;
        return first.map((item, index) => anySum(item, second[index]));
    };
    let constMultiply = function (mul, target) {
        if (typeof (target) === 'number') return mul * target;
        return target.map(item => constMultiply(mul, item));
    };
    let matxMultiply = function (left, right) {
        return left.map((item, index) => {
            let ind = index;
            return item.map((item, index) => scalarMultiply(getRow(ind, left), getRow(index, right)));
        });
    };
    let getRow = function (ind, matx) {
        //console.log(matx[ind]);
        return matx[ind];

    };
    let getCol = function (ind, matx) {
        //console.log(matx.map(item => item[ind]));
        return matx.map(item => item[ind]);
    };
    let scalarMultiply = function (left, right) {
        //console.log(left.reduce((result, item , index) => result + item * right[index], 0));
        return left.reduce((result, item, index) => result + item * right[index], 0);
    };
    let matxAndVectorMultiply = function (left, right) {
        let func;
        if (typeof (left[0]) === 'number') {
            func = getCol;
        } else {
            func = getRow;
            let swapVar = left;
            left = right;
            right = swapVar;
        }
        return left.map((item, index) => scalarMultiply(left, func(index, right)));
    };
    let reverseMatx = function (matx) {
        let forw = matx.map((item) => item.map((item) => item));
        let rev = createE(matx);
        //console.log(forw.length); 
        for (let i = 0; i < forw.length; i++) {
            let den = forw[i][i];
            // console.log(den);
            for (let j = 0; j < forw.length; j++) {
                forw[i][j] /= den;
                rev[i][j] /= den;
            }
            for (let j = 0; j < forw.length; j++) {
                if (j == i) continue;
                let num = forw[j][i];
                for (let k = 0; k < forw.length; k++) {
                    forw[j][k] -= (forw[i][k] * num);
                    rev[j][k] -= (rev[i][k] * num);
                }
            }
        }
        return rev;
    };
    let createE = function (matx) {
        return matx.map((item, i) =>
            item.map((item, j) => {
                if (i === j) return 1;
                return 0;
            })
        );
    };
    let getNorm = function (target) {
        if (typeof (target[0]) === 'number')
            return Math.sqrt(target.reduce((result, item) => result += item * item, 0));

        /*let det = 1;
        // triangle method
        return det;*/
    };
    let matrixTranspone = function (matx) {
        return matx.map((item, i) =>
            item.map((item, j) => {
                return matx[j][i];
            })
        );
    };
    return {
        //return first + second as typeof(first and second)
        anySum: anySum,
        //return mul * target as typeof(target)
        constMultiply: constMultiply,
        //return left * right as typeof(matx)
        matxMultiply: matxMultiply,
        //return scalar multiply as number
        scalarMultiply: scalarMultiply,
        //return vector of result as []
        matxAndVectorMultiply: matxAndVectorMultiply,
        // find rev matx as Gauss-Jordan method
        reverseMatx: reverseMatx,
        createE: createE,
        getNorm: getNorm,
        matrixTranspone: matrixTranspone,
    };
}());

function showMatx(matx, name) {
    console.log(`\n/====${name}====\\`);
    matx.forEach((item) => console.log(item));
    console.log(`\\====${name}====/`);
}

function createInput(A = [1], b = [1], eps = 0.001, x = 0) {

    return {
        A: A,
        b: b,
        eps: eps,
        x: x
    };
}

//Debug
let a = [
    [1, 0, 0, 0],
    [1, 1, 0, 0],
    [1, 1, 1, 0],
    [1, 1, 1, 1]
];

let b = [
    [1, 0, 0, 0],
    [0, 2, 0, 0],
    [0, 0, 3, 0],
    [0, 0, 0, 4]
];

let c = 20;

let d = [2, 5, 8, 5];

let E = [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1]
];

let test = [
    [1, 0, 0],
    [2, 3, 0],
    [4, 5, 6]
];

//console.log(myMath.reverseMatx(test));

//showMatx( myMath.matrixTranspone(test),'testTranspone');
exports.CML = myMathModule;
exports.showMatx = showMatx;
exports.createInput = createInput;

/** target.forEach((item, i) => {
            let den = target[i][i];
            console.log(B);
            det*= den;
            item.forEach((item, j) => {
                target[i][j] /= den;
                console.log(B);
            });
            target.forEach((item, j) => {
                if(j != i){
                    let num = target[j][i];
                    item.forEach((item, k) => {
                        target[j][k] -= target[i][k] * num;
                    });
                }
            });
        });*/