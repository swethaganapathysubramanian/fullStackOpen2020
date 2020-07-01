

import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!!');
});

app.get('/bmi', (req, res) => {
    
    const height = req.query.height;
    const weight = req.query.weight;
    if ( !height && !weight ){
        res.send({
            error: "malformatted parameters"
        });
    }    
    if(isNaN(Number(height)) || isNaN(Number(weight))){
        res.send({
            error: "malformatted parameters"
        });
    }
   const result = calculateBmi( Number(height) , Number(weight));

    res.send({
        weight: weight,
        height:height,
        bmi: result
    });
});

app.post('/exercise', (req, res) => {
    console.log(req.body)
    const dailyEx = req.body.daily_exercises;
    const target = req.body.target;
    const result = calculateExercises( target, dailyEx);
    res.send({result})
})


const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});