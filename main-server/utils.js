const path = require('path');


const getStaticFilePath = (filename) => {
    return path.join(__dirname, '..', 'static', filename);
}

module.exports = getStaticFilePath;