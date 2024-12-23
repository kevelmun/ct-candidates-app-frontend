"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function EditEventRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.push("/principal/admin");
  }, [router]);

  return (
    <div className="text-center mt-10">
      <p>Redirecting to Admin Panel...</p>
    </div>
  );
}
