const jwt = require('jsonwebtoken'); 


// ------------------- JWT SECRET KEY -----------------------------

// generated with "require('crypto').randomBytes(64).toString('hex')"

// I KNOW THAT THIS MUST BE IN AN ENV VARIABLE (THIS IS A TEMP DEV PROJECT ONLY)
const secretKey = '9891af8d6708c8eb385a3064e3d87304b578b0f9ec7e98bce96cc15a028df227865348182594e770cec69c52b30adaf478a7b970df8d94a6a5c35ecf5937f173';

// ----------------------------------------------------------------


// create an access token
function createAccessToken({id, full_name, role, email}) {
    return jwt.sign({id, full_name, role, email}, secretKey, { expiresIn: '24h' }); // expires in 1 day, each day they must login again
  }


// checking if user is authenticated ---- MIDDLEWARE ----
function jwtAuthenticate(req, res, next) {
    try {
        // I'M PUTTING ACCESS TOKENS IN HTTP ONLY COOKIES BECAUSE THIS IS A WEB BASED ONLY APP
        const token = req.cookies['jwt-token-cookie'];
        const decoded_token = jwt.verify(token, secretKey);
        req.user = decoded_token;
        next();
    } catch (error) {
        // console.log(error);
        res.redirect('/login');
    }


}


module.exports = {createAccessToken, jwtAuthenticate}