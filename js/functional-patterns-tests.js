var patterns = new FunctionalPatterns();

/* Problem 1: Partial Application */
var mul = function() {
	var result = 1;
	for (var i = 0; i < arguments.length; i++) {
		result *= arguments[i];
	}
	return result;
}
alert(patterns.applyPartially(mul, 2, 3)(4));

/* Problem 2: Currying */
var div = function(x, y, z) {
	return x / y / z;
}
alert(patterns.curry(div)(16)(2)(2));

/* Problem 3: Linear fold */
var callback = function(previousValue, currentValue, index, array) {
	alert(previousValue + ' ' + currentValue + ' ' + index + ' ');
	return currentValue;
}
patterns.foldLinear([1, 2, 3], callback, 0);

/* Problem 4: Linear unfold */
var callback = function(currentState) {
	return { element: 5, state: 0 };
}
alert(patterns.unfoldLinear(callback, 1));

/* Problem 5: Map */
var hexer = function(element) {
	return element.toString(16);
}
alert(patterns.map([10, 11, 12, 13], hexer));

/* Problem 6: Filter */
var greaterThanTenPredicate = function(element) {
	return element > 10;
}
alert(patterns.filter([5, 6, 7, 11, 5, 12, 15], greaterThanTenPredicate));

/* Problem 7: Average of even numbers */
var numbers = [1, 2, 3, 4, 5, 8, 9, 11, 12, 16];
alert(averageOfIven(numbers));

/* Problem 8: Sum of random numbers */
alert(sumOnRandomNumbers(10));

/* Problem 9: First */
alert(patterns.first([5, 6, 7, 11, 5, 12, 15], greaterThanTenPredicate));

/* Problem 10: Lazy evaluation */
var lazyAlert = patterns.lazy(function(x) { alert(x); }, 5);
lazyAlert();

/* Problem 11: Memoization */
var memoizedSqrt = patterns.memoize(Math.sqrt);
alert(memoizedSqrt(144));