const moment = require('moment');
const User = require('../models/userModel');

const updateAges = async () => {
    try {
        const currentDate = moment().format('MM-DD');
        const search = new RegExp(`-(${currentDate})`);
        console.log('currectDate: ', currentDate);
        console.log('search: ', search);

        await User.updateMany({ dob: { $regex: search } }, { $inc: { age : 1 } });
        console.log('User ages updated successfully.');
        } catch (error) {
      console.error('Error updating user ages:', error.message);
    }
};

module.exports = updateAges;