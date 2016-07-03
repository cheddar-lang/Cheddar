import api from '../../api';
export default new Map([
    require('./lib/slice')(api),
    require('./lib/split')(api),
    require('./lib/ord')(api),
    require('./lib/length')(api),
    require('./lib/rev')(api),
    require('./lib/chars')(api)
]);