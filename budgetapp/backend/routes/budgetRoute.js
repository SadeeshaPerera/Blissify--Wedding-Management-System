import express from "express";
import { createBudget, getAllBudgets, getOneBudget, updateBudget, deleteBudget } from "../controllers/budgetController.js";
import { addIncome, getIncomes, deleteIncome } from "../controllers/budgetIncome.js";
import { addExpense, getExpenses, deleteExpense } from "../controllers/budgetExpense.js";


const route = express.Router();

route.post("/createBudget", createBudget);
route.get("/getAllBudgets", getAllBudgets);
route.get("/getOneBudget/:id", getOneBudget);
route.put("/updateBudget/:id", updateBudget);
route.delete("/deleteBudget/:id", deleteBudget);

route.post("/addIncome", addIncome);
route.get("/getIncomes", getIncomes);
route.delete("/deleteIncome/:id", deleteIncome);

route.post("/addExpense", addExpense);
route.get("/getExpenses", getExpenses);
route.delete("/deleteExpense/:id", deleteExpense);

route.delete("/updateTransaction", updateTransaction);

export default route;