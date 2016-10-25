export default (api) => ["rect", api.var(new api.func(
    [
        ["fill", {
            Type: api.string,
            Default: api.init(api.string, " ")
        }]
    ],
    function(scope, input) {
        let str = input("self").value;
        let fill = input("fill").value;
        let lines = str.split(/\r?\n/);
        let maxLen = 0;
        for(let i = 0; i < lines.length; i++){
            maxLen = Math.max(lines[i].length, maxLen);
        }
        str = lines.map(line => {
            while(line.length < maxLen)
                line += fill;

            return line;
        }).join("\n");
        return api.init(api.string, str);
    }
))];
