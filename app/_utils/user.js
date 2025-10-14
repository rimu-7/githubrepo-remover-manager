import User from "./UserSchema";

export async function createUser(user) {
  try {
    const newUser = await User.create(user);
    throw new SuccessResponse("User created successfully");
    return newUser;
  } catch (error) {
    throw new Error("Failed to create user.");
  }
}
