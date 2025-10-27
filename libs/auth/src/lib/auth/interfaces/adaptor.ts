import { AuthModel } from "./auth-model";
import { AuthResponse} from "./response";

export interface Adaptor {
  adapt(data: AuthResponse): AuthModel;
}
