import { db } from "../connect.js"
import bcrypt from "bcryptjs"

export const register = (req, res)=>{
//Check user if exist
const {name, password, email, role} = req.body
const q = "SELECT * FROM users WHERE email = ?"

db.query(q,[email], (err, data)=>{
    if(err) return res.status(500).json(err)
    if(data.length) return res.status(409).json("User already exists");

    //Create new User
   //hash password
   const salt = bcrypt.genSaltSync(10);
   const hashedPassword = bcrypt.hashSync(password, salt);

   const q = "INSERT INTO users (`name`, `email`, `password`, `role`) VALUE (?)";
   const values= [name,email,hashedPassword,role]
   db.query(q,[values], (err, data)=>{
    if(err) return res.status(500).json(err)
    return res.status(200).json('User has been created')
   })
    
})

}

export const login = (req, res)=>{

}
export const logout = (req, res)=>{

}
