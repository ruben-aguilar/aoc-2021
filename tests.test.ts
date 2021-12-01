import day1 from "./1/day1";

describe("Advent of code", () => {
  describe("Day 1", () => {
    it("Problem 1: 1548", () => {
      expect(day1.problem1()).toBe(1548);
    });
    it("Problem 2: 1589", () => {
      expect(day1.problem2()).toBe(1589);
    });
  });
});
