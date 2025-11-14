document.getElementById("runBtn").addEventListener("click", async () => {
    const language = document.getElementById("language").value;
    const stacktrace = document.getElementById("stacktrace").value;
    const code = document.getElementById("code").value;
  
    const url = "ai-fixer-code-production.up.railway.app/fix-code";
    document.getElementById("output").textContent = "Processing...";
  
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ language, stacktrace, code }),
    });
  
    const data = await res.json();
    document.getElementById("output").textContent = data.result || data.error;
  });
  