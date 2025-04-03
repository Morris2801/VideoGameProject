use mayaztec;


SET AUTOCOMMIT = 0;

-- Insertar jugadores
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


INSERT INTO players (player_id) VALUES
(1), (2), (3), (4), (5), (6), (7), (8), (9), (10),
(11), (12), (13), (14), (15), (16), (17), (18), (19), (20),
(21), (22), (23), (24), (25), (26), (27), (28), (29), (30);


-- Insertar niveles
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

-- Insertar habitaciones
INSERT INTO room (level_id, room_type) VALUES
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

-- Insertar efectos de cartas
INSERT INTO card_effect (effect_attribute, effect_value, duration_sec) VALUES
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

-- Insertar cartas
INSERT INTO card (card_name, description, rarity, cooldown_sec, img_url, card_type, effect_id) VALUES
('Macuahuitl', 'Arma azteca de obsidiana', 0.6, 3, 'macuahuitl.png', 'Arma', 3),
('Cuchillo de Obsidiana', 'Ligero y rápido', 0.4, 1.5, 'cuchillo.png', 'Arma', 4),
('Mariachi', 'Transformación musical', 0.7, 15, 'mariachi.png', 'Transformación', 5),
('Diablo', 'Transformación infernal', 0.8, 20, 'diablo.png', 'Transformación', 6),
('Guerrero Maya', 'Transformación ancestral', 0.6, 15, 'guerrero.png', 'Transformación', 7),
('Corazón', 'Restaura vida completa', 0.5, 1, 'corazon.png', 'Buff', 8),
('El Valiente', 'Inmunidad temporal', 0.7, 10, 'valiente.png', 'Buff', 9),
('El Taco', 'Resistencia infinita', 0.6, 10, 'taco.png', 'Buff', 10),
('La Calavera', 'Poder letal', 0.9, 8, 'calavera.png', 'Buff', 11),
('Escudo Maya', 'Defensa ancestral', 0.5, 4, 'escudo_maya.png', 'Defensa', 12),
('Fuego Sagrado', 'Daño en área', 0.7, 6, 'fuego.png', 'Ataque', 13),
('Jaguar', 'Velocidad felina', 0.6, 10, 'jaguar.png', 'Transformación', 14),
('La Serpiente', 'Veneno dañino', 0.6, 5, 'serpiente.png', 'Buff', 15),
('La Pirámide', 'Invoca protección', 0.7, 12, 'piramide.png', 'Defensa', 16),
('El Sol', 'Regeneración vital', 0.8, 15, 'sol.png', 'Buff', 17),
('La Luna', 'Invisibilidad nocturna', 0.7, 8, 'luna.png', 'Buff', 18),
('El Nopal', 'Resistencia a daño', 0.5, 10, 'nopal.png', 'Defensa', 19),
('La Campana', 'Aturde enemigos', 0.6, 6, 'campana.png', 'Ataque', 20),
('El Venado', 'Agilidad en combate', 0.5, 8, 'venado.png', 'Buff', 21),
('La Corona', 'Poder supremo', 0.9, 25, 'corona.png', 'Buff', 22),
('Lanza Azteca', 'Ataque a distancia', 0.6, 5, 'lanza.png', 'Arma', 23),
('El Árbol', 'Restauración gradual', 0.7, 12, 'arbol.png', 'Buff', 24),
('La Muerte', 'Invencibilidad breve', 0.9, 5, 'muerte.png', 'Buff', 25),
('El Águila', 'Vista mejorada', 0.6, 15, 'aguila.png', 'Buff', 26),
('El Pescado', 'Resistencia acuática', 0.5, 10, 'pescado.png', 'Buff', 27),
('El Alacrán', 'Veneno potente', 0.7, 8, 'alacran.png', 'Ataque', 28),
('La Bota', 'Velocidad aumentada', 0.5, 12, 'bota.png', 'Buff', 29),
('El Mundo', 'Poder universal', 0.9, 30, 'mundo.png', 'Buff', 30);


