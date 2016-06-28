import api from '../../api';
export default new Map([
    // TODO: Move to ./lib/
    require('./lib/slice')(api)
]);