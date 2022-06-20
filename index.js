/*
    Project: Semester 3 Sprint 1 - Algorithims & Data Structures
    Team 6 - Chris Doucette, Dominic Whelan and Blake Waddleton
    Main Programmer this section: Chris Doucette
    Created Date: Monday, June 10, 2022
    Completed Date: 
*/

// Connecting the database
const { Client } = require('pg').Client;
const client = new Client({
    user: 'Semester3Sprint1',
    host: 'localhost',
    database: 'Semester3Sprint1',
    password: 's3s1Team_6',
    port: 5432,
});

client.connect();

const query = `SELECT * FROM Messages`;

client.query(query, (err, res) => {
    if (err) {
        console.error(err);
        return;
    }
    for (let row of res.rows) {
        console.log(row);
    }
    client.end();
})

// setting up stack
const { Stack } = require('./stack.js');
const stack = new Stack();

// setting up queue
const { Queue } = require('./queue.js');
const queue = new Queue();

// stack.push({
//     data: "This message will self destruct in 20 seconds",
//     agentId: 12345,
//     structureId: 67890
// })

// stack.push({
//     data: 'This message will self destruct in 45 seconds',
//     agentId: 0124,
//     structureId: 44112255
// })

// console.log(stack);

// Getting the oldest message - simple status updates that are not mission critical
function oldestMessage() {
    
}

// Getting the newest message - situations where the information is critical and
// more-up-to-date information is more important
function newestMessage() {

}