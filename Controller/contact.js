var Contact=require('./model');

module.exports={
    getContactDetails: async(req,res)=>{
      try{
             let result =await Contact.find()
             res.json({
                status: true,
                result: result
            })
      }
      catch(ex){
        res.json({
            status: false,
            result: ex
        })
      }
    },
    getSingleContact:async(req,res)=>{
      try{
            let result =await Contact.find({_id:req.params.id})
            res.json({
               status: true,
               result: result
           })
     }
     catch(ex){
       res.json({
           status: false,
           result: ex
       })
     }
    },
    addContactDetails:async(req,res)=>{
        try{
            var doc = await Contact.create(req.body)
      
            res.json({
                status: true,
                result: doc._id
            })
        }
        catch(ex){
            console.log(ex)
            res.json({
                status: false,
                result: ""
            })
        }
      
    },
    updateContactDetails:async(req,res)=>{
        
        var doc = await Contact.findByIdAndUpdate(req.body._id, req.body, {
            new: true
        })
        res.json({
            status: true,
            result: doc,
            message: "Order Updated Succesfully"
        })
    },
    deleteContactdetails:async(req,res)=>{
        Contact.findByIdAndDelete(req.params.id, {}, function(err, doc){
            if (!err) {
                res.json({
                    status: true,
                    message: "Contact Deleted Sucessfully"
                })
            } else {
                res.json({
                    status: false,
                    message: "Could not able to delete Contact"
                })
            }
        })
    }
}


