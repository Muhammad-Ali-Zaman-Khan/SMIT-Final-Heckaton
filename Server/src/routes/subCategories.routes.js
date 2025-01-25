import express from "express";
import { deleteSubcategory, updateSubcategory, getSingleSubcategory, getAllSubcategories, createSubcategory} from "../controllers/subCategory.controllers.js";



const router = express.Router();

router.post("/createsubcategory", createSubcategory);
router.get("/getallsubcategory", getAllSubcategories);
router.get("/getsinglesubcategory/:id", getSingleSubcategory);
router.put("/editsubcategory/:id", updateSubcategory);
router.delete("/deletesubcategory/:id", deleteSubcategory);


export default router;