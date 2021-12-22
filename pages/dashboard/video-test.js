import { useEffect, useState } from "react";

const test = () => {
  const [src, setSrc] = useState("");
  useEffect(() => {
    setSrc("https://www.aparat.com/video/video/embed/videohash/raLDm/vt/frame");
  }, []);
  return (
    <section className="dashboard">
      <div class="h_iframe-aparat_embed_frame">
        <iframe
          src={src}
          allowFullScreen="true"
          webkitallowfullscreen="true"
          mozallowfullscreen="true"
        ></iframe>
      </div>
    </section>
  );
};

export default test;
