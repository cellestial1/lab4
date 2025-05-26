const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static(__dirname));
app.use(express.json());

// Тимчасове збереження користувачів
const users = [];

app.post('/register', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password || password.length < 6 || !email.includes('@')) {
    return res.status(400).json({ message: 'Некоректні дані' });
  }

  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return res.status(409).json({ message: 'Користувач з таким email вже існує' });
  }

  users.push({ email, password }); 
  return res.json({ message: 'Реєстрація успішна!' });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Невірний логін або пароль' });
  }

  return res.json({ message: `Ласкаво просимо, ${email}!` });
});

app.listen(PORT, () => {
  console.log(`Сервер працює: http://localhost:${PORT}`);
});
