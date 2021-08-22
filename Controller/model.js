var mongoose = require('mongoose');
 
const contactSchema = mongoose.Schema({
    country_code: {
      type: String,
      required: true
    },
    
    first_name: {
      type: String,
      required: true
    },
    last_name: {
      type: String,
      required: false
    },
    phone_number: {
      type: String,
      required: true
    },
    contact_picture: {
      type: String,
      required: false
    },
    is_favorite: {
      type: Boolean,
      default:false
       
    }
  });
 
//Image is a model which has a schema imageSchema
 
module.exports = new mongoose.model('contact-detail', contactSchema);