# Start Scrap-CC
## Prerequisites
- nodejs installed

## How to start
- type `npm install` in root of project
- type `npm run start` to start project
- see console/terminal to view the results

## Tools
- simple axios to request to url
- cheerio to scrap the data

# Code Workflow
## System Design
![crawler-design]('./system-desing/Crawler - [Abdul Salam].png')

## About the code (achieve of what)
this code works with simple library (axios and cheerio), to get the data and mapping it into several classes model.
1. First, defined the ```base_url``` to be scrapped
2. There 3 models to mapping the result into that `datamap` (CreditCard, Merchant, Reward / plain js class with constructor that accepts arguments)
3. Go to main process, caught all the html raw from the `base_url` using axios and return it as cheerio variable
4. Find any element that needed to be displayed as a result using cheerio (for example:)
    - want to display `credit_card` data from `base_url`
    - select the corresponding element (`div#sb-site>div#mainContainer.inner>div.contentContainer>etc..`)
    - after that, mapping the text into `CreditCard` model
    - return the array of result
5. since, there's repetitive element for every data that want to take, so there's exist `base_element` (some repetitive element variable that can reusable)

## Assumption
- this is in the development mode (defined in `constant` file)
- run asynchronous
- only displayed page that being scrapped

## Production ready (need of what?)
- better data schema of the requirement that need to be scrapped