export class StageConstants
{
    // To be finetuned
    public benchCardSize = {
        width: 176,
        height: 158
    };
    public handCardSize = {
        width: 127,
        height: 311
    };
    // Battle size is just max width
    public battleCardSize = {
        width: 176,
        height: 158
    };

    public benchSize = {
        width: 1920,
        height: 158,
        top: {
            p1: 825,
            p2: 90
        },
        bottom: {
            p1: 825 + this.benchCardSize.height,
            p2: 90 + this.benchCardSize.height
        }
    };
    public handSize = {
        width: 1920,
        height: 311,
        top: {
            p1: 1020,
            p2: -125
        },
        bottom: {
            p1: 1020 + this.handCardSize.height,
            p2: -125 + this.handCardSize.height
        }
    };
    // Battle size is just max width
    public battleSize = {
        width: 1920,
        height: 158,
        top: {
            p1: 600,
            p2: 325
        },
        bottom: {
            p1: 600 + this.battleCardSize.height,
            p2: 325 + this.battleCardSize.height
        }
    };
}

export var stageConstants = new StageConstants ( );