// server.js
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Remplace par tes informations
const transporter = nodemailer.createTransport({
    service: 'gmail', // ou 'smtp.example.com'
    auth: {
        user: 'jimmyramsamynaick@gmail.com',
        pass: 'ukkidcsqlhpzketz '
    }
});

app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    const mailOptions = {
        from: email,
        to: 'jimmyramsamynaick@gmail.com', // L’adresse où tu veux recevoir les messages
        subject: `Message de ${name}`,
        text: `Nom: ${name}\nEmail: ${email}\nMessage:\n${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('Erreur lors de l’envoi du message');
        } else {
            console.log('Email envoyé : ' + info.response);
            res.status(200).send('Message envoyé');
        }
    });
});

app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
