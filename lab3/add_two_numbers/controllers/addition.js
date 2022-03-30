module.exports.addTwoNumbers = (req, res) => {
    const firstNumber = parseInt(req.params.firstNumber);
    let sum = firstNumber;

    if (req.query && req.query.number) {
        const secondNumber = parseInt(req.query.number);
        sum += secondNumber;
    }
    res.status(200).send(sum + "");
};
