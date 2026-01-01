import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import API from "@/api/api";
import { toast } from "sonner";


export default function Signup({ onSignup, onSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });


  const validate = () => {
    const newErrors = { email: "", password: "" };
    let isValid = true;

    if (!email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Enter a valid email address";
      isValid = false;
    }

    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

    if (!password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (!strongPasswordRegex.test(password)) {
      newErrors.password =
        "Password must be 8+ chars, include upper, lower, number & special character";
      isValid = false;
    }



    setErrors(newErrors);
    return isValid;
  };


  const handleSignup = async () => {
    if (!validate()) return;

    try {
      setLoading(true);

      const res = await API.post("/auth/register", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      toast.success("Signup successful 🎉");
      onSignup();
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <Card className="w-[360px]">
        <CardHeader>
          <CardTitle className="text-center">
            Create Account
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Email */}
          <div className="space-y-1">
            <Input
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors({ ...errors, email: "" });
              }}
            />
            {errors.email && (
              <p className="text-sm text-red-500">
                {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-1">
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors({ ...errors, password: "" });
              }}
            />
            {errors.password && (
              <p className="text-sm text-red-500">
                {errors.password}
              </p>
            )}
          </div>

          <Button
            className="w-full"
            onClick={handleSignup}
            disabled={loading}
          >
            {loading ? "Creating account..." : "Sign Up"}
          </Button>

          <p className="text-sm text-center text-muted-foreground">
            Already have an account?{" "}
            <span
              className="text-primary cursor-pointer"
              onClick={onSwitch}
            >
              Login
            </span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
