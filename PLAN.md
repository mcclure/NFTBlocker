Current status:

- Clone of "Twitter block chain plugin", no modifications
- Change "block all users" to use ext_has_nft_avatar filter.
- Successful test

TODO:

- Remove legacy twitter mode (MobileTwitter class is now the only Twitter)
- Chain-block on any page (notifications, feed, thread) should work
- There should be an autoblock feature on notification pages (at least) without using the menu every time. (This is the most important feature we could add.)
- Settings pane (should autoblocking be on? should people you follow be exempt from blocking?)
- Plugin should keep a log of blocked users that can be imported into the "Unblock" feature
- Plug in to redux (?) so autoblocking can happen without making Twitter-detectable network queries. BetterTweetDeck sends this snippet:

        const reduxStore = document.getElementById('react-root')._reactRootContainer._internalRoot.current.memoizedState.element.props.children.props.store;
		const users = reduxStore.getState().entities.users.entities;
		const nftUsers = Object.values(users).filter(i => i.has_nft_avatar)

- Current implementation checks for "ext_" user key. One assumes when the feature leaves beta, the ext_ will get dropped.
- Add rate limit? Twitter appears to poison your cookie if you block more than 500 people over too short a time.
- Chrome version
- Chrome/Firefox store version

NICE TO HAVE:

- Detect "#NFT" hashtag in profile bio
- (Bug inherited from Twitter Block Chain) Export chain always shows "0 users"
