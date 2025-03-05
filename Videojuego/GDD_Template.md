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

### **Mindset**
The game is designed to be played with an adventure-oriented and reward-facing mindset toward the unknown, starting with just a base weapon but seeking to improve in a tense and challenging environment. The player must feel the curiosity to explore rooms and gain rewards along the way, but exercise caution due to the threat of going all-in with each enemy the player encounters. They must manage their inventory conservatively, sometimes with a bit of improvisation but always rushing to face the level's boss.



## _Technical_

---

### **Screens**

1. Title Screen
    1. Options
2. Game
    1. HUD Game
    2. Pause Menu
        1. In-Game Options
    3. Transition to next level
4. Death screen (Game Over)
5. Victory screen

### **Controls**

1. Movement
	1. W / Up Arrow key: player moves "upwards"/north
    2. A / Left Arrow key: player moves left/west
    3. S / Down Arrow key: player moves "downwards"/south
    4. D / Right Arrow key: player moves right/east
Combining keys provides diagonal movement (ex. W+A results in a northeasth direction)  
2. Combat
	1. Attack with BaseCard: [Spacebar]
3. Lotería Cards Usage
	1. F: chest interaction
    2. Picked-up cards will be automatically asigned to a slot numbered from 1 to 5. The corresponding numbers on the keyboard when clicked will activate the assigned card. 
    3. If the player comes into contact with a card, and a slot is empty, it will automatically be collected
    4. If there is no space available, the player would have to use one of their inventoried cards to clear a space
4. Menus & Options
	1. [ESC]: brings up Pause menu
    2. Arrows: allow navigation in-menu

### **Mechanics**

1. Lotería Card System (Dynamic Power-Ups)
	1. Players collect and activate Lotería cards for temporary or permanent abilities depending on the rewards given.
	2. Some cards give elemental effects (fire, wind, shadow, ice) or transformation abilities (e.g., El Mariachi grants a music-based attack).
lementation:
	Card Collection: Stored in an inventory system using an array.
	Effects Application: Each card applies a modifier to player stats using an event-driven system (e.g., attack power, speed boost).
	Procedural Spawning: Randomized card drops use probability weight tables to ensure variety in every drop.
2.  Multi-Phase Boss Fights (Soulslike & Zelda-Inspired)
	1. Bosses have multiple attack phases that change dynamically based on the health left.
Impletion:
	Finite-State Machines (FSM): Used to transition between attack patterns based on boss health/stamina.

// Hector se avienta lo de esta sección ^---^


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

_(example)_

### **Derived Classes / Component Compositions**

1. BasePlayer
    1. PlayerMain
    2. PlayerUnlockable
2. BaseEnemy
    1. EnemyWolf
    2. EnemyGoblin
    3. EnemyGuard (may drop key)
    4. EnemyGiantRat
    5. EnemyPrisoner
3. BaseObject
    1. ObjectRock (pick-up-able, throwable)
    2. ObjectChest (pick-up-able, throwable, spits gold coins with key)
    3. ObjectGoldCoin (cha-ching!)
    4. ObjectKey (pick-up-able, throwable)
4. BaseObstacle
    1. ObstacleWindow (destroyed with rock)
    2. ObstacleWall
    3. ObstacleGate (watches to see if certain buttons are pressed)
5. BaseInteractable
    1. InteractableButton

_(example)_

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
