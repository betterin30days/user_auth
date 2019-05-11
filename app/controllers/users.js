const auth = require('../auth');

exports.register = async (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    const result = await auth.registerUser(username, password);
    if (result.success) {
      res.status(201).json({ username });
    } else {
      res.status(422).json({ error: result.message });
    }
  } else {
    res.status(400).json({ error: 'Data is invalid' });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    const result = await auth.loginUser(username, password);
    if (result.success) {
      res.status(200).json({ token: result.token, username });
    } else {
      res.status(401).json({ error: result.message });
    }
  } else {
    res.status(400).json({ error: 'Data is invalid' });
  }
};

exports.confirmToken = async (req, res) => {
  const { username, token } = req.body;
  if (username && token) {
    const result = await auth.authorizeUser(username, token);
    if (result.success) {
      res.status(200).json({ username });
    } else {
      res.status(401).json({ error: result.message });
    }
  } else {
    res.status(401).json({ error: 'User is not authenticated!' });
  }
};

exports.logout = async (req, res) => {
  const username = req.body.username;
  if (username) {
    await auth.logout(username);
    res.status(200);
  } else {
    res.status(400).json({ error: 'Data is invalid' });
  }
};
