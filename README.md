static ![Build Status](http://build.mc-api.net/buildStatus/icon?job=mcapi)
======

Static content for [mc-api.net](https://mc-api.net).

Contributing
======
Please do the following:
- Use spaces not tabs
- Submit a pull request

Once your pull request has been approved, it will be deployed to our servers.

**Variables** can be used within your page to display content which will be replaced by the server.

Current variable list:
- ```#YEAR#``` - Displays the current year on the server
- ```#REGION#``` - Displays the region the server is in (US, EU)
- ```#FLAG#``` - Displays a flag representing the country the server is in
- ```#HOST#``` - Displays the hostname being used, for example ``eu.mc-api.net``
- ```#GA#``` - Displays the google analytics tracking id for the region
- ```#VERSION#``` - Displays the backend version the api server is running

Mirrors
======
| Hostname        | Location           | Host  | Enum Constant |
| ------------- |:-------------:|:-----:|:---------:|
| [eu.mc-api.net](https://eu.mc-api.net)      | Roubaix, France | [DigitalOcean](https://www.digitalocean.com/?refcode=f8c7ada39e1b) | EU |
| [us.mc-api.net](https://us.mc-api.net)      | New York City, USA | [DigitalOcean](https://www.digitalocean.com/?refcode=f8c7ada39e1b) | US |

There was previously an AU region, it may come back in the future however it was least used (less than 500 requests per month)
