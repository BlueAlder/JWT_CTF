const jwt = require('jsonwebtoken');
require('dotenv').config();

const payload = {
    username: 'yeetimus',
    admin: false
};

const token = jwt.sign(payload, process.env.JWT_SECRET);

console.log(token);

jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    console.log(decoded);
});

const modifiedToken = "eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJ1c2VybmFtZSI6ImFzZCIsImFkbWluIjp0cnVlLCJpYXQiOjE1NTk4Njk2OTR9.";
jwt.verify(modifiedToken,  process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
        console.error(err);
    }
    console.log(decoded);
});
