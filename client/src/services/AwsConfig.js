const bucket = process.env.REACT_APP_AWS_BUCKET
const user_key = process.env.REACT_APP_AWS_KEY
const aws_secret = process.env.REACT_APP_AWS_SECRET 

export const config = {
    bucketName : bucket,
    region: 'us-east-1',
    accessKeyId: user_key,
    secretAccessKey : aws_secret
}

