import { parseQuery } from '../src/index';


test('should return empty object if query is empty', () => {
	expect(parseQuery('')).toEqual({});
	expect(parseQuery('?')).toEqual({});
	expect(parseQuery('#')).toEqual({});
});


test('should parse query correctly', () => {
	expect(parseQuery('foo')).toEqual({foo:true});
	expect(parseQuery('&&&foo&&&')).toEqual({foo:true});
	expect(parseQuery('foo&bar')).toEqual({foo:true, bar:true});
	expect(parseQuery('foo=1&bar')).toEqual({foo:'1', bar:true});
	expect(parseQuery('foo=1&bar&bar=2')).toEqual({foo:'1', bar:'2'});
	expect(parseQuery('foo=%E6%B5%8B%E8%AF%95')).toEqual({foo:'测试'});
});


test('should obey parse options', () => {
	expect(parseQuery('foo is 1; bar is 2', {itemSeparator:'; ', keyValueSeparator:' is '})).toEqual({foo:'1', bar:'2'});
	expect(parseQuery('foo=%E6%B5%8B%E8%AF%95', {decode:false})).toEqual({foo:'%E6%B5%8B%E8%AF%95'});
	expect(parseQuery('*foo=1', {remove:/^\*/})).toEqual({foo:'1'});
})