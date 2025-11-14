document.getElementById("runBtn").addEventListener("click", async () => {
    const language = document.getElementById("language").value;
    const stacktrace = document.getElementById("stacktrace").value;
    const code = document.getElementById("code").value;
  
    document.getElementById("output").textContent = "Processing...";
  
    const res = await fetch("http://localhost:3000/fix-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ language, stacktrace, code }),
    });
  
    const data = await res.json();
    document.getElementById("output").textContent = data.result || data.error;
  });
  