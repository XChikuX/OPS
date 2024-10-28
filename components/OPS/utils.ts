import { ActiveButtonsState } from "./types";
import { observers, deciders, di, de, oi, oe, n, s, f, t } from "./functions";

export const createLookupMaps = () => {
    const functionMap = new Map();
    const typeMap = new Map([
      ['O', new Set(observers)],
      ['D', new Set(deciders)],
      ['Di', new Set([...di])],
      ['De', new Set([...de])],
      ['Oi', new Set([...oi])],
      ['Oe', new Set([...oe])],
      ['N', new Set([...n])],
      ['S', new Set([...s])],
      ['F', new Set([...f])],
      ['T', new Set([...t])]
    ]);
  
    return { functionMap, typeMap };
  };
  
  // Pre-compile RegExp patterns
  const ENERGY_PATTERN = /S.*P|P.*S/;
  const INFO_PATTERN = /B.*C|C.*B/;
  const I_PATTERN = /S.*C|C.*S/;
  const E_PATTERN = /P.*B|B.*P/;
  
  export const isValidCell = (
    first: string,
    second: string,
    columnHeader: string,
    activeButtons: ActiveButtonsState,
    typeMap: Map<string, Set<string>>
  ): boolean => {
    return Object.entries(activeButtons).every(([filter, isActive]) => {
      if (!isActive) return true;
  
      const typeSet = typeMap.get(filter);
      if (typeSet) {
        return typeSet.has(first) || typeSet.has(second);
      }
  
      const columnFirst = columnHeader.split('/')[0];
      
      switch(filter) {
        case 'Sleep': return columnFirst.includes('S');
        case 'Play': return columnFirst.includes('P');
        case 'Blast': return columnFirst.includes('B');
        case 'Consume': return columnFirst.includes('C');
        case 'Energy': return ENERGY_PATTERN.test(columnHeader);
        case 'Info': return INFO_PATTERN.test(columnHeader);
        case 'I': return I_PATTERN.test(columnHeader);
        case 'E': return E_PATTERN.test(columnHeader);
        default: return true;
      }
    });
  };
  