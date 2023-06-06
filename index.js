// dependency
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');


const router = require('./routes/routes');
const {
  connectDb
} = require('./db/db');


// app
const app = express();

// middleware
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser(process.env.COOKI_SECRET))

// connect with db
connectDb()

// routes
router.get('/', (req, res) => {
  res.send('welcome to khelaGor!');
}
);
app.use('/api', router);

// port
const port = process.env.PORT || 8000;

// error handling
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json( {
      error: 'Unauthorized!'
    });
    // next(err)
  }
  if (err.name === 'ValidationError') {
    res.status(401).json( {
      error: err
    });
    // next(err)
  }

  if (err) {
    res.status(500).json( {
      error: err
    });
    // next(err)
  }


  next();
}
);


// listen
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}
);