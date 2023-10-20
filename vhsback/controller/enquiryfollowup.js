const enquiryfollowupModel = require("../model/enquiryfollowup");

const filterAndRetainLatest = (data, responseCriteria) => {
  const filteredData = data.filter(
    (item) => item.response === responseCriteria
  );

  const latestDataByEnquiryId = {};

  filteredData.forEach((dataItem) => {
    const enquiryId = dataItem.EnquiryId;
    if (
      !latestDataByEnquiryId[enquiryId] ||
      dataItem.createdAt > latestDataByEnquiryId[enquiryId].createdAt
    ) {
      latestDataByEnquiryId[enquiryId] = dataItem;
    }
  });

  const latestEnquiries = Object.values(latestDataByEnquiryId);

  return latestEnquiries;
};

class addenquiry {

 
  async Addenquiryfollowup(req, res) {
    try {
      let {
        EnquiryId,
        category,
        folldate,
        staffname,
        response,
        desc,
        value,
        colorcode,
        nxtfoll,
        appoTime,
        sendSms,
        appoDate,
        slotid,
        userId,
        type,
        responseType
      } = req.body;
      const newVendor = new enquiryfollowupModel({
        EnquiryId,
        category,
        folldate,
        staffname,
        response,
        desc,
        value,
        colorcode,
        nxtfoll,
        appoTime,
        sendSms,
        appoDate,
        slotid,
        userId,
        type,
        responseType,
      });
      newVendor.save().then((data) => {
        return res
          .status(200)
          .json({ Success: "Account created. Please login" });
      });
    } catch (error) {
      console.error("Error enquiry add:", error);
    }
  }

