USE mayaztec; 

/* Por si se me ocurre tirar la base de datos (backup 29/4/2025 10:58PM)*/

-- Para Player
INSERT INTO player (player_id, username, password, date_create, email, recordScore, recordTime, time_played) VALUES

(2, 'Morris2801', 'password123', '2025-04-29 12:38:58', 'mauriciomonroyg@hotmail.com', 15983, '05:23:00', '08:38:00'),
(3, 'Hectorlg', '12345abc', '2025-04-29 12:47:28', 'HectorLg@gmail.com', 12047, '03:05:00', '03:05:00'),
(4, 'TataKae', '123123A', '2025-04-29 12:51:58', 'a01029829@tec.mx', 16806, '05:12:00', '09:51:00'),
(5, 'Quintana04', '123123A', '2025-04-29 13:02:49', 'a01785655@tec.mx', 17059, '04:50:00', '05:59:00'),
(6, 'Adla', 'Emtuy1', '2025-04-29 13:19:13', 'a@gmail.com', 670, '00:00:00', '00:54:00'),
(7, 'maria', 'lololol1', '2025-04-29 13:29:27', 'hola@gmail.com', 2170, '00:00:00', '03:14:00'),
(8, 'ValeLinda12', 'password123', '2025-04-29 22:54:23', 'valelinda12@gmail.com', 0, '00:00:00', '00:00:00');

-- Para los runstats
UPDATE player SET recordScore = 10068, recordTime = '01:57:00', time_played = '07:20:00'
WHERE player_id = 1 ;

INSERT INTO player_runstats (
  run_id, player_id, cards_used, cards_collected, score, 
  run_start, run_end, run_duration, finished, 
  enemies_killed, vases_broken, last_room, 
  most_used_card, eliminated_by, last_level
) VALUES
(1, 2, 2, 2, 1440, '2025-04-29 18:39:02', '2025-04-29 12:39:45', '00:42:00', 0, 4, 3, 4, 6, 2, 1),
(2, 2, 19, 21, 15983, '2025-04-29 18:40:19', '2025-04-29 12:46:06', '05:23:00', 1, 21, 39, 7, 2, 4, 2),
(3, 3, 14, 16, 12047, '2025-04-29 18:47:38', '2025-04-29 12:50:44', '03:05:00', 1, 8, 29, 7, 7, 6, 2),
(4, 4, 1, 2, 1440, '2025-04-29 18:52:09', '2025-04-29 12:52:46', '00:35:00', 0, 4, 3, 2, 2, 2, 1),
(5, 4, 15, 15, 16807, '2025-04-29 18:52:49', '2025-04-29 12:58:01', '05:12:00', 1, 33, 24, 7, 7, 3, 2),
(6, 5, 3, 3, 1960, '2025-04-29 19:02:59', '2025-04-29 13:04:09', '01:09:00', 0, 6, 4, 2, 6, 4, 1),
(7, 5, 15, 16, 17059, '2025-04-29 19:04:16', '2025-04-29 13:09:06', '04:50:00', 1, 31, 22, 7, 8, 3, 2),
(8, 1, 1, 2, 990, '2025-04-29 19:09:29', '2025-04-29 13:10:20', '00:50:00', 0, 3, 3, 2, 7, 2, 1),
(9, 1, 2, 5, 1700, '2025-04-29 19:10:21', '2025-04-29 13:11:18', '00:56:00', 0, 3, 11, 3, 7, 4, 1),
(10, 4, 11, 14, 9580, '2025-04-29 19:12:18', '2025-04-29 13:16:22', '04:03:00', 0, 21, 24, 7, 7, 1, 2),
(11, 6, 1, 1, 670, '2025-04-29 19:19:34', '2025-04-29 13:20:29', '00:54:00', 0, 2, 1, 1, 4, 2, 1),
(12, 7, 0, 1, 2170, '2025-04-29 19:29:44', '2025-04-29 13:31:02', '01:18:00', 0, 7, 0, 5, NULL, 3, 1),
(13, 7, 1, 0, 1600, '2025-04-29 19:31:04', '2025-04-29 13:31:47', '00:42:00', 0, 6, 0, 4, 11, 2, 1),
(14, 7, 0, 0, 1650, '2025-04-29 19:31:48', '2025-04-29 13:33:02', '01:13:00', 0, 7, 0, 3, NULL, 2, 1),
(15, 2, 3, 3, 2210, '2025-04-29 19:48:58', '2025-04-29 13:49:53', '00:54:00', 0, 6, 6, 4, 4, 2, 1),
(16, 2, 6, 6, 5220, '2025-04-29 19:49:56', '2025-04-29 13:51:36', '01:39:00', 0, 10, 11, 6, 3, 2, 2),
(17, 1, 1, 3, 1710, '2025-04-29 20:40:00', '2025-04-29 14:41:08', '01:08:00', 0, 6, 3, 1, 10, 1, 1),
(18, 1, 2, 2, 10068, '2025-04-30 03:42:35', '2025-04-29 21:45:25', '01:57:00', 1, 9, 5, 7, 3, 3, 2),
(19, 1, 0, 3, 510, '2025-04-30 04:13:59', '2025-04-29 22:16:25', '02:17:00', 0, 0, 6, 2, NULL, 2, 1),
(20, 1, 0, 0, 4312, '2025-04-30 04:19:24', '2025-04-29 22:19:37', '00:12:00', 1, 0, 0, 1, NULL, NULL, 1);

