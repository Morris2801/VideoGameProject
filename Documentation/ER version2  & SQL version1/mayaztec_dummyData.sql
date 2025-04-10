USE mayaztec;

SET AUTOCOMMIT = 1;

-- Insert Players
INSERT INTO player (username, password, date_create, email) VALUES
('Jugador1', 'pass123', NOW(), 'jugador1@mail.com'),
('Jugador2', 'clave456', NOW(), 'jugador2@mail.com'),
('Jugador3', 'pass789', NOW(), 'jugador3@mail.com'),
('Jugador4', 'clave101', NOW(), 'jugador4@mail.com'),
('Jugador5', 'pass112', NOW(), 'jugador5@mail.com'),
('Jugador6', 'clave131', NOW(), 'jugador6@mail.com'),
('Jugador7', 'pass415', NOW(), 'jugador7@mail.com'),
('Jugador8', 'clave161', NOW(), 'jugador8@mail.com'),
('Jugador9', 'pass718', NOW(), 'jugador9@mail.com'),
('Jugador10', 'clave192', NOW(), 'jugador10@mail.com'),
('Jugador11', 'pass202', NOW(), 'jugador11@mail.com'),
('Jugador12', 'clave212', NOW(), 'jugador12@mail.com'),
('Jugador13', 'pass222', NOW(), 'jugador13@mail.com'),
('Jugador14', 'clave232', NOW(), 'jugador14@mail.com'),
('Jugador15', 'pass242', NOW(), 'jugador15@mail.com'),
('Jugador16', 'clave252', NOW(), 'jugador16@mail.com'),
('Jugador17', 'pass262', NOW(), 'jugador17@mail.com'),
('Jugador18', 'clave272', NOW(), 'jugador18@mail.com'),
('Jugador19', 'pass282', NOW(), 'jugador19@mail.com'),
('Jugador20', 'clave292', NOW(), 'jugador20@mail.com'),
('Jugador21', 'pass302', NOW(), 'jugador21@mail.com'),
('Jugador22', 'clave312', NOW(), 'jugador22@mail.com'),
('Jugador23', 'pass322', NOW(), 'jugador23@mail.com'),
('Jugador24', 'clave332', NOW(), 'jugador24@mail.com'),
('Jugador25', 'pass342', NOW(), 'jugador25@mail.com'),
('Jugador26', 'clave352', NOW(), 'jugador26@mail.com'),
('Jugador27', 'pass362', NOW(), 'jugador27@mail.com'),
('Jugador28', 'clave372', NOW(), 'jugador28@mail.com'),
('Jugador29', 'pass382', NOW(), 'jugador29@mail.com'),
('Jugador30', 'clave392', NOW(), 'jugador30@mail.com');

-- Insert Levels
INSERT INTO level (name, time_limit_sec, total_rooms) VALUES
('Nivel 1', 300, 5),
('Nivel 2', 450, 7),
('Nivel 3', 600, 10),
('Nivel 4', 500, 8),
('Nivel 5', 400, 6),
('Nivel 6', 350, 5),
('Nivel 7', 700, 12),
('Nivel 8', 800, 15),
('Nivel 9', 900, 20),
('Nivel 10', 1000, 25),
('Nivel 11', 300, 5),
('Nivel 12', 450, 7),
('Nivel 13', 600, 10),
('Nivel 14', 500, 8),
('Nivel 15', 400, 6),
('Nivel 16', 350, 5),
('Nivel 17', 700, 12),
('Nivel 18', 800, 15),
('Nivel 19', 900, 20),
('Nivel 20', 1000, 25),
('Nivel 21', 300, 5),
('Nivel 22', 450, 7),
('Nivel 23', 600, 10),
('Nivel 24', 500, 8),
('Nivel 25', 400, 6),
('Nivel 26', 350, 5),
('Nivel 27', 700, 12),
('Nivel 28', 800, 15),
('Nivel 29', 900, 20),
('Nivel 30', 1000, 25);

-- Insert Rooms
INSERT INTO room (level_id, room_type) VALUES
(1, 'Tesoro'), (1, 'Enemigos'), (1, 'Senda'), (1, 'Boss Room'), (1, 'Puzle'),
(2, 'Enemigos'), (2, 'Senda'), (2, 'Tesoro'), (2, 'Boss Room'), (2, 'Puzle'),
(3, 'Tesoro'), (3, 'Enemigos'), (3, 'Puzle'), (3, 'Senda'), (3, 'Boss Room'),
(4, 'Enemigos'), (4, 'Senda'), (4, 'Puzle'), (4, 'Boss Room'), (4, 'Tesoro'),
(5, 'Senda'), (5, 'Boss Room'), (5, 'Tesoro'), (5, 'Puzle'), (5, 'Enemigos'),
(6, 'Tesoro'), (6, 'Enemigos'), (6, 'Boss Room'), (6, 'Puzle'), (6, 'Senda');

