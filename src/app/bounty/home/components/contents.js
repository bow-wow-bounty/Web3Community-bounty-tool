/* eslint-disable react/no-danger */
import { PlusIcon } from "@heroicons/react/solid";
import PropTypes from "prop-types";

import Button, { ButtonVariant } from "../../../../components/button";
import Step from "../../../../components/step";

const Contents = ({
  bounty: { description, todo, distribution, evaluation, resources },
}) => {
  return (
    <div className="mt-8">
      <Step title="About the bounty">
        <div
          dangerouslySetInnerHTML={{ __html: description }}
          className="prose"
        />
      </Step>
      <Step title="Your tasks">
        <div dangerouslySetInnerHTML={{ __html: todo }} className="prose" />
      </Step>
      <Step title="Prize Distribution">
        <div
          dangerouslySetInnerHTML={{ __html: distribution }}
          className="prose"
        />
      </Step>
      <Step title="Evaluation criteria">
        <div
          dangerouslySetInnerHTML={{ __html: evaluation }}
          className="prose"
        />
      </Step>
      <Step title="Resources">
        <div
          dangerouslySetInnerHTML={{ __html: resources }}
          className="prose"
        />
      </Step>
      <Step title="About the Thugdao" hideLine>
        <p>
          The ThugBirdz community is the glue that holds us all together, within
          our flock we have some of the most diamond winged individuals on the
          planet. Our mission is simply to create an environment that
          exemplifies kindness. The ThugBirdz community is the glue that holds
          us all together, within our flock we have some of the most diamond
          winged individuals on the planet.{" "}
        </p>
      </Step>
      <Button variant={ButtonVariant.PrimaryBW} className="ml-4 mt-8 flex">
        <div className="mr-3 rounded-sm bg-white p-0.5 text-black">
          <PlusIcon className="h-3 w-3" />
        </div>
        Add A Submission
      </Button>
    </div>
  );
};

export default Contents;

Contents.propTypes = {
  bounty: PropTypes.shape({
    description: PropTypes.string.isRequired,
    todo: PropTypes.string.isRequired,
    distribution: PropTypes.string.isRequired,
    evaluation: PropTypes.string.isRequired,
    resources: PropTypes.string.isRequired,
  }).isRequired,
};
