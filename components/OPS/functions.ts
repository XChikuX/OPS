import { REGEX_PATTERNS } from './constants';

export const observers = ["Ni", "Si", "Ne", "Se"];
export const deciders = ["Fi", "Ti", "Fe", "Te"];
export const de = ["Te", "Fe"];
export const di = ["Ti", "Fi"];
export const oi = ["Si", "Ni"];
export const oe = ["Se", "Ne"];
export const n = ["Ni", "Ne"];
export const s = ["Si", "Se"];
export const f = ["Fi", "Fe"];
export const t = ["Ti", "Te"];

export const isValidCell = (
    filter: string,
    first: string,
    second: string,
    columnHeader: string,
    columnFirst: string
  ): boolean => {
    switch(filter) {
      case 'O': return observers.includes(first);
      case 'D': return deciders.includes(first);
      case 'Di': return di.includes(first) || di.includes(second);
      case 'De': return de.includes(first) || de.includes(second);
      case 'Oi': return oi.includes(first) || oi.includes(second);
      case 'Oe': return oe.includes(first) || oe.includes(second);
      case 'N': return n.includes(first) || n.includes(second);
      case 'S': return s.includes(first) || s.includes(second);
      case 'F': return f.includes(first) || f.includes(second);
      case 'T': return t.includes(first) || t.includes(second);
      case 'Sleep': return columnFirst.includes('S');
      case 'Play': return columnFirst.includes('P');
      case 'Blast': return columnFirst.includes('B');
      case 'Consume': return columnFirst.includes('C');
      case 'Energy': return REGEX_PATTERNS.ENERGY.test(columnHeader);
      case 'Info': return REGEX_PATTERNS.INFO.test(columnHeader);
      case 'I': return REGEX_PATTERNS.INTROVERT.test(columnHeader);
      case 'E': return REGEX_PATTERNS.EXTRAVERT.test(columnHeader);
      default: return true;
    }
  };

