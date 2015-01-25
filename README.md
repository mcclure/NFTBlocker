# Twitter Block Chain

This chrome extension helps users who have been retweeted and are likely to be, or currently being dog-piled.
By navigating to a user's followers (or following) page and activating the plugin or clicking the injected "Block All" button,
you can block all users on that page.

# FAQs 

Why isn't the Block All button appearing?

In the current version of the extension, the Block All button will only appear after refreshing the follower/following page. 
Web twitter uses history modification to change the address bar, rather than hard links to new pages. So the Block All button
is never injected. This should be fixed in a future version. The plugin can still be activated by clicking the extension's icon
near the omnibox.

I'm trying to use this as an unpacked extension and it isn't working?

You'll need to include jquery-1.11.2.min.js in the project folder.