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

// The mysql2/promise module is used to connect to the MySQL database. The promise version of the module is used to avoid the use of callbacks and instead use the async/await syntax.
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


app.post('/api/player/check', async (request, response) => {
    let connection = null;
    try {
        connection = await connectToDB();
        const { email, username, password } = request.body;

        // Query the database for the user
        const [results] = await connection.query(
            'SELECT player_id, username, password FROM player WHERE email = ? AND username = ?',
            [email, username]
        );

        if (results.length > 0) {
            const user = results[0];

            // Compare the password (plain text comparison)
            if (user.password === password) {
                response.status(200).json({ player_id: user.player_id, username: user.username });
            } else {
                response.status(401).json({ message: 'Invalid password' });
            }
        } else {
            response.status(404).json({ message: 'Player not found' });
        }
    } catch (error) {
        response.status(500).json({ message: 'Internal server error', error });
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
    try{
        connection = await connectToDB();
        const{email, username, password} = request.body; 
        const[results] = await connection.query(
            'SELECT player_id, username, password FROM player WHERE email = ? AND username = ?',
            [email, username]
        );
        if(results.length > 0){
            const user = results[0];
            if(user.password === password){
                response.status(200).json({player_id: user.player_id, username: user.username});
            }
            else{
                response.status(401).json({message: 'Invalid password'});
            }
        }
        else{
            response.status(404).json({message: 'Player not found' })
        }
    }
    catch (error) {
        response.status(500).json({message: 'aLGO hice mal con la API jiji --Mau', error});
        console.log(error);
    }
    finally {
        if(connection !== null){
            connection.end();
            console.log("Connection closed");
        }
    }
})
// Get all users from the database and return them as a JSON object
app.get('/api/player', async (request, response) => {
    let connection = null
    try {
        connection = await connectToDB()
        const [results, fields] = await connection.execute('select * from player')
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
app.get('/api/player/:player_id', async (request, response) => {
    let connection = null

    try {
        connection = await connectToDB()

        const [results_user, _] = await connection.query('select * from player where player_id= ?', [request.params.id])

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

// Update a user in the database and return a JSON object with the number of rows updated
app.put('/api/player', async (request, response) => {

    let connection = null

    try {
        connection = await connectToDB()

        const [results, fields] = await connection.query('update player set username = ?, email = ? where player_id= ?', [request.body['username'], request.body['email'], request.body['player_id']])

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




// ------------------- Tests para enviar gameinfo
app.get('/api/player_runstats', async (request, response) => {
    let connection = null
    try {
        connection = await connectToDB()
        const [results, fields] = await connection.execute('select * from player_runstats')

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

app.get('/api/player_runstats/:run_id', async (request, response) => {
    let connection = null
    try {
        connection = await connectToDB()

        const [results_run, _] = await connection.query('select * from player_runstats where run_id= ?', [request.params.run_id])

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

// Check if a username already exists
app.get('/api/player/check/:username', async (request, response) => {
    let connection = null;

    try {
        connection = await connectToDB();

        const [results, _] = await connection.query('SELECT * FROM player WHERE username = ?', [request.params.username]);

        if (results.length > 0) {
            response.status(200).json({ exists: true, message: 'Username already exists.' });
        } else {
            response.status(200).json({ exists: false, message: 'Username is available.' });
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

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})