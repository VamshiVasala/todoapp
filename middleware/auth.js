const jwt = require('jsonwebtoken');

function authentication(req, res, next) {
    // Get the authorization header from the request
    const authHeader = req.headers['authorization'];

    // Check if the authorization header is present
    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header missing' });
    }

    // Extract the token by splitting the header value
    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access token missing' });
    }

    // Verify the token using the secret key
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || 'secretkey', (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired token' });
        }

        // Attach the user info to the request object for further use
        req.user = user;
        next();
    });
}

module.exports = authentication;
