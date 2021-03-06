import * as React from 'react'
import { css } from 'react-emotion'
import Heart from './Heart'
import toSentence from '../../utils/toSentence'
import ComponentType from '../../globals/typeEnums'
import MainSiteFooter from './MainSiteFooter'

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
  footerType: ComponentType
}

/** A footer to go at the bottom of every page. */
class Footer extends React.Component<FooterProps> {
  static defaultProps = {
    license: License.Copyright,
    footerType: ComponentType.Default
  }

  render() {
    if(this.props.footerType === ComponentType.Default) {
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
    } else /** this.props.footerType === ComponentType.MainSite */{
      /** This should be updated if more typeEnums are added */
      return(
        <MainSiteFooter/>
      )
    }
  }
}

export default Footer
