const express = require('express');
const router = express.Router();
const { userModule } = require('../connection/connection');

router.post('/', async (req, res) => {
    const { email, verificationCode } = req.body;

    try {
        const user = await userModule.findOne({ email });

        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        if (user.verificationCode === verificationCode) {
            user.isVerified = true;
            user.verificationCode = null; 
            await user.save();

            res.send({ message: 'Email verified successfully' });
        } else {
            res.status(400).send({ message: 'Invalid verification code' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error verifying email' });
    }
});

module.exports = router;
