const { User } = require("../Models/userModels/UserModels");


const verifyRole = (role) => {
    return async (req, res, next) => {
        const { email } = req
        try {
           
            const userInfo = await User.findOne({ email })
            
            if (role.toString() !== userInfo?.role?.toString()) {
                return res.status(401).json({ message: 'You are not authorized' })
            }
            req.isVerified = true
            next()
        } catch (error) {
            console.log(error);
        }
    }
};

module.exports = verifyRole;