import React from "react";
import PropTypes from "prop-types";

const VimeoEmbed = ({ embedId }) => (
  <div style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
    <iframe
      src={`https://player.vimeo.com/video/${embedId}?h=17fe46c912&badge=0&autopause=0&player_id=0&app_id=58479`}
      frameBorder="0"
      allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
      style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%' }}
      title="API Test 1"
    ></iframe>
  </div>
);

export default VimeoEmbed;