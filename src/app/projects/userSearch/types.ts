export interface UserData {
  id: { name: string; value: string };
  name: { title: string; first: string; last: string };
  picture: { large: string; medium: string; thumbnail: string };
  nat: string;
  email: string;
  login: { uuid: string };
}
