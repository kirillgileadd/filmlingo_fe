import { AuthContext } from "@/src/widgets/auth/ui/auth-provider";
import { useContext } from "react";

export const useAuth = () => useContext(AuthContext);
