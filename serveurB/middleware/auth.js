import jwt from 'jsonwebtoken';

const auth = async(req, res, next) => {
    try{

        const token = req.headers.authorization.split(' ')[1];
        const isCusoumAuth = token.length < 500;

        let decodedData; 
        if(token && isCusoumAuth){
            decodedData = jwt.verify(token, 'test');

            req.userId = decodedData.id;
        }else {
            decodedData = jwt.decode(token);
            req.userId = decodedData.sub;
        }

        next();
    }catch (err){
        console.log(err);
    }
}

export default auth;