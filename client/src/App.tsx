import { Toaster } from "sonner";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (

    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          classNames: {
            toast:
              "border border-border bg-card text-foreground shadow-lg",
            title: "text-foreground font-semibold",
            description: "text-muted-foreground",
            success:
              "border-green-200 bg-green-50 text-green-700",
            error:
              "border-red-200 bg-red-50 text-red-700",
          },
        }}
      />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;