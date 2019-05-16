import { LightningElement, api, track } from 'lwc';
import { loadScript } from 'lightning/platformResourceLoader'
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import NUXEO_JS from '@salesforce/resourceUrl/nuxeo';

export default class HelloNuxeo extends LightningElement {
  @api username = 'Administrator';
  @api password = 'Administrator';
  @api baseURL = 'http://localhost:8080/nuxeo';
  @api path = '/default-domain';
  @api pageSize = 50;
  @api pageProvider = 'document_content';

  @track documents = [];

  nuxeo;
  nuxeoJSLoaded = false;

  connectedCallback() {
    const { path, pageProvider, pageSize } = this;

    this._load()
    .then(() => this._connect())
    .then(() => this.nuxeo.repository().fetch(path))
    .then((doc) => this.nuxeo.repository().query({
      pageProvider,
      queryParams: [doc.uid],
      pageSize
    }))
    .then(({ entries }) => this.documents = entries)
    .catch(error => this._error(error));
  }

  _load() {
    return !this.nuxeoJSLoaded && loadScript(this, NUXEO_JS)
  }

  _connect() {
    if (this.nuxeo) return;
    const { baseURL, username, password} = this;
    this.nuxeo = new Nuxeo({
      baseURL,
      auth: {
        method: 'basic',
        username,
        password
      }
    });
    this.nuxeo.schemas('*');
    return this.nuxeo.connect();
  }

  _error(error) {
    console.log(error);
    this.dispatchEvent(
      new ShowToastEvent({
          title: `Error`,
          message: error,
          variant: 'error'
      })
    );
  }
}