SET SQL_SAFE_UPDATES = 0;



-- DummyData (7/jugador)
INSERT INTO player_runstats
  (player_id, cards_used, cards_collected, score,
   run_start, run_end, run_duration, finished,
   enemies_killed, vases_broken, last_room,
   most_used_card, eliminated_by, last_level)
VALUES

-- PLAYER 1 (Guest)
(1, 1, 1,   990, '2025-04-29 19:09:29','2025-04-29 19:59:29','00:50:00', 0,  3,  3, 2, 7, 2, 1),
(1, 2, 2,  1700, '2025-04-29 19:10:21','2025-04-29 19:16:17','00:06:00', 0, 11,  3, 3, 4, 1, 1),
(1, 3, 5,  2210, '2025-04-29 19:48:58','2025-04-29 20:42:58','00:54:00', 0,  6,  6, 4, 2, 1, 1),
(1, 1, 1,  1440, '2025-04-29 18:39:02','2025-04-29 19:21:02','00:42:00', 0,  4,  3, 4, 6, 2, 1),
(1, 2, 5,  1590, '2025-04-29 19:29:44','2025-04-29 20:47:44','01:18:00', 0,  7,  0, 5, null,3,1),
(1, 2, 6,  3050, '2025-04-29 18:47:38','2025-04-29 21:52:44','03:05:06', 1,  8, 29, 7, 6, 2, 2),
(1, 1, 3,  1710, '2025-04-29 20:40:00','2025-04-29 21:48:00','01:08:00', 0,  6,  3, 1, 10,1,1),

-- PLAYER 2
(2, 2,  2, 1440, '2025-04-29 18:39:02','2025-04-29 19:21:02','00:42:00', 0,  4,  3, 4, 6, 2, 1),
(2, 2,  2,  990, '2025-04-29 19:09:29','2025-04-29 19:59:29','00:50:00', 0,  3,  3, 2, 7, 2, 1),
(2, 1,  5, 1700, '2025-04-29 19:10:21','2025-04-29 19:16:17','00:06:00', 0, 11,  3, 3, 4, 1, 1),
(2, 5,  6, 15983,'2025-04-29 18:40:19','2025-04-29 19:46:06','05:23:00', 1, 21, 39, 7, 2, 4, 2),
(2, 8,  7, 9580, '2025-04-29 19:12:18','2025-04-29 19:16:22','04:03:00', 0, 21, 24, 7, 7, 2, 2),
(2, 3, 19, 2210, '2025-04-29 19:48:58','2025-04-29 20:42:58','00:54:00', 0,  6,  6, 4, 2, 1, 1),
(2,10, 21, 1700, '2025-04-29 19:10:21','2025-04-29 19:16:17','00:06:00', 0, 11,  3, 3, 4, 1, 1),

