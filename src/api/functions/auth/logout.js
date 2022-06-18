import handler from "../../utils/handler";

const logout = handler((req, res) => {
  req.cookies.set("access_token", "", {
    signed: true,
    httpOnly: true,
    expiresIn: 0,
  });

  return res.status(200).json();
});

export default logout;
