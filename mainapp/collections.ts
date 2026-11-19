import * as traits from "./Data/Traits";
import * as aptitudes from "./Data/Aptitudes";
import { achievements } from "./Data/Achievements";
import { saveLocalStorage, storageData } from "./shared";

const ID_PREFIX = 'chkbx';
type entryType = { name: string, ID: number }

const exportButton = document.createElement('A') as HTMLAnchorElement;
exportButton.id = 'button-export';
exportButton.download = "Aunt Becky Tracker.txt";
exportButton.textContent = 'Export';
exportButton.href = "data:text/plain;charset=UTF-8,"
const checkboxes = document.createElement('DIV') as HTMLDivElement;
checkboxes.id = 'page-checkboxes';

/** Configures the tab with localstorage. */
export function loadTab(content: 'traits'|'aptitudes'|'achievements'): HTMLElement[] {
    const elements: HTMLElement[] = [];

    const pageDescription = document.createElement('P') as HTMLParagraphElement;
    pageDescription.textContent = 'This is a personal tracker you can use to keep track of your achievements in the Spawn of Aunt Becky ARPG! You can also reach out on the discord to ask about updates, changes, or give feedback. I try to keep it up to date when I can!';

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

    importExportContainer.replaceChildren(importButton, exportButton);
    elements.push(importExportContainer);

    switch (content) {
        case 'traits':
            checkboxes.replaceChildren(
                pageDescription,
                createSection('Common Traits', traits.traitsCommon),
                createSection('Rare Traits', traits.traitsRare),
                createSection('Eldritch Traits', traits.traitsEldritch));
            break;
        case 'aptitudes':
            checkboxes.replaceChildren(
                pageDescription,
                createSection('Rare Aptitudes', aptitudes.aptitudesRare),
                createSection('Rare Eldritch Aptitudes', aptitudes.aptitudesRareEldritch));
            break;
        case 'achievements':
        default:
            checkboxes.replaceChildren(pageDescription, createSection('Achievements', achievements));
            break;
    }

    elements.push(checkboxes);

    importFrom(storageData.collections);
    updateExportData();

    return elements;
}

/** Creates a named section of checkboxes. */
function createSection(title: string, array: entryType[]): HTMLDivElement {
    const sectionContainer = document.createElement('DIV') as HTMLDivElement;
    sectionContainer.className = 'section';

    const titleElement = document.createElement('H2') as HTMLHeadingElement;
    titleElement.textContent = title;
    sectionContainer.appendChild(titleElement);

    for (const entry of array) {
        const chkbx = document.createElement('INPUT') as HTMLInputElement;
        chkbx.id = ID_PREFIX + entry.ID;
        chkbx.type = "checkbox";
        chkbx.addEventListener('click', () => onCheckboxClicked(chkbx, entry));

        const lbl = document.createElement('LABEL') as HTMLLabelElement;
        lbl.htmlFor = ID_PREFIX + entry.ID;
        lbl.textContent = entry.name;

        const row = document.createElement('DIV') as HTMLDivElement;
        row.className = 'row';
        row.append(lbl, chkbx);
        sectionContainer.append(row);
    }

    return sectionContainer;
}

function onCheckboxClicked(chkbx: HTMLInputElement, entry: entryType) {
    if (chkbx.checked !== storageData.collections.includes(entry.ID)) {
        if (chkbx.checked) {
            storageData.collections.push(entry.ID);
        } else {
            const index = storageData.collections.indexOf(entry.ID);
            storageData.collections.splice(index, 1);
        }
    }

    saveLocalStorage();
    updateExportData();
}

/** Converts all data to a legible list where each entry is like "#21 Invisibility". */
function exportToString() {
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

    // Sort numerically so "#1" is before "#10"(key === keyInTabs)
    const collator = new Intl.Collator([], {numeric: true});
    unsorted.sort((a, b) => collator.compare(a, b));

    return unsorted.join('\n');
}

/** Edits the data of every checkbox to match the format like "#21 Invisibility".
  * Only the IDs matter. */
function importFrom(data: string|number[]) {
    let ids: number[];
    if (typeof data === 'string') {
        ids = data.split('\n')
            .map(entry => entry.substring(1).match('\\d*'))
            .filter(entry => entry)
            .map(entry => Number.parseInt(entry![0]) - 1);
    } else {
        ids = data
    }

    storageData.collections = ids;

    checkboxes.querySelectorAll('.row').forEach(row => {
        const chkbx = (row as HTMLDivElement).querySelector('input') as HTMLInputElement;
        const id = Number.parseInt(chkbx.id.substring(ID_PREFIX.length));
        chkbx.checked = ids.includes(id);
    });
    saveLocalStorage();
}

/** Updates the export data, usually called whenever a related checkbox changes. */
function updateExportData(): void {
    exportButton.href = 'data:text/plain;charset=UTF-8,' + encodeURIComponent(exportToString());
}