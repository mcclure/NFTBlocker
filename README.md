# Twitter Block Chain

This browser extension helps users who are likely to be, or currently are being dog-piled.
By navigating to a user's followers (or following) page and activating the 
plugin, you can block all users on that page.

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

# To Do / Possible Features

* Option to mute users instead of blocking them.
* Option to skip users that are following you, but you are not following them.
