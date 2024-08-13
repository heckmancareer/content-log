
/**
 * Helper function. Given a collection of entities, and an array of their uuids, this
 * function will return an array of their keys sorted by the provided field and order (ascending or descending).
 * Currently supports sorting fields if they're Dates, strings (alphabetically), or numbers.
 * @param entities
 * @param entityKeys
 * @param sortField
 * @param sortOrder
 */
export function sortEntityKeys(
  entities: Record<string, any>,
  entityKeys: string[],
  sortField: string,
  sortOrder: 'ascending' | 'descending'
): string[] {
  return entityKeys.sort((a, b) => {
    let valueA = entities[a][sortField];
    let valueB = entities[b][sortField];
    let comparison = 0;
    if((valueA === undefined && valueB === undefined) || (valueA === null && valueB === null)) {
      return 0;
    }
    if(valueA === undefined || valueA === null) {
      return sortOrder === 'ascending' ? -1: 1;
    }
    if(valueB === undefined || valueB === null) {
      return sortOrder === 'descending' ? 1 : -1;
    }

    if (valueA instanceof Date || (typeof valueA === 'string' && !isNaN(Date.parse(valueA)))) {
      comparison = new Date(valueA).getTime() - new Date(valueB).getTime();
    } else if (typeof valueA === 'number' && typeof valueB === 'number') {
      comparison = valueA - valueB;
    } else {
      comparison = valueA.localeCompare(valueB);
    }

    return sortOrder === 'ascending' ? comparison : -comparison
  })
}
