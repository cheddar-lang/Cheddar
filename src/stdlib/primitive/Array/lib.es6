import api from '../../api';

export default new Map([
    require('./lib/len')(api),
    require('./lib/push')(api)
]);