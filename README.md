# Nemesis Helper

Helper Application for Nemesis boardgames published by Awaken realms.

Full list of features can be found at [BGG App post](https://boardgamegeek.com/thread/3271434/helper-application-nemesis-games).

Application hosted on [nemesis-helper-bg](https://nemesis-helper-bg.web.app/).

This is PWA App, which means you can install it once and have it on your device (including desktop) as an Application with shortcut. This will allow using this App without access to the internet.

### About Application
Available games in the App:
1. Nemesis
2. Nemesis Lockdown

- Nemesis Retaliation (probably will add some time after its release)
- Expansions maybe in the future

#### App Features ([L] means it is only Nemesis Lockdown feature):

**Players section:**
- player numbers with names
- turn timers (when enabled)

**Time Tracker section:**
- round number
- self-destruct / autodestruction indicator and end game reminded
- [L] alert procedure indicator (showing when game ends)
- [L] CSS indicators
- [L] power state
- end game summary (victory checks, game duration)

**Steps section:**
- step names divided into 2 phases
- indication of current step
- "Time track" step will move round tracker, and may trigger reminders in form of modals (e.g. hibernation chambers / isolation room opening)
- [L] "Launch CSS" may animate CSS launch as a reminder
- "Intruder bag development" automatically adds intruder tokens when needed, shows info what to do

**Step description section:**
- current step description (what to do in this step)

**Intruders section:**
- this section pretty much replaces intruders bag (available and bag pools are shuffled every time when changed)
- can trigger encounter with intruder symbol and description what to do (may trigger first Intruder encounter)
- option to add monster manually (in case some event tells to add intruder to bag)
- preview to check which intruders are present in which pool (available, bag, active)
- rotate token: possibility to show back of the token (surprise attack numbers)
- kill token: possibility to "kill" chosen intruder which moves it back to the available pool
- retreat token: possibility to "retreat" chosen intruder which moves it back to bag pool

**Drawer:**
- 2 languages: English, Polish (logs only available in english)
- light and dark mode
- search room modal (room descriptions with search by name)
- FAQ with answers (can use browser's search or jump to FAQ section)
- critical gameplay moments
- game logs (purely to see what has happened before for reminding or debugging purposes)
- about application with useful usage information


Most of the texts are based on official guidebook.

Game state is saved every start of player phase (refreshing page can restart round).

Game saves are stored locally in the Browser, application do not use any server to store data.


#### Supported resolutions
- Only landscape mode is supported!
- IPad mini is the smallest device app was designed for.

Tablet and bigger in landscape mode (right now I did not really support phone resolutions because I think it is not App which is useful on small devices such as phone).

#### Supported languages
- English
- Polish


### For Developers who want to help develop this App
Check [Development Guide](DEVELOPMENT-GUIDE.md).

