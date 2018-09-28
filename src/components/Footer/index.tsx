import * as React from 'react'
import { css } from 'react-emotion'
import Heart from './Heart'
import toSentence from '../../utils/toSentence'
import LuxComponentType from '../../globals/typeEnums'
import * as MainSiteStyles from '../../globals/mainsiteGlobalStyles'
import FooterLink from './FooterLink'

enum License {
  MIT = 'MIT License',
  AGPL = 'GNU AGPL',
  Copyright = 'Copyright',
}

/**
 * Footer properties.
 */
interface FooterProps {
  /** The name of the github project. The `https://github.com/dailybruin/` part is already given. */
  githubName?: string
  /** The name of the license of the project. */
  license: License
  /** A list of the developers who created the site. */
  developers: string | Array<string>
  /** The year that the story was published, e.g., 2018. */
  copyrightYear: number
  /** What type of project this footer is being used in. */
  footerType: LuxComponentType
}

/** A footer to go at the bottom of every page. */
class Footer extends React.Component<FooterProps> {
  static defaultProps = {
    license: License.Copyright,
  }

  render() {
    if(this.props.footerType === LuxComponentType.LuxDefault) {
      return (
        <footer
          className={css`
            display: grid;
            grid-template-columns: 1fr;
            grid-template-rows: auto auto;
            justify-content: center;
            margin: 1rem 0;
            padding: 0 0.4rem;
            text-align: center;

            @media (max-width: 600px) {
              font-size: 0.8rem;
            }
          `}
        >
          <div>
            <span>
              Content copyright © {this.props.copyrightYear} Daily Bruin.
            </span>{' '}
            {!!this.props.githubName && (
              <span
                className={css`
                  @media (max-width: 600px) {
                    display: none;
                  }
                `}
              >
                Site code available on{' '}
                <a
                  href={`https://github.com/dailybruin/${this.props.githubName}`}
                >
                  GitHub
                </a>
                {this.props.license === License.Copyright
                  ? '.'
                  : ` and available under the ${this.props.license}.`}
              </span>
            )}
          </div>
          <div>
            Built with Suzy’s <Heart /> in Kerckhoff 118 by{' '}
            {typeof this.props.developers === 'string'
              ? this.props.developers
              : toSentence(this.props.developers)}
            .
          </div>
        </footer>
      )
    } else {
      const mainSiteFooterLinks = [
        {text:'About', url:'https://dailybruin.com/about'},
        {text:'Contact', url:'https://dailybruin.com/contact'},
        {text:'Advertise', url:'https://dailybruin.com/advertise'},
        {text:'Work With Us', url:'https://apply.uclastudentmedia.com'},
        {text:'Privacy', url:'https://dailybruin.com/privacy'}
      ];
      let renderedLinks = mainSiteFooterLinks.map((link) =>
        <FooterLink
          url={link.url}
          text={link.text}
        />
      );
      return(
        <footer
          className={css`
            display: flex;
            font-size: 0.85rem;
            flex-direction: row;
            padding: 0.4rem;
            font-family: ${MainSiteStyles.headlineFont};
            box-shadow: ${MainSiteStyles.cardShadow};
            border-top: 5px solid black;

            ${MainSiteStyles.mediaMobileBreakpoint} {
                flex-direction: column;
            }
          `}>
          <div
            className={css`
            display: flex;
            flex-direction: row;

            ${MainSiteStyles.mediaMobileBreakpoint} {
              flex-direction: column;
              text-align: center;
            }
          `}>
            {renderedLinks}
          </div>
          <div
            className={css`
              text-align: right;
              margin-left: auto;
              flex-grow: 1;

              ${MainSiteStyles.mediaMobileBreakpoint} {
                text-align: center;
                margin: auto;
              }
            `}>
              Copyright © {this.props.copyrightYear} Daily Bruin
          </div>
        </footer>
      )
    }
  }
}

export default Footer
