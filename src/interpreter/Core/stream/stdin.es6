import StreamHandler from './handler';

export default class StreamSTDOUT extends StreamHandler {
    append(data) {
        this.Update(data + (line ? "\n" : ""));
    }
}