it('should calculate monthly rate', function () {
  expect(calcMonthlyPayment(10000, 10, 4.5)).toEqual(103.63840875701705);
  expect(calcMonthlyPayment(1000000, 30, 2.99)).toEqual(4210.649009231012);
});
