import handler from "../utils/handler";

const hello = handler((req, res) => {
  return res.status(200).json("John Doe");
});

export default hello;
