# GitHub OAuth Authentication with NextAuth.js

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-14.x-black?logo=next.js)](https://nextjs.org/)
[![NextAuth.js](https://img.shields.io/badge/NextAuth.js-v4-green?logo=next-auth)](https://next-auth.js.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4.4+-47A248?logo=mongodb)](https://mongodb.com/)

A modern, secure GitHub OAuth2 authentication system built with Next.js and NextAuth.js. Supports both **minimal JWT-only authentication** (no database) and **full user persistence** with MongoDB.

## ✨ Features

- 🔐 **Secure GitHub OAuth2** with PKCE and state checks
- ⚡ **Lightning-fast login** (under 2s with JWT-only mode)
- 🗄️ **Optional MongoDB integration** for user data persistence
- 📱 **Mobile-friendly** with proper callback URLs
- 🔒 **JWT-based sessions** with 30-day expiry
- 🎨 **Customizable pages** for login and error handling
- 🚀 **Production-ready** with connection pooling and timeouts
- 📊 **User profile storage** with GitHub access tokens
- 🔄 **Atomic database operations** with upsert support

## 🛠️ Tech Stack

- **Frontend**: Next.js 14+ (App Router)
- **Authentication**: NextAuth.js v4+
- **Database**: MongoDB with Mongoose ODM
- **OAuth**: GitHub OAuth2 Provider
- **Security**: bcrypt, PKCE, CSRF protection
- **Deployment**: Vercel, Netlify, or any Node.js host

## 🚀 Quick Start

### Prerequisites

1. **Next.js** 15+ 
2. **GitHub OAuth App** (see [GitHub Setup](#-github-setup))
3. **MongoDB** (optional, for user persistence)

### Installation

```bash
# Clone the repository
git clone <https://github.com/rimu-7/githubrepo-remover-manager>
cd your-project

# Install dependencies
pnpm install

# Create .env.local file
cp .env.example .env.local
```

### Environment Variables

Create `.env.local` with your credentials:

```env
# GitHub OAuth App
GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret

# NextAuth.js
NEXTAUTH_SECRET=your_random_secret_here
NEXTAUTH_URL=http://localhost:3000

# MongoDB (optional)
MONGODB_URI=mongodb://localhost:27017/yourdb
# or MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/yourdb
```

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

### GitHub Setup

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Create a new **OAuth App** (not GitHub App)
3. Set **Authorization callback URL**: 
   ```
   http://localhost:3000/api/auth/callback/github
   ```
4. Copy `Client ID` and `Client Secret` to `.env.local`
5. **Homepage URL**: `http://localhost:3000`

### Development

```bash
# Start development server
npm run dev

# Open http://localhost:3000
# Navigate to /login to test GitHub authentication
```

### Production

```bash
# Build and start
npm run build
npm start

# Or deploy to Vercel
vercel --prod
```

## 📁 Project Structure

```
├── app
│   ├── _utils
│   │   ├── AuthButtons.jsx
│   │   ├── Footer.jsx
│   │   ├── Home2.jsx
│   │   ├── LogoutButton.jsx
│   │   ├── Navbar.jsx
│   │   ├── theme-provider.jsx
│   │   ├── ToggleMood.jsx
│   │   ├── user.js
│   │   └── UserSchema.js
│   ├── api
│   │   ├── auth
│   │   │   └── [...nextauth]
│   │   └── repos
│   │       ├── logAction
│   │       └── logAction.js
│   ├── dashboard
│   │   └── page.jsx
│   ├── docs
│   │   └── page.jsx
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.js
│   ├── login
│   │   └── page.jsx
│   ├── page.js
│   ├── privacy
│   │   └── page.jsx
│   ├── register
│   │   └── page.jsx
│   ├── SessionProvider.js
│   └── terms
│       └── page.jsx
├── components
│   └── ui
│       ├── accordion.jsx
│       ├── badge.jsx
│       ├── button.jsx
│       ├── card.jsx
│       ├── dropdown-menu.jsx
│       ├── separator.jsx
│       ├── switch.jsx
│       └── tabs.jsx
├── components.json
├── eslint.config.mjs
├── jsconfig.json
├── lib
│   ├── fonts.js
│   ├── mongodb.js
│   └── utils.js
├── next.config.mjs
├── package.json
├── pnpm-lock.yaml
├── postcss.config.mjs
├── public
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
└── README.md

18 directories, 45 files               # Environment variables
```

## ⚙️ Configuration Options

### 1. **Minimal Mode (No Database)**

For fastest authentication, remove database operations:

```javascript
// In auth route.js - remove DB imports and signIn callback DB logic
async signIn({ account }) {
  if (account?.provider === "github") {
    console.log("✅ GitHub login successful");
    return true; // Always allow
  }
  return false;
}
```

**Benefits:**
- ⚡ Login in <2 seconds
- 🔒 No database dependency
- 📈 Scales infinitely
- 🛡️ Still secure with JWT

### 2. **Full Mode (With Database)**

For user persistence, keep the MongoDB integration:

```javascript
// Optimized signIn callback with atomic operations
const existingUser = await User.findOneAndUpdate(
  { email },
  { $set: { githubId, githubAccessToken } },
  { upsert: true, new: true }
);
```

**Features:**
- 💾 Persistent user data
- 🔗 GitHub access tokens stored
- 📝 User activity tracking
- 🔄 Automatic user updates

### 3. **Custom Scopes**

Modify GitHub scopes in `auth.js`:

```javascript
authorization: {
  params: { 
    scope: "read:user user:email repo delete_repo" // Add repo permissions if needed
  },
},
```

## 🔐 Session Management

### Client-side Usage

```javascript
import { useSession, signIn, signOut } from "next-auth/react";

export default function LoginComponent() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;
  
  if (session) {
    return (
      <div>
        <img src={session.user.image} alt="Avatar" />
        <p>Welcome {session.user.name} (@{session.user.login})</p>
        <button onClick={() => signOut()}>Sign Out</button>
      </div>
    );
  }
  
  return (
    <button onClick={() => signIn("github")}>
      Sign in with GitHub
    </button>
  );
}
```

### Server-side Usage

```javascript
// app/api/protected/route.js
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(request) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }
  
  return Response.json({
    user: session.user,
    accessToken: session.accessToken
  });
}
```

### Available Session Data

```javascript
session.user = {
  id: "github_user_id",
  name: "User Name",
  email: "user@example.com",
  login: "github_username",
  image: "avatar_url"
};
session.accessToken = "gho_..."; // GitHub access token
```

## 🧪 Testing

### Unit Tests

```bash
# Install testing dependencies
npm install --save-dev jest @testing-library/react @testing-library/jest-dom

# Run tests
npm test
```

### Authentication Flow Test

1. Clear browser cookies
2. Visit `/login`
3. Click "Sign in with GitHub"
4. Verify redirect to GitHub
5. Complete OAuth flow
6. Check `/dashboard` loads with session data
7. Verify sign-out works

## 🔧 Troubleshooting

### Common Issues

1. **OAuth Callback Timeout**
   - Increase `httpOptions.timeout` to 15000ms
   - Check GitHub App callback URL
   - Verify `NEXTAUTH_URL` in `.env.local`

2. **MongoDB Connection Errors**
   - Use connection pooling (`lib/mongodb.js`)
   - Check `MONGODB_URI` format
   - Enable `serverSelectionTimeoutMS: 5000`

3. **"Invalid callback URL"**
   - Ensure callback matches GitHub App settings exactly
   - Use `http://` for localhost (not `https://`)

4. **Session Not Persisting**
   - Verify `NEXTAUTH_SECRET` is set
   - Check cookie settings in production
   - Enable `debug: true` for logs

### Debug Mode

```javascript
// In authOptions
debug: process.env.NODE_ENV === "development",
```

### Logs to Check

- Browser Network tab (OAuth redirects)
- Server console (NextAuth debug logs)
- MongoDB connection logs
- GitHub App audit logs

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import repository in Vercel dashboard
3. Add environment variables in Vercel settings
4. Update `NEXTAUTH_URL` to production domain
5. Update GitHub callback URL to production
6. Deploy!

### Environment Variables for Production

```env
NEXTAUTH_URL=https://yourdomain.com
GITHUB_ID=your_production_client_id
NEXTAUTH_SECRET=production_secret_here
```

### Custom Domain

Update GitHub OAuth App:
- **Callback URL**: `https://yourdomain.com/api/auth/callback/github`
- **Homepage URL**: `https://yourdomain.com`

## 🔒 Security

- ✅ **PKCE enabled** for OAuth security
- ✅ **State parameter validation**
- ✅ **CSRF protection** built into NextAuth
- ✅ **Secure JWT tokens** with secret
- ✅ **HTTPS required** in production
- ✅ **Access token storage** in HTTP-only cookies
- ✅ **Rate limiting** handled by GitHub API
- ✅ **Input validation** on user data

### Security Best Practices

1. **Never commit `.env.local`**
2. **Use strong `NEXTAUTH_SECRET`**
3. **Enable HTTPS** in production
4. **Rotate secrets** regularly
5. **Monitor GitHub App usage**
6. **Limit OAuth scopes** to minimum required
7. **Use database indexes** for performance
8. **Implement rate limiting** on API routes

## 📚 Documentation

- [NextAuth.js Documentation](https://next-auth.js.org/)
- [GitHub OAuth Apps](https://docs.github.com/en/developers/apps)
- [MongoDB Connection Best Practices](https://www.mongodb.com/docs/manual/administration/production-notes/)
- [Next.js App Router](https://nextjs.org/docs/app)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

### Development Setup

```bash
# Install dependencies
npm install

# Run with hot reload
npm run dev

# Build for production
npm run build && npm start
```

## 📄 License

This project is [MIT](LICENSE) licensed - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [NextAuth.js](https://next-auth.js.org/) - Authentication for Next.js
- [Vercel](https://vercel.com/) - Deployment platform
- [MongoDB](https://mongodb.com/) - Database
- [GitHub](https://github.com/) - OAuth provider

## 🆘 Support

- Found a bug? [Open an issue](https://github.com/yourusername/your-repo/issues)
- Need help? Check [Troubleshooting](#-troubleshooting)
- Feature request? [Submit a discussion](https://github.com/yourusername/your-repo/discussions)

---

**Made with ❤️ using Next.js and NextAuth.js**

> "Authentication should be simple, secure, and fast." 

*Deploy your own instance and contribute to the community!* 🚀