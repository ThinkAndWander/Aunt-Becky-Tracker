export type storage = {
    collections: number[],
}

const LOCALSTORAGEITEM = 'auntbeckytracker'

/** The working memory that gets saved to local storage. */
export let storageData: storage = {
    collections: [],
};


export function saveLocalStorage(): void {
    localStorage.setItem(LOCALSTORAGEITEM, JSON.stringify(storageData));
}

export function reloadLocalStorage(): storage {
    const loaded = localStorage.getItem(LOCALSTORAGEITEM);
    if (loaded) {
        storageData = JSON.parse(loaded);
    }

    return storageData;
}