-- PLAYER 3
(3,14, 16,12047,'2025-04-29 18:47:38','2025-04-29 21:52:44','03:05:06', 1,  8, 29, 7, 6, 2, 2),
(3, 1,  1,   670, '2025-04-29 19:19:34','2025-04-29 20:13:34','00:54:00', 0,  2,  1, 1, 2, 1, 1),
(3, 3,  1, 1600, '2025-04-29 19:31:04','2025-04-29 20:13:04','00:42:00', 0,  6,  0, 4,11,2,1),
(3, 0,  1, 1650, '2025-04-29 19:31:48','2025-04-29 20:05:48','00:34:00', 0,  7,  0, 3, null,2,1),
(3, 5, 15,2950, '2025-04-29 19:02:59','2025-04-29 20:11:59','01:09:00', 0,  6,  4, 2, 4, 1, 1),
(3, 2,  5,1720, '2025-04-29 19:10:21','2025-04-29 19:16:17','00:06:00', 0, 11,  3, 3, 4, 1, 1),
(3,11, 12, 2101, '2025-04-29 19:29:44','2025-04-29 20:31:45','01:02:01', 0,  7,  0, 5, null,3,1),

-- PLAYER 4
(4, 1,  1, 1440, '2025-04-29 18:52:09','2025-04-29 19:27:09','00:35:00', 0,  4,  3, 2, 2, 1, 1),
(4, 4, 11, 9580, '2025-04-29 19:12:18','2025-04-29 19:16:22','04:03:00', 0, 21, 24, 7, 7, 2, 2),
(4,15, 15,16807,'2025-04-29 18:52:49','2025-04-29 19:58:49','01:06:00', 1, 33, 24, 7, 7, 3, 2),
(4, 2,  3, 1440, '2025-04-29 18:52:09','2025-04-29 19:27:09','00:35:00', 0,  4,  3, 2, 2, 1, 1),
(4, 6,  7,1960, '2025-04-29 19:02:59','2025-04-29 20:11:59','01:09:00', 0,  6,  4, 2, 4, 1, 1),
(4, 8, 15,3000, '2025-04-29 19:04:16','2025-04-29 19:09:06','00:05:00', 0, 31, 22, 7, 8, 3, 2),
(4,11, 14,16806,'2025-04-29 18:52:49','2025-04-29 19:58:49','01:06:00', 1, 33, 24, 7, 7, 3, 2),

-- PLAYER 5
(5, 3,  3, 1960, '2025-04-29 19:02:59','2025-04-29 20:11:59','01:09:00', 0,  6,  4, 2, 4, 1, 1),
(5,15, 16,17059,'2025-04-29 19:04:16','2025-04-29 20:54:16','01:50:00', 1, 31, 22, 7, 8, 3, 2),
(5, 5,  4, 6700, '2025-04-29 20:10:00','2025-04-29 21:15:00','01:05:00', 1, 24, 15, 4, 5, 2, 3),
(5,10, 12,3056, '2025-04-29 19:10:21','2025-04-29 19:16:17','00:06:00', 0, 11,  3, 3, 4, 1, 1),
(5, 7,  8,1705, '2025-04-29 19:04:16','2025-04-29 20:54:16','01:50:00', 1, 31, 22, 7, 8, 3, 2),
(5,21, 23, 3580, '2025-04-29 18:40:19','2025-04-29 19:46:06','05:23:00', 1, 21, 39, 7, 2, 4, 2),
(5, 6,  7,1960, '2025-04-29 19:02:59','2025-04-29 20:11:59','01:09:00', 0,  6,  4, 2, 4, 1, 1),

