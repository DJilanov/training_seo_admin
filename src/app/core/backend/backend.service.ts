import { Injectable } from '@angular/core';
import { RequestOptions, Http } from '@angular/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/mergeMap';

import { environment } from 'environments/environment';
@Injectable()
export class BackendService {

  constructor(
    private http: Http
  ) {

  }

  backendRequest(requestType, requestTarget, requestData?) {
    if (requestType === 'post') {
      return this.http.post(environment.apiUrl + requestTarget, requestData);
    } else if (requestType === 'get') {
      return this.http.get(environment.apiUrl + requestTarget, {
        params: requestData
      });
    } else if (requestType === 'delete') {
      return this.http.delete(environment.apiUrl + requestTarget, new RequestOptions({
        body: requestData
      }))
    }
  }
  /**
  * @getCategories get all categories
  * @return {Array} categories
  */
  public getCategories() {
    return this.backendRequest('get', 'categories');
  }
  /**
  * @getProducts get all products
  * @return {Array} products
  */
  public getProducts() {
    return this.backendRequest('get', 'products');
  }
  /**
  * @getAllData get all data
  * @return {Array} all data
  */
  public getAllData(body) {
    let request = Object.assign(body, { 'type': 'get' });
    return this.backendRequest('post', 'allData', request);
  }
  /**
  * @sendMessage send message to the back-end service
  * @return {Object} response of the back-end
  */
  public sendMessage(body) {
    return this.backendRequest('post', 'message', body);
  }
  /**
  * @sendOrder send order to the back-end service
  * @return {Object} response of the back-end
  */
  public sendOrder(body) {
    return this.backendRequest('post', 'order', body);
  }
  /**
  * @deleteOrder send request with order for deletion
  * @return {Object} response of the back-end
  */
  public deleteOrder(body) {
    let request = Object.assign(body, { 'type': 'delete' });
    return this.backendRequest('delete', 'order', request);
  }
  /**
  * @adminLogin send request with login data to the back-end
  * @return {Object} response of the back-end
  */
  public adminLogin(body) {
    return this.backendRequest('post', 'admin/login', body);
  }
  /**
  * @updateProduct send request with changed product
  * @return {Object} response of the back-end
  */
  public updateProduct(body) {
    return this.backendRequest('post', 'products', body);
  }
  /**
  * @updateCategories send request with changed categories array
  * @return {Object} response of the back-end
  */
  public updateCategories(body) {
    return this.backendRequest('post', 'categories', body);
  }
  /**
  * @getMessages get all messages
  * @return {Array} messages
  */
  public getMessages(body) {
    let request = Object.assign(body, { 'type': 'get' });
    return this.backendRequest('post', 'message', request);
  }
  /**
  * @deleteMessage send request with message for deletion
  * @return {Object} response of the back-end
  */
  public deleteMessage(body) {
    let request = Object.assign(body, { 'type': 'delete' });
    return this.backendRequest('post', 'message', request);
  }
  /**
  * @updateWarranty send request with changed product
  * @return {Object} response of the back-end
  */
  public createWarranty(body) {
    return this.backendRequest('post', 'warranties', body);
  }
  /**
  * @updateWarranty send request with changed product
  * @return {Object} response of the back-end
  */
  public updateWarranty(body) {
    return this.backendRequest('post', 'warranties', body);
  }
  /**
  * @updateWarranty send request with changed product
  * @return {Object} response of the back-end
  */
  public deleteWarranty(body) {
    return this.backendRequest('delete', 'warranties', body);
  }
}
