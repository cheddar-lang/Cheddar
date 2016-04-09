import StreamHandler from './handler';

export default class StreamSTDOUT extends StreamHandler {
    append(data, line = true) {
        this.Update(data + (line ? "\n" : ""));
    }
}