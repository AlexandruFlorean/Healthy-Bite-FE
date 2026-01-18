import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RegisterUserDto } from "../models/register-user-dto.model";
import { Observable, tap } from "rxjs";
import { UserDtoResponse } from "../models/user-dto-response.model";
import { LoginUserDto } from "../models/loginUserDto";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
    private baseUrl = 'http://localhost:8080';

    constructor(private readonly httpClient: HttpClient) {}

    register(registerUserDto: RegisterUserDto): Observable<UserDtoResponse> {
        return this.httpClient.post<UserDtoResponse>(`${this.baseUrl}/user`, registerUserDto);
    }

    login(loginUserDto: LoginUserDto): Observable<string> {
      return this.httpClient.post<string>(`${this.baseUrl}/signIn`, loginUserDto)
      .pipe(tap(respons => {
        localStorage.setItem('userId', respons)
      }));

    }
}