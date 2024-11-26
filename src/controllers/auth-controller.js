const users = require('../models/users');

module.exports = {
    index: (req, res) => {
        res.render('index');
    },

    register: (req, res) => {
        const { id, username, email } = req.body;

        const userAlreadyExists = users.find(user => user.username === username);
        const emailAlreadyExists = users.find(user => user.email === email);


        if (userAlreadyExists || emailAlreadyExists) return res.status(400).redirect('/');

        const newUser = { id, username, email, role: 'standard' }

        users.push(newUser);

        res.status(201).json(newUser).redirect('');
    }

}