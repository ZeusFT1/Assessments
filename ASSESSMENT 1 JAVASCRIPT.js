//EURISKO Assignment

// Challenge 1

reverseString("hello"); // olleh
function reverseString(str) {
    return str.split("").reverse().join("");
}
console.log(reverseString("hello")); // olleh

// Challenge 2

countVowels("typescript"); // SHOULD RETURN 2
function countVowels(str) {
  const vowels = "aeiou";
  return str.split("").filter((char) => vowels.includes(char)).length;
}
console.log(countVowels("typescript")); //2 e and i are vowels

// Challenge 3

findMissingNumber([1, 2, 4, 5, 6]); // 3

function findMissingNumber(arr) {
  let n = arr.length + 1;
  let total = (n * (n + 1)) / 2;
  let sum = arr.reduce((acc, curr) => acc + curr, 0);
  return total - sum;
}
console.log(findMissingNumber([1, 2, 4, 5, 6])); // 3

// Challenge 4

firstNonRepeatingChar("swiss"); // w
firstNonRepeatingChar("racecar"); // e

function firstNonRepeatingChar(str) {
  for (let i = 0; i < str.length; i++) {
    if (str.indexOf(str[i]) === str.lastIndexOf(str[i])) {
      return str[i];
    }
  }
  return null;
}
console.log(firstNonRepeatingChar("swiss")); // w
console.log(firstNonRepeatingChar("racecar")); // e

// Challenge 5

deepEqual({a: 1, b: {c:2}}, {a: 1, b: {c:2}}); // true
deepEqual({a: 1, b: {c:2}}, {a: 1, b: {c:3}}); // false

function deepEqual(obj1, obj2) {
  if (typeof obj1 !== "object" || typeof obj2 !== "object") {
    return obj1 === obj2;
  }
  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    return false;
  }
  for (let key in obj1) {
    if (!deepEqual(obj1[key], obj2[key])) {
      return false;
    }
  }
  return true;
}
console.log(deepEqual({a: 1, b: {c:2}}, {a: 1, b: {c:2}})); // true
console.log(deepEqual({a: 1, b: {c:2}}, {a: 1, b: {c:3}})); // false

// Challenge 6

class LRUCache {
    constructor(capacity) {
      this.capacity = capacity;
      this.cache = new Map();
    }
    get(key) {
      if (!this.cache.has(key)) {
        return null;
      }
      const value = this.cache.get(key);
      this.cache.delete(key);
      this.cache.set(key, value);
      return value;
    }
    put(key, value) {
      if (this.cache.has(key)) {
        this.cache.delete(key);
      }
      if (this.cache.size === this.capacity) {
        this.cache.delete(this.cache.keys().next().value);
      }
      this.cache.set(key, value);
    }
}
const cache = new LRUCache(2);
cache.put(1, 1);
cache.put(2, 2);
cache.get(1); // 1
cache.put(3, 3);
cache.get(2); // null

console.log(cache.get(1)); // 1
console.log(cache.get(2)); // null
console.log(cache.get(3)); // 3

// Challenge 7 is Typescript