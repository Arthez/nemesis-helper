### Tech
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.10.

Hosting is provided by [Firebase services](https://firebase.google.com/docs/hosting).

Icons provided by [Google Fonts](https://fonts.google.com/icons?hl=pl).

### Dictionary
- **nog** - nemesis original
- **nld** - nemesis lockdown
- **nrl** - nemesis retaliation


### Development guide
- colors should be defined as CSS variables only in `palette.scss`
- do NOT use `::ng-deep` etc.
- only `standalone` components, pipes etc.
- always `ChangeDetectionStrategy.OnPush`
- use `signals`
- do NOT add unnecessary libraries
- should use compatible Node and NPM version with versions defined in `engines` field in [package.json](package.json)
- commit message has to start with proper text, details can be found in [custom hook](.husky/commit-msg-hook.js)
- always add proper file name suffix e.g `component`, `const`, `interface`, `util`, `model` in singular form
- use auto-importer which sort imports alphabetically
- use `inject()` to inject dependencies
- always name injected classes the same as class name if possible (e.g. `globalLoader: GlobalLoaderService = inject(GlobalLoaderService)`)
- use single $ in the variable names of Observables (e.g. dataChange$), and double $ for Subjects / BehaviorSubjects (e.g. dataChange$$)
- to avoid `any` type when possible

### Backlog
#### High priority:
- Retaliation game (when it comes out)
- showing CSS on round tracker for coop mode
- other languages

#### Low priority:
- translate logs
- Lockdown color theme as redish?
- expansions? (when setting up chosen game)
- save export / import? (might not be useful)
