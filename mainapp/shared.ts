export type spawn = {
    name: string // Spawn name
    traits: number[] // This spawn's traits by numeric ID, same format as collections.
    about: string // Anything the user wants to note about the spawn.
    history: string // History of ownership, trading, etc.
}

export type storage = {
    collections: number[],
    spawn: spawn[],
    usernotes: string
}

const LOCALSTORAGEITEM = 'auntbeckytracker'

/** The working memory that gets saved to local storage. */
export let storageData: storage = {
    collections: [],
    spawn: [],
    usernotes: ""
};


export function saveLocalStorage(): void {
    localStorage.setItem(LOCALSTORAGEITEM, JSON.stringify(storageData));
}

export function reloadLocalStorage(): storage {
    const loaded = localStorage.getItem(LOCALSTORAGEITEM);
    if (loaded) {
        storageData = JSON.parse(loaded);

        // Fault detection and attempted repair.
        if (typeof storageData !== 'object'
            || !storageData.collections || !Array.isArray(storageData.collections)
            || !storageData.spawn || !Array.isArray(storageData.spawn)
            || storageData.usernotes === undefined || storageData.usernotes === null)
        {
            const reconstructedData: storage = {
                collections: [],
                spawn: [],
                usernotes: '' + (storageData.usernotes ?? '')
            };

            if (storageData?.collections && Array.isArray(storageData.collections)) {
                for (let entry of storageData.collections) {
                    reconstructedData.collections.push(+entry);
                }
            }

            if (storageData?.spawn && Array.isArray(storageData.spawn)) {
                for (let i = 0; i < storageData.spawn.length; i++) {
                    const reconstructedSpawn: spawn = {
                        name: '' + (storageData.spawn[i].name ?? ''),
                        about: '' + (storageData.spawn[i].about ?? ''),
                        history: '' + (storageData.spawn[i].history ?? ''),
                        traits: storageData.spawn[i].traits?.map(o => +o) ?? []
                    };

                    reconstructedData.spawn.push(reconstructedSpawn);
                }
            }
        }
    }

    return storageData;
}