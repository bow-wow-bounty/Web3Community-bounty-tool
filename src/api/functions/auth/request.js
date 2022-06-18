import { generateAuthRequest } from "../../utils/auth";
import handler from "../../utils/handler";

const authRequest = handler((req, res) => {
  const { address } = req.body;
  return res.status(200).json({ message: generateAuthRequest(address) });
});

export default authRequest;
