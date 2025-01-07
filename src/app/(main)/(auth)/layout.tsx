import React from "react";

type Props = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: Props) => {
  return (
    <>
      <div className="flex items-center justify-center min-h-svh container mx-auto p-4">
        {children}
      </div>
    </>
  );
};

export default AuthLayout;
