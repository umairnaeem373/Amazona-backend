import bcrypt from 'bcrypt'
const Users=[
    {
        name:"Admin",
        email: "admin@gmail.com",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: true,
    },
    {
        name: "M.Umair",
        email: "umairnaeem373@gmail.com",
        password: bcrypt.hashSync("605615", 10)
    },
    {
        name: "John Doe",
        email: "johndoe@yahoo.com" ,
        password : bcrypt.hashSync('123456', 10)
    }
]

export default Users