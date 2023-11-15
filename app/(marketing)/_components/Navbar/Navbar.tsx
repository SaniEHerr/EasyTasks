import Logo from "@/components/Logo/Logo"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const Navbar = () => {
  return (
    <div className="fixed top-0 w-full h-14 px-4 border-b shadow-sm bg-white flex items-center">
      <div className="flex items-center justify-between w-full md:max-w-screen-2xl mx-auto">
        <Logo />
        <div className="flex gap-3 items-center justify-between w-full md:w-auto">
          <Button size="sm" variant="outline" asChild>
            <Link href="/sign-in">
              Login
            </Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/sign-up">
              Use it for free
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Navbar