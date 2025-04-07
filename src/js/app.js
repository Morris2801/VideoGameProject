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
app.use(express.static('../'))

// Function to connect to the MySQL database
async function connectToDB()
{
    return await mysql.createConnection({
        host:'localhost',
        user:'mayaztec_user',
        password:'mayaztec123',
        database:'mayaztec'
    })
}

// Routes definition and handling
app.get('/', (request,response)=>{
    fs.readFile('../html/leaderboard.html', 'utf8', (err, html)=>{
        if(err) response.status(500).send('There was an error: ' + err)
        console.log('Loading page...')
        response.send(html)
    })
})

// Get all users from the database and return them as a JSON object
app.get('/api/player', async (request, response)=>{
    let connection = null

    try
    {
        connection = await connectToDB()
        const [results, fields] = await connection.execute('select * from player')

        console.log(`${results.length} rows returned`)
        console.log(results)
        response.json(results)
    }
    catch(error)
    {
        response.status(500)
        response.json(error)
        console.log(error)
    }
    finally
    {
        if(connection!==null) 
        {
            connection.end()
            console.log("Connection closed succesfully!")
        }
    }
})

// Get a specific user from the database and return it as a JSON object
app.get('/api/player/:player_id', async (request, response)=>
{
    let connection = null

    try
    {
        connection = await connectToDB()

        const [results_user, _] = await connection.query('select * from players where player_id= ?', [request.params.id])
        
        console.log(`${results_user.length} rows returned`)
        response.json(results_user)
    }
    catch(error)
    {
        response.status(500)
        response.json(error)
        console.log(error)
    }
    finally
    {
        if(connection!==null) 
        {
            connection.end()
            console.log("Connection closed succesfully!")
        }
    }
})

// Insert a new user into the database and return a JSON object with the id of the new user
app.post('/api/player', async (request, response)=>{

    let connection = null

    try
    {    
        connection = await connectToDB()

        const [results, fields] = await connection.query('insert into player set ?', request.body)
        
        console.log(`${results.affectedRows} row inserted`)
        response.status(201).json({'message': "Data inserted correctly.", "id": results.insertId})
    }
    catch(error)
    {
        response.status(500)
        response.json(error)
        console.log(error)
    }
    finally
    {
        if(connection!==null) 
        {
            connection.end()
            console.log("Connection closed succesfully!")
        }
    }
})

// Update a user in the database and return a JSON object with the number of rows updated
app.put('/api/player', async (request, response)=>{

    let connection = null

    try{
        connection = await connectToDB()

        const [results, fields] = await connection.query('update player set username = ?, email = ? where player_id= ?', [request.body['username'], request.body['email'], request.body['player_id']])
        
        console.log(`${results.affectedRows} rows updated`)
        response.json({'message': `Data updated correctly: ${results.affectedRows} rows updated.`})
    }
    catch(error)
    {
        response.status(500)
        response.json(error)
        console.log(error)
    }
    finally
    {
        if(connection!==null) 
        {
            connection.end()
            console.log("Connection closed succesfully!")
        }
    }
})

// Delete a user from the database and return a JSON object with the number of rows deleted
app.delete('/api/player/:player_id', async (request, response)=>{

    let connection = null

    try
    {
        connection = await connectToDB()

        const [results, fields] = await connection.query('delete from player where player_id= ?', [request.params.id])
        
        console.log(`${results.affectedRows} row deleted`)
        response.json({'message': `Data deleted correctly: ${results.affectedRows} rows deleted.`})
    }
    catch(error)
    {
        response.status(500)
        response.json(error)
        console.log(error)
    }
    finally
    {
        if(connection!==null) 
        {
            connection.end()
            console.log("Connection closed succesfully!")
        }
    }
})

app.listen(port, ()=>
{
    console.log(`App listening at http://localhost:${port}`)
})