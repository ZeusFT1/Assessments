// EURISKO Assignment

// Challenge 1
function reverseString(str: string): string {
    return str.split("").reverse().join("");
}
console.log(reverseString("hello")); // olleh

// Challenge 2
function countVowels(str: string): number {
    const vowels: string = "aeiou";
    return str.split("").filter((char) => vowels.includes(char)).length;
}
console.log(countVowels("typescript")); // 2 (e and i)

// Challenge 3
function findMissingNumber(arr: number[]): number {
    let n: number = arr.length + 1;
    let total: number = (n * (n + 1)) / 2;
    let sum: number = arr.reduce((acc, curr) => acc + curr, 0);
    return total - sum;
}
console.log(findMissingNumber([1, 2, 4, 5, 6])); // 3

// Challenge 4
function firstNonRepeatingChar(str: string): string | null {
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
function deepEqual(obj1: any, obj2: any): boolean {
    if (typeof obj1 !== "object" || typeof obj2 !== "object" || obj1 === null || obj2 === null) {
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
console.log(deepEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } })); // true
console.log(deepEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 3 } })); // false

// Challenge 6
class LRUCache {
    private capacity: number;
    private cache: Map<number, number>;

    constructor(capacity: number) {
        this.capacity = capacity;
        this.cache = new Map();
    }

    get(key: number): number | null {
        if (!this.cache.has(key)) {
            return null;
        }
        const value = this.cache.get(key)!;
        this.cache.delete(key);
        this.cache.set(key, value);
        return value;
    }

    put(key: number, value: number): void {
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
console.log(cache.get(1)); // 1
cache.put(3, 3);
console.log(cache.get(2)); // null
console.log(cache.get(3)); // 3

// Challenge 7

class TaskManager {
    private tasks: {id: number, name: string, description: string}[] = [];
    private currentId: number = 1;

    addTask(name: string): void {
        this.tasks.push({
            id: this.currentId,
            name: name,
            description: "task description"
        });
        this.currentId++;
    }

    completeTask(taskId: number): void {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
    }
    displayTasks(): void {
        console.log('Tasks: ', this.tasks);
    }
}

const taskManager = new TaskManager();
taskManager.addTask("Learn TypeScript");
taskManager.completeTask(1);
taskManager.displayTasks();

// DONE