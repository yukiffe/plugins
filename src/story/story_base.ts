export class StoryBase {
    public _create_time: Date;
    public _fairy_tale_ratio: number;
    public _likelihood: number;

    constructor() {
        this._create_time = new Date();
        this._fairy_tale_ratio = 0;
        this._likelihood = 0;
    }
}
