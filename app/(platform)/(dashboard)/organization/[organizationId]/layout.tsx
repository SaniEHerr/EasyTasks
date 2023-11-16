import OrganizationControl from "./_components/OrganizationControl/OrganizationControl"

const OrganizationIdLayout = ({ children }: {children: React.ReactNode} ) => {
  return (
    <>
      <OrganizationControl />
      {children}
    </> 
  )
}

export default OrganizationIdLayout