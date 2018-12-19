//*********************************************************************************************/
//**********DEPENDENCIES**************************/
const express = require('express');
const bodyParser = require('body-parser');
//**********SETS UP THE EXPRESS APP***************/
const app = express();
const PORT = process.env.PORT || 3001;
//**********REQUIRING OUR MODELS FOR SYNCING******/
const db = require("./models");
//**********DEFINE MIDDLEWARE*********************/
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//**********SERVE UP STATIC ASSETS****************/
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}
//**********ADD ROUTES****************************/
require("./routes/html-routes.js")(app);
require("./routes/symbols-api-routes.js")(app);
require("./routes/stocks-api-routes.js")(app);
require("./routes/user-api-routes.js")(app);
require("./routes/sold-api-routes.js")(app);
//**********SYNCING OUR SEQUELIZE MODELS AND STARTING THE SERVER****************/
db.sequelize.sync({ }).then(function() {
    app.listen(PORT, function() {
        console.log("App listening on PORT " + PORT);
    });
});
