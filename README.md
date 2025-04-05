# VideoGameProject
## "MayAztec: El Ascenso de la Lotería"
![Game Title Logo](./src/assets/documentation/Game_LogoTitle.png)
### Prehispanic Studios Team members: 
- Mauricio Monroy
- Hector Lugo
- Nicolás Quintana


---
### Game Context

Legend speaks of a time where gods were not as pleased with prehispanic civilizations as history has led us to believe. The gods had gifted them with their knowledge, abundance, and power, but began to feel disrespected. They watched as mortals grew complacent, failing to honor the sacred balance between humanity, nature, and the divine. Temples were left unmaintained, rituals dwindled, and acts of greed marred the harmony the gods once sought to protect. Together, the civilizations turned to a sacred prophecy that spoke of a chosen warrior, one who would represent the best of whatever good was left in them. Together, they tasked that warrior to venture into the Lost Pyramid, the original point of contact with the gods, in hopes of making them change their mind before the world as they know it collapses.

That warrior is you. What everyone did not know, is that once you enter the Pyramid, the only outcomes are your eternal deaths or emerging victorious.


### Gameplay

In order to finish the game, a player would have to beat all the levels in a single, continuous attempt (defeat the level's corresponding boss, situated in the deepest room of each level). 
The player must fight with enemies generated randomly in randomly generated room layouts, as well as manage inventory consumables adequately and strategically. The player will appear in the initial level's room, and will have to explore the different layouts by touching the doors on the level. To go back to the room from where the player came, the bottom door serves for that function. Otherwise, to move forward advancing the level layout, the player can go in up to 3 directions: up, left or right. If the room number changes and a different layout appears, it means progress was made, but sometimes the player will find dead ends before having to go back to find the Boss Room. 
Enemies will try to chase and attack the player when in range, either with melee hits or in the boss's cases, with ranged attacks. 
Vases and enemies drop pick-up-able cards (by going near them), which act as consumables, some with more, some with less uses. Once a card's allowed uses are spent, the player must search for more (either through combat, since defeated enemies have a chance to drop a card, or  through exploring) to refill their acting inventory. 
Upon taking significant damage and depleting all of the player's Health Points, the current "game run" will be over, and most of the player's progress will be lost, and they will have to traverse the levels from the beginning. They will only be able to start over with the last card they added to their inventory from their previous life, along with a basic default card, forcing the player to repeatedly attempt to complete the game from scratch. 
Also, the gods provide a limited preparation time depending on each level as a challenge before facing them, allowing the player to explore the level, prepare their inventory with what they'd like to use for boss fights and choose which challenges to face. The greater the adventure, the better the reward.

---
### How to play? 

1. Clone Github repository through `$git clone [SSH key]`
2. Open prefered browser with JavaScript compatibility
3. Press `Ctrl+O` and navigate to the repository's location, and navigate towards `/src/html/` and open the `home.html` file
4. With the home screen now available, feel free to navigate throught the different sections and buttons. To play the game itself, click on `Play` with the cursor/mouse
5. Play section

      a. To save username, email, and password, click on `Login`. It's preferred in order to store player statistics in database. Fill out forms and click `Login -> Start Game` to continue.
   
      b. After reading the context and pressing either `Space / Enter` keys, the starting room for Level 1 will appear.

      c. Start exploring and fighting enemies simultaneously. To change rooms, try going near doors and having the player get in contact. If the room transitions, it means there was a path available, but if nothing happens, it means no room was next and a dead end was found in said direction (up, left, right). To go back to a previous room, head downwards.

      d. Open vases, avoid or fight enemies, and explore rooms. Repeat until the boss room is found. Fight, and try to bring its HP to 0 through attacks.

      e. If successful, head to the "up" door in the Boss Room (the only door with a different asset) in order to move forward a level.

      f. Repeat until all levels are beat.

   
### What controls will you use?
| **Action**                 | **Default Key**                  | **Description**                                                                          |
|----------------------------|----------------------------------|------------------------------------------------------------------------------------------|
| **Move Up**                | W / Up Arrow                      | Moves player character north.                                                            |
| **Move Left**              | A / Left Arrow                   | Moves player character west.                                                             |
| **Move Down**              | S / Down Arrow                   | Moves player character south.                                                            |
| **Move Right**             | D / Right Arrow                  | Moves player character east.                                                             |
| **Attack (BaseCard)**      | X                         | Performs a melee attack with the base weapon in the direction currently faced.                                       |
| **Interact (vase)**       | F                                | Opens vases, picks up items if available.                                               |
| **Use Card 1–5**           | Number Keys 1–5                  | Activates the assigned Lotería card.                                                     |
| **Dash**                   | Shift                            | Brief invulnerability and burst movement. Consumes stamina.                              |
| **Pause Menu**             | ESC                              | Opens pause menu with in-game options.                                                   |
| **Menu Navigation**        | Arrow Mouse or Enter  | Navigate in menus, confirm selections.                                                   |

---
### Status report: April 4th, 2025
#### Working funtionalities

- Player follows basic commands based on user input
- Pausable and resumable game
- Basic game statistics accumulated in javasript, in preparison for database transmission
- Card system works in general (almost finished, bug management and balance tweaking in progress)
- Enemies wander, chase, and attack (deal damage) based on relative distance to player location
- Random level generation through a tree data structure, with each random node position including a randomly generated room (following certain constraints to ensure playability)
- Enemy Boss instance that attacks you like the enemies
- Enemies and Vases have a chance to drop a card when certain conditions are met (enemy HP status/player-vase interaction)
- Consistent room and level transitions (level transition only available when defeating boss)
- Player combat mechanics functional (dealing damage with hitboxes), as well as the enemies'


What functionalities are missing?
- Second boss
- Dash/dodging system
- Death reset with last picked-up card: after game over, the last card the player picked up stays in its inventory, as well as with the base card
- General bug fixes and balance tweaking
- Fix sprite animations
- Compile more statistics
- Complete trasnformation system from card mechanics
