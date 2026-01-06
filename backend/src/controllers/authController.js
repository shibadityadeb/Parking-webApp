import bcrypt from 'bcrypt';
import supabase from '../services/supabase.js';
import { generateToken } from '../middleware/auth.js';

const SALT_ROUNDS = 10;

/**
 * Fixed role-based passwords
 * ADMIN password: admin123
 * MANAGER password: manager123
 */
const ROLE_PASSWORDS = {
  ADMIN: 'admin123',
  MANAGER: 'manager123',
};

/**
 * POST /auth/signup
 * Register a new user
 */
export const signup = async (req, res) => {
  try {
    const { name, email, role, password } = req.body;

    // Validate inputs
    if (!name || !email || !role || !password) {
      return res.status(400).json({
        error: 'Missing required fields: name, email, role, password',
      });
    }

    // Validate role
    const validRoles = ['ADMIN', 'MANAGER'];
    if (!validRoles.includes(role.toUpperCase())) {
      return res.status(400).json({
        error: 'Invalid role. Must be ADMIN or MANAGER',
      });
    }

    const upperRole = role.toUpperCase();

    // Validate password matches role
    if (password !== ROLE_PASSWORDS[upperRole]) {
      return res.status(400).json({
        error: `Invalid password for ${upperRole} role`,
      });
    }

    // Check if user already exists
    const { data: existingUser, error: checkError } = await supabase
      .from('users')
      .select('email')
      .eq('email', email.toLowerCase())
      .single();

    if (existingUser) {
      return res.status(409).json({ error: 'User already exists with this email' });
    }

    if (checkError && checkError.code !== 'PGRST116') {
      // PGRST116 means no rows found, which is what we want
      return res.status(500).json({ error: 'Database error' });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    // Create user
    const { data: user, error: createError } = await supabase
      .from('users')
      .insert([
        {
          name,
          email: email.toLowerCase(),
          password_hash: passwordHash,
          role: upperRole,
        },
      ])
      .select();

    if (createError) {
      return res.status(500).json({ error: 'Failed to create user' });
    }

    const newUser = user[0];

    // Generate token
    const token = generateToken(newUser);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * POST /auth/login
 * Login with email and password
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate inputs
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Get user from database
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email.toLowerCase())
      .single();

    if (!user || error) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate token
    const token = generateToken(user);

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * POST /auth/logout
 * Logout (invalidate token on frontend)
 */
export const logout = async (req, res) => {
  try {
    // Token invalidation is handled on frontend by removing it from localStorage
    // Backend just confirms logout
    res.json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * GET /auth/me
 * Get current user info (requires authentication)
 */
export const getCurrentUser = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    res.json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
