// Import the Express module for creating a web server
const express = require("express");
// Import the path module for working with file and directory paths
const path = require("path");
// Create an instance of an Express application
const app = express();
// Define the port number for the server to listen on
const port = 8080;

// Array containing animal names and their descriptions
const ANIMALS = 
[
    { name: "Elephant", description: "A huge gray animal with a long trunk and big ears, known for being smart and strong." },
    { name: "Bird", description: "A small, feathered animal that can fly and often sings. They live in trees and build nests." },
    { name: "Snake", description: "A long, thin animal with no legs that slithers on the ground. Some can be dangerous." },
    { name: "Lion", description: "A big, strong cat with a furry mane. Known as the 'king of the jungle' and has a loud roar." },
    { name: "Dog", description: "A loyal, friendly animal that loves to play and is known as 'man's best friend.'" },
    { name: "Cat", description: "A small, curious animal that loves to climb and nap. It has sharp claws and purrs when happy." },
    { name: "Cheetah", description: "The fastest animal on land, with a slim body and spots, built for speed." },
    { name: "Panther", description: "A big, black cat that moves quietly and is strong. It's mysterious and powerful." },
    { name: "Monkey", description: "A playful animal that swings from trees, uses its tail, and is known for being curious." },
    { name: "Gorilla", description: "A big, gentle ape that lives in groups, strong but usually calm and protective of its family." }
];

// Endpoint to serve the main HTML file when the user visits the root URL
app.get("/", (req, res) => 
{
    // Respond with the index.html file located in the "public" folder
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Endpoint to serve the CSS file
app.get("/style.css", (req, res) => 
{
    // Respond with the CSS file located in the "public" folder
    res.sendFile(path.join(__dirname, "public", "style.css"));
});

// Endpoint to serve the JavaScript file
app.get("/project.js", (req, res) => 
{
    // Respond with the JavaScript file located in the "public" folder
    res.sendFile(path.join(__dirname, "public", "project.js"));
});

// Endpoint to serve animal images dynamically
app.get("/images/:imageName", (req, res) => 
{
    // Respond with the requested image file located in the "public/images" folder
    res.sendFile(path.join(__dirname, "public", "images", req.params.imageName));
});

// Endpoint to get an animal description based on its index
app.get("/getAnimal", (req, res) => 
{
    // Parse the "index" query parameter from the request
    const animalIndex = parseInt(req.query.index);

    // Respond with the animal's name and description as JSON
    res.json(ANIMALS[animalIndex]);
});

// Start the server and listen for incoming requests on the specified port
app.listen(port, () => 
{
    // Log a message to indicate that the server is running
    console.log(`Server running at http://localhost:${port}`);
});
