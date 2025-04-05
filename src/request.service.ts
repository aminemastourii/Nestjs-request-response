import { Injectable, Scope } from "@nestjs/common";

@Injectable({ scope: Scope.REQUEST })
export class RequestService {
   private userID: string;
   setUserID(userID: string) {
       this.userID = userID;
   }
    getUserID(): string {
       return this.userID ;
    }
  }
