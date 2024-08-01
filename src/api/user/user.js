// The User class is responsible for retrieving user data from Amazon
class AmazonUser {
  constructor(httpContext) {
    this.httpContext = httpContext;
		this.id = initializedUserId();
  };

	initializedUserId() {
    const parameters = this.httpContext.getPathParameters();
    let userId = String(parameters.userId); // keep userId as String
	};
	// handleServiceResponse ensures the request is in a try/catch
	getUser = async (req, res) => {
    userId = req.params.id;
    const serviceResponse = await userService.findById(id);
		// Use logger so we don't leak logs in production and have better control
		// over log levels (better performance).
		logger(`The user with id ${id} was found and here is the response: ${serviceResponse}`);
    return handleServiceResponse(serviceResponse, res);
  };

	 // this returns a promise TODO: Part of this could be abstracted into a
	 // helper to more gracefully handle errors and the endpoint domain.
  callHttpEndpoint = (`https://amazon.com/user/${user}`).then((result) => {
  	const response = result;
    let name = response.name;
    let is = response.id;
    let lastLoginData = response.lastLoginDate;
    let accountType = response.accountType;  // could be admin, freeUser, or paidUser
   
    this.httpContext.ok(result, 200, DEFAULT_HEADERS);
    });
	};
}

export const userService = new UserService();
