import * as traits from "./Data/Traits";
import * as aptitudes from "./Data/Aptitudes";
import { achievements } from "./Data/Achievements";
import { entryType, saveLocalStorage, storageData } from "./shared";
import { importFrom, updateExportData } from "./main";

const ID_PREFIX = 'chkbx';

const checkboxes = document.createElement('DIV') as HTMLDivElement;
checkboxes.id = 'page-checkboxes';

/** Configures the tab with localstorage. */
export function loadTab(content: 'traits'|'aptitudes'|'achievements'): HTMLElement[] {
    const elements: HTMLElement[] = [];

    const collectionDescription = document.createElement('P') as HTMLParagraphElement;
    collectionDescription.id = "in-page-description";

    switch (content) {
        case 'traits':
            collectionDescription.textContent = "A catch-em-all tracker for the traits you've had with a spawn before, including dead/traded ones.";
            checkboxes.replaceChildren(
                collectionDescription,
                createSection('Common Traits', traits.traitsCommon),
                createSection('Rare Traits', traits.traitsRare),
                createSection('Eldritch Traits', traits.traitsEldritch));
            break;
        case 'aptitudes':
            collectionDescription.textContent = "A catch-em-all tracker for the aptitudes you've had with a spawn before, including dead/traded ones.";
            checkboxes.replaceChildren(
                collectionDescription,
                createSection('Rare Aptitudes', aptitudes.aptitudesRare),
                createSection('Rare Eldritch Aptitudes', aptitudes.aptitudesRareEldritch));
            break;
        case 'achievements':
        default:
            collectionDescription.textContent = "Some goals you might wish to track, for fun!";
            checkboxes.replaceChildren(collectionDescription, createSection('Achievements', achievements));
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

/** Edits the data of every checkbox to match the format like "#21 Invisibility".
  * Only the IDs matter. */
export function updateWithImport() {
    checkboxes.querySelectorAll('.row').forEach(row => {
        const chkbx = (row as HTMLDivElement).querySelector('input') as HTMLInputElement;
        if (chkbx) {
            const id = Number.parseInt(chkbx.id.substring(ID_PREFIX.length));
            chkbx.checked = storageData.collections.includes(id);
        }
    });
    saveLocalStorage();
}