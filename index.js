
import express from "express";
import {firebaseDB} from "./src/configs/firebase.js"
import { collection,addDoc,getDocs,deleteDoc,doc,updateDoc,getDoc } from "firebase/firestore";
import cors from "cors"
import bodyParser from "body-parser";
import { uuidv7 } from "uuidv7";

const app = express();
const PORT = 8000;

const corsOptions = {
    origin: '*',
}
  
app.use(cors(corsOptions));

app.use(bodyParser.json())




// added new task
app.post('/new-task', async (req, res) => {
    try {
      const { title, description, dueDate } = req.body;
  
      if (!title || !description || !dueDate) {
        return res.status(400).json({ error: 'Please fill out all fields' });
      }
  
      const taskData = {
        id:uuidv7(),
        title,
        description,
        dueDate: new Date(dueDate), // Assuming dueDate is a valid date string
      };
      const docRef = await addDoc(collection(firebaseDB, "Tasks"), {
        taskData
      });
      console.log('Document written with ID: ', docRef.id);
  
      res.status(201).json({ message: 'Task submitted successfully' });
    } catch (error) {
      console.error('Error adding document: ', error);
      res.status(500).json({ error: 'Failed to submit task. Please try again later.' });
    }
  });


  app.get('/tasks', async (req, res) => {
    try {
        const querySnapshot = await getDocs(collection(firebaseDB, "Tasks"));
        const tasks = [];
        
        querySnapshot.forEach((doc) => {
            tasks.push({
                id: doc.id,
                data: doc.data()
            });
        });

        res.status(200).json(tasks);
    } catch (error) {
        console.error('Error fetching tasks: ', error);
        res.status(500).json({ error: 'Failed to fetch tasks. Please try again later.' });
    }
});


app.delete('/delete-task', async (req, res) => {
    try {
        const { taskId } = req.body;
        const data = await deleteDoc(doc(firebaseDB, "Tasks", taskId));
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching tasks: ', error);
        res.status(500).json({ error: 'Failed to fetch tasks. Please try again later.' });
    }
});


app.patch('/update-task', async (req, res) => {
    try {
        const { taskId, title, description } = req.body;
        const updateData = {
            'taskData.title': title,
            'taskData.description': description,
            // 'taskData.dueDate': dueDate
        };

        console.log(taskId, updateData);

        // Validate required fields (taskId and updateData)
        if (!taskId || !title || !description ) {
            return res.status(400).json({ error: 'Missing required fields: taskId, title, description, and dueDate' });
        }

        // Perform the update using updateDoc
        const updatedTaskRef = doc(firebaseDB, "Tasks", taskId);
        await updateDoc(updatedTaskRef, updateData);

        // Fetch the updated task data for response (optional)
        const updatedTaskSnapshot = await getDoc(updatedTaskRef);
        const updatedTask = updatedTaskSnapshot.exists() ? updatedTaskSnapshot.data() : {};

        res.status(200).json({ message: 'Task updated successfully', updatedTask }); // Include updatedTask if desired
    } catch (error) {
        console.error('Error updating task: ', error);
        res.status(500).json({ error: 'Failed to update task. Please try again later.' });
    }
});









  app.listen(PORT, (error) => {
    if (!error) {
        console.log("Server is Successfully Running, and App is listening on port " + PORT);
    } else {
        console.log("Error occurred, server can't start", error);
    }
});