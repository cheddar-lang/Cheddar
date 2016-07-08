export default function(cheddar) {
    return cheddar.namespace([
        ['get', cheddar.from(require('./HTTP/get'))]
    ]);
}