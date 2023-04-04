var ports = [];

chrome.runtime.onConnect.addListener((my_port)=>{
  my_port.onMessage.addListener((msg)=>{
    switch (msg.command) {
      case "scan_keyword":
        ports.forEach((p)=>{
          p.postMessage({
            command:"process_keyword",
            kwargs:msg.kwargs
          });
        });
        break;
      
      case "process_keyword_response":
        ports.forEach((p)=>{
          p.postMessage({
            command:"scan_keyword_response",
            kwargs:msg.kwargs
          });
        });
        break;
    
      default:
        break;
    }
  });
  ports.push(my_port);
});