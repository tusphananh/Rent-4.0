
const mongoose = require('mongoose')
var url = "mongodb+srv://admin:admin@tuphan.id0lo.mongodb.net/ree";
const user = require('./user.js')



mongoose.connect(url, {
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useCreateIndex : true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Database Connected')
});

module.exports = {
    createUser: function (data) {
       const name = data.name
       const password = data.password
       const phone = data.phone

      return user.create({
        phone,password,name
      });

    },
    findUser: function (data) {
      const phone = data.phone
      
      return user.findOne({'phone' : phone}).lean()
    },
    findUserById: function (data) {
  
      return user.findOne({'_id' : data}).lean()
    }
};
