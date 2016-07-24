import fs from 'fs';

export default function(cheddar) {
    return new cheddar.func(
        [
            ["path", {
                Type: cheddar.string
            }],
            ["encoding", {
                Type: cheddar.string,
                Optional: true
            }]
        ],
        function(scope, input) {
            let path = input("path").value;
            let file = fs.readFile(path);
        }
    );
}