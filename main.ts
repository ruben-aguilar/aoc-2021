import day1 from "./1/day1";
import day2 from "./2/day2";
import day3 from "./3/day3";

describe("Advent of code", () => {
  describe("Day 1", () => {
    it("Problem 1: 1548", () => {
      expect(day1.problem1()).toBe(1548);
    });
    it("Problem 2: 1589", () => {
      expect(day1.problem2()).toBe(1589);
    });
  });

  describe("Day 2", () => {
    it("Problem 1: 1654760", () => {
      expect(day2.problem1()).toBe(1654760);
    });
    it("Problem 2: 1956047400", () => {
      expect(day2.problem2()).toBe(1956047400);
    });
  });

  describe("Day 3", () => {
    it("Problem 1: 841526", () => {
      expect(day3.problem1()).toBe(841526);
    });
  });
});
