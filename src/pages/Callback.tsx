import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function Callback() {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const [tokenData, setTokenData] = useState<any>(null);

  useEffect(() => {
    
    if (code) {
      console.log("SUCCESS! We got the code from Spotify:", code);
    }
  }, [code]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
      <div className="card-base max-w-md w-full p-8 text-center flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-green-500">Spotify Handshake</h1>
        {code ? (
          <>
            <p className="text-muted-foreground">We successfully got the authorization code! Check your VS Code or Browser console.</p>
            <div className="p-4 bg-secondary rounded text-xs break-all text-left font-mono">
              {code}
            </div>
          </>
        ) : (
          <p className="text-muted-foreground">Waiting for Spotify...</p>
        )}
      </div>
    </div>
  );
}