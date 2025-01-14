import { formatCurrency } from "../../scripts/utils/money.js";

console.log('test suite: formatCurrency');

console.log('converts cents into dollars');

(formatCurrency(2095) === '20.95')
  ? console.log('passed')
  : console.log('failed');


console.log('works with 0');

(formatCurrency(0) === '0.00')
  ? console.log('passed')
  : console.log('failed');


console.log('rounds up to the nearest cent');

(formatCurrency(2000.5) === '20.01')
  ? console.log('passed')
  : console.log('failed');

(formatCurrency(2000.4) === '20.00')
  ? console.log('passed')
  : console.log('failed');
