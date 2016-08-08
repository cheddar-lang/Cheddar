import api from '../../api';

export default new Map([
    require('./lib/slice')(api),
    require('./lib/bytes')(api),
    require('./lib/lines')(api),
    require('./lib/count')(api),
    require('./lib/upper')(api),
    require('./lib/lower')(api),
    require('./lib/split')(api),
    require('./lib/ord')(api),
    require('./lib/len')(api),
    require('./lib/rev')(api),
    require('./lib/chars')(api),
    require('./lib/head')(api),
    require('./lib/tail')(api),
    require('./lib/sub')(api),
    require('./lib/chunk')(api)
]);
