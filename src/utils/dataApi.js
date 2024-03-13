import { PUBLIC_URL } from "./auth";

class dataApi {
  constructor(props) {
    this._authToken = props.auth;
    this._rootUrl = props.rootUrl;
  }

  _fetch = ({ method = "GET", url = '/', data, auth = localStorage.getItem('jwt') }) =>
    fetch(`${this._rootUrl}${url}`, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': '<calculated when request is sent>',
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Host': '<calculated when request is sent>',
        'api-key': this._authToken,
        'authorization': `Bearer ${auth}`,
      },
      body: JSON.stringify(data),
    }).then(this._handleResponse)

  _handleResponse = (res) => (res.ok ? res.json() : Promise.reject(`Error: ${res.status}`));

  initPage = ({ dataNames, wellNames }) => this._fetch({ method: "POST", url: "/page-data", data: { dataNames, wellNames } });
}
// ! REAL API
const dataApiOBJ = new dataApi({ auth: '4den6CaDRe58L5Jx85R7E38xpVcn8TZcyqznqZVpKFAjeqqG80eZQc1WCtRNM1Aq', rootUrl: PUBLIC_URL });
export default dataApiOBJ;