-- PLAYER 6
(6, 1,  1,  670, '2025-04-29 19:19:34','2025-04-29 20:13:34','00:54:00', 0,  2,  1, 1, 2, 1, 1),
(6, 2,  6,  990, '2025-04-29 19:09:29','2025-04-29 19:59:29','00:50:00', 0,  3,  3, 2, 7, 2, 1),
(6, 6,  7,5220, '2025-04-29 19:49:56','2025-04-29 20:59:56','01:10:00', 0, 10, 11, 6, 3, 2, 2),
(6, 3,  3,  670, '2025-04-29 19:19:34','2025-04-29 20:13:34','00:54:00', 0,  2,  1, 1, 2, 1, 1),
(6, 8,  9, 8000, '2025-04-29 17:45:00','2025-04-29 19:00:00','01:15:00', 1, 25, 14, 7, 1, 1, 4),
(6, 5,  4, 3050, '2025-04-29 18:30:00','2025-04-29 19:45:00','01:15:00', 1, 25, 18, 6, 6, 2, 3),
(6,10, 12,5220, '2025-04-29 19:49:56','2025-04-29 20:59:56','01:10:00', 0, 10, 11, 6, 3, 2, 2),

-- PLAYER 7
(7, 1,  0,1600, '2025-04-29 19:31:04','2025-04-29 20:13:04','00:42:00', 0,  6,  0, 4,11, 2, 1),
(7, 0,  1,1650, '2025-04-29 19:31:48','2025-04-29 20:05:48','00:34:00', 0,  7,  0, 3, null,2, 1),
(7, 2,  1,2170, '2025-04-29 19:29:44','2025-04-29 20:13:44','00:44:00', 0,  7,  0, 5, null,3, 1),
(7, 3,  1,1580, '2025-04-29 18:47:38','2025-04-29 21:52:44','03:05:06', 1,  8, 29, 7, 6, 2, 2),
(7, 1,  3,2100, '2025-04-29 20:40:00','2025-04-29 21:48:00','01:08:00', 0,  6,  3, 1, 10,1, 1),
(7, 6,  7,3100, '2025-04-29 19:04:16','2025-04-29 20:54:16','01:50:00', 1, 31, 22, 7, 8, 3, 2),
(7,12, 10,3600, '2025-04-29 19:10:21','2025-04-29 19:16:17','00:06:00', 0, 11,  3, 3,4, 1, 1),

-- PLAYER 8 
(8, 1,  2,  990, '2025-04-29 19:09:29','2025-04-29 19:59:29','00:50:00', 0,  3,  3,2, 7,2,1),
(8, 2,  5,1700, '2025-04-29 19:10:21','2025-04-29 19:16:17','00:06:00', 0,11,  3,3, 4,1,1),
(8, 4,  4,2000, '2025-04-29 20:00:00','2025-04-29 20:42:00','00:42:00', 0,10,  8,4, 2,1,2),
(8, 7,  6,2500, '2025-04-29 21:00:00','2025-04-29 21:56:00','00:56:00', 1,15, 12,5, 3,2,2),
(8,10,  9,3000, '2025-04-29 22:00:00','2025-04-29 22:50:00','00:50:00', 1,18, 15,6, 5,3,2),
(8, 3,  3,1600, '2025-04-29 18:47:38','2025-04-29 21:52:44','03:05:06', 1, 8, 29,7, 6,2,2),
(8, 5,  4,1200, '2025-04-29 18:52:09','2025-04-29 19:27:09','00:35:00', 0, 4,  3,2, 2,1,1)
;

UPDATE player p
JOIN (
    SELECT 
        player_id,
        MAX(score) AS max_score,
        MIN(run_duration) AS best_time
    FROM player_runstats
    GROUP BY player_id
) stats ON p.player_id = stats.player_id
SET 
    p.recordScore = stats.max_score,
    p.recordTime = stats.best_time
WHERE 
    p.recordScore IS NULL OR stats.max_score > p.recordScore;

SET SQL_SAFE_UPDATES = 1;









/* --------------------Test Queries -----------------*/
SELECT * FROM player;
SELECT * FROM player_runstats;

/* ----- Queries test para leaderboard.html -------- */
-- 1
SELECT p.player_id AS "Player ID", p.username AS "Username", p.recordScore AS "High Score", p.recordTime AS "Record Time" FROM player AS p
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


