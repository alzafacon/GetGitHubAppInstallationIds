const dotenv = require("dotenv");
dotenv.config();

const { Octokit } = require("@octokit/rest");
const { createAppAuth } = require("@octokit/auth-app");

async function getID() {
  const authCreator = createAppAuth({
    appId: process.env.GITHUB_APP_ID,
    privateKey: process.env.GITHUB_PRIVATE_KEY,
  });

  // Retrieve JSON Web Token (JWT) to authenticate as app
  const auth = await authCreator({ type: "app" });
  // console.log(auth)
  
  const client = new Octokit(auth);

  // Send requests to get installation details
  const rsp  = await client.request("GET /app/installations", {
      headers: {
        Authorization: 'Bearer ' + auth.token
      }
  });

  rsp.data.forEach((installation) => {
    console.log("Account login  : " + installation.account.login);
    console.log("Installation Id: " + installation.id + "\n");
  })
}

getID().catch((err) => console.log("ERROR:", err));
