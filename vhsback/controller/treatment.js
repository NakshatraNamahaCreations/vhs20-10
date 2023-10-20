const treatmentmodel = require("../model/treatment");

class treatment {
  async addtreatment(req, res) {
    let { region,material,job,qty,rate,userid ,subtotal,category,EnquiryId,note} = req.body;
    // let file = req.file.filename;
    if (!region ) {
      return res.status(500).json({ error: "Field must not be empty" });
    } else {
      let add = new treatmentmodel({
        userid:userid,
        EnquiryId:EnquiryId,
        region: region,
        material: material,
        job: job,
        qty:qty,
        rate:rate,
        subtotal:subtotal,
        category:category,
        note:note
      });
      let save = add.save();
      if (save) {
        return res.json({ sucess: "Added successfully" });
      }
    }
  }

   
  
  async gettreatment(req, res) {
    let treatment = await treatmentmodel.find({}).sort({ _id: -1 });
    if (treatment) {
      return res.json({ treatment: treatment });
    }
  }



  async deletetreatment(req, res) {
    let id = req.params.id;
    let data = await treatmentmodel.deleteOne({ _id: id });
    return res.json({ sucess: "Successfully deleted" });
  }
}

const treatmentcontroller = new treatment();
module.exports = treatmentcontroller;
