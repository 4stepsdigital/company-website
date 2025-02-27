import mongoose from "mongoose";
import  "./Why4StepS";
import  "./Benefits/Benefits";
import "./Faq/IndustryFaq";
import "./Product/InSolution";
import "./MasterService";
import "./Services/InSolution";
import "./solution/solution";
import "./success/success";
import "./SolutionOverview/ServiceOverview";
const ServiceHeroSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim:true,
    unique: true,
  },
  serviceName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  filename: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },

  // contentsummary: {
  //   type: String,
  //   required: true,
  // },
  serviceType: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"MasterService",
  },
  Why4StepS: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Why4StepService",
  },
  success: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ServiceSuccess",
  },
  solution: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ServiceSolution",
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ServiceProduct",
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ServiceService",
  },
  benefit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ServiceBenefits",
  },
  faq:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "ServiceFaq",
  },
  overview:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "ServiceOverview",
  },
});
const ServiceHero =
  mongoose.models.ServiceHero ||
  mongoose.model("ServiceHero", ServiceHeroSchema);

export default ServiceHero;
