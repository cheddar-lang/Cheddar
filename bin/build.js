// Super-hacky userscript but it gets the job done

var fs = require('fs');
var path = require('path');
var child_process = require('child_process');

var dirs = fs.readdirSync(path.join(__dirname, "../bindings/"));
var item;

for (var i = 0; i < dirs.length; i++) {
    if (dirs[i] !== "index.js") {
        item = path.join(__dirname, "../bindings/", dirs[i]) + "/";
        var res = child_process.spawnSync(path.join(__dirname, "../node_modules/.bin/node-gyp"), [ "rebuild", "-C", item ]);
        process.stdout.write(res.stdout || "");
        process.stderr.write(res.stderr || "");
    }
}
