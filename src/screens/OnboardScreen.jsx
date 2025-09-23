import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import { Input, Label, Separator } from "../components/ui/Inputs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import { useToast } from "../hooks/use-toast";
import { Eye, EyeOff, CheckCircle, ArrowRight } from "lucide-react";
import secureLocalStorage from "react-secure-storage";
import logger from "../utils/logger";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

function OnboardScreen() {
  const [step, setStep] = useState("signup");
  const { apiUrl } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [collegeData, setCollegeData] = useState({
    name: "",
    handle: "",
    website: "",
    establishedDate: "",
    address: "",
  });

  const { toast } = useToast();
  const navigate = useNavigate();
  useEffect(() => {
    const stepCache = secureLocalStorage.getItem("step");
    if (stepCache) {
      setStep(stepCache);
      setEmail(secureLocalStorage.getItem("email"));
    }
  });

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(`${apiUrl}/onboard/colleges/`, {
        email,
        password,
      });

      if (response.status === 201) {
        logger(response.data);

        toast({
          title: "Registration successful",
          description: "Please check your email for verification",
        });
        setStep("verify");
        secureLocalStorage.setItem("step", "verify");
        secureLocalStorage.setItem("email", email);
      }
      logger({ email, password });
    } catch (error) {
      logger({ error });
      toast({
        title: "Registration failed",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerification = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(`${apiUrl}/onboard/colleges/verify/`, {
        email,
        otp: verificationCode,
      });

      if (response.status === 200) {
        logger(response.data);

        toast({
          title: "Email verified",
          description: "Now let's add your college details",
        });
        setStep("college");
        secureLocalStorage.setItem("step", "college");
      }
    } catch (error) {
      toast({
        title: "Verification failed",
        description: "Invalid verification code",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCollegeSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(`${apiUrl}/colleges/`, {
        name: collegeData.name,
        handle: collegeData.handle,
        website: collegeData.website,
        established_date: collegeData.establishedDate,
        line1: collegeData.address,
        email: email,
      });

      if (response.status === 201) {
        logger(response.data);
        toast({
          title: "College details submitted",
          description: "Your request is now pending approval",
        });
        setStep("approval");
        secureLocalStorage.setItem("step", "approval");
      }
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleImportData = async (file) => {
    setIsLoading(true);
    try {
      // await apiService.importAlumniData(file);
      toast({
        title: "Data imported successfully",
        description: "Alumni data has been processed",
      });
      setStep("invite");
    } catch (error) {
      toast({
        title: "Import failed",
        description: "Please check your file format",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInviteUsers = async () => {
    setIsLoading(true);
    try {
      // This would typically involve a form to collect email addresses
      // await apiService.inviteUsers(["example@college.edu"], "alumni");
      toast({
        title: "Invitations sent",
        description: "Users will receive email invitations",
      });
      navigate("/login");
    } catch (error) {
      toast({
        title: "Failed to send invitations",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case "signup":
        return (
          <Card className="w-full max-w-md border-white/20">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-2xl">AM</span>
              </div>
              <CardTitle className="text-2xl">College Registration</CardTitle>
              <CardDescription>
                Start your journey with Alumni Connect
              </CardDescription>
            </CardHeader>

            <form onSubmit={handleSignup}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Admin Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@college.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-primary border-0"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Button>

                <Separator />

                <div className="text-center text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link to="/login" className="text-primary hover:underline">
                    Sign in
                  </Link>
                </div>
              </CardContent>
            </form>
          </Card>
        );

      case "verify":
        return (
          <Card className="w-full max-w-md border-white/20">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Verify Email</CardTitle>
              <CardDescription>
                Enter the verification code sent to {email}
              </CardDescription>
            </CardHeader>

            <form onSubmit={handleVerification}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="code">Verification Code</Label>
                  <Input
                    id="code"
                    placeholder="Enter 6-digit code"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-primary border-0"
                  disabled={isLoading}
                >
                  {isLoading ? "Verifying..." : "Verify Email"}
                </Button>
              </CardContent>
            </form>
          </Card>
        );

      case "college":
        return (
          <Card className="w-full max-w-lg border-white/20">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">College Information</CardTitle>
              <CardDescription>
                Provide details about your educational institution
              </CardDescription>
            </CardHeader>

            <form onSubmit={handleCollegeSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="collegeName">College Name</Label>
                  <Input
                    id="collegeName"
                    placeholder="Enter college name"
                    value={collegeData.name}
                    onChange={(e) =>
                      setCollegeData({ ...collegeData, name: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="handle">College Handle</Label>
                  <Input
                    id="handle"
                    placeholder="unique-handle (used in URLs)"
                    value={collegeData.handle}
                    onChange={(e) =>
                      setCollegeData({ ...collegeData, handle: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    type="url"
                    placeholder="https://college.edu"
                    value={collegeData.website}
                    onChange={(e) =>
                      setCollegeData({
                        ...collegeData,
                        website: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="establishedDate">Established Date</Label>
                  <Input
                    id="establishedDate"
                    type="date"
                    value={collegeData.establishedDate}
                    onChange={(e) =>
                      setCollegeData({
                        ...collegeData,
                        establishedDate: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    placeholder="College address"
                    value={collegeData.address}
                    onChange={(e) =>
                      setCollegeData({
                        ...collegeData,
                        address: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-primary border-0"
                  disabled={isLoading}
                >
                  {isLoading ? "Submitting..." : "Submit for Approval"}
                </Button>
              </CardContent>
            </form>
          </Card>
        );

      case "approval":
        return (
          <Card className="w-full max-w-md text-center border-white/20">
            <CardHeader>
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl">Pending Approval</CardTitle>
              <CardDescription>
                Your college registration is being reviewed. You'll receive an
                email once approved.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="p-4 bg-muted rounded-lg text-left">
                <h4 className="font-semibold mb-2">Next Steps:</h4>
                <ol className="text-sm space-y-1 list-decimal list-inside">
                  <li>Admin review (24-48 hours)</li>
                  <li>Import alumni data</li>
                  <li>Invite users to platform</li>
                  <li>Start using Alumni Connect</li>
                </ol>
              </div>

              <Button
                onClick={() => setStep("import")}
                className="w-full bg-gradient-primary border-0"
              >
                Continue Setup <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        );

      case "import":
        return (
          <Card className="w-full max-w-md border-white/20">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Import Alumni Data</CardTitle>
              <CardDescription>
                Upload Excel or CSV file with alumni information
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center">
                <Input
                  type="file"
                  accept=".xlsx,.xls,.csv"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImportData(file);
                  }}
                  className="hidden"
                  id="file-upload"
                />
                <Label htmlFor="file-upload" className="cursor-pointer">
                  <div className="space-y-2">
                    <div className="text-4xl">📊</div>
                    <div className="text-sm text-muted-foreground">
                      Click to upload Excel or CSV file
                    </div>
                  </div>
                </Label>
              </div>

              <Button
                onClick={() => setStep("invite")}
                variant="outline"
                className="w-full"
              >
                Skip for Now
              </Button>
            </CardContent>
          </Card>
        );

      case "invite":
        return (
          <Card className="w-full max-w-md text-center border-white/20">
            <CardHeader>
              <CardTitle className="text-2xl">Invite Users</CardTitle>
              <CardDescription>
                Send invitations to alumni, faculty, and students
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid gap-3">
                <Button
                  onClick={handleInviteUsers}
                  className="bg-gradient-primary border-0"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending Invites..." : "Send Invitations"}
                </Button>

                <Button onClick={() => navigate("/login")} variant="outline">
                  Complete Setup Later
                </Button>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-card px-4">
      {renderStepContent()}
    </div>
  );
}

export default OnboardScreen;
