module.exports = (req, res, next) => {
    res.locals.messageFailure = req.flash('error');
    res.locals.messageSuccess = req.flash('success');
    next();
}