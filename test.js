Function.prototype.memoized = function (arg) {
    // We initialize the cache
    this._cache = this._cache || {};

    var key = arguments.length > 1 ? JSON.stringify(Array.prototype.slice.call(arguments)) : arg;

    // If the key is in the cache, we return its corresponding
    // value else we apply the function
    return this._cache[key] !== undefined ? this._cache[key] : this._cache[key] = this.apply(this, arguments);
};

// The memoize function returns a function that applies the 
// memoized function to the function on which memoize is called.
Function.prototype.memoize = function () {
    var theFunction = this;

    return function () {
        return theFunction.memoized.apply(theFunction, arguments);
    };
};

// This function multiplies its argument by 2 and returns it
var multiplyBy2 = function (arg) {

    var result;
    result = arg * 2;

    return result;
}.memoize(); // Notice here the call to memoize

// This function multiplies its argument by 4 and returns it
var multiplyBy4 = function (arg) {

    var result;
    result = arg * 4;

    return result;
}.memoize();

var test = function (a, b) {
    return a * b;
}.memoize();

console.log(multiplyBy2(2)); // computes and prints 4
console.log(multiplyBy2(2)); // retrieves 4 from the cache and prints 4

console.log(multiplyBy4(3)); // computes and prints 12
console.log(multiplyBy4(3)); // retrieves 12 from the cache and prints 12

console.log(test(2,5));
console.log(test(3,5));
console.log(test(2,5));
