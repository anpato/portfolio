import 'dotenv/config'
export const db = () => {
  if (process.env.NODE_ENV === 'production') {
    return {
      name: 'Portfolio Production',
      connection: process.env.DATABASE_URI
    }
  } else {
    return {
      name: 'Portfolio Development',
      connection: process.env.DEVELOP_URI
    }
  }
}
