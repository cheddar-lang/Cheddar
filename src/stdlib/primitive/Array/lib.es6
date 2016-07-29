import api from '../../api';

export default new Map([
    require('./lib/len')(api),
    require('./lib/turn')(api),
    require('./lib/fuse')(api),
    require('./lib/vfuse')(api),
    require('./lib/join')(api),
    require('./lib/each')(api),
    require('./lib/map')(api),
    require('./lib/cycle')(api),
    require('./lib/shift')(api),
    require('./lib/unshift')(api),
    require('./lib/slice')(api),
    require('./lib/pop')(api),
    require('./lib/push')(api)
]);
