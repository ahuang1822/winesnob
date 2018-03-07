const router = require('express').Router()
const { List, Order, Wine } = require('../db/models')
module.exports = router
const nodemailer = require('nodemailer');

router.get('/', (req, res, next) => {
  Order.findAll()
    .then(orders => {
      res.json(orders)
    })
    .catch(next)
})

router.post('/', (req, res, next) => {
  Order.create(req.body)
    .then(order => res.json(order))
    .catch(next)
})


router.param('orderId', (req, res, next, id) => {
  Order
    .findById(id, {
      include: [{
        model: List,
        as: 'lists', include: [{
          model: Wine, as: 'wine'
        }]
      }]
    })
    .then(order => {
      if (!order) {
        const err = Error('order not found!');
        err.status = 404;
        throw err;
      }
      req.order = order;
      next();
      return null;
    })
    .catch(next);
});


router.get('/:orderId', (req, res, next) => {
  res.json(req.order);
})

router.put('/:orderId', (req, res, next) => {
  req.order
    .update(req.body, { returning: true })
    .then((order) => {
      req.session.order = null;
      res.status(200).json(order)
      nodemailer.createTestAccount((err, account) => {
        // create reusable transporter object using the default SMTP transport
        console.log(err)
        let transporter = nodemailer.createTransport({
          host: 'smtp.ethereal.email',
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: 'ii6bmobkouhaxgxj@ethereal.email', // generated ethereal user
            pass: 'G3b6hXKuVEkQGjePnf' // generated ethereal password
          }
        });

        // setup email data with unicode symbols
        let mailOptions = {
          from: '<winessnob@example.com>', // sender address
          to: 'whirleyt@outlook.com', // list of receivers
          subject: 'Order Confirmation', // Subject line
          text: 'Hi! Thank you for shopping with us at Winesnob.com. Cheers!', // plain text body
          html: '<b>WineSnob</b>' // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return console.log(error);
          }
          console.log('Message sent: %s', info.messageId);
          // Preview only available when sending through an Ethereal account
          console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

          // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
          // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        });
      });
    })
})

