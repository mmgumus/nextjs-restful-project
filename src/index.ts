import express from 'express';
import  http  from "http";
import bodyParse from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();

app.use(cors({
    credentials: true,
    }
));

app.use(compression());
app.use(cookieParser());
app.use(bodyParse.json());

const server = http.createServer(app);

server.listen(8080, () => {
    console.log('Server is running at http://localhost:8080');
});

const MONGO_URL = 'mongodb+srv://mahmut:mahmut321@cluster0.r7dml7x.mongodb.net/?retryWrites=true&w=majority'

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error',(error: Error) => console.log(error));