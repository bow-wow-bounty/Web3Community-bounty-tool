import handler from "../../utils/handler";

const logout = handler(({ cookies }, res) => {
  cookies.set("access_token", "", {
    httpOnly: true,
    expiresIn: 0,
  });

  return res.status(200).json();
});

export default logout;
