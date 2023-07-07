import jwt from 'jsonwebtoken';
// wants to like a post 
// clcik tje like button=> auth middleware (next)
// => like controller
const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomeAuth = token.length < 500;
        // const googleAuth = token.length < 200
        const googleId = req.headers.authorization.split(" ")[2];

        let decodeData;
            try {
            if (token && isCustomeAuth) {
                decodeData = jwt.verify(token, 'test');
                req.userId = decodeData?.id;
            } else {
                decodeData = jwt.decode(token)
                req.userId = googleId
            }
        } catch (error) {
            decodeData = jwt.decode(token)
            req.userId = googleId;
        }


        next()
    } catch (error) {
        console.log(error)
    }
}

export default auth;