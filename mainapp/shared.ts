export type storage = {
    collections: number[],
    cradlePoints: number,
    spawnTickets: number,
    growthTickets: number,
    vouchersAndOther: string,
    markedOffRewards: {
        dna5_1spawn: boolean,
        dna10_1growth: boolean,
        dna25_1spawn: boolean,
        dna50_1growth: boolean,
        dna75_1spawn: boolean,
        dna100_1growth_1spawn: boolean,
        dna150_2growth_1spawn: boolean,
        dna200_3growth_2spawn_1EldritchAptitude: boolean,
    },
    usernotes: string
}

export type entryType = { name: string, ID: number }

const LOCALSTORAGEITEM = 'auntbeckytracker'

/** The working memory that gets saved to local storage. */
export let storageData: storage = {
    collections: [],
    cradlePoints: 0,
    spawnTickets: 0,
    growthTickets: 0,
    vouchersAndOther: "",
    markedOffRewards: {
        dna5_1spawn: false,
        dna10_1growth: false,
        dna25_1spawn: false,
        dna50_1growth: false,
        dna75_1spawn: false,
        dna100_1growth_1spawn: false,
        dna150_2growth_1spawn: false,
        dna200_3growth_2spawn_1EldritchAptitude: false,
    },
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
        if (typeof storageData !== 'object' ||
            !Array.isArray(storageData.collections)
            || storageData.usernotes === undefined
            || storageData.usernotes === null)
        {
            const reconstructedData: storage = {
                collections: [],
                cradlePoints: 0,
                spawnTickets: 0,
                growthTickets: 0,
                vouchersAndOther: '' + (storageData.vouchersAndOther ?? ''),
                markedOffRewards: {
                    dna5_1spawn: false,
                    dna10_1growth: false,
                    dna25_1spawn: false,
                    dna50_1growth: false,
                    dna75_1spawn: false,
                    dna100_1growth_1spawn: false,
                    dna150_2growth_1spawn: false,
                    dna200_3growth_2spawn_1EldritchAptitude: false,
                },
                usernotes: '' + (storageData.usernotes ?? '')
            };

            if (storageData?.collections && Array.isArray(storageData.collections)) {
                for (let entry of storageData.collections) {
                    reconstructedData.collections.push(+entry);
                }
            }

            storageData = reconstructedData;
        }
    }

    return storageData;
}