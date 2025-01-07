import { getPosts } from "./postController.js";
import { generateRandomNumber, celsiusToFahrenheit } from "./utils.js";

console.log(getPosts());

console.log("random number: ", generateRandomNumber());
console.log("celcius to fahrenheit: ", celsiusToFahrenheit(12));