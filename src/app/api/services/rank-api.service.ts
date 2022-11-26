import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RankRequest} from "../types/rank-request";
import {RankResponse} from "../types/rank-response";
import {Observable} from "rxjs";

export const RANK_API_BASE = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class RankApiService {

  constructor(private http: HttpClient) {
  }

  sendRank(request: RankRequest): Observable<RankResponse> {
    const url = RANK_API_BASE + '/rank';
    return this.http.post<RankResponse>(url, request);
  }
}
