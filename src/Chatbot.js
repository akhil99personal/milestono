import React, { useEffect } from "react";

const Chatbot = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.botpress.cloud/webchat/v1/inject.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      window.botpressWebChat.init({
        composerPlaceholder: "Chat with bot",
        botId: process.env.REACT_APP_BOT_ID,
        hostUrl: "https://cdn.botpress.cloud/webchat/v1",
        messagingUrl: "https://messaging.botpress.cloud",
        clientId: process.env.REACT_APP_BOT_ID,
        webhookId: process.env.REACT_APP_WEBHOOK_ID,
        lazySocket: true,
        themeName: "prism",
        frontendVersion: "v1",
        showPoweredBy: false,
        theme: "prism",
        enableConversationDeletion: true,
        botName: "Milestono Chatbot",
        themeColor: "#f44336",
        allowedOrigins: [],
      });
      window.botpressWebChat.onEvent(
        (event) => {
          window.location = event.value.url;
        },
        ["TRIGGER"],
      );
    };
  }, []);

  return <div id="webchat" />;
};

export default Chatbot;
