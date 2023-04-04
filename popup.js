let port = chrome.runtime.connect({name:"popup_port"});

port.onMessage.addListener((msg)=>{
  switch (msg.command) {
    case "scanned_keyword":
      document.querySelector("#scan-results").value = msg.kwargs.text;
      break;

    default:
      break;
  }
});


document.querySelector("#kwform").addEventListener("submit",(e)=>{
  e.preventDefault();
  var formData = new FormData(e.target);
  port.postMessage({
    command:"scan_keyword",
    kwargs:{
      keyword:formData.get("keyword")
    }
  });
})