# Words Grid

This software will generate a grid of words or hex values. The intended purpose of this grid is to be printed and securely distributed as a physical authentication token.

Specifically, if two people have shared identical copies of the grid in advance, they will be able to challenge the other person to confirm they are in posession of the grid by referencing it against their own copy. This is expected to be useful in cases where a communication comes from an untrusted channel, or where a formerly trusted channel is suspected to have been overtaken by an adversarial third party.

* A text message stating "Hey I lost my old phone, but this is my new number"
* A voice or video call that could be an AI fake
* A DM via social network where the other user is acting unusual, and may have had their account hijacked

## Use of the Words Grid
In the sample output below, there is a 5x5 grid of 25 unique words. We assume this has been provided to both User A and User B.
```
╔═══╤═══════════╤═══════════╤═══════════╤═══════════╤═══════════╗
║   │ A         │ B         │ C         │ D         │ E         ║
╟───┼───────────┼───────────┼───────────┼───────────┼───────────╢
║ 0 │ electable │ justifier │ schematic │ fever     │ stardom   ║
╟───┼───────────┼───────────┼───────────┼───────────┼───────────╢
║ 1 │ dismount  │ sprig     │ enactment │ septic    │ unpaired  ║
╟───┼───────────┼───────────┼───────────┼───────────┼───────────╢
║ 2 │ sweat     │ policeman │ postage   │ eagerness │ down      ║
╟───┼───────────┼───────────┼───────────┼───────────┼───────────╢
║ 3 │ liable    │ supernova │ backdrop  │ glass     │ expand    ║
╟───┼───────────┼───────────┼───────────┼───────────┼───────────╢
║ 4 │ mushiness │ getting   │ mushy     │ wildfowl  │ exfoliate ║
╚═══╧═══════════╧═══════════╧═══════════╧═══════════╧═══════════╝
```
User A can ask User B to provide the word in cell `B2`. If User B is able to reply with `policeman`, then User A is able to confirm that User B possesses the token (the grid).

Alternatively, User A could ask User B "What is the location of `fever`?" and if User B is able to answer `D0`, they have also shown that they have the token.

Should User B want to authenticate User A also, they could also issue their own challenges.

## Multi-Factor Authentication
A stolen or missing grid could be assumed to be compromised and need replacement. However there is no protection by default if a grid has been compromised in some way (copied without knowledge of the users). To solve this, some form of MFA is needed. A common MFA approach is (1) Something You Have, and (2) Something You Know.

This grid alone can only act as item (1), but with advance planning it is possible to introduce lookup rules to act as item (2). The rules could be something like "If the date is an odd number, respond with one cell to the left. If the date is an even number, respond with one cell to the right." or "Move to the right as many times as letters in your first name, and move down as many times as letters in your last name, wrapping back around the the start of the row or column if needed."

Consider the user's ability to remember these rules accurately, nor should they ever be written down. So long as the rules are known to the users alone, a compromised grid will still be useful.

# Use of the Software
This software is a Node.js program. To install via Node, first copy the repository to your machine. Then run the install script for dependencies:
```
npm install
```
Once installation is complete, you can use the start script to begin:
```
npm start
```
You will be prompted for your choice of several options, and once done a text file will be generated in your local directory. This is anticipated to be printed in a mono-space font.
## Options
The following options are presented to you during use.
### Title
The text entered here will be inserted as a line above the grid. Useful if you are making multiple versions or identifying who they are intended for, and would like to label them neatly.

