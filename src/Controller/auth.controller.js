const { signUp, signIn, checkCookie } = require('../Service/user.service');

const signup = async (req, res) => {
    const mobile = req.body.mobile;
    const password = req.body.password;
    const name = req.body.name;
    const email = req.body.email;
    if (!(mobile && password && name && email)) {
        res.status(200).json({
            status: false,
            error: 'mobile or password or name or email is missing'
        })
        return;
    }
    const userCreation = await signUp(mobile, password, email, name);
    res.status(201).json({
        ...userCreation
    })
    return;
}

const signin = async (req, res) => {
    const mobile = req.body.mobile;
    const password = req.body.password;

    const getUser = await signIn(mobile, password);
    if (getUser.status) {
        res.cookie('authToken', getUser.authToken, { maxAge: 3600000 });
        res.status(200).json({
            ...getUser
        });
        return;
    }
    res.status(401).json({
        ...getUser
    });
    return;
    
}

const validateUser = async (req, res) => {
    const userId = res.locals.userId;

    const getUser = await checkCookie(userId);
    if (getUser.status) {
        res.cookie('authToken', getUser.authToken, { maxAge: 3600000 });
        res.status(200).json({
            ...getUser
        });
        return;
    }
    res.status(401).json({
        ...getUser
    });
    return;
    
}

module.exports = {
    signin,
    signup,
    validateUser
}