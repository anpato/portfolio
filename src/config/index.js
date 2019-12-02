import 'dotenv/config'
export const db = () => {
  if (process.env.NODE_ENV === 'production') {
    return {
      name: 'Portfolio Production',
      connect: process.env.DATABASE_URI
    }
  } else {
    return {
      name: 'Portfolio Development',
      connect: process.env.DEVELOP_URI
    }
  }
}
