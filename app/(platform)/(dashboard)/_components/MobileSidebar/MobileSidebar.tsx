"use client"

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";

import { useMobileSidebar } from "@/hooks/useMobileSidebar"
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import Sidebar from "../Sidebar/Sidebar";

const MobileSidebar = () => {

  const pathName = usePathname();
  // Esto nos ayuda a prevenir errores de hidratacion, especialmente cuando laburamos con Zustand y componentes modals
  const [isMounted, setIsMounted] = useState(false);
  
  const onOpen = useMobileSidebar((state) => state.onOpen);
  const onClose = useMobileSidebar((state) => state.onClose);
  const isOpen = useMobileSidebar((state) => state.isOpen);

  useEffect(() => {
    setIsMounted(true);
  }, [])

  // Cuando nuestra URL cambie, nuestra mobileSidebar se va a cerrar. Entonces vamos a usar esto, cuando hagamos click en un item especifico de nuestra sidebar el router se va a pushear, la url va a cambiar y nuestra mobileSidebar se va a cerrar. De esta forma no tenemos que llamar manualmente al onClose cada vez que apretamos en un item
  useEffect(() => {
    onClose();
  }, [pathName, onClose])
  
  
  // Esto lo hago porque aunque marquemos este componente como un CSR, el primer renderizado de un CSR siempre va a ser de tipo SSR. Entonces lo que sucede es que al ser ese primer renderizado en SSR, este tiene un estado especifico de cerrado "CLOSE" y cuando ya se ejecuta el CSR propio del componente que marcamos como cliente, este estado especifico que esta cerrado, se abre "OPEN", lo cual genera un error en la hidratacion. Este error causa cierto problemas con el componente, por ende se plantea una solucion.
  // Para fixear el bug utilizamos un useSatate y un useEffect. Para garantizar que un componente especifico solo se renderice del lado del cliente y no en el servidor, tenemos que usar useEffect, ya que el useEffect no va a correr en el servidor. Entonces basicamnte lo que le estamos diciendo al componente es: si el "isMounted" no cambio a TRUE, significa que si nunca alcanza al useEffect inicial, NO vamos a renderizar nada porque sigue corriendo en el servidor, pero una vez que se alcance el useEffect en el segundo renderizado del lado del cliente, el useEffect cambia "isMounted" a TRUE, por lo skipea el "if" y renderiza el componente
  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Button
        onClick={onOpen}
        className="block md:hidden px-0 mr-3.5"
        variant="openMobileSidebar"
        size="sm"
      >
        <Menu className="h-4 w-4" />
      </Button>
      <Sheet open={isOpen} onOpenChange={onClose} >
        <SheetContent
          side="left"
          className="p-2 pt-10"
        >
          <Sidebar
            storageKey="et-sidebar-state"
          />
        </SheetContent>
      </Sheet>
    </>
  )
}

export default MobileSidebar