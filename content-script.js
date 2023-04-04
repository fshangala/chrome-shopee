//form input.shopee-searchbar-input__input
//shopee-searchbar-listbox a

let port = chrome.runtime.connect({name:"script_port"});

let getProcessedData = () => {
  var data = document.querySelectorAll("#shopee-searchbar-listbox a");
  if(data.length > 1){
    var processedData = [];
    data.forEach((a)=>{
      processedData.push(a.innerText);
    });
    processedData.shift();
    
    port.postMessage({
      command:"process_keyword_response",
      kwargs:{
        data:processedData
      }
    });
  } else {
    setTimeout(getProcessedData,1000);
  }
}

port.onMessage.addListener((msg)=>{
  switch (msg.command) {
    case "process_keyword":
      var input = document.querySelector("form input.shopee-searchbar-input__input");
      if(input){
        input.value = msg.kwargs.keyword;
        input.dispatchEvent(new Event('change', { bubbles: true}));
        getProcessedData();
      }
      break;

    default:
      break;
  }
});