-- Insert Card Effects (Note: Attribute names like Health, Damage should match the schema's needs)
INSERT INTO card_effect (effect_attribute, effect_value, duration_sec) VALUES
('Health Boost', 300, 5),
('Damage Increase', 450, 7),
('Poison Resistance', 600, 10),
('Speed Boost', 500, 8),
('Defense Buff', 400, 6),
('Mana Regeneration', 350, 5),
('Fire Resistance', 700, 12),
('Critical Hit Chance', 800, 15),
('Energy Shield', 900, 20),
('Attack Speed Boost', 1000, 25),
('Healing Over Time', 320, 6),
('Lifesteal', 470, 8),
('Stamina Boost', 620, 11),
('Magic Power Increase', 520, 9),
('Bleed Resistance', 420, 7),
('Evasion Boost', 370, 6),
('Shock Resistance', 750, 13),
('Cooldown Reduction', 850, 16),
('Armor Piercing', 950, 21),
('Spell Amplification', 1050, 26),
('Fear Resistance', 330, 6),
('Burn Damage', 480, 8),
('Slow Immunity', 630, 11),
('Stealth Mode', 530, 9),
('Frost Shield', 430, 7),
('Knockback Resistance', 380, 6),
('Critical Damage', 770, 14),
('Regeneration Boost', 870, 17),
('Life Drain', 970, 22),
('Ultimate Power Surge', 1070, 27);

-- Insert Cards (Ensure effect_id corresponds to valid effects)
INSERT INTO card (card_name, description, rarity, cooldown_sec, img_url, card_type, effect_id) VALUES
('Macuahuitl', 'Arma azteca de obsidiana', 0.6, 3, 'macuahuitl.png', 'Arma', 3),
('Cuchillo', 'Ligero y rápido', 0.4, 1.5, 'cuchillo.png', 'Arma', 4),
('Mariachi', 'Transformación musical', 0.7, 15, 'mariachi.png', 'Transformación', 5),
('Diablo', 'Transformación infernal', 0.8, 20, 'diablo.png', 'Transformación', 6),
('Guerrero Maya', 'Transformación ancestral', 0.6, 15, 'guerrero.png', 'Transformación', 7),
('Corazón', 'Restaura vida completa', 0.5, 1, 'corazon.png', 'Buff', 8),
('El Valiente', 'Inmunidad temporal', 0.7, 10, 'valiente.png', 'Buff', 9),
('El Taco', 'Resistencia infinita', 0.6, 10, 'taco.png', 'Buff', 10),
('La Calavera', 'Poder letal', 0.9, 8, 'calavera.png', 'Buff', 11),
('Escudo Maya', 'Defensa ancestral', 0.5, 4, 'escudo_maya.png', 'Defensa', 12),
('Fuego Sagrado', 'Daño en área', 0.7, 6, 'fuego.png', 'Ataque', 13),
('Jaguar', 'Velocidad felina', 0.8, 10, 'jaguar.png', 'Movilidad', 14),
('Serpiente', 'Veneno mortal', 0.6, 12, 'serpiente.png', 'Ataque', 15),
('Murciélago', 'Sigilo nocturno', 0.4, 20, 'murcielago.png', 'Movilidad', 16);

-- Commit the transaction
COMMIT;



select * from player;

-- 1. Obtener los jugadores con su informacion de personaje (concatenacion)
SELECT 
    CONCAT('Jugador: ', p.username, ' (ID: ', p.player_id, ')') AS 'Informacion del Jugador',
    CONCAT('HP: ', cs.current_hp, '/', cs.max_hp, ' - Stamina: ', cs.current_stamina, '/', cs.max_stamina) AS 'Estadisticas de Salud'
FROM 
    player p
JOIN 
    characterStatus cs ON p.player_id = cs.player_id
LIMIT 10;


-- 2. Encontrar las cartas mas utilizadas en partidas (agrupacion y conteo)
SELECT 
    c.card_name,
    c.card_type,
    COUNT(rs.most_used_card) AS 'Veces Utilizada',
    CONCAT(ROUND((COUNT(rs.most_used_card) / (SELECT COUNT(*) FROM player_runstats)) * 100, 2), '%') AS 'Porcentaje de Uso'
FROM 
    card c
JOIN 
    player_runstats AS rs ON c.card_id = rs.most_used_card
GROUP BY 
    c.card_id
ORDER BY 
    COUNT(rs.most_used_card) DESC
LIMIT 5;


SELECT * FROM card;

SELECT * FROM player;

select * FROM player_runstats;