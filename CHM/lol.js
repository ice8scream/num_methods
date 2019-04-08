let prob = [[2,0,1],
			[0,1,-1],
			[1,-1,2]];

let solve = [1,2,-2];
let eps = 0.001;
let last = {};
let now = {
	x: [0,0,0],
	p: [1,2,-2],
	xi: [1,2,-2],
	B: 0
}

let temp = [];
for(let i = 0; i < prob.length; i++){
	let sum = 0;
	for(let j = 0; j < prob[i].length; j++){
		sum += prob[j][i] * solve[j];
	}
	temp.push(sum);
}

now.q = temp;


let setAlpha = function(node) {
	let num = 0;
	let den = 0;
	for(let i = 0; i < node.xi.length; i++)	{
		num += node.xi[i] * node.p[i];
		den += node.q[i] * node.p[i];
	}
	node.alpha = num / den;
};

setAlpha(now);


let getNormal = function(vect) {
	let temp = 0;
	for(let i = 0; i < vect.length; i++){
		temp += Math.pow(vect[i],2);
	}
	return Math.sqrt(temp);
};

now.xiNorm = getNormal(now.xi);






function tempDebug() {
	console.log('<===========Start=Debug========>');
	console.log('last =', last);
	console.log('now =', now);
	console.log('<===========End===Debug========>');
}

tempDebug();

let masDif = (first,second) => first.map((item, index) => item - second[index]),
	masSum = (first,second) => first.map((item, index) => item + second[index]),
	multiply = (mul,target) => target.map(item => item*mul),
	sculMultiply = (first,second) => first.reduce((result, item , index) => result + item * second[index], 0);

//console.log(masSum(now.x, multiply(now.alpha, now.p)));
//todo sculMultiply
//todo Multiply 

while (now.xiNorm > eps) {
	for (let keys in now) {
		last[keys] = now[keys];
	}
	now.x = masSum(last.x, multiply(last.alpha, last.p));
	now.xi = masDif(last.xi, multiply(last.alpha, last.q));
	now.B = sculMultiply(now.xi, last.q) / sculMultiply(last.p, last.q);
	now.p = masDif(now.xi, multiply(now.B, last.p));
	let tmp = [];
	for (let i = 0; i < prob.length; i++) {
		let sum = 0;
		for (let j = 0; j < prob[i].length; j++) {
			sum += prob[j][i] * now.p[j];
		}
		tmp.push(sum);
	}
	now.q = tmp;
	now.alpha = sculMultiply(now.xi, now.p) / sculMultiply(now.q, now.p);
	now.xiNorm = getNormal(now.xi);
	tempDebug();	
}

console.log(now.x);