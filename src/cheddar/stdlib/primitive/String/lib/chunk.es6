// source: http://stackoverflow.com/a/14349616/1620622, modified
function chunkString(str, len, cheddar) {
  var _size = Math.ceil(str.length/len),
      _ret  = new Array(_size),
      _offset
  ;

  for (var _i=0; _i<_size; _i++) {
    _offset = _i * len;
    _ret[_i] = cheddar.init(cheddar.string, str.substring(_offset, _offset + len));
  }

  return _ret;
}

export default (cheddar) => ["chunk", cheddar.var(new cheddar.func(
    [
        ["size", {
            Type: cheddar.number
        }]
    ],
    function(scope, input) {
        let size = input("size").value;
        let self = input("self").value;

        // TODO: ensure > 0

        return cheddar.init(cheddar.array, ...chunkString(
            self, size, cheddar
        ))
    }
))]
