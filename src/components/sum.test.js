const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

test('adds 3 + 7 to equal 10', () => {
  expect(sum(3, 7)).toBe(10);
});
