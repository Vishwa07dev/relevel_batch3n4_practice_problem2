
const filterUserResponse = (userObj) => {
 
  const { name, email, userId, userType, userStatus, createdAt, updatedAt } =
    userObj;
  //return an object of the same extracted properties
  const returnedUserObject = {
    name,
    email,
    userId,
    userType,
    userStatus,
    createdAt,
    updatedAt,
  };
  return returnedUserObject;
};


const filterUserSetResponse = (users) => {
    userResult =[];

    //if(users.length)
    users.forEach(user => {
        userResult.push({
            name : user.name,
            userid :user.userId,
            email : user.email,
            userTypes : user.userType,
            userStatus : user.userStatus
        });
    });
  return userResult;
};

module.exports = {
  filterUserResponse,
  filterUserSetResponse,
};