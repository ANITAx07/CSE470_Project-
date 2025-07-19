const bcrypt = require('bcryptjs');

bcrypt.hash('admin123', 10).then(hash => {
  console.log('Copy this hash into MongoDB:', hash);
});
