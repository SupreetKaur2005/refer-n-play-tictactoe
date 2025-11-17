require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');
const Config = require('./models/Config');

const PORT = process.env.PORT || 5000;

(async function start() {
    await connectDB(process.env.MONGODB_URI || 'mongodb://localhost:27017/referearn');

    // seed config if not present
    try {
        const found = await Config.findOne({ key: 'referralReward' });
        if (!found) {
            await Config.create({ key: 'referralReward', value: 50 });
            console.log('Seeded referralReward = 50');
        }
    } catch (e) {
        console.warn('Config seed error', e);
    }

    // IMPORTANT for Render
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Server running on port ${PORT}`);
    });
})();
//  huhuhu