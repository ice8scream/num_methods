let myMath = {
    //return first + second as typeof(first and second)
    anySum: function (first, second) {
        if (typeof (first) === 'number') return first + second;
        return first.map((item, index) => this.anySum(item, second[index]));
    },
    //return mul * target as typeof(target)
    constMultiply: function (mul, target) {
        if (typeof (target) === 'number') return mul * target;
        return target.map(item => this.constMultiply(mul, item));
    },
    //return left * right as typeof(matx)
    matxMultiply: function (left, right) {
        return left.map((item, index) => {
            let ind = index;
            return item.map((item, index) => this.scalarMultiply(this.getRow(ind, left), this.getRow(index, right)));
        });
    },
    //return matrix row as [] (index, matrix)
    getRow: function (ind, matx) {
        //console.log(matx[ind]);
        return matx[ind];

    },
    //return matrix col as [] (index, matrix)
    getCol: function (ind, matx) {
        //console.log(matx.map(item => item[ind]));
        return matx.map(item => item[ind]);
    },
    //return scalar multiply as number
    scalarMultiply: function (left, right) {
        //console.log(left.reduce((result, item , index) => result + item * right[index], 0));
        return left.reduce((result, item, index) => result + item * right[index], 0);
    },
    //return vector of result as []
    matxAndVectorMultiply: function (left, right) {
        let func;
        if (typeof (left[0]) === 'number') {
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
    reverseMatx: function (matx) {
        let forw = matx.map((item) => item.map((item) => item));
        let rev = this.createE(matx);
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
    },
    createE: function (matx) {
        return matx.map((item, i) =>
            item.map((item, j) => {
                if (i === j) return 1;
                return 0;
            })
        );
    },
    getNorm: function (target) {
        if (typeof (target[0]) === 'number')
            return Math.sqrt(target.reduce((result, item) => result += item * item, 0));

        /*let det = 1;
        // triangle method
        return det;*/
    }
};

function showMatx(matx, name){
    console.log(`\n/====${name}====\\`);
    matx.forEach((item) => console.log(item));
    console.log(`\\====${name}====/`);
}

let inputVar = {
    A: [
        [5, 1, 1],
        [1, 5, 1],
        [1, 1, 5]
    ],
    b: [7, 7, 7],
    eps: 0.001
};
// Jacobs method
function Jacobs() {
    let E = myMath.createE(inputVar.A);
    let D = myMath.reverseMatx(inputVar.A.map((item, i) =>
        item.map((item, j) => {
            if (i === j) return item;
            return 0;
        })
    ));
    let B = myMath.anySum(E, myMath.constMultiply(-1, myMath.matxMultiply(D, inputVar.A)));
    let g = myMath.matxAndVectorMultiply(D, inputVar.b);
    //console.log(B);
    let q = myMath.getNorm(B);

    //console.log(q);


    let solve = {}

    solve.now = [0, 0, 0];

    do {
        solve.last = solve.now.map((item) => item);
        solve.now = myMath.anySum(myMath.matxAndVectorMultiply(B, solve.last), g).map((item) => item);
        //console.log(myMath.getNorm(inputVar.b));
    } while (myMath.getNorm(myMath.anySum(myMath.matxAndVectorMultiply(inputVar.A, solve.now), myMath.constMultiply(-1, inputVar.b))) > inputVar.eps);

    console.log(solve.now);
}
function Zeidel() {
    let L = inputVar.A.map((item, i) =>
        item.map((item, j) => {
            if (i >= j) return item;
            return 0;
        })
    );
    let U = inputVar.A.map((item, i) =>
        item.map((item, j) => {
            if (i < j) return item;
            return 0;
        })
    );

    let solve = {
        now: [0, 0, 0]
    }

    do{
        solve.last = solve.now.map(item => item);
        solve.now = myMath.matxAndVectorMultiply(
                        myMath.reverseMatx(L),myMath.anySum(
                                    myMath.matxAndVectorMultiply(
                                            myMath.constMultiply(-1,U),solve.last),
                                    inputVar.b));
    }while(myMath.getNorm(myMath.anySum(myMath.matxAndVectorMultiply(inputVar.A, solve.now), myMath.constMultiply(-1, inputVar.b))) > inputVar.eps);
    console.log(solve.now);
}