/**
 * General configuration for the app. Used by server and client.
 */
// TODO: Split into own chunk - no need to load these with default chunk
import BrainAndNerves from 'public/texts/sections/BrainAndNerves'
import StemCells from 'public/texts/sections/StemCells'
import Cancer from 'public/texts/sections/Cancer'
import PlanetaryScience from 'public/texts/sections/PlanetaryScience'
import Zoology from 'public/texts/sections/Zoology'
import Paleontology from 'public/texts/sections/Paleontology'
import ogImage from 'og_default.png'

const title = 'Capeia'
const description = 'A New Way to Interact with Science!'

const jwtCookieName = 'capeia-jwt'

// TODO: All the social media tags!
// TODO: apple-touch-icon -> Especially relevant w/ Apple Pay integration
const appConfig = {
  title,
  description,
  meta: [
    { name: 'description', content: description },
    { property: 'og:site_name', content: title },
    { property: 'og:locale', content: 'en_US' },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:image', content: ogImage },
    { property: 'twitter:title', content: title },
    { property: 'twitter:description', content: description }
  ],

  jwtCookieName,

  // verb and title are used for the hero image. title is optional (defaults to name)
  sections: {
    'stem-cells': {
      name: 'Stem Cells',
      icon: require('sections/stem_cells.svg'),
      background: require('hero_stem_cells.jpg'),
      verb: 'Discover',
      title: 'Stem Cell Research',
      info: StemCells
    },
    // TODO: Move this to first place again
    // (We only have this here so that we don't have an empty ressort as first
    // entry on launch!)
    'brain-and-nerves': {
      name: 'Brain & Nerves',
      icon: require('sections/brain_nerves.svg'),
      background: require('hero_brain_nerves.jpg'),
      verb: 'Fathom',
      info: BrainAndNerves
    },
    'cancer': {
      name: 'Cancer',
      icon: require('sections/cancer.svg'),
      background: require('hero_cancer_research.jpg'),
      verb: 'Catch up on',
      title: 'Cancer Research',
      info: Cancer
    },
    'zoology': {
      name: 'Zoology',
      icon: require('sections/zoology.svg'),
      background: require('hero_zoology.jpg'),
      verb: 'Experience',
      info: Zoology
    },
    'paleobiology': {
      name: 'Paleobiology',
      icon: require('sections/paleontology.svg'),
      background: require('hero_paleontology.jpg'),
      verb: 'Unearth',
      info: Paleontology
    },
    'planetary-science': {
      name: 'Planetary Science',
      icon: require('sections/planetary_science.svg'),
      background: require('hero_planetary_science.jpg'),
      verb: 'Explore',
      info: PlanetaryScience
    }
  },

  supportedCountries: {
    AT: 'Austria',
    AU: 'Australia',
    BE: 'Belgium',
    BR: 'Brazil',
    CA: 'Canada',
    CH: 'Switzerland',
    DE: 'Germany',
    DK: 'Denkmark',
    ES: 'Spain',
    FI: 'Finland',
    FR: 'France',
    GB: 'United Kingdom',
    HK: 'Hong Kong',
    IE: 'Ireland',
    IT: 'Italy',
    JP: 'Japan',
    LU: 'Luxembourg',
    MX: 'Mexico',
    NL: 'Netherlands',
    NO: 'Norway',
    NZ: 'New Zealand',
    PT: 'Portugal',
    SE: 'Sweden',
    SG: 'Singapore',
    US: 'United States'
  }
}

export default appConfig
