import * as traits from "./Data/Traits";
import * as aptitudes from "./Data/Aptitudes";
import { achievements } from "./Data/Achievements";
import * as collections from './collections';
import * as tracking from './tracking';
import { entryType, reloadLocalStorage, saveLocalStorage, storageData } from './shared';

const tabs = {
    Track: {
        func: () => tracking.loadTab(),
        btn: document.createElement('BUTTON') as HTMLButtonElement,
        update: tracking.updateWithImport
    },
    Traits: {
        func: () => collections.loadTab('traits'),
        btn: document.createElement('BUTTON') as HTMLButtonElement,
        update: collections.updateWithImport
    },
    Aptitudes: {
        func: () => collections.loadTab('aptitudes'),
        btn: document.createElement('BUTTON') as HTMLButtonElement,
        update: collections.updateWithImport
    },
    Achievements: {
        func: () => collections.loadTab('achievements'),
        btn: document.createElement('BUTTON') as HTMLButtonElement,
        update: collections.updateWithImport
    }
    // New tabs go here
}

// The main page
const page = document.createElement('DIV') as HTMLDivElement;
page.id = 'page'

const pageTitle = document.createElement('H1') as HTMLHeadingElement;
pageTitle.textContent = 'Spawn of Aunt Becky Tracker';
const pageDescription = document.createElement('P') as HTMLParagraphElement;
pageDescription.id = 'page-description';
pageDescription.textContent = 'This is a personal tracker you can use to keep track of your achievements in the Spawn of Aunt Becky ARPG! You can also reach out on the discord to ask about updates, changes, or give feedback. I try to keep it up to date when I can!';

const tabsContainer = document.createElement('DIV') as HTMLDivElement;
tabsContainer.className = 'tabs';

const tabbedContentContainer = document.createElement('DIV') as HTMLDivElement;
tabbedContentContainer.id = 'page-content';

// Populate the tabs.
for (let key of Object.keys(tabs)) {
    const tab = tabs[key as keyof typeof tabs].btn;
    tab.className = 'tab';
    tab.textContent = key;
    tab.addEventListener('click', () => loadTab(key as keyof typeof tabs));
    tabsContainer.append(tab)
}

page.appendChild(pageTitle);
page.appendChild(pageDescription);
page.appendChild(tabsContainer);

const importExportSection = document.createElement('H2') as HTMLParagraphElement;
importExportSection.id = "page-exporting-description";
importExportSection.textContent = "Import/export (normal saving is automatic)";

const importExportContainer = document.createElement('DIV') as HTMLDivElement;
importExportContainer.id = 'page-exporting';

const importButton = document.createElement('INPUT') as HTMLInputElement;
importButton.id = 'button-import';
importButton.type = 'file';
importButton.textContent = 'Import';
importButton.addEventListener("change", () => {
    if (importButton.files) {
        const file = importButton.files[0];
        file.text().then(data => importFrom(data));
    }
});

export const exportButton = document.createElement('A') as HTMLAnchorElement;
exportButton.id = 'button-export';
exportButton.download = "Aunt Becky Tracker.txt";
exportButton.textContent = 'Export';
exportButton.href = "data:text/plain;charset=UTF-8,"

importExportContainer.replaceChildren(importButton, exportButton);
page.appendChild(importExportSection);
page.appendChild(importExportContainer);

const line = document.createElement('HR');
line.className = 'line';
page.appendChild(line);
page.appendChild(tabbedContentContainer);
reloadLocalStorage(); // loads ahead-of-time if it exists
loadTab('Track'); // default open tab
document.body.appendChild(page);

/** Loads, replacing the contents on page. */
function loadTab(keyInTabs: keyof typeof tabs) {
    for (let key of Object.keys(tabs)) {
        if (key === keyInTabs) {
            tabs[key as keyof typeof tabs].btn.className = 'tab active';
        } else {
            tabs[key as keyof typeof tabs].btn.className = 'tab';
        }
    }

    const newContent = tabs[keyInTabs].func();
    tabbedContentContainer.replaceChildren(...newContent);
}

/** Converts all data to a legible list where each entry is like "#21 Invisibility". */
function exportCollection(): string {
    const list: entryType[] = [];
    const all = [
        ...traits.traitsCommon,
        ...traits.traitsRare,
        ...traits.traitsEldritch,
        ...aptitudes.aptitudesRare,
        ...aptitudes.aptitudesRareEldritch,
        ...achievements
    ];

    storageData.collections.forEach(id => {
        all.some(entry => {
            if (entry.ID === id) {
                list.push(entry);
                return true;
            }

            return false;
        });
    });

    const unsorted = list.map(entry => `#${entry.ID + 1} ${entry.name}`)

    // Sort numerically so "#1" is before "#10"
    const collator = new Intl.Collator([], {numeric: true});
    unsorted.sort((a, b) => collator.compare(a, b));

    // Add non-numeric entries, bounded by an unused character for easy importing later.
    unsorted.push(`\u00ADcradlePoints = ${storageData.cradlePoints}\u00AD`);
    unsorted.push(`\u00ADspawnTickets = ${storageData.spawnTickets}\u00AD`);
    unsorted.push(`\u00ADgrowthTickets = ${storageData.growthTickets}\u00AD`);
    unsorted.push(`\u00ADvouchersAndOther = ${storageData.vouchersAndOther}\u00AD`);
    unsorted.push(`\u00ADusernotes = ${storageData.usernotes}\u00AD`);
    return unsorted.join('\n');
}

/** Updates the export data. Call when any related data changes. */
export function updateExportData(): void {
    exportButton.href = 'data:text/plain;charset=UTF-8,' + encodeURIComponent(exportCollection());
}

/** Edits the data of every checkbox to match the format like "#21 Invisibility".
  * Only the IDs matter. */
export function importFrom(data: string|number[]) {
    let ids: number[];
    if (typeof data === 'string') {
        // Parse the numeric entries like "#21 Invisibility" for ids.
        ids = data.split('\n')
            .filter(entry => entry.startsWith('#'))
            .map(entry => entry.substring(1).match('\\d*'))
            .filter(entry => entry)
            .map(entry => Number.parseInt(entry![0]) - 1); // export started at 1, so subtract it.

        // Non-numeric entries start and end with a special character.
        // This makes it easy to parse them even across lines.
        data.split('\u00AD').filter(str => str !== '').forEach(entry => {
            const sides = entry.split('=', 2);
            if (sides.length !== 2) { return; } // Unmatching lines are erroneous.

            const key = sides[0].trim().toLowerCase();
            const value = sides[1].trim();

            switch (key) {
                case 'cradlepoints':
                    storageData.cradlePoints = Number.parseInt(value);
                    break;
                case 'spawntickets':
                    storageData.spawnTickets = Number.parseInt(value);
                    break;
                case 'growthtickets':
                    storageData.growthTickets = Number.parseInt(value);
                    break;
                case 'vouchersandother':
                    storageData.vouchersAndOther = value;
                    break;
                case 'usernotes':
                    storageData.usernotes = value;
                    break;
                default:
                    // failure, just skip this entry.
                    return;
            }
        });
    } else {
        ids = data
    }

    storageData.collections = ids;

    // Allow all tab side-effects to run.
    Object.keys(tabs).forEach(key => {
        tabs[key as keyof typeof tabs].update();
    })

    saveLocalStorage();
}