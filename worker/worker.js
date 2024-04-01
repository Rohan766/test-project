const fs = require("fs");
const csvParser = require("csv-parser");
const connectDB = require("../config/db");
const User = require("../models/user");
const Agent = require("../models/agent");
const PolicyInfo = require("../models/policyInfo");
const PolicyCategory = require("../models/policyCategory");
const UserAccount = require("../models/userAccount");
const PolicyCarrier = require("../models/policyCarrier");
// const { Agent, User, UserAccount, PolicyCategory, PolicyCarrier, PolicyInfo } = require("../models/models")
// const {
//   Agent,
//   User,
//   UserAccount,
//   PolicyCategory,
//   PolicyCarrier,
//   PolicyInfo,
// } = require("../models"); // Import Mongoose models

// Connect to MongoDB
// Function to process CSV file
// Error inserting data: MongooseError: document must have an _id before saving

const processCSV = (filePath) => {
  try {
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on("data", async (rowData) => {
        try {
          // Create new documents for each data row
          console.log("rowData: ", rowData.AgentName);
          let existenceChecker = await User.findOne({ email: rowData.Email });
          if (!existenceChecker) {
            const existingAgent = await Agent.findOne({
              agentName: rowData.AgentName,
            });
            console.log("existingAgent:--->>>", existingAgent)
            if ((existingAgent===null) && rowData.AgentName) {
                console.log("rowData34: ", rowData.AgentName);
                const agent = new Agent({
                    agentName: rowData.AgentName
                  });
                  console.log("I am in Agent section: ", agent)
                  await agent.save();
            } 

            const user = new User({
              firstName: rowData.FirstName,
              dob: rowData.DOB,
              address: rowData.Address,
              phoneNumber: rowData.PhoneNumber,
              state: rowData.State,
              zipCode: rowData.ZipCode,
              email: rowData.Email,
              gender: rowData.Gender,
              userType: rowData.userType,
            });

            const policyCategory = new PolicyCategory({
              categoryName: rowData.CategoryName,
            });
            const policyCarrier = new PolicyCarrier({
              companyName: rowData.CompanyName,
            });

            //     policyNumber: { type: String, required: true },
            //     policyStartDate: { type: Date, required: true },
            //     policyEndDate: { type: Date, required: true },
            //     policyCategory: {
            //       type: mongoose.Schema.Types.ObjectId,
            //       ref: "PolicyCategory",
            //       default: 'defaultPolicyCategoryId'
            //     },
            //     companyId: {
            //       type: mongoose.Schema.Types.ObjectId,
            //       ref: "PolicyCarrier",
            //       default: 'defaultcompanyNameId' // Specify the default ObjectId here

            //     },
            //     userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
            //   });

            try {
              await policyCarrier.save();
              await user.save();
              const userAccount = new UserAccount({
                _id: await User.findOne({ email: rowData.Email }).select("_id"),
                accountName: rowData.AccountName,
              });
              await userAccount.save();
              const policyInfo = new PolicyInfo({
                policyNumber: rowData.PolicyNumber,
                policyStartDate: rowData.PolicyStartDate,
                policyEndDate: rowData.PolicyEndDate,
                collectionId: rowData.CollectionId,
                policyCategory: rowData.PolicyCategory, //CategoryName
                companyId: await PolicyCarrier.findOne({
                  companyName: rowData.CompanyName,
                }).select("_id"),
                userId: await User.findOne({ email: rowData.Email }).select(
                  "_id"
                ),
              });

              console.log("policyInfo==>>", policyInfo);

              await policyCategory.save();
              await policyInfo.save();
            } catch (error) {
              console.log("error: ", error);
            }

            console.log("Data inserted successfully:", rowData);
          }
        } catch (err) {
          console.error("Error inserting data:", err);
        }
      })
      .on("end", () => {
        console.log("CSV processing completed");
      })
      .on("error", (err) => {
        console.error("Error processing CSV:", err);
      });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { processCSV };
