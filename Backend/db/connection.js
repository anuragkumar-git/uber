const mongoose = require('mongoose')

connection = () => {
    mongoose.connect(process.env.CONNECTION_STRING).then(() => {
        console.log(`✅ Database Connection`);        
    }).catch((err) => {
        console.log(`❌ ${err}`);
    })
}

module.exports = connection