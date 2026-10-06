import jwt from 'jsonwebtoken';

export const login = (req, res) => {
  const { email, password } = req.body;

  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign({ id: 'admin', email }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    res.json({
      success: true,
      token,
      user: {
        email
      }
    });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
};

export const getMe = (req, res) => {
  res.json({
    success: true,
    user: req.user
  });
};
