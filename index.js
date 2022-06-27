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
function newestMessage(agentId, structureId) {
    
    // setting up stack
    const { Stack } = require('./stack.js');
    const stack = new Stack();

    let SQL = `SELECT * FROM public."Messages" WHERE structure_id = ${structureId}`;

    retrieveMessage(SQL)
    .then((message) => {
        for (let i = 0; i < message.rows.length; i++){
            stack.push(message.rows[i]);
        }

        let retrievedMessage = stack.pop();

        vewiedMessagesRecord(agentId, structureId, retrievedMessage.message_id);

        console.log(retrievedMessage.data);

    })
}

// Getting the newest message - simple status updates that are not mission critical
function oldestMessage(agentId, structureId) {

    // setting up queue
    const { Queue } = require('./queue.js');
    const queue = new Queue();

    let SQL = `SELECT data, message_id FROM public."Messages" WHERE structure_id = ${structureId}`;

    retrieveMessage(SQL)
    .then((message) => {
        for (let i = 0; i < message.rows.length; i++){
            queue.enqueue(message.rows[i]);
        }

        let retrievedMessage = queue.dequeue();

        vewiedMessagesRecord(agentId, structureId, retrievedMessage.message_id);
        
        console.log(retrievedMessage.data);
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

function vewiedMessagesRecord(agentId, structureId, messageId) {

    let date = `to_timestamp(${Date.now()}/1000)`
    let SQL = `INSERT INTO Public."ViewedMessages" (message_id, agent_id, date_viewed, date_seconds, structure_id) VALUES (${messageId}, ${agentId}, ${date}, ${Date.now()}, ${structureId})`;

    client.query(SQL, (err, res) => {
        if (err) {
            console.log(err.message);
        }
        // else {
        //     console.log("Message viewing has been logged.");
        // }

        client.end();
    })
}


// Calling of functions that will add, or return appropiate messages

// let newMessage = 'I will be watching for you';
// let agentId = 4589;
// let structureId = 789789;

// addMessage(newMessage, agentId, structureId);

// oldestMessage(9854, 789789);

// newestMessage(9854, 789789);


