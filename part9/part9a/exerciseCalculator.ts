interface ResultObj {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

interface inputList {
    target: number;
    input: Array<number>;
}

const parseArguments = (args: Array<string>): inputList  =>  {
    if (args.length < 10) throw new Error('Not enough arguments');
    if (args.length > 10) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3])) && !isNaN(Number(args[4])) && !isNaN(Number(args[5])) && !isNaN(Number(args[6])) && !isNaN(Number(args[7])) && !isNaN(Number(args[8])) && !isNaN(Number(args[9]))) {
        return {
            target: Number(args[2]),
            input: [Number(args[3]), Number(args[4]), Number(args[5]), Number(args[6]), Number(args[7]), Number(args[8]), Number(args[9])]
        };
    } else {
        throw new Error('Provided values were not numbers!');
    }
};


export const calculateExercises = (target: number, everyday: Array<number>): ResultObj => {
    const periodLength =  everyday.length;
    const trainingDays = everyday.reduce((val, day) =>{ 
        val = day > 0 ? val+1 : val;
        return val;
        } 
        , 0 );
    const total = everyday.reduce((day,val)=>{
        return day+val;
    },0); 
    const average = total/periodLength;
    const success = average >= target ? true : false;
    let rating = Math.floor((average / target) * 3);
    let ratingDescription;
    if( rating === 0 || rating ===1){
        rating = 1;
        ratingDescription = 'Try to be Better';
    } else if ( rating === 2){
        ratingDescription = 'not too bad but could be better';
    } else {
        ratingDescription = 'Wow Great';
    }
    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    };
};
//const { target, input } = parseArguments(process.argv);
//console.log(calculateExercises(target, input));
//console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1],2))