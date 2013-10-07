# Ifdef

A common pattern in Node is to store singletons within a Module's closure. This
is an extremely powerful pattern, and its simplicity leaves little to be
desired. However, it's not uncommon for this pattern to break when:

 - The `require` cache goes bad (happens with some modules, but infrequent).
 - Multiple versions of the same module are required (way more frequent).

In this case, it'd be great to have a Node equivalent of `#ifdef`. That's what
this module is for.

## Installation

```
npm install ifdef --save
```

## Usage

From within your singleton module code, you need five lines of code. The first
line is your standard `require` statement:

```js
var ifdef = require('ifdef')
```

The second three are a check against existing guards, returning the guarded
value if necessary. Here, `GUARD_TERM` should be a term unique to your module.
The name provided in `package.json` is unique across modules, and should be
considered. If you're worried about collision, don't be afraid to "decorate"
it a little, i.e. `global_mongoose_connection` instead of `mongoose`:

```js
if (ifdef('GUARD_TERM')) {
  return module.exports = ifdef('GUARD_TERM')
}
```

_Following_ this block, build out your singleton. The third block of `ifdef`
code, then, assigns this singeton as the guarded value. If you have not already
assigned it to `module.exports`:

```js
module.exports = ifdef('GUARD_TERM', SINGLETON)
```

Notice that `ifdef` just returns the guarded term, making this a one-liner.
If you've already assigned what you want in `module.exports`, it's even simpler:

```js
ifdef('GUARD_TERM', module.exports)
```

## Alternatives

As far as I know, there aren't any independent of writing your own guard.
If I'm wrong, please let me know and I'll add them here. As far as writing your
own is concerned, here's what it looks like:

```js
if (global.__my_module_name) {
  return module.exports = global.__my_module_name
}

// Initialization here

module.exports = global.__my_module_name = SINGLETON
```
