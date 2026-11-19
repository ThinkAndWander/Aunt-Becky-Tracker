import * as collections from './collections';
import { reloadLocalStorage } from './shared';

const tabs = {
    Traits: {
        func: () => collections.loadTab('traits'),
        btn: document.createElement('DIV') as HTMLInputElement
    },
    Aptitudes: {
        func: () => collections.loadTab('aptitudes'),
        btn: document.createElement('DIV') as HTMLInputElement
    },
    Achievements: {
        func: () => collections.loadTab('achievements'),
        btn: document.createElement('DIV') as HTMLInputElement
    },
    // New tabs go here
}

// The main page
const page = document.createElement('DIV') as HTMLDivElement;
page.id = 'page'

const pageTitle = document.createElement('H1') as HTMLHeadingElement;
pageTitle.textContent = 'Spawn of Aunt Becky Tracker';

const tabsContainer = document.createElement('DIV') as HTMLDivElement;
tabsContainer.className = 'tabs';
const tabbedContentContainer = document.createElement('DIV') as HTMLDivElement;
tabbedContentContainer.className = 'page-content';

// Populate the tabs.
for (let key of Object.keys(tabs)) {
    const tab = document.createElement('BUTTON') as HTMLButtonElement;
    tab.className = 'tab';
    tab.textContent = key;
    tab.addEventListener('click', () => loadTab(key as keyof typeof tabs));
    tabsContainer.append(tab)
}

page.appendChild(pageTitle);
page.appendChild(tabsContainer);
page.appendChild(tabbedContentContainer);
reloadLocalStorage(); // loads ahead-of-time if it exists
loadTab('Traits'); // default open tab
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