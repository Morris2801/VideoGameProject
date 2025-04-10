SET NAMES utf8mb4; -- Encoding 
SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL'; -- SQL Ver

DROP SCHEMA IF EXISTS mayaztec;
CREATE SCHEMA mayaztec;
USE mayaztec;

-- Player Table
CREATE TABLE player (
	player_id INT PRIMARY KEY AUTO_INCREMENT ,
	username VARCHAR(20) , 
    password VARCHAR(20) , 
    date_create DATETIME , 
    email VARCHAR(50) 
);

CREATE TABLE players(
	player_id INT NOT NULL, 
		FOREIGN KEY (player_id) REFERENCES player(player_id)
);


CREATE TABLE level (
	level_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, 
    name VARCHAR(20) NOT NULL,
    time_limit_sec INT, 
    total_rooms TINYINT
);

CREATE TABLE room(
	room_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, 
    level_id INT NOT NULL, 
		FOREIGN KEY (level_id) REFERENCES level(level_id), 
	room_type VARCHAR(20)
);

CREATE TABLE card_effect(
	effect_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, 
    effect_attribute VARCHAR(20), 
    effect_value float, 
	duration_sec int
);

CREATE TABLE card (
	card_id INT PRIMARY KEY auto_increment, 
    card_name VARCHAR(20), 
    description VARCHAR(50), 
    rarity float, 
    cooldown_sec float, 
    img_url VARCHAR(50),
    card_type VARCHAR(20), 
    effect_id INT, 
		FOREIGN KEY (effect_id) REFERENCES card_effect(effect_id)
);

CREATE TABLE enemy (
	enemy_id INT PRIMARY KEY NOT NULL auto_increment, 
    enemy_name VARCHAR(30) NOT NULL, 
    enemy_type INT, 
    base_hp FLOAT, 
    base_damage FLOAT, 
    detection_range FLOAT, 
    attack_cooldown FLOAT
);

CREATE TABLE inventory(
	inventory_id INT PRIMARY KEY NOT NULL auto_increment, 
    character_id int, 
		foreign key (character_id) REFERENCES characterStatus(character_id), 
	card_id int, 
		FOREIGN KEY (card_id) REFERENCES card(card_id)
);




CREATE TABLE characterStatus (
	character_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL, 
    player_id INT NOT NULL, 
		FOREIGN KEY (player_id) REFERENCES player(player_id),
    max_hp TINYINT NOT NULL, 
    current_hp TINYINT NOT NULL, 
    max_stamina TINYINT NOT NULL, 
    current_stamina TINYINT NOT NULL,
    base_weapon_id INT NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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

CREATE TABLE enemy_card_drop(
	drop_id INT PRIMARY KEY,
    enemy_id INT, 
		FOREIGN KEY (enemy_id) REFERENCES enemy(enemy_id), 
	card_id INT, 
		FOREIGN KEY (card_id) REFERENCES card(card_id)
);

CREATE TABLE boss_enemy(
	id_boss INT PRIMARY KEY, 
    bendition_reward INT, 
		FOREIGN KEY (bendition_reward) REFERENCES card_effect(effect_id)
);



CREATE TABLE level_layout (
    level_id INT AUTO_INCREMENT PRIMARY KEY,
    -- run_id INT, -- Foreign key
    layout1 JSON NOT NULL,
    layout2 JSON NOT NULL
    -- FOREIGN KEY (run_id) REFERENCES player_runstats(run_id) ON DELETE CASCADE
);