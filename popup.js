let port = chrome.runtime.connect({name:"popup_port"});

port.onMessage.addListener((msg)=>{
  switch (msg.command) {
    case "scan_keyword_response":
      var info = "";
      msg.kwargs.data.forEach((item)=>{
        info += item+"\n";
      });
      document.querySelector("#scan-results").value = info;
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