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
