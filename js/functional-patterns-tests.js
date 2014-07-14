var patterns = new FunctionalPatterns();

/* Problem 1: Partial Application */
var mul = function() {
    var result = 1;
    for (var i = 0; i < arguments.length; i++) {
        result *= arguments[i];
    }
    return result;
};
console.log(patterns.applyPartially(mul, 2, 3)(4));

/* Problem 2: Currying */
var div = function(x, y, z) {
    return x / y / z;
};
console.log(patterns.curry(div)(16)(2)(2));

/* Problem 3: Linear fold */
var callback = function(previousValue, currentValue, index, array) {
    console.log(previousValue + ' ' + currentValue + ' ' + index + ' ');
    return currentValue;
};
patterns.foldLinear([1, 2, 3], callback, 0);

/* Problem 4: Linear unfold */
var callback = function(currentState) {
    return { element: 5, state: 0 };
};
console.log(patterns.unfoldLinear(callback, 1));

/* Problem 5: Map */
var hexer = function(element) {
    return element.toString(16);
};
console.log(patterns.map([10, 11, 12, 13], hexer));

/* Problem 6: Filter */
var greaterThanTenPredicate = function(element) {
    return element > 10;
};
console.log(patterns.filter([5, 6, 7, 11, 5, 12, 15], greaterThanTenPredicate));

/* Problem 7: Average of even numbers */
var numbers = [1, 2, 3, 4, 5, 8, 9, 11, 12, 16];
console.log(averageOfIven(numbers));

/* Problem 8: Sum of random numbers */
console.log(sumOnRandomNumbers(10));

/* Problem 9: First */
console.log(patterns.first([5, 6, 7, 11, 5, 12, 15], greaterThanTenPredicate));

/* Problem 10: Lazy evaluation */
console.log("lazy")
var lazy = patterns.lazy(function (a, b) { return (a+b)*(a+b); }, 1, 2);


console.log(lazy());

/* Problem 11: Memoization */
var memoizedSqrt = patterns.memoize(Math.sqrt);
console.log(memoizedSqrt(144));