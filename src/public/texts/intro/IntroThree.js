// @flow
import React from 'react'
import Link from 'found/lib/Link'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import Helmet from 'react-helmet'
import TextContainer from '../TextContainer'
import IntroNavigation from './IntroNavigation'
import FauxAnnotation from '../../FauxAnnotation'
import TextBody from '../../shared/TextBody'
import s from './Intro.scss'

import ulughbeg from 'intro/ulugh_beg_observatory.jpg'
import luther from 'intro/luther_memorial_worms.jpg'
import newZealand from 'intro/new_zealand.jpg'

const Image = ({src, children}: any) =>
  <div>
    <img src={src} />
    <div className={s.imageDescription}>
      <span>
        {children}
      </span>
    </div>
  </div>

const IntroTwo = () =>
  <TextContainer>
    <TextBody>
      <Helmet title='Welcome - Part III' />
      <h1>Our Motivation</h1>

      <p>
        Imagine being a student of mathematics and astronomy in the year 1440 CE. Where would you have to go to get the best education and carry out cutting edge research in your field? You may find the answer astonishing: you would need to go to Samarkand and apply to the madrasa of Mirza Muhammad Taraghay, better known as Ulugbheg. It was there in today’s Uzbekistan that the best equipped observatory of its time was located and there that, in a lively intellectual climate
        <FauxAnnotation id='intro-3-0'>
          We know about this through a pair of letters which al-Kashi from the faculty staff sent to his father which have, remarkably, been preserved. In these letters al-Kashi not only describes the technical equipment of the observatory but also gives vivid impressions of the competitive and productive environment on the campus.
        </FauxAnnotation>
        , students attended lectures and courses given by the most progressive minds of their time. At the heart of this multi-million dollar
        <FauxAnnotation id='intro-3-1'>
          a rough estimate expressed in today’s currency, based on the size and fine equipment of the facility
        </FauxAnnotation>
        observatory was an enormous and most skilfully manufactured sextant of brass with a radius of more than 40 m. This device allowed astronomical measurements to be made with unprecedented precision. Ulughbeg’s star catalog, the Zij-i Sultani, was only surpassed 150 years later by Tycho Brahe’s Star Catalog D, and Ulughbeg’s determination of the earth’s axial tilt remained valid until the modern era. By 1449, however, Ulughbeg had been murdered
        <FauxAnnotation id='intro-3-2'>
          by his own son, to tell the whole story
        </FauxAnnotation>
        , his observatory torn down, the curriculum of his madrasa purged of all science, and his faculty staff dispersed. The end of Ulughbeg’s madrasa and of the Samarkand observatory also marked the ultimate end of what has become known as the Islamic Golden Age. From then on, orthodoxy and traditionalism prevailed and education was narrow and based on authority rather than on reason.
      </p>

      <Image src={ulughbeg}>
        All that remains of Ulugh Beg’s observatory is the foundation and the lower, subterranean part of the huge sextant.
        Excavated by Russian archaeologists in 1908, the site is now part of a museum in Samarkand, Uzbekistan
        {' '}
        <em>(Image credit: Alaexis, CC-BY-SA, Wikimedia Commons)</em>.
      </Image>

      <p>
        So did Christian Europe then feel free to take over science and waft away to higher levels of existence? Not quite so. Galileo Galilei, the founder of modern experimental science, was hauled before the Inquisition in 1633 and charged with heresy for supporting the idea of heliocentrism. He was shown the instruments of torture and forced to recant his view that the earth moves around the sun. He was placed under house arrest for the rest of his life and was forbidden to publish. He had to consider himself lucky, however. Giordano Bruno was burnt at the stake in 1600 for claiming that there were many other worlds, apart from the earth. Today, one probably would refer to "exoplanets" and find this concept quite intriguing.
      </p>
      <p>
        So what was it that stifled the scientific and technical progress of the Islamic world, and almost did the same in Christian Europe? Presumably it was not a lack of political (i.e. military) success. The Ottoman Empire conquered Constantinople in 1453, a huge victory over Christian Europe but it could not translate this into any form of widespread cultural predominance. Neither is a lack of material wealth a plausible explanation for the gradual decline of the Islamic world. The wealth and prosperity of the Mughal Empire is legendary but little more than the Taj Mahal remains today as a testimony to this empire’s former greatness. In 1517, however, something extraordinary happened in Europe that gained momentum and would radically change the mindscape and pave the way for the scientific and technical revolution that was to become the hallmark of Western civilization. A catholic friar by the name of Martin Luther fundamentally criticized the Roman Catholic Church and challenged the authority of the pope
        <FauxAnnotation id='intro-3-3'>
          Luther’s main cause of criticism was the excessive habit that the Catholic Church had of selling indulgences, i.e. salvation from purgatory,  through payment of a worldly fee; he claimed that the pope did not have any authority over purgatory. This dispute quickly escalated and Luther broke from the Catholic Church, calling the pope the Antichrist.
        </FauxAnnotation>
        . In actual fact he was not the first person to do so. In 14th century England John Wycliffe had already taken on the pope and in the early 15th century the Czech reformer Jan Hus argued for a thorough reformation of the Catholic Church. This is the more remarkable because any criticism of the Church, and especially of the pope, was potentially life-threatening in those days
        <FauxAnnotation id='intro-3-4'>
          Wycliffe died of natural causes before the Church could get hold of him; all that was left to be done was to have his mortal remains exhumed and his bones burned to ashes. Hus was less lucky; he also was burned, but while still alive. Luther, remarkably, survived his rebellion against the Church due to strong secular protection.
        </FauxAnnotation>
        . It does illustrate though, that at this time in Europe discontent with the secular and spiritual power of the Church was growing.
        Change was in the air and Luther was the man to crystallize it. It is important to realize that in the Medieval period the Church was much more influential in the Western world than it is today. Its influence went far beyond the spiritual realm by being deeply intertwined with secular power. From an intellectual point of view, the Church kept it rather simple: the bottom line was that everything of relevance to human life was already known and contained in the Christian Scriptures. What was not mentioned or addressed therein was simply not relevant and musing about it was a waste of time, at best. Luther was an intellectual though and he was not willing to accept this simple doctrine. Instead he developed a concept of two governments or kingdoms, one for worldly, secular issues and one for heavenly issues. Although he still saw God as the one who ordained both governments, this was the first step towards the development of a distinctly secular world order. The magnitude of this tectonic shift in thinking cannot be overestimated. It came at the huge cost of several million lives over the course of the following 130 years, but ultimately it liberated the mind from any ideological - but not moral - constraints and unleashed enormous creative and imaginative power. While your heart might still be occupied with faith, your mind was free to deal with earthly issues
        <FauxAnnotation id='intro-3-5'>
          Einstein, for instance, was a faithful person as illustrated by his famous quotes <em>"I am convinced that He does not play dice"</em> and <em>"God is subtle but he is not malicious"</em>.
        </FauxAnnotation>
        . Whether the earth rotates around the sun or whether it is the other way round was not an issue that the reformed Church did pay much attention to
        <FauxAnnotation id='intro-3-6'>
          Luther personally rejected the heliocentric view but the protestant movement never mounted a firm opposition to it in the way that the Catholic Church did. It basically accepted heliocentrism as an intellectual "hypothesis".
        </FauxAnnotation>
        .
      </p>

      <Image src={luther}>
        The Martin Luther Memorial in Worms, Germany.
        At the base of Luther’s central statue credit is given to earlier Church reformers including John Wycliffe and Jan Hus.
        Luther is flanked by local rulers who provided shelter and support when he was declared an outlaw by the Emperor in 1521
        {' '}
        <em>(Image credit: US Library of Congress)</em>.
      </Image>

      <p>
        So are we safe now? Can we lean back and ponder the big questions of mankind, fight disease, and conceive new technologies for a better quality of life on this planet? Be warned by history. A "two-government" doctrine, although not formulated explicitly, was at times also common during the Golden Islamic Age. Islamic empires and dynasties were often characterized by outspoken tolerance towards the faith-versus-reason question. Great minds, including al-Biruni and al-Farabi, propagated the notion that society should be ruled by reason rather than by any faith-related dogmas. This was a truly heretical attitude to have but there was no Inquisition that forced them to recant, nor were they burned at the stake - or executed elsewise. Tolerance, however, does not mean adoption. Unlike in reformed Europe, an enlightened world view was never adopted by any Islamic society as a whole. But even a thoroughly enlightened and, by any standards, modern society is not safe from falling prey to a dark medieval type of doctrine. A human lifespan ago exactly this happened in Germany. Its Jewish community was extinguished, not only physically but also intellectually. "Jewish physics" was forbidden in favour of a pure "Aryan physics"
        <FauxAnnotation id='intro-3-7'>
          With the extinction of the Jewish community German science lost a lot of its intellectual originality and shifted towards engineering, a shift which remains evident to the present day.
        </FauxAnnotation>
        . Nazism was a terrible setback in what one may describe as the evolution of a humanitarian civilization. Unfortunately though, history does not have any inherent direction or meaning. It just happens, as does biological evolution, in an undirected and ultimately unpredictable manner.
      </p>
      <p>
        Are we therefore completely clueless with regard to our destiny? Isn’t there anything we can do to steer the path of our own society in a beneficial way? Fortunately there is. We think the best we can do is to work for an "open society", as defined by Sir Karl Popper. Sir Karl was a man of Jewish descent with a lucid mind who developed an early interest in questions of philosophy and sociology when he was confronted with the rise of Nazism. This not only made him leave his home town of Vienna for the freedom of New Zealand
        <FauxAnnotation id='intro-3-8'>
          which was, as his wife Hennie once remarked, <em>"halfway to the moon"</em>
        </FauxAnnotation>
        but also to think deeply about how civilizations develop and how and why reactionary movements may occur. In his influential work <em>"The open society and its enemies"</em> he defines key elements of an open society including democracy, secularism, human rights, freedom of the mind, freedom of the word, and freedom of the press, as well as political transparency and tolerance
        <FauxAnnotation id='intro-3-9'>
          Sir Karl was well aware that tolerance is no recipe against intolerance. To put it in his own words: <em>"Unlimited tolerance must lead to the disappearance of tolerance. If we extend unlimited tolerance even to those who are intolerant, if we are not prepared to defend a tolerant society against the onslaught of the intolerant, then the tolerant will be destroyed, and tolerance with them"</em>.
        </FauxAnnotation>
        . He maintained that an open society should never close itself to new input because knowledge is never complete, but ongoing. While this all probably sounds reasonable and appealing, Sir Karl emphasized that an open society does not come at no cost. At its center he places the critical and dedicated individual. This in turn places a significant burden on each of us because in an open society the rational individual has to continually make personal decisions and take responsibility.
      </p>

      <Image src={newZealand}>
        At the roadside in the Canterbury region on the South Island, New Zealand.
        In 1937, one year before the annexation of his Austrian home country to Nazi-Germany, Karl Popper emigrated to New Zealand to lecture at the University of Christchurch.
        It was there, in this remote part of the free world, where he wrote one of his most influential books, <em>“The open society and its enemies”</em>
        {' '}
        <em>(Image credit: <Link to='https://flic.kr/p/dJgqRG' target='_blank'>Colin Capelle</Link>, CC-BY)</em>.
      </Image>

      <p>
        Science clearly thrives best in an open society. In fact there is positive feedback involved: an open society is conducive to the development of scientific minds and the acquisition of new knowledge, which in turn strengthens the humanitarian values upon which the open society is based. It is in this very spirit of an open society that <Link to='http://www.capeia.com'>capeia.com</Link> has been conceived
        <FauxAnnotation id='intro-3-10'>
          and we herewith express our sneaking hope that Sir Karl would have liked it
        </FauxAnnotation>
        . We cordially invite you to be critical and dedicated participants.
      </p>
      <p>
        Enjoy it!
      </p>

      <IntroNavigation page={3} />

    </TextBody>
  </TextContainer>

export default withStyles(s)(IntroTwo)
