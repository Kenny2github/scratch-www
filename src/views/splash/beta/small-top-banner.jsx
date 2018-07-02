const FormattedMessage = require('react-intl').FormattedMessage;
const injectIntl = require('react-intl').injectIntl;
const React = require('react');

const FlexRow = require('../../../components/flex-row/flex-row.jsx');
const TitleBanner = require('../../../components/title-banner/title-banner.jsx');

require('./small-top-banner.scss');

const SmallTopBanner = () => (
    <TitleBanner className="beta-small-top-banner">
        <FlexRow className="beta-small-header">
            <h2 className="beta-copy">Try out the beta version of Scratch 3.0</h2>
            <a
                className="beta-try-it button"
                href="https://beta.scratch.mit.edu/"
            >Try it!</a>
        </FlexRow>
    </TitleBanner>
);

export default SmallTopBanner;
