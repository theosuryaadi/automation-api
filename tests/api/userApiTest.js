// Load the axios library
const axios = require("axios");
// Load the chai assertion library
const { expect } = require("chai");
// Load the environment variables
require("dotenv").config();

// API URL and headers
const API_URL = "https://gorest.co.in/public/v2/users/";
const headers = {
  Authorization: `Bearer ${process.env.GOREST_TOKEN}`,
  "Content-Type": "application/json",
};

// Test Suite
describe("API Automation - GoRest", () => {
  // Variable to store the userId
  let userId;

  // List User
  it("List user details (Positive Test)", async () => {
    //Using Axios to get the response
    const response = await axios.get(`${API_URL}`, { headers });

    //Check log the response data
    console.log("List User", response.data);

    //Check the response status (chai assertion)
    expect(response.status).to.equal(200);
  });

  // Create User
  it("Create a new user (Positive Test)", async () => {
    //Create user data
    const userData = {
      name: "Theo",
      gender: "male",
      email: `Theo@gmail.com`,
      status: "active",
    };

    //Using Axios to post the response
    const response = await axios.post(API_URL, userData, { headers });

    //Check log the response data
    console.log("Create User", response.data);

    //Check the response status and have id? (chai assertion)
    expect(response.status).to.equal(201);
    expect(response.data).to.have.property("id");

    userId = response.data.id;
  });

  // Get User
  it("Get user details (Positive Test)", async () => {
    //Using Axios to get the response
    const response = await axios.get(`${API_URL}/${userId}`, { headers });

    //Check log the response data
    console.log("Get User", response.data);

    //Check the response status and id (chai assertion)
    expect(response.status).to.equal(200);
    expect(response.data.id).to.equal(userId);
  });

  // Update User
  it("Update user details (Positive Test)", async () => {
    //Update user data
    const updateData = { name: "Theofilus", status: "inactive" };

    //Using Axios to put the response
    const response = await axios.put(`${API_URL}/${userId}`, updateData, {
      headers,
    });

    //Check log the response data
    console.log("Update User", response.data);

    //Check the response status (chai assertion)
    expect(response.status).to.equal(200);
  });

  // Delete User
  it("Delete user (Positive Test)", async () => {
    //Using Axios to delete the response
    const response = await axios.delete(`${API_URL}/${userId}`, { headers });

    //Check log the response data
    console.log("Delete User", response.data);

    //Check the response status (chai assertion)
    expect(response.status).to.equal(204);
  });

  // Negative Test - Get User
  it("Get non-existing user (Negative Test)", async () => {
    //Using Axios catch to get the response
    const response = await axios
      .get(`${API_URL}/9999999`, { headers })
      .catch((err) => err.response);

    //Check log the response data
    console.log("Get Non-Existing User", response.data);

    //Check the response status (chai assertion)
    expect(response.status).to.equal(404);
  });
});
