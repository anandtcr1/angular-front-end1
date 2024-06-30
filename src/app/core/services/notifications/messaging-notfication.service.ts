import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class MessagingNotficationService {
/*
  showPopUp = new BehaviorSubject<any>(null);

  constructor(private angularFireMessageing: any,
    private httpClient: HttpClient) {
  }

  updateToken(userId: number, token: string) {
    var payload = {
      userId: userId,
      token: token
    };
    return this.httpClient.post<any>(`/SaveFcmToken`, payload)
      .pipe((map(result => result)));
  }

  requestPermision(userId: number) {
    this.angularFireMessageing.requestToken.subscribe(token => {

      var storedToken = localStorage.getItem("token");

      if (token && (!storedToken || storedToken != token)) {

        localStorage.setItem("token", token ?? "");
        this.updateToken(userId, token ?? "").subscribe(_ => {

        });
      }

    });
  }

  receiveMessaging() {
    this.angularFireMessageing.messages.subscribe({
      complete: () => {
        console.log("complete");
      },
      error: (e) => {
        console.log("error", e);
      },
      next: (payload) => { console.log("receiveMessaging:", payload); this.showPopUp.next(payload); }
    });
  }
  */
}
