import axios from "axios";
import qs from "qs";

export default class SpotifyService {
  private clientId: string;
  private clientSecret: string;
  private AccessToken: string;
  private Expiry: number;

  constructor(clientId: string, clientSecret: string) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.AccessToken = "";

    this.getAccessToken();
  }

  async getAccessToken() {
    if (this.AccessToken !== "" || this.Expiry > Date.now()) {
      return this.AccessToken;
    }

    const response = await axios({
      method: "post",
      url: "https://accounts.spotify.com/api/token",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          new Buffer(this.clientId + ":" + this.clientSecret).toString(
            "base64"
          ),
      },
      data: qs.stringify({
        grant_type: "client_credentials",
      }),
    });

    this.AccessToken = response.data.access_token;
    this.Expiry = response.data.expires_in + Date.now() / 1000;

    console.log("Access Token Set");

    return this.AccessToken;
  }
}
