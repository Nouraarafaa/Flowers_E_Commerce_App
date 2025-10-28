import { EditProfliePayload } from "libs/auth/src/lib/auth/interfaces/auth-payload";
import { LoggedUserDataResponse, MessageResponse } from "libs/auth/src/lib/auth/interfaces/auth-response";
import { Observable } from "rxjs";


export abstract class OtherAuthApis {
    abstract deleteMyAccount(): Observable<MessageResponse>
    abstract editProflie(data: EditProfliePayload): Observable<LoggedUserDataResponse>
    abstract saveUserData(): void;
    abstract isLoggedInUser(): boolean;
    abstract clearSession(): void;
}