# Spawn of Aunt Becky Tracker

Keep track of your progress as player in the game with this collection tracker. You can mark stuff off, and it will be kept as cookies in your browser. For safekeeping, you can also export it and import later.

## Compilation instructions for programmers

The source code is available under the CC0 license. Attribution is appreciated, but not required.  

This is written in
[TypeScript](https://www.typescriptlang.org/), which requires
[node & npm](https://www.npmjs.com/get-npm). Install those first. You can build this with ([Git Bash](https://gitforwindows.org/)) in a Bash-enabled terminal by running:

```
git clone https://github.com/ThinkAndWander/Aunt-Becky-Tracker.git
cd Aunt-Becky-Tracker
npm install
npm run build
```

#### Updating the deployed site

The `gh-pages` branch auto-deploys on commit push. To prepare it, revert its unique commits and rebase on main, then delete everything but .gitignore, website, and ignored folders. Move the contents of website into root and delete the folder, then push.