// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      console.log('Request Body:', req.body); // Log the request body to check what is coming
  
      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // Ensure password is being passed correctly
      if (!password) {
        return res.status(400).json({ message: 'Password is required' });
      }
  
      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
  
      // Log to check if password comparison is successful
      console.log('Password Match:', isMatch);
  
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      // Include the role in the response
      res.json({ token, username: user.username, role: user.role });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  });
  