"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Loader2, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function SignupPage() {
  const { signup, updateUserProfile, googleSignIn, verifyEmail } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    try {
      await signup(email, password);
      await updateUserProfile({ displayName: name });
      await verifyEmail();
      toast.success('Account created! Please check your email to verify.');
      router.push('/profile'); // Redirect to profile to complete setup if needed, or home
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      toast.success('Account created with Google!');
      router.push('/profile');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="card m-4 bg-base-300 w-full max-w-md shadow-xs p-7 border border-base-200">
        <div className="card-body gap-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold">Create Account</h1>
            <p className="text-base-content/60">Join us to start your learning journey</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <input 
                type="text" 
                placeholder="John Doe" 
                className="input w-full rounded-md bg-base-100 pl-2 focus:input-primary transition-colors" 
                required 
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <input 
                type="email" 
                placeholder="name@example.com" 
                className="input w-full rounded-md bg-base-100 pl-2 focus:input-primary transition-colors" 
                required 
              />
            </div>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Create a password" 
                  className="input w-full rounded-md bg-base-100 pl-2 focus:input-primary transition-colors pr-10" 
                  required 
                />
                 <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/60 hover:text-base-content transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              className="btn bg-primary rounded-md w-full text-white hover:bg-primary/70 font-semibold text-lg disabled:bg-primary/70 disabled:text-white/70"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={20} />
                  Creating Account...
                </>
              ) : (
                'Sign Up'
              )}
            </button>
          </form>

          <div className="divider text-base-content/30 my-0">OR</div>

           <button 
            type="button"
            onClick={handleGoogleSignIn}
            className="btn bg-base-100 w-full rounded-md font-semibold text-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5 mr-2">
              <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
              <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
              <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
              <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
            </svg>
            Sign up with Google
          </button>

          <div className="text-center text-sm">
            Already have an account? {' '}
            <Link href="/login" className="link link-primary font-bold no-underline hover:underline">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
