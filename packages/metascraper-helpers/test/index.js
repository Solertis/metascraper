'use strict'

const should = require('should')

const {
  isImageUrl,
  isAudioUrl,
  isVideoUrl,
  isVideoExtension,
  isAudioExtension,
  isImageExtension,
  isMime,
  extension,
  absoluteUrl,
  description,
  url
} = require('..')

describe('metascraper-helpers', () => {
  it('.url', () => {
    should(url()).be.null()
    should(url(null)).be.null()
    should(url('')).be.null()
    should(url('', { url: 'https://kikobeats.com/' })).be.null()
    should(url('paco')).be.null()
    should(url(NaN, { url: 'https://kikobeats.com' })).be.null()
    should(url('http://<foo>', { url: 'https://kikobeats.com' })).be.null()

    should(url('blog', { url: 'https://kikobeats.com/' })).be.equal(
      'https://kikobeats.com/blog'
    )

    should(
      url(
        'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
      )
    ).be.equal(
      'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
    )
    should(
      url(
        'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
        { url: 'https://kikobeats.com/' }
      )
    ).be.equal(
      'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
    )
    should(
      url('magnet:?xt=urn:btih:c12fe1c06bba254a9dc9f519b335aa7c1367a88a', {
        url: 'https://kikobeats.com/'
      })
    ).be.equal('magnet:?xt=urn:btih:c12fe1c06bba254a9dc9f519b335aa7c1367a88a')
    should(
      url(
        'http://cdn2.cloudpro.co.uk/sites/cloudprod7/files/4/29//handshake_0.jpg',
        {
          url: 'http://www.cloudpro.co.uk/go/6024'
        }
      )
    ).be.equal(
      'http://cdn2.cloudpro.co.uk/sites/cloudprod7/files/4/29/handshake_0.jpg'
    )
  })

  it('.absoluteUrl', () => {
    should(
      absoluteUrl(
        'https://kikobeats.com/',
        'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
      )
    ).be.equal(
      'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
    )
    should(absoluteUrl('https://kikobeats.com/', '')).be.equal(
      'https://kikobeats.com/'
    )
    should(absoluteUrl('https://kikobeats.com/', null)).be.equal(
      'https://kikobeats.com/'
    )
    should(absoluteUrl('https://kikobeats.com/', undefined)).be.equal(
      'https://kikobeats.com/'
    )
    should(absoluteUrl('https://kikobeats.com/', 'blog')).be.equal(
      'https://kikobeats.com/blog'
    )
    should(absoluteUrl('https://kikobeats.com', '/blog')).be.equal(
      'https://kikobeats.com/blog'
    )
    should(absoluteUrl('https://kikobeats.com/', '/blog')).be.equal(
      'https://kikobeats.com/blog'
    )
    should(absoluteUrl('http://kikobeats.com/', '/blog')).be.equal(
      'http://kikobeats.com/blog'
    )
  })

  it('.extension', () => {
    should(extension('.mp4')).be.equal('mp4')
    should(extension('.mp4#t=0')).be.equal('mp4')
    should(extension('.mp4?foo=bar')).be.equal('mp4')
    should(extension('.mp4?foo=bar#t=0')).be.equal('mp4')
  })

  it('.isMime', () => {
    should(isMime('image/jpeg', 'image')).be.true()
    should(isMime('image/png', 'image')).be.true()
    should(isMime('image/gif', 'video')).be.true()
    should(isMime('video/mp4', 'video')).be.true()
    should(isMime('audio/x-aac', 'audio')).be.true()
    should(isMime('audio/x-wav', 'audio')).be.true()
    should(isMime('audio/mp3', 'audio')).be.true()
  })

  it('.isVideoUrl', () => {
    should(isVideoUrl('demo.mp4')).be.false()
    should(isVideoUrl('/demo.mp4')).be.false()
    should(isVideoUrl('https://microlink.io/demo.mp4')).be.true()
    should(isVideoUrl('https://microlink.io/demo.gif')).be.true()
  })

  it('.isImageUrl', () => {
    should(isVideoUrl('demo.png')).be.false()
    should(isVideoUrl('/demo.png')).be.false()
    should(isImageUrl('https://microlink.io/demo.png')).be.true()
    should(isImageUrl('https://microlink.io/demo.jpg')).be.true()
    should(isImageUrl('https://microlink.io/demo.jpeg')).be.true()
  })

  it('.isAudioUrl', () => {
    should(isAudioUrl('demo.mp3')).be.false()
    should(isAudioUrl('/demo.mp3')).be.false()
    should(isAudioUrl('https://microlink.io/demo.mp3')).be.true()
    should(isAudioUrl('https://microlink.io/demo.wav')).be.true()
    should(isAudioUrl('https://microlink.io/demo.aac')).be.true()
    should(isAudioUrl('https://microlink.io/demo.wav')).be.true()
    should(isAudioUrl('https://microlink.io/demo.m4a')).be.true()
  })

  it('.isVideoExtension', () => {
    should(isVideoExtension('https://microlink.io/demo.mp4')).be.true()
    should(isVideoExtension('demo.mp4')).be.true()
    should(isVideoExtension('demo.gif')).be.true()
  })

  it('.isAudioExtension', () => {
    should(isAudioExtension('https://microlink.io/demo.mp3')).be.true()
    should(isAudioExtension('demo.mp3')).be.true()
    should(isAudioExtension('demo.wav')).be.true()
    should(isAudioExtension('demo.aac')).be.true()
    should(isAudioExtension('demo.wav')).be.true()
    should(isAudioExtension('demo.m4a')).be.true()
  })

  it('.isImageExtension', () => {
    should(isImageExtension('https://microlink.io/demo.png')).be.true()
    should(isImageExtension('demo.png')).be.true()
    should(isImageExtension('demo.jpg')).be.true()
    should(isImageExtension('demo.jpeg')).be.true()
  })

  it('.description', async () => {
    should(
      description(
        'Let me tell you the story of two investors, neither of whom knew each other, but whose paths crossed in an interesting way. Grace Groner was orphaned at age 12. She never married. She never had kids. She never drove a car. She lived most of her life alone in a one-bedroom house and worked her whole career as a secretary. She was, by all accounts, a lovely lady. But she lived a humble and quiet life. That made the $7 million she left to charity after her death in 2010 at age 100 all the more confusing. People who knew her asked: Where did Grace get all that money? But there was no secret. There was no inheritance. Grace took humble savings from a meager salary and enjoyed eighty years of hands-off compounding in the stock market. That was it. Weeks after Grace died, an unrelated investing story hit the news. Richard Fuscone, former vice chairman of Merrill Lynch’s Latin America division, declared personal bankruptcy, fighting off foreclosure on two homes, one of which was nearly 20,000 square feet and had a $66,000 a month mortgage. Fuscone was the opposite of Grace Groner; educated at Harvard and University of Chicago, he became so successful in the investment industry that he retired in his 40s to “pursue personal and charitable interests.” But heavy borrowing and illiquid investments did him in. The same year Grace Goner left a veritable fortune to charity, Richard stood before a bankruptcy judge and declared: “I have been devastated by the financial crisis … The only source of liquidity is whatever my wife is able to sell in terms of personal furnishings.” The purpose of these stories is not to say you should be like Grace and avoid being like Richard. It’s to point out that there is no other field where these stories are even possible. In what other field does someone with no education, no relevant experience, no resources, and no connections vastly outperform someone with the best education, the most relevant experiences, the best resources and the best connections? There will never be a story of a Grace Groner performing heart surgery better than a Harvard-trained cardiologist. Or building a faster chip than Apple’s engineers. Unthinkable. But these stories happen in investing. That’s because investing is not the study of finance. It’s the study of how people behave with money. And behavior is hard to teach, even to really smart people. You can’t sum up behavior with formulas to memorize or spreadsheet models to follow. Behavior is inborn, varies by person, is hard to measure, changes over time, and people are prone to deny its existence, especially when describing themselves. Grace and Richard show that managing money isn’t necessarily about what you know; it’s how you behave. But that’s not how finance is typically taught or discussed. The finance industry talks too much about what to do, and not enough about what happens in your head when you try to do it. This report describes 20 flaws, biases, and causes of bad behavior I’ve seen pop up often when people deal with money. 1. Earned success and deserved failure fallacy: A tendency to underestimate the role of luck and risk, and a failure to recognize that luck and risk are different sides of the same coin. I like to ask people, “What do you want to know about investing that we can’t know?” It’s not a practical question. So few people ask it. But it forces anyone you ask to think about what they intuitively think is true but don’t spend much time trying to answer because it’s futile. Years ago I asked economist Robert Shiller the question. He answered, “The exact role of luck in successful outcomes.” I love that, because no one thinks luck doesn’t play a role in financial success. But since it’s hard to quantify luck, and rude to suggest people’s success is owed to luck, the default stance is often to implicitly ignore luck as a factor. If I say, “There are a billion investors in the world. By sheer chance, would you expect 100 of them to become billionaires predominately off luck?” You would reply, “Of course.” But then if I ask you to name those investors – to their face – you will back down. That’s the problem. The same goes for failure. Did failed businesses not try hard enough? Were bad investments not thought through well enough?'
      )
    ).be.equal(
      'Let me tell you the story of two investors, neither of whom knew each other, but whose paths crossed in an interesting way. Grace Groner was orphaned at age 12. She never married. She never had kids. She never drove a car. She lived most of her life alone in a one-bedroom house and worked her whole …'
    )
  })
})
