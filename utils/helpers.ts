export function downloadResume(url?: string) {
  if (!url) return;
  const name = extractNameFromUrl(url);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
}


function extractNameFromUrl(url: string) {
  try {
    const urlObject = new URL(url);
    const hostname = urlObject.hostname;

    const domain = hostname.startsWith("www.") ? hostname.substring(4) : hostname;
    const name = domain.split(".")[0];
    return name;
  } catch (error) {
    console.error("Invalid URL:", error);
    return "resume.pdf";
  }
}
