static ![Build Status](http://build.mc-api.net/buildStatus/icon?job=mcapi)
======

Static content for [mc-api.net](https://mc-api.net).

Powered by [njb-said/webserver](https://github.com/njb-said/webserver) and [nginx](http://nginx.org/)

Contributing
======
Please do the following:
- Use spaces not tabs
- Submit a pull request

Once your pull request has been approved we will restart all mirrors and your changes will be live!

**Variables** can be used within your page to display content which will be replaced by the server.

Current variable list:
- ```#YEAR#``` - Displays the current year on the server
- ```#REGION#``` - Displays the region the server is in (US, EU)
- ```#SERVERID#``` - Displays the name of the server (Delta, Iota, Zeus)
- ```#HOST#``` - Displays the hostname being used, for example ``eu.mc-api.net``
- ```#FLAG#``` - Displays a flag representing the country the server is in
- ```#GA#``` - Displays the google analytics tracking id for the region

Mirrors
======
| Hostname        | Location           | Host  | Enum Constant |
| ------------- |:-------------:|:-----:|:---------:|
| [eu.mc-api.net](https://eu.mc-api.net)      | Roubaix, France | [OVH](http://imnjb.me/donate) | EU |
| [us.mc-api.net](https://us.mc-api.net)      | New York City, USA | [DigitalOcean](https://www.digitalocean.com/?refcode=f8c7ada39e1b) | US |

AU is being replaced with another region as it was least used (less than 500 requests per month)