-- Insertar enemigos
INSERT INTO enemy (enemy_name, enemy_type, base_hp, base_damage, detection_range, attack_cooldown) VALUES
('Tlaxcalteca', 1, 15.0, 1.0, 5.0, 1.0),
('Guerrero Maya', 2, 20.0, 2.0, 7.0, 1.2),
('Diablo Réplica', 3, 35.0, 3.0, 10.0, 1.5),
('Quetzalcóatl', 4, 85.0, 4.0, 12.0, 2.0),
('Ah Puch', 4, 110.0, 6.0, 15.0, 2.5),
('Mariachi Elite', 1, 13.0, 1.5, 6.0, 1.2),
('Tlaxcalteca Capitán', 1, 17.0, 2.0, 6.0, 1.0),
('Guerrero Maya Elite', 2, 25.0, 2.5, 8.0, 1.1),
('Diablo Maestro', 3, 40.0, 4.0, 11.0, 1.4),
('Jaguar Guerrero', 2, 22.0, 2.5, 9.0, 1.0),
('Sacerdote Maya', 2, 18.0, 3.0, 6.0, 1.5),
('Espectro Azteca', 3, 30.0, 3.5, 8.0, 1.3),
('Serpiente Menor', 1, 12.0, 1.0, 4.0, 0.8),
('Águila Guerrera', 2, 20.0, 2.5, 10.0, 1.2),
('Guardián de Obsidiana', 3, 45.0, 4.5, 9.0, 2.0),
('Sacerdote Sacrificial', 2, 25.0, 3.0, 7.0, 1.4),
('Espíritu Vengativo', 3, 30.0, 3.5, 8.0, 1.5),
('Cazador Azteca', 1, 15.0, 2.0, 6.0, 1.0),
('Chamán Maya', 2, 22.0, 2.5, 7.0, 1.3),
('Caballero Águila', 3, 38.0, 4.0, 9.0, 1.6),
('Caballero Jaguar', 3, 40.0, 4.2, 9.0, 1.7),
('Arquero Azteca', 1, 14.0, 2.0, 8.0, 1.5),
('Esclavo Poseído', 1, 12.0, 1.0, 5.0, 0.9),
('Guardián Esqueleto', 2, 25.0, 2.5, 6.0, 1.2),
('Espíritu del Inframundo', 3, 35.0, 3.8, 7.0, 1.5),
('Guardián de la Pirámide', 3, 42.0, 4.5, 8.0, 1.8),
('Serpiente Divina', 3, 38.0, 4.0, 7.0, 1.6),
('Chacal Maya', 2, 20.0, 2.2, 6.0, 1.1);
-- Insertar personajes
INSERT INTO characterStatus (player_id, max_hp, current_hp, max_stamina, current_stamina, base_weapon_id) VALUES
(3, 110, 110, 55, 55, 1),
(4, 105, 105, 52, 52, 1),
(5, 115, 115, 58, 58, 1),
(6, 120, 120, 60, 60, 1),
(7, 95, 95, 48, 48, 1),
(8, 100, 100, 50, 50, 1),
(9, 105, 105, 52, 52, 1),
(10, 110, 110, 55, 55, 1),
(11, 115, 115, 58, 58, 1),
(12, 120, 120, 60, 60, 1),
(13, 95, 95, 48, 48, 1),
(14, 100, 100, 50, 50, 1),
(15, 105, 105, 52, 52, 1),
(16, 110, 110, 55, 55, 1),
(17, 115, 115, 58, 58, 1),
(18, 120, 120, 60, 60, 1),
(19, 95, 95, 48, 48, 1),
(20, 100, 100, 50, 50, 1),
(21, 105, 105, 52, 52, 1),
(22, 110, 110, 55, 55, 1),
(23, 115, 115, 58, 58, 1),
(24, 120, 120, 60, 60, 1),
(25, 95, 95, 48, 48, 1),
(26, 100, 100, 50, 50, 1),
(27, 105, 105, 52, 52, 1),
(28, 110, 110, 55, 55, 1),
(29, 115, 115, 58, 58, 1),
(30, 120, 120, 60, 60, 1);

