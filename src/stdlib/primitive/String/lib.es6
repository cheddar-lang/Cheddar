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
    require('./lib/length')(api),
    require('./lib/reverse')(api),
    require('./lib/chars')(api),
    require('./lib/head')(api),
    require('./lib/tail')(api),
    require('./lib/replace')(api),
    require('./lib/index')(api),
    require('./lib/chunk')(api),
    require('./lib/test')(api),
    require('./lib/matches')(api),
    require('./lib/exec')(api),
    require('./lib/center')(api),
]);
