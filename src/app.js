/*
Script Name
- app.js

Team members 
- Mauricio Monroy 
- Hector Lugo
- Nicolás Quintana

Purpose
- Backend server for videogame project.
- Based on REST API architecture to interact with MySQL database.
- Communicates with HTML frontend based on requests and responses from events triggered.
*/

"use strict"

// Importing modules
import express from 'express'

import mysql from 'mysql2/promise'
import fs from 'fs'

const app = express()
const port = 5000

app.use(express.json())
//app.use(express.static('./public'))
app.use(express.static('./'))

// Function to connect to the MySQL database
async function connectToDB() {
    return await mysql.createConnection({
        host: 'localhost',
        user: 'mayaztec_user',
        password: 'mayaztec123',
        database: 'mayaztec'
    })
}

// Routes definition and handling
app.get('/', (request, response) => {
    fs.readFile('./html/home.html', 'utf8', (err, html) => {
        if (err) response.status(500).send('There was an error Home.html: ' + err)
        console.log('Loading Home page...')
        response.send(html)
    })
})
app.get('/home', (request, response) => {
    fs.readFile('./html/home.html', 'utf8', (err, html) => {
        if (err) response.status(500).send('There was an error Home.html: ' + err)
        console.log('Loading Home page...')
        response.send(html)
    })
})

app.get('/leaderboard', (request, response) => {
    fs.readFile('./html/leaderboard.html', 'utf8', (err, html) => {
        if (err) response.status(500).send('There was an error Leaderboard.html: ' + err)
        console.log('Loading Lead page...')
        response.send(html)
    })
})
app.get('/game', (request, response) => {
    fs.readFile('./html/game.html', 'utf8', (err, html) => {
        if (err) response.status(500).send('There was an error Game.html: ' + err)
        console.log('Loading Game page...')
        response.send(html)
    })
})

// --------------------------------------------------------------- Cosas login
app.post('/api/player/check', async (request, response) => {
    let connection = null;
    try {
        connection = await connectToDB();
        const { email, username, password } = request.body;
        const [results] = await connection.query(
            'SELECT player_id, username, password FROM player WHERE email = ? AND username = ?',
            [email, username]
        );

        if (results.length > 0) {
            const user = results[0];
            if (user.password === password) {
                response.status(200).json({ player_id: user.player_id, username: user.username });
            } else {
                response.status(401).json({ message: 'Invalid password' });
            }
        } else {
            response.status(404).json({ message: 'Player not found' });
        }
    } catch (error) {
        response.status(500).json({ message: 'Algo hice mal con la api jiji', error });
        console.error(error);
    } finally {
        if (connection !== null) {
            connection.end();
            console.log('Connection closed');
        }
    }
});
app.get('/api/player/check', async (request, response) => {
    let connection = null
    try {
        connection = await connectToDB();
        const { email, username, password } = request.body;
        const [results] = await connection.query(
            'SELECT player_id, username, password FROM player WHERE email = ? AND username = ?',
            [email, username]
        );
        if (results.length > 0) {
            const user = results[0];
            if (user.password === password) {
                response.status(200).json({ player_id: user.player_id, username: user.username });
            }
            else {
                response.status(401).json({ message: 'Invalid password' });
            }
        }
        else {
            response.status(404).json({ message: 'Player not found' })
        }
    }
    catch (error) {
        response.status(500).json({ message: 'aLGO hice mal con la API jiji --Mau', error });
        console.log(error);
    }
    finally {
        if (connection !== null) {
            connection.end();
            console.log("Connection closed");
        }
    }
})
// --------------------------------------------------------------- Queries a tabla player -----------------------
// Insert a new user into the database and return a JSON object with the id of the new user
app.post('/api/player', async (request, response) => {
    let connection = null;
    try {
        connection = await connectToDB();

        // Add the current date and time to the request body
        const currentDate = new Date();
        console.log(currentDate);
        const playerData = {
            ...request.body,
            date_create: currentDate, // Add the registration date
        };

        // Insert the new player into the database
        const [results, fields] = await connection.query('INSERT INTO player SET ?', playerData);

        console.log(`${results.affectedRows} row inserted`);
        response.status(201).json({ 'message': "Data inserted correctly.", "player_id": results.insertId });
    } catch (error) {
        response.status(500)
        response.json(error);
        console.log(error);
    } finally {
        if (connection !== null) {
            connection.end();
            console.log("Connection closed successfully!");
        }
    }
});
// Check if a username already exists
app.get('/api/player/check/:username', async (request, response) => {
    let connection = null;

    try {
        connection = await connectToDB();

        const [results, _] = await connection.query('SELECT * FROM player WHERE username = ?', [request.params.username]);

        if (results.length > 0) {
            response.status(200).json({ exists: true, message: 'Username already exists.' });
        } else {
            response.status(200).json({ exists: false, message: 'Username disponible' });
        }
    } catch (error) {
        response.status(500).json({ error: 'Error checking username.' });
        console.error(error);
    } finally {
        if (connection !== null) {
            connection.end();
            console.log('Connection closed successfully!');
        }
    }
});



