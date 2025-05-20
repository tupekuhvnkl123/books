import Cookies from "js-cookie";

type CookieConfigType = {
  name: string;
  value: any;
  expires: number;
};

export const setSecureCookie = ({ name, value, expires }: CookieConfigType) => {
  Cookies.set(name, value, {
    expires,
    secure: true,
    sameSite: "strict",
  });
};