INSERT INTO inventory (character_id, card_id) VALUES
(1, 1), (1, 2), (1, 3), (1, 4), (1, 5),
(2, 6), (2, 7), (2, 8), (2, 9), (2, 10),
(3, 11), (3, 12), (3, 13), (3, 14), (3, 15),
(4, 16), (4, 17), (4, 18), (4, 19), (4, 20),
(5, 21), (5, 22), (5, 23), (5, 24), (5, 25),
(6, 26), (6, 27), (6, 28), (6, 29), (6, 30);


-- Insertar estadísticas de partidas
INSERT INTO player_runstats (player_id, run_duration, run_date, enemies_killed, cards_collected, most_used_card, eliminated_by, last_level) VALUES
(3, 250.5, NOW(), 10, 5, 3, 3, 2),
(4, 180.3, NOW(), 7, 4, 4, 4, 1),
(5, 320.7, NOW(), 15, 8, 5, 5, 2),
(6, 155.2, NOW(), 6, 3, 6, 6, 1),
(7, 275.8, NOW(), 12, 6, 7, 7, 2),
(8, 198.4, NOW(), 8, 4, 8, 8, 1),
(9, 305.6, NOW(), 14, 7, 9, 9, 2),
(10, 165.9, NOW(), 7, 3, 10, 10, 1),
(11, 285.3, NOW(), 13, 6, 11, 11, 2),
(12, 210.1, NOW(), 9, 5, 12, 12, 1),
(13, 350.5, NOW(), 16, 8, 13, 13, 2),
(14, 175.8, NOW(), 7, 4, 14, 14, 1),
(15, 290.4, NOW(), 13, 7, 15, 15, 2),
(16, 205.2, NOW(), 8, 5, 16, 16, 1),
(17, 330.7, NOW(), 15, 8, 17, 17, 2),
(18, 185.9, NOW(), 7, 4, 18, 18, 1),
(19, 295.3, NOW(), 13, 7, 19, 19, 2),
(20, 215.6, NOW(), 9, 5, 20, 20, 1),
(21, 345.2, NOW(), 16, 8, 21, 21, 2),
(22, 170.8, NOW(), 7, 4, 22, 22, 1),
(23, 300.9, NOW(), 14, 7, 23, 23, 2),
(24, 220.3, NOW(), 10, 5, 24, 24, 1),
(25, 355.7, NOW(), 17, 9, 25, 25, 2),
(26, 195.4, NOW(), 8, 4, 26, 26, 1),
(27, 310.6, NOW(), 14, 7, 27, 27, 2),
(28, 230.8, NOW(), 10, 6, 28, 28, 1),
(29, 360.2, NOW(), 18, 9, 29, 3, 2),
(30, 175.5, NOW(), 8, 4, 30, 4, 1);

-- Insertar drops de cartas por enemigos
INSERT INTO enemy_card_drop (drop_id, enemy_id, card_id) VALUES
(1, 3, 3),
(2, 4, 4),
(3, 5, 5),
(4, 6, 6),
(5, 7, 7),
(6, 8, 8),
(7, 9, 9),
(8, 10, 10),
(9, 11, 11),
(10, 12, 12),
(11, 13, 13),
(12, 14, 14),
(15, 15, 15),
(16, 16, 16),
(17, 17, 17),
(18, 18, 18),
(19, 19, 19),
(20, 20, 20),
(21, 21, 21),
(22, 22, 22),
(23, 23, 23),
(24, 24, 24),
(25, 25, 25),
(26, 26, 26),
(27, 27, 27),
(28, 28, 28),
(29, 29, 29),
(30, 30, 30);

-- Insertar jefes
INSERT INTO boss_enemy (id_boss, bendition_reward) VALUES
(4, 3),
(4, 4),
(4, 5),
(4, 6),
(4, 7),
(4, 8),
(4, 9),
(4, 10),
(4, 11),
(4, 12),
(4, 13),
(4, 14),
(5, 15),
(5, 16),
(5, 17),
(5, 18),
(5, 19),
(5, 20),
(5, 21),
(5, 22),
(5, 23),
(5, 24),
(5, 25),
(5, 26),
(5, 27),
(5, 28),
(5, 29),
(5, 30);


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