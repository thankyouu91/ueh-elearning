// Extra workbook exercises (with mini-cases) and library case studies / group projects, one file per subject.
import * as eco from './wb-eco.js';
import * as acc from './wb-acc.js';
import * as fin from './wb-fin.js';
import * as mgt from './wb-mgt.js';
import * as mkt from './wb-mkt.js';
import * as b1 from './be-b1.js';

const parts = [eco, acc, fin, mgt, mkt, b1]; // b1 last: appended ids keep existing exercise ids stable
export const EXTRA_EXERCISES = parts.flatMap(p => p.EXTRA);
export const EXTRA_LIBRARY = parts.flatMap(p => p.LIB);
