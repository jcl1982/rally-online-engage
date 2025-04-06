
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RallyHeader from "@/components/RallyHeader";
import RallyFooter from "@/components/RallyFooter";
import SignInForm from "@/components/auth/SignInForm";
import SignUpForm from "@/components/auth/SignUpForm";
import { useAuthForm } from "@/hooks/useAuthForm";

const Auth = () => {
  const { form, isLoading, authMode, setAuthMode, handleAuth } = useAuthForm();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <RallyHeader />
      <div className="flex-grow flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Tabs defaultValue="signin" onValueChange={(v) => setAuthMode(v as 'signin' | 'signup')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Connexion</TabsTrigger>
              <TabsTrigger value="signup">Inscription</TabsTrigger>
            </TabsList>
            <TabsContent value="signin">
              <SignInForm form={form} isLoading={isLoading} onSubmit={handleAuth} />
            </TabsContent>
            <TabsContent value="signup">
              <SignUpForm form={form} isLoading={isLoading} onSubmit={handleAuth} />
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
      <RallyFooter />
    </div>
  );
};

export default Auth;
