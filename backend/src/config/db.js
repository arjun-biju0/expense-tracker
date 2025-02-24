const dotenv=require('dotenv')
const {Pool}=require('pg')
dotenv.config()

const pool= new Pool({
    // host:process.env.HOST,
    // user:process.env.USER,
    // port:process.env.DB_PORT,
    // password:process.env.DB_PASSWORD,
    // database: process.env.DATABASE
    connectionString: process.env.NEON_URL,
    ssl: {
        rejectUnauthorized: false, // Required for Neon
        idleTimeoutMillis: 30000,  // Close idle connections after 30s
        connectionTimeoutMillis: 2000,
    },
})

pool.connect().then(()=> console.log("database successfully connected")
).catch((err)=>console.log(err))

module.exports= pool