  //Get all
  async getallenquiryfollowup(req, res) {
    let data = await enquiryfollowupModel.find({}).sort({ _id: -1 });
    if (data) {
      return res.status(200).json({ enquiryfollowup: data });
    } else {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }

  //Get new data
  async getnewdata(req, res) {
    let data = (await enquiryfollowupModel.find({})).filter(
      (i) => i.response === "New"
    );
    if (data) {
      return res.status(200).json({ enquiryfollowup: data });
    } else {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }
  //post category

  async getsurveydata(req, res) {
    try {
      const data = await enquiryfollowupModel.find({ response: "Survey" }).sort({ createdAt: -1 });
  
      const latestSurveyData = {};
  
      data.forEach(dataItem => {
        const enquiryId = dataItem.EnquiryId;
        if (!latestSurveyData[enquiryId] || dataItem.createdAt > latestSurveyData[enquiryId].createdAt) {
          latestSurveyData[enquiryId] = dataItem;
        }
      });
  
      const finalLatestSurveyData = Object.values(latestSurveyData);
  
      if (finalLatestSurveyData.length > 0) {
        return res.status(200).json({ enquiryfollowup: finalLatestSurveyData });
      } else {
        return res.status(500).json({ error: "Something went wrong" });
      }
    } catch (error) {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }
  

  async postsurveycat(req, res) {
    try {
      const { category } = req.body;
      const data = await enquiryfollowupModel.find({ category }).sort({ _id: -1 });
  
      const latestSurveyData = {};
  
      data.forEach(dataItem => {
        const enquiryId = dataItem.EnquiryId;
        if (!latestSurveyData[enquiryId] || dataItem.createdAt > latestSurveyData[enquiryId].createdAt) {
          latestSurveyData[enquiryId] = dataItem;
        }
      });
  
      const finalLatestSurveyData = Object.values(latestSurveyData).filter(item => item.response === "Survey");
  
      console.log("finalLatestSurveyData",finalLatestSurveyData)
      if (finalLatestSurveyData) {
        return res.json({ enquiryfollowup: finalLatestSurveyData });
      } else {
        return res.json({ error: "Something went wrong" });
      }
    } catch (error) {
      return res.json({ error: "Something went wrong" });
    }
  }
  

  async getallagreedata(req, res) {
    try {
      let data = await enquiryfollowupModel.aggregate([
        {
          $lookup: {
            from: "enquiryadds",
            localField: "EnquiryId",
            foreignField: "EnquiryId",
            as: "enquirydata",
          },
        },
        {
          $lookup: {
            from: "treatments",
            localField: "EnquiryId",
            foreignField: "EnquiryId",
            as: "treatmentData",
          },
        },
      ]);

      const latestDataByEnquiryId = {};

      data.forEach((dataItem) => {
        const enquiryId = dataItem.EnquiryId;
        if (
          !latestDataByEnquiryId[enquiryId] ||
          dataItem.createdAt > latestDataByEnquiryId[enquiryId].createdAt
        ) {
          latestDataByEnquiryId[enquiryId] = dataItem;
        }
      });

      const latestSurveyData = Object.values(latestDataByEnquiryId).filter(
        (item) => item.response === "Survey"
      );

      if (latestSurveyData.length > 0) {
        console.log("latestSurveyData", latestSurveyData);
        return res.json({ enquiryfollowup: latestSurveyData });
      } else {
        return res.json({ error: "Something went wrong" });
      }
    } catch (error) {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }

  async cancelsurvey(req, res) {
    try {
      let id = req.params.id;
      let { reasonForCancel } = req.body;
      let newData = await enquiryfollowupModel.findOneAndUpdate(
        { _id: id },
        {
          reasonForCancel,
          cancelStatus: true, // Set cancelStatus to true when canceling the survey
        },
        { new: true } // Return the updated document
      );
      if (newData) {
        return res.status(200).json({ Success: "Added", cancelStatus: true });
      } else {
        return res.status(500).json({ error: "Something went wrong" });
      }
    } catch (error) {
      console.log("Error in controller : ", error);
      return res.status(403).send({
        message:
          "Something went wrong while updating your details Please try again later.",
      });
    }
  }
  async updateDetails(req, res) {
    let id = req.params.id;
    let { technicianname, appoDate, appoTime, sendSms } = req.body;
    let newData = await enquiryfollowupModel.findOneAndUpdate(
      { _id: id },
      {
        technicianname,
        appoDate,
        appoTime,
        sendSms,
      }
    );
    if (newData) {
      return res.status(200).json({ Success: "Added" });
    } else {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }

  async getflwdata(req, res) {
    try {
      let data = await enquiryfollowupModel.aggregate([
        {
          $lookup: {
            from: "enquiryadds",
            localField: "EnquiryId",
            foreignField: "EnquiryId",
            as: "enquirydata",
          },
        },
      ]);

      if (data) {
        return res.json({ enquiryfollowup: data });
      }
    } catch (error) {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }

  async getcalllaterdata(req, res) {
    try {
      let data = await enquiryfollowupModel.aggregate([
        {
          $lookup: {
            from: "enquiryadds",
            localField: "EnquiryId",
            foreignField: "EnquiryId",
            as: "enquirydata",
          },
        },
      ]);

      const latestDataByEnquiryId = {};

      data.forEach((dataItem) => {
        const enquiryId = dataItem.EnquiryId;
        if (
          !latestDataByEnquiryId[enquiryId] ||
          dataItem.createdAt > latestDataByEnquiryId[enquiryId].createdAt
        ) {
          latestDataByEnquiryId[enquiryId] = dataItem;
        }
      });

      const latestCallLaterData = Object.values(latestDataByEnquiryId).filter(
        (item) => item.response === "Call Later"
      );

      return res.json({ enquiryfollowup: latestCallLaterData });
    } catch (error) {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }

  async getcalllaterandquotedata(req, res) {
    try {
      let data = await enquiryfollowupModel.aggregate([
        {
          $lookup: {
            from: "enquiryadds",
            localField: "EnquiryId",
            foreignField: "EnquiryId",
            as: "enquirydata",
          },
        },
      ]);

      const latestDataByEnquiryId = {};

      data.forEach((dataItem) => {
        const enquiryId = dataItem.EnquiryId;
        if (
          !latestDataByEnquiryId[enquiryId] ||
          dataItem.createdAt > latestDataByEnquiryId[enquiryId].createdAt
        ) {
          latestDataByEnquiryId[enquiryId] = dataItem;
        }
      });

      const latestEnquiries = Object.values(latestDataByEnquiryId).filter(
        (item) => item.response === "Call Later" || item.response === "Quote"
      );

      return res.json({ enquiryfollowup: latestEnquiries });
    } catch (error) {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }

  //Delete
  async deleteenquiryfollowup(req, res) {
    let id = req.params.id;
    const data = await enquiryfollowupModel.deleteOne({ _id: id });
    return res.json({ success: "Delete Successf" });
  }
}
const enquiryfollowupcontroller = new addenquiry();
module.exports = enquiryfollowupcontroller;
