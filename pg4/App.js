const { MongoClient, ObjectId } = require('mongodb');

// Connection URL
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'stud';
// Create a new MongoClient
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

// Connect to the MongoDB server
async function connectDB() {
    try {
        await client.connect();
        console.log('Connected to the database');
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
}

// Insert multiple students (Create)
async function insertMultipleStudents(students) {
    const db = client.db(dbName);
    try {
        const result = await db.collection('students').insertMany(students);
        console.log(`${result.insertedCount} students inserted successfully`);
        console.log('Inserted IDs:', result.insertedIds);
    } catch (err) {
        console.error('Error inserting students:', err);
    }
}

// Update students with cgpa > 9, set elitestudents="yes"
async function updateEliteStudents() {
    const db = client.db(dbName);
    try {
        const result = await db.collection('students').updateMany(
            { cgpa: { $gt: 9 } },
            { $set: { elitestudents: "yes" } }
        );
        console.log(`${result.modifiedCount} students updated as elite students`);
    } catch (err) {
        console.error('Error updating elite students:', err);
    }
}

// Delete all students with age less than 17
async function deleteYoungStudents() {
    const db = client.db(dbName);
    try {
        const result = await db.collection('students').deleteMany({ age: { $lt: 17 } });
        console.log(`${result.deletedCount} young students deleted successfully`);
    } catch (err) {
        console.error('Error deleting young students:', err);
    }
}

// Find all students that opted optionalelective="fs"
async function findFsElectiveStudents() {
    const db = client.db(dbName);
    try {
        const students = await db.collection('students').find({ optionalelective: "fs" }).toArray();
        console.log('Students with FS elective:', students);
    } catch (err) {
        console.error('Error finding students with FS elective:', err);
    }
}

// Perform operations
connectDB()
    .then(async () => {
        // Insert multiple students
        const multipleStudents = [
            { name: 'Ravi', age: 19, cgpa: 9.2, Dept: "CSE", optionalelective: "ml" },
            { name: 'Priya', age: 18, cgpa: 8.7, Dept: "IT", optionalelective: "fs" },
            { name: 'Suresh', age: 16, cgpa: 7.9, Dept: "ECE", optionalelective: "fs" },
            { name: 'Deepa', age: 20, cgpa: 9.5, Dept: "CSE", optionalelective: "blockchain" },
            { name: 'Alice', age: 18, cgpa: 9.5, optionalelective: "fs" },
            { name: 'Bob', age: 19, cgpa: 6.8, optionalelective: "ai" },
            { name: 'Charlie', age: 16, cgpa: 7.2, optionalelective: "fs" },
            { name: 'David', age: 20, cgpa: 9.1, optionalelective: "fs" },
        ];
        await insertMultipleStudents(multipleStudents);

        // Update elite students (cgpa > 9)
        await updateEliteStudents();

        // Delete young students (age < 17)
        await deleteYoungStudents();

        // Find students with FS elective
        await findFsElectiveStudents();

        // Close the connection
        client.close();
});