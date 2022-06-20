import bountyCreate from "../../../api/functions/bounty/create";
import bountyList from "../../../api/functions/bounty/list";

const handler = (req, res) => {
  switch (req.method) {
    case "GET":
      bountyList(req, res);
      break;
    case "POST":
      bountyCreate(req, res);
      break;
    default:
      res.status(404).json();
  }
};

export default handler;
