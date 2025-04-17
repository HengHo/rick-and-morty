import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Character",
  description: "Rick and Morty API",
};
type CharacterLayoutProps = {
    children: React.ReactNode;
  };
  
  const CharacterLayout = ({ children }: CharacterLayoutProps) => {
    return (
      <div style={{ display: 'flex', minHeight: '100vh' ,paddingTop:30, backgroundColor:"#151515",color: "#fff"}}>
        
        <main style={{ flex: 1, padding: '2rem' }}>
          {children}
        </main>
      </div>
    );
  };
  
  export default CharacterLayout;
  