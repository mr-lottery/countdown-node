// Require express and create an instance of it
var express = require('express');
var app = express();
const { body, validationResult, } = require('express-validator')
const multer = require('multer')
var cors = require('cors')

function resp(data = {}, msg = 'suc', code = 200, err = null) {
  return { data, msg, code, err }
}

app.use(cors())
app.options('*', cors())

app.post('/',
  multer().none(),
  body('email').isEmail(),
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).send(resp(undefined, 'لطفا اطلاعات را صحیح وارد کنید', 400, errors.array()))

    const fs = require('fs')

    var logStream = fs.createWriteStream('emails.txt', { flags: 'a' });
    logStream.write(req.body.email + '\n')

    res.send(resp(req.body.email, 'اطلاعات ثبت شد'))
  })

// start the server in the port 3000 !
app.listen(3000, function () {
  console.log('Example app listening on port 3000.');
});