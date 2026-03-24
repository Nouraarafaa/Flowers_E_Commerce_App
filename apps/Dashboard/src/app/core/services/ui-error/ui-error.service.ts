import { Injectable, signal } from '@angular/core';

export enum ErrorState {
  None,
  Unauthorized,
  ServerError
}

@Injectable({
  providedIn: 'root'
})
export class UiErrorService {
  private _errorState = signal<ErrorState>(ErrorState.None);
  errorState = this._errorState.asReadonly();

  setError(state: ErrorState) {
    this._errorState.set(state);
  }

  clearError() {
    this._errorState.set(ErrorState.None);
  }
}
