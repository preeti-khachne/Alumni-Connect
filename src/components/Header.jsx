import React from "react";
import { Link } from "react-router-dom";
import Button from "./ui/Button";

function Header() {
  return (
    <nav className="flex items-center justify-between py-6 px-8">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
          <span className="text-white font-bold text-lg">AM</span>
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground">Alumni Connect</h1>
          <p className="text-xs text-muted-foreground">Government of Punjab</p>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-6">
        <Link
          to="#features"
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          Features
        </Link>
        <Link
          to="#about"
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          About
        </Link>
        <Link
          to="#contact"
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          Contact
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/login">Sign In</Link>
        </Button>
        <Button size="sm" className="bg-gradient-primary border-0" asChild>
          <Link to="/onboard">Get Started</Link>
        </Button>
      </div>
    </nav>
  );
}

export default Header;
