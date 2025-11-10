// Importing the function from the server file
import { describe, it, expect } from "vitest";
import { getResult } from "server.js";

// Test for index 0/Elephant
describe("getResult for index 0", () => 
{
    it("should return the correct description for Elephant", () => 
    {
        const result = getResult(0);
        expect(result.name).toBe("Elephant");
        expect(result.description).toBe("A huge gray animal with a long trunk and big ears, known for being smart and strong.");
    });
});

// Test for index 5/CaT
describe("getResult for index 5", () => 
{
    it("should return the correct description for Cat", () => 
    {
        const result = getResult(5);
        expect(result.name).toBe("Cat");
        expect(result.description).toBe("A small, curious animal that loves to climb and nap. It has sharp claws and purrs when happy.");
    });
});

// Test for invalid index/Animal that isn't on the list
describe("getResult for an invalid index", () => 
{
    it("should return null for out-of-bounds index", () => 
    {
        const result = getResult(20);
        expect(result).toBeNull();
    });
});
