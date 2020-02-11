module.exports = {
    pageNotFound: (req, res, next) => {
        let message = `Route ${req.url}: Not found.`;
        return res.status(404).send({ message: message });
    },
    internal: (err, req, res, next) => {
        return res.status(500).send({ error: err });
    }
}