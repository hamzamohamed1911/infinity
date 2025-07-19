import Image from "next/image";
import { logo } from "../../../../public";
import Link from "next/link";

const AuthNavBar = () => {
  return (
    <nav className="bg-primary h-20 w-full flex justify-center items-center">
      <div className="container mx-auto flex justify-end p-4">
        <Link href="/" className="inline-block">
          <Image alt="logo" src={logo} className="w-auto h-auto" />
        </Link>
      </div>
    </nav>
  );
};

export default AuthNavBar;
