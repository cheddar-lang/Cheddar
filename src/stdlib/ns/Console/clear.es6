export default function(cheddar) {
    return new cheddar.func([], function(scope, input) {
        let lines = process.stdout.getWindowSize()[1];
        for (let i = 0; i < lines; i++) {
            console.log('\r\n');
        }
    });
}
