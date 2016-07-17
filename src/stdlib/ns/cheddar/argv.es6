export default function(cheddar) {
    return cheddar.init(cheddar.array, ...process.argv.slice(2).map(
        item => cheddar.init(cheddar.string, item)
    ));
}