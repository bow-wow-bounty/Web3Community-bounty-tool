import handler from "../../../utils/handler";

const roleUpdate = handler((req, res) => {
  const { address, user } = req.body;
  return res.status(200).json({ address, user });
});

export default roleUpdate;
