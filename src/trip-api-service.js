import ApiService from './framework/api-service';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE'
};

export default class TripApiService extends ApiService {
  get points () {
    return this._load({
      url: 'points'
    }).then(ApiService.parseResponse);
  }

  get destinations () {
    return this._load({
      url: 'destinations'
    }).then(ApiService.parseResponse);
  }

  get offers () {
    return this._load({
      url: 'offers'
    }).then(ApiService.parseResponse);
  }

  async addEvent(event) {
    const response = await this._load({
      url: 'points',
      method: Method.POST,
      body: JSON.stringify(this.#adaptToServer(event)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    return await ApiService.parseResponse(response);
  }

  async updateEvent(event) {
    const response = await this._load({
      url: `points/${event.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(event)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    return await ApiService.parseResponse(response);
  }

  async deleteEvent(event) {
    const response = await this._load({
      url: `points/${event.id}`,
      method: Method.DELETE,
    });

    return await ApiService.parseResponse(response);
  }

  #adaptToServer(event) {
    const adaptedEvent = {
      ...event,
      'date_from': event.dateFrom.toISOString(),
      'date_to': event.dateTo.toISOString(),
      'base_price': parseInt(event['basePrice'], 10),
      'is_favorite': event['isFavorite'],
    };

    // remove unnecessary keys
    delete adaptedEvent['dateFrom'];
    delete adaptedEvent['dateTo'];
    delete adaptedEvent['basePrice'];
    delete adaptedEvent['isFavorite'];

    return adaptedEvent;
  }
}
