# **MayAztec: El Ascenso de la Lotería**
![Game Logo.](/Videojuego/GDDImages/Game_Logo.png) 

## _Game Design Document_

---

###### Tecnológico de Monterrey, Campus Santa Fe
![School Logo.](/Videojuego/GDDImages/Tecnologico-Monterrey-Logo.jpg)

###### _TC2005B: Construcción de software y toma de decisiones_

###### Teachers: 
- Desarrollo de videojuegos - Gilberto Echeverría Furió
- Desarrollo Web - Octavio Navarro Hinojosa 
- Base de datos y análisis y modelación de sistemas de software - Esteban Castillo Juarez

###### Authors: 
- Mauricio Emilio Monroy González
- Hector Lugo
- Nicolas Quintana

--- 
##
## _Index_

---

1. [Index](#index)
2. [Game Design](#game-design)
    1. [Summary](#summary)
    2. [Gameplay](#gameplay)
    3. [Mindset](#mindset)
3. [Technical](#technical)
    1. [Screens](#screens)
    2. [Controls](#controls)
    3. [Mechanics](#mechanics)
4. [Level Design](#level-design)
    1. [Themes](#themes)
    2. [Game Flow](#game-flow)
5. [Development](#development)
    1. [Abstract Classes](#abstract-classes--components)
    2. [Derived Classes](#derived-classes--component-compositions)
6. [Graphics](#graphics)
    1. [Style Attributes](#style-attributes)
    2. [Graphics Needed](#graphics-needed)
7. [Sounds/Music](#soundsmusic)
    1. [Style Attributes](#style-attributes-1)
    2. [Sounds Needed](#sounds-needed)
    3. [Music Needed](#music-needed)
8. [Illustrations](#illustrations)
9. [Schedule](#schedule)



---

## _Game Design_

---

### **Summary**
Embark on a thrilling journey through a mystical pyramid steeped in Aztec and Mayan mythology, infused with a contemporary Mexican flair. In this roguelite adventure, players must confront ancient gods in adrenaline-pumping battles, while discovering unique power-ups and abilities hidden within traditional lottery cards. Each card offers temporary, game-changing boosts, ensuring an ever-evolving and dynamic gameplay experience. Time runs out per level. The gods are waiting. Will you break the cycle of death and resurrection, or be trapped in the eternal curse forever?


### **Gameplay**
The player's character exists in a 2D pixel world, contextualized in an ancient aztec/mayan underground pyramid, with 2 distinct levels that seek to make two runs as different as possible. Each level will consist of randomly generated room layouts with enemies and vases that might drop some rewards, as well as a corresponding boss. To progress, the player must explore areas filled with a mix of challenging enemies, and collect cards that aid in their advancement before the allowed time per level runs out. In order to survive, the player will possess an "inventory" of 6 cards, which will provide temporary but varied boosts in stats for combat or weaponry. 

#### Game Objective
_Background_

Legend speaks of a time where gods were not as pleased with prehispanic civilizations as history has led us to believe. The gods had gifted them with their knowledge, abundance, and power, but began to feel disrespected. They watched as mortals grew complacent, failing to honor the sacred balance between humanity, nature, and the divine. Temples were left unmaintained, rituals dwindled, and acts of greed marred the harmony the gods once sought to protect. Together, the civilizations turned to a sacred prophecy that spoke of a chosen warrior, one who would represent the best of whatever good was left in them. Together, they tasked that warrior to venture into the Lost Pyramid, the original point of contact with the gods, in hopes of making them change their mind before the world as they know it collapses. 
That warrior, is you. What everyone did not know, is that once you enter the Pyramid, the only outcomes are your eternal deaths or emerging victorious.

The objective of the game is to gradually defeat the ancient gods in order to escape the infinite cycle of death and resurrection they've thrust yourself upon, and proving yourself as the chosen warrior, saving all of the groups. At first, the task will seem daunting, but by gradually advancing, and gaining powerful weapons and powerups, little by little the player's knowledge, experience and abilities will grow. 

#### Obstacles and Challenges
In order to finish the game, a player would have to beat all the levels in a single, continuous attempt. The player must fight with enemies spawning randomly in randomly generated room layouts, as well as manage inventory consumables adequately and strategically. Enemies will try to attack the player, either with melee hits or in the boss's cases, with ranged attacks. All cards act as one-time consumables for varied buffs and effects. Once a card's allowed uses are spent, the player must search for more (either through combat, since defeated enemies have a chance to drop a card, or through exploration) to refill their active inventory. Upon taking significant damage and depleting all of the player's Health Points, the current "game run" will be over, and most of the player's progress will be lost, and they will have to traverse the levels from the beginning. They will only be able to start over with the last card they added to their inventory from their previous life, forcing the player to repeatedly attempt to complete the game from scratch. Also, the gods provide a limited preparation time depending on each level as a challenge before facing them, allowing the player to explore the level, prepare their inventory with what they'd like to use for boss fights and choose which challenges to face. The greater the adventure, the better the reward.

#### Tactics & Strategies
The player will face 4 types of base-enemies in close-range combat, as well as 2 boss fights. To overcome these obstacles, the player must experiment with different card usage, as well as find a balance on when to fight and when they decide they figure their inventory is just right for a boss fight, thus requiring a bit of exploring and combat to prepare. As they progress in further levels, the benefits reaped from the cards will increase as difficulty does, therefore providing better tools and advantages. Time and inventory management will be essential.

##### Overview
In **MayAztec**, the player must balance **close-range-combat**, **inventory management**, and **strategic use of Lotería cards**. With four types of base enemies and two major boss fights, every encounter demands a measured approach:

- **Short-range battles**: The player wields a base weapon and can enhance or replace it with specific cards.
- **Exploration & Preparation**: Delving into each level, the player must decide when to keep exploring for better cards vs. when to confront the boss.
- **Risk vs. Reward**: Entering fights unprepared could result in heavy damage or death, while thorough exploration may grant powerful temporary or permanent card effects.

##### Base Enemies Tactics
1. **Medium Enemies (Type I)**  
   - Moderate HP, balanced offense.  
   - Recommended Tactic: Time your attacks between their combos, use dash to evade or wait for their cooldown for some quick damage.  
   - Card Synergy: Damage-boosting or healing cards to withstand longer fights.

2. **Heavy Enemies (Type II)**  
   - High HP, slower but with powerful hits.  
   - Recommended Tactic: Maintain distance, wait for their slow wind-up, then strike.  
   - Card Synergy: Card healing effects help chip away at their large health pool.

##### 1.3 Boss Fights Tactics
- **Boss Phase Recognition**: Watch for animation or HP threshold cues that signal a shift in behavior.
- **Positioning**: Move diagonally to avoid linear bullet-hell attacks or area-of-effect strikes.
- **Card Management**: Ensure at least one slot is free to pick up an on-the-fly power-up if you find a vase in the boss arena.

##### 1.4 Inventory & Time Management
- **Card Slots**: You have up to 6 Lotería card slots. Decide which effects to keep and which to discard.
- **Resource Conservation**: Overusing your best cards early may leave you underpowered for the boss.
- **Retreating**: If a fight seems too risky, backtrack to search for better cards or healing items.

### **Mindset**
The game is designed to be played with an adventure-oriented and reward-facing mindset toward the unknown, starting with just a base weapon but seeking to improve in a tense and challenging environment. The player must feel the curiosity to explore rooms and gain rewards along the way, but exercise caution due to the threat of going all-in with each enemy the player encounters. They must manage their inventory conservatively, sometimes with a bit of improvisation but always rushing to face the level's boss or else the time may run out.

---

## _Technical_

---

### Main Character Stats & Balance

| **Attribute**    | **Base Value**         | **Details**                                                                                                                                           | **Justification**                                                                    |
| ---------------- | ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| **HP**           | 10 Life Bars           | Each bar is 1HP.                                            | Allows for a balanced gameplay experience with a bit of risk                   |
| **Stamina**      | 5 bars                 | Each dash consumes 1 bar.                                                                           | Allows 5 dashes without being completely defenseless, but still requires management. |
| **Card Slots**   | 6                    |                                                                                                     | Balanced so that the player must manage resources. |
| **Attack Speed** |                        | **3-hit combo**: Each hit of the combo has \~0.3s delay. After the third hit, there is an overall **cooldown** of 0.8-1s before restarting the combo. | Allows fluid gameplay without overusing combos.                                      |
| **Base Damage**  | 3 pts with base weapon | Allows balanced combat: normal enemies die in 4 hits, difficult ones in 4-6, bosses in 15-25 (without using cards).                                   |                                                 


### Screens & Menus
| **Screen**                | **Description**                                                                                                               |
|---------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| **Title Screen**          | Displays game logo, “Start,” “Options,” “Exit.” ![Title Screen](./GDDImages/Title%20Screen.png)                                                                             |
| **Options**               | Adjust audio ![Audio Management](./GDDImages/Options%20Menu.png)                                                                          |
| **Game (Main Gameplay)**  | Core level exploration and combat take place here. Has a sidebar in the right side to show current run statistics, and if the mouse hovers over the footer, a popup image with the controls appears ![Main Section](./GDDImages/MainScreen.png)                                                                           |
| ** Context Screen **      | Shows backstory  ![Context Screen](./GDDImages/ContextScreen.png)|
| **HUD Game**              | Shows player HP and Bar of resistance, card slots (1–6), Timer.                |
| **Pause Menu**            | [ESC] key triggers. Options to resume, adjust settings, or quit to Title.   ![Pause Menu](./GDDImages/PauseMenu.png)                                                 |
| **Death Screen (Game Over)** | Option to restart or quit.  ![Game Over](./GDDImages/GameOverScreen.png)                                  |
| **Victory Screen**        | After defeating the final boss.    ![Victory Screen](./GDDImages/Victory%20Screen.png)       |



### **Controls**

![Controls Summary](../src/assets/documentation/controls.png)

| **Action**                 | **Default Key**                  | **Description**                                                                          |
|----------------------------|----------------------------------|------------------------------------------------------------------------------------------|
| **Move Up**                | W / Up Arrow                      | Moves player character north.                                                            |
| **Move Left**              | A / Left Arrow                   | Moves player character west.                                                             |
| **Move Down**              | S / Down Arrow                   | Moves player character south.                                                            |
| **Move Right**             | D / Right Arrow                  | Moves player character east.                                                             |
| **Attack (BaseCard)**      | X                         | Performs a melee attack with the base weapon in hand.                                       |
| **Interact (vase)**       | F                                | Opens vases, picks up items if dropped.                                               |
| **Use Card 1–6**           | Number Keys 1–6                  | Activates the assigned Lotería card if available.                                                     |
| **Dash**                   | Shift                            | Brief invulnerability and burst movement. Consumes 1 stamina per.                              |
| **Pause Menu**             | ESC                              | Opens pause menu with in-game options.                                                   |
| **Menu Navigation**        | Arrow Mouse + Enter  | Navigate in menus, confirm selections.                                                   |


### **Mechanics**

1. **Lotería Card System (Dynamic Power-Ups)**  
   - **Inventory Array**: Cards collected go into slots [1–6].  
   - **Usage**: Press the corresponding number key to activate.  
   - **Effects**: May increase speed, attack, or transform the player for a limited time.  
   - **Balance**: Probability weight tables ensures varied card drops.

2. **Boss Fights (Soulslike & Zelda-Inspired)**  
   - Different attack patterns.  
   - **HP Thresholds**: e.g., 50% HP triggers new pattern or bullet-hell.  
   - **Reward**: Defeating a boss grants permanent buffs/blessings.

3. **Time & Inventory Management**
   - Limited time to finish each level.
   - The deeper the level, the tougher the enemies, but the more potent the cards that are found.  
   - Inventory capacity is limited to **6** active card slots (1 Base card + 5 empty slots).

5. **Procedural/Randomized Elements**  
   - **Enemy spawn points**: Weighted random within each room.  
   - **Card/Item drops**: Probability-based, scaling with different levels and the mob that was killed.

### Considerations

#### Mindset & Player Experience
- **Adventure-Oriented**: Encourage players to explore each room, face unknown threats, and chase potential rewards.
- **Reward-Facing**: The tension between pressing forward or backtracking for more cards fosters strategic planning.
- **Caution**: Overconfidence can lead to a quick defeat; careful, resource usage is key.

#### Difficulty & Progression
- **Incremental Complexity**: Each level introduces new card possibilities and tougher enemies spawn.  
- **Boss Difficulty Spike**: Encourages the player to use the best synergy/combo of cards and sharpen their reflexes.

#### Lotería Cards

Below is the updated **sample set** of 10 base cards. Each card has an **ID**, a **type** (weapon, transformation, power-up), a **damage** (if applicable), and an optional **duration** in seconds. Cards can be found in vases or dropped by enemies based on a probability system (e.g., 10–30% chance depending on the enemy).

##### Weapon Cards

| **Card ID** | **Name**         | **Type** | **Damage**     | **Duration** | **Effect / Description**                                                                                                      |
|:----------:|:----------------:|:--------:|:-------------:|:-----------:|:--------------------------------------------------------------------------------------------------------------------------------|
|    0    | Macuahuitl      | Weapon   | 5 pts         | 10 hits           | Classic aztec obsidian weapon. Increases damage dealt to +5.         ![CardImage](../src/assets/cards/cardBaseweapon.jpeg)                                                          |
| 1       | Cuchillo de Obsidiana  | Weapon   | 4 pt          | 10 hits           | Light & fast, for quick combos with an damage increase of +4.             ![CardImage](../src/assets/cards/cardObsidianKnife.png)                                                                                      |
| 2       | Machete         | Weapon   | 6 pts | 5 hits           | Ideal vs. enemies with high HP (Heavy) with its +6 damage.      ![CardImage](../src/assets/cards/cardMachete.png)                                                                       |

##### Transformation Cards

| **Card ID** | **Name**         | **Type**         | **Damage** | **Duration** | **Effect / Description**                                                                                                                      |
|:----------:|:----------------:|:----------------:|:---------:|:-----------:|:-----------------------------------------------------------------------------------------------------------------------------------------------|
| 3       | Mariachi         | Transformation   | 4 pts (guitar) | 10s         | +15 temporary health bars; weapon turns into a guitar with 5 damage points per hit. ![CardImage](../src/assets/cards/cardMariachi.jpeg)              
| 4       | Diablo           | Transformation   | 3 pts (spear) | 10s       | Transform into a devil with a trident, increasing your damage by 3 pts per hit.  ![CardImage](../src/assets/cards/cardDiablo.png)              |
| 5       | Guerrero Maya    | Transformation   | +2 actual weapon | 10s     | Turn into a fierce mayan warrior which gives you +2 stamina bars.   ![CardImage](../src/assets/cards/cardGuerrero.png)                                                    |

##### Cartas de Buff

| **Card ID** | **Name**     | **Type**  | **Damage** | **Duration** | **Effect / Description**                                                                                                                               |
|:----------:|:------------:|:---------:|:---------:|:-----------:|:--------------------------------------------------------------------------------------------------------------------------------------------------------|
| 6       | Corazon      | Buff      | –         | Instant     | Gain 10 permament hitpoints, great when coming out of a battle or going into a boss fight.          ![CardImage](../src/assets/cards/cardHeart.jpeg)                                  |
| 7       | El Valiente  | Buff      | –         | 10s         | Transforms into the "Valiente" giving you 10 temporary hitpoints, great to get out of a pickle.   ![CardImage](../src/assets/cards/cardValiente.png)                                                                        |
| 8       | El Taco      | Buff      | –         | 10s         | Gain 10 termporary hitpoints, an alternate, yet reliable option to the "Corazon card".   ![CardImage](../src/assets/cards/cardTaco.png)                                                                  |
| 9       | La Calavera  | Buff      | –         | 10s         | Temporary increase the damage dealt to 10, great for dealing with tougher enemies or bosses                           ![CardImage](../src/assets/cards/cardCalavera.png)               |

**Drop Probability (General Guidelines)**:
- **Light Enemies (El Músico, Tlaxcaltecas)**: ~10–15% chance for low-tier weapons or buff cards.  
- **Medium Enemy (Guerrero Maya)**: ~20% chance for mid-tier weapons or transformation.  
- **Heavy Enemy (El Diablo)**: ~10–15% chance for high-tier gear or powerful buffs.  
- **vases**: Weighted random from the full set, guaranteed at least 1 card.  
- **Boss Fights**: 5–10% chance for transformations plus guaranteed resources.



#### Enemies & Bosses

##### Normal Enemies

| **Enemy**             | **HP Range** | **Damage** | **Behavior**                                                                                 | **Drop Probability**                                                             |
|:---------------------:|:-----------:|:---------:|:--------------------------------------------------------------------------------------------:|:---------------------------------------------------------------------------------:|
| **El Músico / Mariachi** (Light) ![EnemyThumbnail](../src/assets/charSpritesheets/enemyThumbnails/mariachiThumb.png)| 10       | 1      | Quick guitar strikes; leaps backward. Often tries to flank.                                 | ~15% chance for low-tier or minor buffs.                  |
| **Tlaxcaltecas** (Light)     ![EnemyThumbnail](../src/assets/charSpritesheets/enemyThumbnails/skelThumb.png)    | 15       | 2       | Appear in small groups with basic melee.                                                    | ~15% chance for Type Two or a buff card.                                            |
| **Guerrero Maya** (Medium)    ![EnemyThumbnail](../src/assets/charSpritesheets/enemyThumbnails/warriorThumb.png)   | 20       | 3       | Balanced offense/defense, can block. Slower but more durable.                               | ~20% chance for mid-tier weapons  or transformation.                        |
| **El Diablo (Replica)** (Heavy) ![EnemyThumbnail](../src/assets/charSpritesheets/enemyThumbnails/devilThumb.png)  | 35       | 4       | Attacking with a heavy trident, dealing huge damage. Disappears upon defeat (replica).      | ~10–15% chance for high-tier gear  or powerful buffs.            |
  

#### Bosses

1. **Quetzcoalt (Serpent Form)**  
    ![EnemyThumbnail](../src/assets/charSpritesheets/enemyThumbnails/quetzThumb.png)
   - **HP**: ~85  
   - **Damage**: 4–6  
   - **Behavior**: Floats in serpent form, spitting acid or energy orbs.  
   - **Phase 1**: Sweeping tail attacks, occasional projectile.  
   - **Phase 2** (HP < 50%): Gains bullet-hell pattern (multiple orbs, swirling movement).  
   - **Drop**: 5–10% chance for Mariachi or Diablo, plus guaranteed healing/resources, and the blessing of God you will get permament max health.

2. **Ah Puch (God of Death)**  
![EnemyThumbnail](../src/assets/charSpritesheets/enemyThumbnails/ahThumb.png)
   - **HP**: ~110  
   - **Damage**: 5–7  
   - **Behavior**: Humanoid form, performs heavy physical strikes and launches fire zones.  
   - **Phase 1**: Straightforward melee combos + fire projectiles.  
   - **Phase 2** (HP < 50%): Expands fire zones, summons undead minions or orbs.  
   - **Drop**: No drop as this is the final boss, if defeated you win the game.

**Level difficulties**

| **Enemy**             | **Level 1 (HP/Damage)** | **level 2 (HP/Damage)** | 
|:-----------------------:|:---------------------:|:---------------------:|
| **Mariachi**            | 10/1                  | 13/1             |          
| **Tlaxcaltecas**        | 15/1               | 17/2                | 
| **Guerrero Maya**       | 20/2                  | 25/2               | 
| **Diablo (Réplica)**    | 35/3                  | 40/4               | 
| **Boss Quetzalcóatl**   | 85/4                  | N/A                   | 
| **Boss Ah Puch**        | N/A                   | 105/6                 | 
| **Time limit**| 10 min | 7 min|

#### Timer Justifications
In each level you will have a limited time.
- In the first level 4 min (so you have time to get used to the game mechanics).
- In the second level 7 min (already with experience you know what to do and how to face the challenges)

##### Combat and Timers

To prevent the player or enemies from abusing attacks or moves, the following **cooldowns** and reaction times are set:

1. **Main Character Attacks** 
   - **Time between hits**: 0.5 s cooldown after a single attack before being able to initiate another one.  
   - **3-hit combo**: Each hit of the combo has ~0.3 s delay. After the third hit, there is an overall **cooldown** of 0.8-1 s before restarting the combo.  
   - Justification**: Avoids “spamming” attacks and forces the player to measure times, giving enemies a chance to respond.

2. **Dash Collapse**  
   - **Dash**: 2 seconds of cooldown after using it (the player can't dash again until those 2 seconds are over).  
   - **Partial invulnerability**: The first 0.2 seconds of the dash make the player invincible, but after that instant he can take damage if it coincides with an enemy attack.

3. **Enemies - Attack Frequency and Detection**.  
   - **Light Enemies (Mariachi, Tlaxcaltecas)**.  
     - **Attack frequency**: 1 s cooldown between each hit.  
     - **Detection range**: ~5 cells (or tiles) away; at advanced levels, increases to 6.  
   - **Medium (Mayan Warrior)**.  
     - **Attack frequency**: ~1.2 s cooldown; can chain 2 hits if the player is very close.  
     - **Detection range**: ~7 cells; increases to 8 at higher levels.  
   - **Heavy (El Diablo Replica)**.  
     - **Attack frequency**: 1.5 s cooldown; enemy pauses for a short time after each teleport before attacking.  
     - **Detection range**: ~10 cells; maintains intense pursuit until breaking line of sight.

**Note** : These values are estimates for balanced combat; should be tested in *playtesting* and adjusted according to desired difficulty. Stress tests are recommended to verify that the player cannot “break” the game by spamming combos or dashes without consequences.

### Procedural/Randomized Elements
| | **Level 1** | **Level 2** |
|---|----------|------------|
| **Rooms** | 12 Possible choices: <ul><li>You enter a starting room</li><li>You have multiple paths</li><li>Some doors are closed and you can't pass through them</li><li>All accessible paths lead to the boss.</li></ul> | 15 Possible choices: <ul><li>More possibilities to explore and try to reach the boss</li><li>All accessible paths lead to the boss.</li></ul> |
| **Enemies** | 3-5 enemies in each dungeon room: <ul><li>Can do 3, 4, 5 enemies in each room</li></ul> | From 4 to 7 enemies in each room: <ul><li>Higher possibility of high-category enemies</li></ul> |
| **Vases** (max 5 per room) ![Vase](../src/assets/mapElements/vase.png) | A vase has a 15% chance in every room of the dungeon at this level. | A vase has a 20% chance in every room of the dungeon at this level. |

| **Enemy Probabilities**   | **Level 1**                  | **Level 2**                  |
|---------------------------|------------------------------|------------------------------|
| **Mariachi** (Type1)      | ~40% of appearances         | ~20% of appearances         |
| **Tlaxcaltecas** (Type1)  | ~40% of appearances         | ~20% of appearances         |
| **Guerrero Maya** (Type2) | ~15% of appearances         | ~40% of appearances         |
| **Diablo (Replica)** (Type2) | ~5% of appearances      | ~20% of appearances         |
| **Boss Quetzalcoatl**     | Only in the final boss room (100% chance if it's the boss room in Level 1) | 0% in normal rooms |
| **Boss Ah Puch**          | 0% in normal rooms         | Only in the final boss room (100% chance if it's the boss room in Level 2) |


### Vase 
**Card Probabilities**
You have a secured card:
- 10% of a rare card (Calavera, machete, obsidian, macuahuilt)
- 50% of a common card (Corazon, Valiente, Taco)
- 30% of a medium card (Mariachi, Mayan Warrior)


### Score 
**Value Assigned per Event/Element**
Each action gets rewarded in-game, counting towards the total score for the run. 

| **Event**   | **Points Awarded**                  |
|---------------------------|------------------------------|
| _Vase Opened_  | + 50 |
|  _Card pickup_ | + 70 |
|  _Card used_ | + 50 |
|  _Mariachi defeated_ | + 200 |
|  _Tlaxcalteca defeated_ | + 250 |
|  _Mayan Warrior defeated_ | + 300 |
|  _Devil defeated_ | + 300 |
|  _Quetzalcoatl boss defeated_ | + 600 |
|  _Ah Puch boss defeated_ | + 800 |
|  _Level 1 cleared_ | + 1000 |
|  _Level 2 cleared_ | + 1250 |
|  _Time bonus_ | + (Remaining level seconds * 15) |

### Camera
A camera will follow the player, centering its position along the canvas context so that the game feels more immersive, an added challenge in exploration is introduced, and sprites are better seen.

---

## _Level Design_

---
### **Themes**

Basic Room Mockup: 

![Empty Room Prototype](/Videojuego/GDDImages/RoomSketch.jpeg)
![Empty Room Prototype with Character](/Videojuego/GDDImages/RoomSketchChar.jpeg)

1. Level 1 - "Pyramid Entrance"
    1. Mood
        1. Uneasy, ancient, archaeological, but kind of bright or light-themed
    2. Objects
        1. _Ambient_
            1. Vines
            2. Columns
            3. Runes
            4. Stone tile variants
            5. Pyramid wall tiles
        2. _Interactive_
            1. Vases
            2. Cards
            3. Mayan Warrior
            4. Mariachis
            5. Quetzalcóatl, Aztec Serpent God
2. Level 2 - "Into the Abyss"
    1. Mood
        1. Dangerous, tense, archaeological, but darker in ambiance
    2. Objects
        1. _Ambient_
            1. Vines
            2. Columns
            3. Runes
            4. Torches
            5. Darker s
            6. tone tile variants
            7. Underground wall tiles
        2. _Interactive_
            1. Vases
            2. Cards
            3. Mariachis
            4. Tlaxcaltecas
            5. Demons
            6. Ah Puch, Mayan God of Death


### ****
![GameFlow Diagram](/Videojuego/GDDImages/GameFlow.jpeg)
1. Start screen.
2. Introductory story-text appears, telling "why" the player starts where they start.
3. Player spawns in a room with doors to their sides.
4. Player leaves initial room with Base Weapon
5. Player must explore and complete 2 levels without dying. 
    1. The Player explores and finds different rooms/enemies/vases/cards
        1. If the player finds an enemy, they can choose to avoid or to attack by going near with melee attacks or by activating power-up cards
        2. If the player finds a vase, they open it by pressing F
        3. If player finds a room with a doorway, by travelling to it they can enter more rooms
        4. If player encounters a card, they can pick it up by going near it
    2. The player continuously collects and uses different cards while travelling through rooms until the boss room is reached. 
    3. A boss fight ensues. The player must reduce the Health Points of each boss to 0.
    4. If the player beats the foe, a permanent buff is gained and the level is cleared, allowing the player to continue to the next level.
6. When both levels are cleared in a single run, the player wins and the game ends. 
    1. Alternatively, if the player loses all of their HP, almost all of the progress is reset up until Step 2 of Game Flow. 
![Map Idea](/Videojuego/GDDImages/Mapa%20Idea.jpeg)
---

## _Development_

---

### **Abstract Classes / Components**

1. `TextLabel` 
2. `Rect`
3. `Vec`
4. `GameObject`
5. `Game`
6. `Inventory`
7. `Level`
8. `TreeNode`
9. `Tree`
10. `Camera` 



### **Derived Classes / Component Compositions**

1. `GameObject`
    1. `AnimatedObject` 
        1. `BaseCharacter`
            1. `BaseEnemy`
                1. `EnemyTlaxcalteca`
                2. `EnemyMariachi`
                3. `EnemyDemon`
                4. `EnemyMayan`
            2. `BaseBoss`
                1. `EnemyQuetzalcoatl`
                2. `EnemyAhPuch`
            3. `BasePlayer`
        2. `Torch`
    2. `BaseCard`
        A. `MacuahuitlCard`
        B. `ObsidianKnifeCard`
        C. `MacheteCard`
        D. `MariachiCard`
        E. `DiabloCard`
        F. `MayanWarriorCard`
        G. `CorazonCard`
        H. `ValienteCard`
        I. `TacoCard`
        J. `CalaveraCard`
    3. `BaseInteractable`
        1. `Vase`


---

## _Graphics_

---

### **Style Attributes**

The color palette to be followed revolves around Earthly, Warm and Ancient tones, particularly dominated by sandstone beiges, greys, greenery, browns and particular accent colors, as well as black for contrast.

The game is pictured as a pixel-art concept, with general cubic shapes governing the general ambiance except for noteworthy aspects of what is being shown, such as the character, enemies, objects, etc. to make them stand out at a glance. Therefore, these will be the ones without sharp angles, aiming for a more detailed shape. Solid edges will be used as well for important elements, but non-black outlines with tints and hue variants will also be relied upon in order to avoid having a monotonous, flat appearance in the object characterization. Weathered objects in the background and context will be interpreted by using color ramps to enhance textures, giving objects a more natural, weathered look.

Well-designed feedback, both good (e.g. leveling up, beating a boss) and bad (e.g. being hit, dying and restarting), are great for teaching the player how to play through trial and error, instead of scripting a lengthy tutorial.

For interactive elements, visual feedback should feel intuitive and fit naturally within the pixel-art style and color philosophy:
- Color and Lighting Variations: Slight hue shifts to distinguish interactable objects, soft lighting pulses or glows, as will be the case for vases

### User Interface
The way the UI was done is through a seperate section of the screen, with its card slots visible through a black rectangle where they appear when you grab one from the ground, as the cards get used, they move to the left and open the spots to the right. 

![GUI Mockup](/Videojuego/GDDImages/GUIImages.jpg)

![Final GUI](./GDDImages/MainScreen.png)

The idea is for the interface to be as simple as possible, but still incorporating the color pallet of the game, also in a pixel-like style and with everything neatly tagged.

### **Graphics Needed**

1. Characters
    1. Human-like
        1. Main Character (idle, walking, stabbing, dashing)

        ![Main character's spritesheet](/Videojuego/GDDImages/mainCharSpriteSheet.jpeg)

        
        2. Tlaxcalteca (idle, walking, stabbing)

        ![Enemy Spritesheet](../src/assets/charSpritesheets/SpriteSheetTlaxcalteca.png)


        3. Mariachi (idle, walking, hitting)

        ![Base transformation spritesheet: Mariachi](/Videojuego/GDDImages/mariachiSpriteSheet.jpeg)
        ![Enemy Spritesheet](../src/assets/charSpritesheets/skelMariachi_SpriteSheet.png)

        4. Demon (idle, walking, hitting)

        ![Enemy Spritesheet](../src/assets/charSpritesheets/devilAttack.png)
        ![Enemy Spritesheet](../src/assets/charSpritesheets/devilWalk.png)


        5. Mayan Warrior (idle, walking, attacking)

        ![Enemy/tranformation spritesheet walk](../src/assets/charSpritesheets/warriorWalkSpriteSheet.png)
        ![Enemy/transformation spritesheet attack](../src/assets/charSpritesheets/warriorFightSidesSpriteSheet.png)
        
        
        6. Ah Puch (idle, walking, hitting, shooting)

        ![Ah Puch Spritesheet walk](../src/assets/charSpritesheets/PrubeaNewAhPuch.png)
        ![Ah Puch Spritesheet fight](../src/assets/charSpritesheets/AhPuchNewFigth.PNG)

    2. Other
        1. Quetzalcóatl: serpent-like (idle, slithering, hitting, shooting)

        ![Adaption from Pokemon - Nintendo. All credits due](../src/assets/charSpritesheets/SpriteSheetQuetzacoaltPeleando.png)
        ![Adaption from Pokemon - Nintendo. All credits due](../src/assets/charSpritesheets/SpriteSheetBossQIDLE.png)

2. Blocks
    1. Stone Block Variants

        ![Stone Block Variants Examples](/Videojuego/GDDImages/FloorTiles.jpg)
        
        1. Stone Block
        2. Cracked Stone Block 
        3. Mossy Stone Block
    2. Pyramid wall tiles 
        
        ![Wall examples Lvl1](../src/assets/mapElements/brickYellow.png)

        1. Wall block
        2. Cracked wall block
        3. Wall border
    2. Underground wall tiles

        ![Wall example Lvl2](../src/assets/mapElements/brickPurple.png)

        1. Underground Wall block
        2. Cracked Underground wall block
        3. Wall border

3. Ambient
    1. Torch [Source](https://opengameart.org/content/simple-torch-animation-16x16)

        ![Torch animation asset](/Videojuego/GDDImages/torch_anim.png)

    2. Vines [Source](https://opengameart.org/content/vines)

        ![Vines asset](/Videojuego/GDDImages/Vines.png)


4. Other
    1. Vase 
    
        ![Vase](../src/assets/mapElements/vase.png)

    2. Door (matching Wall block and Underground Wall block)

        - Open:     
           ![opendoor](../src/assets/mapElements/doorOpen.png)
        - Closed path: 
            
            ![closed door](../src/assets/mapElements/door.png)
        - Level Exit: 
        
            ![level exit](../src/assets/mapElements/bossdoor.png) 
    3. Card (10 mini versions for map appearance, 10 more detailed screenings for player UI) [Loteria Cards](#Lotería-Cards) 
    4. Base weapon


---

## _Sounds/Music_

---

### **Style Attributes**

For the style attributes, the game’s music and sound should have a consistent and immersive feel. The instrumentation will primarily consist of chiptune-style synths mixed with orchestral elements to create an atmospheric and adventurous sound. The tempo will vary based on intensity, with moderate pacing for exploration and faster tempos for action-heavy moments, particularly boss fights. Most tracks will be in minor keys to evoke mystery and tension, while major keys will be used sparingly for uplifting moments like victory themes. Influences include classic roguelikes, Dark Souls, Castlevania, and Legend of Zelda, aiming for a dark, mysterious, and adventurous tone. Sound effects will be subtle but distinct, ensuring clear feedback for player actions without overwhelming the music. The overall approach will balance realism with stylized elements, ensuring that auditory cues stand out without clashing with the environment.

The game will need various sound effects to enhance immersion and provide auditory feedback for player actions. Footsteps will sound sharper against stone surfaces. Other environmental sounds include a vases opening, power-ups being used, and melee attacks landing, all designed to feel responsive and natural. Feedback sounds will be crucial for player experience, such as a relieved sigh when gaining health, a surprised grunt when taking damage, and a sad, descending chime upon death.

The music will be structured to loop per level, maintaining an immersive experience throughout gameplay. Unsettling undertones will build tension, and the music will likely be slow paced. For triumphant moments, a short, victorious fanfare will play upon completing significant challenges, and a melancholic, fading theme will accompany game-over screens to emphasize the weight of failure. 

### **Sounds Needed**

1. Effects
    1. Sharp Footsteps (stone floor) [Source](https://opengameart.org/content/step-sound-walking)
    2. Vase Opening/breaking [Source](https://www.myinstants.com/en/instant/ceramic-breaking-ceramica-rompiendose-35022/)
    3. Card picked up [Source](https://opengameart.org/content/beep-tone-sound-sfx)
    4. Card used [Source](https://opengameart.org/content/power-up-sound-effects)

### **Music Needed**
- Menu music [Source](https://felgo.com/game-resources/free-music-for-games)
- Music for level 1 [Source](https://felgo.com/game-resources/free-music-for-games)
- Boss music level 1 [Source](https://felgo.com/game-resources/free-music-for-games)
- Music for level 2 [Source](https://felgo.com/game-resources/free-music-for-games)
- Boss music level 2 [Source](https://felgo.com/game-resources/free-music-for-games)
- Victory music [Source](https://www.myinstants.com/en/search/?name=victory+fanfare)
- Game over/death music [Source](https://opengameart.org/content/game-over-bad-chest-sfx)



## _Illustrations_

**Mockup of empty room with player inside**

![Empty room with player](/Videojuego/GDDImages/RoomSketchChar.jpeg)

**GUI Mockups**

![GUI Mockup V1](/Videojuego/GDDImages/GUIImages.jpg)

![GUI Mockup V2](/Videojuego/GDDImages/GUIImages2.jpeg)

**Main Character's spritesheet** 

![Main character's spritesheet](/Videojuego/GDDImages/mainCharSpriteSheet.jpeg)

**Enemy spritesheet: Mariachi**

![Base enemy spritesheet: Mariachi](/Videojuego/GDDImages/mariachiSpriteSheet.jpeg)

**Mariachi Enemy Card**

![Mariachi Card](/Videojuego/GDDImages/mariachiCard.jpeg)

**BaseWeapon Card to show in player's UI**

![Macahuitl Card](/Videojuego/GDDImages/baseweaponCard.jpeg)

**Heart Card to show in player's UI**

![Heart Card](/Videojuego/GDDImages/heartCard.jpeg)

--- 

## _Schedule_

---

### Sprint 1: 

1. Create folder structure inside repository for HTML, JavaScript, and CSS files, as well as assets
2. Base classes & controls
    1. Creation of character & object base classes such as `BasePhysics`, `BasePlayer`, `BaseEnemy`, `BaseObject`, `TextLabel`, `Rect`, `BaseObstacles`
3. Basic `Event listeners` for player (movement, attack), `boxOverlap()` functions
4. Make character design
5. UML recreational model
6. Set up project structure with HTML, JS, and CSS files

### Sprint 2:
1. Set up `Basic Enemy derived classes`
2. Delve into combat system and player attributes, as well as player sprite animation
3. Set up Interactables
4. Add the `ApplyEffect` to the power up system

### Sprint 3: 
1. Finish designing sprites and setting up basic animations for characters
2. Start the website page with its aesthetics
3. Start the Database and learn the CRUD method
4. Set up `Card classes` with sprites
5. Set up `Boss classes` with sprites
6. Have background music running for each of the levels and bosses
7. Have a function where the background music in a function where its called to switch musics depending on the level

### Sprint 4: 
1. Work on level generation
2. Setup interactions between entities
3. Work on screens, start/pause menu, game over, victory screens
4. Have a prototype game ready

### Sprint 5: 
1. Work on placing entities onto `context`
2. Incorporate entities onto GUI with assets
3. Work on front-end, screens and bringing everything together

### Sprint 6: 
1. Add sound effects of dashing, vase breaking, attack, attacking and recieving and dealing damage
2. Make adjustments in gameplay based on testing
3. Correct bugs
4. Update GDD
