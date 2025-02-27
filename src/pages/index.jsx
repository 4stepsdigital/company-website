import Home from "@/Component/Home";
import Head from "next/head";

const Index = () => {
  return (
    <div>
      <Head>
        <title>
          Digital Consulting Agency in India | Four Steps Digital Consulting
        </title>
        <meta
          name="description"
          content="Transform Your Business Into A Digitally-Driven Organization .We are one of the best digital consulting agency in India."
        />
        <meta property="og:url" content="https://4stepsdigital.com/" />
        <meta
          property="og:title"
          content="Digital Consulting Agency in India | Four Steps Digital Consulting"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta charset="UTF-8" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta
          property="article:publisher"
          content="https://www.facebook.com/4stepsmarketing"
        />
        <meta
          property="og:image"
          content="https://4stepsdigital.com/wp-content/uploads/2024/04/Untitled-design-4-e1712921023346.png"
        />
        <meta property="og:image:width" content="1080" />
        <meta property="og:image:height" content="964" />
        <meta property="og:image:type" content="image/png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@4stepsM" />
      </Head>
      <div>
        <Home />
      </div>
    </div>
  );
};

export default Index;
