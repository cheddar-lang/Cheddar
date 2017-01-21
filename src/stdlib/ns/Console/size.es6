var sizeClass = require("../Size");
export default (api) => api.prop(new api.func([],
    function(_, input) {
        var size = process.stdout.getWindowSize();
        return api.init(sizeClass(api),
            api.init(api.number, 10, 0, size[0]),
            api.init(api.number, 10, 0, size[1])
        )
    }
))
