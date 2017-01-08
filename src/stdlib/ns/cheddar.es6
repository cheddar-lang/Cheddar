export default function(cheddar) {
    return cheddar.namespace([
        ['version', cheddar.from(require('./cheddar/version'))],
        ['internal', cheddar.from(require('./cheddar/internal'))],

        ['uid', new cheddar.variable(global.SAFE_MODE ?
            new cheddar.nil : require('./cheddar/uid')(cheddar), {
                Writeable: true
            }
        )]
    ]);
}
