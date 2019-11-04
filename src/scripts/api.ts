import * as url from "url";

export default class Api {
    private _baseUrl: string;
    constructor(baseUrl: string) {
        this._baseUrl = baseUrl;
    }
    public post<TRequest, TResponse extends {}>(requestUrl: string, request: TRequest): Promise<TResponse> {
        let r = url.resolve(this._baseUrl, requestUrl);
        return new Promise<TResponse>(resolve => {
            return fetch(r, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(request)
            })
            .then(response => response.json())
            .then(data => {
                const d: TResponse = data;
                resolve(d);
            });
        })
    }
}