/**
 * Parses a search query string into a structured format for filtering
 * Supports syntax like: "tag:featured AND artist:name"
 * 
 * @param {string} queryString - The query string to parse
 * @returns {Object} Parsed query information
 */
export function parseQuery(queryString) {
    if (!queryString) return { terms: [], type: 'basic' };
    
    // Check if it's a simple search or structured query
    const hasOperators = /\bAND\b|\bOR\b/i.test(queryString);
    const hasFieldSearch = /\w+:\w+/.test(queryString);
    
    if (!hasOperators && !hasFieldSearch) {
      // Simple text search
      return {
        terms: [{ value: queryString.trim(), isExact: false }],
        type: 'basic'
      };
    }
    
    // Handle structured query
    const terms = [];
    const andGroups = queryString.split(/\bAND\b/i).map(part => part.trim());
    
    andGroups.forEach(group => {
      const orTerms = group.split(/\bOR\b/i).map(term => term.trim());
      
      orTerms.forEach(term => {
        // Check if it's a field:value format
        if (term.includes(':')) {
          const [field, value] = term.split(':').map(part => part.trim());
          terms.push({
            field,
            value,
            isExact: true
          });
        } else if (term) {
          terms.push({
            value: term,
            isExact: false
          });
        }
      });
    });
    
    return {
      terms,
      type: 'structured',
      hasAnd: andGroups.length > 1
    };
  }