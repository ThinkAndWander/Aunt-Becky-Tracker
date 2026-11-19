import { saveLocalStorage, storageData } from "./shared";

/** Configures the tab with localstorage. */
export function loadTab(): HTMLElement[] {
    const elements: HTMLElement[] = [];

    const trackingDescription = document.createElement('P') as HTMLParagraphElement;
    trackingDescription.textContent = 'Notekeeping for everything.'
    trackingDescription.id = "in-page-description";

    const numberTrackingContainer = document.createElement('DIV') as HTMLDivElement;
    numberTrackingContainer.id = 'tracking-number-container';

    [
        {text: 'Cradle points', id: 'cradle', key: 'cradlePoints' satisfies keyof typeof storageData },
        {text: 'Spawn tickets', id: 'spawn', key: 'spawnTickets' satisfies keyof typeof storageData },
        {text: 'Growth tickets', id: 'growth', key: 'growthTickets' satisfies keyof typeof storageData }
        // Be sure to update change event in foreach loop below if you add more.
    ].forEach(entry => {
        const container = document.createElement('SPAN') as HTMLSpanElement;
        container.className = 'tracking-control';

        const lbl = document.createElement('LABEL') as HTMLLabelElement;
        lbl.className = 'tracking-label';
        lbl.textContent = entry.text;
        lbl.htmlFor = `tracking-${entry.id}`;
        container.appendChild(lbl);

        const spinbox = document.createElement('INPUT') as HTMLInputElement;
        spinbox.type = 'number';
        spinbox.min = '0';
        spinbox.defaultValue = `${storageData[entry.key as keyof typeof storageData] ?? 0}`;
        spinbox.id = `tracking-${entry.id}`;
        spinbox.addEventListener('change', () => {
            if (entry.id === 'cradle') { storageData.cradlePoints = spinbox.valueAsNumber; }
            else if (entry.id === 'spawn') { storageData.spawnTickets = spinbox.valueAsNumber; }
            else if (entry.id === 'growth') { storageData.growthTickets = spinbox.valueAsNumber; }
            saveLocalStorage();
        });
        container.appendChild(spinbox);
        numberTrackingContainer.appendChild(container);
    });

    const voucherOtherLabel = document.createElement('LABEL') as HTMLLabelElement;
    voucherOtherLabel.className = 'tracking-label div';
    voucherOtherLabel.textContent = 'Vouchers/other'
    voucherOtherLabel.htmlFor = "voucher-other";

    const voucherOther = document.createElement('TEXTAREA') as HTMLTextAreaElement;
    voucherOther.id = "voucher-other";
    voucherOther.placeholder = "Use this space to keep track of vouchers and other usable benefits.";
    voucherOther.addEventListener('input', () => {
        storageData.vouchersAndOther = voucherOther.value;
        saveLocalStorage();
    });

    const userNotesLabel = document.createElement('LABEL') as HTMLLabelElement;
    userNotesLabel.className = 'tracking-label div';
    userNotesLabel.textContent = 'Notes'
    userNotesLabel.htmlFor = "user-notes";

    const userNotes = document.createElement('TEXTAREA') as HTMLTextAreaElement;
    userNotes.id = "user-notes";
    userNotes.placeholder = "Use this space to keep notes about your masterlist spawn, owed art, etc.";
    userNotes.addEventListener('input', () => {
        storageData.usernotes = userNotes.value;
        saveLocalStorage();
    });

    elements.push(
        trackingDescription,
        numberTrackingContainer,
        voucherOtherLabel,
        voucherOther,
        userNotesLabel,
        userNotes
    );

    requestAnimationFrame(() => {
        populateFromStorage();
    });

    return elements;
}

/** Populates fields based on storage data. */
function populateFromStorage() {
    if (storageData.usernotes !== '') {
        document.getElementById('user-notes')!.textContent = storageData.usernotes;
    }
    if (storageData.vouchersAndOther !== '') {
        document.getElementById('voucher-other')!.textContent = storageData.vouchersAndOther;
    }
}

export function updateWithImport() {
    const cradle = (document.getElementById('tracking-cradle') as HTMLInputElement);
    const spawn = (document.getElementById('tracking-spawn') as HTMLInputElement);
    const growth = (document.getElementById('tracking-growth') as HTMLInputElement);
    const voucherOther = (document.getElementById('voucher-other') as HTMLTextAreaElement);
    const userNotes = (document.getElementById('user-notes') as HTMLTextAreaElement);
    if (cradle) cradle.value = `${storageData.cradlePoints}`;
    if (spawn) spawn.value = `${storageData.spawnTickets}`;
    if (growth) growth.value = `${storageData.growthTickets}`;
    if (voucherOther) voucherOther.value = storageData.vouchersAndOther;
    if (userNotes) userNotes.value = storageData.usernotes;
}