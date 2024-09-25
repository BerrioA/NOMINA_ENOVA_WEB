import PropTypes from "prop-types";

export const WelcomeAndText = ({ title, Subtitle }) => {
  return (
    <div>
      <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
        {title}
      </p>
      <p className="text-lg sm:text-xl md:text-2xl lg:text-2xl mb-2">
        {Subtitle}
      </p>
    </div>
  );
};

WelcomeAndText.propTypes = {
  title: PropTypes.node.isRequired,
  Subtitle: PropTypes.node.isRequired,
};
