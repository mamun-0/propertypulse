export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/properties/add", "/messages", "/profile", "/properties/saved"],
};
