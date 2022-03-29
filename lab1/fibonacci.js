const cache = new Map();

const fibonacci = (num) => {
    num = Math.abs(num);
    if (cache.has(num)) {
        return cache.get(num);
    } 
    if (num <= 2) {
        cache.set(num, 1);
        return 1;
    }
    const result = fibonacci(num - 1) + fibonacci(num - 2);
    cache.set(num, result);
    return result;
}

console.log("Fibonacci of 30 is", fibonacci(30));
console.log("Fibonacci of -15 is", fibonacci(-15));
