import handler from "../../utils/handler";

const authUser = handler(
  ({ user }, res) => {
    res.status(200).json({ wallet: user.wallet, roles: user.roles });
  },
  { isProtected: true }
);

export default authUser;
