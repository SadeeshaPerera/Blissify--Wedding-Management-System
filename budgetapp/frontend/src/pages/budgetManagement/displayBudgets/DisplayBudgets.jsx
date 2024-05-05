import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import { plus } from "../../../assets/budgetImages/budgetIcons";
import Button from "../../../components/Button/Button";
import "./displaybudgets.css";

const DisplayBudgets = () => {
  const [budget, setBudget] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/getAllBudgets"
        );
        setBudget(response.data);
      } catch (error) {
        console.error("Error fetching budgets:", error);
        // Handle error
      }
    };

    fetchData();
  }, []);

  const deleteBudget = async (budgetId) => {
    try {
      await axios.delete(`http://localhost:8000/api/deleteBudget/${budgetId}`);
      setBudget((prevBudget) =>
        prevBudget.filter((budget) => budget._id !== budgetId)
      );
      toast.success("Budget Deleted Successfully");
    } catch (error) {
      console.error("Error Deleting Budget:", error);
      toast.error("Error Deleting Budget");
    }
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const budgetsPerPage = 8; // 4 per row * 2 rows = 8
  const startIndex = (page - 1) * budgetsPerPage;
  const endIndex = Math.min(startIndex + budgetsPerPage, budget.length);
  const displayedBudgets = budget.slice(startIndex, endIndex);

  return (
    <div>
      <div className="submit-btn">
        <Link to={"/addBudget"} className="addButton">
          Add Budget
        </Link>
      </div>

      <div className="budget-cards">
        {displayedBudgets.map((budgetItem, index) => (
          <Link to={`/budget/${budgetItem._id}`} style={{ textDecoration: "none" }}>
          <Card key={index} sx={{ margin: "10px", backgroundColor: "#ede4fa" }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {budgetItem.eventID}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Groom's Name: {budgetItem.groomName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Bride's Name: {budgetItem.brideName}
              </Typography>
            </CardContent>
            <CardActions>
              <IconButton onClick={() => deleteBudget(budgetItem._id)}>
                <FaTrash />
              </IconButton>
              <Link to={`/updateBudget/${budgetItem._id}`} style={{ textDecoration: "none" }}>
                <IconButton>
                  <FaEdit />
                </IconButton>
              </Link>
            </CardActions>
          </Card>
          </Link>
        ))}
      </div>

      <Pagination
        count={Math.ceil(budget.length / budgetsPerPage)}
        page={page}
        onChange={handleChangePage}
        variant="outlined"
        shape="rounded"
        sx={{marginTop: "50px"}}
      />
    </div>
  );
};

export default DisplayBudgets;