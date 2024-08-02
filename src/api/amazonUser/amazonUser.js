import logger from '@/common/utils/logger';
import { env } from '@/common/utils/envConfig';

// The User class is responsible for retrieving user data from Amazon
// TODO: Convert this to typescript especially if sending to external APIs.
class amazonUser {
  constructor(httpContext) {
    this.httpContext = httpContext;
    const parameters = this.httpContext.getPathParameters();
    // Defaulting to a string can be problematic if dependent operations expect
    // a true value. Null may be a better default but I'd defer to the team.
    this.id = parameters?.userId ? String(parameters.userId) : '';
  }

  // handleServiceResponse ensures the request is in a try/catch
  async getUser(req, res) {
    const userId = req.params.id;
    const serviceResponse = await this.findById(userId);
    // Use logger so we don't leak logs in production and have better control over log levels (better performance).
    logger(
      `The user with id ${userId} was found and here is the response: ${serviceResponse}`
    );
    return handleServiceResponse(serviceResponse, res);
  }

  // this returns a promise TODO: Part of this could be abstracted into a helper to more gracefully handle errors and the endpoint domain.
  async fetchUserDataFromAmazon(user) {
    try {
      const { SERVICE_AMAZON_URL } = env;
      const response = await fetch(`${SERVICE_AMAZON_URL}/${user}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      const { accountType, id, name, lastLoginDate } = result;
      // TODO: Install aws-sdk and properly connect to amazon to retrieve the
      // user data.  Implemented helmet to remedy no value for DEFAULT_HEADERS.
      // Read more about helmet and if this is the best approach.
      this.httpContext.ok(result, 200);
      return result;
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw new Error('Failed to retrieve user data');
    }
  }
}

export default amazonUser;
