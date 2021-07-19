import { observable } from "mobx";
import { clearTimeout, setTimeout } from "timers";
import SampleMediaStream from "./SampleMediaStream";

export class DataModel {
    ID: number;
    @observable stream?: MediaStream;
    timeout?: NodeJS.Timeout;

    constructor(id: number) {
        this.ID = id;
    }
};

class RecyclerListStore {
    @observable _model: DataModel[];

    readonly _sampleStream: MediaStream;

    public get Model() { return this._model; }

    private _generateModel(n: number) {
        const arr = new Array<DataModel>();

        for (let i = 0; i < n; i += 1) {
            const item = new DataModel(i);
            arr.push(item);
        }
        return arr;
    }

    startStream(index: number, ms: number, callback?: () => void) {
        if (index >= this.Model.length) return;

        const item = this._model[index];
        if (ms) {
            item.timeout = setTimeout(() => {
                item.stream = this._sampleStream;
                console.log('item loading complete.', item.ID);
                callback?.();
            }, ms);
        } else {
            item.stream = this._sampleStream;
            callback?.();
        }
        // item.stream = this._sampleStream;
    }

    stopStream(index: number) {
        if (index >= this.Model.length) return;

        const item = this._model[index];

        if (item.stream) {
            item.stream = undefined;
        } else {
            if (item.timeout)
                clearTimeout(item.timeout);
            item.stream = undefined;
        }
    }

    constructor() {
        this._model = this._generateModel(50);
        this._sampleStream = SampleMediaStream();
    }
};


export default new RecyclerListStore();