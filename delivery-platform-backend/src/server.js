require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

app.use(cors());
app.use(express.json());


app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/items', require('./routes/item.routes'));
app.use('/api/agent', require('./routes/agent.routes'));
app.use('/api/admin', require('./routes/admin.routes')); // ← MOST LIKELY
app.use('/api/user', require('./routes/user.routes'));

connectDB();

app.listen(5000, () => {
  console.log('Server running on 5000');
});
