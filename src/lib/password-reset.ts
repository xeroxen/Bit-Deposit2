/**
 * Handles password reset by sending a request to the API
 */
export async function handlePasswordReset(email: string): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/forget-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.message || "Failed to send password reset link. Please try again.",
      };
    }

    return { success: true };
  } catch (error) {
    console.error("Password reset error:", error);
    return {
      success: false,
      error: "An error occurred while processing your request. Please try again.",
    };
  }
}

/**
 * Completes the password reset process with a token and new password
 */
export async function completePasswordReset(
  email: string,
  password: string,
  token: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        token,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.message || "Failed to reset password. Please try again.",
      };
    }

    return { success: true };
  } catch (error) {
    console.error("Password reset completion error:", error);
    return {
      success: false,
      error: "An error occurred while processing your request. Please try again.",
    };
  }
} 