import { PUBLIC_URL } from "./auth";

class fieldsApi {
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

  initWells = () => this._fetch({ method: "GET", url: "/init-wells" });

  getStructure = () => this._fetch({ method: "GET", url: "/reservoirs" });

  getReservoir = ({ path }) => this._fetch({ method: "POST", url: "/reservoir", data: { path } });

  getWellsData = ({ folderName }) => this._fetch({ method: "POST", url: "/fields", data: { folderName } });

  getGraphData = ({ fileName }) => this._fetch({ method: "POST", url: "/file", data: { fileName } });

  getPageGraphData = ({ page }) => this._fetch({ method: "POST", url: "/files", data: { folderName: page } });
}
// ! REAL API
const fieldsApiOBJ = new fieldsApi({ auth: '4den6CaDRe58L5Jx85R7E38xpVcn8TZcyqznqZVpKFAjeqqG80eZQc1WCtRNM1Aq', rootUrl: PUBLIC_URL });
export default fieldsApiOBJ;
