const express = require('express');
const empRoutes = express.Router();
const empModel = require('../models/emp')


empRoutes.route('/')
.get((req, res) => {
    res.send('Employees Page');
})
.post((req, res) => {
    
})

empRoutes.get('/employees', async (req, res) => {
    try {
        const employees = await empModel.find();

        if (employees.length === 0) {

            res.status(404).send("No employees found.");
        } else {
        
            res.status(200).json(employees);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while fetching employees.");
    }
})

empRoutes.post('/employees', async (req, res) => {
    try {
        const { first_name, last_name, email, gender, salary} = req.body;

        const newEmployee = new empModel({
            first_name,
            last_name,
            email,
            gender,
            salary
        });

        const validationError = newEmployee.validateSync();

        if (validationError) {
            return res.status(400).json(
                { 
                    "status": false,
                    "message": validationError.errors 
                }
                );
        }

        await newEmployee.save();

        res.status(201).json(newEmployee);
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while creating the employee.");
    }
})


empRoutes.get('/employees/:eid', async (req, res) => {
    const employeeId = req.params.eid;

    try {
 
        const employee = await empModel.findById(employeeId);

        if (!employee) {
     
            return res.status(404).send("Employee not found.");
        }


        res.status(200).json(employee);
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while fetching the employee.");
    }
})


empRoutes.put('/employees/:eid', async (req, res) => {
    const employeeId = req.params.eid;
    const updateData = req.body;

    try {
        const employee = await empModel.findById(employeeId);

        if (!employee) {
            return res.status(404).send("Employee not found.");
        }

        employee.set(updateData);

        const updatedEmployee = await employee.save();
        res.status(200).json(updatedEmployee);
    } catch (error) {
        console.error(error);
    }
})

empRoutes.delete('/employees', async (req, res) => {
    const employeeId = req.query.eid; 

    if (!employeeId) {
        return res.status(400).send("Missing 'eid' query parameter.");
    }

    try {
  
        const employee = await empModel.findById(employeeId);

        if (!employee) {
            return res.status(404).json(
                { 
                    "status": false,
                    "message": "Employee not found"
                }
            )
        }

        
        await employee.remove();

        res.status(204).send(); 
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while deleting the employee.");
    }
})




module.exports = empRoutes;