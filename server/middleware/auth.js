
const isAuthSession = async (req, res, next) => {
    if (!req.session.id && !req.session.token) {
        res.redirect('log/login')
    } else {
        next();
    }
};
module.exports = isAuthSession;