// Get all users from the database and return them as a JSON object
app.get('/api/player', async (request, response) => {
    let connection = null
    try {
        connection = await connectToDB()
        // leaderboard.html Query 1 MySQL
        const [results, fields] = await connection.execute(`
            SELECT p.player_id AS "PlayerID", p.username AS 'Username', p.recordScore AS 'High Score', p.recordTime AS 'Record Time' 
            FROM player AS p 
            ORDER BY p.recordScore DESC 
            LIMIT 10`);
        console.log(`${results.length} rows returned`)
        console.log(results)
        response.json(results)
    }
    catch (error) {
        response.status(500)
        response.json(error)
        console.log(error)
    }
    finally {
        if (connection !== null) {
            connection.end()
            console.log("Connection closed succesfully!")
        }
    }
})

// Get a specific user from the database and return it as a JSON object
app.get('/api/player/:username', async (request, response) => {
    let connection = null

    try {
        connection = await connectToDB()

        const [results_user, _] = await connection.query(`
            SELECT p.player_id AS "PlayerID", p.username AS "Username", p.recordScore AS "High Score", p.recordTime AS "Record Time" 
            FROM player AS p WHERE username= ?`, [request.params.username])

        console.log(`${results_user.length} rows returned`)
        response.json(results_user)
    }
    catch (error) {
        response.status(500)
        response.json(error)
        console.log(error)
    }
    finally {
        if (connection !== null) {
            connection.end()
            console.log("Connection closed succesfully!")
        }
    }
})

// Update a user in the database and return a JSON object with the number of rows updated
app.put('/api/player', async (request, response) => {

    let connection = null

    try {
        connection = await connectToDB()

        const [results, fields] = await connection.query('update player set recordScore = ?, recordTime = ? where player_id= ?', [request.body['recordScore'], request.body['recordTime'], request.body['player_id']])

        console.log(`${results.affectedRows} rows updated`)
        response.json({ 'message': `Data updated correctly: ${results.affectedRows} rows updated.` })
    }
    catch (error) {
        response.status(500)
        response.json(error)
        console.log(error)
    }
    finally {
        if (connection !== null) {
            connection.end()
            console.log("Connection closed succesfully!")
        }
    }
})
// Update a user in the database and return a JSON object with the number of rows updated
app.put('/api/playertime', async (request, response) => {

    let connection = null

    try {
        connection = await connectToDB()

        const [results, fields] = await connection.query('update player set recordScore = ?, time_played = ADDTIME(time_played, ?)  where player_id= ?', [request.body['recordScore'], request.body['runTime'], request.body['player_id']])

        console.log(`${results.affectedRows} rows updated`)
        response.json({ 'message': `Data updated correctly: ${results.affectedRows} rows updated.` })
    }
    catch (error) {
        response.status(500)
        response.json(error)
        console.log(error)
    }
    finally {
        if (connection !== null) {
            connection.end()
            console.log("Connection closed succesfully!")
        }
    }
})

// Delete a user from the database and return a JSON object with the number of rows deleted
app.delete('/api/player/:player_id', async (request, response) => {

    let connection = null

    try {
        connection = await connectToDB()

        const [results, fields] = await connection.query('delete from player where player_id= ?', [request.params.player_id])

        console.log(`${results.affectedRows} row deleted`)
        response.json({ 'message': `Data deleted correctly: ${results.affectedRows} rows deleted.` })
    }
    catch (error) {
        response.status(500)
        response.json(error)
        console.log(error)
    }
    finally {
        if (connection !== null) {
            connection.end()
            console.log("Connection closed succesfully!")
        }
    }
})


// ^_----- no se usa, solo quería completar los CRUD para player como test de conexión 

// ------------------- Tests para enviar gameinfo per run -----------------
app.get('/api/player_runstats', async (request, response) => {
    let connection = null
    try {
        connection = await connectToDB()
        const [results, fields] = await connection.execute(`
            SELECT * FROM runsvswins 
            ORDER BY runcount DESC;`)

        console.log(`${results.length} rows returned`)
        console.log(results)
        response.json(results)
    }
    catch (error) {
        response.status(500)
        response.json(error)
        console.log(error)
    }
    finally {
        if (connection !== null) {
            connection.end()
            console.log("Connection closed succesfully!")
        }
    }
})

