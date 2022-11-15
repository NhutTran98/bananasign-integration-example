import fetch from 'node-fetch';
import jwtDecode from 'jwt-decode';

export default async function handler(req, res) {
  const { authorizationCode } = req.body;
  const response = await fetch(`${process.env.BANANASIGN_OAUTH2_ENDPOINT}/oauth2/token`, {
    method: 'POST',
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code: authorizationCode,
      client_id: process.env.BANANASIGN_CLIENTID,
      client_secret: process.env.BANANASIGN_SECRET,
      redirect_uri: `${process.env.BASE_URL}/verify`
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
  const data = await response.json();
  const info = jwtDecode(data.id_token);
  res.status(200).json({
    accessToken: data.access_token,
    email: info.email,
  });
}