The default choice is blank. Using a blank title will reduce the overall lines of text by 1.
### Words or Hexidecimal
Pressing either `w` or `h` will select one of the two options.
* Words will be psuedo-randomly chosen from the list of 8,429 words from the combined [EFF's word lists For random passphrases](https://www.eff.org/deeplinks/2016/07/new-wordlists-random-passphrases).
* Hexidecimal values will be psuedo-randomly generated as individual digits, but have the benefit of defined character counts per item. This can ensure a guaranteed width to the generated grid.
The default choice is `words`.
### Column Count
This defines how many columns of words/values to generate. A positive integer is required for this value. Note that the left edge of the grid will include a column of numbers, making the actual number of columns one greater than this.

Letters A-Z are used as the header for each column through the first 26. If the number of columns exceeds this limit, letters will begin repeating doubled, and then tripled, etc. For example, A...Z, AA...ZZ, AAA...ZZZ, etc.

The default value is `10`.
### Row Count
This defines how many rows of words/values to generate. A positive integer is required for this value. Note that the top edge of the grid will include a column of letters, making the actual number of rows one greater than this.

The default value is `20`.
### View
A Yes/No prompt will ask if you want to view the items. If Yes is selected, the output console will display all the elements, grouped by their rows, after they are selected.

The default is `Yes`.
### Hex Digit Count
This defines how many characters to generate per hexidecimal value. A positive integer is required for this value. This prompt will only be seen if hexidecimal values were selected previously. Note that the fewer digits there are the fewer possible values can be represented. As a result, de-duplication is not implemented. You should instead use larger values as appropriate for the size of your grid, or accept that cells could contain duplicate values and factor that into your usage.

The default value is `3`.
### Filename
The text entered here will become the filename for the final output. It is recommended, but not required, to include a TXT extension as the output will be UTF-8 text.

The default value is `output.txt`.

## Example Outputs
### Default
The defaults will produce a 10x20 grid of words with no title. This size is suitable for printing on a 8.5"x11" page in landscape mode.
```
╔════╤═══════════╤═══════════╤═══════════╤═══════════╤═══════════╤═══════════╤═══════════╤════════════╤═══════════╤═══════════╗
║    │ A         │ B         │ C         │ D         │ E         │ F         │ G         │ H          │ I         │ J         ║
╟────┼───────────┼───────────┼───────────┼───────────┼───────────┼───────────┼───────────┼────────────┼───────────┼───────────╢
║ 0  │ banner    │ cohesive  │ cartridge │ nugget    │ bossiness │ treat     │ hesitate  │ diary      │ marine    │ kingdom   ║
╟────┼───────────┼───────────┼───────────┼───────────┼───────────┼───────────┼───────────┼────────────┼───────────┼───────────╢
║ 1  │ alfalfa   │ ending    │ goofball  │ debating  │ battering │ squeezing │ breezy    │ ardently   │ unwed     │ prelude   ║
╟────┼───────────┼───────────┼───────────┼───────────┼───────────┼───────────┼───────────┼────────────┼───────────┼───────────╢
║ 2  │ grain     │ jingling  │ carving   │ repaint   │ unrobed   │ backup    │ wasabi    │ sizzle     │ islam     │ shifting  ║
╟────┼───────────┼───────────┼───────────┼───────────┼───────────┼───────────┼───────────┼────────────┼───────────┼───────────╢
║ 3  │ unfasten  │ duvet     │ livestock │ chemicals │ antibody  │ unloader  │ stomp     │ explore    │ epiphany  │ pony      ║
╟────┼───────────┼───────────┼───────────┼───────────┼───────────┼───────────┼───────────┼────────────┼───────────┼───────────╢
║ 4  │ custody   │ shaking   │ dinghy    │ scorer    │ spring    │ anonymous │ nuisance  │ subsidy    │ buck      │ grievous  ║
╟────┼───────────┼───────────┼───────────┼───────────┼───────────┼───────────┼───────────┼────────────┼───────────┼───────────╢
║ 5  │ shun      │ landmass  │ penalize  │ upgrade   │ stove     │ astute    │ exonerate │ reliably   │ unrest    │ buddy     ║
╟────┼───────────┼───────────┼───────────┼───────────┼───────────┼───────────┼───────────┼────────────┼───────────┼───────────╢
║ 6  │ requisite │ luster    │ immerse   │ granola   │ earshot   │ headless  │ stopwatch │ trimester  │ threaten  │ rage      ║
╟────┼───────────┼───────────┼───────────┼───────────┼───────────┼───────────┼───────────┼────────────┼───────────┼───────────╢
║ 7  │ haste     │ directly  │ iodine    │ moccasin  │ nylon     │ trek      │ slacked   │ twitter    │ battle    │ copier    ║
╟────┼───────────┼───────────┼───────────┼───────────┼───────────┼───────────┼───────────┼────────────┼───────────┼───────────╢
║ 8  │ daredevil │ hardcore  │ commerce  │ volley    │ coma      │ itunes    │ dividers  │ actress    │ happily   │ overtly   ║
╟────┼───────────┼───────────┼───────────┼───────────┼───────────┼───────────┼───────────┼────────────┼───────────┼───────────╢
║ 9  │ strategy  │ partridge │ glorifier │ fiddle    │ amenity   │ scant     │ shucking  │ curtly     │ cacti     │ kilogram  ║
╟────┼───────────┼───────────┼───────────┼───────────┼───────────┼───────────┼───────────┼────────────┼───────────┼───────────╢
║ 10 │ creation  │ steering  │ easing    │ venture   │ kiosk     │ rethink   │ unsaddle  │ seltzer    │ supernova │ playlist  ║
╟────┼───────────┼───────────┼───────────┼───────────┼───────────┼───────────┼───────────┼────────────┼───────────┼───────────╢
║ 11 │ next      │ cod       │ dry       │ trowel    │ unhelpful │ importer  │ ovary     │ dining     │ crave     │ craving   ║
╟────┼───────────┼───────────┼───────────┼───────────┼───────────┼───────────┼───────────┼────────────┼───────────┼───────────╢
║ 12 │ gratitude │ boastful  │ wasabi    │ matriarch │ pageant   │ unsworn   │ steadying │ glitzy     │ afar      │ landmine  ║
╟────┼───────────┼───────────┼───────────┼───────────┼───────────┼───────────┼───────────┼────────────┼───────────┼───────────╢
║ 13 │ galore    │ freemason │ greedless │ swipe     │ favoring  │ cornstalk │ paralyze  │ handball   │ henchman  │ arrowhead ║
╟────┼───────────┼───────────┼───────────┼───────────┼───────────┼───────────┼───────────┼────────────┼───────────┼───────────╢
║ 14 │ sizzling  │ mockup    │ renter    │ ignore    │ savage    │ wreck     │ unwanted  │ monthly    │ grievance │ anaconda  ║
╟────┼───────────┼───────────┼───────────┼───────────┼───────────┼───────────┼───────────┼────────────┼───────────┼───────────╢
║ 15 │ express   │ boatyard  │ cradle    │ egging    │ blink     │ wincing   │ unadvised │ footsie    │ lunchbox  │ obtuse    ║
╟────┼───────────┼───────────┼───────────┼───────────┼───────────┼───────────┼───────────┼────────────┼───────────┼───────────╢
║ 16 │ leggings  │ wok       │ body      │ euthanize │ graceful  │ caddie    │ impound   │ sweatshirt │ alarm     │ seven     ║
╟────┼───────────┼───────────┼───────────┼───────────┼───────────┼───────────┼───────────┼────────────┼───────────┼───────────╢
║ 17 │ regulate  │ skip      │ voicemail │ landing   │ unfazed   │ mountain  │ speller   │ batting    │ purge     │ siamese   ║
╟────┼───────────┼───────────┼───────────┼───────────┼───────────┼───────────┼───────────┼────────────┼───────────┼───────────╢
║ 18 │ overact   │ aspirin   │ tribunal  │ mortified │ unvocal   │ rarity    │ blatancy  │ mystified  │ motive    │ lugged    ║
╟────┼───────────┼───────────┼───────────┼───────────┼───────────┼───────────┼───────────┼────────────┼───────────┼───────────╢
║ 19 │ calm      │ dodgy     │ condiment │ obtuse    │ passivism │ expediter │ groggily  │ phonics    │ onion     │ reach     ║
╚════╧═══════════╧═══════════╧═══════════╧═══════════╧═══════════╧═══════════╧═══════════╧════════════╧═══════════╧═══════════╝
```
### Hexadecimal
The below example is a 5x5 grid of 3-digit hexadecimal values.
```
╔═══╤═════╤═════╤═════╤═════╤═════╤═════╗
║   │ A   │ B   │ C   │ D   │ E   │ F   ║
╟───┼─────┼─────┼─────┼─────┼─────┼─────╢
║ 0 │ 282 │ 2AD │ 2CA │ B9B │ 413 │ 8B3 ║
╟───┼─────┼─────┼─────┼─────┼─────┼─────╢
║ 1 │ 65B │ DB1 │ 1B4 │ 8AA │ B30 │ CB8 ║
╟───┼─────┼─────┼─────┼─────┼─────┼─────╢
║ 2 │ 600 │ F7A │ 2F1 │ E68 │ BB3 │ 393 ║
╟───┼─────┼─────┼─────┼─────┼─────┼─────╢
║ 3 │ 4EA │ 95A │ 5E9 │ 6B9 │ 681 │ 01A ║
╟───┼─────┼─────┼─────┼─────┼─────┼─────╢
║ 4 │ 72F │ F9F │ F99 │ 89B │ 182 │ FF1 ║
╟───┼─────┼─────┼─────┼─────┼─────┼─────╢
║ 5 │ 28B │ B95 │ 804 │ 3B8 │ 010 │ A67 ║
╚═══╧═════╧═════╧═════╧═════╧═════╧═════╝
```
## License
This code is available under the MIT license, included below.


Copyright 2026 Nathaniel "Hectate" Mitchell

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
