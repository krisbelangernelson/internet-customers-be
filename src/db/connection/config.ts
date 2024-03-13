export const host = process.env.DB_HOST
export const database = process.env.DB_DATABASE
export const port = process.env.DB_PORT !== undefined ? Number(process.env.DB_PORT) : 5432
export const user = process.env.DB_USER
export const password = process.env.DB_PASS
