import Button, { ButtonVariant } from "../../../../components/button";

const Header = () => {
  return (
    <div className="rounded-lg bg-theme-orange p-8 shadow">
      <p className="font-display text-3xl">Discover Bounties</p>
      <p className="mt-3 max-w-4xl text-sm font-light leading-tight">
        The ThugBirdz community is the glue that holds us all together, within
        our flock we have some of the most diamond winged individuals on the
        planet. Our mission is simply to create an environment that exemplifies
        kindness. The ThugBirdz community is the glue that holds us all
        together, within our flock we have some of the most diamond winged
        individuals on the planet.
      </p>
      <div className="mt-6 flex items-center space-x-8">
        <div>
          <p>Category</p>
        </div>
        <div>
          <p>Type</p>
        </div>
        <div>
          <p>Timeline</p>
        </div>
        <Button
          variant={ButtonVariant.PrimaryBW}
          className="rounded-sm py-1.5 text-sm text-theme-orange"
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );
};

export default Header;
