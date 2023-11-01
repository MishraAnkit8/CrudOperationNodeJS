# model 
const { pgPool } = require('../../config/db.config');

module.exports .fetchAll = async ()=>{
    return pgPool.query(` SELECT id,name, email_id, phone_number, date_of_birth FROM  cruddb ; `);
}

// module.exports.createTask =  (tableId)=>{
//     const sql = {
//         text : ' INSERT INTO cruddb (name, email_id, phone_number, date_of_birth) VALUES ($1, $2, $3, $4) RETURNING id ' ,
//         values :  [tableId]
//     } ;

//     console.log('SQL object:', sql.text);
//     console.log('Table  ID:', sql.values[0]);

//     return pgPool.query(sql);

// }
module.exports.userTask = (data) => {
    console.log("Big DATA is>>>>>", data);
}

##controller 

const curdModel = require('../models/models');

module.exports.renderData = async (req, res, next) => {
    const data = await curdModel.fetchAll();
    console.log(' before rendering the template >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',data.rows)
    res.render('template', {
        taskList: data.rows
    });
    console.log(' after render the template >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',data.rows)
   
}

module.exports.insertTask = (req, res) => {
    let myData = curdModel.userTask(req.body);
    res.status(200).json({
        status:"Doneeee"
    })
}

// module.exports.createTask = async (req, res, next) => {
            

        // try {
        //     const { name, email_id, phone_number, date_of_birth } = req.body;
    
        //     // Create a new task using the TaskModel
        //     const newTask = await curdModel.create({
        //         name,
        //         email_id, 
        //         phone_number,
        //         date_of_birth
        //     });
    
        //     if (newTask) {
        //         console.log('New task created:', newTask);
        //         res.status(201).json({ status: 'done', task: newTask });
        //     } else {
        //         console.error('Failed to add the task');
        //         res.status(500).json({ status: 'error', message: 'Failed to add the task' });
        //     }
        // } catch (error) {
        //     console.error('Error creating task:', error);
        //     res.status(500).json({ status: 'error', message: 'An error occurred while adding the task' });
        // }
    // };








# router 
 const curdModel = require('../models/models');

module.exports.renderData = async (req, res, next) => {
    const data = await curdModel.fetchAll();
    console.log(' before rendering the template >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',data.rows)
    res.render('template', {
        taskList: data.rows
    });
    console.log(' after render the template >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',data.rows)
   
}

module.exports.insertTask = (req, res) => {
    let myData = curdModel.userTask(req.body);
    res.status(200).json({
        status:"Doneeee"
    })
}

// module.exports.createTask = async (req, res, next) => {
            

        // try {
        //     const { name, email_id, phone_number, date_of_birth } = req.body;
    
        //     // Create a new task using the TaskModel
        //     const newTask = await curdModel.create({
        //         name,
        //         email_id, 
        //         phone_number,
        //         date_of_birth
        //     });
    
        //     if (newTask) {
        //         console.log('New task created:', newTask);
        //         res.status(201).json({ status: 'done', task: newTask });
        //     } else {
        //         console.error('Failed to add the task');
        //         res.status(500).json({ status: 'error', message: 'Failed to add the task' });
        //     }
        // } catch (error) {
        //     console.error('Error creating task:', error);
        //     res.status(500).json({ status: 'error', message: 'An error occurred while adding the task' });
        // }
    // };








# ejs template

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CRUD Table</title>
</head>
<body>
    <h3>Add Data to the Table:</h3>
    <input type="text" placeholder="Name" id="name"><br>
    <input type="text" placeholder="Email" id="email"><br>
    <input type="text" placeholder="Phone" id="phone"><br>
    <input type="text" placeholder="DOB" id="dob"><br><br>
    <button id="addBtn">Add Data</button>

    <h3>Data Table:</h3>
    <table id="task-list" border="2">
        <thead>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>DOB</th>
            <th>Action</th>
        </thead>
        <% taskList.forEach(function(task) { %>
            <tr>
                <td><%- task.id %></td>
                <td><%- task.name %></td>
                <td><%- task.email_id %></td>
                <td><%- task.phone_number %></td>
                <td><%- task.date_of_birth %></td>
                <td>
                    <button class="delete" data-id="<%- task.id %>">Delete</button>
                    <button class="edit" data-id="<%- task.id %>">Edit</button>
                </td>
            </tr>
        <% }); %>
    </table>

    <script>
        var addBtn = document.getElementById('addBtn');
        var taskList = document.querySelector('#task-list');

      
        addBtn.addEventListener("click", () => {
            let name = document.getElementById('name').value;
            let email = document.getElementById('email').value;
            let phone = document.getElementById('phone').value;
            let dob = document.getElementById('dob').value;

            const task = {
                name:name,
                email:email,
                phone:phone,
                dob:dob
            }
            console.log("Task>>>>>>>>>", task);
            fetch("/insertData",{
                method:"POST",
                headers:{"Content-Type": "application/json"},
                body:JSON.stringify(task)
            }).then((result) => {
                return result.json();
            }).then((data) => {
                console.log("DATA>>>>>>>>>>>>>>",data);
            }).catch((err) => {
                console.log("Error>>>>>>>>>>>");
            })
        })

        
        //addBtn.addEventListener("click", function () {
        //     // Get data from input fields
        //    var name = nameInput.value;
        //     console.log(name);
        //     var email = emailInput.value;
        //      console.log(email);
        //     var phone = phoneInput.value;
        //     console.log(phone);
        //     var dob = dobInput.value;
        //     console.log(dob);

            //create a object
            // const task = {
            //     name:nameInput,
            //     email:emailInput,
            //     phone:phoneInput,
            //     dob:dobInput
            // }

            //write a api
            

        //     // Send a request to add data to the table
        //     fetch('/create-task', {
        //         method: 'post',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify(task)
               
        //     })
        //     .then(result => result.json())
        //     .then(data => {
        //         if (data.status === 'done') {
        //             // Append the new data to the table without refreshing
        //             var newRow = document.createElement('tr');
        //             newRow.innerHTML = `
        //                 <td>${data.id}</td>
        //                 <td>${name}</td>
        //                 <td>${email}</td>
        //                 <td>${phone}</td>
        //                 <td>${dob}</td>
        //                 <td>
        //                     <button class="delete" data-id="${data.id}">Delete</button>
        //                     <button class="edit" data-id="${data.id}">Edit</button>
        //                 </td>
        //             `;
        //             tableData.appendChild(newRow);

        //             // Clear input fields
        //             nameInput.value = '';
        //             emailInput.value = '';
        //             phoneInput.value = '';
        //             dobInput.value = '';
        //         } else {
        //             alert('Failed to add data to the table.');
        //         }
        //     });
        //  });

        

    </script>
</body>
</html>


#server.js


 
const express = require('express');
require('dotenv').config();

const myRouter = require('./src/router/router');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use(myRouter);


app.listen(process.env.APP_PORT, () => {
    console.log(`Server started at port ${process.env.APP_PORT}`);
})
