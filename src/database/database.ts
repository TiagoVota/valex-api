import pg, { PoolConfig } from 'pg'


const { Pool } = pg

const {
	DB_HOST,
	DB_PORT,
	DB_USER,
	DB_NAME,
	DB_PASS,
} = process.env

const devConfig: PoolConfig = {
	host: DB_HOST,
	port: Number(DB_PORT),
	user: DB_USER,
	database: DB_NAME,
	password: DB_PASS
}

const databaseConfig = devConfig

const connection = new Pool({
	connectionString: process.env.DATABASE_URL,
})


export default connection
