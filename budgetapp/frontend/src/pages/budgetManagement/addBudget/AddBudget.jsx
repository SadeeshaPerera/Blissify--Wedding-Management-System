import React, { useState } from "react";
import "./addbudget.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import TextField from "@mui/material/TextField";
import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";

const AddBudget = () => {
  const budgets = {
    eventID: "",
    groomName: "",
    brideName: "",
    packages: "",
    estimatedBudget: "",
    additionalNotes: "",
  };

  const [budget, setBudget] = useState(budgets);
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setBudget({ ...budget, [name]: value });
  };

  const handleChange = (name) => (e) => {
    setState({
      ...state,
      [name]: e.target.checked,
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:8000/api/createBudget", budget)
      .then((response) => {
        toast.success(response.data.msg, { position: "top-right" });
        navigate("/displayBudgets");
      })
      .catch((error) => console.log(error));
  };

  const [state, setState] = useState({
    Venue: false,
    Catering: false,
    Photography: false,
    Outfit: false,
    Decorations: false,
    Transport: false,
  });

  const { Venue, Catering, Photography, Outfit, Decorations, Transport } =
    state;
  const error =
    [Venue, Catering, Photography, Outfit, Decorations, Transport].filter(
      (v) => v
    ).length !== 2;

  const packages = [
    {
      value: "Customized",
      label: "Customized Package",
    },
    {
      value: "Gold",
      label: "Gold Package",
    },
    {
      value: "Silver",
      label: "Silver Package",
    },
    {
      value: "Bronze",
      label: "Bronze Package",
    },
    {
      value: "Summer",
      label: "Summer Love Package",
    },
    {
      value: "Spring",
      label: "Spring Blossom Package",
    },
  ];

  return (
    <div className="addBudget">
      <Link to={"/displayBudgets"}>Back</Link>
      <h2>Add New Budget</h2>

      <form className="addBudgetForm" onSubmit={submitForm}>
        <div
          className="inputGroup"
          style={{ display: "flex", flexDirection: "row", columnGap: "10px" }}
        >
          {/* <label htmlFor='eventID'>Event ID</label>
                <input type='text' onChange={inputHandler} id='eventID' name='eventID' autoComplete='off' placeholder='Event ID'/> */}
          <TextField
            required
            id="eventID"
            label="Event Name/ID"
            onChange={inputHandler}
          />

          <TextField
            id="groomName"
            label="Groom's Name"
            // defaultValue="Groom" // NAME eka auto enna hdnna one
            // InputProps={{
            //   readOnly: true,
            // }}
          />
          <TextField
            id="brideName"
            label="Bride's Name"
            // defaultValue="Bride" // NAME eka auto enna hdnna one
            // InputProps={{
            //   readOnly: true,
            // }}
          />
        </div>

        <div className="inputGroup">
          <FormLabel component="legend">Vendor Services</FormLabel>
          <FormGroup
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1px",
            }}
          >
            <FormControlLabel
              sx={{ width: "auto" }}
              control={
                <Checkbox
                  checked={Venue}
                  onChange={handleChange("Venue")}
                  name="Venue"
                />
              }
              label="Venue"
            />
            <FormControlLabel
              sx={{ width: "auto" }}
              control={
                <Checkbox
                  checked={Catering}
                  onChange={handleChange("Catering")}
                  name="Catering"
                />
              }
              label="Catering"
            />
            <FormControlLabel
              sx={{ width: "auto" }}
              control={
                <Checkbox
                  checked={Photography}
                  onChange={handleChange("Photography")}
                  name="Photography"
                />
              }
              label="Photography"
            />
            <FormControlLabel
              sx={{ width: "auto" }}
              control={
                <Checkbox
                  checked={Outfit}
                  onChange={handleChange("Outfit")}
                  name="Outfit"
                />
              }
              label="Outfit"
            />
            <FormControlLabel
              sx={{ width: "auto" }}
              control={
                <Checkbox
                  checked={Decorations}
                  onChange={handleChange("Decorations")}
                  name="Decorations"
                />
              }
              label="Decorations"
            />
            <FormControlLabel
              sx={{ width: "auto" }}
              control={
                <Checkbox
                  checked={Transport}
                  onChange={handleChange("Transport")}
                  name="Transport"
                />
              }
              label="Transport"
            />
          </FormGroup>
        </div>

        <div className="inputGroup" style={{marginLeft: '20px'}}>
  <div className="flexContainer">
    <div>
      <TextField
        id="packages"
        select
        label="Packages"
        defaultValue={packages[0].value}
        onChange={inputHandler}
      >
        {packages.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </div>

    <div>
      <FormControl>
        <InputLabel htmlFor="outlined-adornment-amount">Estimated Budget</InputLabel>
        <OutlinedInput
          id="estimatedBudget"
          startAdornment={<InputAdornment position="start">LKR</InputAdornment>}
          label="Amount"
          onChange={inputHandler}
        />
      </FormControl>
    </div>
  </div>
</div>


        <div className="inputGroup">
          <TextField
            id="additionalNotes"
            label="Additional Notes"
            multiline
            rows={4}
            fullWidth
          />
        </div>

        <div className="inputGroup">
          <button className="submit">ADD BUDGET</button>
        </div>
      </form>
    </div>
  );
};

export default AddBudget;