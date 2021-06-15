import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {TokenInterceptor} from "./shared/token.interceptor";

export const httpInterceptors = [
  {
    provide : HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  },
];
