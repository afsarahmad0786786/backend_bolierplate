const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const auth = require("../services/authentication");
const Employee = require("../model/Employee");

router.get("/get", auth, async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    console.error("Error fetching employees :", error);
    res.status(500).json({ error: "Failed to fetch employees " });
  }
});

router.post("/add", auth, async (req, res) => {
  try {
    const newEmployee = new Employee(req.body);
    await newEmployee.save();
    res.json(newEmployee);
  } catch (error) {
    console.error("Error creating a new employee:", error);
    res.status(500).json({ error: "Failed to create a new employee" });
  }
});

router.put("/update/:id", auth, async (req, res) => {
  try {
    const employeeId = req.params.id;
    const updatedData = req.body;
    const updatedEmployee = await Employee.findByIdAndUpdate(
      employeeId,
      updatedData,
      {
        new: true,
      }
    );
    if (updatedEmployee) {
      res.json(updatedEmployee);
    } else {
      res.status(404).json({ error: "Employee not found" });
    }
  } catch (error) {
    console.error("Error updating a employee:", error);
  }
});

router.delete("/delete/:id", auth, async (req, res) => {
  try {
    const employeeId = req.params.id;
    const result = await Employee.findByIdAndDelete(employeeId);
    if (result) {
      res.json({ message: "Employee deleted successfully" });
    } else {
      res.status(404).json({ error: "Employee not found" });
    }
  } catch (error) {
    console.error("Error deleting a employee:", error);
    res.status(500).json({ error: "Failed to delete a employee" });
  }
});

module.exports = router;
