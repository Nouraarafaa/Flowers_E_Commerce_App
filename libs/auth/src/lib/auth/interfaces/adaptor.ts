import { AuthModel } from "./auth-model";
import { AuthResponse} from "./auth-response";

export interface Adaptor {
  adapt(data: AuthResponse): AuthModel;
}
