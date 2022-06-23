/*
    Project: Semester 3 Sprint 1 - Algorithims & Data Structures
    Team 6 - Chris Doucette, Dominic Whelan and Blake Waddleton
    Main Programmer this section: Chris Doucette
    Created Date: Monday, June 10, 2022
    Completed Date: 
*/

// Connecting the database
const { Client } = require('pg');
const client = new Client({
    user: 'Semester3Sprint1',
    host: 'localhost',
    database: 'Semester3Sprint1',
    password: 's3s1Team_6',
    port: 5432,
});

// setting up stack
const { Stack } = require('./stack.js');
const stack = new Stack();

// setting up queue
const { Queue } = require('./queue.js');
const queue = new Queue();


// Function to add records to Message Database
function addMessage(data, agentId, structureId) {
    
    client.connect()

    let SQL = `INSERT INTO Public."Messages" (data, agent_id, structure_id) VALUES ('${data}', ${agentId}, ${structureId})`;

    client.query(SQL, (err, res) => {
        if (err) {
            console.log(err.message);
        } else {
            console.log("Your message has been stored.");
        }

        client.end();
    })
}



// Getting the newest message - situations where the information is critical and
// more-up-to-date information is more important
function newestMessage(structureId) {

    let SQL = `SELECT data FROM public."Messages" WHERE structure_id = ${structureId}`;

    retrieveMessage(SQL)
    .then((message) => {
        client.end();
        for (let i = 0; i < message.rows.length; i++){
            stack.push(message.rows[i]);
        }

        console.log(stack.pop());
    })
}

// Getting the newest message - simple status updates that are not mission critical
function oldestMessage(structureId) {

    let SQL = `SELECT data FROM public."Messages" WHERE structure_id = ${structureId}`;

    retrieveMessage(SQL)
    .then((message) => {
        client.end();
        for (let i = 0; i < message.rows.length; i++){
            queue.enqueue(message.rows[i]);
        }

        console.log(queue.dequeue());
    })
}

//Function to retrieve data from Select Queiries
async function retrieveMessage(SQL) {

    client.connect();
    const result = await client.query(SQL);

    if (!result || !result.rows || !result.rows.length) {
        client.end();
        console.log("No records matched your search!");
        return [];
    }

    return result;
}


// Calling of functions that will add, or return appropiate messages

// let message = 'This is another important message from VS Code. It will self destruct in 30 seconds!!';
// let agentId = 7799;
// let structureId = 454545;

// addMessage(message, agentId, structureId);
oldestMessage(56789);
// newestMessage(56789);


