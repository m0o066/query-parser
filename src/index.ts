interface ParseOptions {
	itemSeparator?: string;
	keyValueSeparator?: string;
	decode?: boolean;
	remove?: RegExp;
}


const defaultParseOptions = {
	itemSeparator: '&',
	keyValueSeparator: '=',
	decode: true,
	remove: /^[\?\#]/,
}


export function parseQuery(query: string = '', options: ParseOptions = {}): object {
	const {itemSeparator, keyValueSeparator, decode, remove} = {
		...defaultParseOptions, ...options,
	}

	const _query = query.replace(remove, '').trim();
	if(!_query) return {};

  // split query into key-value pairs
  return _query.split(itemSeparator).reduce((result, keyValue) => {
		if(!keyValue) return result;

		// find where the key-value separator is
    const i = keyValue.indexOf(keyValueSeparator);

    // ignore the items without a key
    if(i >= 0) {
      const key = keyValue.substr(0, i);
      const value = keyValue.substr(i+keyValueSeparator.length);
      return { ...result, [key]:decode ? decodeURIComponent(value) : value };
    }
    else {
      return { ...result, [keyValue]:true };
    }
  }, {});
}


export const search = parseQuery(window.location.search);
export const hash = parseQuery(window.location.hash);