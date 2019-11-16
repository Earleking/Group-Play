export class StageConstants
{
    // To be finetuned
    public benchCardSize = {
        width: 176,
        height: 158
    };
    public handCardSize = {
        width: 127,
        height: 160
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
            p1: 790,
            p2: 200
        },
        bottom: {
            p1: 790 + 158,
            p2: 200 + 158
        }
    };
    public handSize = {
        width: 1920,
        height: 160,
        top: {
            p1: 970,
            p2: -125
        },
        bottom: {
            p1: 970 + 160,
            p2: -125 + 160
        }
    };
    // Battle size is just max width
    public battleSize = {
        width: 1920,
        height: 158,
        top: {
            p1: 600,
            p2: 400
        },
        bottom: {
            p1: 600 + 158,
            p2: 400 + 158
        }
    };
}

export var stageConstants = new StageConstants ( );