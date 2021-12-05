# Advent of code 2021
Advent of code 2021 with Typescript

## How to build and run the project
This project uses yarn to manage its dependencies.
To build and run the project just execute: 
```
yarn 
yarn start
```

## Structure
I decided to use jest as the main "CLI Interface" for the project. This is the process I use while working on a problem:  

1. I create a test for the problem I'm working on, making sure it fails.
2. When I'm working on finding the solution, I run jest using `yarn watch` which gives me visibility about the current result of my algorithm. 
3. When I found the solution, I update the test to check for the right solution and I commit. 
4. Since I have a test passing, I can work on refactoring the code or trying different approaches with instantanious feedback.

# Log

## Day 1
I decided to use Jest as the main CLI interface for the project, I hope it looks cool and will help me with refactorings 🤞.
  
**Part 1** was easy, a simple for loop with a counter made it. 
  
For **Part 2** I tried to use a functional approach, based on `slice` and some `add` function, but I realized there is no `add` function in javascript that accepts an arbitrary number of parameters or an array (Or I couldn't find it). The alternative was to use `reduce` which made the code very long and ugly. The solution I ended up with could look like a bit "rustic" but it's very easy to understand: 
``` javascript
  for (let i = 0; i < measurements.length - 2; i++) {
    const currentCount =
      measurements[i] + measurements[i + 1] + measurements[i + 2];
    if (currentCount > previousCount) counter++;
    previousCount = currentCount;
  }
```

## Day 2
I finished this one pretty quickly, so I decided to refactor it a bit and use some Object Oriented Programming (I haven't used that much in TS). I think I overengineered the solution a bit, but I'm happy with the result.

I tried to map all the domain concepts to types (I love TS type system 😍).

I created a `Submarine` class that holds the state and the logic of the submarine, the interface would be:

```typescript
interface Submarine {
  exec: (command: Instruction) => void;
  getCurrentPosition: () => Position;
}
```
I used a simple switch statement to implement the movement logic, a bit simple, but it does it job and it's easy to understand, so for version 1: 
```typescript
switch (command.direction) {
      case "forward":
        this.position.horizontalPosition += command.distance;
        break;
      case "down":
        this.position.depth += command.distance;
        break;
      case "up":
        this.position.depth -= command.distance;
    }
```

And for the second problem, I only had to create a class called `SubmarineV2` inheriting from `Submarine`, add a new `aim` state, and rewrite the `exec` method:
```typescript
switch (command.direction) {
      case "forward":
        this.position.horizontalPosition += command.distance;
        this.position.depth += command.distance * this.aim;
        break;
      case "down":
        this.aim += command.distance;
        break;
      case "up":
        this.aim -= command.distance;
    }
```

This way executing the commands is very easy with a simple `forEach` loop: 
```typescript
commands.forEach(submarine.exec);
```

## Day 3
This one was more complex and I ended up with some clutered code, that I refactored later to a solution based on strategies. 

The first problem was not very complex, and I created a method to transform from a binary number in a string to a decimal number (I decided not to use external  libraries for this AOC challenge):

``` typescript
function toDecimalNumber(binaryNumber: string) {
  let result = 0;
  const reversed = [...binaryNumber].reverse();
  for (let i = 0; i < reversed.length; i++) {
    result += parseInt(reversed[i]) * Math.pow(2, i);
  }

  return result;
}
```
but then I realized there is an easy way to do it natively in javascript:
``` typescript
function toDecimalNumber(binaryNumber: string) {
  return parseInt(binaryNumber, 2);
}
```

For the second one, I decided to go straightforward to the solution, without worrying too much about the code, I'll refactor it later when I have more knowledge about the problem. The final result can be seen in the commit `db86153`. 

After some refactors I reduced duplication and created a couple of strategies to deal with the different ways of calculating a rating: 

```typescript
function oxygenStrategy(lines: string[], index: number): string {
  const [numberOfZeros, numberOfOnes] = countOccurrences(lines, index);

  return numberOfOnes >= numberOfZeros ? "1" : "0";
}

function co2ScrubberStrategy(lines: string[], index: number): string {
  const [numberOfZeros, numberOfOnes] = countOccurrences(lines, index);

  return numberOfZeros <= numberOfOnes ? "0" : "1";
}
```

With this approach, calculating a rating is very understandable: 
```typescript
function getRating(
  lines: string[],
  strategy: (lines: string[], index: number) => string
): number {
  for (let i = 0; i < lines[0].length; i++) {
    if (lines.length === 1) break;
    lines = lines.filter((l) => l[i] === strategy(lines, i));
  }

  return toDecimalNumber(lines[0]);
}
```

I'm pretty happy with the final solution, but my intuition tells me that there should be a more elegant solution... but I couldn't find it 🤷‍♀️


