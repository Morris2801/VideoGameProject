DROP SCHEMA IF EXISTS mayaztec;
CREATE SCHEMA mayaztec;
USE mayaztec;

CREATE TABLE player (
	player_id INT PRIMARY KEY AUTO_INCREMENT ,
	username VARCHAR(20) , 
    password VARCHAR(20) , 
    date_create DATETIME , 
    email VARCHAR(50) 
);

CREATE TABLE player_runstats(
	run_id INT PRIMARY KEY auto_increment, 
    player_id INT, 
		FOREIGN KEY (player_id) REFERENCES player(player_id), 
	run_start TIMESTAMP, 
    run_end TIMESTAMP, 
    finished bool,
    enemies_killed INT, 
    cards_collected INT, 
    cards_used INT,
    vases_broken INT, 
    last_room INT, 
    
    most_used_card INT, 
		-- FOREIGN KEY (most_used_card) REFERENCES card(card_id),
	eliminated_by INT, 
		-- FOREIGN KEY (eliminated_by) REFERENCES enemy(enemy_id),
	last_level INT -- ,
		-- FOREIGN KEY (last_level) REFERENCES level(level_id)
);


SELECT * FROM player;
SELECT * FROM player_runstats;