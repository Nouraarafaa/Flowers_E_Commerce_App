export abstract class OtherAuthApis {
    abstract saveUserData(): void;
    abstract isLoggedInUser(): boolean;
    abstract clearSession(): void;
}