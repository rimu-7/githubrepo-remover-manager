import mongoose from "mongoose";

const RepoActionSchema = new mongoose.Schema({
  repoName: {
    type: String,
    required: true,
    maxlength: 100,
  },
  action: {
    type: String,
    required: true,
    enum: ["create", "delete", "update"], // Restricted values
    maxlength: 20,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      maxlength: 254,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },
    password: {
      type: String,
      required: true,
      minlength: 60, // bcrypt hash length
      maxlength: 60,
    },
    githubId: {
      type: String,
      sparse: true,
      index: true,
      maxlength: 50,
    },
    githubLogin: {
      type: String,
      trim: true,
      maxlength: 39, // GitHub username limit
    },
    githubAccessToken: {
      type: String,
      select: false, // Don't return in queries by default
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    repoActions: [RepoActionSchema],
  },
  { 
    timestamps: true,
    toJSON: {
      transform: function(doc, ret) {
        delete ret.password;
        delete ret.githubAccessToken;
        return ret;
      }
    }
  }
);

// Remove duplicate index
// Compound index for better query performance
UserSchema.index({ githubId: 1, email: 1 });
// Make email unique at the schema level
UserSchema.index({ email: 1 }, { unique: true });

// Static method for safe user finding
UserSchema.statics.findByEmail = function(email) {
  return this.findOne({ email: email.toLowerCase().trim() });
};

UserSchema.statics.findByGitHubId = function(githubId) {
  return this.findOne({ githubId: githubId.toString() });
};

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
