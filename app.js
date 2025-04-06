const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const chatRoutes = require('./routes/chatRoutes');
const db = require('./db'); 

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/chat', chatRoutes);

const startServer = async () => {
  try {
   
    const connection = await db.getConnection();
    await connection.ping(); 
    connection.release(); 
    console.log(' MySQL connected');

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error(' Failed to connect to MySQL:', err.message);
    process.exit(1);
  }
};

startServer();
