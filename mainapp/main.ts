import * as traits from "./Data/Traits";
import * as aptitudes from "./Data/Aptitudes";
import { achievements } from "./Data/Achievements";

const ID_PREFIX = 'chkbx';
const LOCALSTORAGEITEM = 'auntbeckytracker'

const page = document.createElement('DIV') as HTMLDivElement;
page.id = 'page'

const pageTitle = document.createElement('H1') as HTMLHeadingElement;
pageTitle.textContent = 'Spawn of Aunt Becky Tracker';

const pageDescription = document.createElement('P') as HTMLParagraphElement;
pageDescription.textContent = 'This is a personal tracker you can use to keep track of your achievements in the Spawn of Aunt Becky ARPG! You can also reach out on the discord to ask about updates, changes, or give feedback. I try to keep it up to date when I can!';

page.appendChild(pageTitle);

const importExportContainer = document.createElement('DIV') as HTMLDivElement;
importExportContainer.id = 'page-exporting';

const importButton = document.createElement('INPUT') as HTMLInputElement;
importButton.id = 'button-import';
importButton.type = 'file';
importButton.textContent = 'Import';
importButton.addEventListener("change", () => {
    if (importButton.files) {
        const file = importButton.files[0];
        file.text().then(data => importFromString(data));
    }
});

const exportButton = document.createElement('A') as HTMLAnchorElement;
exportButton.id = 'button-export';
exportButton.download = "Aunt Becky Status.txt";
exportButton.textContent = 'Export';

importExportContainer.appendChild(importButton);
importExportContainer.appendChild(exportButton);
page.appendChild(importExportContainer);

const checkboxes = document.createElement('DIV') as HTMLDivElement;
checkboxes.id = 'page-checkboxes';
checkboxes.appendChild(pageDescription);
checkboxes.appendChild(createSection('Common Traits', traits.traitsCommon));
checkboxes.appendChild(createSection('Rare Traits', traits.traitsRare));
checkboxes.appendChild(createSection('Eldritch Traits', traits.traitsEldritch));
checkboxes.appendChild(createSection('Rare Aptitudes', aptitudes.aptitudesRare));
checkboxes.appendChild(createSection('Rare Eldritch Aptitudes', aptitudes.aptitudesRareEldritch));
checkboxes.appendChild(createSection('Achievements', achievements));

page.appendChild(checkboxes);

// Loads from Localstorage, if any.
const data = localStorage.getItem(LOCALSTORAGEITEM);
if (data) {
    importFromString(data);
    updateExportData(true);
}

document.body.appendChild(page);

/** Creates a named section of checkboxes. */
function createSection(title: string, array: { name: string, ID: number }[]): HTMLDivElement {
    const sectionContainer = document.createElement('DIV') as HTMLDivElement;
    sectionContainer.className = 'section';

    const titleElement = document.createElement('H2') as HTMLHeadingElement;
    titleElement.textContent = title;
    sectionContainer.appendChild(titleElement);

    for (const trait of array) {
        const chkbx = document.createElement('INPUT') as HTMLInputElement;
        chkbx.id = ID_PREFIX + trait.ID;
        chkbx.type = "checkbox";
        chkbx.addEventListener('click', () => updateExportData);

        const lbl = document.createElement('LABEL') as HTMLLabelElement;
        lbl.htmlFor = ID_PREFIX + trait.ID;
        lbl.textContent = trait.name;

        const row = document.createElement('DIV') as HTMLDivElement;
        row.className = 'row';
        row.append(lbl, chkbx);
        sectionContainer.append(row);
        row.addEventListener('click', () => { // Make it easier to click.
            chkbx.checked = !chkbx.checked;
            updateExportData()
        });
    }

    return sectionContainer;
}

/** Converts all data to a legible list where each entry is like "#21 Invisibility". */
function exportToString() {
    const list: { name: string, ID: number }[] = [];
    checkboxes.querySelectorAll('.row').forEach(el => {
        const row = el as HTMLDivElement;

        if (!(row.querySelector('input') as HTMLInputElement).checked) {
            return;
        }

        const idString = (row.querySelector('input') as HTMLInputElement).id;
        const id = Number.parseInt(idString.substring(ID_PREFIX.length));
        const name = (row.querySelector('label') as HTMLLabelElement).textContent;
        list.push({ name: name, ID: id });
    });

    const unsorted = list.map(entry => `#${entry.ID + 1} ${entry.name}`)

    // Sort numerically so "#1" is before "#10"
    const collator = new Intl.Collator([], {numeric: true});
    unsorted.sort((a, b) => collator.compare(a, b));

    return unsorted.join('\n');
}

/** Edits the data of every checkbox to match the format like "#21 Invisibility".
  * Only the IDs matter. */
function importFromString(data: string) {
    const ids = data.split('\n')
        .map(entry => entry.substring(1).match('\\d*'))
        .filter(entry => entry)
        .map(entry => Number.parseInt(entry![0]));

    checkboxes.querySelectorAll('.row').forEach(el => {
        const row = el as HTMLDivElement;
        const chkbx = row.querySelector('input') as HTMLInputElement;
        const idString = chkbx.id;
        const id = Number.parseInt(idString.substring(ID_PREFIX.length));

        chkbx.checked = ids.includes(id + 1);
    });
}

/** Updates the export data, usually called whenever a related checkbox changes. */
function updateExportData(skipLocalStorage?: boolean): void {
    const exportstring = exportToString();

    if (!skipLocalStorage) {
        localStorage.setItem(LOCALSTORAGEITEM, exportstring);
    }

    exportButton.href = 'data:text/plain;charset=UTF-8,' + encodeURIComponent(exportstring);
}