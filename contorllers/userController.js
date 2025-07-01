const User = require("../models/userModel")
const bcrypt = require("bcrypt")

//get Users

const getUsers = async () => {

    try {
        const users = await User.find();
        return users;
    } catch (error) {
        throw error;
    }

}

// Create Users
const postUser = async (userData) => {

    console.log()
    try {
      // userData = req.body
      // userData.password = req.body.password
      const userPassword = userData.password
  
      // generate salt
      const salt = await bcrypt.genSalt(10)
  
      // encrypt the password with our hash function + salt
      const hashedPassword =  await bcrypt.hash(userPassword, salt)

      console.log(hashedPassword);

      const secureUserData = {
        username: userData.username,
        password: hashedPassword
      }
  
      const newUser = await User.create(secureUserData);
      return newUser;
    } catch (error) {
      throw error;
    }
};

const loginUser = async (userData) => {
    try {
        const incomingUsername = userData.username
        const incomingPassword = userData.password
        // check if the user exists, and if they do, grab their password
        // search all users for the username incomingUsername
        // findOne so we don't get an array of data back, find gives an array by default even if we only have 1 user
        const user = await User.findOne({ username: incomingUsername })

        if(!user) {
            throw "User not found"
        }

        const isCorrectPassword = await bcrypt.compare(incomingPassword, user.password)

        return isCorrectPassword
        
    } catch (error) {
        
    }

    
}  

/*
need username, oldpassword, newpassword
*/
const updatePassword = async (userData) => {

    console.log("testput")
    try {
        const incomingUsername = userData.username;
        const incomingOldPassword = userData.oldPassword;
        const incomingNewPassword = userData.newPassword;

        // find user whose username = incomingUsername from request body
        const user = await User.findOne({ username: incomingUsername });

        if(!user) {
            throw "User not found"
        }

        // make sure old password is correct
        const isCorrectPassword = await bcrypt.compare(incomingOldPassword, user.password)

        // check to see that newpassword is DIFFERENT than old password!
        const isSamePassword = await bcrypt.compare(incomingNewPassword, user.password)

        if(isSamePassword) {
            throw "New password cannot be the same as current password!"
        } else if (isCorrectPassword && !isSamePassword) {
            const salt = await bcrypt.genSalt(10)

            const newHashedPassword = await bcrypt.hash(incomingNewPassword, salt)

            const updatedUser = {
               username: user.username,
               password: newHashedPassword
            }

            await User.updateOne(
                { username: user.username }, // find data to update
                { $set: updatedUser } // update old data with new data
            )

            return "Password successfully updated";
        } else if (!isCorrectPassword) {
            throw "incorrect password: please try again"
        }

    } catch (error) {
        throw error
    }
}

module.exports = {
    postUser,
    getUsers, 
    loginUser,
    updatePassword
  };

