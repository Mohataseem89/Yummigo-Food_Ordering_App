//sample test its not related to application

// src/__tests__/sum.test.js
// import { sum } from '../sum'; // ✅ no extension needed
import { sum } from '../components/sum'

test("Sum function should return the sum of two numbers", () => {
  const result = sum(2, 3);
  expect(result).toBe(5);
});
