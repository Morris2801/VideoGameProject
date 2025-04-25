DROP SCHEMA IF EXISTS mayaztec;
CREATE SCHEMA mayaztec;
USE mayaztec;

SET SQL_SAFE_UPDATES = 1;

CREATE TABLE player (
	player_id INT PRIMARY KEY AUTO_INCREMENT ,
	username VARCHAR(20) , 
    password VARCHAR(20) , 
    date_create DATETIME , 
    email VARCHAR(50), 
    recordScore INT, 
    recordTime TIME DEFAULT '00:00:00', 
    time_played TIME DEFAULT '00:00:00'
);

/*
UPDATE player
SET time_played = '00:00:00'
WHERE time_played IS NULL;
*/


CREATE Table cards (
  card_id int PRIMARY key AUTO_INCREMENT not null,
  card_name varchar(20) not null,
  rarity varchar(20) not null
);

INSERT INTO cards (card_name, rarity) VALUES
	('Calavera', 'Rare'),
	('Machete', 'Rare'),
	('ObsidianKnife', 'Rare'),
	('Corazon', 'Uncommon'),
	('Valiente', 'Uncommon'),
	('Taco', 'Uncommon'),
	('Mariachi', 'Uncommon'),
	('MayanWarrior', 'Uncommon');




CREATE TABLE player_runstats(
  run_id INT PRIMARY KEY auto_increment, 
  player_id INT, 
  
  FOREIGN KEY (player_id) REFERENCES player(player_id), 
	cards_used INT,
    cards_collected INT,
    score INT,
  run_start TIMESTAMP, 
    run_end TIMESTAMP, 
    run_duration TIME,
    finished bool,
    enemies_killed INT, 
    vases_broken INT, 
    last_room INT,
      most_used_card INT, 
    -- FOREIGN KEY (most_used_card) REFERENCES card(card_id),	
	eliminated_by INT, 
		-- FOREIGN KEY (eliminated_by) REFERENCES enemy(enemy_id),
	last_level INT -- ,
		-- FOREIGN KEY (last_level) REFERENCES level(level_id)
);

CREATE TABLE run_cards(
  run_cardID INT PRIMARY KEY auto_increment not null,
  card_id int,
  FOREIGN KEY (card_id) REFERENCES cards(card_id),
  cardType VARCHAR(20) not null,
  CardUses SMALLINT NOT NULL,
  CardsCollected SMALLINT not null,
  run_id INT,
  FOREIGN KEY (run_id) REFERENCES player_runstats(run_id)
);

CREATE TABLE enemies(
  enemy_id INT PRIMARY KEY AUTO_INCREMENT,
  enemy_name VARCHAR(50) NOT NULL
);
INSERT INTO enemies(enemy_name) VALUES 
	("Mariachi"), 
	("Tlaxcalteca"), 
	("Mayan Warrior"), 
	("Devil"), 
	("Quetzalcoatl"),
	("Ah Puch");



/*----------- Triggers (?) ------------- */
DELIMITER $$
CREATE TRIGGER updateHighScore
BEFORE UPDATE ON player
FOR EACH ROW 
BEGIN 
    -- Update recordScore only if the new score is higher
    IF NEW.recordScore <= OLD.recordScore THEN
        SET NEW.recordScore = OLD.recordScore;
    END IF;
    -- Update recordTime only if the new time is lower
    IF NEW.recordTime <= OLD.recordTime THEN 
        SET NEW.recordTime = OLD.recordTime;
    END IF;
END$$
DELIMITER ;

-- DROP TRIGGER updateHighScore;


/* ----------- Views ----------------*/
CREATE VIEW runsvswins AS 
	SELECT p.player_id, p.username, COUNT(r.run_id) AS runcount, SUM(CASE WHEN r.finished = TRUE THEN 1 ELSE 0 END) AS wins
	FROM player AS p
    INNER JOIN player_runstats AS r
    ON p.player_id = r.player_id
	GROUP BY p.player_id;


CREATE OR REPLACE VIEW player_card AS
SELECT username, favorite_card, cards_used_count
FROM (
    SELECT 
        p.username, 
        c.card_name AS favorite_card,
        SUM(r.cards_used) AS cards_used_count,
        ROW_NUMBER() OVER (PARTITION BY p.username ORDER BY SUM(r.cards_used) DESC) as rn
    FROM player AS p
    JOIN player_runstats AS r ON p.player_id = r.player_id
    JOIN cards AS c ON r.most_used_card = c.card_id
    GROUP BY p.username, c.card_name
) t
WHERE rn = 1;

    
CREATE OR REPLACE VIEW nemesis AS
SELECT username, eliminated_by_name, DeathCount
FROM (
    SELECT 
        p.username, 
        e.enemy_name AS eliminated_by_name,
        COUNT(r.eliminated_by) AS DeathCount,
        ROW_NUMBER() OVER (PARTITION BY p.username ORDER BY COUNT(r.eliminated_by) DESC) as rn
    FROM player AS p
    JOIN player_runstats AS r ON p.player_id = r.player_id
    JOIN enemies AS e ON r.eliminated_by = e.enemy_id
    WHERE r.eliminated_by IS NOT NULL
    GROUP BY p.username, e.enemy_name
    ORDER BY DeathCount DESC
) t
WHERE rn = 1;

    


/* ---------- Stored Procedures (?) -------------*/


UPDATE player AS p
JOIN (
    SELECT player_id, run_duration 
    FROM player_runstats 
    WHERE player_id = 1 
    ORDER BY run_id DESC 
    LIMIT 1
) AS r ON p.player_id = r.player_id
SET p.time_played = ADDTIME(p.time_played, r.run_duration);




/* --------------------Test Queries -----------------*/
SELECT * FROM player;
SELECT * FROM player_runstats;

/* ----- Queries test para leaderboard.html -------- */
-- 1
SELECT p.player_id, p.username, p.recordScore, p.recordTime FROM player AS p
	LIMIT 10;

-- 2
SELECT * FROM runsvswins
	LIMIT 10;

-- 3
SELECT p.username, p.wins, (p.runcount - p.wins) AS deaths
FROM runsvswins AS p;

-- 4 
SELECT * from player_card;

-- 5 
SELECT * FROM nemesis;

-- 6 
