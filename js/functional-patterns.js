function FunctionalPatterns() { }

FunctionalPatterns.prototype.applyPartially = function(func) {
    var slice = Array.prototype.slice;
    var partialArguments = slice.call(arguments, 1);

    var partiallyAppliedFunc = function() {
        var allArgs = partialArguments.concat(slice.call(arguments));
        return func.apply(this, allArgs);
    };
    return partiallyAppliedFunc;
};

FunctionalPatterns.prototype.curry = function(func) {    
    var argsAccumulator = new Array();
    var slice = Array.prototype.slice;

    var curriedFunc = function() {
        return function() {
            argsAccumulator = argsAccumulator.concat(slice.call(arguments));

            if (argsAccumulator.length < func.length) {
                return curriedFunc();
            }
            return func.apply(this, argsAccumulator);
        };
    };
    return curriedFunc();
};

FunctionalPatterns.prototype.foldLinear = function(array, callback) {
    var previousValue = arguments[2];

    for (var i = 0; i < array.length; i++) {
        previousValue = callback(previousValue, array[i], i, array);
    }
    return previousValue;
};

FunctionalPatterns.prototype.unfoldLinear = function(callback, initialValue) {
    var results = new Array();
    var currentState = initialValue;

    do {
        var callbackResult = callback(currentState);
        currentState = callbackResult.state;
        results.push(callbackResult.element);
    } while (currentState);

    return results;
};

FunctionalPatterns.prototype.map = function(array, mapper) {
    var results = new Array();

    for (var i = 0; i < array.length; i++) {
        results.push(mapper(array[i]));
    }
    return results;
};

FunctionalPatterns.prototype.filter = function(array, predicate) {
    var results = new Array();

    for (var i = 0; i < array.length; i++) {
        if (predicate(array[i])) {
            results.push(array[i]);
        }
    }
    return results;
};

FunctionalPatterns.prototype.first = function(array, predicate, defaultValue) {
    for (var i = 0; i < array.length; i++) {
        if (predicate(array[i])) {
            return array[i];
        }
    }
    return defaultValue;
};

FunctionalPatterns.prototype.lazy = function(func) {    
    var slice = Array.prototype.slice;
    var args = slice.call(arguments, 1);
    var lazyFunc = function() {
        return func(args);
    };
    return lazyFunc;
};

FunctionalPatterns.prototype.memoize = function(func) {
    var previousResults = {};

    var memoizedFunc = function(arg) {
        if (arg === undefined  || isNaN(arg)) {
            return;
        }
        if (arg in previousResults) {
            return previousResults[arg];
        } else {
            return previousResults[arg] = func(arg);
        }
    };
    return memoizedFunc;
};


var patterns = new FunctionalPatterns();

var summator = function(previousValue, currentValue, index, array) { 
    return previousValue + currentValue;
};

function averageOfIven(numbers) {    
    var isEvenPredicate = function(number) {
        return (number % 2) === 0;
    };

    var ivenNumbers = patterns.filter(numbers, isEvenPredicate);
    var sum = patterns.foldLinear(ivenNumbers, summator, 0);
    var average = sum / ivenNumbers.length;
    return average;
}

function sumOnRandomNumbers(count) {
    var randomNumberGenerator = function(count) {
        return { element: Math.random(), state: --count };
    };

    var randomNumbers = patterns.unfoldLinear(randomNumberGenerator, count);
    var sum = patterns.foldLinear(randomNumbers, summator, 0);
    return sum;
}