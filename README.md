# WEB102 Project 4 - _Veni Vici!_

Submitted by: **Paris-Riana Campbell**

This web app: **A "StumbleUpon"-style cat discovery app. Click "Discover!" to fetch a random cat from The Cat API, showing its image and four attributes (breed, origin, life span, temperament). Click any attribute to add it to a ban list so cats with that value stop appearing.**

Time spent: **2** hours spent in total

## Required Features

The following **required** functionality is completed:

- [x] **Application features a button that creates a new API fetch request on click and displays at least three attributes and an image obtained from the returned JSON data**
  - [x] The type of attribute displayed for each image should be consistent across API calls (i.e. if the app displays the color, breed, and age of a cat, subsequent button clicks should also result in the color, breed, and age being displayed)
- [x] **Only one item/API call is viewable at a time and at least one image is displayed per API call**
  - [x] A single result of an API call is displayed at a time
  - [x] Displayed attributes should match the displayed image
  - [x] There is at least one image per API call
- [x] **API call response results should appear random to the user**
- [x] **Clicking on a displayed value for one attribute adds it to a displayed ban list**
  - [x] At least one attribute for each API result should be clickable
  - [x] Clicking on a clickable attribute not on the ban list, adds it to the ban list
  - [x] Clicking on an attribute in the ban list removes it from the ban list
- [x] **Attributes on the ban list prevent further images/API results with that attribute from being displayed**

The following **optional** features are implemented:

- [x] Multiple types of attributes are clickable and can be added to the ban list
- [x] Users can see a stored history of their previously viewed items from this session

The following **additional** features are implemented:

- [x] Responsive layout for mobile screens

## Video Walkthrough

Here's a walkthrough of implemented features:

<!-- TODO: Replace the line below with your own GIF. Record with LICEcap, Kap, or ScreenToGif, then drag the file into this README on GitHub. -->

<img src='' title='Video Walkthrough' width='' alt='Video Walkthrough' />

GIF created with ...

## Notes

The Cat API occasionally returns images without breed data, so the app retries a
few times per click to ensure a valid, non-banned result is shown.

## License

    Copyright 2026 Paris-Riana Campbell

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
