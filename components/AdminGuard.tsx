"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("adminAuthData");
    if (!token) {
      router.push("/admin/login");
    } else {
      setIsChecking(false);
    }
  }, []);

  if (isChecking) {
    return <div className="text-center mt-10">Checking auth...</div>;
  }

  return <>{children}</>;
}
