const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const PORT=9999;
mongoose
  .connect( 
    "mongodb+srv://sandeep:sandeep@cluster0.3khlfl5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  )
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
  });

app.use(express.json());
app.use(cors());
const UserSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    roll: {
      type: String, 
      required: true,
    },
    college: {
      type: String, 
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    }, 
    role:{
      type:String,
      required:true
    }
  });
  
  
  const UserModel = mongoose.model("users", UserSchema);

  const FormSchema =new mongoose.Schema(
    {
      name:{
        type:String,
        required:true
      },
      email:{
        type:String,
        required:true
      },
      phone:{
        type:Number,
        required:true
      },
      roll:{
        type:String,
        required:true
      },
      phone:{
        type:String,
        required:true
      },
      CourseName:{
        type:String,
        required:true
      },
      College:{
        type:String,
        required:true
      },
    }
    , {
      timestamps: true // Add timestamps option
  }
  )
  const FormModel = mongoose.model("form",FormSchema)

  const CourseSchema = new mongoose.Schema({
    name:{
      type:String,
      required:true
    },
    image:{
      type:String,
      required:true
    },
    description:{
      type:String,
      required:true
    }
  })
  const CourseModel = mongoose.model("course",CourseSchema)

  //course registration
  app.post('/courses', async (req, res) => {
    try {
      const { name, image, description } = req.body;
      const newCourse = new CourseModel({ name, image, description });
      await newCourse.save();
      res.status(201).json(newCourse);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  //course details
  app.get('/course-details', async (req, res) => {
    try {
      const courses = await CourseModel.find({});
      res.json(courses);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

  // Delete a course by ID
  app.delete('/courses/:id', async (req, res) => {
    try {
      const deletedCourse = await CourseModel.findByIdAndDelete(req.params.id);
      if (!deletedCourse) {
        return res.status(404).json({ error: 'Course not found' });
      }
      res.status(200).json(deletedCourse);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post('/course-register', async (req, res) => {
    try {
      const { name, roll, College, email, phone, CourseName } = req.body;
  
      // Check if the email already exists
     
    
      // Hash the password
  
      // Create a new user
      const newForm = new FormModel({
        name,
        roll,
        College,
        email,
        phone,
        CourseName,
       
      });
      // Save the user
      await newForm.save();
      res.status(201).json({ message: 'Registered successfully' });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });


//



  app.get('/every-detail', async (req, res) => {
    try {
        const users = await UserModel.find({}); // Retrieve all users
        if (users.length > 0) { // Check if any users found
            return res.status(200).json(users); // Return the users
        } else {
            return res.status(404).json({ message: 'No users found' }); // Return a 404 status with an appropriate message
        }
    } catch (error) {
        console.error('Error fetching every detail:', error);
        return res.status(500).json({ message: 'Internal Server Error' }); // Return a 500 status if there's an error
    }
});
app.get('/form-details', async (req, res) => {
  try {
      const forms = await FormModel.find({}); // Retrieve all users
      if (forms.length > 0) { // Check if any users found
          return res.status(200).json(forms); // Return the users
      } else {
          return res.status(404).json({ message: 'No users found' }); // Return a 404 status with an appropriate message
      }
  } catch (error) {
      console.error('Error fetching every detail:', error);
      return res.status(500).json({ message: 'Internal Server Error' }); // Return a 500 status if there's an error
  }
});


  app.post('/register', async (req, res) => {
    try {
      const { name, roll, college, email, phone, password } = req.body;
  
      // Check if the email already exists
      const existingUser = await UserModel.findOne({ email });
      const existingNumber = await UserModel.findOne({ phone });
      const existingRoll = await UserModel.findOne({ roll });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
      }
      else if (existingNumber) {
        return res.status(400).json({ message: 'Mobile Number already exists' });
      }
      else if (existingRoll) {
        return res.status(400).json({ message: 'Roll number already exists' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user
      const newUser = new UserModel({
        name,
        roll,
        college,
        email,
        phone,
        password: hashedPassword, // Store hashed password
        role:'user'
      });
      // Save the user
      await newUser.save();
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  app.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if the user with the provided email exists
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      // Check if the provided password matches the stored hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      // If email and password are correct, you can consider the user logged in
      // You can generate a token or set a session here if you're using authentication
  
      res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
  app.post('/details', async (req, res) => {
    try {
        const userId = req.body.userId; // Access userId from the request body        
        const user = await UserModel.findById(userId); // Find the user by ID
        // Check if the user exists
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        // Send the found user as a JSON res  ponse
        res.status(200).json(user);
    } catch (error) {
        console.error('Error occurred:', error); // Log the error
        // If an error occurs, send an error response
        res.status(500).json({ error: 'Internal server error' });
    }
});
  app.post('/admin-details', async (req, res) => {
    try {
        const userId = req.body.userId; // Access userId from the request body        
        const user = await UserModel.findById(userId); // Find the user by ID
        // Check if the user exists
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        // Send the found user as a JSON res  ponse
        res.status(200).json(user.role);
    } catch (error) {
        console.error('Error occurred:', error); // Log the error
        // If an error occurs, send an error response
        res.status(500).json({ error: 'Internal server error' });
    }
});


  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });