
const { validationResult } = require('express-validator');


const BankAccount = require('../models/bankAccount');
const Transaction = require('../models/transaction');


const { randomInt } = require('crypto');





exports.createBankAccount = (req, res, next) =>
{
    const errors = validationResult(req);
    if (!errors.isEmpty())
    {
        const error = new Error('Validation failed....');
        error.statusCode = 422;
        throw error;
    }


    let accountNumber = 'sabcza00' + randomInt(9999999);
    const accountHolder = req.body.accountHolder;
    const balance = req.body.balance;

    // console.log(accountHolder + accountNumber);

    BankAccount.find({ accountNumber: accountNumber })
        .then(accountNumb =>
        {
            // console.log(accountNumb.accountNumber);
            if (accountNumb)
            {
                return accountNumber = 'sabcza00' + randomInt(9999999);
            }
            // console.log(accountNumb.accountNumber);

        }).then(accountNumb =>
        {
            const bankAccount = new BankAccount({
                accountNumber: accountNumb,
                accountHolder: accountHolder,
                balance: balance
            });
            return bankAccount.save()
        })




        .then(resu =>
        {
            res.status(201).json({ message: 'User created successfuly', BankAccount: resu });
        })
        .catch(err =>
        {
            if (!err.statusCode)
            {
                err.statusCode = 500;
            }
            next(err);
        });
};



// exports.taking = async (req, res, next) =>
// {
//     const { senderId, receiverId, amount } = req.body;


//     const account = await BankAccount.findById(receiverId);

//     if (!account)
//     {
//         throw new Error('Bank account not found');
//     }

//     account.balance += amount;

//     const transaction = new Transaction({
//         sender: senderId, // لأنها عملية إيداع
//         receiver: account._id,
//         amount: amount,
//     });

//     await transaction.save();
//     await account.save();

//     return transaction;
// }





exports.pay = async (req, res, next) =>
{
    try
    {
        const { senderAccNum, receiverAccNum, amount } = req.body;

        const sender = await BankAccount.findOne({ accountNumber: senderAccNum });
        const receiver = await BankAccount.findOne({ accountNumber: receiverAccNum });

        if (!sender)
        {
            throw new Error('Bank account not found');
        }
        if (!receiver)
        {
            throw new Error('Bank account not found');
        }

        let financialError = null;

        if (sender.balance < amount)
        {
            financialError = 'Insufficient balance';
        }

        if (financialError)
        {
            return res.status(400).json({ message: financialError }); // Use "return" here to exit the function
        }

        sender.balance -= amount;
        receiver.balance += amount;

        const transaction = new Transaction({
            sender: sender._id,
            receiver: receiver._id,
            amount: amount,
        });

        await transaction.save();
        await sender.save();
        await receiver.save();

        res.status(200).json({
            message: 'Transaction successful!',
            transaction: transaction,
        });
    } catch (error)
    {
        next(error); // Pass the error to the error handling middleware
    }
};






// exports.pay = async (req, res, next) =>
// {
//     let financialError = null;

//     const { senderAccNum, receiverAccNum, amount } = req.body;

//     try
//     {


//         const sender = await BankAccount.findOne({ accountNumber: senderAccNum });
//         const receiver = await BankAccount.findOne({ accountNumber: receiverAccNum });

//         if (!sender)
//         {
//             throw new Error('Bank account not found');
//         }
//         if (!receiver)
//         {
//             throw new Error('Bank account not found');
//         }

//         if (sender.balance < amount + 99999999999)
//         {
//             financialError = 'Insufficient balance';
//             // throw new Error('Insufficient balance');
//         }

//         sender.balance -= amount;
//         receiver.balance += amount;

//         const transaction = new Transaction({
//             sender: sender._id,
//             receiver: receiver._id,
//             amount: amount,
//         });
//         if (financialError)
//         {
//             res.status(400).json({ message: financialError });
//             throw new Error('Insufficient balance');// يمكن تغيير الكود الاستجابي ورمي الاستثناء الخاص بالحالة المالية هنا
//         } else
//         {
//             await transaction.save();
//             await sender.save();
//             await receiver.save();

//             res.status(200).json({
//                 message: 'transaction successfully!',
//                 transaction: transaction,
//             });
//         }


//     }
//     catch (error)
//     {
//         next(error); // Pass the error to the error handling middleware
//     }

// }


exports.getBalance = async (req, res, next) =>
{
    const accountnum = req.params.accountnum;

    try
    {
        const account = await BankAccount.findOne({ accountNumber: accountnum });

        if (!account)
        {
            throw new Error('Bank account not found');
        }
        // console.log(account);
        res.status(200).json({
            message: 'Bank account retrieved successfully!',
            balance: account.balance,
        });
    } catch (error)
    {
        next(error);
    }
};

exports.getAccounts = async (req, res, next) =>
{
    // const accountId = req.params.accountId; // Get the accountId from the URL parameter

    try
    {
        const accounts = await BankAccount.find();

        if (!accounts)
        {
            throw new Error('Bank accounts not found');
        }

        res.status(200).json({
            message: 'Bank accounts retrieved successfully!',
            accounts: accounts,
        });
    } catch (error)
    {
        next(error); // Pass the error to the error handling middleware
    }
};

















// exports.getBalance = async (req, res, next) =>
// {
//     const accountId = req.body;
//     const account = await BankAccount.findById(accountId);

//     if (!account)
//     {
//         throw new Error('Bank account not found');
//     }

//     return account
//         .then(
//             res.status(201).json({
//                 message: 'Event booked successfully!',
//                 account: account
//             })
//         )



// }




