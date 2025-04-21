DROP SCHEMA IF EXISTS mayaztec2;
CREATE SCHEMA mayaztec2;
USE mayaztec2;

CREATE TABLE player (
	player_id INT PRIMARY KEY AUTO_INCREMENT ,
	username VARCHAR(20) , 
    password VARCHAR(20) , 
    date_create DATETIME , 
    email VARCHAR(50), 
    score INT, 
    record TIME, 
    time_played TIME
);



CREATE Table cards (
  card_id int PRIMARY key AUTO_INCREMENT not null,
  card_name varchar(20) not null,
  rarity varchar(20) not null
);

CREATE TABLE enemies(
  enemy_id INT PRIMARY KEY AUTO_INCREMENT,
  enemy_name VARCHAR(20) NOT NULL
);

CREATE TABLE player_runstats(
  run_id INT PRIMARY KEY auto_increment, 
  player_id INT, 
  FOREIGN KEY (player_id) REFERENCES player(player_id),
  eliminated_by INT, FOREIGN KEY (eliminated_by) REFERENCES enemies(enemy_id),
	cards_used INT,
  run_start TIMESTAMP, 
    run_end TIMESTAMP, 
    finished bool,
    enemies_killed INT, 
    vases_broken INT, 
    last_room INT,
      most_used_card INT, 
    -- FOREIGN KEY (most_used_card) REFERENCES card(card_id),	 
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



/*----------- Triggers (?) ------------- */

DELIMITER $$
CREATE TRIGGER updateHighScore
BEFORE UPDATE ON player
FOR EACH ROW 
BEGIN 
	IF NEW.score > OLD.score THEN
		SET NEW.score = NEW.score;
	ELSE
		SET NEW.score = OLD.score;
	END IF;
    IF NEW.record > OLD.record THEN 
		SET NEW.record = NEW.record;
	ELSE
		SET NEW.record = OLD.record;
	END IF;
END$$


/* ----------- Views ----------------*/
CREATE VIEW runsvswins AS 
	SELECT p.player_id, p.username, COUNT(r.run_id) AS runcount, SUM(CASE WHEN r.finished = TRUE THEN 1 ELSE 0 END) AS wins
	FROM player AS p
    INNER JOIN player_runstats AS r
    ON p.player_id = r.player_id
	GROUP BY p.player_id;
    
CREATE VIEW player_card AS 
	SELECT p.username,
         SUM(rc.CardUses) AS card_used_count,
         c.card_name AS Favorite_card
  FROM player as p 
  JOIN player_runstats as r ON p.player_id = r.player_id
  JOIN run_cards as rc ON r.run_id = rc.run_id
  JOIN cards AS c ON rc.card_id = c.card_id
  GROUP BY p.username, c.card_name
  ORDER BY card_used_count DESC;

CREATE VIEW MostCard_Used AS
  SELECT username, card_used_count, Favorite_card
  FROM player_card
  WHERE (username, card_used_count) IN (
    SELECT username, MAX(card_used_count)
    FROM player_card
    GROUP BY username
  );
    
CREATE VIEW nemesis AS 
	SELECT p.username, e.enemy_name, COUNT(e.eliminated_by) AS DeathCount
	FROM player AS p
    JOIN player_runstats AS r
    ON p.player_id = r.player_id
    JOIN enemies AS e ON r.eliminated_by = e.enemy_id
    WHERE r.eliminated_by IS NOT NULL
    GROUP BY p.username, e.enemy_id
    ORDER BY DeathCount DESC;





/* ---------- Stored Procedures (?) -------------*/






/* --------------------Test Queries -----------------*/
SELECT * FROM player;
SELECT * FROM player_runstats;

/* ----- Queries test para leaderboard.html -------- */
-- 1
SELECT p.player_id, p.username, p.score, p.record FROM player AS p
	LIMIT 10;

-- 2
SELECT * FROM runsvswins
	LIMIT 10;

-- 3
SELECT p.username, p.wins, (p.runcount - p.wins) AS deaths
FROM runsvswins AS p;

-- 4 
SELECT * FROM player_card 
ORDER BY cards_used_count
LIMIT 10;

-- 5 
SELECT * FROM nemesis;

-- 6