app.get('/api/player_runstats/:username', async (request, response) => {
    let connection = null
    try {
        connection = await connectToDB()

        const [results_run, _] = await connection.query('select * from runsvswins where username= ? ORDER BY runcount DESC', [request.params.username])

        console.log(`${results_run.length} rows returned`)
        response.json(results_run)
    }
    catch (error) {
        response.status(500)
        response.json(error)
        console.log(error)
    }
    finally {
        if (connection !== null) {
            connection.end()
            console.log("Connection closed succesfully!")
        }
    }
})
app.post('/api/player_runstats', async (request, response) => {
    let connection = null;
    try {
        connection = await connectToDB();
        const currentDate = new Date();
        const runData = {
            ...request.body,
            run_end: currentDate,
        };
        const [results, fields] = await connection.query('INSERT INTO player_runstats SET ?', runData);
        console.log("runData", runData, "reuslts", results);
        console.log(`${results.affectedRows} row inserted`);
        response.status(201).json({ 'message': "Data inserted correctly.", "run_id": results.insertId });
    } catch (error) {
        response.status(500)
        response.json(error);
        console.log(error);
    } finally {
        if (connection !== null) {
            connection.end();
            console.log("Connection closed successfully!");
        }
    }
});

// Update a playrs score ponts nd time
app.put('/api/player', async (request, response) => {
    let connection = null
    try {
        connection = await connectToDB()
        const [results, fields] = await connection.query('update player set recordScore = ?, email = ? where player_id= ?', [request.body['username'], request.body['email'], request.body['player_id']])
        console.log(`${results.affectedRows} rows updated`)
        response.json({ 'message': `Data updated correctly: ${results.affectedRows} rows updated.` })
    }
    catch (error) {
        response.status(500)
        response.json(error)
        console.log(error)
    }
    finally {
        if (connection !== null) {
            connection.end()
            console.log("Connection closed succesfully!")
        }
    }
})


// test para mandar level info---------------------------
/*
app.get('/api/level_layout', async (request, response) => {
    let connection = null
    try {
        connection = await connectToDB()
        const [results, fields] = await connection.execute('select * from level_layout')

        console.log(`${results.length} rows returned`)
        console.log(results)
        response.json(results)
    }
    catch (error) {
        response.status(500)
        response.json(error)
        console.log(error)
    }
    finally {
        if (connection !== null) {
            connection.end()
            console.log("Connection closed succesfully!")
        }
    }
})

app.get('/api/level_layout/:level_id', async (request, response) => {
    let connection = null
    try {
        connection = await connectToDB()

        const [results_run, _] = await connection.query('select * from level_layout where level_id= ?', [request.params.level_id])

        console.log(`${results_run.length} rows returned`)
        response.json(results_run)
    }
    catch (error) {
        response.status(500)
        response.json(error)
        console.log(error)
    }
    finally {
        if (connection !== null) {
            connection.end()
            console.log("Connection closed succesfully!")
        }
    }
})
app.post('/api/level_layout', async (request, response) => {
    let connection = null;
    try {
        connection = await connectToDB();
        const levelData  = request.body;
        const [results, fields] = await connection.query('INSERT INTO level_layout SET ?', levelData);
        console.log("levelData", levelData, "reuslts", results);
        console.log(`${results.affectedRows} row inserted`);
        response.status(201).json({ 'message': "Data inserted correctly.", "level_id": results.insertId });
    } catch (error) {
        response.status(500)
        response.json(error);
        console.log(error);
    } finally {
        if (connection !== null) {
            connection.end();
            console.log("Connection closed successfully!");
        }
    }
});
*/




// ----------- player winsdeaths query -------------------
// Get all users from the database and return them as a JSON object
app.get('/api/winsvsdeaths', async (request, response) => {
    let connection = null
    try {
        connection = await connectToDB()
        // leaderboard.html Query 3 MySQL
        const [results, fields] = await connection.execute('SELECT p.username, p.wins, (p.runcount - p.wins) AS deaths FROM runsvswins AS p ORDER BY p.runcount LIMIT 10;');
        console.log(`${results.length} rows returned`)
        console.log(results)
        response.json(results)
    }
    catch (error) {
        response.status(500)
        response.json(error)
        console.log(error)
    }
    finally {
        if (connection !== null) {
            connection.end()
            console.log("Connection closed succesfully!")
        }
    }
})

// Get a specific user from the database and return it as a JSON object
app.get('/api/winsvsdeaths/:username', async (request, response) => {
    let connection = null
    try {
        connection = await connectToDB()
        const [results_user, _] = await connection.query('SELECT p.username, p.wins, (p.runcount - p.wins) AS deaths FROM runsvswins AS p WHERE username= ?', [request.params.username])
        console.log(`${results_user.length} rows returned`)
        response.json(results_user)
    }
    catch (error) {
        response.status(500)
        response.json(error)
        console.log(error)
    }
    finally {
        if (connection !== null) {
            connection.end()
            console.log("Connection closed succesfully!")
        }
    }
})

