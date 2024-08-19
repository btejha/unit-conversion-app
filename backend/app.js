const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const conversionRoutes = require('./routes/conversionRoutes');
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Unit Conversion API');
})
app.use('/api', conversionRoutes);

app.use(express.static(path.join(__dirname, 'frontend/dist')));

/*app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`);
});*/

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/dist/index.html'));
});
// Export the app
module.exports = app;

// Start the server only if the script is run directly
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}