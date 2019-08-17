# Query Parser

Just another query parser function 🙈.

## Getting Started

### Install

`npm i --save another-query-parser`

### Usage

```typescript
import { search, hash, parserQuery } from 'another-query-parser';

// search and hash are parsed from current url
// if current url is https://some.domain.com/?foo=1&bar#hello=world, then:
expect(search).toEqual({ foo:'1', bar:true });
expect(hash).toEqual({ hello:'world' });

// if you want to parse a specific url:
const result = parseQuery(location.search);

// if you want to specific the parse options:
const cookies = parseQuery(document.cookies, {
  itemSeparator: '; ',
  keyValueSeparator: '=',
});
```
