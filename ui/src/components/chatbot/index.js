// import React, { useEffect } from 'react';

// const Chatbot = () => {
//   useEffect(() => {
//     // Define the Watson Assistant options
//     window.watsonAssistantChatOptions = {
//       integrationID: "ac1e0ccf-84c1-4608-a469-0907eccba471", // The ID of this integration.
//       region: "us-south", // The region your integration is hosted in.
//       serviceInstanceID: "071633b2-24b1-46f7-93e7-a84173b7c8e4", // The ID of your service instance.
//       onLoad: async (instance) => { await instance.render(); }
//     };

//     // Create a script element to load the Watson Assistant script
//     const script = document.createElement('script');
//     script.src = "https://web-chat.global.assistant.watson.appdomain.cloud/versions/" +
//       (window.watsonAssistantChatOptions.clientVersion || 'latest') +
//       "/WatsonAssistantChatEntry.js";
//     script.async = true;

//     document.head.appendChild(script);

//     // Cleanup function to remove the script when the component unmounts
//     return () => {
//       document.head.removeChild(script);
//     };
//   }, []);

//   return null; // This component doesn't render anything
// };

// export default Chatbot;












import React, { useEffect } from 'react';

const Chatbot = () => {
  useEffect(() => {
    // Define the Watson Assistant options
    window.watsonAssistantChatOptions = {
      integrationID: "653fc966-1e53-4be5-aef3-c8a8675fdb87", // The ID of this integration.
      region: "au-syd", // The region your integration is hosted in.
      serviceInstanceID: "2e44a406-4f17-413b-8e12-817d27ef9b5c", // The ID of your service instance.
      onLoad: async (instance) => { await instance.render(); }
    };

    // Create a script element to load the Watson Assistant script
    const script = document.createElement('script');
    script.src = "https://web-chat.global.assistant.watson.appdomain.cloud/versions/" +
      (window.watsonAssistantChatOptions.clientVersion || 'latest') +
      "/WatsonAssistantChatEntry.js";
    script.async = true;

    document.head.appendChild(script);

    // Cleanup function to remove the script when the component unmounts
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null; // This component doesn't render anything
};

export default Chatbot;











