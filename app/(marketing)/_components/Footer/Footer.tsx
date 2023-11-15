import Logo from "@/components/Logo/Logo"
import { Button } from "@/components/ui/button"

const Footer = () => {
  return (
    <div className="fixed bottom-0 w-full p-4 border-t bg-slate-100">
      <div className="flex items-center justify-between w-full md:max-w-screen-2xl mx-auto">
        <Logo />
        <div className="flex gap-3 items-center justify-between w-full md:w-auto">
          <Button size="sm" variant="ghost">
            Privacy Policy
          </Button>
          <Button size="sm" variant="ghost">
            Terms of Service
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Footer