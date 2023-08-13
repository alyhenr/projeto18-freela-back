export default schema => (
    (req, res, next) => {
        const data = req.body;
        const validation = schema(data);

        if (validation.error) {
            const errors = validation.error.details.map(detail => detail.message);
            return res.status(422).send(errors);
        }

        next();
    }
);