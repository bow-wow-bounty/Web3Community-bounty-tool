import roleList from "../../../api/functions/admin/roles/list";
import roleUpdate from "../../../api/functions/admin/roles/update";

const handler = (req, res) => {
  switch (req.method) {
    case "GET":
      roleList(req, res);
      break;
    case "PUT":
      roleUpdate(req, res);
      break;
    default:
      res.status(404).json();
  }
};

export default handler;
