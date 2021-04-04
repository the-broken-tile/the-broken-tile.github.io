const REGEX_LOGIN = /^Steam\sInitialized:\s([^-/\s]+).+/;
const REGEX_TYPE_LOG = /^(Initialize engine version|GfxDevice:|Direct3D|\s{4}(Version|Vendor|Renderer|VRAM|Driver):)|Begin MonoManager|-\sCompleted\sreload|<RI>\sInitializing\sinput\.<RI>|Facepunch\.Steamworks|InitializingGalaxyPeer\s|Initializing\sGalaxyPeer|Signing\suser\sin|Info\/GameAnalytics:.+/;
const REGEX_WARNING = /^Fallback\shandler\scould\snot\sload\slibrary\s(.+)$/;

const TYPE_LOGIN = 'login';
const TYPE_UNKNOWN = 'unknown';
const TYPE_LOG = 'log';
const TYPE_WARNING = 'warning';
const TYPE_PROGRESS = 'progress';
const TYPE_PROGRESS_START = 'progress_start';

const isJSON = string => {
    try {
        JSON.parse(string);
        return true;
    } catch (e) {}

    return false;

}


const loginProcessor = {
    supports: row =>  REGEX_LOGIN.test(row),
    process: row => {
        const matches = row.match(REGEX_LOGIN);

        return {
            type: TYPE_LOGIN,
            name: matches[1],
        }
    }
};

const logProcessor = {
    supports: row => REGEX_TYPE_LOG.test(row),
    process: row => ({
        type: TYPE_LOG,
        content: row.trim().replace(/\s{2,}/g, ' '),
    }),
};

const warningProcessor = {
    supports: row => REGEX_WARNING.test(row),
    process: row => {
        const matches = row.match(REGEX_WARNING);

        return {
            type: TYPE_WARNING,
            contents: matches[1],
        }
    },
};

const progressTypeProcessor = {
    supports: row => row.trim() === 'CLOUD PROGRESS:' || row.trim() === 'LOCAL PROGRESS:',
    process: row => ({
        local: row.trim() === 'LOCAL PROGRESS:',
        type: TYPE_PROGRESS_START,
    }),
};

const progressProcessor = {
    supports: (row, prev) => prev.type === TYPE_PROGRESS_START,
    process: row => ({
        data: JSON.parse(row),
        type: TYPE_PROGRESS,
    }),
};


const unknownRowProcessor = {
    supports: () => true,
    process: row => ({
        type: TYPE_UNKNOWN,
        content: row,
    }),
};

const processors = [loginProcessor, logProcessor, warningProcessor, progressTypeProcessor, progressProcessor, unknownRowProcessor];