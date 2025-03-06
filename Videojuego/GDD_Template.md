# **MayAztec: El Ascenso de la Lotería**
![Game Logo.](/Videojuego/GDDImages/Game_Logo.png) 

## _Game Design Document_

---

##### **Copyright notice / author information / boring legal stuff nobody likes**
###### Authors: 
- Mauricio Emilio Monroy González
- Hector Lugo
- Nicolas Quintana

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
        1. Ambience
        2. Objects
            1. Ambient
            2. Interactive
        3. Challenges
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
8. [Schedule](#schedule)

## _Game Design_

---

### **Summary**
Embark on a thrilling journey through a mystical pyramid steeped in Aztec and Mayan mythology, infused with a contemporary Mexican flair. In this roguelite adventure, players must confront ancient gods in adrenaline-pumping battles, while discovering unique power-ups and abilities hidden within traditional lottery cards. Each card offers temporary, game-changing boosts, ensuring an ever-evolving and dynamic gameplay experience. Time runs out per level. The gods are waiting. Will you break the cycle of death and resurrection, or be trapped in the eternal curse forever?


### **Gameplay**
The player's character exists in a 2D world, based in an ancient pyramid, with distinct levels that ensure no two experiences are the same. Each level will consist of randomly generated room layouts with enemies and reward chests, as well as a corresponding boss. To progress, the player must explore areas filled with a mix of challenging enemies, and collect cards that aid in their advancement before the alloted time per level runs out. In order to survive, the player will possess an "inventory" of 6 cards (1 permanent and 5 consumables), which will provide temporary but varied boosts in stats for combat or in weaponry. 

#### Game Objective
The objective is to gradually defeat the ancient gods and break their curses, in order to escape the infinite cycle of death and resurrection they've thrust yourself upon. At first, the task will seem daunting, but by gradually advancing, and gaining powerful weapons and powerups, little by little the player's knowledge, experience and abilities will grow. 

#### Obstacles and Challenges
In order to finish the game, a player would have to beat all the levels in a single, continuous attempt. The player must fight with enemies spawning randomly in randomly generated room layouts, as well as manage inventory consumables adequately and strategically. All cards act as consumables, some with more, some with less. Once a card's allowed uses are spent, the player must search for more (either through combat, since defeated enemies have a chance to drop a card, or  through exploring) to refill their acting inventory. Upon taking significant damage, the current "game run" will be over, and most of the player's progress will be lost, and they will have to traverse the levels from the beginning. They will only be able to start over with the last card they picked up from their previous life, along with a basic default card, forcing the player to repeatedly attempt to complete the game from scratch. Also, the gods provide a limited preparation time depending on each level as a challenge before facing them, allowing the player to explore the level, prepare their inventory with what they'd like to use for boss fights and choose which challenges to face. The greater the adventure, the better the reward.

#### Tactics & Strategies
The player will face 3 types of base-enemies in close-range combat, as well as 2 boss fights. To overcome these obstacles, the player must experiment with different card usage, as well as find a balance on when to fight and when they decide they figure their inventory is just right for a boss fight, thus requiring a bit of exploring and combat to prepare. As they progress in further levels, the benefits reaped from the cards will increase as difficulty does, therefore providing better tools and advantages. Time and inventory management balanced will be of the essence.

##### Overview
In **MayAztec**, the player must be balance **close-range-combat**, **inventory managment**, and **strategic use of Lotería cards**. With three types of base enemies and two major boss fights, every encounter demands a measured approach:

- **Short-range battles**: The player wields a base weapon (e.g., a macuahuitl) and can enhance or replace it with cards.
- **Exploration & Preparation**: Delving into each level, the player must decide when to keep exploring for better cards vs. when to confront the boss.
- **Risk vs. Reward**: Entering fights unprepared could result in heavy damage or death, while thorough exploration may grant powerful temporary or permanent card effects.

##### Base Enemies Tactics
1. **Light Enemies (Type I)**
   - Low HP, fast movement.
   - Recommended tactic: Time your attacks between their combos, use dash to evade.
   - Card Synergy: Damage-boosting or healing cards to withstand longer fights.
2. **Medium Enemies (Type II)**  
   - Moderate HP, balanced offense.  
   - Recommended Tactic: Time your attacks between their combos, use dash to evade.  
   - Card Synergy: Damage-boosting or healing cards to withstand longer fights.

3. **Heavy Enemies (Type III)**  
   - High HP, slower but with powerful hits.  
   - Recommended Tactic: Maintain distance, wait for their slow wind-up, then strike.  
   - Card Synergy: Card hearth or DoT (Damage-over-Time) effects help chip away at their large health pool.

##### 1.3 Boss Fights Tactics
- **Boss Phase Recognition**: Watch for animation or HP threshold cues that signal a shift in behavior.
- **Positioning**: Move diagonally to avoid linear bullet-hell attacks or area-of-effect strikes.
- **Card Management**: Ensure at least one slot is free to pick up an on-the-fly power-up if you find a chest in the boss arena.

##### 1.4 Inventory & Time Management
- **Card Slots**: You have up to 5 Lotería card slots. Decide which effects to keep and which to discard.
- **Resource Conservation**: Overusing your best cards early may leave you underpowered for the boss.
- **Retreating**: If a fight seems too risky, backtrack to search for better cards or healing items.

---

### **Mindset**
The game is designed to be played with an adventure-oriented and reward-facing mindset toward the unknown, starting with just a base weapon but seeking to improve in a tense and challenging environment. The player must feel the curiosity to explore rooms and gain rewards along the way, but exercise caution due to the threat of going all-in with each enemy the player encounters. They must manage their inventory conservatively, sometimes with a bit of improvisation but always rushing to face the level's boss.



## _Technical_

### 3.1 Screens & Menus

| **Screen**                | **Description**                                                                                                                 |
|---------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| **Title Screen**          | Displays game logo, “Start,” “Options,” “Exit.”                                                                               |
| **Options**               | Audio volume, keybindings, video settings.                                                                                    |
| **Game (Main Gameplay)**  | Core level exploration and combat take place here.                                                                            |
| **HUD Game**              | Shows player HP and Bar of resistance, card slots (1–5), base weapon icon, boss HP (when engaged).                                                  |
| **Pause Menu**            | [ESC] key triggers. Options to resume, adjust settings, or quit to Title.                                                     |
| **In-Game Options**       | Accessible from Pause. Allows quick audio/controls tweak.                                                                      |
| **Transition Screen**     | Brief fade-in/out or summary after clearing a level.                                                                          |
| **Death Screen (Game Over)** | Shows final stats (time played, enemies killed, cards used). Option to restart or quit.                                       |
| **Victory Screen**        | After defeating the final boss. Displays completion time and final card usage.                                                |



### **Controls**

| **Action**                 | **Default Key**                  | **Description**                                                                          |
|----------------------------|----------------------------------|------------------------------------------------------------------------------------------|
| **Move Up**                | W / Up Arrow                      | Moves player character north.                                                            |
| **Move Left**              | A / Left Arrow                   | Moves player character west.                                                             |
| **Move Down**              | S / Down Arrow                   | Moves player character south.                                                            |
| **Move Right**             | D / Right Arrow                  | Moves player character east.                                                             |
| **Attack (BaseCard)**      | Spacebar                         | Performs a melee attack with the base weapon/card.                                       |
| **Interact (Chest)**       | F                                | Opens chests, picks up items if available.                                               |
| **Use Card 1–5**           | Number Keys 1–5                  | Activates the assigned Lotería card.                                                     |
| **Dash**                   | Shift                            | Brief invulnerability and burst movement. Consumes stamina.                              |
| **Pause Menu**             | ESC                              | Opens pause menu with in-game options.                                                   |
| **Menu Navigation**        | Arrow Keys / W, A, S, D + Enter  | Navigate in menus, confirm selections.                                                   |


### **Mechanics**

1. **Lotería Card System (Dynamic Power-Ups)**  
   - **Inventory Array**: Cards collected go into slots [1–5].  
   - **Usage**: Press the corresponding number key to activate.  
   - **Effects**: May increase speed, attack, or transform the player for a limited time.  
   - **Balance**: Probability weight tables ensure varied card drops.

2. **Boss Fights (Soulslike & Zelda-Inspired)**  
   - Multi-phase attacks.  
   - **HP Thresholds**: e.g., 50% HP triggers new pattern or bullet-hell.  
   - **Reward**: Defeating a boss can grant permanent buffs or advanced cards.

3. **Time & Inventory Management**  
   - The deeper the level, the tougher the enemies, but the more potent the cards.  
   - Inventory capacity is limited to **5** active card slots.

4. **Procedural/Randomized Elements**  
   - **Enemy spawn points**: Weighted random within each room.  
   - **Card/Item drops**: Probability-based, scaling with each new level.

## Considerations

### Mindset & Player Experience
- **Adventure-Oriented**: Encourage players to explore each room, face unknown threats, and chase potential rewards.
- **Reward-Facing**: The tension between pressing forward or backtracking for more cards fosters strategic planning.
- **Caution**: Overconfidence can lead to a quick defeat; careful resource usage is key.

### Difficulty & Progression
- **Incremental Complexity**: Each level introduces new card possibilities and tougher enemies.  
- **Boss Difficulty Spike**: Encourages the player to utilize the best synergy of cards and sharpen their reflexes.

###Lotería Cards

Below is the updated **sample set** of 10 base cards. Each card has an **ID**, a **type** (weapon, transformation, buff), a **damage** (if ap plicable), and an optional **duration** in seconds. Cards can be found in chests or dropped by enemies based on a probability system (e.g., 10–30% chance depending on the enemy).

#### Cartas de Armas

| **Card ID** | **Name**         | **Type** | **Damage**     | **Duration** | **Effect / Description**                                                                                                      |
|:----------:|:----------------:|:--------:|:-------------:|:-----------:|:--------------------------------------------------------------------------------------------------------------------------------|
| A-001       | Macuahuitl      | Weapon   | 2 pts         | –           | Arma azteca con obsidiana incrustada. Replaces base weapon.                                                                    |
| A-002       | Cuchillo Obs.   | Weapon   | 1 pt          | –           | Ligero y rápido, ideal para speed combos.                                                                                     |
| A-003       | Machete         | Weapon   | 2 pts + 1 DoT | –           | +1 de veneno por 2 seg. Ideal vs. enemigos con alta HP (Heavy).                                                               |

#### Cartas de Transformación

| **Card ID** | **Name**         | **Type**         | **Damage** | **Duration** | **Effect / Description**                                                                                                                      |
|:----------:|:----------------:|:----------------:|:---------:|:-----------:|:-----------------------------------------------------------------------------------------------------------------------------------------------|
| T-001       | Mariachi         | Transformation   | 4 pts (guitar) | 10s         | +3 barras de vida temporal; el arma se convierte en guitarra con 4 pts de daño por “guitarrazo”.                                              |
| T-002       | Diablo           | Transformation   | 2 pts (trident) | 10s       | Regeneración automática hasta 6 barras de vida, con un tridente de 2 pts de daño.                                                             |
| T-003       | Guerrero Maya    | Transformation   | +1 actual weapon | 10s     | +2 barras de resistencia, regen de stamina 1 seg más rápida, y +1 daño al arma equipado.                                                      |

#### 5.1.3 Cartas de Buff

| **Card ID** | **Name**     | **Type**  | **Damage** | **Duration** | **Effect / Description**                                                                                                                               |
|:----------:|:------------:|:---------:|:---------:|:-----------:|:--------------------------------------------------------------------------------------------------------------------------------------------------------|
| B-001       | Corazón      | Buff      | –         | Instant     | Cura la vida completa y agrega 1 slot extra de vida. Si esa barra extra se pierde, no se regenera sin otra carta Corazón.                              |
| B-002       | El Valiente  | Buff      | –         | 10s         | Otorga **inmunidad** total al daño por 10s, pero **pierdes 1 barra de vida** al activarla.                                                             |
| B-003       | El Taco      | Buff      | –         | 10s         | La resistencia (stamina) no baja durante 10s, permitiendo dash o combos ilimitados en ese lapso.                                                       |
| B-004       | La Calavera  | Buff      | –         | 10s         | Mata enemigos normales de 1 golpe; contra bosses, añade +10 pts de daño al arma por 10s. Efecto muy poderoso, pero rara vez droppea en early game.     |

**Drop Probability (General Guidelines)**:
- **Light Enemies (El Músico, Tlaxcaltecas)**: ~10–15% chance for low-tier weapons (A-002) or buff cards (B-001, B-003).  
- **Medium Enemy (Guerrero Maya)**: ~20% chance for mid-tier weapons (A-001, A-003) or transformation T-003.  
- **Heavy Enemy (El Diablo)**: ~10–15% chance for high-tier gear (A-003) or powerful buffs (B-004).  
- **Chests**: Weighted random from the full set (A-001 to B-004), guaranteed at least 1 card.  
- **Boss Fights**: 5–10% chance for transformations (T-001, T-002) plus guaranteed resources.

---

### Enemies & Bosses

#### Normal Enemies

| **Enemy**             | **HP Range** | **Damage** | **Behavior**                                                                                 | **Drop Probability**                                                             |
|:---------------------:|:-----------:|:---------:|:--------------------------------------------------------------------------------------------:|:---------------------------------------------------------------------------------:|
| **El Músico / Mariachi** (Light) | 10–15       | 1–2       | Quick guitar strikes; leaps backward. Often tries to flank.                                 | ~15% chance for low-tier (A-002) or minor buffs (B-001, B-003).                  |
| **Tlaxcaltecas** (Light)         | 10–15       | 1–2       | Appear in small groups with basic melee.                                                    | ~15% chance for A-002 or a buff card.                                            |
| **Guerrero Maya** (Medium)       | 20–25       | 2–3       | Balanced offense/defense, can block. Slower but more durable.                               | ~20% chance for mid-tier weapons (A-001, A-003) or T-003.                        |
| **El Diablo (Replica)** (Heavy)  | 35–40       | 3–4       | Teleports near the player, attacking with a trident. Disappears upon defeat (replica).      | ~10–15% chance for high-tier gear (A-003) or powerful buffs (B-004).            |

**Scaling**:  
- Light enemies: +2% HP each room.  
- Medium enemies: +10% HP each level.  
- Heavy enemies: +15% HP each level.  

### Bosses

1. **Quetzcoalt (Serpent Form)**  
   - **HP**: ~80–100  
   - **Damage**: 4–6  
   - **Behavior**: Floats in serpent form, spitting acid or energy orbs.  
   - **Phase 1**: Sweeping tail attacks, occasional projectile.  
   - **Phase 2** (HP < 50%): Gains bullet-hell pattern (multiple orbs, swirling movement).  
   - **Drop**: 5–10% chance for T-001 (Mariachi) or T-002 (Diablo), plus guaranteed healing/resources, and the blessing of God you get a greater resistance.

2. **Ah Puch (God of Death)**  
   - **HP**: ~120–140  
   - **Damage**: 5–7  
   - **Behavior**: Humanoid form, performs heavy physical strikes and launches fire zones.  
   - **Phase 1**: Straightforward melee combos + fire projectiles.  
   - **Phase 2** (HP < 50%): Expands fire zones, summons undead minions or orbs.  
   - **Drop**: 5–10% chance for T-002 (Diablo) or T-003 (Guerrero Maya), plus a permanent unlock if design allows.

---


## _Level Design_

---
### **Themes**

Basic Room Mockup with Character: 

![Room prototype](/Videojuego/GDDImages/RoomSketch.jpeg)

1. Level 1 - "Pyramid Entrance"
    1. Mood
        1. Uneasy, ancient, arqueological, but kind of bright or light-themed
    2. Objects
        1. _Ambient_
            1. Vines
            2. Columns
            3. Glyphs
            4. Stone tile variants
            5. Pyramid wall tiles
        2. _Interactive_
            1. Chests
            2. Cards
            3. Tlaxcaltecas
            4. Mariachis
            5. Quetzalcóatl, Aztec Serpent God
2. Level 2 - "Into the Abyss"
    1. Mood
        1. Dangerous, tense, arqueological, but darker in ambiance
    2. Objects
        1. _Ambient_
            1. Vines
            2. Columns
            3. Glyphs
            4. Torches
            5. Stone tile variants
            6. Underground wall tiles
        2. _Interactive_
            1. Chests
            2. Cards
            3. Tlaxcaltecas
            4. Demons
            5. Ah Puch, Mayan God of Death


### **Game Flow**

1. Start screen.
2. Introductory story-text appears, telling "why" the player starts where they start.
3. Player spawns in a room with doors to their sides.
4. Player leaves initial room with Base Weapon
5. Player must explore and complete 2 levels without dying. 
    1. The Player explores and finds different rooms/enemies/chests/cards
        1. If the player finds an enemy, they can choose to avoid or to attack by going near with melee attacks or by activating power-up cards
        2. If the player finds a chest, they open it by pressing F
        3. If player finds a room with a doorway, by travelling to it they can enter more rooms
        4. If player encounters a card, they can pick it up by going near it
    2. The player continously collects and uses different cards while travelling through rooms until the boss room is reached. 
    3. A boss fight ensues. The player must reduce the Health Points of each boss to 0.
    4. If the player beats the foe, a permanent buff is gained and the level is cleared, allowing the player to continue to the next level.
6. When both levels are cleared in a single run, the player wins and the game ends. 
    1. Alternatively, if the player loses all of their HP, almost all of the progress is reset up until Step 2 of Game Flow. 

## _Development_

---

### **Abstract Classes / Components**

1. BasePhysics
    1. BasePlayer
    2. BaseEnemy
    3. BaseObject
2. BaseObstacles
3. BaseInteractable


### **Derived Classes / Component Compositions**

1. BasePlayer
    1. PlayerMain
2. BaseEnemy (may drop 1 Card each)
    1. EnemyTlaxcalteca
    2. EnemyMariachi
    3. EnemyDemon
    4. EnemyQuetzalcoatl
    5. EnemyAhPuch
3. BaseObject
    1. ObjectCard (pick-up-able, consumable)
        1. Card
4. BaseObstacle
    1. ObstacleWall
5. BaseInteractable
    1. ObjectChest (interactable, gives 1 Card each guaranteed)



## _Graphics_

---

### **Style Attributes**

What kinds of colors will you be using? Do you have a limited palette to work with? A post-processed HSV map/image? Consistency is key for immersion.

What kind of graphic style are you going for? Cartoony? Pixel-y? Cute? How, specifically? Solid, thick outlines with flat hues? Non-black outlines with limited tints/shades? Emphasize smooth curvatures over sharp angles? Describe a set of general rules depicting your style here.

Well-designed feedback, both good (e.g. leveling up) and bad (e.g. being hit), are great for teaching the player how to play through trial and error, instead of scripting a lengthy tutorial. What kind of visual feedback are you going to use to let the player know they&#39;re interacting with something? That they \*can\* interact with something?





### **Graphics Needed**

1. Characters
    1. Human-like
        1. Main Character (idle, walking, stabbing, dashing)

        ![Main Character Sprite Prototype Action 1](/Videojuego/GDDImages/MainCharSpritePrototype%20(1).jpeg)
        ![Main Character Sprite Prototype Action 2](/Videojuego/GDDImages/MainCharSpritePrototype%20(2).jpeg)
        
        2. Tlaxcalteca (idle, walking, stabbing)
        3. Mariachi (idle, walking, hitting)
        4. Demon (idle, walking, hitting)
        5. Ah Puch (idle, walking, hitting, shooting)
    2. Other
        1. Quetzalcóatl: serpent-like (idle, slithering, hitting, shooting)
2. Blocks
    1. Stone Block Variants

        ![Stone Block Variants Examples](/Videojuego/GDDImages/FloorTiles.jpg)
        
        1. Stone Block
        2. Cracked Stone Block 
        3. Mossy Stone Block
    2. Pyramid wall tiles
        1. Wall block
        2. Cracked wall block
        3. Wall border
    2. Underground wall tiles
        1. Underground Wall block
        2. Cracked Underground wall block
        3. Wall border
    3. Column 
        1. Cracked column
        2. Vined column
3. Ambient
    1. Torch (flame1, flame2)
    2. Vines (variant1, variant2)
    3. Glyphs (sun symbol, mayan zero, dots)
4. Other
    1. Chest
    2. Door (matching Wall block and Underground Wall block)
    3. Card (7 miniatures for map appearance, 7 detailed screenings for player UI)
    4. Base weapon


## _Sounds/Music_

---

### **Style Attributes**

Again, consistency is key. Define that consistency here. What kind of instruments do you want to use in your music? Any particular tempo, key? Influences, genre? Mood?

Stylistically, what kind of sound effects are you looking for? Do you want to exaggerate actions with lengthy, cartoony sounds (e.g. mario&#39;s jump), or use just enough to let the player know something happened (e.g. mega man&#39;s landing)? Going for realism? You can use the music style as a bit of a reference too.

 Remember, auditory feedback should stand out from the music and other sound effects so the player hears it well. Volume, panning, and frequency/pitch are all important aspects to consider in both music _and_ sounds - so plan accordingly!

### **Sounds Needed**

1. Effects
    1. Soft Footsteps (dirt floor)
    2. Sharper Footsteps (stone floor)
    3. Soft Landing (low vertical velocity)
    4. Hard Landing (high vertical velocity)
    5. Glass Breaking
    6. Chest Opening
    7. Door Opening
2. Feedback
    1. Relieved &quot;Ahhhh!&quot; (health)
    2. Shocked &quot;Ooomph!&quot; (attacked)
    3. Happy chime (extra life)
    4. Sad chime (died)

_(example)_

### **Music Needed**

1. Slow-paced, nerve-racking &quot;forest&quot; track
2. Exciting &quot;castle&quot; track
3. Creepy, slow &quot;dungeon&quot; track
4. Happy ending credits track
5. Rick Astley&#39;s hit #1 single &quot;Never Gonna Give You Up&quot;

_(example)_


## _Schedule_

---

_(define the main activities and the expected dates when they should be finished. This is only a reference, and can change as the project is developed)_

1. develop base classes
    1. base entity
        1. base player
        2. base enemy
        3. base block
  2. base app state
        1. game world
        2. menu world
2. develop player and basic block classes
    1. physics / collisions
3. find some smooth controls/physics
4. develop other derived classes
    1. blocks
        1. moving
        2. falling
        3. breaking
        4. cloud
    2. enemies
        1. soldier
        2. rat
        3. etc.
5. design levels
    1. introduce motion/jumping
    2. introduce throwing
    3. mind the pacing, let the player play between lessons
6. design sounds
7. design music

_(example)_
