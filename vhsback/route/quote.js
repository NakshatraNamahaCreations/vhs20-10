const express=require("express");
const router=express.Router();
const quoteaddcontroller=require("../controller/quote");


router.post("/addquote",quoteaddcontroller.addquote);
router.get("/getquote",quoteaddcontroller.getallquote);
// router.post("/editquote/:id",quoteaddcontroller.editquote);
router.post("/deletetequote/:id",quoteaddcontroller.deletequote);
router.get("/getallquote",quoteaddcontroller.getallagreegatequote);
router.post("/updatequotedetails/:id", quoteaddcontroller.updatequoteDetails);



module.exports=router;