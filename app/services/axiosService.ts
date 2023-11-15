import { makeAuthenticatedRequest } from "@/utils/stravaUtils";

export const getAthleteInfo = async (): Promise<any> => {
  try {
    const response = await makeAuthenticatedRequest({
      method: "get",
      url: "/athlete",
    });
    return response;
  } catch (error) {
    // Handle errors as needed
    console.error("Error fetching athlete info:", error);
    throw error;
  }
};

export const getAthleteActivities = async (): Promise<any> => {
  try {
    const response = await makeAuthenticatedRequest({
      method: "get",
      url: "/athlete/activities",
    });
    return response;
  } catch (error) {
    // Handle errors as needed
    console.error("Error fetching athlete activities:", error);
    throw error;
  }
};
