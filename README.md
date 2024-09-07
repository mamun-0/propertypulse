# Property Pulse

## About

Property Pulse is a dynamic online platform designed to connect property owners with potential renters. It allows owners to list their properties for rent on a nightly, weekly, or monthly basis, similar to the Airbnb model. Users can communicate directly with property owners through the website to inquire or arrange rentals. The website integrates Mapbox to provide precise location mapping, enhancing user experience by allowing renters to easily find properties in their desired locations. This system not only simplifies the rental process but also supports a transparent and direct communication channel between owners and renters.

## Project running procedures

1. Copy the repo link `https://github.com/mamun-0/propertypulse.git`
2. Open terminal and type `npm install <paste-repo-link>`

### Environmental Variables

| Keys                             | Values                                                         |
| -------------------------------- | -------------------------------------------------------------- |
| MONGODB_URI                      | Find your mongodb local or atlas(online)                       |
| NEXT_PUBLIC_DOMAIN               | After deployment domain link or `http://localhost:3000`        |
| NEXT_PUBLIC_API_DOMAIN           | After deployment domain link or `http://localhost:3000/api`    |
| GOOGLE_CLIENT_ID                 | Find google client id from google auth 2.0                     |
| GOOGLE_CLIENT_SECRET             | Same as google client id                                       |
| NEXTAUTH_URL                     | same as `NEXT_PUBLIC_DOMAIN`                                   |
| NEXTAUTH_URL_INTERNAL            | same as `NEXT_PUBLIC_DOMAIN`                                   |
| NEXTAUTH_SECRET                  | random string as your wish like `faskljf787874kjaswkl+*$*7gda` |
| CLOUDINARY_CLOUD_NAME            | Find cloudinary website                                        |
| CLOUDINARY_API_KEY               | Find cloudinary website                                        |
| CLOUDINARY_API_SECRET            | Find cloudinary website                                        |
| NEXT_PUBLIC_GOOGLE_GEOCODING_API | Find this api after enabling geocoding in google               |
| NEXT_PUBLIC_MAPBOX_API           | Find from mapbox website                                       |

After setting all of these credientials perfectly then open terminal in your cloned project root folder and type `npm run dev`

![homepage](https://i.ibb.co.com/vjLb5KT/property-pulse-home-page.png)
