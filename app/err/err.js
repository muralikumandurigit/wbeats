module.exports = errorHandler;

function errorHandler(err, req, res, next) {
    if (typeof (err) === 'string') {
        // custom application error
        return res.status(400).json({ message: err });
    }

    if (err.name === 'UnauthorizedError') {
        // jwt authentication error
        console.log("Throwing 401 error with message = " + err.message);
        return res.status(401).json({ message: err.message });
    }

    // default to 500 server error
    console.log("From errorHandler: msg= " + err.message + " code = " + err.name);
    return res.status(500).json({ message: err.message });
}