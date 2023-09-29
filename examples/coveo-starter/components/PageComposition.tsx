import { FC, useEffect } from "react";
import { RootComponentInstance } from "@uniformdev/canvas";
import { UniformComposition, UniformSlot } from "@uniformdev/canvas-react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Container } from "@mui/system";
import Footer from "@/components/Footer";
import { theme } from "../context/theme";

export interface PageCompositionProps {
  data: RootComponentInstance;
}

const PageComposition: FC<PageCompositionProps> = ({ data: composition }) => {
  useEffect(() => {
    // Define the script content
    const scriptContent = `
      (function(c,o,v,e,O,u,a){
        a='coveoua';c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        c[a].t=Date.now();u=o.createElement(v);u.async=1;u.src=e;
        O=o.getElementsByTagName(v)[0];O.parentNode.insertBefore(u,O)
      })(window,document,'script','https://static.cloud.coveo.com/coveo.analytics.js/2/coveoua.js');
      coveoua('set', 'currencyCode', 'USD');
    `;

    // Create a script element
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.innerHTML = scriptContent;

    // Append the script to the document's body
    document.body.appendChild(script);

    // Clean up the script element when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <CssBaseline>
      <ThemeProvider theme={theme}>
        <Container maxWidth="xl">
          <UniformComposition data={composition}>
            <UniformSlot name="search-content" />
          </UniformComposition>
          <Footer />
        </Container>
      </ThemeProvider>
    </CssBaseline>
  );
};

export default PageComposition;
