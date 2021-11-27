Current status:

- Clone of "Twitter block chain plugin", no modifications
- Change "block all users" to use graphql filter.
- Successful test

TODO:

- Remove legacy twitter mode (MobileTwitter class is now the only Twitter)
- Block on page (notifications, feed, thread) should work
- Autoblock feature on notification pages
- Log for autoblock feature
- Plug in to redux (?) so no redundant graphql queries
- Also catch non-"ext_" graphql key?
- Rate limit?
- Chrome version.
- Chrome/Firefox store version.

NICE TO HAVE:

- Detect "#NFT" hashtag in profile bio
- (Bug inherited from Twitter Block Chain)