const index = require('./src/index');

async function boostrap() {
    const credits = await index.scrapCreditCard();
    const merchants = await index.scrapMerchants();
    const rewards = await index.scrapRewards();

    console.log(credits);
    console.log(merchants);
    console.log(rewards);
}

// run-it
boostrap();