// Even ifdef has to be protected against multiple includes...
if (!global.ifdefGuards) {
  global.ifdefGuards = {}
}

/**
 * @private
 *
 * Mangles invalid keys. Valid keys are preserved.
 */
function mangle(key) {
  // Unlikely and unfortunate edge case
  if (key.slice(-9) === '__proto__') {
    key = '_p' + key
  }

  return key
}

/**
 * The core of the implementation. If a guard already exists at `key`, its
 * value is returned. Otherwise, `value` is returned. Call without `value` to
 * check guards, call with `value` to assign.
 *
 * NOTE: Falsy values cannot be guarded.
 *
 * See `test/fixture` for an example of usage.
 *
 * @param  {String} key   The key to guard with.
 * @param  {Any}    value The value to guard.
 * @return {Any}          The previously-guarded value, if any. Otherwise,
 *                        `value`.
 */
function ifdef(key, value) {
  key = mangle(key)

  if (global.ifdefGuards[key]) {
    return global.ifdefGuards[key]
  }

  if (value) {
    global.ifdefGuards[key] = value
  }

  return value
}

module.exports = ifdef
