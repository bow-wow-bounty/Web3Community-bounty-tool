import { generateAuthRequest } from "../../utils/auth";
import handler from "../../utils/handler";

const authRequest = handler(({ body: { wallet } }, res) => {
  return res.status(200).json({ message: generateAuthRequest(wallet) });
});

export default authRequest;
