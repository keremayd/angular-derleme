export class GuestsModel {
  displayName: string;
  phone: string;
  email: string;
  gender: string;
  ageRange: {
    min: number;
    max: number;
  };
  macAddresses: string;
  loginSource: string;
  loginLastVenue: string;
  loginLastTime: string;
  subscribed: boolean;
  status: boolean;
}
