function sum1() {
    let sum = 0;

    for (i = 0; i < arguments.length; i++) {
        sum += arguments[i];
    }

    return sum;
}

function sum2(...nums) {
    let sum = 0;

    for (i = 0; i < nums.length; i++) {
        sum += nums[i];
    }

    return sum;
}

// console.log(sum2(1, 2, 3, 4) === 10); 
// console.log(sum2(1, 2, 3, 4, 5) === 15);

Function.prototype.myBind1 = function (context) {
    const that = this; //'this' points to markov.says
    const args1 = Array.from(arguments).slice(1);
    
    return function() {
        const args2 = Array.from(arguments);
        return that.apply(context, args1.concat(args2) );
    }
}

Function.prototype.myBind2 = function (context, ...args1) {
    const that = this; 

    return function (...args2) {
        return that.apply(context, args1.concat(args2));
    }
}

class Cat {
    constructor(name) {
        this.name = name;
    }

    says(sound, person) {
        console.log(`${this.name} says ${sound} to ${person}!`);
        return true;
    }
}

class Dog {
    constructor(name) {
        this.name = name;
    }
}

const markov = new Cat("Markov");
const pavlov = new Dog("Pavlov");

// console.log(markov.says("meow", "Ned"));
// Markov says meow to Ned!
// true

// bind time args are "meow" and "Kush", no call time args
// console.log(markov.says.myBind2(pavlov, "meow", "Kush")());
// Pavlov says meow to Kush!
// true

// no bind time args (other than context), call time args are "meow" and "a tree"
// console.log(markov.says.myBind2(pavlov)("meow", "a tree"));
// Pavlov says meow to a tree!
// true

// bind time arg is "meow", call time arg is "Markov"
// console.log(markov.says.myBind2(pavlov, "meow")("Markov"));
// Pavlov says meow to Markov!
// true

// no bind time args (other than context), call time args are "meow" and "me"
// const notMarkovSays = markov.says.myBind2(pavlov);
// console.log(notMarkovSays("meow", "me"));
// Pavlov says meow to me!
// true

function curriedSum(numArgs) {
    const numbers = [];

    function _curriedSum(num) {
        numbers.push(num);

        if (numbers.length === numArgs) {
            let sum = 0;

            for(n of numbers) sum += n;
            return sum;
        } else {
            return _curriedSum;
        }
    }
    return _curriedSum;
}

// const sum = curriedSum(4);
// console.log(sum(5)(30)(20)(1)); // => 56

Function.prototype.curry = function(numArgs) {
    const args = [];
    const fn = this;

    function _curriedFn(arg) {
        args.push(arg)
        
        if (args.length === numArgs) {
            return fn.call(fn, ...args);
        } else {
            return _curriedFn;
        }
    }
    return _curriedFn;
}

function sumThree(num1, num2, num3) {
    return num1 + num2 + num3;
}

console.log(sumThree.curry(3)(4)(20)(6))