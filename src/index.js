'use strict';

const CreditCard = require('../models/CreditCard');
const Merchant = require('../models/Merchant');
const Reward = require('../models/Reward');
const axios = require('axios');
const cheerio = require('cheerio');
const { url } = require('../constant/constant');

// base-repetitive-element
const baseElement = `div#sb-site>div#mainContainer.inner>div.contentContainer>div.pageContent.clearfix`;
// helper function
const fetchHTML = async(url) => {
    const { data } = await axios.get(url);
    return cheerio.load(data);
}

// scrap credit-card
const scrapCreditCard = async() => {
    const model = [];

    const $ = await fetchHTML(url);
    const data = $(`${baseElement}>div.yro-sorter>div.row.clearfix>div.col-md-4.col-sm-6>div.selectBg>.typeSelect`);

    // get-in-depth
    const res = data.find('option').each((i, v) => {
        model[i] = new CreditCard($(v).val(), $(v).text());
    });

    return model;
}

// scrap merchants
const scrapMerchants = async() => {
    const model = [];

    const $ = await fetchHTML(url);
    const data = $(`${baseElement}>div.yro-container.clearfix>div.yroContent.col-sm-12`);

    // get-in-depth
    const res = data.find('div.yro-promo-block.clearfix').map((i, v) => {
        const imgSrc = $(v).find('img').attr('src');
        const title = $(v).find('span.title').text();

        model[i] = new Merchant(title, imgSrc);
    });

    return model;
}

// scrap rewards
const scrapRewards = async() => {
    const model = [];

    const $ = await fetchHTML(url);
    const data = $(`${baseElement}>div.yro-container.clearfix>div.yroContent.col-sm-12`);

    // get-in-depth
    const res = data.find('div.yro-promo-block.clearfix').map((i, v) => {
        const imgSrc = $(v).find('img').attr('src');
        const title = $(v).find('span.title').text();
        const reward = $(v).find('div.col-md-9>p').text();

        const merchant = new Merchant(title, imgSrc);
        model[i] = new Reward(merchant, reward);
    });

    return model;
}

module.exports = {
    scrapCreditCard,
    scrapMerchants,
    scrapRewards
}