var mainapp = (function (exports) {
    'use strict';

    const traitsCommon = [
        { name: 'Semi-translucency', ID: 0 },
        { name: 'Eyes 4-7', ID: 1 },
        { name: 'Additional digits ~7', ID: 2 },
        { name: 'Digit removal', ID: 3 },
        { name: 'Long face', ID: 4 },
        { name: 'Petal-split mouth', ID: 5 },
        { name: 'Tentacles 2-4', ID: 7 },
        { name: 'Tentacle hooks/barbs/harpoons', ID: 8 },
        { name: 'Stinging tendrils 1-10', ID: 9 },
        { name: 'Animal ears 2', ID: 10 },
        { name: 'Horns/Antlers 1-2', ID: 11 },
        { name: 'Scales', ID: 12 },
        { name: 'Wings 2', ID: 13 },
        { name: 'Simple markings', ID: 14 },
        { name: 'Serrated spinal spikes', ID: 15 },
        { name: 'Spinal spike shape change', ID: 16 },
        { name: 'Iregular spinal spikes', ID: 17 },
        { name: 'Bodily horns/spurs', ID: 18 },
        { name: 'Quills', ID: 19 },
        { name: 'Tail stinger', ID: 20 },
        { name: 'Spades 1-4', ID: 21 },
        { name: 'Oversized tail', ID: 22 },
        { name: 'Simple jewelry', ID: 23 },
        { name: 'Large 8-20ft', ID: 24 },
    ];
    const traitsRare = [
        { name: 'Transparency', ID: 25 },
        { name: 'Rare coloration', ID: 26 },
        { name: 'Colored saliva', ID: 27 },
        { name: 'Metallic sclera', ID: 28 },
        { name: 'Black sclera', ID: 29 },
        { name: 'Unnatural pupils', ID: 30 },
        { name: 'Bug eyes', ID: 32 },
        { name: 'Metallic blood color', ID: 33 },
        { name: 'Glowing blood', ID: 163 },
        { name: 'Colored flesh', ID: 34 },
        { name: 'Additional antennae 1-5', ID: 35 },
        { name: 'Antlers/horns 3-10', ID: 36 },
        { name: 'Animal ears 3-10', ID: 37 },
        { name: 'Insect mandibles 2', ID: 38 },
        { name: 'Zipper mouth body', ID: 39 },
        { name: 'Iridescence', ID: 40 },
        { name: 'Dark, glittery spines', ID: 41 },
        { name: 'Fur or feathers', ID: 42 },
        { name: 'Hair', ID: 43 },
        { name: 'Chitin', ID: 44 },
        { name: 'Bone growths', ID: 45 },
        { name: 'Slimy excretions', ID: 46 },
        { name: 'Sucker-like mouths 1-10', ID: 47 },
        { name: 'Tentacles 5-12', ID: 48 },
        { name: 'Tentacle-tip petal mouths', ID: 49 },
        { name: 'Stinging tendrils 11+', ID: 50 },
        { name: 'Additional limbs 1-4', ID: 51 },
        { name: 'Useless body part', ID: 52 },
        { name: 'Permanent open wounds', ID: 53 },
        { name: 'Limb removal', ID: 54 },
        { name: 'Tail removal', ID: 55 },
        { name: 'Spades 5+', ID: 56 },
        { name: 'Wings 3-4', ID: 57 },
        { name: 'Split tail 1-4', ID: 58 },
        { name: 'Additional tails 1-4', ID: 59 },
        { name: 'Massive tail', ID: 60 },
        { name: 'Branching spinal spikes', ID: 61 },
        { name: 'Bodily horns/spurs', ID: 62 },
        { name: 'Quills', ID: 63 },
        { name: 'Giant 20-100ft', ID: 64 },
    ];
    const traitsEldritch = [
        { name: 'Semi-translucency', ID: 65 },
        { name: 'Transparency', ID: 66 },
        { name: 'Albinism', ID: 67 },
        { name: 'Eyestalk growths', ID: 69 },
        { name: 'Additional heads', ID: 70 },
        { name: 'Additional antennae 6+', ID: 71 },
        { name: 'Antennae removal', ID: 72 },
        { name: 'Lantern lure growths', ID: 76 },
        { name: 'Zipper mouths', ID: 78 },
        { name: 'Sucker-like mouths 11+', ID: 79 },
        { name: 'Additional mouths', ID: 80 },
        { name: 'Size-shifting', ID: 81 },
        { name: 'Shapeshifting', ID: 82 },
        { name: 'Additional torsos', ID: 86 },
        { name: 'Luminous body', ID: 87 },
        { name: 'Luminous markings', ID: 88 },
        { name: 'Shifting markings', ID: 89 },
        { name: 'Biolectricity', ID: 90 },
        { name: 'Amorphous growths', ID: 91 },
        { name: 'Writhing growths', ID: 92 },
        { name: 'Glitching effects', ID: 93 },
        { name: 'Blurred or hazy or indistinct', ID: 94 },
        { name: 'Body parts of other parts', ID: 95 },
        { name: 'Animal body parts', ID: 96 },
        { name: 'Crystal/petrified body parts', ID: 97 },
        { name: 'Invertebrate body', ID: 98 },
        { name: 'Oozing/melting body', ID: 99 },
        { name: 'Shell', ID: 100 },
    ];

    const aptitudesRare = [
        { name: 'Flight', ID: 101 },
        { name: 'Hypnosis', ID: 102 },
        { name: 'Telekinesis', ID: 103 },
        { name: 'Lesser elemental magic', ID: 112 },
        { name: 'Afterimage/cloning', ID: 104 },
        { name: 'Fog summoning/emission', ID: 105 },
        { name: 'Veil of darkness', ID: 106 },
        { name: 'Aura of unease', ID: 107 },
        { name: 'Basic illusion magic', ID: 108 },
        { name: 'Smoke manipulation', ID: 109 },
        { name: 'Heat haze', ID: 110 },
        { name: 'Minor time travel', ID: 111 },
    ];
    const aptitudesRareEldritch = [
        { name: 'Division', ID: 113 },
        { name: 'Eldritch Nest', ID: 114 },
        { name: 'Foresight', ID: 115 },
        { name: 'Clairvoyance', ID: 148 },
        { name: 'Inflict Greater Madness', ID: 116 },
        { name: 'Incite Worship', ID: 117 },
        { name: 'Familiarization', ID: 118 },
        { name: 'Memory Manipulation', ID: 119 },
        { name: 'Inflict Greater Transform', ID: 120 },
        { name: 'Mutative Touch', ID: 121 },
        { name: 'Shatter', ID: 122 },
        { name: 'Dissect', ID: 123 },
        { name: 'Greater Animal Mimicry', ID: 124 },
        { name: 'Human Mimicry', ID: 125 },
        { name: 'Abiotic Mimicry', ID: 126 },
        { name: 'Vaporization', ID: 127 },
        { name: 'Greater Weather Manipulation', ID: 128 },
        { name: 'Rapid Aging Spells', ID: 129 },
        { name: 'Druidic Magic', ID: 130 },
        { name: 'Minion Creation', ID: 131 },
        { name: 'Life Drain', ID: 132 },
        { name: 'Greater Teleportation', ID: 133 },
        { name: 'Greater Elemental Magic', ID: 134 },
        { name: 'Greater Dark Magic', ID: 135 },
        { name: 'Digitization', ID: 136 },
        { name: 'Dreamwalking', ID: 137 },
        { name: 'Nightmare Manifestation', ID: 138 },
        { name: 'Fel Song', ID: 139 },
        { name: 'Summoning', ID: 140 },
        { name: 'Psionic Power', ID: 141 },
        { name: 'Demonic Contract Magic', ID: 142 },
        { name: 'Occult Magic', ID: 143 },
        { name: 'Tangible Illusion Magic', ID: 144 },
        { name: 'Plague Creation', ID: 145 },
        { name: 'Hibernation', ID: 146 },
        { name: 'AU Harvest', ID: 147 },
    ];

    const achievements = [
        { name: 'Drew Sonny', ID: 149 },
        { name: 'Drew Aunt Becky', ID: 150 },
        { name: 'Cannibalized a PC', ID: 151 },
        { name: '💎 5-Parent Spawn', ID: 152 },
        { name: 'Has eldritch horror', ID: 153 },
        { name: 'Accessed Homeland', ID: 154 },
        { name: 'Accessed a Nest', ID: 155 },
        { name: 'Feeding', ID: 156 },
        { name: 'Natural threat', ID: 157 },
        { name: 'Spotted', ID: 158 },
        { name: 'Subject of worship', ID: 159 },
        { name: 'Hunted by humans', ID: 160 },
        { name: 'Captured', ID: 161 },
        { name: 'Did a weekly prompt', ID: 162 },
    ];

    const LOCALSTORAGEITEM = 'auntbeckytracker';
    let storageData = {
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
    function saveLocalStorage() {
        localStorage.setItem(LOCALSTORAGEITEM, JSON.stringify(storageData));
    }
    function reloadLocalStorage() {
        var _a, _b;
        const loaded = localStorage.getItem(LOCALSTORAGEITEM);
        if (loaded) {
            storageData = JSON.parse(loaded);
            if (typeof storageData !== 'object' ||
                !Array.isArray(storageData.collections)
                || storageData.usernotes === undefined
                || storageData.usernotes === null) {
                const reconstructedData = {
                    collections: [],
                    cradlePoints: 0,
                    spawnTickets: 0,
                    growthTickets: 0,
                    vouchersAndOther: '' + ((_a = storageData.vouchersAndOther) !== null && _a !== void 0 ? _a : ''),
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
                    usernotes: '' + ((_b = storageData.usernotes) !== null && _b !== void 0 ? _b : '')
                };
                if ((storageData === null || storageData === void 0 ? void 0 : storageData.collections) && Array.isArray(storageData.collections)) {
                    for (let entry of storageData.collections) {
                        reconstructedData.collections.push(+entry);
                    }
                }
                storageData = reconstructedData;
            }
        }
        return storageData;
    }

    const ID_PREFIX = 'chkbx';
    const checkboxes = document.createElement('DIV');
    checkboxes.id = 'page-checkboxes';
    function loadTab$2(content) {
        const elements = [];
        const collectionDescription = document.createElement('P');
        collectionDescription.id = "in-page-description";
        switch (content) {
            case 'traits':
                collectionDescription.textContent = "A catch-em-all tracker for the traits you've had with a spawn before, including dead/traded ones.";
                checkboxes.replaceChildren(collectionDescription, createSection('Common Traits', traitsCommon), createSection('Rare Traits', traitsRare), createSection('Eldritch Traits', traitsEldritch));
                break;
            case 'aptitudes':
                collectionDescription.textContent = "A catch-em-all tracker for the aptitudes you've had with a spawn before, including dead/traded ones.";
                checkboxes.replaceChildren(collectionDescription, createSection('Rare Aptitudes', aptitudesRare), createSection('Rare Eldritch Aptitudes', aptitudesRareEldritch));
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
    function createSection(title, array) {
        const sectionContainer = document.createElement('DIV');
        sectionContainer.className = 'section';
        const titleElement = document.createElement('H2');
        titleElement.textContent = title;
        sectionContainer.appendChild(titleElement);
        for (const entry of array) {
            const chkbx = document.createElement('INPUT');
            chkbx.id = ID_PREFIX + entry.ID;
            chkbx.type = "checkbox";
            chkbx.addEventListener('click', () => onCheckboxClicked(chkbx, entry));
            const lbl = document.createElement('LABEL');
            lbl.htmlFor = ID_PREFIX + entry.ID;
            lbl.textContent = entry.name;
            const row = document.createElement('DIV');
            row.className = 'row';
            row.append(lbl, chkbx);
            sectionContainer.append(row);
        }
        return sectionContainer;
    }
    function onCheckboxClicked(chkbx, entry) {
        if (chkbx.checked !== storageData.collections.includes(entry.ID)) {
            if (chkbx.checked) {
                storageData.collections.push(entry.ID);
            }
            else {
                const index = storageData.collections.indexOf(entry.ID);
                storageData.collections.splice(index, 1);
            }
        }
        saveLocalStorage();
        updateExportData();
    }
    function updateWithImport$1() {
        checkboxes.querySelectorAll('.row').forEach(row => {
            const chkbx = row.querySelector('input');
            if (chkbx) {
                const id = Number.parseInt(chkbx.id.substring(ID_PREFIX.length));
                chkbx.checked = storageData.collections.includes(id);
            }
        });
        saveLocalStorage();
    }

    function loadTab$1() {
        const elements = [];
        const trackingDescription = document.createElement('P');
        trackingDescription.textContent = 'Notekeeping for everything.';
        trackingDescription.id = "in-page-description";
        const numberTrackingContainer = document.createElement('DIV');
        numberTrackingContainer.id = 'tracking-number-container';
        [
            { text: 'Cradle points', id: 'cradle', key: 'cradlePoints' },
            { text: 'Spawn tickets', id: 'spawn', key: 'spawnTickets' },
            { text: 'Growth tickets', id: 'growth', key: 'growthTickets' }
        ].forEach(entry => {
            var _a;
            const container = document.createElement('SPAN');
            container.className = 'tracking-control';
            const lbl = document.createElement('LABEL');
            lbl.className = 'tracking-label';
            lbl.textContent = entry.text;
            lbl.htmlFor = `tracking-${entry.id}`;
            container.appendChild(lbl);
            const spinbox = document.createElement('INPUT');
            spinbox.type = 'number';
            spinbox.min = '0';
            spinbox.defaultValue = `${(_a = storageData[entry.key]) !== null && _a !== void 0 ? _a : 0}`;
            spinbox.id = `tracking-${entry.id}`;
            spinbox.addEventListener('change', () => {
                if (entry.id === 'cradle') {
                    storageData.cradlePoints = spinbox.valueAsNumber;
                }
                else if (entry.id === 'spawn') {
                    storageData.spawnTickets = spinbox.valueAsNumber;
                }
                else if (entry.id === 'growth') {
                    storageData.growthTickets = spinbox.valueAsNumber;
                }
                saveLocalStorage();
            });
            container.appendChild(spinbox);
            numberTrackingContainer.appendChild(container);
        });
        const voucherOtherLabel = document.createElement('LABEL');
        voucherOtherLabel.className = 'tracking-label div';
        voucherOtherLabel.textContent = 'Vouchers/other';
        voucherOtherLabel.htmlFor = "voucher-other";
        const voucherOther = document.createElement('TEXTAREA');
        voucherOther.id = "voucher-other";
        voucherOther.placeholder = "Use this space to keep track of vouchers and other usable benefits.";
        voucherOther.addEventListener('input', () => {
            storageData.vouchersAndOther = voucherOther.value;
            saveLocalStorage();
        });
        const userNotesLabel = document.createElement('LABEL');
        userNotesLabel.className = 'tracking-label div';
        userNotesLabel.textContent = 'Notes';
        userNotesLabel.htmlFor = "user-notes";
        const userNotes = document.createElement('TEXTAREA');
        userNotes.id = "user-notes";
        userNotes.placeholder = "Use this space to keep notes about your masterlist spawn, owed art, etc.";
        userNotes.addEventListener('input', () => {
            storageData.usernotes = userNotes.value;
            saveLocalStorage();
        });
        elements.push(trackingDescription, numberTrackingContainer, voucherOtherLabel, voucherOther, userNotesLabel, userNotes);
        requestAnimationFrame(() => {
            populateFromStorage();
        });
        return elements;
    }
    function populateFromStorage() {
        if (storageData.usernotes !== '') {
            document.getElementById('user-notes').textContent = storageData.usernotes;
        }
        if (storageData.vouchersAndOther !== '') {
            document.getElementById('voucher-other').textContent = storageData.vouchersAndOther;
        }
    }
    function updateWithImport() {
        const cradle = document.getElementById('tracking-cradle');
        const spawn = document.getElementById('tracking-spawn');
        const growth = document.getElementById('tracking-growth');
        const voucherOther = document.getElementById('voucher-other');
        const userNotes = document.getElementById('user-notes');
        if (cradle)
            cradle.value = `${storageData.cradlePoints}`;
        if (spawn)
            spawn.value = `${storageData.spawnTickets}`;
        if (growth)
            growth.value = `${storageData.growthTickets}`;
        if (voucherOther)
            voucherOther.value = storageData.vouchersAndOther;
        if (userNotes)
            userNotes.value = storageData.usernotes;
    }

    const tabs = {
        Track: {
            func: () => loadTab$1(),
            btn: document.createElement('BUTTON'),
            update: updateWithImport
        },
        Traits: {
            func: () => loadTab$2('traits'),
            btn: document.createElement('BUTTON'),
            update: updateWithImport$1
        },
        Aptitudes: {
            func: () => loadTab$2('aptitudes'),
            btn: document.createElement('BUTTON'),
            update: updateWithImport$1
        },
        Achievements: {
            func: () => loadTab$2('achievements'),
            btn: document.createElement('BUTTON'),
            update: updateWithImport$1
        }
    };
    const page = document.createElement('DIV');
    page.id = 'page';
    const pageTitle = document.createElement('H1');
    pageTitle.textContent = 'Spawn of Aunt Becky Tracker';
    const pageDescription = document.createElement('P');
    pageDescription.id = 'page-description';
    pageDescription.textContent = 'This is a personal tracker you can use to keep track of your achievements in the Spawn of Aunt Becky ARPG! You can also reach out on the discord to ask about updates, changes, or give feedback. I try to keep it up to date when I can!';
    const tabsContainer = document.createElement('DIV');
    tabsContainer.className = 'tabs';
    const tabbedContentContainer = document.createElement('DIV');
    tabbedContentContainer.id = 'page-content';
    for (let key of Object.keys(tabs)) {
        const tab = tabs[key].btn;
        tab.className = 'tab';
        tab.textContent = key;
        tab.addEventListener('click', () => loadTab(key));
        tabsContainer.append(tab);
    }
    page.appendChild(pageTitle);
    page.appendChild(pageDescription);
    page.appendChild(tabsContainer);
    const importExportSection = document.createElement('H2');
    importExportSection.id = "page-exporting-description";
    importExportSection.textContent = "Import/export (normal saving is automatic)";
    const importExportContainer = document.createElement('DIV');
    importExportContainer.id = 'page-exporting';
    const importButton = document.createElement('INPUT');
    importButton.id = 'button-import';
    importButton.type = 'file';
    importButton.textContent = 'Import';
    importButton.addEventListener("change", () => {
        if (importButton.files) {
            const file = importButton.files[0];
            file.text().then(data => importFrom(data));
        }
    });
    const exportButton = document.createElement('A');
    exportButton.id = 'button-export';
    exportButton.download = "Aunt Becky Tracker.txt";
    exportButton.textContent = 'Export';
    exportButton.href = "data:text/plain;charset=UTF-8,";
    importExportContainer.replaceChildren(importButton, exportButton);
    page.appendChild(importExportSection);
    page.appendChild(importExportContainer);
    const line = document.createElement('HR');
    line.className = 'line';
    page.appendChild(line);
    page.appendChild(tabbedContentContainer);
    reloadLocalStorage();
    loadTab('Track');
    document.body.appendChild(page);
    function loadTab(keyInTabs) {
        for (let key of Object.keys(tabs)) {
            if (key === keyInTabs) {
                tabs[key].btn.className = 'tab active';
            }
            else {
                tabs[key].btn.className = 'tab';
            }
        }
        const newContent = tabs[keyInTabs].func();
        tabbedContentContainer.replaceChildren(...newContent);
    }
    function exportCollection() {
        const list = [];
        const all = [
            ...traitsCommon,
            ...traitsRare,
            ...traitsEldritch,
            ...aptitudesRare,
            ...aptitudesRareEldritch,
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
        const unsorted = list.map(entry => `#${entry.ID + 1} ${entry.name}`);
        const collator = new Intl.Collator([], { numeric: true });
        unsorted.sort((a, b) => collator.compare(a, b));
        unsorted.push(`\u00ADcradlePoints = ${storageData.cradlePoints}\u00AD`);
        unsorted.push(`\u00ADspawnTickets = ${storageData.spawnTickets}\u00AD`);
        unsorted.push(`\u00ADgrowthTickets = ${storageData.growthTickets}\u00AD`);
        unsorted.push(`\u00ADvouchersAndOther = ${storageData.vouchersAndOther}\u00AD`);
        unsorted.push(`\u00ADusernotes = ${storageData.usernotes}\u00AD`);
        return unsorted.join('\n');
    }
    function updateExportData() {
        exportButton.href = 'data:text/plain;charset=UTF-8,' + encodeURIComponent(exportCollection());
    }
    function importFrom(data) {
        let ids;
        if (typeof data === 'string') {
            ids = data.split('\n')
                .filter(entry => entry.startsWith('#'))
                .map(entry => entry.substring(1).match('\\d*'))
                .filter(entry => entry)
                .map(entry => Number.parseInt(entry[0]) - 1);
            data.split('\u00AD').filter(str => str !== '').forEach(entry => {
                const sides = entry.split('=', 2);
                if (sides.length !== 2) {
                    return;
                }
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
                        return;
                }
            });
        }
        else {
            ids = data;
        }
        storageData.collections = ids;
        Object.keys(tabs).forEach(key => {
            tabs[key].update();
        });
        saveLocalStorage();
    }

    exports.exportButton = exportButton;
    exports.importFrom = importFrom;
    exports.updateExportData = updateExportData;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({});
//# sourceMappingURL=mainapp.js.map
