/* eslint-disable react/prop-types */
/* eslint-disable react/no-danger */
import "react-quill/dist/quill.snow.css";

import { PlusIcon } from "@heroicons/react/solid";
import PropTypes from "prop-types";
import { useMemo } from "react";

import Button, { ButtonVariant } from "../../../../components/button";
import Link from "../../../../components/link";
import Step from "../../../../components/step";
import AuthStore from "../../../../stores/auth-store";

const Contents = ({
  bounty: {
    id,
    description,
    todo,
    wallets,
    type,
    deadline,
    distribution,
    evaluation,
    resources,
    pocName,
    pocTwitter,
    pocDiscord,
  },
  bountywinners,
}) => {
  const { user } = AuthStore.useContainer();
  const ended = useMemo(() => new Date() >= new Date(deadline), [deadline]);
  // console.log(bountywinners);
  const allowSubmission = useMemo(
    () =>
      !ended &&
      (type === "Open" ||
        (type === "Closed" && wallets.includes(user?.wallet))),
    [ended, type, user?.wallet, wallets]
  );

  return (
    <div className="mt-8">
      {bountywinners.length !== 0 && (
        <Step title="WINNERS">
          <ul className="flex flex-col">
            {bountywinners.map((winner) => {
              return (
                <li className="text-md flex flex-wrap" key={winner.wallet}>
                  {winner.wallet}
                  <span className="ml-4 flex scale-75 flex-row">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18.799"
                      height="15.268"
                      viewBox="0 0 18.799 15.268"
                    >
                      <path
                        d="M16.866,7.186c.012.167.012.334.012.5A10.887,10.887,0,0,1,5.916,18.649,10.888,10.888,0,0,1,0,16.919a7.97,7.97,0,0,0,.93.048,7.716,7.716,0,0,0,4.783-1.646,3.86,3.86,0,0,1-3.6-2.672,4.859,4.859,0,0,0,.728.06,4.075,4.075,0,0,0,1.014-.131A3.853,3.853,0,0,1,.763,8.8V8.748A3.88,3.88,0,0,0,2.5,9.237,3.859,3.859,0,0,1,1.312,4.085,10.951,10.951,0,0,0,9.256,8.116a4.349,4.349,0,0,1-.1-.883A3.856,3.856,0,0,1,15.829,4.6a7.585,7.585,0,0,0,2.445-.93A3.842,3.842,0,0,1,16.58,5.79a7.724,7.724,0,0,0,2.219-.6,8.282,8.282,0,0,1-1.932,1.992Z"
                        transform="translate(0 -3.381)"
                      />
                    </svg>
                  </span>
                  <span className="text-md ml-1">
                    {winner.submission.twitter}
                  </span>
                  <span className="ml-4 flex scale-75 flex-row">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16.449"
                      height="18.799"
                      viewBox="0 0 16.449 18.799"
                    >
                      <path d="M10.913,8.929a.962.962,0,1,1-.959-1.043A1,1,0,0,1,10.913,8.929ZM6.523,7.886a1.047,1.047,0,0,0,0,2.087,1,1,0,0,0,.959-1.043A1,1,0,0,0,6.523,7.886Zm9.926-5.95V18.8c-2.368-2.093-1.611-1.4-4.361-3.957l.5,1.739H1.927A1.932,1.932,0,0,1,0,14.644V1.936A1.932,1.932,0,0,1,1.927,0h12.6A1.932,1.932,0,0,1,16.449,1.936ZM13.77,10.847a12.587,12.587,0,0,0-1.354-5.48A4.648,4.648,0,0,0,9.775,4.38l-.132.15a6.256,6.256,0,0,1,2.34,1.194,7.987,7.987,0,0,0-7.021-.273c-.348.16-.555.273-.555.273A6.341,6.341,0,0,1,6.88,4.493L6.786,4.38a4.648,4.648,0,0,0-2.641.987,12.587,12.587,0,0,0-1.354,5.48,3.408,3.408,0,0,0,2.867,1.429s.348-.423.63-.78a2.923,2.923,0,0,1-1.645-1.109c.138.1.366.222.385.235a6.852,6.852,0,0,0,5.865.329,5.379,5.379,0,0,0,1.081-.555,2.966,2.966,0,0,1-1.7,1.119c.282.357.62.761.62.761A3.436,3.436,0,0,0,13.77,10.847Z" />
                    </svg>
                  </span>
                  <span className="text-md ml-1">
                    {winner.submission.discord}
                  </span>
                </li>
              );
            })}
          </ul>
        </Step>
      )}
      <Step title="ABOUT THE BOUNTY">
        <div
          dangerouslySetInnerHTML={{ __html: description }}
          className="prose max-w-full text-sm"
          style={{
            overflowWrap: "anywhere",
          }}
        />
      </Step>
      <Step title="YOUR TASKS">
        <div
          dangerouslySetInnerHTML={{ __html: todo }}
          className="prose max-w-full text-sm"
          style={{
            overflowWrap: "anywhere",
          }}
        />
      </Step>
      <Step title="PRIZE DISTRIBUTION">
        <div
          dangerouslySetInnerHTML={{ __html: distribution }}
          className="prose max-w-full text-sm"
          style={{
            overflowWrap: "anywhere",
          }}
        />
      </Step>
      <Step title="EVALUATION CRITERIA">
        <div
          dangerouslySetInnerHTML={{ __html: evaluation }}
          className="prose max-w-full text-sm"
          style={{
            overflowWrap: "anywhere",
          }}
        />
      </Step>
      <Step title="RESOURCES">
        <div
          dangerouslySetInnerHTML={{ __html: resources }}
          className="prose max-w-full text-sm"
          style={{
            overflowWrap: "anywhere",
          }}
        />
      </Step>
      <Step title="POINT OF CONTACT">
        <ul className="flex flex-col">
          <li className="text-md flex flex-wrap">
            {pocName}
            <span className="ml-4 flex scale-75 flex-row">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18.799"
                height="15.268"
                viewBox="0 0 18.799 15.268"
              >
                <path
                  d="M16.866,7.186c.012.167.012.334.012.5A10.887,10.887,0,0,1,5.916,18.649,10.888,10.888,0,0,1,0,16.919a7.97,7.97,0,0,0,.93.048,7.716,7.716,0,0,0,4.783-1.646,3.86,3.86,0,0,1-3.6-2.672,4.859,4.859,0,0,0,.728.06,4.075,4.075,0,0,0,1.014-.131A3.853,3.853,0,0,1,.763,8.8V8.748A3.88,3.88,0,0,0,2.5,9.237,3.859,3.859,0,0,1,1.312,4.085,10.951,10.951,0,0,0,9.256,8.116a4.349,4.349,0,0,1-.1-.883A3.856,3.856,0,0,1,15.829,4.6a7.585,7.585,0,0,0,2.445-.93A3.842,3.842,0,0,1,16.58,5.79a7.724,7.724,0,0,0,2.219-.6,8.282,8.282,0,0,1-1.932,1.992Z"
                  transform="translate(0 -3.381)"
                />
              </svg>
            </span>
            <span className="text-md ml-1">{pocTwitter}</span>
            <span className="ml-4 flex scale-75 flex-row">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16.449"
                height="18.799"
                viewBox="0 0 16.449 18.799"
              >
                <path d="M10.913,8.929a.962.962,0,1,1-.959-1.043A1,1,0,0,1,10.913,8.929ZM6.523,7.886a1.047,1.047,0,0,0,0,2.087,1,1,0,0,0,.959-1.043A1,1,0,0,0,6.523,7.886Zm9.926-5.95V18.8c-2.368-2.093-1.611-1.4-4.361-3.957l.5,1.739H1.927A1.932,1.932,0,0,1,0,14.644V1.936A1.932,1.932,0,0,1,1.927,0h12.6A1.932,1.932,0,0,1,16.449,1.936ZM13.77,10.847a12.587,12.587,0,0,0-1.354-5.48A4.648,4.648,0,0,0,9.775,4.38l-.132.15a6.256,6.256,0,0,1,2.34,1.194,7.987,7.987,0,0,0-7.021-.273c-.348.16-.555.273-.555.273A6.341,6.341,0,0,1,6.88,4.493L6.786,4.38a4.648,4.648,0,0,0-2.641.987,12.587,12.587,0,0,0-1.354,5.48,3.408,3.408,0,0,0,2.867,1.429s.348-.423.63-.78a2.923,2.923,0,0,1-1.645-1.109c.138.1.366.222.385.235a6.852,6.852,0,0,0,5.865.329,5.379,5.379,0,0,0,1.081-.555,2.966,2.966,0,0,1-1.7,1.119c.282.357.62.761.62.761A3.436,3.436,0,0,0,13.77,10.847Z" />
              </svg>
            </span>
            <span className="text-md ml-1">{pocDiscord}</span>
          </li>
        </ul>
      </Step>
      <Step title="ABOUT BOUNTY HUB" hideLine>
        <p>
          The Bounty Hub is here to empower you to create and manage bounties
          for your community in the most efficient manner. Our mission is simply
          to create an environment where communities are able to contribute and
          engage themselves through bounties and competition. Create your own
          Bounty Hub for you community today.{" "}
        </p>
      </Step>
      {allowSubmission && (
        <Link href={`/bounty/${id}/submission`} noUnderline>
          <Button variant={ButtonVariant.PrimaryBW} className="ml-12 mt-8 flex">
            <div className="mr-3 rounded-sm bg-white p-0.5 text-black">
              <PlusIcon className="h-3 w-3" />
            </div>
            Add A Submission
          </Button>
        </Link>
      )}
    </div>
  );
};

export default Contents;

Contents.propTypes = {
  bounty: PropTypes.shape({
    id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    todo: PropTypes.string.isRequired,
    deadline: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    wallets: PropTypes.arrayOf(PropTypes.string).isRequired,
    distribution: PropTypes.string.isRequired,
    evaluation: PropTypes.string.isRequired,
    resources: PropTypes.string.isRequired,
    pocName: PropTypes.string.isRequired,
    pocTwitter: PropTypes.string.isRequired,
    pocDiscord: PropTypes.string.isRequired,
  }).isRequired,
};
