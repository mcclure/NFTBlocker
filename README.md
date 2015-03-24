# Twitter Block Chain

This chrome extension helps users who have been retweeted and are likely to be,
or currently being dog-piled.
By navigating to a user's followers (or following) page and activating the 
plugin, you can block all users on that page.

# FAQs 

I'm trying to use this as an unpacked extension and it isn't working?

You'll need to include jquery-1.11.2.min.js in the project folder.

How do I activate the plugin?

Browse to a following/followers page on twitter and click the icon in the 
toolbar on Chrome. If it says you're not on a following/followers page, try 
refreshing first.

How do I stop the blocking?

Click the X in the top right corner of the blocking report to stop all 
blocking. Note that this will not unblock any users you have already blocked.

How do I figure out who I blocked, and who they were following/followed by?

Right click the extension icon in Chrome and click Options. You can view all 
blocks made on this page, including searching by username. Blocks are stored 
locally, and not synced to the cloud.

# To Do / Possible Features

* Output a JSON object of users from a page, to later feed into the extension.
* Whitelist 
