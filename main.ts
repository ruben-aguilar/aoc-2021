import day1 from "./1/day1";
import day2 from "./2/day2";

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
    it("Problem 1: ?", () => {
      expect(day2.problem1()).toBe("?");
    });
  });
});
