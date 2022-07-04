export interface NewUserType {
  email: string;
  username: string;
  password: string;
  fullname: string;
  photo_profile: string;
  phone_number: string;
  is_active: Boolean;
  gender: 'male' | 'female';
}
