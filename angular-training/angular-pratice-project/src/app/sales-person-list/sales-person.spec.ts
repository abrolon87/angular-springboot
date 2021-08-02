import { SalesPerson } from './sales-person';

describe('SalesPerson', () => {
  it('should create an instance', () => {
    expect(
      new SalesPerson('someName', 'someLastName', 'someEmail', 1)
    ).toBeTruthy();
  });
});
