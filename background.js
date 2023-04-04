var ports = [];

chrome.runtime.onConnect.addListener((my_port)=>{
  my_port.onMessage.addListener((msg)=>{
    switch (msg.command) {
      case "scan_keyword":
        my_port.postMessage({
          command:"scanned_keyword",
          kwargs:{
            text:"me\nmyself\nI"
          }
        })
        break;
    
      default:
        break;
    }
  });
  ports.push(my_port);
});