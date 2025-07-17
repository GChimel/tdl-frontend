import { httpClient } from "./httpClient";

interface ISignUpDTO {
  name: string;
  email: string;
  password: string;
}

interface ISignInDTO {
  email: string;
  password: string;
}

interface IResponse {
  accessToken: string;
}

export class AuthService {
  static async signUp({ name, email, password }: ISignUpDTO) {
    const { data } = await httpClient.post<IResponse>("/auth/sign-up", {
      name,
      email,
      password,
    });

    return data;
  }

  static async signIn({ email, password }: ISignInDTO) {
    const { data } = await httpClient.post<IResponse>("/auth/sign-in", {
      email,
      password,
    });

    return data;
  }
}
