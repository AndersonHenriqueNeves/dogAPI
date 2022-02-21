import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

type res = {
  "message": object,
  "status": string
}

type resImage = {
  "message": string,
  "status": string
}

@Injectable({
  providedIn: 'root'
})
export class DogServiceService {

  constructor(private http: HttpClient) { }

  public getBreedsNames(): Observable<res>{
    return this.http.get('https://dog.ceo/api/breeds/list/all') as Observable<res>;
  }

  public getBreedsImage(breed: string): Observable<resImage> {
    return this.http.get(`https://dog.ceo/api/breed/${breed}/images/random`) as Observable<resImage>;
  }
}
