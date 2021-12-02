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