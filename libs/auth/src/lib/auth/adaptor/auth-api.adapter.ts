import { Injectable } from '@angular/core';

import { AuthModel } from '../interfaces/auth-model';
import { AuthResponse } from '../interfaces/auth-response';
import { Adaptor } from '../interfaces/adaptor';

@Injectable({
  providedIn: 'root',
})
export class AuthAPIAdaptorService implements Adaptor {
  
  adapt(data: AuthResponse):AuthModel {
    return {
      message: data.message,
      token: data.token,
      firstName: data.user.firstName,
      lastName: data.user.lastName,
      email: data.user.email,
      id: data.user._id,
      role: data.user.role,
      photo:data.user.photo
    };
  }

}