// ----------- player favorite card query -------------------
// Get all users from the database and return them as a JSON object
app.get('/api/favoritecard', async (request, response) => {
    let connection = null
    try {
        connection = await connectToDB()
        // leaderboard.html Query 4 MySQL
        const [results, fields] = await connection.execute(`
            SELECT * 
            FROM player_card 
            ORDER BY UsageCount DESC LIMIT 10;`);
        console.log(`${results.length} rows returned`)
        console.log(results)
        response.json(results)
    }
    catch (error) {
        response.status(500)
        response.json(error)
        console.log(error)
    }
    finally {
        if (connection !== null) {
            connection.end()
            console.log("Connection closed succesfully!")
        }
    }
})

// Get a specific user from the database and return it as a JSON object
app.get('/api/favoritecard/:username', async (request, response) => {
    let connection = null
    try {
        connection = await connectToDB()

        const [results_user, _] = await connection.query(`
            SELECT * 
            FROM player_card 
            WHERE Username= ? ORDER BY UsageCount DESC LIMIT 1`, [request.params.username])

        console.log(`${results_user.length} rows returned`)
        response.json(results_user)
    }
    catch (error) {
        response.status(500)
        response.json(error)
        console.log(error)
    }
    finally {
        if (connection !== null) {
            connection.end()
            console.log("Connection closed succesfully!")
        }
    }
})

//-----------------Cosas para Player Nemesis
// Get all users from the database and return them as a JSON object
app.get('/api/nemesis', async (request, response) => {
    let connection = null
    try {
        connection = await connectToDB()
        // leaderboard.html Query 4 MySQL
        const [results, fields] = await connection.execute(`
            SELECT * 
            FROM nemesis 
            ORDER BY KillCount DESC LIMIT 10;`);
        console.log(`${results.length} rows returned`)
        console.log(results)
        response.json(results)
    }
    catch (error) {
        response.status(500)
        response.json(error)
        console.log(error)
    }
    finally {
        if (connection !== null) {
            connection.end()
            console.log("Connection closed succesfully!")
        }
    }
})

// Get a specific user from the database and return it as a JSON object
app.get('/api/nemesis/:username', async (request, response) => {
    let connection = null
    try {
        connection = await connectToDB()
        const [results_user, _] = await connection.query('SELECT * FROM nemesis WHERE Username = ? ORDER BY KillCount DESC LIMIT 1', [request.params.username])
        console.log(`${results_user.length} rows returned`)

        response.json(results_user)
        if (results.length === 1) {
            const enemyName = results[0]["Enemy"];
            const img = new Image();
            img.src = `../assets/enemies/${enemyName}.png`; // que pro me vi

            img.onload = function () {
                const ctx = document.getElementById('nemesisCanvas').getContext('2d');
                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                ctx.drawImage(img, 10, 10, 128, 128);
                ctx.font = "20px Arial";
                ctx.fillStyle = "white";
                ctx.fillText(enemyName, 10, 150);
            };
        }
    }
    catch (error) {
        response.status(500)
        response.json(error)
        console.log(error)
    }
    finally {
        if (connection !== null) {
            connection.end()
            console.log("Connection closed succesfully!")
        }
    }
})
function formatDateForMySQL(date) {
    return date.toISOString().slice(0, 19).replace('T', ' ');
}
//playerprogdata
app.get('/api/progression', async (request, response) => {
    let connection = null
    try {
        connection = await connectToDB()
        const [results, fields] = await connection.execute(`SELECT p.username, r.run_start, r.score
                 FROM player AS p
                 JOIN player_runstats AS r ON p.player_id = r.player_id
                 ORDER BY p.username, r.run_start`);

        console.log(`${results.length} rows returned`)
        console.log(results)
        response.json(results)
    }
    catch (error) {
        response.status(500)
        response.json(error)
        console.log(error)
    }
    finally {
        if (connection !== null) {
            connection.end()
            console.log("Connection closed succesfully!")
        }
    }
})
// Get player progression data 
app.get('/api/progression/:username', async (request, response) => {
    let connection = null
    try {
        connection = await connectToDB()

        const [results_user, _] = await connection.query('SELECT p.username, r.run_start, r.score FROM player AS p JOIN player_runstats AS r ON p.player_id = r.player_id WHERE p.username = ? ORDER BY r.run_start', [request.params.username])

        console.log(`${results_user.length} rows returned`)
        response.json(results_user)
    }
    catch (error) {
        response.status(500)
        response.json(error)
        console.log(error)
    }
    finally {
        if (connection !== null) {
            connection.end()
            console.log("Connection closed succesfully!")
        }
    }
})

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})