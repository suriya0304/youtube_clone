import User from '../models/Users.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
//SIGN UP AND CREATE USER USER
export const signup = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hash });
    await newUser.save();
    res.status(200).send('user have been created');
  } catch (err) {
    next(err);
    console.log('error occured during user sign up', err);
  }
};

//SIGN IN USER
export const signin = async (req, res, next) => {
  try {
    const user = await User.findOne({ name: req.body.name });
    if (!user) {
      return console.log('user not found');
    }
    const isCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isCorrect) {
      return res.status(400).send('wrong password!');
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT);
    const { password, ...others } = user._doc;
    console.log(others);
    res
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .status(200)
      .json(others);
  } catch (err) {
    next(err);
    console.log('error occured during user sign in', err);
  }
};

export const logout = (req, res) => {
  res.clearCookie('access_token');
  res.status(200).send('logged out');
};

export const googleAuth = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    console.log('google auth', user);
    if (!user) {
      user = new User({ ...req.body, fromGoogle: true });
      await user.save();
      console.log('create new user', user);
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT);
    res
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .status(200)
      .json(user._doc);
  } catch (err) {
    res.send(err);
    console.log('error occured during user google auth', err);
  }
};
