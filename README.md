**Warning: Twitter monitors accounts for automated activity. This plugin is literally automated activity and may trip Twitter's bot detection. If you use this plugin, you will probably be required at some point to give Twitter your phone number to prove you are not a bot.** If after performing a mass block you find Twitter pages are no longer loading, try deleting your cookie, rebooting your browser and re-logging in.

Instead of using this browser plugin, I recommend [Better Tweetdeck](https://better.tw/), which has a feature to mute NFT users (Twitter cannot detect this), or the [Antsstyle NFT Blocker](https://antsstyle.com/nftcryptoblocker/) app, which is fully compliant with the Twitter TOS (although it does require access privileges to your account).

## What is this?

This is a browser plugin that blocks people who use Twitter's NFT integration.

## What's an "NFT"?

Investment scam.

## Why would you want to block NFT users?

Three reasons.

1. Because it is designed in a foolish way, the NFT system has a shocking amount of impact on global warming. The more demand there is to buy and sell NFTs, the higher the value of energy-wasting ("proof of work") cryptocurrencies goes and the more coal and oil these networks will burn. I don't want to be in a community with people who support that.

2. The NFT market is rife with scams and art theft.

3. In short, NFT users are just irritating to be around. People who bought NFTs have to keep hyping other people to buy NFTs or the NFTs they bought will lose value. Twitter NFT cliques are rife with sockpuppet accounts, dogpiling and indifferentiable monkey clones. Blocking NFT users just makes Twitter nicer.

## How does this work?

Twitter has a feature (currently in closed beta) where you can showcase an NFT in your profile. Probably they are doing this because Jack Dorsey is invested in cryptocurrency and if Twitter makes NFTs more popular, Jack Dorsey will make money.

This is a Firefox plugin that detects that feature in use. It adds a menu that you can use on a "Follower" or "Following" page:

![Picture of menu](howto.png)

If you select this, everyone on the page with the beta "NFT avatar" flag will be blocked.

This is an early prototype. Future versions of this plugin will scan your notifications and do the blocking automatically.

## How do I install this?

You need the file `blockchain.zip`. If you know what this means, you can build it yourself by running:

	npm install
	npx bower install
	npx grunt build-chrome

Or you can download a blockchain.zip from the "releases" button to the right of this text.

Once you have the zip file, go to `about:debugging#/runtime/this-firefox` in the Firefox URL bar. Click "load temporary add-on" and select blockchain.zip. Warning, **installing extensions this way is dangerous**. If I were evil, the blockchain.zip I uploaded could be stealing your passwords or credit card numbers. Don't install extensions this way unless you trust the source.

![Picture of installation button](install.png)

A future version of this plugin will hopefully be available on the Chrome/Firefox app store. Again, may I recommend [Better Tweetdeck](https://better.tw/) and its NFT-muter feature.

## How can I help?

If you know anything about browser plugins or Twitter-hacking, PRs are appreciated. The project's TODO list is [here](PLAN.md).

# Twitter Block Chain

NFTBlocker is a fork of the [Twitter Block Chain](https://github.com/ceceradio/twitter-block-chain) plugin. The README for Twitter Block Chain is below:

# Installation

Chrome users can install the extension here: [Chrome Web Store](https://chrome.google.com/webstore/detail/twitter-block-chain/dkkfampndkdnjffkleokegfnibnnjfah?hl=en)

Firefox users can install the extension here: [Mozilla Add-ons](https://addons.mozilla.org/en-US/firefox/addon/twitter-block-chain/)

# Build Instructions

* Building requires `grunt` and `grunt-cli`
* Chrome: `grunt build-chrome`

# FAQs 

I'm trying to use this as an unpacked extension and it isn't working?

Run `bower install` first to pull down the dependencies.

How do I activate the plugin?

Browse to a following/followers page on twitter and click the icon in the 
toolbar on Chrome. If it says you're not on a following/followers page, try 
refreshing the page and trying again.

How do I stop the blocking?

Click "Done"

How do I figure out who I blocked, and who they were following/followed by?

Right click the extension icon in Chrome and click Options. You can view all 
blocks made on this page, including searching by username. Blocks are stored 
locally, and not synced to the cloud.
